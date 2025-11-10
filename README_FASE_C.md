# Analisi Programmi Chimica Organica - Fase C Step 1

## Versione 6.0 Step 1 - Prepara Colloquio

### 🎯 Novità Fase C Step 1

Questa versione introduce la funzionalità **"Prepara Colloquio"** per generare automaticamente post-it commerciali da utilizzare durante i colloqui con i docenti.

### ✨ Funzionalità Implementate

#### 1. **Pulsante "Prepara Colloquio"**
- Disponibile dopo ogni analisi completata
- Accesso rapido alla generazione post-it

#### 2. **Selezione Manuali**
Quattro opzioni disponibili:
- 🎯 **Solo Manuale Raccomandato**: Genera post-it solo per il manuale raccomandato dall'analisi
- 📘 **Solo Hart**: Post-it per Hart - Fondamenti di chimica organica (520 pagine)
- 📙 **Solo McMurry Fondamenti**: Post-it per McMurry - Fondamenti di chimica organica (896 pagine)
- 📚 **Tutti e 3 i Manuali**: Post-it per Hart, McMurry Fondamenti e McMurry Biologico

#### 3. **Generazione Post-it Automatici**
- Estrae automaticamente i **gap** identificati nell'analisi (max 5)
- Utilizza **GPT-4** per generare argomenti commerciali specifici
- Consulta il **database indici** dei manuali Zanichelli per:
  - Identificare capitoli pertinenti
  - Fornire pagine esatte
  - Creare argomenti commerciali concreti

#### 4. **Visualizzazione Post-it**
- Layout stile **post-it gialli** professionali
- Griglia a 2 colonne per visualizzazione ottimale
- Ogni post-it contiene:
  - 🎯 **Argomento**: Gap da coprire
  - 📖 **Capitolo**: Numero e titolo esatto
  - 📌 **Pagine**: Pagine specifiche del manuale
  - 💬 **Argomento Commerciale**: Testo pronto per il colloquio

#### 5. **Esportazione PDF**
- Genera PDF professionale con tutti i post-it
- Layout ottimizzato per stampa
- Include:
  - Intestazione con dati università e corso
  - Post-it con sfondo giallo e bordo
  - Numerazione progressiva
  - Footer con data e paginazione

### 📊 Database Indici

Il sistema include gli indici completi di:
- **Hart**: 16 capitoli
- **McMurry Fondamenti**: 17 capitoli con sezioni dettagliate
- **McMurry Biologico**: 45 capitoli con sezioni dettagliate

### 🔧 Tecnologie Utilizzate

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **AI**: OpenAI GPT-4 (via proxy Netlify)
- **PDF**: jsPDF per generazione PDF client-side
- **Hosting**: Netlify con serverless functions

### 📝 Come Usare

1. **Esegui un'analisi** (Base o Avanzata) di un programma universitario
2. Clicca sul pulsante **"📝 Prepara Colloquio"** nei risultati
3. **Seleziona** quali manuali includere
4. Clicca **"Genera Post-it Automatici"**
5. Attendi la generazione (GPT-4 elabora ogni gap)
6. **Esporta in PDF** per stampare o condividere

### ⚠️ Note Importanti

- La generazione richiede una **chiave API OpenAI** configurata
- Ogni post-it richiede una chiamata a GPT-4 (costo variabile)
- Il sistema limita automaticamente a **5 gap massimo** per analisi
- I post-it sono generati in base ai gap identificati: se non ci sono gap, non è possibile generare post-it

### 🚀 Prossimi Step (Fase C Step 2)

Funzionalità pianificate per Step 2:
- 🔍 **Ricerca On-Demand**: Campo di ricerca per generare post-it su argomenti specifici
- 💡 **Suggerimenti Argomenti Comuni**: Lista di argomenti frequenti per contesto (es. Scienze Biologiche)
- 📊 **Statistiche**: Tracciamento post-it più utilizzati

### 📦 File Principali

- `index.html`: Applicazione principale con Fase C integrata
- `indici_manuali.json`: Database indici manuali Zanichelli (incorporato nell'HTML)
- `netlify/functions/openai-proxy.js`: Proxy per chiamate OpenAI GPT-4
- `netlify/functions/perplexity-proxy.js`: Proxy per analisi programmi

### 🔗 Deploy

Repository: `chimica-organica-fase-c`
URL: https://chimica-organica-fase-c.netlify.app

### 📄 Licenza

Proprietario: Zanichelli Editore
Uso interno per rappresentanti commerciali

---

**Versione**: 6.0 Step 1  
**Data**: Novembre 2025  
**Autore**: Sistema di Analisi Zanichelli

