# 🚀 MATRIX - Continua Implementazione

**Branch**: `main` (già pushato)  
**Repository**: https://github.com/sartinisergio/matrix-analisi-programmi

---

## ✅ **COMPLETATO NELLA SESSIONE PRECEDENTE**

### **Fase 1: Estrazione Dati** ✅
- ✅ Estratti 105 JSON file (20 frameworks + 85 manuali)
- ✅ Organizzati in directory strutturate
- ✅ Tutti i file validati e funzionanti

### **Fase 2: Cataloghi e Configurazione** ✅
- ✅ `framework_catalog.json` - Catalogo 21 framework
- ✅ `manual_catalog.json` - Catalogo 85 manuali con metadata
- ✅ `matrix_config.json` - Configurazione completa MATRIX
- ✅ `data_summary.json` - Summary dati caricati

### **Fase 3: Documentazione** ✅
- ✅ `README_MATRIX.md` - Documentazione completa
- ✅ `IMPLEMENTAZIONE_STATUS.md` - Status sviluppo
- ✅ Commit su GitHub

---

## 🔧 **DA IMPLEMENTARE (FASE 4-5)**

### **PRIORITÀ ALTA - FUNZIONALITÀ CORE**

#### **1. Refactoring index.html con Branding MATRIX** 🎯
**Obiettivo**: Trasformare l'app esistente in MATRIX multi-materia

**Modifiche UI:**
- [ ] Header con logo MATRIX 🎓
- [ ] Dropdown selezione materia (21 framework disponibili)
- [ ] Caricamento dinamico framework dal catalogo
- [ ] Badge/indicatori per tipo editore (Zanichelli/Competitor)

**File da modificare:**
- `index.html` (principale)
- Integrare `matrix_config.json`
- Integrare `framework_catalog.json`
- Integrare `manual_catalog.json`

**Codice JavaScript chiave:**
```javascript
// Caricamento configurazione MATRIX
async function loadMATRIXConfig() {
  const config = await fetch('matrix_config.json').then(r => r.json());
  const frameworks = await fetch('framework_catalog.json').then(r => r.json());
  const manuals = await fetch('manual_catalog.json').then(r => r.json());
  
  // Popolare dropdown materie
  populateSubjectDropdown(config.supported_subjects);
  
  // Setup editore corrente
  setupPublisher(config.publishers);
}

// Caricamento framework dinamico
async function loadFramework(frameworkId) {
  const framework = await fetch(`frameworks/${frameworkId}.json`).then(r => r.json());
  return framework;
}

// Caricamento manuale dinamico
async function loadManual(manualPath) {
  const manual = await fetch(manualPath).then(r => r.json());
  return manual;
}
```

---

#### **2. Sistema Multi-Editore** 🏢
**Obiettivo**: Permettere a qualsiasi editore di usare MATRIX

**Funzionalità:**
- [ ] Sezione "Impostazioni Editore" nella UI
- [ ] Dropdown con lista editori (Zanichelli, McGraw-Hill, Pearson, etc.)
- [ ] Salvataggio preferenza in localStorage
- [ ] Logica dinamica: editore selezionato = "NOSTRI", altri = "COMPETITOR"

**UI Mockup:**
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

**Codice JavaScript:**
```javascript
function setupPublisher(publishers) {
  const currentPublisher = localStorage.getItem('matrix_publisher') || 'zanichelli';
  
  // Aggiorna UI per mostrare "Manuali [Editore]" vs "Manuali Competitor"
  updatePublisherUI(currentPublisher, publishers);
}

function filterManualsByPublisher(manuals, currentPublisher) {
  const ours = manuals.filter(m => m.type === currentPublisher);
  const competitors = manuals.filter(m => m.type !== currentPublisher);
  
  return { ours, competitors };
}
```

---

#### **3. Analisi Preliminare (Fase 0)** 👤
**Obiettivo**: Prima della valutazione dettagliata, generare profilo docente e quadro generale

**Prompt GPT-4 per Fase 0:**
```javascript
const fase0Prompt = `
Sei un esperto analista di programmi didattici universitari.

Analizza il seguente programma del corso e genera:

1. QUADRO GENERALE:
   - Visione d'insieme dei contenuti
   - Struttura logica del corso
   - Distribuzione tematica (percentuali per macro-area)
   - Livello di complessità generale (base/intermedio/avanzato)

2. PROFILO PEDAGOGICO DEL DOCENTE:
   - Approccio didattico prevalente (teorico/applicativo/sperimentale/interdisciplinare)
   - Livello di approfondimento (base/intermedio/avanzato)
   - Enfasi particolari (argomenti privilegiati)
   - Stile didattico (classico/moderno/innovativo)
   - Orientamento disciplinare (puro/applicato)

PROGRAMMA:
${programText}

METADATI:
- Università: ${universita}
- Corso di Laurea: ${corsoDiLaurea}
- CFU: ${cfu}
- Ore: ${ore}
- Docente: ${docente}

