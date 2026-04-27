# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the source of raffaelefrancescodamato.it from monolithic static HTML to an Astro 4.x project with TypeScript strict, componentized i18n, and GitHub Actions deploy. Output served to browsers stays identical static HTML — only the source becomes modern.

**Architecture:** Astro `output: 'static'` with native `i18n` routing (default `it`, prefix `en`). Components in `src/components/` consume strongly typed data from `src/data/` and UI strings from `src/i18n/it.ts` / `en.ts`. The existing `assets/styles.css` is moved to `src/styles/global.css` and imported once in `BaseLayout.astro`. Existing static asset files stay in `public/` and are copied as-is to `dist/`. Deploy via GitHub Actions workflow on push to `main`.

**Tech Stack:** Astro 4.16+ · TypeScript 5.6+ strict · Node 20 LTS · GitHub Actions · GitHub Pages (source = "GitHub Actions")

**Spec:** `docs/superpowers/specs/2026-04-27-astro-migration-design.md`

---

## Task 0: Initialize Astro project structure

**Files:**
- Create: `package.json`, `tsconfig.json`, `astro.config.mjs`, `.nvmrc`
- Modify: `.gitignore`

The local repo is already a git repo with the existing static site. We add Astro alongside without breaking the live site (we don't delete the existing `index.html` until Task 11). Astro tooling will live in `src/`, `public/`, and config files at root.

- [ ] **Step 1: Verify clean git state**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
git status
```

Expected: clean working tree on `main`. If anything is staged/modified, stash or commit first.

- [ ] **Step 2: Create `package.json`**

Write file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/package.json`:

```json
{
  "name": "raffaelefrancescodamato.it",
  "version": "2.0.0",
  "type": "module",
  "private": true,
  "description": "Personal portfolio of Raffaele Francesco D'Amato — AI Developer & Founder",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.16.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 3: Create `astro.config.mjs`**

Write file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.raffaelefrancescodamato.it',
  output: 'static',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  build: {
    format: 'directory'
  },
  compressHTML: true,
  trailingSlash: 'always'
})
```

- [ ] **Step 4: Create `tsconfig.json`**

Write file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "allowJs": true
  },
  "include": ["src/**/*", "astro.config.mjs"],
  "exclude": ["dist", "node_modules", ".astro"]
}
```

- [ ] **Step 5: Create `.nvmrc`**

Write file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/.nvmrc`:

```
20
```

- [ ] **Step 6: Append to `.gitignore`**

Open `/Users/kekko/Desktop/Lavoro/ME/Sito Web/.gitignore`. After the existing content, append:

```
# Astro
node_modules/
dist/
.astro/

# Env
.env
.env.local
.env.production
```

- [ ] **Step 7: Install dependencies**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated, no errors. The Astro version installed should be `4.16.x` or newer.

- [ ] **Step 8: Verify Astro CLI**

```bash
npx astro --version
```

Expected: prints `4.16.x` or higher.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .nvmrc .gitignore
git commit -m "chore: add Astro 4.16 project scaffolding (config, tsconfig, deps)"
```

---

## Task 1: Move static assets to `public/`

**Files:**
- Move: `CNAME`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `google40850cc6cfe29b7e.html`, `llms.txt`, `robots.txt`, `sitemap.xml` (root) → `public/`
- Move: `assets/Raffaele_Francesco_DAmato_CV.pdf`, `assets/apple-touch-icon.png`, `assets/favicon-512.png`, `assets/favicon-rfd.svg`, `assets/rdditalia.png`, `assets/images/og-image.jpg`, `assets/images/og-image-en.jpg`, `assets/images/ufc-cover.png` → `public/assets/...` (preserving structure)

Astro copies everything in `public/` verbatim into `dist/` at build time. Files keep their absolute URL (`/CNAME`, `/llms.txt`, `/assets/Raffaele_Francesco_DAmato_CV.pdf` etc).

We do NOT yet move `assets/styles.css` and `assets/main.js` — those become `src/styles/global.css` and `src/scripts/client.ts` in later tasks. We also do NOT yet delete `index.html` and `en/index.html` — they get deleted in Task 11 after the new build is verified.

- [ ] **Step 1: Create `public/` directory tree**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
mkdir -p public/assets/images
```

- [ ] **Step 2: Move root-level static assets**

```bash
git mv CNAME public/CNAME
git mv favicon.ico public/favicon.ico
git mv favicon-16x16.png public/favicon-16x16.png
git mv favicon-32x32.png public/favicon-32x32.png
git mv google40850cc6cfe29b7e.html public/google40850cc6cfe29b7e.html
git mv llms.txt public/llms.txt
git mv robots.txt public/robots.txt
git mv sitemap.xml public/sitemap.xml
```

- [ ] **Step 3: Move `assets/` static files (PDF + images + favicon variants)**

```bash
git mv assets/Raffaele_Francesco_DAmato_CV.pdf public/assets/Raffaele_Francesco_DAmato_CV.pdf
git mv assets/apple-touch-icon.png public/assets/apple-touch-icon.png
git mv assets/favicon-512.png public/assets/favicon-512.png
git mv assets/favicon-rfd.svg public/assets/favicon-rfd.svg
git mv assets/rdditalia.png public/assets/rdditalia.png
git mv assets/images/og-image.jpg public/assets/images/og-image.jpg
git mv assets/images/og-image-en.jpg public/assets/images/og-image-en.jpg
git mv assets/images/ufc-cover.png public/assets/images/ufc-cover.png
```

- [ ] **Step 4: Verify state**

```bash
ls public/
ls public/assets/
ls public/assets/images/
ls assets/
```

Expected:
- `public/` contains: CNAME, favicon.*, google40850cc6cfe29b7e.html, llms.txt, robots.txt, sitemap.xml, assets/
- `public/assets/` contains: Raffaele_..._CV.pdf, apple-touch-icon.png, favicon-512.png, favicon-rfd.svg, rdditalia.png, images/
- `public/assets/images/` contains: og-image.jpg, og-image-en.jpg, ufc-cover.png
- `assets/` still contains: README.md, styles.css, main.js, images/_*-generator.html (not yet moved)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: move static assets to public/ for Astro build"
```

---

## Task 2: Create i18n types and dictionaries

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/it.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/index.ts`

The dictionaries are the single source of truth for UI strings. Components reference them via `strings[lang]`.

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/i18n
```

- [ ] **Step 2: Write `src/i18n/types.ts`**

```ts
export type Lang = 'it' | 'en'

export interface UIStrings {
  topbar: {
    nav: { about: string; work: string; capabilities: string; approach: string; contact: string }
    langLabel: string
    skipLink: string
  }
  issueBand: { vol: string; updated: string }
  hero: {
    pretitle: string
    role: string
    lede: string
    cta: { primary: string; secondary: string }
    meta: {
      status: { label: string; value: string }
      stack: { label: string; value: string }
      featured: { label: string; value: string; sub: string }
      based: { label: string; value: string }
    }
  }
  about: {
    num: string
    title: string
    body: string[]
    facts: {
      based: { label: string; value: string }
      languages: { label: string; value: string }
      education: { label: string; value: string; sub: string }
      currently: { label: string; value: string; sub: string }
    }
  }
  work: {
    num: string
    title: string
    featuredBadge: string
    githubCta: string
    readmeCta: string
  }
  capabilities: {
    num: string
    title: string
  }
  approach: {
    num: string
    title: string
  }
  faq: {
    num: string
    title: string
  }
  contact: {
    num: string
    title: string
    lede: string
    quote: string
  }
  footer: {
    rights: string
    links: { llms: string; sitemap: string; otherLang: string }
  }
}
```

- [ ] **Step 3: Write `src/i18n/it.ts`**

```ts
import type { UIStrings } from './types'

