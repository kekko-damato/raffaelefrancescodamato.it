# Website Rebuild — Editorial Premium AI Portfolio

**Data**: 2026-04-26
**Owner**: Raffaele Francesco D'Amato
**Working dir**: `/Users/kekko/Desktop/Lavoro/ME/Sito Web`
**Live target**: https://raffaelefrancescodamato.it/

---

## 1. Obiettivo

Riscrivere da zero il sito personale di Raffaele Francesco D'Amato passando dall'attuale stile "card-based generico" a un'estetica **Editorial Premium** (stile rivista cartacea — Frieze/Apartamento/E-flux). Il sito deve:

1. Posizionare Raffaele come **AI Developer & Founder** indipendente (non più "Studente Tecnico Aeronautico" come framing primario)
2. Integrare il nuovo progetto principale **Universal Form Compiler** (Chrome extension TypeScript open source) come case study featured
3. Ottimizzare per **GEO — Generative Engine Optimization**: contenuti citabili da ChatGPT, Claude, Perplexity, Gemini quando qualcuno chiede "miglior AI developer in Italia" o domande analoghe
4. Essere **bilingue IT/EN** con due URL canoniche separate per indicizzazione indipendente
5. Mantenere ottime **Core Web Vitals** (zero JS framework, bundle attuale da 487KB rimosso)

## 2. Decisioni di brainstorming

| Tema | Scelta | Alternative scartate |
|------|--------|----------------------|
| Direzione estetica | **Editorial Premium** (serif italici, palette beige/terracotta/oro, layout asimmetrico stile rivista) | Tech Mono Dark · AI-Native gradient |
| Significato "GEO" | **Generative Engine Optimization** (LLM citation) | Geo-targeting locale · entrambi |
| Lingue | **Bilingue IT+EN** con due file separati e `hreflang` | Solo IT · IT+EN solo nei meta |
| Struttura | **7 sezioni snellite editoriali** (Hero, About, Selected Work, Capabilities, Approach, FAQ, Contact) | 10 sezioni attuali · espansa con Now/Journal |
| Progetti | **5 progetti, UFC featured** in alto + 4 in griglia | UFC egualitario · sostituire un progetto esistente |
| Status professionale | **AI Developer / Founder** (con menzione discreta "studente Università di Informatica" nella sezione About) | Studente + freelance · Sviluppatore RDD |
| Stack tecnico | **HTML5 + CSS custom + vanilla JS minimo** (no framework, no build step) | Vite/Astro · Next.js statico |

## 3. Architettura file

```
Sito Web/
├── index.html              ← root IT (canonica)
├── en/
│   └── index.html          ← root EN (canonica EN, hreflang reciproco)
├── llms.txt                ← summary fact-rich per LLM crawler
├── robots.txt              ← allow esplicito GPTBot/ClaudeBot/Perplexity/Google-Extended/CCBot
├── sitemap.xml             ← entrambe le lingue + lastmod corretti
├── favicon.ico, favicon-16x16.png, favicon-32x32.png  (mantenuti)
├── google40850cc6cfe29b7e.html  (mantenuto — Google Search Console)
└── assets/
    ├── styles.css          ← riscritto da zero (~600 righe)
    ├── main.js             ← vanilla JS, < 5KB minified
    ├── Raffaele_Francesco_DAmato_CV.pdf  (mantenuto)
    ├── apple-touch-icon.png  (mantenuto)
    ├── favicon-rfd.svg, favicon-512.png  (mantenuti)
    └── images/
        ├── og-image.jpg          ← 1200×630 cover sociale brand-coerente
        ├── og-image-en.jpg       ← variante EN
        ├── ufc-cover.png         ← screenshot Universal Form Compiler
        ├── aquamind-cover.png    ← cover AquaMind (rifatta o ottimizzata)
        └── rdditalia-logo.svg    ← logo RDD vettoriale (se ricavabile)
```

