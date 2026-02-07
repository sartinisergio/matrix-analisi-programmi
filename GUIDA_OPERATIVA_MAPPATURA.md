# Guida Operativa: Mappatura Preventiva del Territorio con MATRIX

## 🎯 Obiettivo
Costruire un **Database Intelligence Permanente** del proprio territorio commerciale per rendere istantanea e strategica la promozione di ogni nuova pubblicazione.

---

## 📋 Fase 0: Preparazione (1 giorno)

### **Checklist Iniziale**

- [ ] Identificare gli Atenei di competenza (es: 5 Atenei)
- [ ] Per ogni Ateneo, elencare i corsi di laurea attivi
- [ ] Stimare numero totale programmi da analizzare (target: 200-500)
- [ ] Creare struttura cartelle per archiviazione
- [ ] Preparare foglio di calcolo per tracking progresso

### **Struttura Cartelle Consigliata**

```
/Mappatura_Territorio_MATRIX/
│
├── /Ateneo_Milano/
│   ├── /Economia/
│   │   ├── programmi_pdf/
│   │   ├── analisi_matrix/
│   │   └── registro.xlsx
│   ├── /Ingegneria/
│   └── /Scienze/
│
├── /Ateneo_Roma/
│   ├── /Economia/
│   └── /Giurisprudenza/
│
└── /Database_Finale/
    ├── database_completo.xlsx
    └── analisi_aggregate/
```

---

## 📥 Fase 1: Raccolta Programmi (3-5 giorni)

### **1.1 Identificazione Corsi di Laurea**

Per ogni Ateneo:

1. **Accedi al sito web istituzionale**
2. **Sezione "Offerta Formativa"** o "Didattica"
3. **Elenco corsi di laurea attivi**
4. **Focus su aree rilevanti per il catalogo editoriale**

**Esempio per Università di Milano**:
- Economia e Management (12 corsi)
- Ingegneria (8 corsi)
- Scienze Politiche (6 corsi)
- Giurisprudenza (4 corsi)
- Scienze (10 corsi)

**Totale stimato**: ~150-200 programmi rilevanti

---

### **1.2 Download Programmi Didattici**

**Metodo A: Download Manuale** (più accurato)
1. Per ogni corso di laurea → "Piani di studio" → "Insegnamenti"
2. Identificare insegnamenti rilevanti per catalogo
3. Scaricare PDF programma didattico
4. Rinominare con nomenclatura standard: `[ATENEO]_[SSD]_[DOCENTE]_[MATERIA].pdf`

**Esempio nome file**:
```
MILANO_SECSP01_Rossi_EconomiaPolitica.pdf
ROMA_IUS01_Bianchi_DirittoPrivato.pdf
```

**Metodo B: Web Scraping** (per volumi molto alti)
- Utilizzare tool automatici per download batch
- Richiede competenze tecniche o supporto IT

---

### **1.3 Organizzazione File**

**Foglio Excel di Tracking** (`registro.xlsx`):

| Ateneo | Corso Laurea | SSD | Materia | Docente | File PDF | Status Analisi | Data Analisi | Note |
|--------|--------------|-----|---------|---------|----------|----------------|--------------|------|
| Milano | Economia | SECS-P/01 | Economia Politica | Prof. Rossi | MILANO_SECSP01_Rossi... | Da fare | - | - |
| Milano | Economia | SECS-P/07 | Economia Aziendale | Prof.ssa Verdi | MILANO_SECSP07_Verdi... | Completato | 15/02 | Focus PMI |

**Obiettivo fine Fase 1**:
- ✅ 200-500 programmi PDF scaricati
- ✅ Registro Excel completo
- ✅ File organizzati per Ateneo/Facoltà

---

## 🤖 Fase 2: Analisi MATRIX Batch (5-10 giorni)

### **2.1 Preparazione Analisi**

**Prioritizzazione Programmi**:

1. **Priorità ALTA**: SSD con pubblicazioni recenti/imminenti
2. **Priorità MEDIA**: SSD con catalogo ricco
3. **Priorità BASSA**: SSD marginali per catalogo

**Obiettivo**: Iniziare dalle aree con ROI immediato

---

### **2.2 Processo Analisi Singolo Programma**