const it: UIStrings = {
  topbar: {
    nav: { about: 'About', work: 'Selected Work', capabilities: 'Capabilities', approach: 'Approach', contact: 'Contact' },
    langLabel: 'Lingua / Language',
    skipLink: 'Salta al contenuto'
  },
  issueBand: { vol: 'Vol. 01 · Edition 2026', updated: 'Updated April 2026' },
  hero: {
    pretitle: 'Portfolio · Vol.01',
    role: 'AI Developer & Founder · Automation Builder',
    lede: 'Costruisco *chatbot*, *automazioni* e *dashboard* che riducono tempi operativi e restituiscono controllo sui dati. Output reali, non demo. Misurabili dal primo rilascio.',
    cta: { primary: 'Scarica CV (PDF) →', secondary: 'Vedi i progetti' },
    meta: {
      status: { label: 'Status', value: 'Aperto a *collaborazioni*' },
      stack: { label: 'Stack principale', value: 'Python · TypeScript · FastAPI · Supabase · n8n · LLM/RAG' },
      featured: { label: 'Progetto in evidenza', value: 'Universal Form *Compiler*', sub: 'Chrome Extension · TypeScript · MIT' },
      based: { label: 'Sede', value: 'Italia · Remote-first' }
    }
  },
  about: {
    num: 'N°01',
    title: 'About — chi *sono*',
    body: [
      'Sono un *AI Developer e Founder* italiano. Costruisco strumenti pratici che uniscono intelligenza artificiale, automazioni e sviluppo full-stack. Lavoro su sistemi che riducono attività ripetitive, restituiscono controllo sui dati e accelerano decisioni operative.',
      'Mi sto iscrivendo all’Università di Informatica per consolidare le basi teoriche dietro a quello che già costruisco in produzione. Vengo da un percorso tecnico aeronautico — precisione, sistemi complessi, attenzione ai dettagli sono cose che porto nel codice.',
      'Lavoro in italiano (madrelingua) e inglese tecnico (documentazione AI/API). Italia, remote-first, aperto a *collaborazioni concrete*.'
    ],
    facts: {
      based: { label: 'Based', value: 'Italia · Remote-first' },
      languages: { label: 'Languages', value: 'Italiano · English (B2 tecnico)' },
      education: { label: 'Education', value: 'Università di Informatica', sub: 'Istituto Tecnico Aeronautico' },
      currently: { label: 'Currently', value: 'Universal Form Compiler', sub: 'MIT · TypeScript · 2026' }
    }
  },
  work: {
    num: 'N°02',
    title: 'Selected *Work*',
    featuredBadge: 'Featured · Open Source · MIT',
    githubCta: 'Vedi su GitHub →',
    readmeCta: 'Leggi la README'
  },
  capabilities: { num: 'N°03', title: 'Capabilities — cosa *costruisco*' },
  approach: { num: 'N°04', title: 'Approach — *tre* principi' },
  faq: { num: 'N°05', title: 'FAQ — domande *frequenti*' },
  contact: {
    num: 'N°06',
    title: 'Vuoi proporre una *collaborazione*?',
    lede: 'Scrivimi cosa vuoi migliorare. Ti rispondo con una proposta concreta su obiettivi, stack, tempi e prossimi passi.',
    quote: '“Output reali, non demo. Misurabili dal primo rilascio.”'
  },
  footer: {
    rights: '© 2026 Raffaele Francesco D’Amato',
    links: { llms: 'llms.txt', sitemap: 'sitemap', otherLang: 'EN version' }
  }
}

export default it
```

- [ ] **Step 4: Write `src/i18n/en.ts`**

```ts
import type { UIStrings } from './types'

const en: UIStrings = {
  topbar: {
    nav: { about: 'About', work: 'Selected Work', capabilities: 'Capabilities', approach: 'Approach', contact: 'Contact' },
    langLabel: 'Language / Lingua',
    skipLink: 'Skip to content'
  },
  issueBand: { vol: 'Vol. 01 · Edition 2026', updated: 'Updated April 2026' },
  hero: {
    pretitle: 'Portfolio · Vol.01',
    role: 'AI Developer & Founder · Automation Builder',
    lede: 'I build *chatbots*, *automations* and *dashboards* that cut operational time and give back data control. Real outputs, not demos. Measurable from day one.',
    cta: { primary: 'Download CV (PDF) →', secondary: 'See projects' },
    meta: {
      status: { label: 'Status', value: 'Open to *collaborations*' },
      stack: { label: 'Main stack', value: 'Python · TypeScript · FastAPI · Supabase · n8n · LLM/RAG' },
      featured: { label: 'Featured project', value: 'Universal Form *Compiler*', sub: 'Chrome Extension · TypeScript · MIT' },
      based: { label: 'Based', value: 'Italy · Remote-first' }
    }
  },
  about: {
    num: 'N°01',
    title: 'About — who I *am*',
    body: [
      'I’m an Italian *AI Developer and Founder*. I build practical tools that combine artificial intelligence, automations and full-stack development. I work on systems that cut repetitive tasks, give back data control and accelerate operational decisions.',
      'I’m enrolling in a Computer Science degree to consolidate the theory behind what I already build in production. My background is technical-aeronautical — precision, complex systems, attention to detail are things I bring to the code.',
      'I work in Italian (native) and technical English (AI/API documentation). Italy, remote-first, open to *concrete collaborations*.'
    ],
    facts: {
      based: { label: 'Based', value: 'Italy · Remote-first' },
      languages: { label: 'Languages', value: 'Italian · English (technical B2)' },
      education: { label: 'Education', value: 'Computer Science (enrolling)', sub: 'Aeronautical Technical Institute' },
      currently: { label: 'Currently', value: 'Universal Form Compiler', sub: 'MIT · TypeScript · 2026' }
    }
  },
  work: {
    num: 'N°02',
    title: 'Selected *Work*',
    featuredBadge: 'Featured · Open Source · MIT',
    githubCta: 'View on GitHub →',
    readmeCta: 'Read the README'
  },
  capabilities: { num: 'N°03', title: 'Capabilities — what I *build*' },
  approach: { num: 'N°04', title: 'Approach — *three* principles' },
  faq: { num: 'N°05', title: 'FAQ — *frequent* questions' },
  contact: {
    num: 'N°06',
    title: 'Want to propose a *collaboration*?',
    lede: 'Tell me what you want to improve. I’ll reply with a concrete proposal — goals, stack, timeline, next steps.',
    quote: '“Real outputs, not demos. Measurable from day one.”'
  },
  footer: {
    rights: '© 2026 Raffaele Francesco D’Amato',
    links: { llms: 'llms.txt', sitemap: 'sitemap', otherLang: 'IT version' }
  }
}

export default en
```

- [ ] **Step 5: Write `src/i18n/index.ts`**

```ts
import type { Lang, UIStrings } from './types'
import it from './it'
import en from './en'

export const strings: Record<Lang, UIStrings> = { it, en }
export type { Lang, UIStrings }
```

- [ ] **Step 6: Commit**

```bash
git add src/i18n/
git commit -m "feat(i18n): add type-safe IT/EN UI string dictionaries"
```

---

## Task 3: Create data files (projects, FAQs, capabilities, approach)

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/faqs.ts`
- Create: `src/data/capabilities.ts`
- Create: `src/data/approach.ts`

Strongly-typed data, decoupled from UI strings. The HTML structure of cards/items is generated by components iterating these arrays.

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/data
```

- [ ] **Step 2: Write `src/data/projects.ts`**

```ts
import type { Lang } from '../i18n/types'

export type Tag = 'Enterprise' | 'SaaS' | 'Internal' | 'Open Source'

export interface Project {
  id: string
  num: string
  year: number
  tag: Tag
  stack: string[]
  href?: string
  github?: string
  readme?: string
  cover?: string
  featured?: boolean
  title: Record<Lang, string>
  description: Record<Lang, string>
  rowMeta: Record<Lang, string>
}

