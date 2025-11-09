# Configurazione Chiave API di Test su Netlify

Questa guida ti spiega come configurare la tua chiave OpenAI come variabile d'ambiente su Netlify, in modo che i colleghi possano usare l'applicazione durante la fase di test **senza dover configurare la propria chiave**.

---

## 🎯 Obiettivo

Permettere ai colleghi di testare l'applicazione immediatamente, senza:
- Creare un account OpenAI
- Ottenere una chiave API
- Configurare l'applicazione

La tua chiave API verrà usata automaticamente come "chiave di test".

---

## 📋 Prerequisiti

- Account Netlify (quello che hai usato per il deploy)
- Chiave API OpenAI (la tua personale)
- Accesso al sito `chimicaorganica-zanichelli.netlify.app`

---

## 🔧 Procedura Passo-Passo

### Passo 1: Accedi a Netlify

1. Vai su: **https://app.netlify.com**
2. Fai login con il tuo account
3. Vedrai la lista dei tuoi siti

### Passo 2: Seleziona il Sito

1. Clicca sul sito **chimicaorganica-zanichelli** (o il nome che hai scelto)
2. Si aprirà la dashboard del sito

### Passo 3: Vai nelle Impostazioni

1. Clicca su **"Site settings"** (in alto a destra)
2. Nel menu laterale sinistro, clicca su **"Environment variables"**
   - Oppure vai direttamente su: **"Build & deploy"** → **"Environment variables"**

### Passo 4: Aggiungi la Variabile d'Ambiente

1. Clicca sul pulsante **"Add a variable"** o **"Add environment variable"**

2. Compila i campi:
   - **Key** (Nome): `DEFAULT_OPENAI_KEY`
   - **Value** (Valore): La tua chiave OpenAI (es. `sk-proj-xxxxxxxxxxxxx`)
   - **Scopes**: Lascia selezionato "All scopes" (o seleziona "Functions" se disponibile)

3. Clicca su **"Create variable"** o **"Save"**

### Passo 5: Rideploy del Sito

**IMPORTANTE**: Le variabili d'ambiente vengono applicate solo dopo un nuovo deploy.

#### Opzione A: Trigger Deploy Manuale
1. Vai su **"Deploys"** (nel menu in alto)
2. Clicca su **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Attendi 1-2 minuti che il deploy completi

#### Opzione B: Rideploy Automatico
1. Fai una piccola modifica al sito (es. aggiungi uno spazio in un file)
2. Ricarica la cartella su Netlify (drag & drop)
3. Il deploy partirà automaticamente

### Passo 6: Verifica che Funzioni

1. Apri il sito in **modalità incognito**: `https://chimicaorganica-zanichelli.netlify.app`
2. **NON** configurare nessuna chiave API
3. Prova a fare un'analisi:
   - Carica un PDF di test
   - Avvia l'analisi
4. Se funziona, vedrai in alto a destra il badge: **"✓ OpenAI (Test)"** (giallo)

---

## 🎨 Come Funziona

### Per i Colleghi (Utenti Finali)

**Scenario 1: Utente NON configura chiave**
- Apre l'app → Vede badge giallo "✓ OpenAI (Test)"
- Può usare subito l'applicazione
- Usa la tua chiave (configurata su Netlify)

**Scenario 2: Utente configura la propria chiave**
- Va in Impostazioni → Inserisce la sua chiave
- Vede badge verde "✓ OpenAI"
- Usa la sua chiave personale

### Per Te (Amministratore)

- Puoi monitorare l'uso della chiave su: https://platform.openai.com/usage
- Puoi rimuovere la chiave di test quando la fase di test finisce
- Puoi cambiare la chiave in qualsiasi momento da Netlify

---

## 💰 Monitoraggio Costi

### Come Controllare l'Uso

1. Vai su: **https://platform.openai.com/usage**
2. Vedrai il consumo giornaliero
3. Ogni analisi costa circa €0.01-0.05

### Limiti Consigliati

Per evitare sorprese, imposta un limite di spesa:

1. Vai su: **https://platform.openai.com/account/limits**
2. Imposta un **"Monthly budget"** (es. €20-50 per il test)
3. Riceverai email se ti avvicini al limite

---

## 🔒 Sicurezza

### La Chiave è Sicura?

✅ **SÌ**, perché:
- È salvata come variabile d'ambiente su Netlify (server-side)
- **NON** è visibile nel codice sorgente pubblico
- **NON** è accessibile ispezionando la pagina
- Solo le funzioni Netlify possono accedervi

### Chi Può Usarla?

- Solo chi conosce l'URL dell'applicazione
- Non è indicizzata su Google
- È "pubblicamente accessibile" ma "nascosta"

### Come Proteggerla Ulteriormente?

Se vuoi maggiore sicurezza:
1. Non condividere l'URL pubblicamente
2. Invialo solo via email ai colleghi
3. Cambia il nome del sito in qualcosa di non ovvio
4. Rimuovi la chiave di test quando il test finisce

---

## 🛑 Come Rimuovere la Chiave di Test

Quando la fase di test finisce:

### Opzione 1: Rimuovi la Variabile d'Ambiente
1. Vai su Netlify → Site settings → Environment variables
2. Trova `DEFAULT_OPENAI_KEY`
3. Clicca su "..." → **"Delete"**
4. Trigger deploy

**Risultato**: L'app tornerà a richiedere la chiave API a ogni utente

### Opzione 2: Lascia la Variabile ma Comunica il Cambio
1. Avvisa i colleghi che devono configurare la propria chiave
2. Lascia la variabile come fallback per emergenze

---

## ❓ Troubleshooting

### Problema: "Chiave API non configurata"

**Causa**: La variabile d'ambiente non è stata applicata

**Soluzione**:
1. Verifica di aver fatto il rideploy dopo aver aggiunto la variabile
2. Controlla che il nome sia esattamente: `DEFAULT_OPENAI_KEY`
3. Verifica che la chiave OpenAI sia valida

### Problema: "Invalid API key"

**Causa**: La chiave OpenAI non è valida o è scaduta

**Soluzione**:
1. Verifica la chiave su: https://platform.openai.com/api-keys
2. Genera una nuova chiave se necessario
3. Aggiorna la variabile su Netlify
4. Rideploy

### Problema: Badge giallo non appare

**Causa**: Il codice non è stato aggiornato

**Soluzione**:
1. Verifica di aver caricato la versione aggiornata dell'applicazione
2. Svuota la cache del browser (Ctrl+Shift+R)
3. Prova in modalità incognito

---

## 📞 Supporto

Se hai problemi:
1. Controlla i log su Netlify: **Deploys** → **Deploy log**
2. Controlla la console del browser (F12 → Console)
3. Verifica l'uso della chiave su OpenAI

---

## ✅ Checklist Finale

Prima di condividere l'app con i colleghi:

- [ ] Variabile `DEFAULT_OPENAI_KEY` configurata su Netlify
- [ ] Deploy completato con successo
- [ ] Testato in modalità incognito (senza configurare chiave)
- [ ] Badge "✓ OpenAI (Test)" visibile
- [ ] Analisi di test completata con successo
- [ ] Limite di spesa impostato su OpenAI
- [ ] URL condiviso con i colleghi

---

**Fatto! I tuoi colleghi possono ora testare l'applicazione senza configurare nulla! 🎉**

