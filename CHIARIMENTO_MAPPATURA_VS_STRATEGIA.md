# Chiarimento: Mappatura Preventiva vs Strategia Promozionale

## ⚠️ Distinzione Fondamentale

La **mappatura preventiva** e la **strategia promozionale** sono **DUE FASI SEPARATE E SEQUENZIALI**.

### **Confusione da Evitare**

❌ **SBAGLIATO**: "Mappo i programmi e ho già la strategia promozionale"  
✅ **CORRETTO**: "Mappo i programmi per ACCELERARE la strategia promozionale quando esce il libro"

---

## 📊 Le Due Fasi Distinte

### **FASE 0: Mappatura Preventiva (SENZA libro da promuovere)**

#### **Quando**
- PRIMA che esca qualsiasi nuovo libro
- Quando hai tempo libero
- Investimento una tantum

#### **Cosa Fai**
1. Raccogli programmi didattici territorio
2. Analisi MATRIX **SENZA FASE 0.5** (perché non hai libro da confrontare)
   - Fase 0: Estrazione informazioni programma
   - Fase 1: Framework valutazione
   - Fase 2: Tematiche prioritarie
   - Fase 3: Struttura programma
   - Fase 4: Lacune editoriali
3. Crei database con "carta d'identità" docenti

#### **Output: Database Intelligence**

```
Esempio record:

Docente: Prof. Rossi
Ateneo: Milano
Materia: Economia Politica
SSD: SECS-P/01
Email: rossi@unimi.it

MANUALE ATTUALE:
- Titolo: Economia (20ª ed)
- Autore: Samuelson
- Editore: McGraw-Hill

PROGRAMMA:
- Microeconomia (40%)
- Macroeconomia (40%)
- Sostenibilità ambientale (20%)

LACUNE IDENTIFICATE:
- Economia circolare assente
- Casi studio sostenibilità datati
- Green economy non trattata

MANUALI ALTERNATIVI:
- Dispense personali sostenibilità

PROFILO DECISIONALE:
- Tipo: Conservatore pragmatico
- Caratteristica: Usa Samuelson da 15 anni ma integra con materiale proprio

TAG:
#sostenibilità #economia_verde #casi_studio #integra_materiale

OPPORTUNITÀ:
Media (docente attento a lacune, ma legato a manuale storico)
```

#### **Cosa MANCA a Questo Punto**

❌ Quale libro promuovergli  
❌ Perché quel libro è rilevante per lui  
❌ Quali capitoli del libro gli servono  
❌ Come presentargli il libro  
❌ Strategia promozionale specifica  

**Motivo**: Non c'è ancora un libro nuovo da analizzare!

---

### **FASE 1: Strategia Promozionale (QUANDO esce nuovo libro)**

#### **Quando**
- Quando esce fisicamente un nuovo libro
- Hai già il libro in mano (indice, contenuti, autore)

#### **Cosa Fai**

**Step 1: Preparazione Nuovo Libro** (30 min)
1. Inserisci indice nuovo libro in MATRIX
2. Framework indice manuale nuovo
3. Identifichi contenuti chiave

**Step 2: Query Database** (5 min)
Cerchi docenti con caratteristiche rilevanti per QUEL libro specifico

Esempio: Nuovo libro "Economia Circolare e Sostenibilità"
```sql
SELECT * FROM database
WHERE (lacune LIKE '%sostenibilità%' OR tag LIKE '%#sostenibilità%')
AND profilo IN ('Innovatore', 'Pragmatico contenutistico')
AND opportunità IN ('Alta', 'Media')
```

Risultato: 15 docenti potenzialmente interessati

**Step 3: Analisi MATRIX FASE 0.5 Personalizzata** (15-20 min per docente)

**ADESSO sì che usi FASE 0.5!**

Per ogni docente dei 15:

Input MATRIX:
1. ✅ Programma didattico (dal database)
2. ✅ Manuale principale attuale (dal database)
3. ✅ **NUOVO: Indice del nuovo libro da promuovere**