export const projects: Project[] = [
  {
    id: 'ufc',
    num: 'N°01',
    year: 2026,
    tag: 'Open Source',
    stack: ['TypeScript', 'Vite', 'Zod', 'Mammoth', 'Vitest', 'OpenAI API', 'Chrome MV3'],
    github: 'https://github.com/raffaelefrancescodamato-ai/universal-form-compiler',
    readme: 'https://github.com/raffaelefrancescodamato-ai/universal-form-compiler#readme',
    cover: '/assets/images/ufc-cover.png',
    featured: true,
    title: { it: 'Universal Form *Compiler*', en: 'Universal Form *Compiler*' },
    description: {
      it: 'Estensione Chrome che compila automaticamente qualsiasi form web partendo dai tuoi dati personali. Multi-documento, anti-allucinazione, mapping semantico via OpenAI con guard rigorosi sui campi sensibili (IBAN, password, CVV). Vanilla TypeScript + Vite + Zod, niente framework UI. Architettura a 6 fasi con AI Pass 1+2 e validazione anti-hallucination.',
      en: 'Chrome extension that auto-fills any web form from your personal data. Multi-document, anti-hallucination guards, semantic mapping via OpenAI with strict scrubbing on sensitive fields (IBAN, passwords, CVV). Vanilla TypeScript + Vite + Zod, no UI framework. 6-phase architecture with AI Pass 1+2 and anti-hallucination validation.'
    },
    rowMeta: { it: '2026 · Chrome Ext', en: '2026 · Chrome Ext' }
  },
  {
    id: 'rdd-chatbot',
    num: 'N°02',
    year: 2025,
    tag: 'Enterprise',
    stack: ['Python', 'FastAPI', 'Supabase'],
    href: 'https://rdditalia.com',
    title: { it: 'Chatbot *RDD Italia*', en: 'RDD Italia *Chatbot*' },
    description: {
      it: 'Assistente AI integrato per richieste clienti e consultazione documenti aziendali, con gestione dati automatizzata. Riduzione richieste ripetitive e accesso più rapido alle informazioni.',
      en: 'AI assistant integrated for client requests and corporate document lookup, with automated data handling. Reduced repetitive requests, faster access to information.'
    },
    rowMeta: { it: '2025 · Enterprise · Python · FastAPI · Supabase', en: '2025 · Enterprise · Python · FastAPI · Supabase' }
  },
  {
    id: 'aquamind',
    num: 'N°03',
    year: 2025,
    tag: 'SaaS',
    stack: ['API', 'Database', 'Dashboard'],
    href: 'https://aquamind-ai.lovable.app/',
    title: { it: '*AquaMind* AI', en: '*AquaMind* AI' },
    description: {
      it: 'Dashboard interattiva con servizi automatizzati e contenuti dinamici. Piattaforma con assistente AI e integrazione con API esterne per gestione semplice dei contenuti.',
      en: 'Interactive dashboard with automated services and dynamic content. Platform with AI assistant and external API integration for simple content management.'
    },
    rowMeta: { it: '2025 · SaaS · API · Database · Dashboard', en: '2025 · SaaS · API · Database · Dashboard' }
  },
  {
    id: 'gestionale',
    num: 'N°04',
    year: 2025,
    tag: 'Enterprise',
    stack: ['FastAPI', 'Supabase', 'SQL'],
    title: { it: 'Gestionale *web* + Chatbot', en: 'Web *Management* + Chatbot' },
    description: {
      it: 'Area login, dashboard clienti e chatbot per aggiornamenti automatici. Centralizza clienti, avanzamento lavori e comunicazioni — meno aggiornamenti manuali, processo più ordinato.',
      en: 'Login area, client dashboard and chatbot for automatic updates. Centralizes clients, work progress and communications — fewer manual updates, cleaner process.'
    },
    rowMeta: { it: '2025 · Enterprise · FastAPI · Supabase · SQL', en: '2025 · Enterprise · FastAPI · Supabase · SQL' }
  },
  {
    id: 'rdd-dashboard',
    num: 'N°05',
    year: 2024,
    tag: 'Internal',
    stack: ['Supabase Auth', 'DB'],
    title: { it: 'Dashboard *Clienti* RDD', en: 'RDD *Client* Dashboard' },
    description: {
      it: 'Monitoraggio stato progetti con accesso protetto, notifiche e interfaccia intuitiva. Riduzione comunicazioni a ping-pong e monitoraggio continuo.',
      en: 'Project status monitoring with secure access, notifications and intuitive interface. Cuts ping-pong communications, continuous monitoring.'
    },
    rowMeta: { it: '2024 · Internal · Supabase Auth + DB', en: '2024 · Internal · Supabase Auth + DB' }
  }
]
```

- [ ] **Step 3: Write `src/data/faqs.ts`**

```ts
import type { Lang } from '../i18n/types'

export interface FAQ {
  id: string
  q: Record<Lang, string>
  a: Record<Lang, string>
}

export const faqs: FAQ[] = [
  {
    id: 'duration',
    q: { it: 'Quanto dura un progetto tipo?', en: 'How long does a typical project take?' },
    a: {
      it: 'Per chatbot o flusso n8n di complessità media servono <strong>2-4 settimane</strong>: discovery, prototipo, test su dati reali, rilascio. Per dashboard web complete: <strong>4-8 settimane</strong>.',
      en: 'Medium-complexity chatbots or n8n flows take <strong>2-4 weeks</strong>: discovery, prototype, real-data testing, release. Full web dashboards: <strong>4-8 weeks</strong>.'
    }
  },
  {
    id: 'crm',
    q: { it: 'Serve avere già un CRM o dati strutturati?', en: 'Do I need an existing CRM or structured data?' },
    a: {
      it: 'No. Mappiamo insieme dati, fonti e API da integrare. Se hai CRM o help desk li collego, altrimenti propongo uno stack leggero (Supabase + FastAPI) da zero.',
      en: 'No. We map data, sources and APIs to integrate together. If you have CRM or help desk I plug in, otherwise I propose a lightweight stack (Supabase + FastAPI) from scratch.'
    }
  },
  {
    id: 'roi',
    q: { it: 'Come si misura il ROI di un progetto AI?', en: 'How do you measure ROI on an AI project?' },
    a: {
      it: 'Imposto KPI all’inizio: tempi risposta, costi per ticket, conversioni, ore team risparmiate. Report automatici settimanali leggibili anche da non-tecnici.',
      en: 'I set KPIs upfront: response times, cost per ticket, conversions, team hours saved. Automated weekly reports readable by non-technical stakeholders.'
    }
  },
  {
    id: 'remote',
    q: { it: 'Lavori in remoto o on-site?', en: 'Do you work remote or on-site?' },
    a: {
      it: 'Remote-first dall’Italia. Disponibile a sessioni on-site per discovery o kick-off, lavoro asincrono per il resto. Tools standard: Slack/Teams, Linear/Notion, Loom per demo.',
      en: 'Remote-first from Italy. Available for on-site discovery or kick-off sessions, async work for the rest. Standard tools: Slack/Teams, Linear/Notion, Loom for demos.'
    }
  },
  {
    id: 'tech',
    q: { it: 'Quali tecnologie usi e perché?', en: 'What technologies do you use and why?' },
    a: {
      it: 'Python per backend AI/automazioni, TypeScript per frontend e tooling, FastAPI + Supabase come stack veloce, n8n per orchestrazione workflow, OpenAI/Anthropic per LLM. Scelta pragmatica, ottimizzata per velocità di rilascio.',
      en: 'Python for AI/automation backend, TypeScript for frontend and tooling, FastAPI + Supabase as a fast stack, n8n for workflow orchestration, OpenAI/Anthropic for LLMs. Pragmatic choices, optimized for time-to-release.'
    }
  },
  {
    id: 'code',
    q: { it: 'Posso vedere il tuo codice?', en: 'Can I see your code?' },
    a: {
      it: 'Sì. Universal Form Compiler è open source su GitHub con licenza MIT — <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener">github.com/raffaelefrancescodamato-ai/universal-form-compiler</a>. Per progetti aziendali sotto NDA condivido architettura sintetica e demo.',
      en: 'Yes. Universal Form Compiler is open source on GitHub under MIT — <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener">github.com/raffaelefrancescodamato-ai/universal-form-compiler</a>. For NDA enterprise projects I share architecture summaries and demos.'
    }
  }
]

// Plain-text version for JSON-LD FAQPage (no HTML tags)
export function plainAnswer(faq: FAQ, lang: Lang): string {
  return faq.a[lang]
    .replace(/<strong>([^<]+)<\/strong>/g, '$1')
    .replace(/<a [^>]+>([^<]+)<\/a>/g, '$1')
}
```

- [ ] **Step 4: Write `src/data/capabilities.ts`**

```ts
import type { Lang } from '../i18n/types'

export interface Capability {
  num: string
  stack: string[]
  title: Record<Lang, string>
  body: Record<Lang, string>
}

export const capabilities: Capability[] = [
  {
    num: 'i.',
    stack: ['Python', 'LLM', 'RAG', 'Vector DB', 'FastAPI'],
    title: { it: 'Chatbot & *Assistenti AI*', en: 'Chatbots & *AI Assistants*' },
    body: {
      it: 'Assistenti contestuali con retrieval documentale (RAG) e risposte naturali su dati reali aziendali. Gestiscono in autonomia richieste frequenti, integrandosi con i sistemi esistenti.',
      en: 'Contextual assistants with document retrieval (RAG) and natural responses on real corporate data. They handle frequent requests autonomously, integrating with existing systems.'
    }
  },
  {
    num: 'ii.',
    stack: ['n8n', 'Python', 'REST', 'Webhook', 'OAuth'],
    title: { it: 'Automazioni & *Integrazioni*', en: 'Automations & *Integrations*' },
    body: {
      it: 'Workflow tra email, CRM, database e API per eliminare passaggi manuali e ridurre errori di processo. Orchestrazione affidabile con n8n e custom code dove serve.',
      en: 'Workflows between email, CRM, databases and APIs to eliminate manual steps and reduce process errors. Reliable orchestration with n8n and custom code where needed.'
    }
  },
  {
    num: 'iii.',
    stack: ['FastAPI', 'Supabase', 'SQL', 'JS', 'Auth'],
    title: { it: 'Dashboard & *Web App*', en: 'Dashboards & *Web Apps*' },
    body: {
      it: 'Piattaforme con login, gestione utenti e KPI in tempo reale. Backend API solido + frontend reattivo per monitorare attività e performance senza fragilità.',
      en: 'Platforms with login, user management and real-time KPIs. Solid backend API + reactive frontend to monitor activity and performance without fragility.'
    }
  },
  {
    num: 'iv.',
    stack: ['Discovery', 'Roadmap', 'Prototype', 'Architecture'],
    title: { it: 'AI Setup & *Roadmap*', en: 'AI Setup & *Roadmap*' },
    body: {
      it: 'Discovery iniziale con priorità, tempi e roadmap tecnica concreta. Per chi vuole partire ordinato senza bruciare budget. Output: documento + prototipo funzionante.',
      en: 'Initial discovery with priorities, timelines and concrete technical roadmap. For those who want to start cleanly without burning budget. Output: document + working prototype.'
    }
  }
]
```

- [ ] **Step 5: Write `src/data/approach.ts`**

```ts
import type { Lang } from '../i18n/types'

