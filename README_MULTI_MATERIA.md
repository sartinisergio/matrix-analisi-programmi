# 🚀 Applicazione Multi-Materia con Valutazioni Assolute/Dinamiche

## Versione 7.0 - Multi-Subject Architecture

### 🎯 Novità Principali

Questa versione introduce:

1. ✅ **Architettura Multi-Materia**
   - Supporto per più discipline (Chimica Organica, Chimica Generale, Fisica, ecc.)
   - Configurazione modulare per aggiungere nuove materie
   - Framework di valutazione specifici per materia

2. ✅ **Doppia Valutazione Manuali**
   - **Valutazione ASSOLUTA**: Qualità intrinseca del manuale (statica, memorizzata)
   - **Valutazione DINAMICA**: Adeguatezza al programma specifico (calcolata al volo)

3. ✅ **Integrazione JSON Esterni**
   - 200+ indici manuali caricabili da file JSON
   - 20+ framework di valutazione configurabili
   - Sistema di caching per performance

---

## 📁 Struttura Directory

```
webapp/
├── index.html                      # Applicazione principale (MODIFICATA)
├── materie/
│   └── config.json                # Configurazione materie disponibili
├── frameworks/
│   ├── chimica_generale.json      # Framework Chimica Generale (TUO)
│   └── fisica.json                # Framework Fisica (da aggiungere)
├── manuali/
│   ├── Petrucci_Chimica_Piccin.json    # Indice Petrucci (TUO)
│   ├── Silberberg_Chimica.json         # Indice Silberberg (da aggiungere)
│   └── ...                             # Altri 200+ indici
├── valutazioni_assolute/
│   ├── Petrucci_Chimica.json      # Valutazione assoluta Petrucci
│   └── ...                        # Altre valutazioni pre-calcolate
└── netlify/functions/             # Backend proxy (invariato)
```

---

## 🔄 Come Funziona

### **Fase 1: Selezione Materia**

L'utente seleziona la materia dal dropdown:

```
┌─────────────────────────────┐
│ Materia: [v Chimica Generale] │
│          [ Chimica Organica ] │
│          [ Fisica           ] │
└─────────────────────────────┘
```

L'app carica:
- Framework di valutazione (15 moduli CORE)
- Manuali Zanichelli disponibili
- Manuali competitor
- Classi di laurea compatibili

---

### **Fase 2: Analisi Programma**

**Invariato rispetto alla versione precedente**, ma ora usa framework dinamico:

```javascript
// Prima (hardcoded)
const moduli = ['MOD-01', 'MOD-02', ...]; // Fissi per Chimica Organica

// Ora (dinamico)
const framework = await fetch('/frameworks/chimica_generale.json');
const moduli = framework.content.syllabus_modules; // Caricati da JSON
```

---

### **Fase 3: Valutazione Manuale Adottato**

#### **A) Valutazione ASSOLUTA (Statica)**

**Quando**: Una sola volta per manuale (o per nuova edizione)

**Cosa valuta**:
- Copertura 15 moduli CORE del framework
- Qualità didattica (chiarezza, figure, esercizi)
- Approfondimento (livello trattazione)
- Materiali supplementari
- Rapporto qualità/prezzo

**Output Esempio** (Petrucci):
```json
{
  "punteggio_totale": 245,
  "max": 270,
  "livello": "Eccellente",
  "dimensioni": {
    "copertura_moduli": {
      "punteggio": 125,
      "moduli_coperti": [
        {"modulo": "1. Struttura atomo", "copertura": 100},
        {"modulo": "2. Tavola periodica", "copertura": 100},
        ...
      ]
    },
    "qualita_didattica": {
      "punteggio": 38,
      "punti_forza": [
        "1200+ esercizi graduati",
        "450+ figure a colori",
        ...
      ]
    }
  },
  "quando_raccomandare": [
    "Corsi di Chimica Generale ≥ 9 CFU",
    "Classi L-27 (Chimica pura)",
    ...
  ]
}
```

**Memorizzazione**: File JSON in `/valutazioni_assolute/Petrucci_Chimica.json`

---

#### **B) Valutazione DINAMICA (Contestuale)**

**Quando**: Ad ogni analisi di programma

**Cosa valuta**:
- Copertura argomenti SPECIFICI del programma analizzato
- Adeguatezza CFU (6 CFU → livello base, 12 CFU → avanzato)
- Rapporto Q/P contestuale (€89 giustificato per 12 CFU, eccessivo per 6 CFU)
- Allineamento enfasi docente

