# 🎓 MATRIX - Multi-Analysis Teaching Resource Intelligence X-platform

**Versione 1.0.0** | Rilasciato: 29 Gennaio 2025

## 📋 Panoramica

**MATRIX** è una piattaforma avanzata di analisi e valutazione di programmi didattici universitari, progettata per supportare case editrici e rappresentanti commerciali nell'identificare il manuale più adatto per ogni corso specifico.

### 🎯 Obiettivi

- **Multi-Materia**: Supporto per 21 framework di valutazione coprendo Chimica, Fisica, Matematica, Economia, Biologia e Medicina
- **Multi-Editore**: Sistema flessibile che si adatta a qualsiasi editore (Zanichelli, McGraw-Hill, Pearson, EdiSES, Piccin, CEA, etc.)
- **Doppia Valutazione**: Valutazioni Assolute (permanenti) e Dinamiche (contestuali)
- **Profilo Pedagogico**: Analisi preliminare del docente e del programma
- **Intelligenza Artificiale**: Utilizzo di GPT-4 e Perplexity per analisi approfondite

---

## 📊 Dati Disponibili

### **Framework di Valutazione: 21**

| Materia | Framework | Moduli |
|---------|-----------|--------|
| **Chimica** | Chimica Generale, Chimica Organica | 15, 30 |
| **Fisica** | Fisica 1, Fisica 2, Fisica Bio-Geo | 10, 10, 7 |
| **Matematica** | Analisi 1, Analisi 2, Matematica Generale | 13, 12, 7 |
| **Economia** | Microeconomia, Macroeconomia, Economia Politica | 9, 8, 9 |
| **Biologia/Medicina** | Biochimica, Biologia Molecolare, Genetica, Istologia, Microbiologia | 12, 16, 9, 8, 14 |
| **Medicina** | Biologia/Chimica/Fisica (Semestre Filtro) | 7, 7, 6 |

### **Manuali: 85 Totali**

| Categoria | Zanichelli | Competitor | Totale |
|-----------|-----------|------------|--------|
| **Chimica Generale** | 13 | 21 | 34 |
| **Chimica Organica** | 5 | 10 | 15 |
| **Fisica** | 4 | 13 | 17 |
| **Economia** | 4 | 10 | 14 |
| **Istologia** | 1 | 4 | 5 |
| **TOTALE** | **27** | **58** | **85** |

#### **Manuali Zanichelli Disponibili**

**Chimica Generale:**
- Atkins - Chimica generale
- Atkins - Fondamenti di Chimica
- Atkins - Principi di Chimica
- Bertini, Luchinat, Mani - Chimica
- Bertini - Chimica: materia, tecnologia, ambiente
- Bertini - Chimica: struttura, proprietà e trasformazioni
- Manotti Lanfredi, Tiripicchio - Fondamenti di chimica
- McQuarrie - Chimica generale
- Munari, Michelin - Fondamenti di Chimica
- Nobile, Mastrorilli - La Chimica di base
- Silvestroni - Chimica generale
- Silvestroni - Fondamenti di Chimica
- Zanello, Gobetto, Zanello - Conoscere la Chimica

**Chimica Organica:**
- Hart - Fondamenti di chimica organica
- McMurry - Chimica organica: approccio biologico
- McMurry - Fondamenti di chimica organica
- Solomons - Chimica organica
- Vollhardt - Chimica organica

**Fisica:**
- Contessa, Marzo - Fisica applicata alle scienze biomediche
- Giancoli - Fisica
- Giancoli - Fisica con fisica moderna
- Halliday, Resnick, Walker - Fondamenti di Fisica

**Economia:**
- Brue Stanley L., McConnell, Flynn - L'essenziale di Economia
- Krugman Paul, Wells Robin - Essenziale di Economia
- Mankiw N. Gregory - L'essenziale di Economia
- Mankiw N. Gregory - Principi di Economia

**Istologia:**
- Pawlina, Ross - Istologia

---

## 🔧 Caratteristiche Principali

### 1. **Analisi Preliminare (Fase 0)**

Prima della valutazione dettagliata, MATRIX genera:

#### **Quadro Generale del Programma**
- Visione d'insieme dei contenuti
- Struttura logica del corso
- Distribuzione tematica (es. 40% Teoria, 30% Pratica, 30% Lab)
- Livello di complessità

