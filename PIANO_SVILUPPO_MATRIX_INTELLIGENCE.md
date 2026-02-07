# 📋 Piano di Sviluppo Completo: MATRIX Intelligence v1.0

## 🎯 Executive Summary

**Progetto**: MATRIX Intelligence - Piattaforma di intelligence commerciale per promozione editoriale  
**Obiettivo**: Sistema automatizzato per mappatura territorio e campagne promozionali mirate  
**Timeline**: 8 settimane sviluppo + 2 settimane testing  
**Investimento**: Sviluppo incluso nella conversazione, hosting €1-2/mese  
**ROI Atteso**: 75% riduzione tempo promozione (da 8 settimane a 2 settimane per pubblicazione)

---

## 📐 Architettura Tecnica

### **Stack Tecnologico (Opzione A: Hybrid)**

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND                                                │
│  Hosting: Netlify (GRATIS)                              │
│  Deploy: Automatico da GitHub                           │
│  URL: https://matrix-intelligence.netlify.app           │
│                                                          │
│  • HTML/CSS/JavaScript (TailwindCSS)                    │
│  • Interfaccia login/dashboard                          │
│  • Upload batch programmi                               │
│  • Gestione campagne promozionali                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  BACKEND                                                 │
│  Netlify Functions (Serverless)                         │
│  Costo: GRATIS tier free (125k req/mese)                │
│                                                          │
│  • API REST per frontend                                │
│  • Autenticazione utenti                                │
│  • Upload/analisi programmi                             │
│  • Generazione campagne                                 │
│  • Integrazione LLM (OpenAI GPT-4)                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MATRIX CORE (Libreria Condivisa)                       │
│  Repository: matrix-core                                │
│                                                          │
│  • Logica analisi programmi (da MATRIX v1.1)            │
│  • FASE 0.5 (scelta editoriale)                         │
│  • Framework valutazione                                │
│  • Prompt LLM ottimizzati                               │
│  • Confronto capitoli libro vs programma                │
│                                                          │
│  Riusato da:                                             │
│  ✅ MATRIX v1.1 (resta invariato)                        │
│  ✅ MATRIX Intelligence (nuovo)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DATI "STATICI" (Config)                                │
│  Storage: GitHub Repository (JSON files)                │
│  Costo: GRATIS                                           │
│                                                          │
│  • /database/frameworks.json (21+ frameworks)           │
│  • /database/catalogo-competitor.json (200+ manuali)    │
│  • /database/catalogo-zanichelli.json (85 manuali)      │
│                                                          │
│  ✅ Versionati con Git (history completa)               │
│  ✅ Backup automatico (GitHub)                          │
│  ✅ Modificabili da interfaccia Admin                   │
│  ✅ Deploy trigger automatico su modifica               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DATI "DINAMICI" (Analytics)                            │
│  Storage: SQLite + Litestream → Cloudflare R2          │
│  Costo: €1-2/mese (storage backup)                      │
│                                                          │
│  SQLite Database Locale:                                │
│  • programmi_analizzati (300-1000+ record)              │
│  • campagne_promozionali (storico)                      │
│  • utenti (team)                                        │
│  • analytics_kpi (metriche)                             │
│                                                          │
│  Litestream:                                             │
│  • Backup continuo ogni 10 secondi → Cloudflare R2      │
│  • Restore automatico in caso disaster                  │
│  • Versioning incrementale                              │
│                                                          │
│  ✅ Performance massima (DB locale)                     │
│  ✅ Resilienza (backup continuo)                        │
│  ✅ Zero vendor lock-in (SQLite standard)               │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Struttura Progetti

### **Repository 1: matrix-analisi-programmi** (Esistente - Invariato)

```
/home/user/webapp/matrix-analisi-programmi/
├── index.html                    ← MATRIX v1.1 (invariato)
├── welcome.html
├── README.md
└── [tutti i file attuali restano identici]

Deploy: https://matrix-analysis.netlify.app
Scopo: Analisi singola programmi (colloqui individuali)
Stato: PRODUZIONE - Non toccare
```

---

### **Repository 2: matrix-core** (Nuovo - Libreria)

```
/home/user/webapp/matrix-core/
├── package.json
├── README.md
├── src/
│   ├── analisi.js               ← Logica estrazione info programma
│   ├── fase05.js                ← Logica FASE 0.5 (scelta editoriale)
│   ├── frameworks.js            ← Gestione framework valutazione
│   ├── confronto-capitoli.js    ← Confronto indici libro/programma
│   ├── prompts.js               ← Template prompt LLM
│   ├── llm.js                   ← Wrapper chiamate OpenAI
│   └── utils.js                 ← Utility condivise
├── test/
│   └── analisi.test.js          ← Unit test
└── examples/
    └── esempio-uso.js

Pubblicazione: npm private package @sartinisergio/matrix-core
Scopo: Logica condivisa tra v1.1 e Intelligence
Usato da: MATRIX v1.1 + Intelligence
```