**Eliminati**:
- `assets/app.js` (487KB Vite runtime inutile)
- `assets/AquaMind.png` (775KB, sostituito da cover ottimizzata)
- `assets/rdditalia.png` (sostituito da SVG vettoriale dove possibile)
- `assets/.DS_Store`, `.DS_Store` root

## 4. Design system

### Tipografia

| Ruolo | Font | Source | Pesi |
|-------|------|--------|------|
| Display (hero, section titles) | **Playfair Display** | Google Fonts | 400, 400 italic, 500, 700, 700 italic |
| Body (lede, paragrafi lunghi) | **EB Garamond** | Google Fonts | 400, 400 italic, 500 |
| UI / labels / metadata | **Inter** | Google Fonts | 400, 500, 600 |

Caricamento: `<link rel="preconnect">` + `<link href="...&display=swap">`. Self-host opzionale se Lighthouse < 95.

### Palette

```css
:root {
  --bg:           #f6f1e8;  /* avorio caldo, base */
  --bg-secondary: #ede4d4;  /* sand, sezioni alternate */
  --paper:        #fcfaf6;  /* bianco caldo, card featured */
  --rule:         #d4c4a0;  /* divider sottile */
  --rule-dark:    #8c7a55;  /* divider strutturale */
  --accent:       #8c5a2b;  /* terracotta scura, italici accent */
  --accent-warm:  #b97a3c;  /* terracotta calda */
  --gold:         #c4a878;  /* oro ottone, numerazione progetti */
  --ink:          #1a1a1a;  /* testo primario */
  --ink-soft:     #5a5a5a;  /* testo secondario */
  --success:      #16a34a;  /* status dot "available" */
}
```

### Spacing & layout

- Container: `max-width: 1280px; padding: 0 56px` (desktop), `0 24px` (mobile)
- Vertical rhythm: 80px tra sezioni desktop, 56px mobile
- Grid: 12-col implicito via flexbox, no framework
- Border radius: solo su button (999px pill) e card featured (4px appena percettibile, mantiene look editoriale)

### Componenti chiave

- **Topbar**: brand mark sinistra (`RFD · Studio`), nav center, lang toggle pill destra. Bordo bottom 1px `--rule`.
- **Issue tag**: `Vol.01 · Edition 2026` + `Updated [data]` — segnale di freshness per crawler/LLM
- **Hero masthead**: titolo gigante a sinistra (font-size `clamp(64px, 9vw, 132px)`), colonna metadata destra separata da `border-left: 1px solid --rule`
- **Featured project card**: padding ampio, border `--rule`, badge "Featured · Open Source" in alto, layout asimmetrico
- **Project rows** (N°02-N°05): numerazione `N°` con Playfair italic gold, titolo Playfair, meta Inter
- **FAQ accordion**: aperto di default per crawler, chiuso/animato via JS — testo sempre nel DOM
- **CTA primary**: pill nero `--ink`, hover diventa `--accent`
- **CTA link**: text-only con border-bottom 1px

## 5. Sezioni del sito

### § 00 — Hero / Masthead

- **Pretitle**: `Portfolio · Vol.01` (Inter uppercase letterspaced)
- **H1**: "Raffaele / Francesco / *D'Amato*" su 3 righe, ultima riga in italico colore accent
- **Role line**: "AI Developer & Founder · Automation Builder"
- **Lede** (Playfair body, 22px): "Costruisco *chatbot*, *automazioni* e *dashboard* che riducono tempi operativi e restituiscono controllo sui dati. Output reali, non demo. Misurabili dal primo rilascio."
- **CTA**: `Scarica CV (PDF) →` (primary) + `Vedi i progetti` (link)
- **Right column metadata**: Status (con dot live verde), Stack principale, Featured project, Sede

### § 01 — About

Layout 2 colonne: testo sinistra (60%), pull-quote / quick facts destra (40%).

**Testo principale** (~150 parole, prima persona):

