# PROMPT FASE 0.5 AVANZATA - Logica della Scelta Editoriale

## 🎯 Obiettivo
Analizzare **perché** il docente ha scelto il manuale principale e **come** si relaziona con i manuali alternativi in bibliografia, rivelando la mentalità decisionale del docente.

## 📝 Nuovo Prompt LLM

```
Sei un esperto di analisi editoriale universitaria e strategie commerciali per case editrici.

PROGRAMMA DIDATTICO:
${testo.substring(0, 6000)}

ANALISI PRELIMINARE GIÀ EFFETTUATA:
${JSON.stringify(fase0, null, 2)}

MANUALE PRINCIPALE ADOTTATO:
- Titolo: ${manualeInfo.title}
- Autore: ${manualeInfo.author}
- Editore: ${manualeInfo.publisher}
- Pagine: ${manualeInfo.pages}
- Prezzo: €${manualeInfo.price}

INDICE MANUALE PRINCIPALE:
${manualeInfo.chapters ? manualeInfo.chapters.map((cap, i) => `${i+1}. ${cap}`).join('\n') : 'Indice non disponibile'}

${manualiAlternativi.length > 0 ? `
MANUALI ALTERNATIVI IN BIBLIOGRAFIA:
${manualiAlternativi.map((alt, idx) => `
**Alternativo ${idx+1}**:
- Titolo: ${alt.title}
- Autore: ${alt.author}
- Editore: ${alt.publisher}
- Pagine: ${alt.pages}
- Prezzo: €${alt.price}
- INDICE:
${alt.chapters ? alt.chapters.map((cap, i) => `  ${i+1}. ${cap}`).join('\n') : '  Indice non disponibile'}
`).join('\n')}
` : 'NESSUN MANUALE ALTERNATIVO IN BIBLIOGRAFIA'}

CONTESTO:
- Materia: ${materiaName}
- Classe di Laurea: ${contesto}
- CFU: ${cfu || 'Non specificato'}

---

## COMPITO: Analisi Strategica in 3 Parti

### PARTE 1: Perché Ha Scelto il Manuale Principale?

Analizza i **fattori decisivi** che hanno portato alla scelta del manuale principale:

1. **Motivazioni Concrete** (3-5 fattori):
   - Cosa rende QUESTO manuale preferibile agli altri disponibili?
   - Allineamento con contenuti del programma
   - Approccio pedagogico (teorico, applicativo, clinico)
   - Livello target (base, intermedio, avanzato)
   - Prezzo e accessibilità studenti
   - Linguaggio e struttura

2. **Natura della Scelta**:
   - È una scelta **convinta** (docente sa perché lo vuole)?
   - È una scelta **ereditata** (tradizione dipartimento, predecessore)?
   - È un **compromesso** (non ideale ma accettabile)?

3. **Priorità Emerse**:
   - Quali sono le 3 priorità TOP del docente nella scelta? (es: "Linguaggio accessibile", "Copertura esaustiva", "Prezzo contenuto")

### PARTE 2: Relazione tra Testi in Bibliografia (SOLO SE ALTERNATIVI PRESENTI)

${manualiAlternativi.length > 0 ? `
**IMPORTANTE**: Hai a disposizione gli INDICI completi dei manuali. Usali per analisi precise!

Per OGNI manuale alternativo, identifica:

1. **Ruolo Specifico**:
   - approfondimento → Copre argomenti più dettagliati del principale
   - semplificazione → Versione più accessibile per studenti in difficoltà
   - esercizi → Focus su problemi e applicazioni pratiche
   - modulo_specifico → Copre un argomento che il principale non ha
   - alternativa_studenti → Opzione economica/diversa per chi preferisce altro approccio
   - riferimento_generale → Consultazione generica, non obbligatorio

2. **Cosa Rivela sul Docente**:
   - Perché ha AGGIUNTO questo alternativo?
   - Quale GAP del manuale principale sta compensando?
   - Confronta gli INDICI: cosa ha l'alternativo che manca al principale?

3. **Analisi della Combinazione**:
   - Perché il docente usa QUESTA combinazione di testi?
   - È una strategia didattica (principale per base + alternativo per approfondimento)?
   - È una compromesso economico (principale economico + alternativo premium per approfondimenti)?
   - È una necessità (principale ha lacune su alcuni argomenti)?

