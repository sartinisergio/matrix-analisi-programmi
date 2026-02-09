# 🎓 MATRIX - Multi-Analysis Teaching Resource Intelligence X-platform

**Versione 1.2.0** | Aggiornato: 9 Febbraio 2026 | Revisione Analisi (Specifiche A, B, C)

## 📋 Panoramica

**MATRIX** è una piattaforma avanzata di analisi e valutazione di programmi didattici universitari, progettata per supportare case editrici e rappresentanti commerciali nell'identificare il manuale più adatto per ogni corso specifico.

### 🎯 Obiettivi

- **Multi-Materia**: Supporto per 21 framework di valutazione coprendo Chimica, Fisica, Matematica, Economia, Biologia e Medicina
- **Multi-Editore**: Sistema flessibile che si adatta a qualsiasi editore (Zanichelli, McGraw-Hill, Pearson, EdiSES, Piccin, CEA, etc.)
- **Doppia Valutazione**: Valutazioni Assolute (permanenti) e Dinamiche (contestuali)
- **Profilo Pedagogico Arricchito**: Analisi docente con allineamento classe di laurea e criteri disciplinari
- **Raccomandazione Zanichelli Strutturata**: Confronto criterio-per-criterio con trasparenza su gap risolti e non risolti
- **Intelligenza Artificiale**: Utilizzo di GPT-4 e Perplexity per analisi approfondite

---

## 🆕 Novità v1.2.0 — Revisione Analisi (9 Feb 2026)

### Specifica A — Profilo Pedagogico Arricchito
- **Allineamento con Classe di Laurea**: tabella con colonne Priorità, Soddisfatta, Evidenza, Valutazione (sempre presente)
- **Criteri di Valutazione Disciplinari**: tabella Criterio / Posizione Docente / Evidenze / Confidenza (solo per i 12 framework che hanno `evaluation_criteria`)

### Specifica B — Tabella Modulo-per-Modulo nella Gap Analysis
- **Copertura moduli**: tabella colorata che mostra per ogni modulo del framework se è coperto dal manuale adottato
- Rendering con badge colorati (Verde = coperto, Rosso = non coperto, Giallo = parziale)
- Prompt Fase 2 arricchito con istruzioni per generare `copertura_moduli`

### Specifica C — Raccomandazione Zanichelli con Confronto Strutturato
- **Funzione `generaRaccomandazioneZanichelli`**: prompt dedicato che genera un confronto criterio-per-criterio
- **Gap risolti e gap NON risolti**: trasparenza totale su cosa Zanichelli risolve e cosa no
- **Alternative Zanichelli**: con badge compatibilità e indicazione "Quando preferirlo"
- **`generaExecutiveSummary`**: sommario esecutivo generato alla fine di tutte le fasi

### Consolidamento Anti-Ridondanza
- **Rimossa** la sezione "Strategia di Penetrazione Mercato" (Sez 3.5) dal rendering
- **Rimossa** la sezione "Strategia Completa per il Promotore"
- **Rinominata** "Strategia Adozione" → **"Guida al Colloquio con il Docente"** con solo:
  - Pitch di apertura (Primo Contatto + Docente Conosciuto)
  - Obiezioni e risposte
  - Note pratiche per il colloquio
- **Flusso report senza ridondanze**: Sez 5 (Confronto Strutturato) → Sez 4 (Compatibilità Manuali) → Guida al Colloquio

### Fix Tecnici
- **Template literal annidati**: corretti 4 casi di backtick escaped dentro template literals (convertiti in concatenazione stringa)
- **Helper functions** (`getCompatibilitaLabel`, `getDifferenzaLabel`, `getCoperturaProgrammaLabel`) spostati a scope globale
- **Proxy Netlify rimosso per OpenAI**: le chiamate ora vanno direttamente a `api.openai.com` dal browser (elimina timeout 502/504 sulle Netlify Functions)

---

## 📊 Dati Disponibili

### **Framework di Valutazione: 21**