#### **Profilo Pedagogico del Docente**
- **Approccio didattico**: Teorico / Applicativo / Sperimentale / Interdisciplinare
- **Livello di approfondimento**: Base / Intermedio / Avanzato
- **Enfasi particolare**: Aree tematiche privilegiate
- **Stile**: Classico / Moderno / Innovativo

**Esempio Output:**
```
╔══════════════════════════════════════════════════════════════╗
║  📊 QUADRO GENERALE                                          ║
╠══════════════════════════════════════════════════════════════╣
║  Tipologia: Corso fondamentale con orientamento biologico   ║
║  CFU: 9 | Ore: 72                                           ║
║  Distribuzione:                                              ║
║    - Struttura atomica e legame: 25%                        ║
║    - Termodinamica e cinetica: 40%                          ║
║    - Equilibri in soluzione: 35%                            ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  👤 PROFILO PEDAGOGICO DOCENTE                               ║
╠══════════════════════════════════════════════════════════════╣
║  Approccio: Teorico-Applicativo                             ║
║  Livello: Intermedio/Avanzato                               ║
║  Enfasi: Forte focus su termodinamica e equilibri           ║
║          chimici con applicazioni biologiche                ║
║  Stile: Interdisciplinare (chimica-biologia)                ║
╚══════════════════════════════════════════════════════════════╝
```

---

### 2. **Valutazione Assoluta (Statica)**

Valutazione **intrinseca** del manuale rispetto al framework teorico della materia.

**Caratteristiche:**
- ✅ **Permanente**: memorizzata e riutilizzabile
- ✅ **Indipendente dal programma**: valida per tutti i corsi
- ✅ **Oggettiva**: basata su criteri standardizzati
- ✅ **Confrontabile**: tra manuali diversi

**Dimensioni di Valutazione (270 punti totali):**

| Dimensione | Peso | Punti Max | Descrizione |
|-----------|------|-----------|-------------|
| **Copertura Moduli** | 35% | 130 | Percentuale di moduli del framework coperti |
| **Qualità Didattica** | 20% | 40 | Chiarezza, esempi, esercizi, didattica |
| **Approfondimento** | 20% | 40 | Livello di dettaglio e rigore scientifico |
| **Materiali Supplementari** | 15% | 30 | Risorse online, eserciziari, laboratori |
| **Rapporto Qualità/Prezzo** | 10% | 30 | Valutazione economica |

**Output:**
```json
{
  "valutazione_assoluta": {
    "data_valutazione": "2025-01-29",
    "punteggio_totale": 245,
    "livello": "Eccellente",
    "dimensioni": {
      "copertura_moduli": 125,
      "qualita_didattica": 38,
      "approfondimento": 35,
      "materiali_supplementari": 25,
      "rapporto_qualita_prezzo": 22
    },
    "sintesi": "Eccellente copertura con forte orientamento teorico...",
    "raccomandazioni": {
      "quando_raccomandare": ["L-27 Chimica", "L-2 Biotecnologie", ...],
      "quando_non_raccomandare": ["Corsi orientamento applicativo", ...]
    }
  }
}
```

---

### 3. **Valutazione Dinamica (Contestuale)**

Valutazione **rispetto al programma specifico** analizzato.

**Caratteristiche:**
- 🔄 **Temporanea**: specifica per ogni programma
- 🎯 **Contestuale**: si adatta al docente e al corso
- 📊 **Personalizzata**: considera enfasi e priorità
- 💡 **Actionable**: suggerimenti commerciali mirati

**Dimensioni di Valutazione (270 punti totali):**

| Dimensione | Peso | Punti Max | Descrizione |
|-----------|------|-----------|-------------|
| **Copertura Programma** | 40% | 100 | Match con contenuti specifici del corso |
| **Adeguatezza Livello** | 25% | 70 | Allineamento con livello richiesto |
| **Allineamento Enfasi** | 20% | 50 | Match con focus del docente |
| **Rapporto Q/P Contestuale** | 15% | 50 | Valore per questo corso specifico |

