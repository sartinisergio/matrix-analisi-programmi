# 🚀 Istruzioni per Nuova Chat: MATRIX Intelligence Development

## 📋 Context per AI Assistant

Copia e incolla questo messaggio nella nuova chat "MATRIX Intelligence":

---

# MATRIX Intelligence - Sviluppo v1.0

## 🎯 Obiettivo
Sviluppare **MATRIX Intelligence v1.0**: piattaforma web per intelligence commerciale e campagne promozionali automatizzate per editori universitari.

## 📚 Background e Contesto

### Progetto Esistente: MATRIX v1.1
- **Repository**: https://github.com/sartinisergio/matrix-analisi-programmi
- **URL Produzione**: https://matrix-analysis.netlify.app
- **Cosa fa**: Tool web per analisi singola programmi didattici universitari (AI-powered)
- **Tecnologia**: Single Page Application (HTML/JS), deploy Netlify, nessun backend
- **Status**: Produzione stabile, **NON toccare**

### Nuovo Progetto: MATRIX Intelligence
- **Scopo**: Piattaforma per mappatura territorio + campagne promozionali batch
- **Relazione con v1.1**: Complementare (non sostitutivo)
  - v1.1 = Analisi singola per colloqui individuali
  - Intelligence = Database + campagne automatizzate per novità editoriali

## 🏗️ Architettura Decisa: HYBRID (Git + SQLite + Litestream)

### Stack Tecnologico

```
Frontend:
  - Netlify (hosting gratis)
  - HTML/CSS/JavaScript + TailwindCSS
  - URL: https://matrix-intelligence.netlify.app

Backend:
  - Netlify Functions (serverless)
  - Node.js

MATRIX Core:
  - Libreria condivisa (estrae logica da MATRIX v1.1)
  - Pacchetto npm: @sartinisergio/matrix-core
  - Riusata da v1.1 e Intelligence

Dati STATICI (frameworks, catalogo):
  - GitHub repository (JSON files)
  - Versionati con Git
  - Modificabili da interfaccia Admin (commit automatico)
  - Zero costo, backup infinito

Dati DINAMICI (programmi analizzati, campagne):
  - SQLite database locale
  - Litestream → Backup continuo Cloudflare R2
  - Performance massima, costo €1-2/mese
```

### Perché Questa Architettura

✅ Zero vendor lock-in (formati standard)
✅ Costi minimi (€1-2/mese)
✅ Massima portabilità (Git + SQLite)
✅ Resilienza tripla (Git + SQLite + R2)
✅ Nessuna dipendenza critica da servizi esterni

## 📁 Struttura Progetti

### Repository 1: matrix-analisi-programmi (ESISTENTE - NON TOCCARE)
```
/home/user/webapp/matrix-analisi-programmi/
├── index.html (MATRIX v1.1 - INVARIATO)
└── ... (tutti i file attuali)

Deploy: https://matrix-analysis.netlify.app
```

### Repository 2: matrix-core (NUOVO - da creare)
```
/home/user/webapp/matrix-core/
├── package.json
├── src/
│   ├── analisi.js           # Logica analisi programmi (da v1.1)
│   ├── fase05.js            # FASE 0.5 scelta editoriale
│   ├── frameworks.js        # Gestione framework valutazione
│   ├── confronto.js         # Confronto indici libro/programma
│   ├── prompts.js           # Template prompt LLM
│   └── llm.js               # Wrapper OpenAI
└── README.md

Scopo: Logica condivisa tra v1.1 e Intelligence
```

