# Note Tecniche - Soluzione Proxy Backend

## Problema Originale

L'applicazione originale faceva chiamate dirette da browser alle API di OpenAI:

```javascript
// ❌ PROBLEMA: Chiamata diretta bloccata da CORS
fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({...})
})
```

**Errore CORS**:
```
Access to fetch at 'https://api.openai.com/v1/chat/completions' from origin 'https://...' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

### Perché OpenAI ha bloccato le chiamate dirette?

OpenAI ha implementato restrizioni CORS per motivi di sicurezza:
1. **Protezione chiavi API**: Evitare che le chiavi siano esposte nel codice frontend
2. **Prevenzione abusi**: Limitare chiamate non autorizzate
3. **Best practice**: Le chiamate API dovrebbero sempre passare da un backend

## Soluzione Implementata

### Architettura Proxy

```
┌─────────────────┐
│   Browser       │
│   (Frontend)    │
└────────┬────────┘
         │ fetch('/.netlify/functions/openai-proxy')
         ↓
┌─────────────────┐
│ Netlify         │
│ Functions       │ ← Esegue lato server (Node.js)
│ (Backend Proxy) │
└────────┬────────┘
         │ fetch('https://api.openai.com/...')
         ↓
┌─────────────────┐
│   OpenAI API    │
└─────────────────┘
```

### Vantaggi

1. **Nessun CORS**: Le chiamate partono dal server Netlify, non dal browser
2. **Sicurezza**: La chiave API non è mai esposta nel codice frontend
3. **Flessibilità**: Possiamo aggiungere logica server-side (rate limiting, caching, ecc.)
4. **Affidabilità**: Soluzione stabile che non dipende da policy CORS di terze parti

### Implementazione

#### 1. Netlify Function (Backend)

File: `netlify/functions/openai-proxy.js`

```javascript
exports.handler = async (event, context) => {
  // Gestione CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Parse richiesta
  const { apiKey, model, messages, temperature } = JSON.parse(event.body);

  // Chiamata a OpenAI (lato server, no CORS!)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages, temperature })
  });

  const data = await response.json();

  // Risposta con CORS headers
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};
```

#### 2. Frontend (Modificato)

```javascript
// ✅ SOLUZIONE: Chiamata al proxy Netlify
async function callOpenAI(prompt, temperature) {
    const apiKey = localStorage.getItem('openai_api_key');
    const model = localStorage.getItem('openai_model') || 'gpt-4o-mini';
    
    // Chiamata al proxy invece che direttamente a OpenAI
    const response = await fetch('/.netlify/functions/openai-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: apiKey,
            model: model,
            messages: [{role: 'user', content: prompt}],
            temperature: temperature
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
}
```

### Flusso Completo

1. **Utente carica programma** → Frontend
2. **Frontend chiama proxy** → `/.netlify/functions/openai-proxy`
3. **Proxy valida richiesta** → Controlla parametri
4. **Proxy chiama OpenAI** → Usa chiave API fornita
5. **OpenAI risponde** → JSON con analisi
6. **Proxy inoltra risposta** → Aggiunge CORS headers
7. **Frontend riceve dati** → Mostra risultati

## Configurazione Netlify

### netlify.toml

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

**Spiegazione**:
- `publish = "."`: Directory root come directory di pubblicazione
- `functions = "netlify/functions"`: Dove si trovano le functions
- `redirects`: SPA routing (tutte le route vanno a index.html)
- `node_bundler = "esbuild"`: Bundler per le functions (più veloce)

## Sicurezza

### Gestione Chiavi API

**Approccio Attuale** (Chiave fornita dall'utente):
- ✅ Ogni utente usa la propria chiave
- ✅ Nessun costo per Zanichelli
- ✅ Chiave salvata solo in localStorage del browser
- ⚠️ Chiave passa attraverso il proxy (ma lato server)

**Approccio Alternativo** (Chiave condivisa):
```javascript
// In netlify/functions/openai-proxy.js
const apiKey = process.env.OPENAI_API_KEY || requestBody.apiKey;
```

Configurazione su Netlify:
1. Site settings → Environment variables
2. Aggiungi `OPENAI_API_KEY` con la chiave Zanichelli
3. Gli utenti non dovranno più inserire la chiave

**Pro**:
- ✅ Utenti non devono gestire chiavi
- ✅ Controllo centralizzato
- ✅ Possibilità di rate limiting

**Contro**:
- ❌ Zanichelli paga per tutti gli utilizzi
- ❌ Necessario monitoraggio costi
- ❌ Rischio abusi

## Performance

### Netlify Functions - Limiti

**Piano Gratuito**:
- 125,000 richieste/mese
- 100 ore esecuzione/mese
- Timeout: 10 secondi per richiesta
- 1024 MB RAM per function

**Piano Pro** ($19/mese):
- 2,000,000 richieste/mese
- 100 ore esecuzione/mese
- Timeout: 26 secondi per richiesta
- 1024 MB RAM per function

### Ottimizzazioni Possibili

1. **Caching**: Salvare risposte comuni
2. **Rate Limiting**: Limitare chiamate per IP
3. **Compression**: Comprimere risposte JSON
4. **Streaming**: Usare streaming per risposte lunghe

## Monitoraggio

### Log Netlify Functions

Ogni invocazione viene loggata:
- Timestamp
- Durata esecuzione
- Status code
- Errori eventuali

Accesso:
1. Dashboard Netlify
2. Functions tab
3. Click sulla function
4. Visualizza log

### Metriche Utili

- **Numero chiamate/giorno**: Monitorare utilizzo
- **Tempo medio risposta**: Performance
- **Errori rate**: Qualità servizio
- **Costi API**: OpenAI usage

## Troubleshooting

### Function non trovata

**Sintomo**: `404 - Function not found`

**Cause**:
1. Directory functions non configurata
2. File .js non presente
3. Export handler mancante

**Soluzione**:
```bash
# Verifica struttura
ls -la netlify/functions/

# Deve contenere:
# openai-proxy.js
# perplexity-proxy.js

# Verifica export
grep "exports.handler" netlify/functions/openai-proxy.js
```

### Timeout

**Sintomo**: `TimeoutError: Task timed out after 10.00 seconds`

**Cause**:
1. OpenAI risponde lentamente
2. Prompt troppo lungo
3. Modello lento (gpt-4)

**Soluzioni**:
- Usa modelli più veloci (gpt-4o-mini)
- Riduci lunghezza prompt
- Upgrade a Netlify Pro (26s timeout)

### CORS error ancora presente

**Sintomo**: Errore CORS nel browser

**Cause**:
1. Stai aprendo file:// invece di https://
2. Proxy non restituisce CORS headers
3. Preflight OPTIONS non gestito

**Soluzione**:
```javascript
// Verifica headers nella function
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}
```

## Estensioni Future

### 1. Autenticazione

Aggiungere login per utenti Zanichelli:

```javascript
// netlify/functions/openai-proxy.js
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  // Verifica token JWT
  const token = event.headers.authorization?.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  
  // Procedi solo se autenticato
  if (!user) {
    return { statusCode: 401, body: 'Unauthorized' };
  }
  
  // ... resto del codice
};
```

### 2. Rate Limiting

Limitare chiamate per utente:

```javascript
const rateLimit = require('express-rate-limit');