---

### **Repository 3: matrix-intelligence** (Nuovo - Piattaforma)

```
/home/user/webapp/matrix-intelligence/
├── package.json
│   dependencies:
│     "@sartinisergio/matrix-core": "^1.0.0"
│     "better-sqlite3": "^9.0.0"
│     "@octokit/rest": "^20.0.0"
│
├── index.html                    ← Landing page pubblica
├── login.html                    ← Pagina login
├── dashboard.html                ← Dashboard principale
├── admin.html                    ← Gestione frameworks/catalogo
│
├── /database/                    ← Dati statici (Git)
│   ├── frameworks.json
│   ├── catalogo-competitor.json
│   └── catalogo-zanichelli.json
│
├── /netlify/
│   ├── /functions/
│   │   ├── auth-login.js        ← Autenticazione
│   │   ├── batch-upload.js      ← Upload multipli PDF
│   │   ├── analizza-batch.js    ← Worker analisi (usa matrix-core)
│   │   ├── get-programmi.js     ← Lista programmi analizzati
│   │   ├── crea-campagna.js     ← Nuova campagna promozionale
│   │   ├── genera-mail.js       ← Generazione mail LLM
│   │   ├── save-framework.js    ← Salva framework (commit Git)
│   │   └── get-frameworks.js    ← Carica frameworks (da Git)
│   │
│   └── /edge-functions/
│       └── analytics.js          ← KPI real-time
│
├── /scripts/
│   ├── setup-litestream.sh      ← Setup backup SQLite
│   └── migrate-db.js            ← Migrations schema
│
├── netlify.toml                  ← Configurazione deploy
├── litestream.yml                ← Configurazione backup
├── README.md
└── MANUAL.md                     ← Manuale utente

Deploy: https://matrix-intelligence.netlify.app
Scopo: Piattaforma campagne promozionali team
Stato: SVILUPPO → PRODUZIONE (Week 8)
```

---

## 📅 Timeline Sviluppo (10 Settimane)

### **🔧 FASE 1: Setup e Fondamenta (Settimane 1-2)**

#### **Week 1: Setup Infrastruttura**

**Obiettivi**:
- ✅ Repository matrix-core creato
- ✅ Repository matrix-intelligence creato
- ✅ Netlify Functions configurate
- ✅ Litestream + Cloudflare R2 setup
- ✅ Database JSON in Git

**Deliverables**:
1. **matrix-core**: Pacchetto npm con logica base MATRIX
2. **matrix-intelligence**: Struttura progetto completa
3. **Deploy iniziale**: https://matrix-intelligence.netlify.app (landing page)
4. **Backup funzionante**: SQLite → R2 ogni 10 secondi

**Attività Dettagliate**:

**Giorno 1-2: Estrazione matrix-core**
```javascript
// Estraggo logica da index.html MATRIX v1.1
// e la modularizo in funzioni pure

// Esempio: src/analisi.js
export async function estraiInformazioniProgramma(testo) {
  // Logica FASE 0 (da MATRIX v1.1)
  const prompt = `Estrai informazioni da programma...`
  const risultato = await callLLM(prompt, 0.2)
  return JSON.parse(risultato)
}

export async function analizzaSceltaEditoriale(
  programma, 
  manualePrincipale, 
  manualiAlternativi
) {
  // Logica FASE 0.5 (da MATRIX v1.1)
  const prompt = `Analizza scelta editoriale...`
  const risultato = await callLLM(prompt, 0.3)
  return JSON.parse(risultato)
}
```

**Giorno 3-4: Setup matrix-intelligence**
```bash
# Creo struttura repository
mkdir matrix-intelligence
cd matrix-intelligence
npm init -y
npm install @sartinisergio/matrix-core better-sqlite3

# Setup Netlify Functions
mkdir -p netlify/functions

# Setup database files in Git
mkdir database
touch database/frameworks.json
touch database/catalogo-competitor.json
touch database/catalogo-zanichelli.json
```

**Giorno 5: Configurazione Litestream**
```yaml
# litestream.yml
dbs:
  - path: /var/data/matrix-intelligence.db
    replicas:
      - url: r2://matrix-db/production.db
        access-key-id: ${R2_ACCESS_KEY}
        secret-access-key: ${R2_SECRET_KEY}
        sync-interval: 10s
```

**Giorno 6-7: Landing Page + Deploy**
```html
<!-- index.html base -->
<!DOCTYPE html>
<html>
<head>
  <title>MATRIX Intelligence</title>
</head>
<body>
  <h1>MATRIX Intelligence</h1>
  <p>Piattaforma di intelligence commerciale</p>
  <a href="/login.html">Accedi</a>
</body>
</html>
```

**Setup da fare tu (30 minuti)**:
1. Crea account Cloudflare R2: https://dash.cloudflare.com/
2. Crea bucket "matrix-db"
3. Genera API keys (Access Key + Secret Key)
4. Aggiungi in Netlify Environment Variables:
   - `R2_ACCESS_KEY=...`
   - `R2_SECRET_KEY=...`
   - `R2_ENDPOINT=...`

