# PIANO IMPLEMENTAZIONE - Quick Wins (FASE A)

**Data**: 2026-02-08  
**Obiettivo**: Implementare i 3 interventi a basso rischio e alto impatto  
**Tempo stimato**: 4-5 ore  
**Branch**: `feature/quality-improvements-phase-a`

---

## 📋 CHECKLIST PRE-IMPLEMENTAZIONE

- [ ] Backup codice attuale
- [ ] Creazione branch Git
- [ ] Verifica ambiente di test
- [ ] Identificazione programmi di test

---

## 🎯 INTERVENTO #5: DOPPIA VARIANTE PITCH

### **Tempo stimato**: 30-45 minuti

### **Obiettivo**
Generare due versioni del pitch: una per primo contatto, una per docente già conosciuto.

### **File da modificare**
- `index.html` (Funzione `generaAnalisiStrategica`, righe 5071-5695)

### **Implementazione**

#### **Step 1: Localizza il prompt della Strategia di Penetrazione**

```bash
# Cerca riga dove si costruisce promptStrategia
grep -n "promptStrategia = " index.html
```

#### **Step 2: Modifica il prompt**

**PRIMA** (cerca questa stringa nel prompt):
```
Rispondi SOLO con un JSON valido:
{
  "scenario": "zanichelli_principale",
  "analisi_scelta_attuale": { ... },
  ...
}
```

**DOPO** (aggiungi questa sezione al JSON output):
```javascript
// Nel prompt, modifica la struttura JSON per includere:
{
  "scenario": "...",
  "analisi_scelta_attuale": { ... },
  "confronto_altri_zanichelli": { ... },
  "confronto_competitor": { ... },
  "raccomandazione_finale": "...",
  
  // ⭐ NUOVO: Doppia variante pitch
  "pitch": {
    "primo_contatto": "Per docente NON conosciuto. Tono professionale, presentazione breve, aggancio specifico al programma. Max 4 righe.",
    "docente_conosciuto": "Per docente GIÀ conosciuto. Tono diretto e collegiale, niente presentazioni, va dritto al punto con riferimento specifico. Max 3 righe."
  }
}
```

#### **Step 3: Modifica rendering HTML**

**Cerca nel rendering** (circa riga 5695-6000):
```javascript
// Cerca sezione che mostra la strategia di penetrazione
<span class="mr-3">🚀</span>Strategia di Penetrazione Mercato
```

**Aggiungi dopo la raccomandazione**:
```html
<!-- Doppia variante pitch -->
${prog.strategia_penetrazione?.pitch ? `
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
  <p class="font-semibold text-blue-900 mb-3">💬 Pitch di Apertura</p>
  
  <!-- Primo Contatto -->
  <div class="mb-4">
    <p class="text-sm font-medium text-blue-800 mb-1">📧 Primo Contatto (docente non conosciuto):</p>
    <p class="text-sm text-gray-700 italic bg-white p-3 rounded border border-blue-200">
      "${prog.strategia_penetrazione.pitch.primo_contatto}"
    </p>
  </div>
  
  <!-- Docente Conosciuto -->
  <div>
    <p class="text-sm font-medium text-blue-800 mb-1">🤝 Docente Conosciuto:</p>
    <p class="text-sm text-gray-700 italic bg-white p-3 rounded border border-blue-200">
      "${prog.strategia_penetrazione.pitch.docente_conosciuto}"
    </p>
  </div>
</div>
` : ''}
```

#### **Step 4: Test**

1. Carica programma di test (Spinello)
2. Esegui analisi avanzata
3. Vai a "Strategia di Penetrazione"
4. Verifica presenza dei 2 pitch
5. Verifica che siano diversi nel tono

---

## 🎯 INTERVENTO #2: AUMENTO SPECIFICITÀ

### **Tempo stimato**: 2-3 ore

### **Obiettivo**
Forzare l'AI a produrre insights specifici ancorati al programma, non generici.

---

### **Parte 2A: Insights Profilo Docente (Fase 0b)**

#### **File da modificare**
- `index.html` (Fase 0b, righe 3354-3401)

#### **Implementazione**