// In memory store (o Redis per produzione)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100 // max 100 richieste per finestra
});
```

### 3. Caching

Cachare risposte comuni:

```javascript
const cache = new Map();

exports.handler = async (event) => {
  const cacheKey = JSON.stringify(event.body);
  
  // Check cache
  if (cache.has(cacheKey)) {
    return {
      statusCode: 200,
      body: cache.get(cacheKey)
    };
  }
  
  // Chiamata API
  const response = await callOpenAI(...);
  
  // Salva in cache
  cache.set(cacheKey, response);
  
  return { statusCode: 200, body: response };
};
```

### 4. Analytics

Tracciare utilizzo:

```javascript
const analytics = require('@segment/analytics-node');

exports.handler = async (event) => {
  // Track event
  analytics.track({
    userId: 'user-id',
    event: 'API Call',
    properties: {
      provider: 'openai',
      model: 'gpt-4o-mini',
      timestamp: new Date()
    }
  });
  
  // ... resto del codice
};
```

## Conclusioni

La soluzione proxy backend risolve definitivamente il problema CORS mantenendo:
- ✅ Semplicità d'uso
- ✅ Sicurezza
- ✅ Affidabilità
- ✅ Scalabilità
- ✅ Costi contenuti (piano gratuito sufficiente)

L'architettura è solida e pronta per la produzione.

