# 📋 TODO DOMANI - Implementazione Multi-Materia

## 🎯 Obiettivo
Completare l'applicazione **Analisi Programmi Multi-Materia** con:
- ✅ Supporto 3+ materie (Chimica Organica, Generale, Fisica, Matematica)
- ✅ Valutazioni Assolute/Dinamiche
- ✅ 200+ manuali caricabili
- ✅ Deploy su nuovo repository Netlify

---

## 📦 File Necessari dall'Utente

### **1. Framework (formato come `chimica_generale.json`)**

Necessari:
- [ ] `chimica_organica.json` - **PRIORITÀ ALTA**
- [ ] `chimica_generale.json` - ✅ GIÀ DISPONIBILE
- [ ] `fisica.json` - PRIORITÀ MEDIA
- [ ] `matematica.json` - PRIORITÀ MEDIA
- [ ] Altri framework disponibili

**Formato richiesto**:
```json
{
  "id": "nome_framework",
  "name": "Nome Completo Materia",
  "subject": "Materia",
  "content": {
    "syllabus_modules": [...],
    "program_profiles": [...],
    "target_degrees": [...]
  },
  "context_strategy": "..."
}
```

---

### **2. Indici Manuali Zanichelli (formato come `Petrucci_Chimica_Piccin.json`)**

**Chimica Organica** (priorità alta):
- [ ] Hart - Fondamenti di chimica organica
- [ ] McMurry - Fondamenti di chimica organica
- [ ] McMurry - Chimica organica: approccio biologico

**Chimica Generale**:
- [ ] Petrucci - Chimica - ✅ GIÀ DISPONIBILE (competitor)
- [ ] Silberberg - Chimica (Zanichelli)
- [ ] Atkins, Jones - Chimica Generale (Zanichelli)

**Fisica** (se disponibile):
- [ ] Halliday - Fondamenti di Fisica
- [ ] Serway - Fisica
- [ ] Altri Zanichelli

**Matematica** (se disponibile):
- [ ] Pagani, Salsa - Analisi Matematica
- [ ] Altri Zanichelli

**Formato richiesto**:
```json
{
  "id": "Autore_Titolo",
  "title": "Titolo",
  "author": "Autore",
  "publisher": "Editore",
  "subject": "materia",
  "type": "zanichelli|competitor",
  "chapters": [
    {
      "number": 1,
      "title": "Titolo Capitolo",
      "page_start": 1,
      "sections": [...]
    }
  ]
}
```

---

### **3. Manuali Competitor (top 10-15)**

Priorità per completezza:
- [ ] Brown - Chimica Organica (Edises)
- [ ] Bruice - Chimica Organica (Edises)
- [ ] Wade - Chimica Organica (Piccin)
- [ ] Botta - Chimica Organica (EdiErmes)
- [ ] Gorzynski Smith - Chimica Organica (McGraw-Hill)
- [ ] Kotz - Chimica Generale (EdiSES)
- [ ] Chang - Chimica Generale (McGraw-Hill)
- [ ] Altri competitor principali

---

## 🛠️ Piano di Lavoro (6-7 ore)

### **Fase 1: Setup Repository (30 min)**

```bash
# 1. Crea directory progetto separato
mkdir -p /home/user/webapp-multi-materia
cd /home/user/webapp-multi-materia

# 2. Copia struttura base
cp -r /home/user/webapp/materie .
cp -r /home/user/webapp/frameworks .
cp -r /home/user/webapp/manuali .
cp -r /home/user/webapp/valutazioni_assolute .
cp /home/user/webapp/netlify.toml .
cp -r /home/user/webapp/netlify .

# 3. Carica JSON utente
# (copia framework e manuali nelle directory appropriate)

# 4. Inizializza Git
git init
git add .
git commit -m "v7.0: Inizializzazione Multi-Materia"

# 5. Crea repository GitHub
# Nome: analisi-programmi-zanichelli-multi-materia

# 6. Push
git remote add origin https://github.com/USERNAME/analisi-programmi-zanichelli-multi-materia.git
git push -u origin main
```

**Checklist**:
- [ ] Directory create
- [ ] JSON utente caricati
- [ ] Git inizializzato
- [ ] Repository GitHub creato
- [ ] Push completato

---

### **Fase 2: Modifica `index.html` (2-3 ore)**

#### **2.1 Aggiungere Dropdown Materia**

Posizione: Dopo header, prima form analisi