**Cerca il prompt**:
```javascript
const profiloDocentePrompt = `Basandoti ESCLUSIVAMENTE sull'analisi preliminare...
```

**Modifica: Aggiungi PRIMA del compito**:
```javascript
const profiloDocentePrompt = `Sei un assistente strategico per promotori editoriali.

ANALISI PRELIMINARE GIÀ EFFETTUATA:
${JSON.stringify(fase0, null, 2)}

PROGRAMMA (per contesto):
${testo.substring(0, 5000)}

CONTESTO:
- Materia: ${materiaName}
- Classe di Laurea: ${contesto}

⚠️ REGOLA DI SPECIFICITÀ OBBLIGATORIA:
Ogni affermazione DEVE contenere almeno UNO di questi elementi:
1. Riferimento TESTUALE a qualcosa di specifico trovato nel programma
   (argomento, metodologia, formulazione particolare)
2. Dato CONCRETO (percentuale distribuzione tematica, peso CFU, 
   numero ore dedicate a un modulo)
3. INFERENZA non ovvia che collega due elementi del programma

❌ ESEMPI DI COSA NON SCRIVERE (troppo generico):
- "Importanza dell'integrazione tra teoria e pratica"
- "Supporto a metodologie didattiche innovative"
- "Focus su applicazioni biologiche della chimica"

✅ ESEMPI DI COSA SCRIVERE (specifico):
- "Il docente dedica il 15% del programma agli equilibri chimici 
   collegandoli esplicitamente ai processi biologici — questo peso 
   è superiore alla media per L-13 e suggerisce interesse personale 
   per la bioinorganica"
- "La menzione esplicita del Team Based Learning E del coteaching 
   (non solo una delle due) indica un docente che ha investito 
   nella formazione pedagogica, non uno che usa TBL come etichetta"

Per "Leve Potenziali" e "Possibili Resistenze":
- Specifica PERCHÉ funzionerebbe con QUESTO docente (non in generale)
- Indica QUALE elemento del programma te lo fa pensare
- Per resistenze: indica COME si manifesterebbe nel colloquio

IMPORTANTE: 
- NON inventare dati numerici
- Usa linguaggio qualitativo: "potrebbe", "probabilmente", "tendenzialmente"
- Basa tutto su ciò che emerge dal programma e dall'analisi preliminare

Genera un JSON con questa struttura:
{
  "profilo_docente_insights": {
    "tipo_docente": "Tradizionalista / Innovatore / Pragmatico / Accademico (basato su stile e approccio identificati)",
    "sensibilita_chiave": "Cosa sembra importante per questo docente (basato su enfasi e orientamento) - DEVE includere riferimento specifico al programma",
    "approccio_consigliato": "Come presentare un manuale alternativo - DEVE riferirsi a caratteristiche specifiche identificate",
    "leve_potenziali": [
      "leva1 CON spiegazione del perché funzionerebbe con QUESTO docente e quale elemento del programma lo suggerisce",
      "leva2 con stessa struttura"
    ],
    "possibili_resistenze": [
      "resistenza1 CON indicazione di quale comportamento/scelta del docente la suggerisce e come si manifesterebbe",
      "resistenza2 con stessa struttura"
    ],
    "argomenti_rilevanti": ["tipo di contenuto specifico enfatizzato", "aspetto distintivo del programma"]
  }
}

RISPONDI SOLO CON IL JSON, NIENT'ALTRO.`;
```

---

### **Parte 2B: Insights Adozione (Fase 2b)**

#### **File da modificare**
- `index.html` (Fase 2b, righe 3779-3828)

#### **Implementazione**

**Cerca il prompt**:
```javascript
const insightsPrompt = `Basandoti ESCLUSIVAMENTE sulla valutazione del programma...
```

**Modifica: Aggiungi DOPO il contesto**:
```javascript
const insightsPrompt = `Basandoti ESCLUSIVAMENTE sulla valutazione del programma già effettuata, genera insights per un promotore editoriale.

VALUTAZIONE PROGRAMMA GIÀ EFFETTUATA:
${JSON.stringify(valutazioneObj, null, 2)}

${valutazioneObj.analisi_criteri ? `
CRITERI SPECIFICI IDENTIFICATI:
${JSON.stringify(valutazioneObj.analisi_criteri, null, 2)}
` : ''}