**Output:**
```json
{
  "valutazione_dinamica": {
    "punteggio_totale": 230,
    "copertura_programma": 85,
    "adeguatezza_livello": 60,
    "allineamento_enfasi": 45,
    "rapporto_qp_contestuale": 40,
    "raccomandazione": "Altamente Raccomandato",
    "motivi": [
      "Eccellente copertura dei moduli richiesti",
      "Perfetto allineamento con focus su termodinamica",
      "Livello intermedio-avanzato adeguato"
    ],
    "gap": [
      "Mancanza di esempi applicativi da biochimica",
      "Esercizi numerici limitati"
    ]
  }
}
```

---

### 4. **Sistema Multi-Editore**

MATRIX si adatta dinamicamente all'editore che utilizza l'applicazione.

**Configurazione Editore:**
```
╔════════════════════════════════════════════════════════════╗
║  🏢 CONFIGURAZIONE EDITORE                                 ║
╠════════════════════════════════════════════════════════════╣
║  Seleziona il tuo editore:                                ║
║   ○ Zanichelli (default)                                  ║
║   ○ McGraw-Hill                                           ║
║   ○ Pearson                                               ║
║   ○ Piccin                                                ║
║   ○ EdiSES                                                ║
║   ○ CEA                                                   ║
║   ○ Altro: [____________]                                 ║
╚════════════════════════════════════════════════════════════╝
```

**Logica Dinamica:**
- Se editore = **Zanichelli** → `type: "zanichelli"` = NOSTRI, altri = competitor
- Se editore = **McGraw-Hill** → `type: "McGraw-Hill"` = NOSTRI, altri = competitor
- Se editore = **Pearson** → `type: "Pearson"` = NOSTRI, altri = competitor

**UI Adattiva:**
- Manuali dell'editore selezionato appaiono come **"Manuali [Editore]"** (evidenziati)
- Altri manuali appaiono come **"Manuali Competitor"** (secondari)

---

## 🚀 Utilizzo

### **1. Configurazione Iniziale**

1. **Impostazioni AI Provider**:
   - Scegli provider: OpenAI o Perplexity
   - Inserisci API Key
   - Seleziona modello (es. GPT-4o-mini)

2. **Impostazioni Editore**:
   - Seleziona il tuo editore
   - Salva preferenze

### **2. Avvia Nuova Analisi**

1. **Carica Programma**:
   - Upload PDF del programma del corso
   - Oppure incolla testo manualmente

2. **Configura Contesto**:
   - Materia: (es. Chimica Generale)
   - Università e Corso di Laurea
   - CFU e Ore
   - Docente (opzionale)

3. **Seleziona Framework**:
   - Scegli il framework appropriato dalla materia
   - MATRIX caricherà automaticamente i moduli

4. **Seleziona Manuali da Valutare**:
   - **Manuali Tuo Editore**: seleziona quelli da valutare
   - **Manuali Competitor**: seleziona per confronto
   - Opzione "Seleziona Tutti"

### **3. Esegui Analisi**

MATRIX eseguirà in sequenza:

1. **Fase 0**: Analisi Preliminare
   - Quadro Generale
   - Profilo Pedagogico

2. **Fase 1**: Estrazione Metadata
   - Università, Corso, Docente, CFU, Ore

3. **Fase 2**: Valutazione Programma
   - Valutazione rispetto al framework (270 punti)

4. **Fase 3**: Valutazione Manuali
   - Per ogni manuale:
     - Carica/Genera Valutazione Assoluta
     - Genera Valutazione Dinamica
     - Confronto con framework
     - Raccomandazione finale

### **4. Visualizza Risultati**

**Output Completo:**
- 📊 **Quadro Generale** del programma
- 👤 **Profilo Pedagogico** del docente
- 📈 **Punteggio Programma** su framework (0-270)
- 📚 **Valutazioni Manuali**:
  - Valutazione Assoluta (storica)
  - Valutazione Dinamica (contestuale)
  - Gap identificati
  - Raccomandazione finale
- 💡 **Post-it Commerciali**: argomenti chiave per il colloquio

### **5. Export PDF**

Genera report PDF professionale con:
- Logo editore
- Quadro generale e profilo docente
- Valutazioni assolute e dinamiche
- Post-it commerciali colorati
- Raccomandazioni finali

---

## 📂 Struttura Progetto