---

#### **Week 2: Autenticazione + Database Base**

**Obiettivi**:
- ✅ Sistema login/signup funzionante
- ✅ SQLite database schema creato
- ✅ Prima Function operativa (test)
- ✅ Admin può creare frameworks in Git

**Deliverables**:
1. **Login/Signup**: Pagina autenticazione completa
2. **SQLite Schema**: Tabelle utenti, programmi, campagne
3. **Admin Interface**: Form creazione framework → commit Git
4. **Test end-to-end**: Login → Dashboard → Crea framework

**Attività Dettagliate**:

**Giorno 1-3: Sistema Autenticazione**
```javascript
// netlify/functions/auth-login.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Database from 'better-sqlite3'

const db = new Database('/var/data/matrix-intelligence.db')

export async function handler(event) {
  const { email, password } = JSON.parse(event.body)
  
  // Verifica credenziali
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Credenziali non valide' }) }
  }
  
  // Genera JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  
  return {
    statusCode: 200,
    body: JSON.stringify({ token, user: { id: user.id, email: user.email, role: user.role } })
  }
}
```

**Giorno 4-5: Database Schema**
```sql
-- scripts/init-db.sql

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nome TEXT,
  cognome TEXT,
  role TEXT CHECK(role IN ('admin', 'promotore', 'viewer')) DEFAULT 'promotore',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programmi_analizzati (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  docente_nome TEXT,
  docente_email TEXT,
  ateneo TEXT,
  corso_laurea TEXT,
  ssd TEXT,
  materia TEXT,
  manuale_principale_titolo TEXT,
  manuale_principale_autore TEXT,
  manuali_alternativi JSON,
  lacune JSON,
  profilo_decisionale TEXT,
  analisi_completa JSON,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS campagne_promozionali (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  nome_campagna TEXT NOT NULL,
  libro_titolo TEXT,
  libro_autore TEXT,
  libro_indice JSON,
  ssd_target TEXT,
  target_identificati JSON,
  status TEXT CHECK(status IN ('draft', 'active', 'completed')) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_programmi_user ON programmi_analizzati(user_id);
CREATE INDEX idx_programmi_ssd ON programmi_analizzati(ssd);
CREATE INDEX idx_campagne_user ON campagne_promozionali(user_id);
```

**Giorno 6-7: Admin Frameworks (Commit su Git)**
```javascript
// netlify/functions/save-framework.js
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function handler(event) {
  const { materia, ssd, criteri } = JSON.parse(event.body)
  
  // Verifica utente è admin (dal JWT token)
  const user = verifyToken(event.headers.authorization)
  if (user.role !== 'admin') {
    return { statusCode: 403, body: JSON.stringify({ error: 'Permesso negato' }) }
  }
  
  // Leggi frameworks.json attuale da GitHub
  const { data: file } = await octokit.repos.getContent({
    owner: 'sartinisergio',
    repo: 'matrix-intelligence',
    path: 'database/frameworks.json'
  })
  
  const frameworks = JSON.parse(Buffer.from(file.content, 'base64').toString())
  
  // Aggiungi nuovo framework
  frameworks.push({
    id: generateId(),
    materia,
    ssd,
    criteri,
    created_at: new Date().toISOString()
  })
  
  // Commit su GitHub
  await octokit.repos.createOrUpdateFileContents({
    owner: 'sartinisergio',
    repo: 'matrix-intelligence',
    path: 'database/frameworks.json',
    message: `feat(frameworks): Aggiungi ${materia} (${ssd})`,
    content: Buffer.from(JSON.stringify(frameworks, null, 2)).toString('base64'),
    sha: file.sha
  })
  
  return { statusCode: 200, body: JSON.stringify({ message: 'Framework salvato' }) }
}
```

---

### **🔨 FASE 2: Core Features (Settimane 3-5)**

#### **Week 3: Upload e Analisi Programmi**

**Obiettivi**:
- ✅ Upload singolo PDF programma
- ✅ Upload batch (multipli PDF)
- ✅ Analisi automatica usando matrix-core
- ✅ Salvataggio in SQLite
- ✅ Visualizzazione lista programmi analizzati

**Deliverables**:
1. **Upload UI**: Drag & drop per file singoli e batch
2. **Worker analisi**: Processa file in background
3. **Progress bar**: Visualizzazione progresso analisi (47/300)
4. **Lista programmi**: Tabella con filtri e ricerca

**Attività**:

**Giorno 1-2: Upload Interface**
```html
<!-- dashboard.html - Sezione Upload -->
<div id="uploadSection">
  <h2>📤 Carica Programmi</h2>
  
  <div class="upload-dropzone">
    <input type="file" id="fileInput" multiple accept=".pdf" />
    <p>Trascina qui i PDF o clicca per selezionare</p>
    <p class="text-sm">Massimo 300 file, 50MB ciascuno</p>
  </div>
  
  <div id="uploadProgress" class="hidden">
    <p>Caricamento in corso...</p>
    <div class="progress-bar">
      <div id="progressFill" style="width: 0%"></div>
    </div>
    <p id="progressText">0/0 file caricati</p>
  </div>
</div>
```