Output MATRIX FASE 0.5:
```json
{
  "motivazioni_scelta_principale": {
    "perche_samuelson": "...",
    "cosa_manca": "Sostenibilità e economia circolare"
  },
  "relazione_nuovo_libro_proposto": {
    "capitoli_rilevanti": [
      "Cap 1: Principi economia circolare",
      "Cap 2: Sostenibilità ambientale",  
      "Cap 4: Casi studio aziende sostenibili"
    ],
    "come_colma_lacune": "Cap 1-2 coprono esattamente modulo sostenibilità del programma",
    "integrazione_con_attuale": "Può essere adottato come alternativo per modulo sostenibilità, mantenendo Samuelson per micro/macro"
  },
  "profilo_decisionale": {
    "tipo": "Conservatore pragmatico",
    "cosa_apprezza": "Manuale storico + integrazioni tematiche",
    "strategia_proposta": "Non proporre sostituzione Samuelson, ma integrazione modulare per sostenibilità"
  },
  "cosa_verificare_docente": [
    "Interesse ad adottare libro alternativo per modulo",
    "Disponibilità a valutare casi studio Cap 4",
    "Possibilità incontro per presentazione volume"
  ]
}
```

**QUESTO è strategia promozionale personalizzata per Prof. Rossi per QUEL libro specifico**

**Step 4: Preparazione Mail** (10-15 min per docente)

Ora hai TUTTO:
- ✅ Profilo docente (da database)
- ✅ Lacune programma (da database)
- ✅ Manuale attuale (da database)
- ✅ **Capitoli nuovo libro rilevanti** (da FASE 0.5)
- ✅ **Come nuovo libro risolve lacune** (da FASE 0.5)
- ✅ **Strategia promozionale** (da FASE 0.5)

Mail personalizzata Prof. Rossi:
```
Oggetto: Integrazione per modulo Sostenibilità - Economia Politica Milano

Gentile Prof. Rossi,

[Menziona Samuelson che usa]
[Menziona lacuna sostenibilità che ha identificato]
[Menziona sue dispense integrative]

Nuovo libro "Economia Circolare..." può essere soluzione:
- Cap 1-2 coprono esattamente suo modulo sostenibilità
- Cap 4 offre casi studio italiani per esercitazioni
- Struttura modulare: adottabile come alternativo (non sostitutivo Samuelson)

[Strategia: non chiedere sostituzione, ma integrazione]

Invio copia saggio?

Cordiali saluti,
[Promotore]
```

**Step 5: Invio e Follow-up** (2 settimane)

---

## 🔄 Timeline Completa Esempio

### **Gennaio 2026: FASE 0 (Mappatura Preventiva)**

**Situazione**: Nessun libro nuovo in arrivo, tempo libero

**Attività** (3 settimane):
- Settimana 1: Raccolta 300 programmi didattici
- Settimana 2-3: Analisi MATRIX (Fasi 0,1,2,3,4 - NO Fase 0.5)
- Fine: Database intelligence pronto