4. **Domanda Chiave per il Promotore**:
   - Qual è la DOMANDA STRATEGICA che il promotore dovrebbe fare al docente in colloquio?
   - Obiettivo: capire se c'è spazio per proporre un'alternativa Zanichelli che unifichi principale + alternativi
   - Esempio: "Verificare se l'alternativo X è usato attivamente per i capitoli Y e Z, dove il principale è carente. Proporre un manuale Zanichelli che copra entrambi evitando la doppia adozione."
` : `
**NOTA**: Non ci sono manuali alternativi. Il docente usa SOLO il manuale principale. Salta questa sezione.
`}

### PARTE 3: Profilo Decisionale del Docente

In base all'analisi, deduci:

1. **Cosa Cerca** (3 esigenze principali)
2. **Cosa Evita** (2 caratteristiche sgradite)
3. **Sensibilità al Prezzo**: alta | media | bassa
4. **Familiarità con Zanichelli**: alta | media | bassa | nulla (in base a editore attuale)
5. **Apertura al Cambio del Principale**: alta | media | bassa
6. **Apertura a Integrare un Alternativo Zanichelli**: alta | media | bassa

---

## IMPORTANTE - Linee Guida:

✅ **USA** linguaggio qualitativo: "probabilmente", "sembra", "potrebbe"
✅ **BASA** tutto su programma, indici manuali, e analisi preliminare
✅ **CONFRONTA** gli indici quando disponibili per identificare GAP precisi
❌ **NON** inventare dati numerici o percentuali
❌ **NON** fare affermazioni categoriche senza evidenze

---

## FORMATO OUTPUT (JSON):

{
  "scelta_manuale_principale": {
    "motivazioni": [
      {
        "fattore": "es: Approccio applicativo allineato al profilo del docente",
        "peso": "alto|medio|basso",
        "evidenza": "Spiegazione concisa basata su programma/indice (max 200 caratteri)"
      }
    ],
    "natura_scelta": {
      "tipo": "convinta|ereditata|compromesso",
      "confidenza": "alta|media|bassa",
      "spiegazione": "Breve motivazione (max 250 caratteri)"
    },
    "priorita_docente": ["Priorità 1", "Priorità 2", "Priorità 3"]
  },
  "relazione_testi_bibliografia": {
    "testi_alternativi_presenti": true,
    "analisi_combinazione": "Analisi della logica complessiva (max 500 caratteri)",
    "dettaglio_alternativi": [
      {
        "titolo": "Titolo manuale alternativo",
        "ruolo": "approfondimento|semplificazione|esercizi|modulo_specifico|alternativa_studenti|riferimento_generale",
        "cosa_rivela": "Cosa ci dice questa scelta sul docente e sui gap del principale (max 250 caratteri)"
      }
    ],
    "domanda_chiave": "Domanda strategica per il promotore da fare al docente (max 300 caratteri)"
  },
  "profilo_decisionale": {
    "cosa_cerca": ["Esigenza 1", "Esigenza 2", "Esigenza 3"],
    "cosa_evita": ["Cosa non vuole 1", "Cosa non vuole 2"],
    "sensibilita_prezzo": "alta|media|bassa",
    "familiarita_zanichelli": "alta|media|bassa|nulla",
    "apertura_cambio_principale": "alta|media|bassa",
    "apertura_integrazione_alternativo": "alta|media|bassa"
  }
}

**NOTA**: Se NON ci sono manuali alternativi, imposta:
```json
"relazione_testi_bibliografia": {
  "testi_alternativi_presenti": false,
  "analisi_combinazione": null,
  "dettaglio_alternativi": [],
  "domanda_chiave": null
}
```

RISPONDI SOLO CON IL JSON, NIENT'ALTRO.
```

## 🎨 Schema JSON Output