### Repository 3: matrix-intelligence (NUOVO - da creare)
```
/home/user/webapp/matrix-intelligence/
├── package.json
├── index.html               # Landing page
├── login.html               # Autenticazione
├── dashboard.html           # Dashboard principale
├── admin.html               # Gestione frameworks/catalogo
│
├── /database/               # Dati statici (Git)
│   ├── frameworks.json      # 21+ framework valutazione
│   ├── catalogo-competitor.json
│   └── catalogo-zanichelli.json
│
├── /netlify/
│   └── /functions/
│       ├── auth-login.js
│       ├── batch-upload.js
│       ├── analizza-batch.js
│       ├── get-programmi.js
│       ├── crea-campagna.js
│       ├── genera-mail.js
│       ├── save-framework.js
│       └── get-frameworks.js
│
├── netlify.toml
├── litestream.yml
└── README.md

Deploy: https://matrix-intelligence.netlify.app
```

## 🎯 Features Core (MVP Week 8)

### 1. Autenticazione
- Login/signup (email/password)
- JWT token
- Ruoli: admin, promotore, viewer

### 2. Upload e Analisi Programmi
- Upload singolo PDF
- Upload batch (fino 300 PDF)
- Analisi automatica background (usa matrix-core)
- Progress bar real-time
- Salvataggio in SQLite

### 3. Database Programmi
- Lista programmi analizzati
- Filtri: SSD, Ateneo, lacune, profilo
- Ricerca full-text
- Dettaglio singolo programma
- Export CSV/Excel

### 4. Admin (Gestione Dati Condivisi)
- CRUD frameworks → commit Git
- CRUD catalogo competitor → commit Git
- CRUD catalogo Zanichelli → commit Git
- Solo utenti role=admin

### 5. Campagne Promozionali
- Form "Nuova Campagna" (libro da promuovere)
- Sistema confronta libro vs database programmi
- Identificazione target (15-20 docenti)
- Ranking priorità (Alta/Media/Bassa)
- Motivazioni personalizzate per ogni target

### 6. Generazione Mail AI
- LLM genera mail personalizzata per ogni target
- Preview mail
- Modifica manuale
- Export CSV mail (per import CRM)

## 📅 Timeline Sviluppo

**Week 1-2**: Setup + Autenticazione + Database base
**Week 3-4**: Upload batch + Analisi + Lista programmi
**Week 5**: Campagne promozionali core
**Week 6**: Generazione mail AI
**Week 7**: Analytics + Team features
**Week 8**: Bug fixing + MVP pronto

## 📂 Documenti di Riferimento

Nel repository `matrix-analisi-programmi` trovi:

1. **PIANO_SVILUPPO_MATRIX_INTELLIGENCE.md** (36k caratteri)
   - Architettura dettagliata
   - Timeline completa con deliverables
   - Costi e ROI
   - Acceptance criteria

2. **PRESENTAZIONE_COLLEGHI_DUE_SOLUZIONI.md** (40k caratteri)
   - Context business
   - Confronto v1.1 vs Intelligence
   - Casi d'uso

3. **README.md** (MATRIX v1.1)
   - Documentazione tecnica tool esistente
   - Framework valutazione
   - FASE 0.5 implementazione

## 🎬 Come Iniziare

### Step 1: Verifica Working Directory
```bash
pwd
# Output atteso: /home/user

cd /home/user/webapp
ls -la
# Dovresti vedere: matrix-analisi-programmi/
```

### Step 2: Leggi Documentazione Esistente
```bash
cd /home/user/webapp/matrix-analisi-programmi
cat PIANO_SVILUPPO_MATRIX_INTELLIGENCE.md
# Leggi piano completo
```

### Step 3: Chiedi Setup Iniziale
"Procediamo con Week 1: Setup infrastruttura matrix-core e matrix-intelligence"

## 💡 Informazioni Importanti

### Cosa Esiste Già in MATRIX v1.1

- ✅ 21 framework di valutazione (Economia, Diritto, Chimica, etc)
- ✅ 85 manuali Zanichelli catalogati con indici completi
- ✅ Logica completa analisi programmi (6 fasi: 0, 1, 2, 3, 4, 0.5)
- ✅ FASE 0.5: Analisi scelta editoriale (profilo decisionale)
- ✅ Prompt LLM ottimizzati (temperatura, struttura JSON)
- ✅ UI con TailwindCSS