| Materia | Framework | Moduli | evaluation_criteria |
|---------|-----------|--------|---------------------|
| **Chimica** | Chimica Generale, Chimica Organica | 15, 30 | ❌, ❌ |
| **Fisica** | Fisica 1, Fisica 2, Fisica Bio-Geo | 10, 10, 7 | ❌, ❌, ❌ |
| **Matematica** | Analisi 1, Analisi 2, Matematica Generale | 13, 12, 7 | ❌, ❌, ❌ |
| **Economia** | Microeconomia, Macroeconomia, Economia Politica | 9, 8, 9 | ✅, ✅, ✅ |
| **Biologia/Medicina** | Biochimica, Biologia Molecolare, Genetica, Istologia, Microbiologia | 12, 16, 9, 8, 14 | ✅, ✅, ✅, ✅, ✅ |
| **Medicina** | Biologia/Chimica/Fisica (Semestre Filtro) | 7, 7, 6 | ✅, ✅, ✅ |

> **Nota**: 12 framework su 21 hanno `evaluation_criteria`. Quando presenti, il report include la sezione "Criteri di Valutazione Disciplinari" e l'analisi criteri approfondita (Avanzata).

### **Manuali: 85 Totali**

| Categoria | Zanichelli | Competitor | Totale |
|-----------|-----------|------------|--------|
| **Chimica Generale** | 13 | 21 | 34 |
| **Chimica Organica** | 5 | 10 | 15 |
| **Fisica** | 4 | 13 | 17 |
| **Economia** | 4 | 10 | 14 |
| **Istologia** | 1 | 4 | 5 |
| **TOTALE** | **27** | **58** | **85** |

---

## 🔧 Architettura del Report

### Flusso di Analisi (Fasi)

```
Fase 0    → Analisi Preliminare (Quadro Generale + Profilo Pedagogico 
             + Allineamento Classe + Criteri Disciplinari)
Fase 0b   → [Avanzata] Profilo Docente approfondito
Fase 0.5  → Logica della Scelta Editoriale (motivazioni + relazione testi)
Fase 1    → Estrazione Metadata (Università, Corso, Docente, CFU, Ore)
Fase 2    → Valutazione Programma (5 dimensioni + copertura_moduli)
Fase 2b   → [Avanzata] Insights Adozione
Fase 3    → Gap Analysis vs Manuale Adottato
Fase 3c   → [Avanzata] Impatto Gap
Fase 3b   → Confronto Manuali Alternativi
Fase 4    → Valutazione Manuali Zanichelli (Dinamica)
Fase 4b   → [Avanzata] Guida al Colloquio con il Docente
Fase 5.5  → [Avanzata] Analisi Strategica Finale
Post-fasi → generaRaccomandazioneZanichelli (Confronto Strutturato)
           → generaExecutiveSummary (Sommario Esecutivo)
```

> Le fasi marcate `[Avanzata]` si eseguono solo con l'opzione "Analisi Avanzata" attivata.

### Sezioni del Report (ordine di rendering)

| # | Sezione | Contenuto | Note |
|---|---------|-----------|------|
| 0 | Executive Summary | Sintesi esecutiva generata post-analisi | Spec C |
| 0 | Analisi Preliminare | Quadro Generale + Profilo Pedagogico | - |
| - | Allineamento Classe di Laurea | Tabella priorità/evidenza vs classe | Spec A |
| - | Criteri Disciplinari | Tabella criterio/posizione/evidenze | Spec A, solo se eval_criteria |
| 0.5 | Logica Scelta Editoriale | Perché il docente ha scelto quel manuale | - |
| 1 | Analisi Dettagliata Programma | Valutazione su 5 dimensioni | - |
| 2 | Analisi Manuale Adottato | Gap del manuale attuale | - |
| 2b | Confronto Manuali Alternativi | Gap vs manuali non adottati | - |
| 5 | **Raccomandazione Zanichelli** | Confronto criterio-per-criterio, gap risolti/non risolti | Spec C |
| 4 | Compatibilità Manuali Consigliati | Schede per ogni manuale Zanichelli | - |
| - | **Guida al Colloquio** | Pitch + Obiezioni + Note pratiche | Consolidata |