```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Materia da Analizzare
  </label>
  <select id="materiaSelect" onchange="caricaMateria(this.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg">
    <option value="">Seleziona materia...</option>
    <!-- Popolato dinamicamente da config -->
  </select>
</div>
```

**Checklist**:
- [ ] Dropdown aggiunto
- [ ] Listener `onchange` collegato
- [ ] Stile Tailwind applicato

---

#### **2.2 Funzioni Caricamento Dinamico**

```javascript
// Variabili globali
let MATERIE_CONFIG = null;
let FRAMEWORK_CORRENTE = null;
let MATERIA_CORRENTE = null;

// Carica config materie all'avvio
async function inizializzaApp() {
  MATERIE_CONFIG = await fetch('/materie/config.json').then(r => r.json());
  popolaDropdownMaterie();
  checkApiKey();
  showView('upload');
}

// Popola dropdown materie
function popolaDropdownMaterie() {
  const select = document.getElementById('materiaSelect');
  Object.entries(MATERIE_CONFIG.materie).forEach(([id, config]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = config.nome;
    select.appendChild(option);
  });
}

// Carica materia selezionata
async function caricaMateria(materiaId) {
  if (!materiaId) return;
  
  const config = MATERIE_CONFIG.materie[materiaId];
  MATERIA_CORRENTE = materiaId;
  
  // Carica framework
  FRAMEWORK_CORRENTE = await fetch(config.framework_file).then(r => r.json());
  
  // Aggiorna dropdown contesti
  aggiornaDropdownContesti(FRAMEWORK_CORRENTE.content.target_degrees);
  
  // Aggiorna dropdown manuali
  aggiornaDropdownManuali(config);
  
  console.log(`✅ Materia caricata: ${config.nome}`);
}

// Aggiorna dropdown contesti
function aggiornaDropdownContesti(classiLaurea) {
  const select = document.getElementById('contestoSelect');
  select.innerHTML = '<option value="">Seleziona contesto...</option>';
  
  classiLaurea.forEach(classe => {
    const option = document.createElement('option');
    option.value = classe;
    
    // Mappa classe → nome leggibile
    const nomiClassi = {
      'L-2': 'L-2: Biotecnologie',
      'L-13': 'L-13: Scienze biologiche',
      'L-27': 'L-27: Scienze chimiche',
      // ... altri mappings
    };
    
    option.textContent = nomiClassi[classe] || classe;
    select.appendChild(option);
  });
}

// Aggiorna dropdown manuali
function aggiornaDropdownManuali(materiaConfig) {
  const select = document.getElementById('manualeSelect');
  select.innerHTML = '<option value="">Seleziona manuale...</option>';
  
  // Gruppo Zanichelli
  const optgroupZ = document.createElement('optgroup');
  optgroupZ.label = 'Manuali Zanichelli';
  materiaConfig.manuali_zanichelli.forEach(man => {
    const option = document.createElement('option');
    option.value = man.id;
    option.textContent = `${man.nome} (€${man.prezzo})`;
    optgroupZ.appendChild(option);
  });
  select.appendChild(optgroupZ);
  
  // Gruppo Competitor
  const optgroupC = document.createElement('optgroup');
  optgroupC.label = 'Altri Editori';
  materiaConfig.manuali_competitor.forEach(man => {
    const option = document.createElement('option');
    option.value = man.id;
    option.textContent = `${man.nome} (${man.editore})`;
    optgroupC.appendChild(option);
  });
  select.appendChild(optgroupC);
}
```

**Checklist**:
- [ ] Funzione `inizializzaApp()` creata
- [ ] Caricamento config materie funzionante
- [ ] Dropdown contesti aggiornato dinamicamente
- [ ] Dropdown manuali aggiornato dinamicamente
- [ ] Console log debug attivi

---

#### **2.3 Modifica Funzione `avviaAnalisi()`**

Sostituire prompt hardcoded con framework dinamico:

```javascript
async function avviaAnalisi() {
  // Verifica che materia sia selezionata
  if (!MATERIA_CORRENTE || !FRAMEWORK_CORRENTE) {
    showError('Seleziona prima una materia');
    return;
  }
  
  // ... codice esistente (estrazione testo, metadata) ...
  
  // Fase 2: Analisi programma con FRAMEWORK DINAMICO
  updateLoadingText('Fase 2/5: Valutazione programma...');
  
  const promptAnalisi = generaPromptAnalisiProgramma(
    FRAMEWORK_CORRENTE,
    testo,
    contesto,
    cfu,
    ore
  );
  
  const valutazione = await callLLM(promptAnalisi, 0.1);
  // ... resto invariato ...
}

// Genera prompt dinamico da framework
function generaPromptAnalisiProgramma(framework, testo, contesto, cfu, ore) {
  // Trova profilo per questo contesto
  const profile = framework.content.program_profiles.find(
    p => p.name === contesto || p.name.includes(contesto)
  );
  
  return `