Rispondi in formato JSON:
{
  "quadro_generale": {
    "tipologia": "...",
    "distribuzione_tematica": [
      {"area": "...", "percentuale": 40},
      ...
    ],
    "livello_complessita": "intermedio",
    "note": "..."
  },
  "profilo_pedagogico": {
    "approccio": "teorico-applicativo",
    "livello": "intermedio-avanzato",
    "enfasi": ["termodinamica", "equilibri"],
    "stile": "interdisciplinare",
    "orientamento": "applicato",
    "note": "..."
  }
}
`;
```

**Integrazione nel flusso:**
```javascript
async function avviaAnalisi() {
  // Fase 0: Analisi Preliminare (NUOVO)
  showProgress("Fase 0: Analisi Preliminare...");
  const fase0 = await generaAnalisiPreliminare(programText, metadata);
  
  // Visualizza risultati Fase 0
  displayQuadroGenerale(fase0.quadro_generale);
  displayProfiloPedagogico(fase0.profilo_pedagogico);
  
  // Fase 1: Estrazione Metadata (esistente)
  // Fase 2: Valutazione Programma (esistente)
  // Fase 3: Valutazione Manuali (MODIFICATA)
  ...
}
```

---

#### **4. Valutazioni Assolute e Dinamiche** 📊
**Obiettivo**: Implementare doppia valutazione per ogni manuale

**A) Valutazione Assoluta (Statica)**
- [ ] Funzione `generaValutazioneAssoluta(manuale, framework)`
- [ ] Salvataggio in `valutazioni_assolute/{manualeId}.json`
- [ ] Cache in localStorage (30 giorni scadenza)
- [ ] Riutilizzo se già esistente

**Prompt GPT-4 Valutazione Assoluta:**
```javascript
const valutazioneAssolutaPrompt = `
Sei un esperto valutatore di manuali universitari.

Valuta il seguente manuale rispetto al framework teorico della materia.
Questa è una valutazione INTRINSECA, indipendente da programmi specifici.

MANUALE:
- Titolo: ${manual.title}
- Autore: ${manual.author}
- Editore: ${manual.publisher}
- Indice: ${JSON.stringify(manual.chapters)}

FRAMEWORK (${framework.name}):
- Moduli: ${JSON.stringify(framework.modules)}

Valuta su 270 punti totali:

1. COPERTURA MODULI (130 punti max):
   - Percentuale moduli del framework coperti
   - Completezza trattazione per ogni modulo

2. QUALITÀ DIDATTICA (40 punti max):
   - Chiarezza espositiva
   - Esempi e casi pratici
   - Esercizi e problemi
   - Supporti didattici

3. APPROFONDIMENTO (40 punti max):
   - Livello di dettaglio
   - Rigore scientifico
   - Contenuti avanzati

4. MATERIALI SUPPLEMENTARI (30 punti max):
   - Risorse online
   - Eserciziari
   - Laboratori/simulazioni

5. RAPPORTO QUALITÀ/PREZZO (30 punti max):
   - Prezzo: €${manual.price}
   - Pagine: ${manual.pages}

Rispondi in formato JSON:
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
    "sintesi": "...",
    "quando_raccomandare": ["L-27", "L-2", ...],
    "quando_non_raccomandare": [...]
  }
}
`;
```

**B) Valutazione Dinamica (Contestuale)**
- [ ] Funzione `generaValutazioneDinamica(manuale, programma, fase0, valutazioneAssoluta)`
- [ ] Integra risultati Fase 0 (profilo docente)
- [ ] Confronta con programma specifico
- [ ] NON salvata (temporanea)

**Prompt GPT-4 Valutazione Dinamica:**
```javascript
const valutazioneDinamicaPrompt = `
Valuta il manuale rispetto al PROGRAMMA SPECIFICO analizzato.

CONTESTO:
- Quadro Generale: ${JSON.stringify(fase0.quadro_generale)}
- Profilo Docente: ${JSON.stringify(fase0.profilo_pedagogico)}
- Valutazione Assoluta Manuale: ${JSON.stringify(valutazioneAssoluta)}

PROGRAMMA SPECIFICO:
${programText}

Valuta su 270 punti:
1. COPERTURA PROGRAMMA SPECIFICO (100 punti)
2. ADEGUATEZZA LIVELLO (70 punti)
3. ALLINEAMENTO ENFASI DOCENTE (50 punti)
4. RAPPORTO Q/P CONTESTUALE (50 punti)

Rispondi in JSON con:
- punteggio_totale
- raccomandazione: "Altamente Raccomandato" / "Raccomandato" / "Parzialmente Adeguato" / "Non Raccomandato"
- motivi: [...]
- gap: [...]
`;
```

---

#### **5. Export PDF con Layout Migliorato** 📄
**Obiettivo**: Report professionale con valutazioni A+B