### Logica Condizionale

- **Framework CON `evaluation_criteria`**: mostra Criteri Disciplinari, Analisi Criteri Approfondita, confronto per criterio nella Raccomandazione Zanichelli
- **Framework SENZA `evaluation_criteria`**: queste sezioni vengono saltate automaticamente
- **Analisi Base vs Avanzata**: le fasi 0b, 2b, 3c, 4b, 5.5 si attivano solo in modalità Avanzata

---

## 🚀 Utilizzo

### **1. Configurazione Iniziale**

1. **Impostazioni AI Provider**:
   - Scegli provider: OpenAI, xAI, DeepSeek, Meta, Mistral, Perplexity, Anthropic, Google, Cohere
   - Inserisci API Key
   - Seleziona modello (es. GPT-4o-mini, GPT-4o)

2. **Impostazioni Editore**:
   - Seleziona il tuo editore (Zanichelli default)
   - Salva preferenze

### **2. Avvia Nuova Analisi**

1. **Carica Programma**: Upload PDF o incolla testo manualmente
2. **Configura Contesto**: Materia, Universita, Corso di Laurea, CFU, Ore, Docente
3. **Seleziona Framework**: scegli il framework dalla lista di 21 materie
4. **Seleziona Manuali**: Zanichelli + Competitor per confronto
5. **Scegli Tipo Analisi**: Base o Avanzata

### **3. Visualizza Risultati**

Il report completo include:
- 📋 **Executive Summary** — generato automaticamente
- 📊 **Quadro Generale** del programma
- 👤 **Profilo Pedagogico** del docente
- 🎓 **Allineamento Classe di Laurea** — tabella strutturata
- 🔬 **Criteri Disciplinari** — se presenti nel framework
- 🎯 **Logica della Scelta Editoriale** — motivazioni e relazione testi
- 📚 **Analisi Dettagliata Programma** — 5 dimensioni di valutazione
- 📖 **Analisi Manuale Adottato** — gap identificati + tabella copertura moduli
- 📘 **Confronto Manuali Alternativi** — se presenti in bibliografia
- ✅ **Raccomandazione Zanichelli** — confronto strutturato criterio-per-criterio
- 📚 **Compatibilità Manuali Consigliati** — schede per ogni manuale Zanichelli
- 💬 **Guida al Colloquio** — pitch, obiezioni, note colloquio

### **4. Export PDF**

Genera report PDF professionale con tutte le sezioni, loghi editore e formattazione avanzata.

---

## 📂 Struttura Progetto

```
matrix/
├── index.html                    # Applicazione principale (SPA, ~9200 righe)
├── welcome.html                  # Landing page con scelta analisi
├── matrix_config.json           # Configurazione MATRIX (provider, modelli, etc.)
├── framework_catalog.json       # Catalogo 21 framework (metadata)
├── manual_catalog.json          # Catalogo 85 manuali (metadata)
│
├── frameworks/                  # 21 Framework JSON
│   ├── Chimica Generale.json    # include priority_modules
│   ├── Economia politica.json   # include evaluation_criteria
│   └── ...
│
├── manuali/                     # 85 Manuali JSON (indici completi)
│   ├── chimica_generale/        # 34 manuali
│   ├── chimica_organica/        # 15 manuali
│   ├── fisica/                  # 17 manuali
│   ├── economia/                # 14 manuali
│   └── istologia/               # 5 manuali
│
├── valutazioni_assolute/        # Valutazioni assolute memorizzate
│
├── netlify/
│   └── functions/
│       ├── openai-proxy.js      # Non piu usato per OpenAI (chiamate dirette)
│       └── perplexity-proxy.js  # Proxy per Perplexity API
│
├── netlify.toml                 # Configurazione Netlify (publish, redirects)
├── README.md                    # Questo file
├── IMPLEMENTAZIONE_STATUS.md    # Status implementazione
└── data_summary.json            # Summary dati caricati
```

