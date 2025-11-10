# 📋 Fase C Step 2 - Argomenti Rilevanti per Classe di Laurea

## 🎯 Panoramica

**Fase C Step 2** aggiunge la generazione automatica di **argomenti rilevanti** specifici per la classe di laurea del corso analizzato. Questi argomenti vengono presentati in un post-it distintivo (verde) che fornisce al rappresentante commerciale spunti di conversazione mirati per il colloquio con il docente.

---

## ✨ Nuove Funzionalità

### **1. Post-it Argomenti Rilevanti**

- **Generazione automatica**: GPT-4 analizza programma + matrice di valutazione + classe di laurea
- **3-5 argomenti specifici**: Temi rilevanti per la classe di laurea (es. Biotecnologie, Farmacia, CTF)
- **Grafica distintiva**: 
  - 🟢 Colore verde (vs giallo/arancione/blu dei gap)
  - 🎯 Icona target
  - Layout a 2 colonne (più visibile)
  - Lista con checkmark ✓

### **2. Identificazione Classe di Laurea**

L'applicazione estrae automaticamente la classe di laurea da:
- Campo `corso_di_laurea` nell'analisi
- Campo `corso` come fallback
- Esempio: "SCIENZE BIOLOGICHE (L-13)"

### **3. Esportazione PDF Migliorata**

- Post-it argomenti posizionato **all'inizio** del PDF
- Sfondo verde chiaro con bordo verde scuro
- Altezza dinamica in base al numero di argomenti
- Distinguibile visivamente dai post-it gap

---

## 🎨 Esempio Visivo

### **Post-it Argomenti (Verde)**

```
┌─────────────────────────────────────────────────────────┐
│ 🎯 Argomenti rilevanti per SCIENZE BIOLOGICHE (L-13)   │
│                                                         │
│ ✓ Applicazioni della chimica organica in biochimica    │
│ ✓ Stereochimica applicata ai sistemi biologici         │
│ ✓ Tecniche spettroscopiche per biomolecole             │
│ ✓ Reazioni organiche nei processi metabolici           │
│ ✓ Sintesi di composti bioattivi e farmaci naturali     │
└─────────────────────────────────────────────────────────┘
```

### **Post-it Gap (Giallo/Arancione/Blu)**

```
┌──────────────────────────────┐
│ #1            Hart           │
│                              │
│ Gap: Spettroscopia NMR       │
│ 📖 Capitolo: 9               │
│ 📌 Pagine: 320-355           │
│ 💬 Include esercizi graduali │
└──────────────────────────────┘
```

---

## 🔧 Implementazione Tecnica

### **Nuova Funzione: `generaPostItArgomentiRilevanti()`**

```javascript
async function generaPostItArgomentiRilevanti() {
    // 1. Estrae classe di laurea dall'analisi
    const classeLaurea = ultimaAnalisi.corso_di_laurea || ultimaAnalisi.corso;
    
    // 2. Estrae programma e matrice di valutazione
    const programma = ultimaAnalisi.programma_corso;
    const matrice = ultimaAnalisi.matrice_valutazione;
    
    // 3. Chiama GPT-4 con prompt specifico
    const prompt = `Identifica 3-5 argomenti rilevanti per ${classeLaurea}...`;
    
    // 4. Restituisce oggetto con tipo speciale
    return {
        tipo: 'argomenti_rilevanti',
        classe_laurea: classeLaurea,
        argomenti: [...] // Array di 3-5 stringhe
    };
}
```

### **Integrazione in `generaPostIt()`**

```javascript
// Dopo aver generato i post-it gap...
postItGenerati = rimuoviDuplicatiPostIt(postItGenerati);

// Genera post-it argomenti rilevanti
const postItArgomenti = await generaPostItArgomentiRilevanti();
if (postItArgomenti) {
    postItGenerati.unshift(postItArgomenti); // All'inizio
}

mostraPostIt();
```

### **Visualizzazione in `mostraPostIt()`**

```javascript
if (postIt.tipo === 'argomenti_rilevanti') {
    return `
        <div class="bg-green-100 border-2 border-green-500 col-span-2">
            <h4>🎯 Argomenti rilevanti per ${postIt.classe_laurea}</h4>
            <ul>
                ${postIt.argomenti.map(arg => `<li>✓ ${arg}</li>`).join('')}
            </ul>
        </div>
    `;
}
```

---

## 📊 Prompt GPT-4

Il prompt chiede a GPT-4 di:

1. **Analizzare il contesto**:
   - Classe di laurea
   - Programma del corso
   - Matrice di valutazione

