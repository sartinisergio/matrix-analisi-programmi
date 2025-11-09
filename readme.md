# Analisi Programmi Chimica Organica - Zanichelli v4.1

Applicazione web per l'analisi e la valutazione di programmi universitari di chimica organica, con raccomandazioni personalizzate sui manuali Zanichelli.

## 🆕 Novità Versione 4.1 - Proxy Backend

Questa versione risolve definitivamente il problema CORS di OpenAI implementando un **backend proxy sicuro** tramite Netlify Functions.

### Architettura

```
Browser (Frontend)
    ↓
Netlify Functions (Backend Proxy)
    ↓
OpenAI / Perplexity API
```

**Vantaggi:**
- ✅ Nessun problema CORS
- ✅ Chiamate API sicure lato server
- ✅ Supporto multi-provider (OpenAI + Perplexity)
- ✅ Raccomandazioni consistenti e deterministiche
- ✅ Analisi basata su framework strutturati

## 📋 Caratteristiche

- **Analisi Programmi**: Valutazione dettagliata basata su framework a 270 punti
- **Valutazione Manuali**: Confronto con competitor e scoring dettagliato
- **Raccomandazioni Zanichelli**: Suggerimenti personalizzati basati sul programma
- **Multi-Provider**: Supporto OpenAI e Perplexity
- **Storico Analisi**: Salvataggio locale delle analisi effettuate
- **Export PDF**: Generazione report professionali

## 🚀 Deployment su Netlify

### Prerequisiti

- Account Netlify (gratuito): https://app.netlify.com/signup
- Chiave API OpenAI o Perplexity

### Metodo 1: Deploy tramite Netlify CLI (Raccomandato)

1. **Installa Netlify CLI** (se non già installato):
   ```bash
   npm install -g netlify-cli
   ```

2. **Accedi a Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy l'applicazione**:
   ```bash
   cd chimica-organica-zanichelli
   netlify deploy --prod
   ```

4. Segui le istruzioni:
   - Crea un nuovo sito o seleziona uno esistente
   - Directory di pubblicazione: `.` (directory corrente)
   - Functions directory: `netlify/functions`

### Metodo 2: Deploy tramite Git

1. **Crea un repository Git**:
   ```bash
   cd chimica-organica-zanichelli
   git init
   git add .
   git commit -m "Initial commit - v4.1 con proxy"
   ```

2. **Pusha su GitHub/GitLab**:
   ```bash
   git remote add origin <URL_TUO_REPOSITORY>
   git push -u origin main
   ```

3. **Collega a Netlify**:
   - Vai su https://app.netlify.com
   - Click su "Add new site" → "Import an existing project"
   - Seleziona il tuo repository
   - Configurazione:
     - Build command: (lascia vuoto)
     - Publish directory: `.`
     - Functions directory: `netlify/functions`
   - Click su "Deploy site"

### Metodo 3: Deploy Drag & Drop

1. Vai su https://app.netlify.com/drop
2. Trascina l'intera cartella `chimica-organica-zanichelli`
3. Attendi il completamento del deploy

**⚠️ Nota**: Con questo metodo dovrai configurare manualmente le Functions:
- Vai su Site settings → Functions
- Imposta Functions directory: `netlify/functions`

## 🔧 Configurazione Post-Deploy

1. **Apri l'applicazione** all'URL fornito da Netlify (es. `https://chimica-organica-zanichelli.netlify.app`)

2. **Vai su Impostazioni** (click sul pulsante in alto a destra)

3. **Configura il Provider AI**:
   - Seleziona OpenAI o Perplexity
   - Inserisci la tua chiave API
   - Seleziona il modello desiderato
   - Salva

4. **Inizia ad analizzare**:
   - Click su "Nuova Analisi"
   - Carica un PDF del programma o incolla il testo
   - Avvia l'analisi

## 🔑 Ottenere le Chiavi API

### OpenAI
1. Vai su https://platform.openai.com/api-keys
2. Crea un nuovo progetto (se necessario)
3. Genera una nuova chiave API
4. Copia la chiave (inizia con `sk-proj-...`)

**Modelli consigliati:**
- `gpt-4o-mini` - Economico e veloce (raccomandato)
- `gpt-4o` - Bilanciato
- `gpt-4-turbo` - Più potente

### Perplexity
1. Vai su https://www.perplexity.ai/settings/api
2. Genera una nuova chiave API
3. Copia la chiave (inizia con `pplx-...`)

**Modelli consigliati:**
- `llama-3.1-sonar-large-128k-online` - Economico (raccomandato)
- `llama-3.1-sonar-huge-128k-online` - Più potente

## 🧪 Test Locale

Per testare l'applicazione localmente prima del deploy:

```bash
cd chimica-organica-zanichelli
netlify dev
```

L'applicazione sarà disponibile su `http://localhost:8888`

## 📁 Struttura del Progetto

```
chimica-organica-zanichelli/
├── index.html                          # Applicazione principale
├── netlify.toml                        # Configurazione Netlify
├── netlify/
│   └── functions/
│       ├── openai-proxy.js            # Proxy per OpenAI API
│       └── perplexity-proxy.js        # Proxy per Perplexity API
└── README.md                           # Questa documentazione
```

## 🔒 Sicurezza

- Le chiavi API sono salvate **solo nel browser** (localStorage)
- Le chiamate API passano attraverso il proxy Netlify (server-side)
- Nessuna chiave API viene mai esposta nel codice frontend
- Il proxy valida tutte le richieste prima di inoltrarle

## 🐛 Troubleshooting

### Errore "Function not found"
- Verifica che la directory `netlify/functions` sia configurata correttamente
- Controlla che i file `.js` delle functions siano presenti
- Redeploy l'applicazione

### Errore "Invalid API Key"
- Verifica che la chiave API sia corretta
- Controlla che la chiave non sia scaduta
- Assicurati di aver crediti disponibili sul tuo account

### Analisi non parte
- Apri la console del browser (F12)
- Verifica eventuali errori JavaScript
- Controlla che il PDF sia leggibile
- Prova con un testo incollato invece del PDF

### Raccomandazioni inconsistenti
- Questa versione usa temperature bassa (0.2) per risultati deterministici
- Se ottieni risultati diversi, potrebbe essere un problema di parsing del programma
- Verifica che il testo del programma sia stato estratto correttamente

## 📊 Framework di Valutazione

L'applicazione utilizza due framework strutturati:

1. **Framework Valutazione Programmi** (270 punti totali):
   - Copertura argomenti fondamentali
   - Profondità e rigore
   - Approccio pedagogico
   - Competenze sviluppate

2. **Framework Valutazione Manuali** (270 punti totali):
   - Copertura contenuti
   - Qualità didattica
   - Supporti e risorse
   - Adattabilità

## 📞 Supporto

Per problemi o domande:
- Controlla la sezione Troubleshooting
- Verifica i log della console browser (F12)
- Controlla i log Netlify Functions nel dashboard Netlify

## 📝 Changelog

### v4.1 (Corrente)
- ✅ Implementato backend proxy con Netlify Functions
- ✅ Risolto problema CORS OpenAI
- ✅ Supporto Perplexity tramite proxy
- ✅ Migliorata gestione errori API

### v4.0
- Framework di valutazione integrati
- Raccomandazioni deterministiche
- Supporto multi-provider

### v3.0
- Analisi dettagliata manuali
- Confronto competitor
- Export PDF

## 📄 Licenza

Uso interno Zanichelli.