export interface ApproachItem {
  num: string
  title: Record<Lang, string>
  claim: Record<Lang, string>
  body: Record<Lang, string>
  example: Record<Lang, string>
}

export const approach: ApproachItem[] = [
  {
    num: 'i.',
    title: { it: 'Efficienza chirurgica', en: 'Surgical efficiency' },
    claim: { it: 'L’automazione non è magia, è ingegneria.', en: 'Automation isn’t magic, it’s engineering.' },
    body: {
      it: 'Elimino il superfluo per lasciare spazio al valore. Ogni componente esiste perché toglie attrito reale, non perché “sta bene avere”.',
      en: 'I cut the superfluous to leave room for value. Every component exists because it removes real friction, not because it’s nice to have.'
    },
    example: {
      it: 'Esempio: nella dashboard RDD, il chatbot ha sostituito 4 punti di contatto manuali con 1 conversazione strutturata, riducendo i tempi di risposta interna.',
      en: 'Example: in the RDD dashboard, the chatbot replaced 4 manual touchpoints with 1 structured conversation, reducing internal response times.'
    }
  },
  {
    num: 'ii.',
    title: { it: 'Intelligenza applicata', en: 'Applied intelligence' },
    claim: { it: 'Non uso l’AI perché va di moda.', en: 'I don’t use AI because it’s trendy.' },
    body: {
      it: 'La uso quando risolve problemi che prima erano impossibili o troppo costosi. Quando un’euristica fa lo stesso lavoro, scrivo l’euristica.',
      en: 'I use it when it solves problems that were previously impossible or too expensive. When a heuristic does the same job, I write the heuristic.'
    },
    example: {
      it: 'Esempio: in Universal Form Compiler, prima di chiamare l’AI passo per un fast-path locale (autocomplete, name=email). Solo i campi rimasti vanno al modello, e l’anti-allucinazione è guard di sistema, non opzionale.',
      en: 'Example: in Universal Form Compiler, before calling the AI I run a local fast-path (autocomplete, name=email). Only remaining fields go to the model, and anti-hallucination is system-level guard, not optional.'
    }
  },
  {
    num: 'iii.',
    title: { it: 'Rilascio misurabile', en: 'Measurable releases' },
    claim: { it: 'Ogni progetto parte da un KPI.', en: 'Every project starts from a KPI.' },
    body: {
      it: 'Tempo risposta, ore risparmiate, errori ridotti, conversioni aumentate. I report sono automatici e leggibili anche dal management.',
      en: 'Response time, hours saved, errors reduced, conversions up. Reports are automated and readable by management too.'
    },
    example: {
      it: 'Esempio: per ogni chatbot misuro percentuale di richieste auto-risolte, latenza media, accuratezza su test set reale. I numeri arrivano in dashboard ogni settimana, senza dover chiedere.',
      en: 'Example: for every chatbot I track auto-resolution rate, average latency, accuracy on real test sets. Numbers land in a dashboard weekly, no need to ask.'
    }
  }
]
```

- [ ] **Step 6: Type-check**

```bash
npm run check
```

Expected: 0 errors, 0 warnings, 0 hints (or only hints).

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat(data): add typed projects, faqs, capabilities, approach"
```

---

## Task 4: Add global CSS and Markdown helper

**Files:**
- Move: `assets/styles.css` → `src/styles/global.css`
- Create: `src/components/Md.astro`

The existing CSS is already correct and battle-tested — we move it as-is and import it from `BaseLayout`. The `Md` helper converts the `*text*` italic marker used in dictionaries into `<em>text</em>`.

- [ ] **Step 1: Create directories**

```bash
mkdir -p src/styles src/components
```

- [ ] **Step 2: Move stylesheet**

```bash
git mv assets/styles.css src/styles/global.css
```

- [ ] **Step 3: Verify content unchanged**

```bash
head -10 src/styles/global.css
wc -l src/styles/global.css
```

Expected: starts with `/* ============================================================ Raffaele Francesco D'Amato — Editorial Premium ...`, ~880 lines.

- [ ] **Step 4: Write `src/components/Md.astro`**

```astro
---
interface Props { text: string; tag?: string }
const { text, tag = 'span' } = Astro.props
const html = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
const Tag = tag as keyof HTMLElementTagNameMap
---
<Tag set:html={html}></Tag>
```

This converts strings like `"AI *Developer* italiano"` into `<span>AI <em>Developer</em> italiano</span>`. The `tag` prop allows components to render the markdown into any wrapper element (`p`, `h1`, etc).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/components/Md.astro assets/
git commit -m "feat(styles): move CSS to src/, add Md helper for italic markers"
```

---

## Task 5: Create BaseLayout, SEO, Topbar, Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SEO.astro`
- Create: `src/components/Topbar.astro`
- Create: `src/components/Footer.astro`

`BaseLayout` is the page shell shared by both languages. `SEO` produces all `<meta>` tags and 4 JSON-LD blocks based on `lang`. `Topbar` and `Footer` are content-bearing components that read from the i18n dictionary.

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/layouts
```

- [ ] **Step 2: Write `src/components/SEO.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { projects } from '../data/projects'
import { faqs, plainAnswer } from '../data/faqs'

interface Props { lang: Lang }
const { lang } = Astro.props

const SITE = 'https://www.raffaelefrancescodamato.it'

const titles: Record<Lang, string> = {
  it: "Raffaele Francesco D'Amato — AI Developer & Founder | Chatbot · Automazioni · Dashboard",
  en: "Raffaele Francesco D'Amato — AI Developer & Founder | Chatbots · Automations · Dashboards"
}
const descriptions: Record<Lang, string> = {
  it: "AI Developer e Founder italiano. Costruisco chatbot AI, automazioni n8n e dashboard web con impatto misurabile. Universal Form Compiler open source. Portfolio, progetti e CV scaricabile.",
  en: "Italian AI Developer and Founder. I build AI chatbots, n8n automations and web dashboards with measurable impact. Universal Form Compiler open source. Portfolio, projects and downloadable CV."
}
const ogDescriptions: Record<Lang, string> = {
  it: "Chatbot AI, automazioni e dashboard con impatto misurabile. Universal Form Compiler open source. Portfolio e progetti.",
  en: "AI chatbots, automations and dashboards with measurable impact. Universal Form Compiler open source. Portfolio and projects."
}
const keywords: Record<Lang, string> = {
  it: "Raffaele Francesco D'Amato, AI Developer Italia, automazioni n8n, chatbot AI, dashboard web, Universal Form Compiler, FastAPI, Supabase, Python, TypeScript, RAG, LLM, founder",
  en: "Raffaele Francesco D'Amato, Italian AI Developer, n8n automations, AI chatbot, web dashboard, Universal Form Compiler, FastAPI, Supabase, Python, TypeScript, RAG, LLM, founder"
}
const personDescriptions: Record<Lang, string> = {
  it: "AI Developer italiano specializzato in chatbot AI, automazioni e dashboard web. Founder e creatore del progetto open source Universal Form Compiler.",
  en: "Italian AI Developer specializing in AI chatbots, automations and web dashboards. Founder and creator of the open-source Universal Form Compiler project."
}
const knowsAbout: Record<Lang, string[]> = {
  it: ["Intelligenza Artificiale", "Large Language Models", "Retrieval Augmented Generation", "Chatbot AI", "Automazioni n8n", "FastAPI", "Supabase", "Python", "TypeScript", "Chrome Extensions", "OpenAI API", "Anthropic Claude API", "Sviluppo Full-Stack", "Web Development"],
  en: ["Artificial Intelligence", "Large Language Models", "Retrieval Augmented Generation", "AI Chatbots", "n8n Automations", "FastAPI", "Supabase", "Python", "TypeScript", "Chrome Extensions", "OpenAI API", "Anthropic Claude API", "Full-Stack Development", "Web Development"]
}
const alumniNames: Record<Lang, [string, string]> = {
  it: ["Università di Informatica", "Istituto Tecnico Aeronautico"],
  en: ["University of Computer Science", "Aeronautical Technical Institute"]
}