Analizza questo programma universitario di ${framework.name} secondo il FRAMEWORK DI VALUTAZIONE STRUTTURATO.

CONTESTO:
- Classe di Laurea: ${contesto}
- CFU: ${cfu || 'Non specificato'}
- Ore: ${ore || 'Non specificato'}

TESTO PROGRAMMA:
${testo.substring(0, 3000)}

FRAMEWORK DI VALUTAZIONE (270 punti totali):

${generaFrameworkTestoDaJSON(framework.content.syllabus_modules)}

PRIORITÀ SPECIFICHE per ${contesto}:
${profile ? profile.priority_modules : 'Valutazione equilibrata di tutti i moduli'}

STRATEGIA DI ANALISI:
${framework.context_strategy}

Rispondi SOLO con un JSON valido:
{
  "obiettivi": {...},
  "contenuti": {...},
  "metodologia": {...},
  "allineamento": {...},
  "risultati": {...},
  "sintesi": "..."
}
`;
}

function generaFrameworkTestoDaJSON(modules) {
  return modules.map((mod, idx) => `
${mod.name} (max 13 punti):
${mod.core_contents}
Concetti chiave: ${mod.key_concepts.join(', ')}
`).join('\n');
}
```

**Checklist**:
- [ ] Prompt hardcoded sostituito con dinamico
- [ ] Funzione `generaPromptAnalisiProgramma()` creata
- [ ] Framework JSON usato correttamente
- [ ] Test con Chimica Generale

---

#### **2.4 Implementa Valutazioni Assolute/Dinamiche**

```javascript
// Fase 3: Valutazione manuale adottato
async function analizzaManualeAdottato(manualeId, programma, analisiProgramma) {
  const materiaConfig = MATERIE_CONFIG.materie[MATERIA_CORRENTE];
  
  // 1. Carica configurazione manuale
  const manualeConfig = [
    ...materiaConfig.manuali_zanichelli,
    ...materiaConfig.manuali_competitor
  ].find(m => m.id === manualeId);
  
  // 2. Carica indice completo manuale
  const manualeCompleto = await fetch(manualeConfig.file).then(r => r.json());
  
  // 3. Carica valutazione assoluta (se esiste)
  let valutazioneAssoluta = await caricaValutazioneAssoluta(manualeId);
  
  // 4. Se non esiste, proponi generazione (admin)
  if (!valutazioneAssoluta) {
    if (confirm(`Valutazione assoluta non disponibile per ${manualeConfig.nome}.\n\nGenerarla ora? (richiede 3-5 minuti)`)) {
      updateLoadingText('Generazione valutazione assoluta (3-5 min)...');
      valutazioneAssoluta = await generaValutazioneAssoluta(
        manualeCompleto,
        FRAMEWORK_CORRENTE
      );
      
      // Download JSON per salvare nel repository
      downloadJSON(valutazioneAssoluta, `${manualeId}_valutazione_assoluta.json`);
      alert('Valutazione assoluta generata! Salvala in /valutazioni_assolute/ nel repository.');
    }
  }
  
  // 5. Genera valutazione dinamica (sempre)
  updateLoadingText('Generazione valutazione dinamica...');
  const valutazioneDinamica = await generaValutazioneDinamica(
    manualeCompleto,
    valutazioneAssoluta,
    programma,
    analisiProgramma
  );
  
  return {
    valutazione_assoluta: valutazioneAssoluta,
    valutazione_dinamica: valutazioneDinamica
  };
}

async function caricaValutazioneAssoluta(manualeId) {
  try {
    const val = await fetch(`/valutazioni_assolute/${manualeId}.json`).then(r => r.json());
    console.log(`✅ Valutazione assoluta caricata: ${manualeId}`);
    return val;
  } catch (e) {
    console.log(`⚠️ Valutazione assoluta non disponibile: ${manualeId}`);
    return null;
  }
}

async function generaValutazioneAssoluta(manualeJSON, frameworkJSON) {
  const prompt = `