⚠️ REGOLA DI SPECIFICITÀ per "Opportunità Manuale":
NON descrivere il manuale ideale generico.
Descrivi ESATTAMENTE cosa manca nell'ecosistema didattico attuale 
di questo docente (manuale + alternativi + dispense + metodologia) 
che un prodotto Zanichelli specifico potrebbe colmare.

✅ FAI NOMI di manuali Zanichelli dal catalogo disponibile.

CATALOGO ZANICHELLI DISPONIBILE (usa questi nomi):
${MANUAL_CATALOG && MANUAL_CATALOG.manuals ? 
  MANUAL_CATALOG.manuals
    .filter(m => m.publisher === 'Zanichelli' || m.type === 'zanichelli')
    .map(m => `- ${m.title} (${m.author})`)
    .join('\n')
  : 'Catalogo non disponibile'}

IMPORTANTE:
- NON inventare dati numerici (ore, percentuali precise, costi)
- Basa tutto SOLO sulla valutazione già fatta
- Usa linguaggio qualitativo: "potrebbe", "tendenzialmente", "in generale"
- NON fare affermazioni categoriche senza evidenza dal programma

Per "Punti Forza Programma" e "Aspetti Migliorabili":
NON riformulare ciò che è già nella Fase 1.
Concentrati SOLO su implicazioni COMMERCIALI:
- Quali punti di forza rendono PIÙ FACILE proporre Zanichelli?
- Quali aspetti migliorabili creano OPPORTUNITÀ per un manuale diverso?
- Quali caratteristiche LIMITANO le possibilità di cambio?

Genera un JSON con questa struttura:
{
  "insights_adozione": {
    "punti_forza_programma": [
      "forza1 commercialmente rilevante (es: 'Metodologia TBL facilita dimostrazione valore aggiunto Zanichelli')",
      "forza2 con stesso formato"
    ],
    "aspetti_migliorabili": [
      "aspetto1 che crea opportunità (es: 'Gap termochimica apre spazio per proposta Bertini')",
      "aspetto2 con stesso formato"
    ],
    "opportunita_manuale": "Descrizione SPECIFICA (150-200 parole) con NOMI di manuali Zanichelli che risolvono gap identificati. Esempio: 'Il docente compensa lacune di Arnesano sulla termochimica usando Kotz come approfondimento — Bertini struttura, proprietà e trasformazioni coprirebbe entrambe le esigenze in un unico volume...'"
  }${valutazioneObj.analisi_criteri ? `,
  "analisi_criteri_approfondita": {
    "implicazioni_didattiche": "Analisi (200-300 parole) di cosa significano i criteri identificati per la scelta del manuale. Es: se programma è Keynesiano, quale tipo di manuale serve? Se sequenza è Breve->Lungo, cosa cercare?",
    "compatibilita_manuale_ideale": "Descrizione del manuale ideale che rispetta questi criteri CON NOMI specifici di manuali Zanichelli"
  }` : ''}
}