```json
{
  "scelta_manuale_principale": {
    "motivazioni": [
      {
        "fattore": "string (max 100 caratteri)",
        "peso": "alto|medio|basso",
        "evidenza": "string (max 200 caratteri)"
      }
    ],
    "natura_scelta": {
      "tipo": "convinta|ereditata|compromesso",
      "confidenza": "alta|media|bassa",
      "spiegazione": "string (max 250 caratteri)"
    },
    "priorita_docente": ["string", "string", "string"]
  },
  "relazione_testi_bibliografia": {
    "testi_alternativi_presenti": boolean,
    "analisi_combinazione": "string (max 500 caratteri) | null",
    "dettaglio_alternativi": [
      {
        "titolo": "string",
        "ruolo": "approfondimento|semplificazione|esercizi|modulo_specifico|alternativa_studenti|riferimento_generale",
        "cosa_rivela": "string (max 250 caratteri)"
      }
    ],
    "domanda_chiave": "string (max 300 caratteri) | null"
  },
  "profilo_decisionale": {
    "cosa_cerca": ["string", "string", "string"],
    "cosa_evita": ["string", "string"],
    "sensibilita_prezzo": "alta|media|bassa",
    "familiarita_zanichelli": "alta|media|bassa|nulla",
    "apertura_cambio_principale": "alta|media|bassa",
    "apertura_integrazione_alternativo": "alta|media|bassa"
  }
}
```

## ⚙️ Parametri Tecnici

- **Temperatura**: `0.3` (era 0.2, serve più creatività per inferenze)
- **Limite testo programma**: `6000` caratteri (non 8000)
- **Modello**: GPT-4 (attuale)
- **Fallback**: Se la fase fallisce, loggare warning ma NON bloccare l'analisi

## 📊 Differenza con FASE 0.5 Attuale

### Prima (FASE 0.5 attuale):
- ✅ Motivazioni generiche
- ❌ NO relazione con alternativi
- ❌ NO domanda per promotore
- ❌ NO indici manuali utilizzati

### Dopo (FASE 0.5 avanzata):
- ✅ Motivazioni con evidenze
- ✅ Analisi relazione principale ↔ alternativi
- ✅ Domanda strategica per promotore
- ✅ Confronto indici per gap precisi
- ✅ Profilo decisionale completo

## 🎯 Esempio Output Atteso

```json
{
  "scelta_manuale_principale": {
    "motivazioni": [
      {
        "fattore": "Focus biologico-applicativo allineato al programma",
        "peso": "alto",
        "evidenza": "Il programma enfatizza aspetti biologici della chimica (biochimica, metabolismo), coerente con approccio biologico del manuale"
      },
      {
        "fattore": "Trattazione compatta adatta a corso da 6 CFU",
        "peso": "medio",
        "evidenza": "400 pagine vs 800+ di enciclopedie, coerente con CFU ridotti"
      }
    ],
    "natura_scelta": {
      "tipo": "convinta",
      "confidenza": "alta",
      "spiegazione": "Allineamento chiaro tra programma biologico-centrico e approccio del manuale"
    },
    "priorita_docente": [
      "Linguaggio accessibile per studenti di Biologia",
      "Copertura completa argomenti biologici",
      "Prezzo contenuto"
    ]
  },
  "relazione_testi_bibliografia": {
    "testi_alternativi_presenti": true,
    "analisi_combinazione": "Il docente usa Arnesano come principale per accessibilità, ma indica Kotz per approfondimenti su equilibri chimici e stechiometria avanzata, dove Arnesano è più sintetico. Strategia didattica: base + approfondimento opzionale.",
    "dettaglio_alternativi": [
      {
        "titolo": "Chimica (Kotz)",
        "ruolo": "approfondimento",
        "cosa_rivela": "Confronto indici: Kotz ha 3 capitoli su equilibri vs 1 in Arnesano. Il docente compensa con Kotz per studenti che vogliono approfondire termodinamica e cinetica."
      }
    ],
    "domanda_chiave": "Verificare se Kotz è usato attivamente e per quali capitoli specifici. Se sì, proporre un manuale Zanichelli che integri base biologica + approfondimenti, eliminando doppia adozione."
  },
  "profilo_decisionale": {
    "cosa_cerca": [
      "Manuale biologico-centrico",
      "Linguaggio accessibile per non-chimici",
      "Trattazione non enciclopedica"
    ],
    "cosa_evita": [
      "Manuali troppo teorici/matematici",
      "Enciclopedie da 1000+ pagine"
    ],
    "sensibilita_prezzo": "alta",
    "familiarita_zanichelli": "bassa",
    "apertura_cambio_principale": "media",
    "apertura_integrazione_alternativo": "alta"
  }
}
```

---

**Data creazione**: 7 Febbraio 2026  
**Versione**: 1.0 - Proposta Avanzata  
**File correlato**: `/home/user/webapp/index.html` (implementazione)