2. **Identificare argomenti rilevanti**:
   - Specifici per la classe (es. Biotecnologie → biochimica applicata)
   - Collegati al programma o alla matrice
   - Utili come spunti commerciali
   - Max 1 riga per argomento

3. **Esempi forniti**:
   - "Applicazioni industriali della chimica organica nel settore farmaceutico"
   - "Tecniche spettroscopiche moderne per l'analisi strutturale"
   - "Stereochimica applicata alla progettazione di farmaci chirali"

4. **Formato output**: JSON con array `argomenti`

---

## 🎯 Casi d'Uso

### **Esempio 1: Scienze Biologiche**

**Input**: Corso di "Chimica Organica" per Scienze Biologiche (L-13)

**Output Argomenti**:
- ✓ Applicazioni della chimica organica in biochimica e biologia molecolare
- ✓ Stereochimica applicata ai sistemi biologici e farmaci
- ✓ Tecniche spettroscopiche per l'analisi di biomolecole
- ✓ Reazioni organiche nei processi metabolici

### **Esempio 2: Farmacia**

**Input**: Corso di "Chimica Organica" per Farmacia (LM-13)

**Output Argomenti**:
- ✓ Sintesi di principi attivi farmaceutici
- ✓ Stereochimica e attività biologica dei farmaci
- ✓ Reazioni di funzionalizzazione per drug design
- ✓ Analisi spettroscopica di composti farmaceutici
- ✓ Chimica verde e sintesi sostenibile

### **Esempio 3: CTF (Chimica e Tecnologie Farmaceutiche)**

**Input**: Corso di "Chimica Organica Avanzata" per CTF

**Output Argomenti**:
- ✓ Sintesi multi-step di molecole complesse
- ✓ Strategie di protezione/deprotezione in sintesi
- ✓ Catalisi asimmetrica per sintesi enantioselettiva
- ✓ Scale-up industriale di reazioni organiche
- ✓ Controllo di qualità e analisi strutturale

---

## 🚀 Utilizzo

### **1. Analizza un Programma**

Come in Fase A+B, carica e analizza il programma del corso.

### **2. Prepara Colloquio**

1. Vai alla sezione "📋 Prepara Colloquio"
2. Seleziona i manuali (Hart, McMurry Fond., McMurry Bio., Tutti, o Raccomandato)
3. Clicca "Genera Post-it"

### **3. Visualizza Risultati**

- **Post-it verde** (argomenti rilevanti) appare per primo
- **Post-it colorati** (gap) seguono sotto

### **4. Esporta PDF**

Clicca "Esporta PDF" per scaricare tutti i post-it in formato stampabile.

---

## 📈 Vantaggi per il Rappresentante

### **Prima (Solo Gap)**

Il rappresentante aveva solo:
- Post-it con gap specifici da coprire
- Focus su "cosa manca" nel manuale adottato

### **Dopo (Gap + Argomenti Rilevanti)**

Il rappresentante ha anche:
- **Spunti di conversazione** mirati per la classe di laurea
- **Argomenti di interesse** per il docente
- **Opportunità di approfondimento** oltre i gap
- **Contesto professionale** (es. applicazioni industriali, ricerca)

### **Esempio di Utilizzo nel Colloquio**

**Rappresentante**: "Professor Rossi, ho visto che insegna Chimica Organica per Scienze Biologiche. Oltre ai gap che abbiamo identificato, vorrei evidenziare alcuni temi particolarmente rilevanti per i suoi studenti..."

*[Mostra post-it verde]*

**Rappresentante**: "Il nostro manuale approfondisce le applicazioni della chimica organica in biochimica, con esempi concreti di reazioni nei processi metabolici. Inoltre, la sezione sulla stereochimica è pensata specificamente per sistemi biologici..."

---

## 🔍 Dettagli Tecnici

### **Struttura Dati Post-it Argomenti**

```javascript
{
    tipo: 'argomenti_rilevanti',
    classe_laurea: 'SCIENZE BIOLOGICHE (L-13)',
    argomenti: [
        'Applicazioni della chimica organica in biochimica',
        'Stereochimica applicata ai sistemi biologici',
        'Tecniche spettroscopiche per biomolecole',
        'Reazioni organiche nei processi metabolici',
        'Sintesi di composti bioattivi'
    ]
}
```

### **Struttura Dati Post-it Gap (invariata)**

```javascript
{
    gap: 'Spettroscopia NMR',
    manuale: 'Hart - Chimica Organica',
    capitolo: '9 - Spettroscopia',
    pagine: '320-355',
    argomento_commerciale: 'Include esercizi graduali...'
}
```