RISPONDI SOLO CON IL JSON, NIENT'ALTRO.`;
```

---

## 🎯 INTERVENTO #3: EXECUTIVE SUMMARY

### **Tempo stimato**: 2-3 ore

### **Obiettivo**
Aggiungere sommario ultra-compatto in cima al report per lettura rapida (30 secondi).

---

### **Parte 3A: Nuova Funzione di Generazione**

#### **File da modificare**
- `index.html` (Dopo `generaAnalisiStrategica`, circa riga 5800)

#### **Implementazione**

**Aggiungi nuova funzione**:
```javascript
// Dopo la funzione generaAnalisiStrategica()
async function generaExecutiveSummary(prog) {
    console.log('📋 Genera Executive Summary');
    
    try {
        // Estrai raccomandazione Zanichelli
        let zanichelliRaccomandato = 'Non disponibile';
        let compatibilita = 0;
        
        if (prog.zanichelli && prog.zanichelli.manuali && prog.zanichelli.manuali.length > 0) {
            const primario = prog.zanichelli.manuali[0];
            zanichelliRaccomandato = primario.title || primario.titolo || 'Non specificato';
            compatibilita = primario.compatibilita || 0;
        }
        
        const summaryPrompt = `Sei un assistente strategico per un promotore editoriale universitario.

Hai a disposizione l'analisi completa di un programma didattico:

FASE 0 (Profilo Preliminare):
${JSON.stringify(prog.analisi_preliminare, null, 2)}

FASE 0.5 (Scelta Editoriale):
${JSON.stringify(prog.motivazioni_scelta, null, 2)}

FASE 2 (Gap Analysis):
- Manuale adottato: ${prog.manuale_adottato}
- Gap identificati: ${JSON.stringify(prog.gap_manuale?.gap || [])}
- Punti debolezza: ${JSON.stringify(prog.gap_manuale?.punti_debolezza || [])}

RACCOMANDAZIONE ZANICHELLI:
- Titolo: ${zanichelliRaccomandato}
- Compatibilità: ${compatibilita}/100

Il promotore sta per entrare nell'ufficio del docente. 
Ha 30 SECONDI per leggere questo sommario.

Genera un executive summary con ESATTAMENTE questi 6 campi, 
ciascuno di MASSIMO 1 riga (max 100 caratteri):

FORMATO OUTPUT (JSON):
{
  "docente_in_breve": "Nome, tipo (innovatore/conservatore/...), tratto distintivo principale",
  "situazione_attuale": "Manuale X, punto debole principale, come compensa",
  "opportunita": "Cosa proporre e perché in una frase",
  "zanichelli_raccomandato": "${zanichelliRaccomandato} — ${compatibilita}/100",
  "approccio_colloquio": "Come aprire e quale tono usare",
  "attenzione": "L'unica cosa da NON fare/dire"
}

Sii TELEGRAFICAMENTE sintetico. 
Ogni parola in più è una parola che il promotore non legge.

RISPONDI SOLO CON IL JSON, NIENT'ALTRO.`;

        const summaryResponse = await callLLM(summaryPrompt, 0.1);
        const summaryObj = JSON.parse(sanitizeJSON(summaryResponse));
        
        console.log('✅ Executive Summary generato:', summaryObj);
        return summaryObj;
        
    } catch (error) {
        console.error('❌ Errore generazione Executive Summary:', error);
        return null;
    }
}
```

---

### **Parte 3B: Integrazione nel Flusso**

#### **Modifica funzione `avviaAnalisi`**

**Cerca** (circa riga 4660):
```javascript
// Crea risultato
currentProgramma = {
    id: Date.now(),
    ...metadataObj,
    framework_name: frameworkName,
    // ... altri campi
};
```

**Aggiungi DOPO** (prima di `salvaInStorico`):
```javascript
// Executive Summary (se analisi avanzata)
if (tipoAnalisi === 'avanzata') {
    updateLoadingText('Fase finale: Generazione executive summary...');
    try {
        const executiveSummary = await generaExecutiveSummary(currentProgramma);
        if (executiveSummary) {
            currentProgramma.executive_summary = executiveSummary;
            console.log('✅ Executive Summary aggiunto al report');
        }
    } catch (error) {
        console.warn('⚠️ Executive Summary fallito, continuo comunque:', error.message);
    }
}
```

---

### **Parte 3C: Rendering HTML**

**Cerca nel rendering** (circa riga 5400):
```javascript
<h2 class="text-2xl font-bold mb-4">
    ${prog.denominazione_corso || 'Analisi Programma'}