Valuta il manuale "${manualeJSON.author} - ${manualeJSON.title}" in modo ASSOLUTO rispetto al framework teorico di ${frameworkJSON.name}.

IMPORTANTE: Questa è una valutazione INDIPENDENTE da qualsiasi programma specifico.

MANUALE:
- Autore: ${manualeJSON.author}
- Editore: ${manualeJSON.publisher}
- Capitoli: ${manualeJSON.chapters.length}
- Indice: ${JSON.stringify(manualeJSON.chapters.slice(0, 5))}...

FRAMEWORK TEORICO:
${frameworkJSON.content.syllabus_modules.map(mod => `
${mod.name}:
- Contenuti: ${mod.core_contents}
- Concetti: ${mod.key_concepts.join(', ')}
`).join('\n')}

CRITERI VALUTAZIONE ASSOLUTA (270 punti):
1. Copertura moduli (max 130)
2. Qualità didattica (max 40)
3. Approfondimento (max 40)
4. Materiali supplementari (max 30)
5. Rapporto qualità/prezzo (max 30)

Rispondi SOLO con JSON:
{
  "data_valutazione": "YYYY-MM-DD",
  "punteggio_totale": numero_su_270,
  "livello": "Eccellente|Ottimo|Buono|...",
  "dimensioni": {
    "copertura_moduli": {...},
    "qualita_didattica": {...},
    ...
  },
  "sintesi": "...",
  "quando_raccomandare": [...],
  "quando_sconsigliare": [...]
}
`;
  
  const risposta = await callLLM(prompt, 0.1);
  return JSON.parse(sanitizeJSON(risposta));
}

async function generaValutazioneDinamica(manualeJSON, valutazioneAssoluta, programma, analisiProgramma) {
  const prompt = `
Valuta il manuale "${manualeJSON.author} - ${manualeJSON.title}" rispetto a questo PROGRAMMA SPECIFICO.

PROGRAMMA:
- Università: ${programma.università}
- Corso: ${programma.denominazione_corso}
- Classe: ${programma.contesto}
- CFU: ${programma.cfu}
- Testo: ${programma.testo.substring(0, 2000)}

ANALISI PROGRAMMA:
- Punteggio: ${analisiProgramma.punteggi.totale}/270
- Sintesi: ${analisiProgramma.valutazione.sintesi}

VALUTAZIONE ASSOLUTA MANUALE:
- Punteggio: ${valutazioneAssoluta?.punteggio_totale || 'N/D'}/270
- Livello: ${valutazioneAssoluta?.livello || 'N/D'}

CRITERI VALUTAZIONE DINAMICA:
1. Copertura programma (non framework teorico)
2. Adeguatezza CFU
3. Rapporto Q/P contestuale
4. Allineamento enfasi docente

Rispondi SOLO con JSON:
{
  "copertura_programma": {
    "percentuale": numero,
    "gap": [...],
    "eccedenti": [...]
  },
  "adeguatezza": {
    "livello": "Adeguato|Troppo_Complesso|...",
    "punteggio": numero
  },
  "punteggio_dinamico_totale": numero_su_100,
  "raccomandazione": "FORTEMENTE_RACCOMANDATO|...",
  "argomenti_commerciali": [...]
}
`;
  
  const risposta = await callLLM(prompt, 0.2);
  return JSON.parse(sanitizeJSON(risposta));
}

function downloadJSON(obj, filename) {
  const dataStr = JSON.stringify(obj, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}
```

**Checklist**:
- [ ] Funzione `analizzaManualeAdottato()` creata
- [ ] Caricamento valutazione assoluta implementato
- [ ] Generazione valutazione assoluta implementata
- [ ] Generazione valutazione dinamica implementata
- [ ] Download JSON per admin implementato

---

#### **2.5 Aggiorna UI Risultati**

Modificare `mostraRisultati()` per visualizzare entrambe le valutazioni:

```javascript
function mostraRisultati(prog) {
  // ... codice esistente header/punteggi ...
  
  // Sezione Manuale Adottato (NUOVA)
  const htmlManuale = `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-xl font-bold mb-4">
        Analisi Manuale: ${prog.manuale_adottato}
      </h3>
      
      <!-- Valutazione Assoluta -->
      ${prog.gap_manuale.valutazione_assoluta ? `
        <div class="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mb-4">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-lg font-bold text-blue-900">
              📊 Valutazione Assoluta (Qualità Intrinseca)
            </h4>
            <span class="px-3 py-1 bg-blue-600 text-white rounded-full font-bold">
              ${prog.gap_manuale.valutazione_assoluta.punteggio_totale}/270
            </span>
          </div>
          <p class="text-sm text-blue-800">
            <strong>Livello:</strong> ${prog.gap_manuale.valutazione_assoluta.livello}
          </p>
          <details class="mt-2">
            <summary class="cursor-pointer text-sm text-blue-900">
              📖 Dettagli
            </summary>
            <p class="text-sm mt-2">${prog.gap_manuale.valutazione_assoluta.sintesi}</p>
          </details>
        </div>
      ` : ''}
      
      <!-- Valutazione Dinamica -->
      <div class="bg-green-50 border-2 border-green-500 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-lg font-bold text-green-900">
            🎯 Valutazione Dinamica (Rispetto a Questo Programma)
          </h4>
          <span class="px-3 py-1 bg-green-600 text-white rounded-full font-bold">
            ${prog.gap_manuale.valutazione_dinamica.punteggio_dinamico_totale}/100
          </span>
        </div>
        
        <div class="grid grid-cols-3 gap-2 mb-3">
          <div class="bg-white rounded p-2 text-center">
            <p class="text-xs text-gray-600">Copertura</p>
            <p class="text-lg font-bold">${prog.gap_manuale.valutazione_dinamica.copertura_programma.percentuale}%</p>
          </div>
          <div class="bg-white rounded p-2 text-center">
            <p class="text-xs text-gray-600">Adeguatezza</p>
            <p class="text-sm font-bold">${prog.gap_manuale.valutazione_dinamica.adeguatezza.livello}</p>
          </div>
          <div class="bg-white rounded p-2 text-center">
            <p class="text-xs text-gray-600">Raccomandazione</p>
            <p class="text-xs font-bold">${prog.gap_manuale.valutazione_dinamica.raccomandazione}</p>
          </div>
        </div>
        
        <!-- Gap per questo programma -->
        ${prog.gap_manuale.valutazione_dinamica.copertura_programma.gap.length > 0 ? `
          <div class="bg-red-100 rounded p-2 mb-2">
            <p class="text-xs font-bold text-red-900 mb-1">⚠️ Gap</p>
            <div class="flex flex-wrap gap-1">
              ${prog.gap_manuale.valutazione_dinamica.copertura_programma.gap.map(g =>
                `<span class="px-2 py-0.5 bg-red-200 text-red-900 text-xs rounded">${g}</span>`
              ).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Argomenti commerciali -->
        <div class="bg-white rounded p-2">
          <p class="text-xs font-bold text-green-900 mb-1">💬 Argomenti Commerciali</p>
          <ul class="text-xs space-y-1">
            ${prog.gap_manuale.valutazione_dinamica.argomenti_commerciali.map(arg =>
              `<li>• ${arg}</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  // Inserisci nel DOM
  document.getElementById('viewRisultati').innerHTML = htmlManuale + htmlRestante;
}
```

**Checklist**:
- [ ] UI valutazione assoluta aggiunta
- [ ] UI valutazione dinamica aggiunta
- [ ] Gap visualizzati correttamente
- [ ] Argomenti commerciali visualizzati
- [ ] Responsive (mobile-friendly)

---

### **Fase 3: Test & Debug (1-2 ore)**

#### **3.1 Test Chimica Generale**

```
Test Case 1: Petrucci - Programma L-13 (6 CFU)

Input:
- Materia: Chimica Generale
- Contesto: L-13 Scienze Biologiche
- Manuale: Petrucci - Chimica
- CFU: 6
- Programma: [testo programma reale]

Output Atteso:
- ✅ Framework Chimica Generale caricato
- ✅ Analisi programma con moduli framework
- ✅ Valutazione assoluta Petrucci (se disponibile)
- ✅ Valutazione dinamica generata
- ✅ Raccomandazione: SCONSIGLIATO (troppo esteso per 6 CFU)
- ✅ Gap identificati
- ✅ Argomenti commerciali presenti
```

**Checklist**:
- [ ] Test case 1 completato
- [ ] Screenshot risultati salvato
- [ ] Valutazione assoluta generata e salvata

---

#### **3.2 Test Chimica Organica** (con dati attuali)

```
Test Case 2: Hart - Programma L-13 (9 CFU)

Input:
- Materia: Chimica Organica
- Contesto: L-13 Scienze Biologiche
- Manuale: Hart - Chimica Organica
- CFU: 9
- Programma: [testo programma reale]