### **Colori**

| Tipo | Colore | Tailwind Classes |
|------|--------|------------------|
| Argomenti | 🟢 Verde | `bg-green-100 border-green-500` |
| Hart | 🟡 Giallo | `bg-yellow-100 border-yellow-400` |
| McMurry Fond. | 🟠 Arancione | `bg-orange-100 border-orange-400` |
| McMurry Bio. | 🔵 Azzurro | `bg-blue-100 border-blue-400` |

---

## 📝 Note di Sviluppo

### **Gestione Errori**

- Se la classe di laurea non è disponibile → nessun post-it argomenti generato
- Se GPT-4 fallisce → errore loggato in console, ma gli altri post-it vengono comunque generati
- Fallback: se `corso_di_laurea` non esiste, usa `corso`

### **Performance**

- **1 chiamata GPT-4 aggiuntiva** per il post-it argomenti
- **Tempo stimato**: +2-3 secondi rispetto a Step 1
- **Costo**: ~0.01€ per generazione (gpt-4.1-mini)

### **Limitazioni**

- Richiede che l'analisi contenga il campo `corso_di_laurea` o `corso`
- Se il programma non contiene informazioni sulla classe, gli argomenti potrebbero essere generici
- Numero fisso di argomenti (3-5), non configurabile dall'utente

---

## 🆚 Confronto Step 1 vs Step 2

| Caratteristica | Step 1 | Step 2 |
|----------------|--------|--------|
| Post-it Gap | ✅ | ✅ |
| Post-it Argomenti | ❌ | ✅ |
| Colori | 3 (giallo/arancione/blu) | 4 (+ verde) |
| Chiamate GPT-4 | N gap × M manuali | N gap × M manuali + 1 |
| Tempo generazione | ~10-15s | ~12-18s |
| Utilità commerciale | Alta | Molto Alta |

---

## 🎓 Esempi per Classe di Laurea

### **L-13 Scienze Biologiche**
- Applicazioni in biochimica e biologia molecolare
- Stereochimica dei sistemi biologici
- Reazioni nei processi metabolici

### **LM-13 Farmacia**
- Sintesi di principi attivi
- Drug design e stereochimica
- Analisi spettroscopica farmaceutica

### **L-27 Chimica e Tecnologie Farmaceutiche**
- Sintesi multi-step
- Catalisi asimmetrica
- Scale-up industriale

### **L-2 Biotecnologie**
- Chimica organica applicata alle biotecnologie
- Sintesi di biomolecole
- Tecniche analitiche per bioprocessi

---

## 📦 File Modificati

### **index.html**
- Nuova funzione `generaPostItArgomentiRilevanti()`
- Modifica `generaPostIt()` per integrare argomenti
- Modifica `mostraPostIt()` per visualizzazione verde
- Modifica `esportaPostItPDF()` per export verde

### **indici_manuali.json**
Nessuna modifica (invariato).

### **README_FASE_C_STEP2.md**
Nuova documentazione completa per Step 2.

---

## 🚀 Deployment

1. **Scarica ZIP**: `fase-c-step2-v6.zip`
2. **Estrai i 3 file** nella repository locale
3. **Push su GitHub**:
   ```bash
   git add .
   git commit -m "Fase C Step 2: argomenti rilevanti per classe di laurea"
   git push origin main
   ```
4. **Netlify auto-deploy** (1-2 minuti)
5. **Testa** l'applicazione live

---

## ✅ Checklist Test

- [ ] Post-it argomenti appare per primo (verde)
- [ ] Intestazione mostra classe di laurea corretta
- [ ] 3-5 argomenti generati e visualizzati
- [ ] Post-it gap seguono sotto (giallo/arancione/blu)
- [ ] Export PDF include post-it verde all'inizio
- [ ] PDF mostra argomenti con checkmark
- [ ] Colori distinguibili in stampa

---

## 🎉 Conclusione

**Fase C Step 2** completa la funzionalità "Prepara Colloquio" aggiungendo un layer strategico di **argomenti rilevanti** che aiutano il rappresentante commerciale a:

1. **Contestualizzare** la proposta rispetto alla classe di laurea
2. **Ampliare** la conversazione oltre i gap specifici
3. **Evidenziare** opportunità di miglioramento del corso
4. **Personalizzare** l'approccio commerciale

**Risultato**: Colloqui più efficaci e proposte più mirate! 🎯

---

**Versione**: 6.0 - Fase C Step 2  
**Data**: Novembre 2025  
**Autore**: Zanichelli Editore

