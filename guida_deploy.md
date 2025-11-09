# 🚀 Guida Rapida al Deployment

## Deployment in 5 Minuti

### Passo 1: Prepara l'Account Netlify

1. Vai su https://app.netlify.com/signup
2. Registrati (gratuito) con GitHub, GitLab, Bitbucket o email
3. Conferma l'email

### Passo 2: Deploy l'Applicazione

**Opzione A - Drag & Drop (più semplice)**

1. Vai su https://app.netlify.com/drop
2. Trascina l'intera cartella `chimica-organica-zanichelli` nella finestra
3. Attendi il completamento (1-2 minuti)
4. Netlify ti fornirà un URL tipo `https://random-name-123456.netlify.app`

**Opzione B - CLI (più controllo)**

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Accedi
netlify login

# Deploy
cd chimica-organica-zanichelli
netlify deploy --prod
```

### Passo 3: Verifica le Functions

1. Vai sul dashboard Netlify del tuo sito
2. Click su "Functions" nel menu laterale
3. Dovresti vedere:
   - ✅ `openai-proxy`
   - ✅ `perplexity-proxy`

Se non le vedi:
- Click su "Site settings" → "Functions"
- Imposta "Functions directory" a `netlify/functions`
- Redeploy il sito

### Passo 4: Configura l'Applicazione

1. Apri l'URL del tuo sito
2. Click su **Impostazioni** (pulsante in alto a destra)
3. Seleziona il provider (OpenAI o Perplexity)
4. Inserisci la tua chiave API
5. Seleziona il modello
6. Click su **Salva Configurazione**

### Passo 5: Testa

1. Click su **Nuova Analisi**
2. Carica un PDF di test o incolla del testo
3. Click su **Avvia Analisi**
4. Verifica che l'analisi parta e completi correttamente

---

## 🔑 Ottenere le Chiavi API

### OpenAI (Raccomandato)

1. Vai su https://platform.openai.com/api-keys
2. Click su "Create new secret key"
3. Dai un nome (es. "Zanichelli Chimica")
4. Copia la chiave (inizia con `sk-proj-...`)
5. **Importante**: Salva la chiave, non potrai rivederla!

**Costi indicativi** (gpt-4o-mini):
- Input: $0.15 per 1M token (~750k parole)
- Output: $0.60 per 1M token (~750k parole)
- Un'analisi tipica costa circa $0.01-0.05

### Perplexity (Alternativa)

1. Vai su https://www.perplexity.ai/settings/api
2. Click su "Generate"
3. Copia la chiave (inizia con `pplx-...`)

**Costi indicativi** (sonar-large):
- $1 per 1M token
- Un'analisi tipica costa circa $0.02-0.08

---

## 🎨 Personalizza il Nome del Sito

Di default Netlify assegna un nome casuale. Per cambiarlo:

1. Vai sul dashboard del tuo sito
2. Click su "Site settings"
3. Sotto "Site information" → "Site name"
4. Click su "Change site name"
5. Inserisci il nome desiderato (es. `chimica-organica-zanichelli`)
6. Il nuovo URL sarà `https://chimica-organica-zanichelli.netlify.app`

**Nota**: I nomi sono univoci, se è già preso dovrai sceglierne un altro.

---

## 🌐 Usa un Dominio Personalizzato (Opzionale)

Se hai un dominio (es. `analisi.zanichelli.it`):

1. Vai su "Domain settings"
2. Click su "Add custom domain"
3. Inserisci il tuo dominio
4. Segui le istruzioni per configurare i DNS
5. Netlify fornirà automaticamente HTTPS gratuito

---

## 🔄 Aggiornare l'Applicazione

### Metodo 1: Drag & Drop
1. Modifica i file localmente
2. Vai sul dashboard Netlify → "Deploys"
3. Trascina la cartella aggiornata

### Metodo 2: CLI
```bash
cd chimica-organica-zanichelli
netlify deploy --prod
```

### Metodo 3: Git (se hai collegato un repository)
```bash
git add .
git commit -m "Aggiornamento"
git push
```
Netlify rileverà automaticamente il push e rifarà il deploy.

---

## 📊 Monitoraggio

### Visualizza i Log delle Functions

1. Dashboard Netlify → "Functions"
2. Click sulla function (es. `openai-proxy`)
3. Vedrai tutte le invocazioni recenti
4. Click su una per vedere i dettagli e i log

### Statistiche di Utilizzo

1. Dashboard → "Analytics"
2. Visualizza:
   - Numero di visite
   - Chiamate alle functions
   - Bandwidth utilizzato
   - Tempo di risposta

---

## ⚠️ Limiti Piano Gratuito Netlify

- ✅ 100 GB bandwidth/mese
- ✅ 125k function requests/mese
- ✅ 100 ore build/mese
- ✅ HTTPS automatico
- ✅ Deploy illimitati

Per l'uso tipico di questa applicazione, il piano gratuito è più che sufficiente.

---

## 🐛 Problemi Comuni

### "Function not found"
**Causa**: Le functions non sono state deployate correttamente.

**Soluzione**:
1. Verifica che la cartella `netlify/functions` esista
2. Controlla che i file `.js` siano presenti
3. Site settings → Functions → Imposta directory a `netlify/functions`
4. Redeploy

### "CORS error" nel browser
**Causa**: Stai testando aprendo il file HTML direttamente (file://).

**Soluzione**: Devi sempre usare Netlify (o un server locale).

### Le analisi non partono
**Causa**: Chiave API non configurata o non valida.

**Soluzione**:
1. Apri la console browser (F12)
2. Verifica gli errori
3. Controlla che la chiave API sia corretta
4. Verifica di avere crediti sul tuo account API

### Timeout durante l'analisi
**Causa**: Le Netlify Functions hanno un timeout di 10 secondi (piano gratuito).

**Soluzione**:
- Usa modelli più veloci (gpt-4o-mini invece di gpt-4)
- Riduci la lunghezza del prompt
- Considera l'upgrade a Netlify Pro (timeout 26 secondi)

---

## 💡 Suggerimenti

1. **Testa localmente prima del deploy**:
   ```bash
   netlify dev
   ```

2. **Usa variabili d'ambiente per chiavi condivise** (opzionale):
   - Site settings → Environment variables
   - Aggiungi `OPENAI_API_KEY`
   - Modifica le functions per usarla se non fornita nel body

3. **Abilita notifiche deploy**:
   - Site settings → Build & deploy → Deploy notifications
   - Ricevi email quando il deploy completa o fallisce

4. **Backup regolari**:
   - Esporta le analisi dallo storico
   - Salva i PDF generati
   - Considera di usare Git per versionare il codice

---

## 📞 Supporto

- **Documentazione Netlify**: https://docs.netlify.com
- **Community Netlify**: https://answers.netlify.com
- **Status Netlify**: https://www.netlifystatus.com

---

## ✅ Checklist Pre-Deploy

- [ ] Ho un account Netlify
- [ ] Ho una chiave API OpenAI o Perplexity
- [ ] Ho verificato che tutti i file siano nella cartella
- [ ] Ho letto questa guida
- [ ] Sono pronto a deployare!

**Tempo stimato**: 5-10 minuti per il primo deploy.

Buon deploy! 🚀