```
matrix/
├── index.html                    # Applicazione principale (SPA)
├── matrix_config.json           # Configurazione MATRIX
├── framework_catalog.json       # Catalogo framework
├── manual_catalog.json          # Catalogo manuali (metadata)
│
├── frameworks/                  # 21 Framework JSON
│   ├── Chimica Generale.json
│   ├── Chimica Organica.json
│   ├── Fisica 1.json
│   ├── Fisica 2.json
│   ├── Analisi 1.json
│   ├── Analisi 2.json
│   ├── Economia politica.json
│   ├── biochimica.json
│   ├── istologia.json
│   └── ...
│
├── manuali/                     # 85 Manuali JSON (indici completi)
│   ├── chimica_generale/        # 34 manuali
│   │   ├── Atkins_Chimica_Zanichelli.json
│   │   ├── Petrucci_Chimica_Piccin.json
│   │   └── ...
│   ├── chimica_organica/        # 15 manuali
│   │   ├── Hart_Fondamenti_Zanichelli.json
│   │   ├── McMurry_Fondamenti_Zanichelli.json
│   │   └── ...
│   ├── fisica/                  # 17 manuali
│   │   ├── Giancoli_Fisica_Zanichelli.json
│   │   ├── Halliday_Fondamenti_Zanichelli.json
│   │   └── ...
│   ├── economia/                # 14 manuali
│   │   ├── Mankiw_Principi_Zanichelli.json
│   │   └── ...
│   └── istologia/               # 5 manuali
│       ├── Pawlina_Istologia_Zanichelli.json
│       └── ...
│
├── valutazioni_assolute/        # Valutazioni assolute memorizzate
│   ├── Atkins_Chimica_Zanichelli.json
│   ├── Petrucci_Chimica_Piccin.json
│   └── ...
│
├── netlify/
│   └── functions/               # Proxy backend per API
│       ├── openai-proxy.js
│       └── perplexity-proxy.js
│
├── netlify.toml                 # Configurazione Netlify
├── README_MATRIX.md             # Questo file
├── IMPLEMENTAZIONE_STATUS.md    # Status implementazione
└── data_summary.json            # Summary dati caricati
```

---

## 🛠️ Tecnologie

### **Frontend**
- **HTML5 + Vanilla JavaScript**: Zero dipendenze, performance massime
- **Tailwind CSS**: UI professionale e responsive
- **PDF.js**: Lettura PDF lato client
- **jsPDF**: Export PDF report

### **Backend (Serverless)**
- **Netlify Functions**: Proxy sicuro per API
- **OpenAI GPT-4**: Analisi intelligente
- **Perplexity**: Ricerca contestuale

### **Storage**
- **localStorage**: Cronologia analisi e valutazioni assolute
- **JSON Files**: Framework e manuali (versionati con Git)

---

## 📈 Roadmap Futura

### **Fase 2 (Q1 2025)**
- [ ] Aggiunta Matematica (Algebra Lineare, Geometria)
- [ ] Aggiunta Informatica (Programmazione, Algoritmi)
- [ ] Statistiche aggregate su performance manuali
- [ ] Dashboard analitico per editori

### **Fase 3 (Q2 2025)**
- [ ] Sistema di feedback docenti
- [ ] Machine Learning per predizioni
- [ ] API pubblica per integrazioni
- [ ] Mobile app (iOS/Android)

---

## 📞 Supporto

### **Documentazione Tecnica**
- `README_MATRIX.md` (questo file)
- `IMPLEMENTAZIONE_STATUS.md` (status sviluppo)
- `README_FASE_C.md` (versione precedente Chimica Organica)

### **Troubleshooting**
- Verificare chiavi API in Impostazioni
- Controllare console browser (F12) per errori
- Verificare log Netlify Functions

---

## 📜 Licenza

**Uso Interno Editore**

Tutti i diritti riservati. Questo software è proprietario e destinato esclusivamente all'uso interno dell'editore licenziatario.

---

## 🏆 Credits

**Sviluppato da**: Zanichelli Team AI  
**Versione**: 1.0.0  
**Data Rilascio**: 29 Gennaio 2025  
**Nome Progetto**: MATRIX - Multi-Analysis Teaching Resource Intelligence X-platform

---

**🎓 MATRIX - Intelligent Analysis for Better Education**