**Tempo stimato per programma**: 5-8 minuti

**Step**:
1. Apri MATRIX (https://matrix-analysis.netlify.app)
2. Carica PDF programma
3. Seleziona framework valutazione appropriato
4. Esegui analisi completa (Fasi 0, 0.5, 1, 2, 3, 4)
5. **FONDAMENTALE**: Esporta risultato JSON/PDF
6. Salva in cartella `analisi_matrix/` con nome corrispondente
7. Aggiorna registro Excel: status "Completato" + data

**Nomenclatura file analisi**:
```
MILANO_SECSP01_Rossi_EconomiaPolitica_ANALISI.json
MILANO_SECSP01_Rossi_EconomiaPolitica_ANALISI.pdf
```

---

### **2.3 Batch Processing Strategico**

**Sessioni di lavoro consigliate**:

- **Sessione mattina**: 3 ore → 20-25 programmi analizzati
- **Sessione pomeriggio**: 3 ore → 20-25 programmi analizzati
- **Totale giorno**: 40-50 programmi

**Timeline realistica**:
- 200 programmi = 4-5 giorni
- 300 programmi = 6-8 giorni
- 500 programmi = 10-12 giorni

**💡 Tip**: Lavorare per "blocchi tematici" (es: tutti i programmi di Economia in un giorno) per sfruttare contesto mentale simile

---

### **2.4 Estrazione Informazioni Chiave**

Durante l'analisi, annotare nel registro Excel:

**Colonne da aggiungere**:
- **Manuale principale adottato** (Titolo, Autore)
- **Manuali alternativi** (se presenti)
- **Lacune identificate** (sintesi max 100 caratteri)
- **Profilo decisionale docente** (Innovatore/Pragmatico/Conservatore/Tradizionalista)
- **Opportunità commerciale** (Alta/Media/Bassa)
- **Note strategiche** (es: "Interessato a casi studio", "Focus esercizi")

**Esempio riga compilata**:

| ... | Manuale Principale | Lacune | Profilo | Opportunità | Note Strategiche |
|-----|-------------------|--------|---------|-------------|------------------|
| ... | Samuelson, Economia 20ed | Economia digitale assente | Conservatore pragmatico | Media | Usa libro da 15 anni, aperto a integrazioni digitali |

---

## 🗄️ Fase 3: Creazione Database Intelligence (2-3 giorni)

### **3.1 Aggregazione Dati**

**Obiettivo**: Creare database interrogabile per query strategiche

**Tool consigliato**: Excel/Google Sheets con filtri avanzati (o database Access/Airtable per volumi alti)

**Struttura Database Finale**:

```
Colonne Database:
1. ID_Programma (univoco)
2. Ateneo
3. Corso_Laurea
4. SSD
5. Materia
6. Docente
7. Email_Docente
8. Telefono_Docente
9. Manuale_Principale_Titolo
10. Manuale_Principale_Autore
11. Manuale_Principale_Editore
12. Manuali_Alternativi (lista)
13. Lacune_Identificate (testo)
14. Profilo_Decisionale (categoria)
15. Opportunità_Commerciale (Alta/Media/Bassa)
16. Note_Strategiche (testo)
17. Data_Analisi
18. File_Analisi_MATRIX (link)
19. Tag_Tematici (es: "economia_digitale, sostenibilità, casi_studio")
20. Ultimo_Contatto (data)
21. Esito_Ultimo_Contatto (testo)
```

---

### **3.2 Classificazione e Tag**

**Sistema di Tagging** per facilitare query:

**Tag per Contenuti Tematici**:
- `#economia_comportamentale`
- `#finanza_sostenibile`
- `#diritto_digitale`
- `#casi_studio`
- `#esercizi_pratici`

**Tag per Opportunità Commerciali**:
- `#lacuna_critica` → Manuale attuale ha grosse mancanze
- `#innovatore` → Docente aperto a novità
- `#insoddisfatto` → Segnali di ricerca alternative
- `#decisore` → Coordina corso, influenza altri docenti

**Tag per Timing**:
- `#rinnovo_2025` → Manuale vecchio, probabile cambio
- `#nuovo_corso` → Corso di nuova attivazione

---

### **3.3 Vista Strategica: Dashboard**

**Creare foglio "Dashboard" nel database** con:

**Statistiche Generali**:
- Totale programmi analizzati: 347
- Atenei coperti: 5
- Docenti mappati: 312
- Opportunità ALTE: 78 (22%)
- Opportunità MEDIE: 156 (45%)

**Top Lacune Identificate** (query su colonna "Lacune"):
1. Economia digitale (45 programmi)
2. Sostenibilità ambientale (38 programmi)
3. Casi studio aggiornati (52 programmi)
4. Esercizi pratici (41 programmi)

**Top Manuali Competitor** (query su colonna "Manuale_Principale"):
1. Samuelson, Economia (23 adozioni)
2. Blanchard, Macroeconomia (18 adozioni)
3. Krugman, Economia Internazionale (15 adozioni)

**Profili Decisionali** (query su colonna "Profilo"):
- Innovatori: 67 (21%)
- Pragmatici contenutistici: 134 (43%)
- Conservatori pragmatici: 89 (28%)
- Tradizionalisti puri: 22 (7%)

---

## 🎯 Fase 4: Utilizzo Operativo (PERMANENTE)

### **4.1 Workflow per Nuova Pubblicazione**

**Esempio**: Esce "Nuovo Manuale Economia Circolare"

**Step 1: Query Database** (5 minuti)

Filtri da applicare:
```
SSD = "SECS-P/01" O "SECS-P/06"
E (Lacune CONTIENE "sostenibilità" O Tag CONTIENE "#economia_verde")
E (Profilo_Decisionale = "Innovatore" O "Pragmatico contenutistico")
E (Opportunità_Commerciale = "Alta" O "Media")
```

**Risultato**: 15 docenti target perfetti

---

**Step 2: Preparazione Mail Personalizzate** (2-3 ore)

Per ognuno dei 15 docenti, prepara mail con:

**Template Base**:
```
Oggetto: [Novità Editoriale] Soluzione per [LACUNA SPECIFICA] nel suo corso di [MATERIA]

Gentile Prof. [COGNOME],

Le scrivo in merito al suo corso di [MATERIA] presso [ATENEO].

Ho notato che nel suo programma didattico affronta [TEMI SPECIFICI DEL PROGRAMMA],
attualmente supportato dal manuale [MANUALE ATTUALE].

È appena stata pubblicata la nostra nuova opera "[TITOLO NUOVO MANUALE]" di [AUTORE],
che affronta in modo specifico [TEMA RILEVANTE PER LACUNA IDENTIFICATA],
colmando le lacune sui seguenti aspetti:
- [LACUNA 1 SPECIFICA DAL DATABASE]
- [LACUNA 2 SPECIFICA DAL DATABASE]

In particolare, i capitoli [X, Y, Z] del nuovo volume trattano [CONTENUTI],
che si integrano perfettamente con [SEZIONE PROGRAMMA DOCENTE].

[SUGGERIMENTO STRATEGICO PERSONALIZZATO DA FASE 0.5 MATRIX]

Sarei lieto di inviarle una copia saggio e di confrontarmi con lei
su come questo volume potrebbe arricchire il suo corso.

Resto a disposizione,
[FIRMA PROMOTORE]
```

**Personalizzazioni chiave** (da database):
- ✅ Lacune specifiche del docente
- ✅ Manuale attuale usato
- ✅ Temi del programma
- ✅ Profilo decisionale (influenza tono mail)

---

**Step 3: Invio e Follow-up** (1 settimana)

- **Giorno 1**: Invio 15 mail personalizzate
- **Giorno 4**: Follow-up chi non ha risposto (email sollecito leggero)
- **Giorno 7**: Follow-up telefonico chi ha mostrato interesse

**Tracking nel database**:
- Aggiorna colonna `Ultimo_Contatto` con data
- Aggiorna colonna `Esito_Ultimo_Contatto` con: "Interessato/Da ricontattare/Non interessato/Adozione confermata"

---

### **4.2 Manutenzione Database Annuale**

**Frequenza**: 1 volta all'anno (periodo: luglio-agosto, quando programmazione didattica viene aggiornata)

**Attività**:
1. **Verifica nuovi corsi attivati** → Download nuovi programmi
2. **Verifica programmi modificati** → Re-analisi MATRIX se cambiamenti sostanziali
3. **Aggiornamento contatti docenti** → Verificare email/telefoni attivi
4. **Pulizia database** → Rimuovere docenti pensionati / corsi disattivati
5. **Aggiornamento manuali adottati** → Verificare se ci sono stati cambi adozione

**Tempo stimato**: 3-5 giorni (molto meno della mappatura iniziale)

---

## 📊 Metriche di Successo

### **KPI da Monitorare**

**Durante Mappatura**:
- Programmi analizzati / giorno
- Tempo medio per analisi
- % completamento per Ateneo

**Durante Utilizzo Operativo**:
| Metrica | Target |
|---------|--------|
| Tempo query database per nuova pubblicazione | < 10 minuti |
| Tempo preparazione mail personalizzate | 2-3 ore per 15 docenti |
| Tasso risposta mail | > 30% |
| Tasso conversione (adozioni) | > 25% |
| Tempo totale promozione | < 4 settimane |

---

## 🚀 Quick Start: Pilota su 1 Ateneo

**Se vuoi testare con investimento minimo**:

### **Settimana 1: Mappatura Pilota**
- Scegli 1 Ateneo di dimensioni medie
- Focus su 1-2 aree disciplinari (es: Economia + Giurisprudenza)
- Raccogli 50-80 programmi
- Analisi MATRIX batch: 2-3 giorni

### **Settimana 2: Strutturazione Database**
- Creazione database pilota
- Estrazione informazioni chiave
- Dashboard preliminare

### **Settimana 3-4: Test su Prossima Pubblicazione**
- Query database per identificare target
- Preparazione mail personalizzate
- Invio e follow-up
- Misurazione risultati vs approccio tradizionale

**Obiettivo**: Dimostrare ROI su scala ridotta prima di investire su mappatura completa

---

## 💡 Tips & Best Practices

### **Organizzazione del Lavoro**

✅ **DO**:
- Lavorare per blocchi tematici (tutti programmi Economia in un giorno)
- Fare pause ogni 10-12 analisi (evitare errori da stanchezza)
- Salvare immediatamente dopo ogni analisi MATRIX
- Aggiornare registro Excel in tempo reale
- Usare nomenclatura file standard e consistente

❌ **DON'T**:
- Non cercare perfezione assoluta (meglio fatto che perfetto)
- Non rimandare aggiornamento registro (rischio perdere dati)
- Non analizzare programmi non rilevanti per catalogo (focus su ROI)

### **Gestione Tempo**

**Evitare burnout**:
- Max 40-50 analisi al giorno
- 1 giorno pausa ogni 4 giorni di lavoro intensivo
- Alternare analisi con attività diverse (follow-up, mail, riunioni)

**Gamification**:
- Target giornaliero: 40 analisi
- Milestone settimanale: 200 analisi
- Reward personale al raggiungimento milestone

---

## 📞 Supporto e Escalation

**Se incontri problemi**:

| Tipo Problema | Soluzione |
|--------------|-----------|
| Programma didattico non trovabile online | Contattare segreteria didattica Ateneo |
| Framework MATRIX non disponibile per materia | Segnalare per creazione framework custom |
| Difficoltà interpretazione output MATRIX | Rivedere esempi in documentazione / chiedere supporto |
| Database troppo complesso da gestire | Considerare tool più avanzato (Airtable, Access) |

---

## 🎬 Conclusione

### **Roadmap Completa**

```
Settimane 1-2: Raccolta programmi (200-500 PDF)
Settimane 3-4: Analisi MATRIX batch
Settimana 5: Creazione database intelligence
Settimana 6: Test operativo prima pubblicazione
→ Da settimana 7: Utilizzo permanente (query + mail mirate)
```

**Investimento totale**: 5-6 settimane  
**Ritorno**: Sistema intelligence permanente per 5-10 anni

---

**Il database intelligence non è un costo, è un asset strategico che ripaga l'investimento con la prima pubblicazione promossa.**

---

**Documento**: Guida Operativa Mappatura Preventiva  
**Versione MATRIX**: v1.1.0  
**Per**: Team Promotori Editoriali  
**Tempo implementazione**: 5-6 settimane  
**ROI**: Permanente (5-10 anni)
