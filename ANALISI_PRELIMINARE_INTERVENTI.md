# ANALISI PRELIMINARE - Interventi Qualità Report MATRIX

**Data**: 2026-02-08  
**Obiettivo**: Verificare fattibilità tecnica degli interventi proposti dall'utente  
**Repository**: `/home/user/webapp` (MATRIX v1.1)

---

## 📊 STATO ATTUALE DEL CODICE

### Architettura Generale

**File principale**: `index.html` (8.305 righe)  
**Struttura**: Single Page Application (SPA) con tutte le fasi di analisi in sequenza

### Flusso delle Fasi

```
avviaAnalisi() [riga 3223]
  ↓
Fase 0   [3298-3347]  → Analisi Preliminare (Quadro Generale + Profilo Pedagogico)
  ↓
Fase 0b  [3354-3401]  → Insights Profilo Docente (SOLO Avanzata)
  ↓
Fase 0.5 [3404-3622] → Logica Scelta Editoriale (Motivazioni, Alternativi, Profilo Decisionale)
  ↓
Fase 1   [3635-3666]  → Estrazione Metadata
  ↓
Fase 2   [3668-3772]  → Valutazione Programma (5 dimensioni, 270 punti)
  ↓
Fase 2b  [3779-3828]  → Insights Adozione (SOLO Avanzata)
  ↓
Fase 3   [3830-3987]  → Gap Analysis Manuale Adottato
  ↓
Fase 3c  [3988-4040]  → Analisi Impatto Adozione (SOLO Avanzata)
  ↓
Fase 3b  [4042-4200+] → Gap Analysis Manuali Alternativi
  ↓
Fase 4   [4201-4464]  → Valutazione Zanichelli
  ↓
Fase 4b  [4465-4523]  → Strategia Adozione (SOLO Avanzata)
  ↓
Fase 5   [5071-5695]  → generaAnalisiStrategica() - Strategia di Penetrazione
```

### Variabili Globali e Passaggio Dati

**PROBLEMA CRITICO IDENTIFICATO #1**:
```javascript
// Fase 0 salva risultato in variabile LOCALE
let fase0;
fase0 = JSON.parse(sanitizeJSON(analisiPreliminare));
window.currentAnalisiPreliminare = fase0; // Salvato anche in window
```

**PROBLEMA CRITICO IDENTIFICATO #2**:
```javascript
// Le fasi successive NON ricevono fase0 nei prompt
// Esempio Fase 2b (Insights Adozione):
const insightsPrompt = `Basandoti ESCLUSIVAMENTE sulla valutazione del programma già effettuata...
VALUTAZIONE PROGRAMMA GIÀ EFFETTUATA:
${JSON.stringify(valutazioneObj, null, 2)}
`;
// ❌ NON include fase0, fase05, fase1
```

**VERIFICA**: I risultati delle fasi precedenti NON vengono passati sistematicamente ai prompt successivi.

---

## ✅ VERIFICHE TECNICHE PER OGNI INTERVENTO

### **INTERVENTO 1: Riduzione Ridondanza**

#### 📋 Sezione A — Analisi Impatto Adozione (Fase 3c)

**Posizione**: Righe 3988-4040  
**Prompt attuale**:
```javascript
const gapInsightsPrompt = `Sei un esperto di editoria universitaria...
ANALISI GAP MANUALE ADOTTATO:
- Gap identificati: ${JSON.stringify(gapManualeObj.gap || [])}
- Punti debolezza: ${JSON.stringify(gapManualeObj.punti_debolezza || [])}
...
`;
```

**VERIFICA**: ✅ Il prompt riceve `gapManualeObj` (risultato Fase 3)  
**PROBLEMA**: ❌ Non riceve `fase0`, `fase05`, `fase1`, `fase2`  

**FATTIBILITÀ**: 🟢 **ALTA**
- Modificare il prompt è semplice
- Aggiungere `CONTESTO:` è sicuro
- Ma serve PRIMA passare i risultati delle fasi precedenti

**AZIONE NECESSARIA**:
1. Modificare `avviaAnalisi()` per salvare risultati in variabili accessibili
2. Passare `fase0`, `fase05`, `fase2` al prompt di Fase 3c

---

#### 📋 Sezione B — Strategia di Penetrazione (Fase 5)