**Output Esempio** (Petrucci per L-13, 6 CFU):
```json
{
  "copertura_programma": {
    "percentuale": 85,
    "gap": [
      "Applicazioni biotecnologiche specifiche",
      "Esempi biologici mirati"
    ]
  },
  "adeguatezza": {
    "livello": "Troppo_Complesso",
    "note": "Manuale dimensionato per 12 CFU, eccessivo per 6 CFU"
  },
  "rapporto_qp_contestuale": {
    "giudizio": "Scarso",
    "note": "€89 per usare solo 60% del manuale (800/1400 pag)",
    "alternative_economiche": ["Hart", "Silberberg"]
  },
  "raccomandazione": "SCONSIGLIATO",
  "argomenti_commerciali": [
    "Il Petrucci è eccellente ma sovradimensionato per i vostri 6 CFU",
    "Gli studenti pagano €89 utilizzando solo 800 pagine su 1400",
    "Il nostro Silberberg copre il 98% del vostro programma a €68"
  ]
}
```

**Memorizzazione**: Solo nell'analisi corrente (non persistente)

---

## 🎨 Visualizzazione Risultati

### **Sezione Manuale Adottato** (NUOVA)

```
┌─────────────────────────────────────────────────────────────┐
│ 📊 VALUTAZIONE ASSOLUTA (Qualità Intrinseca)               │
│                                                             │
│ Punteggio: 245/270 (90.7%) - Livello: Eccellente          │
│                                                             │
│ Copertura Moduli: 125/130  |  Qualità Didattica: 38/40    │
│                                                             │
│ ✅ Quando raccomandare:                                    │
│ • Corsi ≥ 9 CFU                                            │
│ • Classi L-27 (Chimica pura)                               │
│ • Programmi con enfasi termodinamica                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🎯 VALUTAZIONE DINAMICA (Rispetto a Questo Programma)      │
│                                                             │
│ Copertura: 85%  |  Adeguatezza: Troppo Complesso          │
│ Raccomandazione: SCONSIGLIATO                              │
│                                                             │
│ ⚠️ Gap per questo programma:                               │
│ • Applicazioni biotecnologiche specifiche                   │
│ • Esempi biologici mirati                                   │
│                                                             │
│ 💬 Argomenti Commerciali:                                  │
│ • Il Petrucci è eccellente ma sovradimensionato per 6 CFU  │
│ • €89 per usare solo 60% del manuale                       │
│ • Silberberg copre 98% del programma a €68 (-€21)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Come Usare la Nuova Versione

### **1. Deploy su Netlify**

```bash
# 1. Commit modifiche
git add .
git commit -m "v7.0: Multi-materia + Valutazioni Assolute/Dinamiche"

# 2. Push su GitHub
git push origin multi-materia-valutazioni

# 3. Crea Pull Request
# Vai su GitHub → Compare & pull request

# 4. Merge su main
# Dopo review, merge su main

# 5. Netlify auto-deploy
# L'app viene deployata automaticamente
```

---

### **2. Utilizzo Applicazione**

#### **Nuova Analisi**

1. **Seleziona Materia**: Chimica Generale
2. **Seleziona Contesto**: L-13 Scienze Biologiche
3. **Seleziona Manuale Adottato**: Petrucci - Chimica
4. **Carica Programma**: PDF o testo
5. **Tipo Analisi**: Base o Avanzata
6. **Avvia Analisi**

L'app:
- ✅ Carica framework Chimica Generale
- ✅ Carica valutazione assoluta Petrucci (se disponibile)
- ✅ Analizza programma con framework dinamico
- ✅ Genera valutazione dinamica per questo programma
- ✅ Raccomanda manuale Zanichelli più adatto

---

#### **Generazione Valutazione Assoluta** (Admin Mode)

Se la valutazione assoluta NON esiste:

1. Durante l'analisi, l'app chiede: "Valutazione assoluta non disponibile. Generarla ora?"
2. Clicca **Sì** (richiede 3-5 minuti)
3. GPT-4 analizza il manuale vs framework teorico
4. L'app scarica il JSON con valutazione assoluta
5. Salva il file in `/valutazioni_assolute/` nel repository

---

### **3. Aggiungere Nuove Materie**

#### **Step 1: Crea Framework**

```json
// frameworks/fisica.json
{
  "id": "fisica_generale_framework",
  "name": "Fisica Generale",
  "subject": "Fisica",
  "content": {
    "syllabus_modules": [
      {
        "name": "1. Meccanica",
        "core_contents": "...",
        "key_concepts": ["..."]
      },
      ...
    ],
    "program_profiles": [
      {
        "name": "L-8 Ingegneria",
        "priority_modules": "..."
      },
      ...
    ],
    "target_degrees": ["L-8", "L-9", "L-27", ...]
  }
}
```

#### **Step 2: Aggiungi in Config**

```json
// materie/config.json
{
  "materie": {
    "fisica": {
      "id": "fisica",
      "nome": "Fisica Generale",
      "framework_file": "/frameworks/fisica.json",
      "manuali_zanichelli": [...],
      "manuali_competitor": [...],
      "classi_laurea": ["L-8", "L-9", ...]
    }
  }
}
```

#### **Step 3: Deploy**

```bash
git add frameworks/fisica.json materie/config.json
git commit -m "Aggiunta materia: Fisica Generale"
git push origin multi-materia-valutazioni
```

L'app carica automaticamente la nuova materia nel dropdown!

---

## 🔧 Modifiche Tecniche Principali

### **File Modificati**

1. **index.html** (modifiche sostanziali):
   - Aggiunto dropdown selezione materia
   - Funzioni caricamento framework dinamico
   - Funzioni valutazione assoluta/dinamica
   - UI risultati con doppia valutazione

2. **materie/config.json** (NUOVO):
   - Configurazione centralizzata materie
   - Mappatura manuali/framework

3. **frameworks/** (NUOVO):
   - Framework di valutazione per materia

4. **manuali/** (NUOVO):
   - Indici manuali JSON

5. **valutazioni_assolute/** (NUOVO):
   - Valutazioni assolute pre-calcolate

---

### **Funzioni JavaScript Principali**

```javascript
// Carica materia selezionata
async function caricaMateria(materiaId) {
  const config = await fetch('/materie/config.json');
  const materiaConfig = config.materie[materiaId];
  
  // Carica framework
  const framework = await fetch(materiaConfig.framework_file);
  
  // Aggiorna UI
  aggiornaDropdownContesti(materiaConfig.classi_laurea);
  aggiornaDropdownManuali(materiaConfig.manuali_zanichelli, materiaConfig.manuali_competitor);
}