### Cosa Riusare da v1.1

**Estrai e modularizza in matrix-core**:
- Funzione analisi completa programma
- Funzione FASE 0.5 (scelta editoriale)
- Gestione framework valutazione
- Confronto indici capitoli
- Wrapper chiamate OpenAI GPT-4
- Parsing JSON output LLM

### Setup Esterno Richiesto (dall'utente)

**Cloudflare R2** (backup SQLite):
1. Account Cloudflare: https://dash.cloudflare.com
2. Crea bucket "matrix-db"
3. Genera API keys
4. Inserisci in Netlify Environment Variables:
   - `R2_ACCESS_KEY`
   - `R2_SECRET_KEY`
   - `R2_ENDPOINT`

**OpenAI API** (già configurato per v1.1):
- `OPENAI_API_KEY` (già in Netlify env vars)

**GitHub Token** (per commit Git frameworks/catalogo):
- `GITHUB_TOKEN` (con permessi repo)

## 🔧 Sviluppo Incrementale

**Approccio**:
- Deploy continuo (ogni feature completata)
- Test real-time su Netlify
- Commit frequenti su GitHub
- Feedback loop rapido

**Working Directory**:
- **IMPORTANTE**: Ogni comando Bash deve usare `cd /home/user/webapp && comando`
- Bash tool parte sempre da `/home/user`, non mantiene directory

## ✅ Checklist Prima Risposta AI

Prima di iniziare lo sviluppo, conferma di aver:

- [ ] Letto PIANO_SVILUPPO_MATRIX_INTELLIGENCE.md
- [ ] Compreso architettura Hybrid (Git + SQLite)
- [ ] Compreso relazione v1.1 vs Intelligence (complementari)
- [ ] Identificato cosa estrarre da v1.1 per matrix-core
- [ ] Chiaro scope MVP (Week 8)

## 🎯 Risultato Atteso Fine Sviluppo

**MATRIX Intelligence v1.0** operativo con:
- ✅ Login/signup funzionante
- ✅ Upload batch 300 programmi
- ✅ Analisi automatica background
- ✅ Database SQLite con programmi analizzati
- ✅ Admin gestione frameworks/catalogo (commit Git)
- ✅ Campagne promozionali (nuovo libro → target automatici)
- ✅ Generazione mail AI personalizzate
- ✅ Export CSV/Excel
- ✅ Deploy Netlify funzionante
- ✅ Backup Litestream → R2 operativo

**URL finale**: https://matrix-intelligence.netlify.app

**Costo hosting**: €1-2/mese (solo R2 storage)

---

## 🚀 Prima Richiesta Suggerita

"Ciao! Sono pronto a sviluppare MATRIX Intelligence v1.0.

Ho letto il context e il piano di sviluppo completo.

**Domande di conferma prima di iniziare**:

1. Confermi architettura Hybrid (Git JSON + SQLite + Litestream)?
2. Creo subito 3 repository (matrix-core, matrix-intelligence) o procediamo step-by-step?
3. Hai già fatto setup Cloudflare R2 o serve guida?
4. Partiamo da Week 1 (setup) o hai preferenze diverse?

Appena confermi, inizio con lo sviluppo! 🎯"

---

**Fine Istruzioni**

---

## 📎 Note Aggiuntive

- Questa chat ha solo context MATRIX v1.1 esistente
- Nuova chat avrà context specifico Intelligence
- Mantieni separazione logica tra progetti
- v1.1 resta in produzione stabile (non toccare)
- Intelligence è nuovo progetto indipendente

**Repository reference**: https://github.com/sartinisergio/matrix-analisi-programmi

**Quando sei pronto**: Apri nuova chat, copia-incolla le istruzioni sopra, parti con sviluppo! 🚀