**Posizione**: Righe 5071-5695 (`generaAnalisiStrategica`)  
**Prompt attuale**: Molto lungo (600+ righe), genera strategia basata su:
- `prog.manuale_adottato`
- `prog.gap_manuale`
- `prog.gap_alternativi`
- `prog.zanichelli`

**VERIFICA**: ✅ Riceve `prog` (oggetto completo con tutti i risultati)  
**PROBLEMA**: ❌ Il prompt è dentro la funzione, NON in `avviaAnalisi()`  

**STRUTTURA ATTUALE**:
```javascript
async function avviaAnalisi() {
  // ... tutte le fasi ...
  
  currentProgramma = {
    ...metadataObj,
    analisi_preliminare: fase0,
    motivazioni_scelta: motivazioniScelta,
    valutazione: valutazioneObj,
    gap_manuale: gapManualeObj,
    gap_alternativi: gapAlternativi,
    zanichelli: zanichelliObj
  };
  
  // ESTRATTO DA FILE E SALVATO IN `storico`
  salvaInStorico(currentProgramma);
  
  // POI chiamato separatamente dal UI
  // generaAnalisiStrategica(prog) → chiamata DOPO
}
```

**FATTIBILITÀ**: 🟡 **MEDIA**
- Il prompt è in una funzione separata
- Riceve già `prog` completo con tutti i dati
- Ma è lungo e complesso (600+ righe)
- Richiede refactoring attento per non rompere la logica esistente