Output Atteso:
- ✅ Framework Chimica Organica caricato
- ✅ Analisi programma funzionante
- ✅ Valutazioni A/B generate
- ✅ Raccomandazioni Zanichelli presenti
```

**Checklist**:
- [ ] Test case 2 completato
- [ ] Confronto con app v6.0 (risultati coerenti?)

---

### **Fase 4: Deploy (30 min)**

#### **4.1 Commit Finale**

```bash
cd /home/user/webapp-multi-materia

git add -A
git commit -m "v7.0: Implementazione completa Multi-Materia con Valutazioni A/B"

git push origin main
```

**Checklist**:
- [ ] Commit completato
- [ ] Push su GitHub effettuato

---

#### **4.2 Deploy Netlify**

```bash
# Opzione 1: Netlify CLI
netlify deploy --prod

# Opzione 2: Netlify Web UI
# 1. Vai su https://app.netlify.com
# 2. New site from Git
# 3. Seleziona repository analisi-programmi-zanichelli-multi-materia
# 4. Deploy settings:
#    - Build command: (vuoto)
#    - Publish directory: .
#    - Functions directory: netlify/functions
# 5. Deploy site
```

**URL Atteso**: `https://analisi-programmi-multi-materia.netlify.app`

**Checklist**:
- [ ] Sito Netlify creato
- [ ] Deploy completato
- [ ] URL funzionante
- [ ] Test live app

---

### **Fase 5: Documentazione (30 min)**

#### **5.1 README Principale**

Creare `README.md` con:
- [ ] Descrizione applicazione
- [ ] Novità v7.0
- [ ] Come usare l'app
- [ ] Come aggiungere nuove materie
- [ ] Come aggiungere nuovi manuali
- [ ] Come generare valutazioni assolute

---

#### **5.2 Guida Utente**

Creare `GUIDA_UTENTE.md` con:
- [ ] Screenshot interfaccia
- [ ] Workflow analisi step-by-step
- [ ] Interpretazione valutazioni A/B
- [ ] FAQ

---

#### **5.3 Guida Developer**

Creare `DEVELOPER.md` con:
- [ ] Architettura sistema
- [ ] Formato JSON framework
- [ ] Formato JSON manuali
- [ ] API Netlify Functions
- [ ] Come estendere l'app

---

## 📊 Checklist Finale

### **Funzionalità Core**
- [ ] Selezione materia funzionante
- [ ] Caricamento framework dinamico
- [ ] Caricamento manuali lazy loading
- [ ] Analisi programma con framework JSON
- [ ] Valutazione assoluta (caricamento + generazione)
- [ ] Valutazione dinamica (generazione)
- [ ] UI risultati con entrambe valutazioni
- [ ] Post-it Fase C funzionante
- [ ] Export PDF

### **Test**
- [ ] Test Chimica Generale (Petrucci)
- [ ] Test Chimica Organica (Hart)
- [ ] Test generazione valutazione assoluta
- [ ] Test con programma reale
- [ ] Test responsive (mobile)

### **Deploy**
- [ ] Repository GitHub creato
- [ ] Sito Netlify deployato
- [ ] URL funzionante
- [ ] Functions Netlify operative

### **Documentazione**
- [ ] README principale
- [ ] Guida utente
- [ ] Guida developer
- [ ] Changelog v7.0

---

## 🎯 Deliverable Finale

Al termine del lavoro domani, avrai:

1. ✅ **Nuovo repository GitHub**: `analisi-programmi-zanichelli-multi-materia`
2. ✅ **App funzionante**: URL Netlify live
3. ✅ **3+ materie supportate**: Chimica Organica, Generale, Fisica/Matematica
4. ✅ **Sistema valutazioni A/B**: Funzionante e testato
5. ✅ **10-15 manuali integrati**: Pronti per l'uso
6. ✅ **Documentazione completa**: README, guide, changelog

---

## 📞 Note Finali

**Tempo stimato**: 6-7 ore
**Complessità**: Media-Alta
**Criticità**: Bassa (app vecchia resta intatta)

**Rischi**:
- ⚠️ Framework JSON incompleti → Validator per verificare
- ⚠️ Indici manuali mancanti → Lazy loading gestisce mancanze
- ⚠️ Prompt GPT-4 da calibrare → Test iterativi

**Mitigazioni**:
- ✅ Validator JSON automatico
- ✅ Fallback per manuali senza indice
- ✅ Template prompt riutilizzabili

---

**A DOMANI! 🚀**