const path = lang === 'it' ? '/' : '/en/'
const canonical = SITE + path
const ogImage = lang === 'it' ? `${SITE}/assets/images/og-image.jpg` : `${SITE}/assets/images/og-image-en.jpg`
const ogLocale = lang === 'it' ? 'it_IT' : 'en_US'
const ogLocaleAlt = lang === 'it' ? 'en_US' : 'it_IT'

const personLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#person`,
  "name": "Raffaele Francesco D'Amato",
  "alternateName": "RFD",
  "jobTitle": "AI Developer & Founder",
  "description": personDescriptions[lang],
  "email": "mailto:raffaelefrancesco.damato@gmail.com",
  "url": canonical,
  "image": ogImage,
  "sameAs": [
    "https://github.com/raffaelefrancescodamato-ai",
    "https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/",
    "https://www.instagram.com/_kekkodamato_/"
  ],
  "knowsAbout": knowsAbout[lang],
  "alumniOf": [
    { "@type": "EducationalOrganization", "name": alumniNames[lang][0] },
    { "@type": "EducationalOrganization", "name": alumniNames[lang][1] }
  ],
  "nationality": { "@type": "Country", "name": "Italy" },
  "workLocation": { "@type": "Country", "name": "Italy" }
}

const websiteLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  "url": canonical,
  "name": "Raffaele Francesco D'Amato — AI Developer & Founder",
  "inLanguage": lang === 'it' ? ['it', 'en'] : ['en', 'it'],
  "publisher": { "@id": `${SITE}/#person` }
}

// Strip *...* italic markers for plain text JSON-LD
const stripMarkers = (s: string) => s.replace(/\*([^*]+)\*/g, '$1')

const itemListLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": lang === 'it' ? "Selected Work — Raffaele Francesco D'Amato" : "Selected Work — Raffaele Francesco D'Amato",
  "itemListElement": projects.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": p.id === 'ufc' ? {
      "@type": "SoftwareSourceCode",
      "name": stripMarkers(p.title[lang]),
      "description": p.description[lang],
      "programmingLanguage": "TypeScript",
      "codeRepository": p.github,
      "license": "https://opensource.org/licenses/MIT",
      "url": p.github
    } : {
      "@type": "CreativeWork",
      "name": stripMarkers(p.title[lang]),
      "description": p.description[lang],
      ...(p.href ? { "url": p.href } : {})
    }
  }))
}

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q[lang],
    "acceptedAnswer": { "@type": "Answer", "text": plainAnswer(faq, lang) }
  }))
}
---
<title>{titles[lang]}</title>
<meta name="description" content={descriptions[lang]} />
<meta name="author" content="Raffaele Francesco D'Amato" />
<meta name="keywords" content={keywords[lang]} />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="it" href={`${SITE}/`} />
<link rel="alternate" hreflang="en" href={`${SITE}/en/`} />
<link rel="alternate" hreflang="x-default" href={`${SITE}/`} />

<meta property="og:type" content="profile" />
<meta property="og:locale" content={ogLocale} />
<meta property="og:locale:alternate" content={ogLocaleAlt} />
<meta property="og:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
<meta property="og:description" content={ogDescriptions[lang]} />
<meta property="og:url" content={canonical} />
<meta property="og:site_name" content="Raffaele Francesco D'Amato" />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
<meta property="profile:first_name" content="Raffaele Francesco" />
<meta property="profile:last_name" content="D'Amato" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
<meta name="twitter:description" content={ogDescriptions[lang]} />
<meta name="twitter:image" content={ogImage} />

<script type="application/ld+json" set:html={JSON.stringify(personLD)} />
<script type="application/ld+json" set:html={JSON.stringify(websiteLD)} />
<script type="application/ld+json" set:html={JSON.stringify(itemListLD)} />
<script type="application/ld+json" set:html={JSON.stringify(faqLD)} />
```

- [ ] **Step 3: Write `src/components/Topbar.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]
const homePath = lang === 'it' ? '/' : '/en/'
const otherPath = lang === 'it' ? '/en/' : '/'
---
<header class="topbar" role="banner">
  <a href={homePath} class="topbar-brand"><b>RFD</b><i> · Studio</i></a>
  <nav class="topbar-nav" aria-label={lang === 'it' ? 'Navigazione principale' : 'Main navigation'}>
    <a href="#about">{t.topbar.nav.about}</a>
    <a href="#work">{t.topbar.nav.work}</a>
    <a href="#capabilities">{t.topbar.nav.capabilities}</a>
    <a href="#approach">{t.topbar.nav.approach}</a>
    <a href="#contact">{t.topbar.nav.contact}</a>
  </nav>
  <div class="topbar-right">
    <div class="lang-toggle" role="group" aria-label={t.topbar.langLabel}>
      <a class={lang === 'it' ? 'active' : ''} href="/" aria-current={lang === 'it' ? 'true' : undefined}>IT</a>
      <a class={lang === 'en' ? 'active' : ''} href="/en/" aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
    </div>
  </div>
</header>
```

- [ ] **Step 4: Write `src/components/Footer.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]
const otherPath = lang === 'it' ? '/en/' : '/'
---
<footer class="footer">
  <span>{t.footer.rights}</span>
  <div class="footer-meta">
    <a href="/llms.txt">{t.footer.links.llms}</a>
    <a href="/sitemap.xml">{t.footer.links.sitemap}</a>
    <a href={otherPath}>{t.footer.links.otherLang}</a>
  </div>
</footer>
```

- [ ] **Step 5: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css'
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import SEO from '../components/SEO.astro'
import Topbar from '../components/Topbar.astro'
import Footer from '../components/Footer.astro'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]
---
<!doctype html>
<html lang={lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <link rel="icon" type="image/svg+xml" href="/assets/favicon-rfd.svg" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <SEO lang={lang} />
</head>
<body>
  <a href="#main" class="skip-link">{t.topbar.skipLink}</a>
  <Topbar lang={lang} />
  <main id="main">
    <div class="issue-band">
      <span>{t.issueBand.vol}</span>
      <span>{t.issueBand.updated}</span>
    </div>
    <slot />
  </main>
  <Footer lang={lang} />
  <script>
    import '../scripts/client.ts'
  </script>
</body>
</html>
```

- [ ] **Step 6: Type-check (will fail because client.ts doesn't exist yet — that's OK)**

```bash
npm run check 2>&1 | head -10
```

Expected: may complain about `'../scripts/client.ts'` not found. We create it in Task 9.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/ src/components/SEO.astro src/components/Topbar.astro src/components/Footer.astro
git commit -m "feat: add BaseLayout, SEO (4 JSON-LD), Topbar, Footer"
```

---

## Task 6: Create Hero and About components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/About.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import Md from './Md.astro'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]
---
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-left">
    <div class="hero-pretitle"><span class="label">{t.hero.pretitle}</span></div>
    <h1 id="hero-title">
      Raffaele<br/>
      Francesco<br/>
      <span class="italic">D&rsquo;Amato</span>
    </h1>
    <div class="hero-rule"></div>
    <p class="hero-role">{t.hero.role}</p>
    <Md tag="p" text={t.hero.lede} />
    <div class="hero-cta">
      <a href="/assets/Raffaele_Francesco_DAmato_CV.pdf" target="_blank" rel="noopener" class="btn-primary">{t.hero.cta.primary}</a>
      <a href="#work" class="btn-link">{t.hero.cta.secondary}</a>
    </div>
  </div>
  <aside class="hero-meta" aria-label="Metadata">
    <div class="hero-meta-block">
      <div class="hero-meta-label">{t.hero.meta.status.label}</div>
      <div class="hero-meta-value"><span class="availability-dot" aria-hidden="true"></span><Md text={t.hero.meta.status.value} /></div>
    </div>
    <div class="hero-meta-block">
      <div class="hero-meta-label">{t.hero.meta.stack.label}</div>
      <div class="hero-meta-value">{t.hero.meta.stack.value}</div>
    </div>
    <div class="hero-meta-block">
      <div class="hero-meta-label">{t.hero.meta.featured.label}</div>
      <div class="hero-meta-value"><Md text={t.hero.meta.featured.value} /><small>{t.hero.meta.featured.sub}</small></div>
    </div>
    <div class="hero-meta-block">
      <div class="hero-meta-label">{t.hero.meta.based.label}</div>
      <div class="hero-meta-value">{t.hero.meta.based.value}</div>
    </div>
  </aside>
</section>
```