**AZIONE NECESSARIA**:
1. Identificare dove nel prompt ripete informazioni
2. Aggiungere `CONTESTO:` all'inizio con dati già noti
3. Semplificare JSON output (come suggerito dall'utente)

---

#### 📋 Sezione C — Strategia Adozione (Fase 4b)

**Posizione**: Righe 4465-4523  
**Prompt attuale**:
```javascript
const strategiaPrompt = `Basandoti ESCLUSIVAMENTE sulla valutazione Zanichelli già effettuata...
VALUTAZIONE ZANICHELLI GIÀ EFFETTUATA:
${JSON.stringify(zanichelliObj, null, 2)}

MANUALE ATTUALMENTE ADOTTATO: ${manuale}

GAP MANUALE ATTUALE:
${JSON.stringify(gapManualeObj.gap || [])}
...
`;
```

**VERIFICA**: ✅ Riceve `zanichelliObj` e `gapManualeObj`  
**PROBLEMA**: ❌ Non riceve `fase0`, `fase05`, strategia penetrazione  

**FATTIBILITÀ**: 🟢 **ALTA**
- Prompt breve e chiaro
- Facile aggiungere `CONTESTO:`
- Serve passare risultati fasi precedenti

---

#### 📋 Sezione D — Note per il Colloquio

**PROBLEMA CRITICO**: ❌ **NON ESISTE COME FASE SEPARATA**

**Verifica nel codice**:
```bash
grep -n "Note per il Colloquio" index.html
# Output: 6765: <p class="font-medium text-yellow-900 mb-2">💡 Note per il Colloquio:</p>
```

**Posizione**: Riga 6765 (rendering HTML)  
**Contenuto**: Le note sono parte della `strategia_adozione` (Fase 4b), campo `note_colloquio`

**FATTIBILITÀ**: 🟢 **ALTA**
- Già esiste il campo `note_colloquio`
- È generato in Fase 4b
- Basta modificare il prompt per renderlo ultra-sintetico (5 bullet)

---

### **INTERVENTO 2: Aumento Specificità**

#### 📋 Sezione A — Insights Profilo Docente (Fase 0b)

**Posizione**: Righe 3354-3401  
**Prompt attuale**:
```javascript
const profiloDocentePrompt = `Basandoti ESCLUSIVAMENTE sull'analisi preliminare...
ANALISI PRELIMINARE GIÀ EFFETTUATA:
${JSON.stringify(fase0, null, 2)}
...
Genera un JSON con questa struttura:
{
  "profilo_docente_insights": {
    "tipo_docente": "Tradizionalista / Innovatore / Pragmatico / Accademico",
    "sensibilita_chiave": "Cosa sembra importante...",
    "approccio_consigliato": "Come presentare...",
    "leve_potenziali": [...],
    "possibili_resistenze": [...],
    "argomenti_rilevanti": [...]
  }
}
`;
```

**VERIFICA**: ✅ Struttura chiara, output JSON definito  
**PROBLEMA**: ❌ Il prompt NON impone specificità, l'AI può essere generica  

**FATTIBILITÀ**: 🟢 **ALTISSIMA**
- Aggiungere `REGOLA DI SPECIFICITÀ OBBLIGATORIA:` è triviale
- Fornire esempi ❌/✅ è sicuro
- Non cambia struttura JSON

---

#### 📋 Sezione B — Insights Adozione (Fase 2b)

**Posizione**: Righe 3779-3828  
**Prompt attuale**:
```javascript
const insightsPrompt = `Basandoti ESCLUSIVAMENTE sulla valutazione del programma...
{
  "insights_adozione": {
    "punti_forza_programma": [...],
    "aspetti_migliorabili": [...],
    "opportunita_manuale": "Descrizione..."
  }
}
`;
```

**VERIFICA**: ✅ Struttura semplice  
**PROBLEMA**: ❌ Il campo `opportunita_manuale` produce output generico  

**FATTIBILITÀ**: 🟢 **ALTISSIMA**
- Aggiungere istruzioni più stringenti è sicuro
- Chiedere nomi specifici di manuali Zanichelli richiede accesso a `MANUAL_CATALOG`

**NOTA**: Per citare manuali Zanichelli, serve passare `MANUAL_CATALOG.manuals` nel prompt

---

### **INTERVENTO 3: Executive Summary**

**VERIFICA**: ❌ **NON ESISTE**

**Ricerca nel codice**:
```bash
grep -n "executive\|summary\|sommario" index.html -i
# Output: Nessun risultato
```

**FATTIBILITÀ**: 🟢 **ALTA**
- È una fase ADDIZIONALE, non modifica nulla di esistente
- Va inserita DOPO tutte le fasi, PRIMA del rendering
- Richiede +1 chiamata API (costo minimo)

**IMPLEMENTAZIONE**:
1. Creare nuova funzione `generaExecutiveSummary(prog)` dopo Fase 5
2. Prompt riceve: `fase0`, `fase05`, `fase2`, `gapManualeObj`, raccomandazione Zanichelli
3. Output: JSON con 6 campi (docente, situazione, opportunità, zanichelli, approccio, attenzione)
4. Inserire nel rendering HTML come primo box (dopo intestazione)

---

### **INTERVENTO 4: Tabella Modulo per Modulo**

**Posizione teorica**: Fase 4 (Valutazione Zanichelli), righe 4201-4464

**Prompt attuale** (Fase 4):
```javascript
// Valuta ogni manuale Zanichelli
for (const manualeZan of manualiZanichelliDaValutare) {
  const valutazioneZanPrompt = `Valuta il manuale "${manualeZan.title}"...
  Rispondi SOLO con un JSON:
  {
    "compatibilita": numero_su_100,
    "punti_forza": [...],
    "gap": [...],
    "quando_preferirlo": "...",
    ...
  }`;
}
```

**VERIFICA**: ✅ Il framework è già caricato in `CURRENT_FRAMEWORK.content.syllabus_modules`  
**PROBLEMA**: ❌ L'output non chiede copertura modulo per modulo  

**FATTIBILITÀ**: 🟡 **MEDIA-ALTA**
- Aggiungere array `copertura_moduli` nell'output JSON è fattibile
- Aumenta token output significativamente (15 moduli × 5 manuali = 75 righe)
- Rendering HTML richiede nuova griglia (complessità media)

**STIMA AUMENTO TOKEN**:
- Per 5 manuali × 15 moduli = 75 righe output
- Circa +500-700 token per analisi
- Costo: +$0.001-0.002 per report (trascurabile)

---

### **INTERVENTO 5: Doppia Variante Pitch**

**Ricerca nel codice**:
```bash
grep -n "pitch\|Pitch" index.html | head -10
```

**RISULTATO**: ❌ Non esiste un campo `pitch` esplicito

**Verifica nella Strategia di Penetrazione** (Fase 5):
- Il prompt genera strategia completa
- NON genera pitch separato
- La strategia include "approccio" ma non pitch formulato

**FATTIBILITÀ**: 🟢 **ALTA**
- Aggiungere 2 campi `pitch_primo_contatto` e `pitch_docente_conosciuto` è triviale
- Modificare prompt di Fase 5 è sicuro
- Rendering: 2 box affiancati nel report

---

## 🚨 PROBLEMI CRITICI IDENTIFICATI

### **PROBLEMA #1: Passaggio Dati tra Fasi**

**Situazione attuale**:
```javascript
let fase0;  // Variabile LOCALE in avviaAnalisi()
fase0 = JSON.parse(...);
window.currentAnalisiPreliminare = fase0; // Backup in window

// Ma i prompt successivi NON usano window.currentAnalisiPreliminare
// Ogni fase riceve solo il risultato della fase IMMEDIATAMENTE precedente
```

**IMPATTO**:
- ❌ Intervento 1 (Ridondanza) richiede che i prompt ricevano risultati di TUTTE le fasi precedenti
- ❌ Attualmente NON è così

**SOLUZIONE NECESSARIA**:
```javascript
// Opzione A: Salvare risultati in oggetto globale
window.analisiInCorso = {
  fase0: null,
  fase05: null,
  fase1: null,
  fase2: null,
  fase3: null,
  fase4: null
};

// Opzione B: Passare esplicitamente ai prompt
const fase3cPrompt = `...
CONTESTO:
${JSON.stringify({
  fase0: fase0,
  fase05: motivazioniScelta,
  fase2: valutazioneObj
}, null, 2)}
...`;
```

**RACCOMANDAZIONE**: Opzione B (esplicita, più sicura)

---

### **PROBLEMA #2: Strategia di Penetrazione in Funzione Separata**

**Situazione attuale**:
```javascript
async function avviaAnalisi() {
  // ... tutte le fasi ...
  currentProgramma = { tutti i risultati };
  salvaInStorico(currentProgramma);
  mostraRisultato(currentProgramma); // Rendering report
}

// In ALTRO punto del codice (chiamato dal UI)
async function generaAnalisiStrategica(prog) {
  // Genera strategia usando prog (recuperato da storico)
  const promptStrategia = `... 600 righe ...`;
  // Salva in prog.strategia_penetrazione
}
```

**IMPATTO**:
- ⚠️ La Strategia di Penetrazione NON è parte del flusso principale
- ⚠️ È chiamata SEPARATAMENTE dopo che il report è già mostrato
- ✅ Ma riceve `prog` completo, quindi ha accesso a tutti i dati

**SOLUZIONE**: Non serve modificare l'architettura, basta modificare il prompt

---

### **PROBLEMA #3: Framework `syllabus_modules` Non Sempre Accessibile**

**Verifica**:
```javascript
// Fase 2: il framework è in CURRENT_FRAMEWORK
const frameworkData = CURRENT_FRAMEWORK;
const moduliList = frameworkData.content.syllabus_modules.map(...);
```

**IMPATTO**:
- ✅ Il framework è disponibile durante le fasi
- ✅ Intervento 4 (Tabella Moduli) è fattibile

---

## 📊 RIEPILOGO FATTIBILITÀ

| # | Intervento | Complessità | Rischio | Prerequisiti | Tempo Stimato |
|---|------------|-------------|---------|--------------|---------------|
| **5** | Doppia Variante Pitch | 🟢 Bassa | 🟢 Basso | Nessuno | 30-45 min |
| **2** | Aumento Specificità | 🟢 Bassa | 🟢 Basso | Nessuno | 2-3 ore |
| **3** | Executive Summary | 🟡 Media | 🟢 Basso | Nessuno | 2-3 ore |
| **1** | Riduzione Ridondanza | 🟡 Media-Alta | 🟡 Medio | **Refactoring passaggio dati** | 6-8 ore |
| **4** | Tabella Moduli | 🟡 Media-Alta | 🟡 Medio | Nessuno | 8-10 ore |

---

## ⚠️ PREREQUISITO CRITICO: Refactoring Passaggio Dati

**Prima di implementare Intervento 1**, serve:

### **Step 1: Creare Oggetto Risultati Centralizzato**

```javascript
async function avviaAnalisi() {
  // Crea contenitore risultati
  const risultati = {
    fase0: null,
    fase05: null,
    fase1: null,
    fase2: null,
    fase3: null,
    fase4: null
  };
  
  // Fase 0
  const fase0 = await callLLM(...);
  risultati.fase0 = JSON.parse(sanitizeJSON(fase0));
  
  // Fase 0.5
  const fase05 = await callLLM(...);
  risultati.fase05 = JSON.parse(sanitizeJSON(fase05));
  
  // ... e così via
}
```

### **Step 2: Passare Risultati ai Prompt Successivi**

```javascript
// Esempio Fase 3c (Analisi Impatto)
const gapInsightsPrompt = `...
CONTESTO: Il promotore ha GIÀ letto:
- Analisi Preliminare (Fase 0): ${JSON.stringify(risultati.fase0, null, 2)}
- Logica Scelta Editoriale (Fase 0.5): ${JSON.stringify(risultati.fase05, null, 2)}
- Valutazione Programma (Fase 2): ${JSON.stringify(risultati.fase2, null, 2)}
- Gap Analysis (Fase 3): ${JSON.stringify(gapManualeObj, null, 2)}

NON ripetere gap o analisi già fornite.
CONCENTRATI SOLO su impatto pratico e costo dell'inazione.
...`;
```

**TEMPO STIMATO REFACTORING**: 2-3 ore  
**RISCHIO**: Medio (tocca logica core, serve test accurato)

---

## 🎯 ORDINE IMPLEMENTAZIONE RACCOMANDATO

### **Scenario A: Con Refactoring Preliminare**

1. **Refactoring passaggio dati** (2-3 ore) → Prerequisito per Intervento 1
2. **Intervento #5 - Doppia Variante Pitch** (30 min) → Test del workflow
3. **Intervento #2 - Aumento Specificità** (2-3 ore)
4. **Intervento #3 - Executive Summary** (2-3 ore)
5. **Intervento #1 - Riduzione Ridondanza** (6-8 ore) → Ora fattibile
6. **Intervento #4 - Tabella Moduli** (8-10 ore) → Opzionale

**Tempo totale**: 21-27 ore

---

### **Scenario B: Senza Refactoring (Modifiche Limitate)**

1. **Intervento #5 - Doppia Variante Pitch** (30 min)
2. **Intervento #2 - Aumento Specificità** (2-3 ore)
3. **Intervento #3 - Executive Summary** (2-3 ore)
4. **Intervento #1 - PARZIALE** (solo sezioni che già ricevono dati sufficienti) (4-5 ore)
5. **Intervento #4 - Opzionale** (8-10 ore)

**Tempo totale**: 17-22 ore

**TRADE-OFF**:
- ✅ Più veloce
- ❌ Intervento 1 meno efficace (non tutte le sezioni avranno contesto completo)

---

## 💡 RACCOMANDAZIONE FINALE

### **Approccio Graduale in 3 Fasi**

#### **FASE A: Quick Wins (4-5 ore)**
1. Doppia Variante Pitch (30 min)
2. Aumento Specificità (2-3 ore)
3. Executive Summary (2-3 ore)

**Output**: 3 miglioramenti visibili immediatamente, zero rischio

---

#### **FASE B: Refactoring + Ridondanza (8-11 ore)**
4. Refactoring passaggio dati (2-3 ore)
5. Riduzione Ridondanza completa (6-8 ore)

**Output**: Risolve problema #1 del report, ma richiede test accurato

---

#### **FASE C: Tabella Moduli (8-10 ore) - OPZIONALE**
6. Implementa solo se Fase A+B funzionano bene

**Output**: Nice-to-have, utile ma non critico

---

## 🔧 PROSSIMI PASSI

**Opzione 1: Inizia con FASE A (Quick Wins)**
- Rischio basso, risultati immediati
- Non tocca logica core
- Permette di testare workflow

**Opzione 2: Inizia con Refactoring**
- Più lento ma più solido
- Abilita Intervento 1 completo
- Rischio medio

**Domanda all'utente**: Quale approccio preferisci?

---

## 📝 NOTE TECNICHE AGGIUNTIVE

### File di Backup Disponibili
```
index.html.backup
index.html.backup_before_advanced_54b6f9c
index.html.backup_pre_fase05_avanzata
index.html.backup_pre_fix_completo
```

**Raccomandazione**: Creare nuovo backup prima di qualsiasi modifica:
```bash
cp index.html index.html.backup_pre_quality_improvements_$(date +%Y%m%d)
```

### Branch Git
**Raccomandazione**: Creare branch feature separato:
```bash
git checkout -b feature/quality-improvements
```

### Testing
**Programmi di test necessari**:
1. Programma "normale" (es. Spinello Chimica Generale)
2. Programma con pochi gap (per verificare gestione casi limite)
3. Programma con molti gap (per verificare verbosità)

---

**Fine Analisi Preliminare**
