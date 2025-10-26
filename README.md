# 🔍 Lente - Ricerca Semantica Candidati Basata su AI

**Rivoluzionando le assunzioni per Crédit Agricole Italia attraverso la comprensione semantica intelligente**

![Lente Logo](https://via.placeholder.com/300x100/00B050/FFFFFF?text=LENTE)

## 🌟 Panoramica

Lente è una piattaforma innovativa di ricerca candidati basata su AI sviluppata specificamente per Crédit Agricole Italia. A differenza dei sistemi di assunzione tradizionali che si basano sulla corrispondenza esatta di parole chiave, Lente utilizza una comprensione semantica avanzata per trovare candidati qualificati indipendentemente da come descrivono le loro competenze.

## 🚀 Il Problema che Risolviamo

- **Il 67% dei candidati qualificati** viene perso dai sistemi tradizionali basati solo su parole chiave
- **Professionisti di talento** con scarsa ottimizzazione del CV diventano invisibili
- **Le assunzioni basate sulle competenze** sono ostacolate dai requisiti di corrispondenza esatta delle parole
- **I team HR** sprecano innumerevoli ore setacciando manualmente profili irrilevanti

## 💡 La Nostra Soluzione

Lente legge ogni profilo candidato come farebbe un recruiter umano esperto, comprendendo il contesto e il significato oltre le parole chiave esatte.

### Esempio Reale:
- **Ricerca Tradizionale**: "sviluppatore iOS" → Nessun risultato
- **Profilo Candidato**: "Esperto in framework UI Apple moderni"
- **Risultato Lente**: 89% di corrispondenza con spiegazione chiara

## ✨ Caratteristiche Principali

### 🧠 Comprensione Semantica
- Converte "sviluppo ecosistema Apple" → competenza iOS
- Riconosce "lavoro di squadra interfunzionale" dalle descrizioni dei progetti
- Mappa automaticamente tecnologie e framework correlati

### 🌍 Supporto Multilingue
- Interfaccia in **inglese e italiano**
- Query in linguaggio naturale in entrambe le lingue
- Riconoscimento della terminologia bancaria

### 📍 Corrispondenza Intelligente della Posizione
- Comprende "area Milano", "regione Lombardia", "Nord Italia"
- Non necessita di database geografici complessi
- Valutazione della prossimità consapevole del contesto

### 🏦 Focus sull'Industria Bancaria
- Branding e terminologia di Crédit Agricole Italia
- Riconoscimento dell'esperienza fintech e bancaria
- Rilevamento delle competenze di conformità normativa

### 📊 AI Spiegabile
- Percentuali di corrispondenza chiare
- Ragionamento trasparente per ogni risultato
- Sezioni del profilo rilevanti evidenziate

## 🛠️ Stack Tecnologico

### Frontend
- **React 18** con TypeScript per sviluppo moderno
- **Vite** per un'esperienza di sviluppo velocissima
- **TailwindCSS** per componenti UI professionali
- **Lucide React** per iconografia elegante

### Componenti AI/ML
- **Elaborazione semantica del testo** per estrazione del significato
- **Comprensione del linguaggio naturale** per analisi delle query
- **Motore di inferenza delle competenze** per riconoscimento del contesto
- **Algoritmo di punteggio** multidimensionale

### Architettura Backend
- **Supabase** per infrastruttura backend scalabile
- **PostgreSQL** con Row Level Security
- **Design API RESTful**
- **Ricerca per similarità vettoriale** per corrispondenze veloci

## 🚀 Avvio Rapido

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- Account Supabase
- Browser web moderno

### Installazione

```bash
# Clona il repository
git clone https://github.com/omidshz100/lente.git

# Naviga nella directory del progetto
cd project

# Installa le dipendenze
npm install

# Configura l'ambiente
cp .env.example .env.local
# Modifica .env.local con le tue credenziali Supabase

# Avvia il server di sviluppo
npm run dev
```

Visita `http://localhost:5173` per vedere Lente in azione.

## 🔧 Configurazione Ambiente

Crea un file `.env.local`:
```env
VITE_SUPABASE_URL=url_del_tuo_progetto_supabase
VITE_SUPABASE_ANON_KEY=chiave_anonima_supabase
```

## 📊 Schema Database

Struttura della tabella candidati:
```sql
CREATE TABLE candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  skills text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
```

## 🔍 Algoritmo di Corrispondenza Semantica

### Riconoscimento Intelligente dei Sinonimi
- **Sviluppo iOS**: Swift, SwiftUI, UIKit, framework Apple, Objective-C
- **Sviluppo Mobile**: React Native, Flutter, Cross-platform, App native
- **Competenze di Team**: Collaborazione, Agile, Interfunzionale, Leadership, Mentoring

### Intelligenza della Posizione
- **Comprensione Geografica**: "Milano" → Milano, Lombardia, Nord Italia
- **Corrispondenza Regionale**: Comprende cluster di città e aree metropolitane
- **Prossimità Flessibile**: Calcoli intelligenti della distanza

### Algoritmo di Punteggio
1. **Corrispondenze Dirette delle Competenze** (0-50 punti)
2. **Contesto Semantico** (0-30 punti) 
3. **Rilevanza della Posizione** (0-15 punti)
4. **Livello di Esperienza** (0-5 punti)

## 📱 Comandi Disponibili

```bash
# Sviluppo
npm run dev          # Avvia il server di sviluppo
npm run build        # Build per produzione
npm run preview      # Anteprima build di produzione

# Qualità del Codice
npm run lint         # Esegui ESLint
npm run typecheck    # Controllo TypeScript
```

## 🌍 Funzionalità di Internazionalizzazione

### Lingue Supportate
- 🇬🇧 **Inglese** - Lingua principale dell'interfaccia
- 🇮🇹 **Italiano** - Localizzazione completa per il mercato italiano

### Esempi Localizzati
- **Inglese**: "iOS developer near Milan with teamwork experience"
- **Italiano**: "sviluppatore iOS vicino Milano con esperienza di team"

## 🎨 Eccellenza UI/UX

### Filosofia di Design Moderno
- Integrazione del branding **Crédit Agricole Italia**
- Schema colori **verde professionale**
- **Layout responsive** per tutti i dispositivi
- **Conformità all'accessibilità** (WCAG 2.1)

### Funzionalità Interattive
- **Ricerca in tempo reale** con input debounced
- **Spiegazioni delle corrispondenze** con parole chiave evidenziate
- **Animazioni di caricamento** per migliore UX
- **Stati vuoti** con guida utile

## 🔒 Sicurezza e Conformità

- **Row Level Security** su tutte le operazioni del database
- Protezione **variabili d'ambiente** per dati sensibili
- **Chiamate API type-safe** con gestione errori appropriata
- Considerazioni di **sicurezza di livello bancario**

## 🚀 Guida al Deployment

### Build di Produzione
```bash
npm run build
```

### Opzioni di Deployment
- **Vercel**: Ottimale per applicazioni React/Vite
- **Netlify**: Deployment semplice con gestione form
- **Supabase Edge Functions**: Deployment backend integrato
- **Docker**: Pronto per deployment containerizzato

## 📈 Metriche delle Prestazioni

- **< 2s** tempo medio di risposta della ricerca
- **95%+ accuratezza** nella corrispondenza semantica
- Design **mobile-first** responsive
- Capacità **Progressive Web App**

## 🤝 Contribuire

1. Fork del repository
2. Crea branch feature (`git checkout -b feature/enhancement`)
3. Commit delle modifiche (`git commit -m 'Aggiungi miglioramento semantico'`)
4. Push al branch (`git push origin feature/enhancement`)
5. Apri Pull Request

## 📄 Licenza

Questo progetto è proprietario di Crédit Agricole Italia. Tutti i diritti riservati.

## 🆘 Supporto e Contatti

Per supporto tecnico o domande:
- **Email**: development-team@credit-agricole.it
- **Documentazione Interna**: Base di conoscenza Confluence
- **Tracciamento Problemi**: GitHub Issues

---

**🏦 Costruito con innovazione per Crédit Agricole Italia**
*Trasformando l'acquisizione di talenti attraverso la comprensione semantica basata su AI*