// Genera valutazione assoluta (admin)
async function generaValutazioneAssoluta(manualeJSON, frameworkJSON) {
  const prompt = `Valuta manuale ${manualeJSON.title} vs framework ${frameworkJSON.name}...`;
  const valutazione = await callLLM(prompt, 0.1);
  return JSON.parse(valutazione);
}

// Genera valutazione dinamica (sempre)
async function generaValutazioneDinamica(manualeJSON, valutazioneAssoluta, programma, analisiProgramma) {
  const prompt = `Valuta manuale ${manualeJSON.title} per programma ${programma.corso}...`;
  const valutazione = await callLLM(prompt, 0.2);
  return JSON.parse(valutazione);
}
```

---

## 📊 Performance e Costi

### **Tempi di Analisi**

| Fase | Tempo | Note |
|------|-------|------|
| Caricamento materia | 0.5s | Fetch JSON |
| Analisi programma | 20-30s | Invariato |
| Valutazione dinamica | 10-15s | Nuova |
| **Totale** | **30-45s** | +10-15s rispetto a v6.0 |

### **Costi API OpenAI**

| Operazione | Frequenza | Costo Unitario |
|------------|-----------|----------------|
| Analisi programma | Ogni analisi | ~€0.05 |
| Valutazione dinamica | Ogni analisi | ~€0.03 |
| **Valutazione assoluta** | **Una volta per manuale** | **~€0.10** |
| **Totale per analisi** | - | **~€0.08** |

**Nota**: La valutazione assoluta si paga UNA SOLA VOLTA per manuale, poi viene riutilizzata!

---

## ✅ Checklist Test

- [ ] Dropdown materia funziona e carica framework
- [ ] Dropdown contesti aggiornato per materia selezionata
- [ ] Dropdown manuali aggiornato per materia selezionata
- [ ] Analisi programma usa framework dinamico
- [ ] Valutazione assoluta caricata (se disponibile)
- [ ] Valutazione dinamica generata
- [ ] UI mostra entrambe le valutazioni
- [ ] Post-it Fase C funziona con indici JSON
- [ ] Export PDF include valutazioni

---

## 🚀 Prossimi Step

1. **Test Chimica Generale**:
   - Generare valutazione assoluta Petrucci
   - Testare analisi programma L-13
   - Verificare raccomandazioni Zanichelli

2. **Aggiungere Manuali Zanichelli**:
   - Silberberg (indice JSON)
   - Atkins-Jones (indice JSON)
   - Valutazioni assolute

3. **Espandere a Fisica**:
   - Framework 12 moduli
   - Manuali Halliday, Serway, Mazzoldi
   - Classi L-8, L-9, L-27

4. **Espandere a Matematica**:
   - Framework Analisi I, Algebra Lineare
   - Manuali Pagani-Salsa, Giusti
   - Classi L-8, L-9, L-27, L-31

---

## 📞 Supporto

Per problemi o domande:
- Controlla console browser (F12) per errori
- Verifica che framework/manuali JSON siano validi
- Controlla che valutazioni assolute siano disponibili

---

**Versione**: 7.0 - Multi-Materia  
**Data**: Gennaio 2025  
**Branch**: `multi-materia-valutazioni`