---

## 🛠️ Tecnologie

### **Frontend**
- **HTML5 + Vanilla JavaScript**: Zero dipendenze, SPA monolitica (~9200 righe)
- **Tailwind CSS**: UI professionale e responsive
- **PDF.js**: Lettura PDF lato client
- **jsPDF**: Export PDF report

### **AI Providers**
- **OpenAI GPT-4**: Analisi principale (chiamate dirette dal browser, no proxy)
- **Perplexity**: Ricerca contestuale (via Netlify Function proxy)
- **Multi-provider**: Supporto per xAI, DeepSeek, Meta, Mistral, Anthropic, Google, Cohere

### **Hosting**
- **Netlify**: Deploy automatico da GitHub (branch `main`)
- **Netlify Functions**: Solo per Perplexity proxy (OpenAI chiama direttamente)

### **Storage**
- **localStorage**: Cronologia analisi, valutazioni assolute, preferenze
- **JSON Files**: Framework e manuali (versionati con Git)

---

## 🔑 Note Tecniche

### Chiamate API
- **OpenAI**: chiamata diretta dal browser a `api.openai.com/v1/chat/completions` — l'utente fornisce la propria API key, supporto CORS nativo. Questo evita il timeout di 10 secondi delle Netlify Functions che causava errori 502/504 sui prompt piu grandi (Fase 3 con `copertura_moduli` + `evaluation_criteria`).
- **Perplexity**: via `/.netlify/functions/perplexity-proxy` (no supporto CORS nativo).
- **Altri provider OpenAI-compatibili** (xAI, DeepSeek, etc.): chiamata diretta al rispettivo endpoint.

### Regole nei Prompt
- **Anti-numeri**: nessun punteggio numerico, frazioni o percentuali nei report — tutto tradotto in linguaggio qualitativo professionale
- **Linguaggio promotore**: tono da promotore editoriale esperto, mai accademico
- **Anti-ridondanza**: i prompt delle fasi successive ricevono contesto sulle fasi precedenti per evitare ripetizioni

### Helper Functions (scope globale)
- `getCompatibilitaLabel(val)` — converte compatibilita in label colorata
- `getDifferenzaLabel(val)` — converte differenza in label
- `getCoperturaProgrammaLabel(val)` — converte copertura in label

---

## 📈 Changelog

### v1.2.0 (9 Feb 2026) — Revisione Analisi
- Specifica A: Profilo Pedagogico arricchito (allineamento classe + criteri disciplinari)
- Specifica B: Tabella modulo-per-modulo nella Gap Analysis
- Specifica C: Raccomandazione Zanichelli con confronto strutturato + `generaExecutiveSummary`
- Consolidamento ridondanze (da 4 sezioni sovrapposte a 3 distinte)
- Fix template literal annidati e helper a scope globale
- Rimozione proxy Netlify per OpenAI (chiamate dirette)

### v1.1.0 (7 Feb 2026) — Fase C + Quality Improvements
- Phase A: Miglioramento pitch, specificita, executive summary
- Phase B: Anti-ridondanza con contesto cross-fase
- Phase C: Traduzione punteggi numerici in etichette promotore

### v1.0.0 (29 Gen 2025) — Rilascio Iniziale
- 21 framework, 85 manuali
- Analisi Base e Avanzata
- Fase 0 / 0.5 / 1 / 2 / 3 / 4 + Export PDF
- Sistema Multi-Editore

---

## 📜 Licenza

**Uso Interno Editore**

Tutti i diritti riservati. Questo software è proprietario e destinato esclusivamente all'uso interno dell'editore licenziatario.

---

## 🏆 Credits

**Sviluppato da**: Zanichelli Team AI
**Versione**: 1.2.0
**Data Aggiornamento**: 9 Febbraio 2026
**Nome Progetto**: MATRIX - Multi-Analysis Teaching Resource Intelligence X-platform

---

**🎓 MATRIX - Intelligent Analysis for Better Education**