**Output**: 
- 300 docenti mappati
- Profili decisionali identificati
- Lacune catalogate
- **Strategia promozionale: ZERO** (non c'è libro da promuovere)

---

### **15 Marzo 2026: EVENTO**

**Esce nuovo libro**: "Economia Circolare e Sostenibilità Ambientale"

---

### **16-30 Marzo 2026: FASE 1 (Strategia Promozionale)**

**Attività** (2 settimane):

**Giorno 1** (16 marzo):
- Query database: docenti con lacune "sostenibilità"
- Risultato: 15 target identificati (5 minuti)

**Giorno 2-3** (17-18 marzo):
- Analisi MATRIX FASE 0.5 per 15 docenti
- Input: programma + manuale attuale + NUOVO LIBRO
- Output: Strategia promozionale per ognuno
- Tempo: 3-4 ore totali

**Giorno 4-5** (19-20 marzo):
- Preparazione 15 mail personalizzate
- Tempo: 2-3 ore

**Giorno 6-10** (21-25 marzo):
- Invio mail
- Follow-up email

**Giorno 11-14** (26-30 marzo):
- Follow-up telefonico
- Invio copie saggio
- Prime adozioni

**TOTALE FASE 1**: 2 settimane (dalla pubblicazione libro a prime adozioni)

---

## 📊 Confronto Con/Senza Mappatura

### **SENZA Mappatura Preventiva**

Esce libro 15 marzo:

```
15-22 marzo: Ricerca docenti che insegnano materia (1 settimana)
23-29 marzo: Download programmi didattici (1 settimana)
30 marzo-12 aprile: Analisi programmi MATRIX (2 settimane)
13-19 aprile: Identificazione target (1 settimana)
20-26 aprile: Preparazione mail (1 settimana)
27 aprile-10 maggio: Invio e follow-up (2 settimane)
```

**TOTALE: 8 settimane**  
**Prime adozioni**: Fine aprile / Inizio maggio

---

### **CON Mappatura Preventiva**

Database già pronto (fatto a gennaio)

Esce libro 15 marzo:

```
16 marzo: Query database (5 minuti)
17-18 marzo: FASE 0.5 su 15 docenti (4 ore)
19-20 marzo: Mail personalizzate (3 ore)
21-30 marzo: Invio e follow-up (10 giorni)
```

**TOTALE: 2 settimane**  
**Prime adozioni**: Fine marzo

---

**Risparmio**: 6 settimane (75% più veloce)

---

## 🎯 Risposta alla Tua Obiezione

### **Tua Osservazione (corretta)**

> "È evidente che i programmi si possono analizzare preventivamente ma manca ancora del tutto la strategia di promozione perché non abbiamo ancora informazioni sufficienti sulla nuova pubblicazione"

### **Risposta Completa**

**Hai perfettamente ragione!**

La mappatura preventiva **NON crea la strategia promozionale**.

La mappatura preventiva crea un **"database intelligence"** che ti permette di:

1. ✅ **Identificare istantaneamente** chi contattare (query 5 minuti)
2. ✅ **Accelerare analisi FASE 0.5** (già hai programma e manuale attuale)
3. ✅ **Personalizzare immediatamente** (già conosci profilo docente)

**La strategia promozionale vera e propria** si crea SOLO quando:
- ✅ Hai il nuovo libro in mano
- ✅ Fai analisi MATRIX FASE 0.5
- ✅ Metti in relazione: programma docente + manuale attuale + nuovo libro

---

## 💡 Analogia Chiarificatrice

### **Senza Mappatura = Detective Improvvisato**

Crimine (nuovo libro esce):
1. Chi sono i sospetti? (ricerca docenti)
2. Dove vivono? (scarica programmi)
3. Cosa fanno? (analisi programmi)
4. Chi ha movente? (identificazione target)
5. Strategia interrogatorio (mail personalizzate)

**Tempo**: 8 settimane

---

### **Con Mappatura = Detective con Archivio**

**PRIMA del crimine** (mappatura preventiva):
- Archivio completo cittadini con profili

**Quando crimine** (esce nuovo libro):
1. Query archivio: chi ha movente (5 minuti)
2. Studio relazione sospetto-crimine (FASE 0.5 - 4 ore)
3. Strategia interrogatorio (mail personalizzate)

**Tempo**: 2 settimane

**Il database intelligence non è la strategia investigativa, ma la rende 4x più veloce**

---

## ✅ Correzione Concettuale nei Documenti

### **Cosa Va Chiarito**

I documenti precedenti potrebbero dare impressione che:
❌ "Mappi programmi → hai strategia promozionale"

Correzione:
✅ "Mappi programmi → hai database intelligence → QUANDO esce libro → query + FASE 0.5 → strategia promozionale"

---

## 🔑 Messaggio Chiave Corretto

### **Per i Colleghi**

> "La mappatura preventiva NON ti dice cosa dire ai docenti.  
>
> La mappatura preventiva ti dice **CHI** contattare e ti dà il **CONTESTO** per personalizzare.  
>
> La **strategia promozionale vera** la crei quando esce il libro, ma in 4 ore invece che 4 settimane, perché hai già tutte le informazioni di contesto."

---

## 📋 Checklist Corretta

### **FASE 0: Mappatura Preventiva (Prima uscita libro)**

- [ ] Raccogli programmi territorio
- [ ] Analisi MATRIX (Fasi 0,1,2,3,4 - NO Fase 0.5)
- [ ] Crea database intelligence
- [ ] **STOP QUI** - Non hai ancora strategia promozionale

### **FASE 1: Strategia Promozionale (Quando esce libro)**

- [ ] Ricevi nuovo libro
- [ ] Inserisci indice nuovo libro in MATRIX
- [ ] Query database: chi potrebbe essere interessato
- [ ] **Analisi MATRIX FASE 0.5** per ogni docente target
- [ ] **ADESSO hai strategia promozionale personalizzata**
- [ ] Preparazione mail mirate
- [ ] Invio e follow-up

---

## 🎯 Conclusione

**Mappatura preventiva** = Costruisci archivio intelligence  
**Strategia promozionale** = Usi archivio + nuovo libro per definire strategia

**Vantaggio**: Non è che "hai già la strategia", è che "la crei 4x più velocemente"

---

**Questo chiarisce il dubbio?** ✅

---

**Documento**: Chiarimento Mappatura vs Strategia  
**Data**: 7 Febbraio 2026  
**Versione**: 1.0