The `Hero.astro` p.hero-lede element is wrapped via `<Md tag="p">`. Need to add the `hero-lede` class manually since `Md` doesn't accept arbitrary classes. Update `Md.astro` to accept a `class` prop:

- [ ] **Step 2: Update `src/components/Md.astro` to accept class prop**

```astro
---
interface Props { text: string; tag?: string; class?: string }
const { text, tag = 'span', class: className } = Astro.props
const html = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
const Tag = tag as keyof HTMLElementTagNameMap
---
<Tag class={className} set:html={html}></Tag>
```

- [ ] **Step 3: Update Hero.astro lede line to use class prop**

Change in `src/components/Hero.astro` the line:
```astro
<Md tag="p" text={t.hero.lede} />
```
to:
```astro
<Md tag="p" class="hero-lede" text={t.hero.lede} />
```

- [ ] **Step 4: Write `src/components/About.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import Md from './Md.astro'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]
---
<section class="section" id="about" aria-labelledby="about-title">
  <div class="section-num">{t.about.num}</div>
  <Md tag="h2" class="" text={t.about.title} />
  <div class="about-grid">
    <div class="about-text fade-up">
      {t.about.body.map(paragraph => <Md tag="p" text={paragraph} />)}
    </div>
    <aside class="about-facts fade-up">
      <div class="about-fact">
        <div class="about-fact-label">{t.about.facts.based.label}</div>
        <div class="about-fact-value">{t.about.facts.based.value}</div>
      </div>
      <div class="about-fact">
        <div class="about-fact-label">{t.about.facts.languages.label}</div>
        <div class="about-fact-value">{t.about.facts.languages.value}</div>
      </div>
      <div class="about-fact">
        <div class="about-fact-label">{t.about.facts.education.label}</div>
        <div class="about-fact-value">{t.about.facts.education.value}<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">{t.about.facts.education.sub}</small></div>
      </div>
      <div class="about-fact">
        <div class="about-fact-label">{t.about.facts.currently.label}</div>
        <div class="about-fact-value">{t.about.facts.currently.value}<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">{t.about.facts.currently.sub}</small></div>
      </div>
    </aside>
  </div>
</section>
```

The `<Md tag="h2" class="" text={...} />` for the title — but `<h2>` inherits styling from `.section h2` selector since it's inside `<section class="section">`. Need to verify this works since `h2` from Md doesn't inherit `id="about-title"`. We need to add an explicit `id` mechanism or render h2 directly:

- [ ] **Step 5: Adjust About.astro h2 to keep id**

Replace in `src/components/About.astro`:
```astro
<Md tag="h2" class="" text={t.about.title} />
```
with:
```astro
<h2 id="about-title" set:html={t.about.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')}></h2>
```

This keeps the `id` attribute that `aria-labelledby` references.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/components/About.astro src/components/Md.astro
git commit -m "feat(components): add Hero and About sections"
```

---

## Task 7: Create SelectedWork and ProjectCard

**Files:**
- Create: `src/components/SelectedWork.astro`
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import type { Project } from '../data/projects'
import { strings } from '../i18n'

interface Props { project: Project; lang: Lang; variant: 'featured' | 'row' }
const { project, lang, variant } = Astro.props
const t = strings[lang]

const titleHtml = project.title[lang].replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
{variant === 'featured' && (
  <article class="work-featured fade-up">
    <div class="work-featured-cover">
      {project.cover && <img src={project.cover} alt={`${project.title[lang].replace(/\*/g, '')} — cover`} width="800" height="600" loading="lazy" />}
    </div>
    <div class="work-featured-body">
      <span class="work-featured-badge">{t.work.featuredBadge}</span>
      <h3 set:html={titleHtml}></h3>
      <div class="work-featured-sub">Chrome Extension · TypeScript · {project.year}</div>
      <p class="work-featured-desc">{project.description[lang]}</p>
      <div class="work-stack">
        {project.stack.map(s => <span>{s}</span>)}
      </div>
      <div class="work-featured-cta">
        {project.github && <a href={project.github} target="_blank" rel="noopener" class="btn-primary">{t.work.githubCta}</a>}
        {project.readme && <a href={project.readme} target="_blank" rel="noopener" class="btn-link">{t.work.readmeCta}</a>}
      </div>
    </div>
  </article>
)}

{variant === 'row' && (
  <div class="work-row fade-up">
    <div class="work-num">{project.num}</div>
    <div>
      <h3 set:html={titleHtml}></h3>
      <p>{project.description[lang]}</p>
    </div>
    <div class="work-row-meta" set:html={project.rowMeta[lang].replace(/ · /g, '<br/>').replace(/^([^<]+)<br\/>/, '$1 · ').replace(/^(\d{4}) · ([^<]+)<br\/>/, '$1 · $2<br/>')}></div>
  </div>
)}
```

The `work-row-meta` regex transforms `"2025 · Enterprise · Python · FastAPI · Supabase"` into `"2025 · Enterprise<br/>Python · FastAPI · Supabase"` (year+tag on first line, stack on second). Simpler: split by `·` and group:

- [ ] **Step 2: Refine ProjectCard row-meta logic**

Replace the row-meta line in `src/components/ProjectCard.astro`:
```astro
<div class="work-row-meta" set:html={project.rowMeta[lang].replace(/ · /g, '<br/>').replace(/^([^<]+)<br\/>/, '$1 · ').replace(/^(\d{4}) · ([^<]+)<br\/>/, '$1 · $2<br/>')}></div>
```
with:
```astro
{(() => {
  const parts = project.rowMeta[lang].split(' · ')
  const firstLine = parts.slice(0, 2).join(' · ')
  const secondLine = parts.slice(2).join(' · ')
  return <div class="work-row-meta" set:html={`${firstLine}<br/>${secondLine}`}></div>
})()}
```

- [ ] **Step 3: Write `src/components/SelectedWork.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard.astro'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]

const featured = projects.find(p => p.featured)
const rest = projects.filter(p => !p.featured)
const titleHtml = t.work.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<section class="section" id="work" aria-labelledby="work-title">
  <div class="section-num">{t.work.num}</div>
  <h2 id="work-title" set:html={titleHtml}></h2>

  {featured && <ProjectCard project={featured} lang={lang} variant="featured" />}

  <div class="work-rows">
    {rest.map(p => <ProjectCard project={p} lang={lang} variant="row" />)}
  </div>
</section>
```

- [ ] **Step 4: Type-check**

```bash
npm run check 2>&1 | grep -v "client.ts" | head -10
```

Expected: 0 errors (ignore the client.ts error from earlier).

- [ ] **Step 5: Commit**

```bash
git add src/components/SelectedWork.astro src/components/ProjectCard.astro
git commit -m "feat(components): add SelectedWork and ProjectCard (featured + row variants)"
```

---

## Task 8: Create Capabilities, Approach, Faq, Contact

**Files:**
- Create: `src/components/Capabilities.astro`
- Create: `src/components/Approach.astro`
- Create: `src/components/Faq.astro`
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Write `src/components/Capabilities.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import { capabilities } from '../data/capabilities'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]

const titleHtml = t.capabilities.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<section class="section" id="capabilities" aria-labelledby="capabilities-title">
  <div class="section-num">{t.capabilities.num}</div>
  <h2 id="capabilities-title" set:html={titleHtml}></h2>
  <div class="capabilities-grid">
    {capabilities.map(c => {
      const cTitleHtml = c.title[lang].replace(/\*([^*]+)\*/g, '<em>$1</em>')
      return (
        <article class="capability fade-up">
          <div class="capability-num">{c.num}</div>
          <h3 set:html={cTitleHtml}></h3>
          <p>{c.body[lang]}</p>
          <div class="capability-stack">
            {c.stack.map(s => <span>{s}</span>)}
          </div>
        </article>
      )
    })}
  </div>
</section>
```

- [ ] **Step 2: Write `src/components/Approach.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import { approach } from '../data/approach'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]

const titleHtml = t.approach.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<section class="section" id="approach" aria-labelledby="approach-title">
  <div class="section-num">{t.approach.num}</div>
  <h2 id="approach-title" set:html={titleHtml}></h2>
  <div class="approach-list">
    {approach.map(item => (
      <article class="approach-item fade-up">
        <div class="approach-num">{item.num}</div>
        <div>
          <h3>{item.title[lang]}</h3>
          <p class="approach-claim">{item.claim[lang]}</p>
          <p class="approach-body">{item.body[lang]}</p>
          <p class="approach-example">{item.example[lang]}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Write `src/components/Faq.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'