> Sono un AI Developer e Founder italiano. Costruisco strumenti pratici che uniscono intelligenza artificiale, automazioni e sviluppo full-stack. Lavoro su sistemi che riducono attività ripetitive, restituiscono controllo sui dati e accelerano decisioni operative.
>
> Mi sto iscrivendo all'Università di Informatica per consolidare le basi teoriche dietro a quello che già costruisco in produzione. Vengo da un percorso tecnico aeronautico — precisione, sistemi complessi, attenzione ai dettagli sono cose che porto nel codice.
>
> Lavoro in italiano (madrelingua) e inglese tecnico (documentazione AI/API). Italia, remote-first, aperto a collaborazioni concrete.

**Quick facts** (Inter, label uppercase + Playfair value):
- Based · Italia · Remote-first
- Languages · Italiano · English (B2 tecnico)
- Education · Università di Informatica (in iscrizione) · Istituto Tecnico Aeronautico
- Currently · Universal Form Compiler · MIT · TypeScript

### § 02 — Selected Work

**Featured (UFC)** — card grande dedicata con:
- Cover image (screenshot reale dell'estensione)
- Badge: `Featured · Open Source · MIT`
- Titolo Playfair: "Universal Form *Compiler*"
- Sottotitolo Inter: "Chrome Extension · TypeScript · 2026"
- Descrizione (~80 parole): "Estensione Chrome che compila automaticamente qualsiasi form web partendo dai tuoi dati personali. Multi-documento, anti-allucinazione, mapping semantico via OpenAI con guard rigorosi sui campi sensibili (IBAN, password, CVV). Vanilla TypeScript + Vite + Zod, niente framework UI. Architettura a 6 fasi con AI Pass 1+2 e validazione anti-hallucination."
- Stack badges: TypeScript · Vite · Zod · Mammoth · Vitest · OpenAI API
- Link: `Vedi su GitHub →` + `Leggi la README →`

**Progetti N°02-N°05** in righe editoriali numerate:

| N° | Titolo | Anno | Tag | Descrizione (1 frase) |
|----|--------|------|-----|----------------------|
| 02 | Chatbot *RDD Italia* | 2025 | Enterprise | Assistente AI integrato per clienti e documenti aziendali — Python · FastAPI · Supabase. |
| 03 | *AquaMind* AI | 2025 | SaaS | Dashboard interattiva con assistente AI e API esterne — live demo. |
| 04 | Gestionale *web* + Chatbot | 2025 | Enterprise | Login, dashboard clienti, aggiornamenti automatici — FastAPI · Supabase · SQL. |
| 05 | Dashboard *Clienti* RDD | 2024 | Internal | Monitoraggio progetti con auth e notifiche — Supabase Auth + DB. |

Ogni riga: `N°` (Playfair italic gold) · titolo (Playfair, accent in italico) · anno+tag (Inter uppercase letterspaced) · CTA `→` aperto al case study (per ora solo link al cliente o `#`).

### § 03 — Capabilities

4 cluster (skills + servizi unificati). Ogni cluster: titolo Playfair + paragrafo (~50 parole) + tech badges Inter.

1. **Chatbot & Assistenti AI** — Assistenti contestuali con retrieval documentale (RAG), risposte naturali su dati reali aziendali. *Stack: Python, LLM, vector DB, FastAPI.*
2. **Automazioni & Integrazioni** — Workflow n8n e custom per email, CRM, database, API. Eliminazione passaggi manuali, riduzione errori. *Stack: n8n, Python, REST, webhook.*
3. **Dashboard & Web App** — Piattaforme con login, gestione utenti, KPI tempo reale. Backend API + frontend reattivo. *Stack: FastAPI, Supabase, SQL, JS frontend.*
4. **AI Setup & Roadmap** — Discovery iniziale, priorità, roadmap tecnica, stima tempi. Per chi vuole partire ordinato. *Output: documento + prototipo.*

### § 04 — Approach

3 principi (vs 2 attuali). Ogni principio: titolo Playfair italic + claim breve + spiegazione + esempio concreto.

1. **Efficienza chirurgica** — *L'automazione non è magia, è ingegneria.* Elimino il superfluo per lasciare spazio al valore. Esempio: nella dashboard RDD, il chatbot ha sostituito 4 punti di contatto manuali con 1 conversazione strutturata.
2. **Intelligenza applicata** — *Non uso l'AI perché va di moda.* La uso quando risolve problemi che prima erano impossibili o troppo costosi. In Universal Form Compiler, l'anti-allucinazione è guard di sistema, non opzionale: l'AI non inventa email, telefoni o IBAN.
3. **Rilascio misurabile** — *Ogni progetto parte da un KPI.* Tempo risposta, ore risparmiate, errori ridotti. I report sono automatici e leggibili dal management.

### § 05 — FAQ (6 Q&A, GEO-optimized)

Ogni Q&A è dichiarativa, ~50-80 parole, citabile direttamente da LLM.

1. **Quanto dura un progetto tipo?** — Per chatbot o flusso n8n di complessità media: 2-4 settimane (discovery, prototipo, test su dati reali, rilascio). Per dashboard web complete: 4-8 settimane.
2. **Serve avere già un CRM o dati strutturati?** — No. Mappiamo insieme dati, fonti e API da integrare. Se hai CRM o help desk li collego, altrimenti propongo uno stack leggero (Supabase + FastAPI) da zero.
3. **Come si misura il ROI di un progetto AI?** — Imposto KPI all'inizio: tempi risposta, costi per ticket, conversioni, ore team risparmiate. Report automatici settimanali leggibili anche da non-tecnici.
4. **Lavori in remoto o on-site?** — Remote-first. Italia. Disponibile a sessioni on-site per discovery o kick-off, lavoro asincrono per il resto. Tools standard: Slack/Teams, Linear/Notion, Loom per demo.
5. **Quali tecnologie usi e perché?** — Python per backend AI/automazioni, TypeScript per frontend e tooling, FastAPI + Supabase come default stack veloce, n8n per orchestrazione workflow, OpenAI/Anthropic per LLM. Scelta di stack pragmatica, ottimizzata per velocità di rilascio.
6. **Posso vedere il tuo codice?** — Sì. Universal Form Compiler è open source su GitHub (MIT) — [github.com/raffaelefrancescodamato-ai/universal-form-compiler](https://github.com/raffaelefrancescodamato-ai/universal-form-compiler). Per progetti aziendali sotto NDA condivido architettura sintetica e demo.

### § 06 — Contact

- Email come hero element: `raffaelefrancesco.damato@gmail.com` in Playfair grande, accent
- Sub-text: "Scrivimi cosa vuoi migliorare. Ti rispondo con una proposta concreta su obiettivi, stack, tempi e prossimi passi."
- Social row: GitHub · LinkedIn · Instagram (Inter uppercase letterspaced)
- Footer minimalista: `© 2026 Raffaele Francesco D'Amato · All rights reserved · [llms.txt]`

## 6. SEO/GEO strategy completa

### Structured data (JSON-LD)

Inserire 4 blocchi `<script type="application/ld+json">` nel `<head>`:

**1. Person** (esteso vs attuale):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://raffaelefrancescodamato.it/#person",
  "name": "Raffaele Francesco D'Amato",
  "alternateName": "RFD",
  "jobTitle": "AI Developer & Founder",
  "description": "AI Developer italiano specializzato in chatbot AI, automazioni e dashboard web. Founder e creatore del progetto open source Universal Form Compiler.",
  "email": "mailto:raffaelefrancesco.damato@gmail.com",
  "url": "https://raffaelefrancescodamato.it/",
  "image": "https://raffaelefrancescodamato.it/assets/images/og-image.jpg",
  "sameAs": [
    "https://github.com/raffaelefrancescodamato-ai",
    "https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/",
    "https://www.instagram.com/_kekkodamato_/"
  ],
  "knowsAbout": [
    "Intelligenza Artificiale",
    "Large Language Models",
    "Retrieval Augmented Generation",
    "Chatbot AI",
    "Automazioni n8n",
    "FastAPI",
    "Supabase",
    "Python",
    "TypeScript",
    "Chrome Extensions",
    "OpenAI API",
    "Anthropic Claude API"
  ],
  "alumniOf": [
    {"@type": "EducationalOrganization", "name": "Università di Informatica"},
    {"@type": "EducationalOrganization", "name": "Istituto Tecnico Aeronautico"}
  ],
  "nationality": {"@type": "Country", "name": "Italy"},
  "workLocation": {"@type": "Country", "name": "Italy"}
}
```

**2. WebSite**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://raffaelefrancescodamato.it/#website",
  "url": "https://raffaelefrancescodamato.it/",
  "name": "Raffaele Francesco D'Amato — AI Developer & Founder",
  "inLanguage": ["it", "en"],
  "publisher": {"@id": "https://raffaelefrancescodamato.it/#person"}
}
```

**3. ItemList** (Selected Work) — 5 elementi `CreativeWork` con `name`, `description`, `programmingLanguage`, `codeRepository` (per UFC), `url`.

**4. FAQPage** — tutte le 6 Q&A in `mainEntity`.

### `llms.txt`

File markdown alla root, ~80 righe, con:
- Identità (chi è Raffaele, in 1 paragrafo)
- Cosa fa (3-4 capability con esempi)
- Progetti principali (lista con link)
- Stack tecnico
- Come contattare
- Link al sito completo, GitHub, CV

Esempio struttura:
```
# Raffaele Francesco D'Amato

> AI Developer & Founder italiano. Costruisco chatbot AI, automazioni e dashboard web orientati a impatto misurabile.

## About
[paragrafo bio]

## Selected Projects
- [Universal Form Compiler](https://github.com/...) — Chrome Extension TypeScript open source...
- [AquaMind AI](https://aquamind-ai.lovable.app/) — ...
[etc.]

## Capabilities
- Chatbot & AI Assistants
- n8n & API Automations
- Dashboards & Web Apps
- AI Setup & Roadmap

## Stack
Python, TypeScript, FastAPI, Supabase, n8n, OpenAI, Anthropic.

## Contact
Email: raffaelefrancesco.damato@gmail.com
GitHub: @raffaelefrancescodamato-ai
LinkedIn: ...
```

### `robots.txt` esteso

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

Sitemap: https://raffaelefrancescodamato.it/sitemap.xml
```

### `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://raffaelefrancescodamato.it/</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://raffaelefrancescodamato.it/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://raffaelefrancescodamato.it/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://raffaelefrancescodamato.it/"/>
  </url>
  <url>
    <loc>https://raffaelefrancescodamato.it/en/</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://raffaelefrancescodamato.it/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://raffaelefrancescodamato.it/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://raffaelefrancescodamato.it/"/>
  </url>
</urlset>
```

### Meta strategy IT

```html
<title>Raffaele Francesco D'Amato — AI Developer & Founder | Chatbot · Automazioni · Dashboard</title>
<meta name="description" content="AI Developer italiano. Costruisco chatbot AI, automazioni n8n e dashboard web con impatto misurabile. Universal Form Compiler open source. Portfolio e CV.">
<link rel="canonical" href="https://raffaelefrancescodamato.it/">
<link rel="alternate" hreflang="it" href="https://raffaelefrancescodamato.it/">
<link rel="alternate" hreflang="en" href="https://raffaelefrancescodamato.it/en/">
<link rel="alternate" hreflang="x-default" href="https://raffaelefrancescodamato.it/">

<meta property="og:type" content="profile">
<meta property="og:locale" content="it_IT">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://raffaelefrancescodamato.it/">
<meta property="og:image" content="https://raffaelefrancescodamato.it/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="profile:first_name" content="Raffaele Francesco">
<meta property="profile:last_name" content="D'Amato">
```

### Meta strategy EN (in `/en/index.html`)

Specchio simmetrico con `og:locale=en_US`, alternate hreflang reciproco, canonical autoreferenziale, JSON-LD con `inLanguage=en`.

## 7. Vanilla JS — `assets/main.js`

Funzionalità minime, < 5KB minified:

1. **FAQ accordion** — apri/chiudi singolo, testo sempre nel DOM (per crawler)
2. **Smooth scroll** — su click di anchor link interni
3. **Scroll fade-in** — IntersectionObserver per opacizzare sezioni in ingresso (rispetta `prefers-reduced-motion`)
4. **Lang toggle persist** — al click su EN/IT, redirect cross-page (no AJAX magic) + `localStorage` per ricordare scelta dopo refresh

Niente più dipendenze. Niente Vite. Niente bundling.

## 8. Performance & Accessibility

- **Lighthouse target**: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Immagini: WebP con fallback PNG, attributo `loading="lazy"` su tutto sotto la fold, `width`/`height` espliciti per evitare CLS
- Font loading: `display=swap` per evitare FOIT
- CSS critico inline nel `<head>` (~3KB), resto async via `<link>`
- Reduced motion: tutte le animazioni rispettano `@media (prefers-reduced-motion: reduce)`
- WCAG AA: contrasto verificato (testo `--ink` su `--bg` = 12.6:1, accent su bg = 5.9:1), focus state custom su tutti gli interattivi, skip-to-content link, alt text su tutte le immagini
- Heading hierarchy strict: 1 H1 per pagina, H2 per sezioni, H3 per sub-blocchi

## 9. Out of scope

Esplicitamente **non** inclusi nel rebuild:

- Blog/Journal section (rimandato a fase successiva — è grande commitment di scrittura continua)
- Now page / Currently building dynamic
- Calendly o booking integration (solo email come contatto)
- Newsletter signup
- Analytics avanzato (rimane Google Search Console verification, no GA4 senza consenso)
- Cookie banner / GDPR notice (sito senza cookie persistenti tranne `localStorage` per lingua → potrebbe non servire banner, da verificare in implementation)
- Dark mode toggle (palette è già caldo/avorio editoriale — un dark mode sarebbe estraneo)
- Animazioni avanzate WebGL/Canvas (non coerenti con direzione editoriale)
- CMS o backend (sito 100% statico)
- Form di contatto interattivo (solo `mailto:`)

## 10. Implementation order (per fase implementation plan)

1. Riscrivere `assets/styles.css` da zero — design system completo (~600 righe)
2. Riscrivere `index.html` IT con tutte 7 sezioni + JSON-LD completo
3. Tradurre e creare `en/index.html`
4. Scrivere `llms.txt`
5. Aggiornare `robots.txt` (allow espliciti AI bots)
6. Aggiornare `sitemap.xml` (entrambe le lingue + hreflang)
7. Creare `assets/main.js` (FAQ accordion + scroll observer + smooth scroll)
8. Generare/posizionare immagini cover: `og-image.jpg`, `og-image-en.jpg`, `ufc-cover.png`, `aquamind-cover.png`
9. Eliminare file morti (`app.js`, `AquaMind.png`, `rdditalia.png` se sostituito da SVG, `.DS_Store`)
10. Validazione: Lighthouse, [schema.org validator](https://validator.schema.org/), [hreflang checker](https://app.merj.com/tools/hreflang), test reale rendering social card (LinkedIn/Twitter/WhatsApp preview)
11. Verifica visiva mobile/tablet/desktop su breakpoint chiave

## 11. Open questions / da decidere in implementation

- **Cover image UFC**: serve uno screenshot reale dell'estensione in azione. Da generare manualmente o ricavare da repo (controllo se ci sono asset). Fallback: mockup illustrato.
- **Cover image AquaMind**: il file attuale è 775KB, da ottimizzare a < 100KB WebP.
- **Logo RDD Italia**: il `rdditalia.png` attuale (5KB) è già piccolo. Mantengo PNG o cerco SVG.
- **Self-host fonts**: decisione finale dopo primo Lighthouse run. Se < 95, switch a self-host.
- **og-image generation**: usare Figma/Canva o generare programmaticamente via canvas? Decisione in implementation.