**Sezioni PDF:**
1. **Copertina**: Logo MATRIX + Logo Editore
2. **Quadro Generale** (Fase 0)
3. **Profilo Pedagogico** (Fase 0)
4. **Valutazione Programma** (270 punti)
5. **Valutazioni Manuali**:
   - Box "Valutazione Assoluta" (verde)
   - Box "Valutazione Dinamica" (blu)
   - Confronto visivo
6. **Post-it Commerciali** (esistente)
7. **Raccomandazioni Finali**

---

## 📋 **CHECKLIST IMPLEMENTAZIONE**

### **Sprint 1: Core Multi-Materia (4-6 ore)**
- [ ] Refactoring index.html con branding MATRIX
- [ ] Dropdown selezione materia
- [ ] Caricamento dinamico framework
- [ ] Caricamento dinamico manuali
- [ ] Test con 3 materie diverse (Chimica, Fisica, Economia)

### **Sprint 2: Multi-Editore (2-3 ore)**
- [ ] UI selezione editore
- [ ] Logica dinamica type (nostri/competitor)
- [ ] Adattamento UI per editore corrente
- [ ] Test con Zanichelli e McGraw-Hill

### **Sprint 3: Analisi Preliminare (2-3 ore)**
- [ ] Implementa Fase 0 (Quadro Generale + Profilo Pedagogico)
- [ ] Integrazione prompt GPT-4
- [ ] UI visualizzazione risultati Fase 0
- [ ] Test con programmi reali

### **Sprint 4: Valutazioni A+B (4-5 ore)**
- [ ] Implementa valutazione assoluta
- [ ] Sistema di cache localStorage
- [ ] Implementa valutazione dinamica
- [ ] Integrazione nel flusso analisi
- [ ] UI doppio box valutazioni

### **Sprint 5: Export PDF e Test Finali (2-3 ore)**
- [ ] Layout PDF migliorato
- [ ] Integrazione valutazioni A+B nel PDF
- [ ] Test completo end-to-end
- [ ] Bug fixing

### **Sprint 6: Deploy Netlify (1 ora)**
- [ ] Configurazione Netlify
- [ ] Deploy automatico da GitHub
- [ ] Test live
- [ ] Documentazione finale

---

## 🔑 **COMANDI UTILI PER RIPRENDERE**

### **Clone Repository**
```bash
cd /home/user/webapp
git remote -v  # Verifica remote già configurati
git pull matrix main  # Pull ultime modifiche
```

### **Verifica Struttura**
```bash
# Verifica framework
ls -la frameworks/ | wc -l  # Deve essere 21

# Verifica manuali
find manuali/ -name "*.json" | wc -l  # Deve essere 85

# Verifica cataloghi
ls -la *_catalog.json matrix_config.json
```

### **Test Caricamento JSON**
```javascript
// Da console browser (F12)
fetch('matrix_config.json').then(r => r.json()).then(console.log);
fetch('framework_catalog.json').then(r => r.json()).then(console.log);
fetch('manual_catalog.json').then(r => r.json()).then(console.log);
```

---

## 📞 **SUGGERIMENTI PER NUOVA SESSIONE**

### **Messaggio Iniziale Consigliato:**
```
Ciao! Voglio continuare l'implementazione di MATRIX (Multi-Analysis Teaching Resource Intelligence X-platform).

Repository: https://github.com/sartinisergio/matrix-analisi-programmi
Branch: main
File di riferimento: /home/user/webapp/CONTINUA_QUI.md

Completato:
- ✅ 105 JSON estratti (21 frameworks + 85 manuali)
- ✅ Cataloghi e configurazione
- ✅ Documentazione README_MATRIX.md

Da fare:
1. Refactoring index.html con branding MATRIX
2. Sistema multi-editore
3. Analisi preliminare (Fase 0: profilo pedagogico)
4. Valutazioni assolute e dinamiche
5. Export PDF migliorato

Possiamo partire con Sprint 1?
```

---

## 📊 **METRICHE PROGETTO**

| Metrica | Valore | Status |
|---------|--------|--------|
| **Framework** | 21 | ✅ Completo |
| **Manuali** | 85 | ✅ Completo |
| **Materie** | 8 | ✅ Completo |
| **Cataloghi** | 3 | ✅ Completo |
| **Documentazione** | 3 file | ✅ Completo |
| **Implementazione UI** | 0% | ⏸️ In attesa |
| **Test E2E** | 0% | ⏸️ In attesa |
| **Deploy** | 0% | ⏸️ In attesa |

---

## 🎯 **OBIETTIVO FINALE**

**MVP MATRIX Funzionante:**
- ✅ Multi-materia (21 framework)
- ✅ Multi-editore (configurabile)
- ✅ Analisi preliminare docente
- ✅ Valutazioni assolute/dinamiche
- ✅ Export PDF professionale
- ✅ Deploy live su Netlify

**Timeline Stimata:** 15-20 ore totali (10-15 ore rimaste)

---

**🚀 Pronto per Sprint 1 nella prossima sessione!**