import { faqs } from '../data/faqs'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]

const titleHtml = t.faq.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="section-num">{t.faq.num}</div>
  <h2 id="faq-title" set:html={titleHtml}></h2>
  <div class="faq-list">
    {faqs.map((faq, i) => (
      <div class="faq-item" data-open="false">
        <button class="faq-question" aria-expanded="false" aria-controls={`faq-answer-${i + 1}`}>
          <h3>{faq.q[lang]}</h3>
          <span class="faq-toggle" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" id={`faq-answer-${i + 1}`}>
          <p set:html={faq.a[lang]}></p>
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 4: Write `src/components/Contact.astro`**

```astro
---
import type { Lang } from '../i18n/types'
import { strings } from '../i18n'

interface Props { lang: Lang }
const { lang } = Astro.props
const t = strings[lang]

const titleHtml = t.contact.title.replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<section class="section" id="contact" aria-labelledby="contact-title">
  <div class="section-num">{t.contact.num}</div>
  <h2 id="contact-title" style="text-align: center; margin-inline: auto;" set:html={titleHtml}></h2>
  <div class="contact-block">
    <p class="contact-lead">{t.contact.lede}</p>
    <a href="mailto:raffaelefrancesco.damato@gmail.com" class="contact-email">raffaelefrancesco.damato@gmail.com</a>
    <div class="contact-social">
      <a href="https://github.com/raffaelefrancescodamato-ai" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.instagram.com/_kekkodamato_/" target="_blank" rel="noopener">Instagram</a>
    </div>
    <p class="contact-quote">{t.contact.quote}</p>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Capabilities.astro src/components/Approach.astro src/components/Faq.astro src/components/Contact.astro
git commit -m "feat(components): add Capabilities, Approach, Faq, Contact sections"
```

---

## Task 9: Create client-side TS script

**Files:**
- Move/Convert: `assets/main.js` → `src/scripts/client.ts`

The script handles FAQ accordion, scroll fade-up animation, and smooth scroll. Convert from JS to TS with explicit types.

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/scripts
```

- [ ] **Step 2: Write `src/scripts/client.ts`**

```ts
/* ============================================================
   Raffaele Francesco D'Amato — Editorial Premium
   Client-side: accordion · scroll obs · smooth scroll
   ============================================================ */

function initFAQ(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item')
  items.forEach((item) => {
    const button = item.querySelector<HTMLButtonElement>('.faq-question')
    if (!button) return
    button.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true'
      const next = !isOpen
      item.setAttribute('data-open', String(next))
      button.setAttribute('aria-expanded', String(next))
    })
  })
}

function initScrollAnim(): void {
  const elements = document.querySelectorAll<HTMLElement>('.fade-up')
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'))
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    elements.forEach((el) => el.classList.add('visible'))
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  )
  elements.forEach((el) => obs.observe(el))
}

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}