</h2>
```

**Aggiungi SUBITO DOPO l'intestazione**:
```html
<!-- Executive Summary -->
${prog.executive_summary ? `
<div class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 shadow-lg">
    <div class="flex items-center mb-4">
        <span class="text-3xl mr-3">📋</span>
        <h3 class="text-xl font-bold text-yellow-900">Executive Summary</h3>
        <span class="ml-auto text-xs text-yellow-700 font-medium">⏱️ Lettura: 30 secondi</span>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <!-- Colonna 1 -->
        <div>
            <p class="mb-3">
                <span class="font-semibold text-yellow-900">👤 Docente:</span>
                <span class="text-gray-800">${prog.executive_summary.docente_in_breve}</span>
            </p>
            <p class="mb-3">
                <span class="font-semibold text-yellow-900">📚 Situazione:</span>
                <span class="text-gray-800">${prog.executive_summary.situazione_attuale}</span>
            </p>
            <p class="mb-3">
                <span class="font-semibold text-yellow-900">💡 Opportunità:</span>
                <span class="text-gray-800">${prog.executive_summary.opportunita}</span>
            </p>
        </div>
        
        <!-- Colonna 2 -->
        <div>
            <p class="mb-3">
                <span class="font-semibold text-yellow-900">✅ Raccomandato:</span>
                <span class="text-gray-800">${prog.executive_summary.zanichelli_raccomandato}</span>
            </p>
            <p class="mb-3">
                <span class="font-semibold text-yellow-900">🎯 Approccio:</span>
                <span class="text-gray-800">${prog.executive_summary.approccio_colloquio}</span>
            </p>
            <p class="mb-0">
                <span class="font-semibold text-red-700">⚠️ Attenzione:</span>
                <span class="text-gray-800 italic">${prog.executive_summary.attenzione}</span>
            </p>
        </div>
    </div>
</div>
` : ''}
```

---

## ✅ TESTING COMPLETO FASE A

### **Test 1: Programma Normale (Spinello)**

1. Carica programma Spinello Chimica Generale
2. Seleziona "Analisi Avanzata"
3. Esegui analisi completa
4. Verifica:
   - ✅ Executive Summary visibile in cima
   - ✅ 6 campi presenti e sintetici (max 100 caratteri)
   - ✅ Doppio pitch nella Strategia di Penetrazione
   - ✅ Insights Profilo Docente contengono riferimenti specifici al programma
   - ✅ Insights Adozione menzionano manuali Zanichelli per nome

### **Test 2: Programma con Pochi Gap**

1. Carica un programma dove il manuale copre bene il programma
2. Verifica che gli insights non inventino gap inesistenti
3. Verifica che Executive Summary rifletta situazione positiva

### **Test 3: Programma con Molti Gap**

1. Carica un programma con manuale inadeguato
2. Verifica che gli insights siano specifici anche con molti gap
3. Verifica che Executive Summary evidenzi criticità principali

---

## 📊 METRICHE DI SUCCESSO

### **Per Intervento #5 (Pitch)**
- ✅ 2 pitch generati con toni diversi
- ✅ Primo contatto: formale, presenta Zanichelli
- ✅ Docente conosciuto: diretto, focus sul punto

### **Per Intervento #2 (Specificità)**
- ✅ Almeno 80% degli insights contengono riferimento testuale/dato concreto
- ✅ Zero frasi generiche tipo "importante integrare teoria e pratica"
- ✅ Nomi di manuali Zanichelli citati in "Opportunità Manuale"

### **Per Intervento #3 (Executive Summary)**
- ✅ Visibile in cima al report
- ✅ 6 campi presenti
- ✅ Ogni campo max 100 caratteri
- ✅ Tempo lettura: 30 secondi

---

## 🐛 TROUBLESHOOTING

### **Problema: Executive Summary non generato**
- Verifica console browser per errori
- Controlla che `tipoAnalisi === 'avanzata'`
- Verifica che API key sia valida

### **Problema: Pitch non mostrato**
- Verifica che `prog.strategia_penetrazione` esista
- Controlla JSON output della strategia
- Verifica rendering HTML (ispeziona elemento)

### **Problema: Insights ancora generici**
- L'AI potrebbe ignorare istruzioni → aumenta esempi ❌/✅
- Prova ad aumentare `temperature` da 0.2 a 0.3
- Verifica che il programma contenga informazioni sufficienti

---

## 🚀 COMMIT E DEPLOY

### **Dopo testing OK**

```bash
# Commit modifiche
git add index.html
git commit -m "feat: Phase A quality improvements (pitch, specificità, executive summary)

- Doppia variante pitch (primo contatto + docente conosciuto)
- Regole di specificità per insights profilo e adozione
- Executive summary in cima al report per lettura rapida
- Catalogo Zanichelli integrato in insights adozione"

# Push su branch
git push origin feature/quality-improvements-phase-a
```

### **Deploy su Netlify**

Netlify deploy automatico da branch main.
**Non fare merge su main finché utente non approva!**

---

**Fine Piano Implementazione FASE A**