**Giorno 3-5: Worker Analisi Background**
```javascript
// netlify/functions/analizza-batch.js
import { analizzaProgrammaCompleto } from '@sartinisergio/matrix-core'
import Database from 'better-sqlite3'

const db = new Database('/var/data/matrix-intelligence.db')

export async function handler(event) {
  const { jobId } = JSON.parse(event.body)
  
  // Recupera file da analizzare (salvati in upload)
  const jobs = db.prepare('SELECT * FROM analisi_jobs WHERE batch_id = ? AND status = ?')
    .all(jobId, 'pending')
  
  for (const job of jobs) {
    try {
      // Scarica PDF
      const pdfBuffer = await downloadFromStorage(job.file_url)
      const testoProgramma = await estraiTestoDaPDF(pdfBuffer)
      
      // 🎯 Analisi usando MATRIX Core
      const analisi = await analizzaProgrammaCompleto(testoProgramma, {
        framework: job.framework_id,
        includiManualePrincipale: true
      })
      
      // Salva in SQLite
      db.prepare(`
        INSERT INTO programmi_analizzati (
          id, user_id, docente_nome, docente_email, ateneo, 
          ssd, materia, manuale_principale_titolo,
          lacune, profilo_decisionale, analisi_completa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        generateId(),
        job.user_id,
        analisi.fase0.docente,
        analisi.fase0.email,
        analisi.fase0.ateneo,
        analisi.fase0.ssd,
        analisi.fase0.materia,
        analisi.fase05?.manuale_principale?.titolo,
        JSON.stringify(analisi.fase4.lacune),
        analisi.fase05?.profilo_decisionale?.tipo,
        JSON.stringify(analisi)
      )
      
      // Aggiorna status job
      db.prepare('UPDATE analisi_jobs SET status = ? WHERE id = ?')
        .run('completed', job.id)
      
    } catch (error) {
      db.prepare('UPDATE analisi_jobs SET status = ?, error = ? WHERE id = ?')
        .run('failed', error.message, job.id)
    }
  }
  
  return { statusCode: 200, body: JSON.stringify({ processed: jobs.length }) }
}
```

**Giorno 6-7: Lista Programmi + Filtri**
```javascript
// dashboard.html - Lista Programmi
async function caricaProgrammi() {
  const response = await fetch('/.netlify/functions/get-programmi', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const programmi = await response.json()
  
  const tbody = document.getElementById('programmiTable')
  tbody.innerHTML = programmi.map(p => `
    <tr>
      <td>${p.docente_nome}</td>
      <td>${p.ateneo}</td>
      <td>${p.materia}</td>
      <td>${p.manuale_principale_titolo || 'N/A'}</td>
      <td><span class="badge badge-${p.profilo_decisionale}">${p.profilo_decisionale}</span></td>
      <td>
        <button onclick="viewDetails('${p.id}')">📄 Dettagli</button>
        <button onclick="deleteProgramma('${p.id}')">🗑️</button>
      </td>
    </tr>
  `).join('')
}
```

---

#### **Week 4: Gestione Database e Admin**

**Obiettivi**:
- ✅ Admin: CRUD frameworks (da interfaccia → Git)
- ✅ Admin: CRUD catalogo competitor (da interfaccia → Git)
- ✅ Admin: CRUD catalogo Zanichelli (da interfaccia → Git)
- ✅ Ricerca avanzata programmi (filtri multipli)
- ✅ Export programmi (CSV/Excel)

**Deliverables**:
1. **Admin Panel**: Interfaccia completa gestione dati statici
2. **Ricerca**: Filtri per SSD, Ateneo, lacune, profilo
3. **Export**: Download CSV/Excel lista programmi

---

#### **Week 5: Campagne Promozionali (Core)**

**Obiettivi**:
- ✅ Form "Nuova Campagna" (titolo libro, indice, SSD)
- ✅ Confronto automatico libro vs database programmi
- ✅ Identificazione target con priorità (Alta/Media/Bassa)
- ✅ Visualizzazione lista target con motivazioni

**Deliverables**:
1. **Form Campagna**: Input libro nuovo da promuovere
2. **Engine Confronto**: Usa matrix-core per confrontare indice libro vs programmi
3. **Ranking Target**: Algoritmo priorità basato su lacune + profilo
4. **Report Target**: Lista docenti con motivazioni personalizzate

**Attività**:

**Giorno 1-3: Form Nuova Campagna**
```html
<!-- dashboard.html - Nuova Campagna -->
<div id="nuovaCampagna">
  <h2>🚀 Nuova Campagna Promozionale</h2>
  
  <form id="campagnaForm">
    <div class="form-group">
      <label>Titolo Libro</label>
      <input type="text" id="libroTitolo" required />
    </div>
    
    <div class="form-group">
      <label>Autore</label>
      <input type="text" id="libroAutore" required />
    </div>
    
    <div class="form-group">
      <label>SSD Target</label>
      <select id="ssdTarget" required>
        <option value="">Seleziona...</option>
        <option value="SECS-P/01">SECS-P/01 - Economia Politica</option>
        <option value="CHIM/06">CHIM/06 - Chimica Organica</option>
        <!-- ... -->
      </select>
    </div>
    
    <div class="form-group">
      <label>Indice Libro</label>
      <textarea id="libroIndice" rows="10" placeholder="Incolla indice capitoli..."></textarea>
      <p class="text-sm">Oppure:</p>
      <input type="file" id="pdfIndice" accept=".pdf" />
    </div>
    
    <button type="submit">🔍 Analizza Target</button>
  </form>
</div>
```

**Giorno 4-7: Engine Identificazione Target**
```javascript
// netlify/functions/crea-campagna.js
import { confrontaLibroConProgramma } from '@sartinisergio/matrix-core'
import Database from 'better-sqlite3'

const db = new Database('/var/data/matrix-intelligence.db')

export async function handler(event) {
  const { libroTitolo, libroAutore, libroIndice, ssdTarget } = JSON.parse(event.body)
  const user = verifyToken(event.headers.authorization)
  
  // 1. Recupera programmi analizzati per quel SSD
  const programmi = db.prepare('SELECT * FROM programmi_analizzati WHERE ssd = ?')
    .all(ssdTarget)
  
  // 2. Carica framework per quel SSD (da Git)
  const frameworks = JSON.parse(await fs.readFile('database/frameworks.json', 'utf8'))
  const framework = frameworks.find(f => f.ssd === ssdTarget)
  
  // 3. Per ogni programma, calcola rilevanza libro nuovo
  const targetConPriorita = []
  
  for (const programma of programmi) {
    // 🎯 Usa MATRIX Core per confronto
    const confronto = await confrontaLibroConProgramma(
      {
        programma: programma.analisi_completa,
        manualePrincipale: {
          titolo: programma.manuale_principale_titolo,
          autore: programma.manuale_principale_autore
        }
      },
      {
        titolo: libroTitolo,
        autore: libroAutore,
        indice: libroIndice
      }
    )
    
    // Calcola priorità basata su:
    // - Gap identificati (lacune programma coperte da libro nuovo)
    // - Profilo decisionale (innovatori = priorità alta)
    // - Rilevanza contenuti (overlap tematiche)
    
    const score = calcolaPriorita(
      confronto,
      programma.lacune,
      programma.profilo_decisionale
    )
    
    if (score > 30) { // Soglia minima rilevanza
      targetConPriorita.push({
        programma_id: programma.id,
        docente: programma.docente_nome,
        email: programma.docente_email,
        ateneo: programma.ateneo,
        priorita: score >= 70 ? 'Alta' : score >= 50 ? 'Media' : 'Bassa',
        score: score,
        motivazioni: {
          lacune_coperte: confronto.lacune_coperte,
          capitoli_rilevanti: confronto.capitoli_rilevanti,
          strategia: confronto.strategia_suggerita
        }
      })
    }
  }
  
  // Ordina per priorità
  targetConPriorita.sort((a, b) => b.score - a.score)
  
  // 4. Salva campagna
  const campagnaId = generateId()
  db.prepare(`
    INSERT INTO campagne_promozionali (
      id, user_id, nome_campagna, libro_titolo, libro_autore,
      libro_indice, ssd_target, target_identificati, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    campagnaId,
    user.userId,
    `Campagna ${libroTitolo}`,
    libroTitolo,
    libroAutore,
    JSON.stringify(libroIndice),
    ssdTarget,
    JSON.stringify(targetConPriorita),
    'active'
  )
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      campagna_id: campagnaId,
      target_trovati: targetConPriorita.length,
      target: targetConPriorita
    })
  }
}
```

---

### **🎨 FASE 3: Features Avanzate (Settimane 6-7)**

#### **Week 6: Generazione Mail Automatica**

**Obiettivi**:
- ✅ Integrazione LLM per generazione mail personalizzate
- ✅ Template mail con personalizzazione avanzata
- ✅ Preview mail prima invio
- ✅ Modifica manuale mail generate

**Deliverables**:
1. **Generatore Mail**: LLM genera mail per ogni target
2. **Preview Interface**: Visualizza mail prima invio
3. **Editor Mail**: Modifica manuale testo
4. **Export Mail**: CSV con mail pronte per import CRM

**Attività**:

```javascript
// netlify/functions/genera-mail.js
import { callLLM } from '@sartinisergio/matrix-core'

export async function handler(event) {
  const { campagna_id, target_id } = JSON.parse(event.body)
  
  // Recupera dati campagna e target
  const campagna = db.prepare('SELECT * FROM campagne_promozionali WHERE id = ?')
    .get(campagna_id)
  
  const targetData = JSON.parse(campagna.target_identificati)
    .find(t => t.programma_id === target_id)
  
  const programma = db.prepare('SELECT * FROM programmi_analizzati WHERE id = ?')
    .get(target_id)
  
  // Prompt per LLM
  const prompt = `
Sei un esperto di comunicazione commerciale per case editrici universitarie.

DATI DOCENTE:
- Nome: ${targetData.docente}
- Ateneo: ${targetData.ateneo}
- Materia: ${programma.materia}
- Manuale attuale: ${programma.manuale_principale_titolo}
- Lacune identificate: ${JSON.stringify(programma.lacune)}
- Profilo decisionale: ${programma.profilo_decisionale}

NUOVO LIBRO DA PROMUOVERE:
- Titolo: ${campagna.libro_titolo}
- Autore: ${campagna.libro_autore}
- Capitoli rilevanti: ${JSON.stringify(targetData.motivazioni.capitoli_rilevanti)}
- Come colma lacune: ${targetData.motivazioni.lacune_coperte}

STRATEGIA SUGGERITA:
${targetData.motivazioni.strategia}

COMPITO:
Scrivi una mail personalizzata di presentazione del nuovo libro.
- Oggetto: max 60 caratteri, specifico e accattivante
- Corpo: 200-300 parole
- Tono professionale ma caldo
- Menziona specificamente: lacune sue attuali, come libro le risolve, capitoli rilevanti
- Chiusura con call-to-action (invio copia saggio)

OUTPUT formato JSON:
{
  "oggetto": "...",
  "corpo": "..."
}
`
  
  const mail = await callLLM(prompt, 0.7) // Temperatura più alta per creatività
  
  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(mail))
  }
}
```

---

#### **Week 7: Analytics e Team Features**

**Obiettivi**:
- ✅ Dashboard analytics (KPI, ROI, tassi conversione)
- ✅ Multi-utente team (assegnazione territori)
- ✅ Storico campagne con metriche
- ✅ Export report PDF

**Deliverables**:
1. **Dashboard Analytics**: Grafici KPI
2. **Gestione Team**: Admin assegna Atenei a promotori
3. **Report Campagne**: Export PDF con risultati
4. **Tracking Follow-up**: Status contatti (da contattare/contattato/adozione)

---

### **🚀 FASE 4: Testing e Deployment (Settimane 8-10)**

#### **Week 8: Bug Fixing e Ottimizzazioni**

**Obiettivi**:
- ✅ Test completo end-to-end
- ✅ Bug fixing
- ✅ Ottimizzazione performance
- ✅ Validazione UX

---

#### **Week 9: Documentazione e Training**

**Obiettivi**:
- ✅ Manuale utente completo (MANUAL.md)
- ✅ Video tutorial (5-10 minuti)
- ✅ FAQ e troubleshooting
- ✅ Guida admin

**Deliverables**:
1. **MANUAL.md**: Guida passo-passo con screenshot
2. **Video**: Screencast workflow completo
3. **FAQ**: 20+ domande comuni con risposte

---

#### **Week 10: Pilot e Lancio**

**Obiettivi**:
- ✅ Pilot con 2-3 promotori volontari
- ✅ Feedback e aggiustamenti
- ✅ Lancio ufficiale team

**Attività**:
1. Setup account pilot users
2. Training sessione 1 ora
3. Monitoraggio utilizzo prima settimana
4. Raccolta feedback strutturato
5. Implementazione fix critici
6. Roll-out completo team

---

## 💰 Costi Dettagliati

### **Sviluppo**

| Voce | Costo |
|------|-------|
| Sviluppo codice (incluso nella conversazione) | €0 |
| Setup infrastruttura (da te: 1 ora) | €0 |
| Testing (da te: 10 ore) | €0 |
| **TOTALE SVILUPPO** | **€0** |

### **Hosting Mensile**

| Servizio | Piano | Costo |
|----------|-------|-------|
| **Netlify** (frontend + functions) | Free tier (125k req/mese) | €0 |
| **GitHub** (repository privati) | Free tier | €0 |
| **Cloudflare R2** (backup SQLite) | 10GB storage | €1-2 |
| **TOTALE MENSILE** | | **€1-2** |

### **Costi Variabili (Solo se Scala Molto)**

| Scenario | Soglia | Costo Extra |
|----------|--------|-------------|
| Netlify Functions > 125k req/mese | >50 utenti attivi/giorno | +€10/mese |
| R2 Storage > 10GB | >5000 programmi analizzati | +€1/mese per 10GB |
| OpenAI API calls (generazione mail) | >1000 mail/mese | ~€5-10/mese |

**Stima reale primo anno**: €24-48 totali (€2-4/mese)

---

## 📊 ROI Previsto

### **Investimento Totale Primo Anno**

```
Sviluppo: €0 (incluso in conversazione)
Hosting: €24-48 (€2-4/mese × 12 mesi)
Training: 5 ore (interne)

TOTALE: ~€50
```

### **Risparmio per Promotore/Anno**

**Scenario**: Promotore gestisce 10 nuove pubblicazioni/anno

**Senza MATRIX Intelligence** (workflow tradizionale):
- Tempo per pubblicazione: 8 settimane
- Totale anno: 80 settimane (impossibile!)
- Conversione: 5% (2-3 adozioni per pubblicazione)

**Con MATRIX Intelligence**:
- Tempo per pubblicazione: 2 settimane
- Totale anno: 20 settimane (gestibile!)
- Conversione: 30% (4-5 adozioni per pubblicazione)

**Risparmio tempo**: 60 settimane/anno = **15 mesi/anno** (impossibile senza tool)  
**Aumento adozioni**: +100-150% (da 20-30 → 40-50 adozioni/anno)  
**Valore commerciale**: +€50-100k/anno per promotore (stima conservativa)

### **ROI Team 10 Promotori**

```
Investimento: €50/anno (hosting)
Risparmio tempo: 150 mesi equivalenti
Aumento adozioni: +200-400 adozioni/anno
Valore commerciale: +€500k-1M/anno

ROI: 10.000x - 20.000x
```

---

## 🎯 Metriche di Successo

### **KPI Fase Pilot (Week 10)**

| Metrica | Baseline | Target | Stretch Goal |
|---------|----------|--------|--------------|
| Tempo mappatura territorio | N/A | 2 settimane | 1 settimana |
| Tempo creazione campagna | 8 settimane | 2 settimane | 1 settimana |
| Tasso conversione mail | 5% | 25% | 35% |
| Docenti contattati per pubblicazione | 50 generici | 15 mirati | 10 mirati |
| Tempo preparazione mail | 5 ore (50 mail) | 2 ore (15 mail) | 1 ora |
| Soddisfazione utente (1-10) | N/A | 7 | 9 |

### **KPI Primo Trimestre Produzione**

- ✅ 5+ promotori attivi
- ✅ 500+ programmi analizzati
- ✅ 10+ campagne completate
- ✅ 30%+ tasso conversione medio
- ✅ Zero downtime critico
- ✅ <2 secondi tempo caricamento pagine

---

## 🔧 Manutenzione e Supporto

### **Attività Manutenzione Ordinaria**

**Mensile**:
- Verifica backup Litestream (automatico, solo monitoring)
- Review log errori Netlify Functions
- Aggiornamento frameworks/catalogo (1-2 ore, da admin)

**Trimestrale**:
- Aggiornamento dipendenze npm (security patches)
- Review performance e ottimizzazioni
- Backup manuale completo (export Git + SQLite)

**Annuale**:
- Revisione architettura
- Pianificazione nuove features
- Audit sicurezza

**Tempo stimato manutenzione**: 2-3 ore/mese

---

## 🚨 Rischi e Mitigazioni

### **Rischio 1: Cloudflare R2 Downtime**

**Impatto**: Backup temporaneamente non funzionante  
**Probabilità**: Bassa (SLA 99.9%)  
**Mitigazione**:
- SQLite locale continua a funzionare
- Backup locali settimanali (pg_dump)
- Quando R2 torna online, Litestream riprende automaticamente

---

### **Rischio 2: GitHub API Rate Limits**

**Impatto**: Impossibile salvare nuovi frameworks temporaneamente  
**Probabilità**: Molto bassa (5000 req/ora per account)  
**Mitigazione**:
- Cache locale frameworks (rileggi solo se modificato)
- Fallback: modifica diretta file JSON nel repository
- Alert se ci si avvicina a limiti

---

### **Rischio 3: OpenAI API Costi Imprevisti**

**Impatto**: Costo generazione mail aumenta  
**Probabilità**: Media (dipende da utilizzo)  
**Mitigazione**:
- Limite mensile configurabile (es: 1000 mail/mese)
- Alert quando si supera 80% limite
- Fallback: template mail manuale se limite raggiunto
- Cache mail già generate per docenti simili

---

### **Rischio 4: Scalabilità SQLite**

**Impatto**: Performance degrada con >10k programmi  
**Probabilità**: Bassa (previsione 1-2k primo anno)  
**Mitigazione**:
- Monitoring performance query
- Indici database ottimizzati
- Piano migrazione a PostgreSQL se necessario (6 ore lavoro)
- SQLite supporta fino a 140TB teorici (più che sufficiente)

---

## 📚 Documentazione Finale Deliverables

### **Per Utenti Finali**

1. **MANUAL.md** - Manuale utente (50+ pagine)
   - Quick start guide
   - Tutorial passo-passo
   - FAQ
   - Troubleshooting

2. **Video Tutorial** (10-15 minuti)
   - Panoramica piattaforma
   - Workflow completo: upload → campagna → mail

3. **Cheat Sheet** (1 pagina PDF)
   - Comandi rapidi
   - Shortcuts
   - Best practices

### **Per Admin/Tecnici**

1. **README_TECNICO.md**
   - Architettura dettagliata
   - API documentation
   - Database schema
   - Deployment guide

2. **RUNBOOK.md**
   - Procedure operative
   - Disaster recovery
   - Backup/restore
   - Monitoring

3. **CHANGELOG.md**
   - Versioning features
   - Breaking changes
   - Migration guides

---

## ✅ Acceptance Criteria

### **Minimo Viable Product (MVP) - Week 8**

✅ **Autenticazione**:
- Login/logout funzionante
- Password recovery
- Gestione profilo

✅ **Upload e Analisi**:
- Upload singolo PDF
- Upload batch (fino 100 PDF)
- Analisi automatica background
- Progress bar real-time

✅ **Database Programmi**:
- Lista programmi con filtri
- Ricerca full-text
- Dettaglio singolo programma
- Export CSV

✅ **Admin**:
- CRUD frameworks (commit Git)
- CRUD catalogo competitor (commit Git)
- Gestione utenti team

✅ **Campagne**:
- Form nuova campagna
- Identificazione target (min 10 docenti)
- Ranking priorità
- Visualizzazione motivazioni

✅ **Generazione Mail**:
- Mail personalizzate automatiche
- Preview mail
- Modifica manuale
- Export CSV mail

✅ **Performance**:
- Caricamento pagina < 2 secondi
- Analisi programma < 30 secondi
- Generazione campagna < 2 minuti
- Uptime > 99%

---

## 🎬 Go-Live Checklist

### **Pre-Launch (Week 9)**

- [ ] Backup completo database
- [ ] Test disaster recovery
- [ ] Documentazione completa
- [ ] Video tutorial pubblicato
- [ ] Account pilot users creati
- [ ] Training sessione schedulata

### **Launch Day (Week 10)**

- [ ] Annuncio ufficiale team
- [ ] Supporto dedicato primo giorno
- [ ] Monitoring attivo
- [ ] Canale feedback aperto
- [ ] Backup extra pre-lancio

### **Post-Launch (Week 11-12)**

- [ ] Raccolta feedback strutturato
- [ ] Fix bug critici (se presenti)
- [ ] Ottimizzazioni performance
- [ ] Aggiornamento documentazione
- [ ] Pianificazione features v1.1

---

## 🔄 Roadmap Post-Launch

### **v1.1 (Mese 2-3)**

- ✅ Integrazione CRM esterno (export automatico)
- ✅ Mobile app (Progressive Web App)
- ✅ Notifiche email automatiche
- ✅ Dashboard analytics avanzata

### **v1.2 (Mese 4-6)**

- ✅ AI assistant conversazionale
- ✅ Riconoscimento automatico SSD da programma
- ✅ Suggerimenti proattivi nuove pubblicazioni
- ✅ Integrazione calendario follow-up

### **v2.0 (Mese 7-12)**

- ✅ White-label per altre case editrici
- ✅ API pubblica per integrazioni
- ✅ Marketplace template mail
- ✅ Machine learning per predizione adozioni

---

## 📞 Supporto e Contatti

### **Durante Sviluppo**

- **Canale**: Questa conversazione
- **Response time**: <24 ore
- **Disponibilità**: Lunedì-Venerdì

### **Post-Launch**

- **Supporto utenti**: sergio.sartini@zanichelli.it
- **Bug report**: GitHub Issues
- **Feature request**: GitHub Discussions
- **Emergenze**: Contatto diretto

---

## 📝 Note Finali

### **Flessibilità Piano**

Questo piano è una **guideline dettagliata** ma può essere adattato:
- Priorità features può cambiare in base feedback
- Timeline può essere compressa/estesa
- Features possono essere aggiunte/rimosse

### **Approccio Iterativo**

Sviluppo **incrementale** con deploy continui:
- Deploy ogni feature completata
- Testing real-time su produzione
- Feedback loop rapido
- Aggiustamenti in corsa

### **Coinvolgimento Tuo**

**Tempo richiesto da te**:
- Setup iniziale: 1 ora (Week 1)
- Testing features: 2-3 ore/settimana
- Feedback: 1 ora/settimana
- Training pilot: 2 ore (Week 10)

**Totale**: ~30-35 ore in 10 settimane (3-4 ore/settimana)

---

## ✅ Prossimi Passi Immediati

**Se decidi di procedere**:

1. ✅ **Tu**: Leggi e approvi questo piano
2. ✅ **Tu**: Presenta ai colleghi (usa documento presentazione)
3. ✅ **Tu**: Ottieni buy-in e feedback
4. ✅ **Io**: Inizio Week 1 sviluppo
5. ✅ **Tu**: Setup Cloudflare R2 (30 minuti)
6. ✅ **Insieme**: Primo deploy test entro 7 giorni

---

**Piano preparato da**: Assistente AI MATRIX  
**Data**: 7 Febbraio 2026  
**Versione**: 1.0  
**Status**: Pronto per approvazione