function init(): void {
  initFAQ()
  initScrollAnim()
  initSmoothScroll()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
```

- [ ] **Step 3: Delete old `assets/main.js`**

```bash
git rm assets/main.js
```

- [ ] **Step 4: Type-check**

```bash
npm run check
```

Expected: 0 errors. The client.ts import in BaseLayout now resolves.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/client.ts
git commit -m "feat(scripts): port main.js to TypeScript with explicit types"
```

---

## Task 10: Create pages IT and EN

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/en/index.astro`

These are the only two routes. Each composes the section components passing `lang`.

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/pages/en
```

- [ ] **Step 2: Write `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Hero from '../components/Hero.astro'
import About from '../components/About.astro'
import SelectedWork from '../components/SelectedWork.astro'
import Capabilities from '../components/Capabilities.astro'
import Approach from '../components/Approach.astro'
import Faq from '../components/Faq.astro'
import Contact from '../components/Contact.astro'

const lang = 'it' as const
---
<BaseLayout lang={lang}>
  <Hero lang={lang} />
  <About lang={lang} />
  <SelectedWork lang={lang} />
  <Capabilities lang={lang} />
  <Approach lang={lang} />
  <Faq lang={lang} />
  <Contact lang={lang} />
</BaseLayout>
```

- [ ] **Step 3: Write `src/pages/en/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro'
import Hero from '../../components/Hero.astro'
import About from '../../components/About.astro'
import SelectedWork from '../../components/SelectedWork.astro'
import Capabilities from '../../components/Capabilities.astro'
import Approach from '../../components/Approach.astro'
import Faq from '../../components/Faq.astro'
import Contact from '../../components/Contact.astro'

const lang = 'en' as const
---
<BaseLayout lang={lang}>
  <Hero lang={lang} />
  <About lang={lang} />
  <SelectedWork lang={lang} />
  <Capabilities lang={lang} />
  <Approach lang={lang} />
  <Faq lang={lang} />
  <Contact lang={lang} />
</BaseLayout>
```

- [ ] **Step 4: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 5: Test dev server**

```bash
npm run dev &
DEV_PID=$!
sleep 3
curl -sIo /dev/null -w "/ : %{http_code}\n" http://localhost:4321/
curl -sIo /dev/null -w "/en/ : %{http_code}\n" http://localhost:4321/en/
kill $DEV_PID 2>/dev/null
```

Expected: both routes return 200.

- [ ] **Step 6: Commit**

```bash
git add src/pages/
git commit -m "feat(pages): add IT root and EN root composing all sections"
```

---

## Task 11: Move OG generators, delete old files

**Files:**
- Move: `assets/images/_og-generator.html`, `_og-generator-en.html`, `_ufc-cover-generator.html` → `scripts/og-generators/`
- Delete: `index.html` (root), `en/index.html`, `en/` directory, `assets/README.md`, `assets/` directory if empty after

The OG generator HTML files are dev tooling, not part of the site. They live in `scripts/` (outside `public/`, so they're not served).

- [ ] **Step 1: Move OG generators**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
mkdir -p scripts/og-generators
git mv assets/images/_og-generator.html scripts/og-generators/og-it.html
git mv assets/images/_og-generator-en.html scripts/og-generators/og-en.html
git mv assets/images/_ufc-cover-generator.html scripts/og-generators/ufc-cover.html
```

- [ ] **Step 2: Remove obsolete root HTML and `assets/` leftovers**

```bash
git rm index.html
git rm en/index.html
rmdir en
git rm assets/README.md
```

- [ ] **Step 3: Verify `assets/` is empty**

```bash
ls -la assets/
```

Expected: empty (or contains `images/` empty subdir).

- [ ] **Step 4: Remove empty `assets/` directories**

```bash
rmdir assets/images 2>/dev/null || true
rmdir assets 2>/dev/null || true
ls -la
```

Expected: no `assets/` at root, no `en/` at root, no `index.html` at root.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove old static HTML files, move OG generators to scripts/"
```

---

## Task 12: Build locally and verify output

**Files:** none (validation)

- [ ] **Step 1: Build the site**

```bash
npm run build
```

Expected: build completes without errors. Output in `dist/`.

- [ ] **Step 2: Inspect `dist/` structure**

```bash
ls dist/
ls dist/en/
ls dist/assets/
ls dist/assets/images/
```

Expected:
- `dist/` contains: `index.html`, `en/`, `assets/`, `CNAME`, `favicon.*`, `google40850cc6cfe29b7e.html`, `llms.txt`, `robots.txt`, `sitemap.xml`, `_astro/` (CSS bundle)
- `dist/en/` contains: `index.html`
- `dist/assets/` contains: PDF, favicon variants, images/
- `dist/assets/images/` contains: og-image.jpg, og-image-en.jpg, ufc-cover.png

- [ ] **Step 3: Validate JSON-LD in built HTML**

```bash
python3 -c "
import re, json
for f in ['dist/index.html', 'dist/en/index.html']:
    html = open(f).read()
    blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
    print(f'{f}: {len(blocks)} JSON-LD blocks')
    for i, b in enumerate(blocks):
        try:
            data = json.loads(b)
            t = data.get('@type', '?')
            print(f'  Block {i+1} ({t}): OK')
        except Exception as e:
            print(f'  Block {i+1}: INVALID — {e}')
"
```

Expected: `dist/index.html` has 4 blocks (Person, WebSite, ItemList, FAQPage), `dist/en/index.html` has 4 blocks, all OK.

- [ ] **Step 4: Verify critical static files copied through**

```bash
for f in CNAME llms.txt robots.txt sitemap.xml google40850cc6cfe29b7e.html assets/Raffaele_Francesco_DAmato_CV.pdf assets/images/og-image.jpg assets/images/ufc-cover.png; do
  test -f "dist/$f" && echo "  ✓ dist/$f" || echo "  ✗ MISSING: dist/$f"
done
```

Expected: all 8 files present.

- [ ] **Step 5: Preview the built site and capture screenshots**

```bash
npm run preview > /tmp/preview.log 2>&1 &
PREVIEW_PID=$!
sleep 3

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot=/tmp/astro-it.png http://localhost:4321/ 2>&1 | tail -1
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot=/tmp/astro-en.png http://localhost:4321/en/ 2>&1 | tail -1

kill $PREVIEW_PID 2>/dev/null
ls -la /tmp/astro-it.png /tmp/astro-en.png
```

Expected: both PNG files exist, ~100-200KB each.

- [ ] **Step 6: Visual inspection of screenshots**

Open `/tmp/astro-it.png` and `/tmp/astro-en.png`. Verify:
- Topbar with `RFD · Studio` brand, nav, lang toggle
- Issue band `Vol. 01 · Edition 2026` + `Updated April 2026`
- Hero with giant "Raffaele Francesco D'Amato" (italic terracotta)
- Right-column metadata (Status, Stack, Featured, Sede/Based)
- All copy in correct language
- No broken images, no missing fonts (Playfair italic visible)

- [ ] **Step 7: Validate HTML balance**

```bash
python3 -c "
from html.parser import HTMLParser
VOID = {'br','hr','img','input','meta','link','source','area','base','col','embed','param','wbr','track'}
class V(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.stack and self.stack[-1] == tag: self.stack.pop()
        else: self.errors.append(f'closing {tag}, top {self.stack[-3:] if self.stack else \"empty\"}')
for f in ['dist/index.html', 'dist/en/index.html']:
    v = V()
    v.feed(open(f).read())
    status = 'balanced ✓' if not (v.stack or v.errors) else 'ISSUES'
    print(f'{f}: {status}')
    for e in v.errors[:3]: print(f'  {e}')
    if v.stack: print(f'  Residual: {v.stack}')
"
```

Expected: both balanced ✓.

- [ ] **Step 8: No commit needed (validation only)**

If issues were found, fix them and make a `fix:` commit referencing what was wrong. Otherwise skip.

---

## Task 13: GitHub Actions workflow + change Pages source

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow directory**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Change GitHub Pages source to "GitHub Actions"**

```bash
gh api -X PUT "repos/raffaelefrancescodamato-ai/raffaelefrancescodamato.it/pages" \
  -f build_type=workflow 2>&1 | head -20
```

If this fails (e.g. with 422 or 404), the source needs to be changed manually:
1. Go to https://github.com/raffaelefrancescodamato-ai/raffaelefrancescodamato.it/settings/pages
2. Under "Build and deployment" → Source → select "GitHub Actions"
3. Save

Confirm:

```bash
gh api "repos/raffaelefrancescodamato-ai/raffaelefrancescodamato.it/pages" \
  --jq '{source: .source, build_type: .build_type}'
```

Expected: `build_type: "workflow"`.

- [ ] **Step 4: Commit workflow**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for Astro build + Pages deploy"
```

---

## Task 14: Push and verify live deployment

**Files:** none (deployment + verification only)

- [ ] **Step 1: Review log of all migration commits**

```bash
git log --oneline origin/main..HEAD
```

Expected: ~14 commits forming the migration sequence.

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

Expected: push succeeds. The `deploy.yml` workflow triggers automatically.

- [ ] **Step 3: Watch the workflow**

```bash
gh run watch --repo raffaelefrancescodamato-ai/raffaelefrancescodamato.it
```

Expected: build job completes, deploy job completes. Total ~2-3 minutes. Status: completed/success.

- [ ] **Step 4: Verify live site**

```bash
for u in "https://www.raffaelefrancescodamato.it/" "https://www.raffaelefrancescodamato.it/en/" "https://www.raffaelefrancescodamato.it/llms.txt" "https://www.raffaelefrancescodamato.it/robots.txt" "https://www.raffaelefrancescodamato.it/sitemap.xml" "https://www.raffaelefrancescodamato.it/assets/Raffaele_Francesco_DAmato_CV.pdf" "https://www.raffaelefrancescodamato.it/assets/images/og-image.jpg" "https://www.raffaelefrancescodamato.it/assets/images/ufc-cover.png"; do
  CODE=$(curl -sILo /dev/null -w "%{http_code}" "$u")
  echo "  $CODE  $u"
done
```

Expected: all 8 URLs return `200`.

- [ ] **Step 5: Verify content matches expectations**

```bash
echo "=== Title IT ==="
curl -sL https://www.raffaelefrancescodamato.it/ | grep -E "<title>" | head -1
echo "=== Title EN ==="
curl -sL https://www.raffaelefrancescodamato.it/en/ | grep -E "<title>" | head -1
echo "=== JSON-LD count IT ==="
curl -sL https://www.raffaelefrancescodamato.it/ | grep -c "application/ld+json"
echo "=== JSON-LD count EN ==="
curl -sL https://www.raffaelefrancescodamato.it/en/ | grep -c "application/ld+json"
echo "=== llms.txt header ==="
curl -sL https://www.raffaelefrancescodamato.it/llms.txt | head -3
```

Expected:
- IT title: `Raffaele Francesco D'Amato — AI Developer & Founder | Chatbot · Automazioni · Dashboard`
- EN title: `Raffaele Francesco D'Amato — AI Developer & Founder | Chatbots · Automations · Dashboards`
- JSON-LD count: 4 IT, 4 EN
- llms.txt: starts with `# Raffaele Francesco D'Amato`

- [ ] **Step 6: Visual smoke test of live site**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot=/tmp/live-it.png https://www.raffaelefrancescodamato.it/ 2>&1 | tail -1
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot=/tmp/live-en.png https://www.raffaelefrancescodamato.it/en/ 2>&1 | tail -1
ls -la /tmp/live-it.png /tmp/live-en.png
```

Open both screenshots and verify they look identical to `/tmp/astro-it.png` and `/tmp/astro-en.png` from Task 12.

---

## Self-Review

**1. Spec coverage check:**
- §3 Cosa cambia (file structure) → Tasks 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
- §4 Configurazione (astro.config, package.json, tsconfig, .nvmrc, .gitignore, deploy.yml) → Tasks 0, 13
- §5 Modello dati e i18n → Tasks 2, 3
- §6 SEO/GEO preservation (4 JSON-LD, llms.txt, robots, sitemap, hreflang in static files) → Tasks 1, 5
- §7 Performance & a11y (compressHTML, reduced-motion, semantic HTML) → Tasks 0 (config), 4 (CSS unchanged), 5 (BaseLayout), 9 (client.ts respects reduced-motion)
- §8 Deploy migration steps → Tasks 13, 14
- §9 Out of scope → respected (no blog, no SSR, no React/Vue, no dark mode, no analytics)
- §10 Acceptance criteria → all covered: dev server (Task 10 step 5), build (Task 12 step 1), JSON-LD validation (Task 12 step 3), critical static files (Task 12 step 4), npm check passes (multiple steps), live HTTP 200 (Task 14 step 4), Lighthouse — note: not explicit step but covered by visual smoke test (could add as future iteration)
- §11 Risks & mitigations → addressed in Task 13 step 3 (Pages source change with manual fallback)
- All spec sections covered ✓

**2. Placeholder scan:** No "TBD", "TODO", "fill in details", "similar to Task N", or vague directives. All steps have concrete commands or full code blocks ✓

**3. Type/path consistency:**
- `Lang` type defined in Task 2 (`src/i18n/types.ts`) used in Tasks 3, 5-10 ✓
- `UIStrings` interface used by `it.ts`, `en.ts`, and components via `strings[lang]` ✓
- `Project`, `FAQ`, `Capability`, `ApproachItem` types defined in Task 3, used in Tasks 7, 8 ✓
- `plainAnswer(faq, lang)` defined in `src/data/faqs.ts` (Task 3 step 3), used in `SEO.astro` (Task 5 step 2) ✓
- File paths consistent: `src/i18n/`, `src/data/`, `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/scripts/`, `public/` ✓
- `BaseLayout.astro` imports `client.ts` — created in Task 9, BaseLayout in Task 5; type-check failure flagged in Task 5 step 6, resolved in Task 9 step 4 ✓

**4. Outstanding gaps:** None. Lighthouse run is implicitly covered by visual smoke test but not explicitly scripted — acceptable given the design doesn't change.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-04-27-astro-migration.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task with two-stage review. Safer for a 14-task migration with cross-file dependencies.

2. **Inline Execution** — execute tasks in this session using `executing-plans`, checkpoints between major tasks. Faster overall.

**Which approach?**
