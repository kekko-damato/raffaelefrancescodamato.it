# Astro Migration — Source Refactor of Editorial Premium Site

**Data**: 2026-04-27
**Owner**: Raffaele Francesco D'Amato
**Working dir**: `/Users/kekko/Desktop/Lavoro/ME/Sito Web`
**Live target**: https://www.raffaelefrancescodamato.it/
**Predecessor spec**: `docs/superpowers/specs/2026-04-26-website-rebuild-design.md`

---

## 1. Obiettivo

Migrare il sorgente del sito personale di Raffaele Francesco D'Amato da **HTML statico monolitico** (2 file `.html` duplicati) a un **progetto Astro 4.x componentizzato e tipizzato**.

Il sito *deployato* resta HTML statico (output identico, GEO/SEO/perf invariati). Il *sorgente* diventa moderno: TypeScript strict, components `.astro`, dictionary i18n, dati tipizzati, build pipeline standard, CI/CD via GitHub Actions.

**Motivazione**: dare al portfolio del proprietario (AI Developer & Founder, in iscrizione a Università di Informatica) un sorgente "tecnico" coerente col profilo professionale, senza sacrificare nessun beneficio del rebuild precedente.

## 2. Cosa NON cambia

Decisione esplicita per evitare scope creep:

- **Estetica**: identica (Editorial Premium, Playfair Display + EB Garamond + Inter, palette avorio/terracotta/oro)
- **Contenuto e copy**: identico in IT e EN per tutte le 7 sezioni
- **Struttura semantica**: identica (Hero, About, Selected Work, Capabilities, Approach, FAQ, Contact)
- **GEO/SEO**: identico — 4 blocchi JSON-LD, `llms.txt`, robots con AI bots, sitemap bilingue, hreflang
- **Output servito al browser**: HTML statico minificato, ~2.3KB di JS vanilla per accordion + scroll observer + smooth scroll
- **Hosting**: GitHub Pages, dominio `www.raffaelefrancescodamato.it` via CNAME

## 3. Cosa cambia

### Stack
- Da HTML/CSS/JS scritti a mano → **Astro 4.16+** con TypeScript strict
- Da `index.html` + `en/index.html` duplicati → componenti riusati con `lang` prop
- Da deploy manuale via `git push` → **GitHub Actions** workflow auto-build + auto-deploy
- Da Pages source "Deploy from branch" → **Pages source "GitHub Actions"**

### File structure

```
raffaelefrancescodamato.it/
├── .github/
│   └── workflows/
│       └── deploy.yml              # build Astro + deploy Pages
├── public/                         # asset copiati as-is in dist/
│   ├── CNAME
│   ├── favicon.ico, favicon-16x16.png, favicon-32x32.png
│   ├── google40850cc6cfe29b7e.html
│   ├── llms.txt
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── Raffaele_Francesco_DAmato_CV.pdf
│       ├── apple-touch-icon.png
│       ├── favicon-rfd.svg
│       ├── favicon-512.png
│       ├── rdditalia.png
│       └── images/
│           ├── og-image.jpg
│           ├── og-image-en.jpg
│           └── ufc-cover.png
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # <head>, topbar, footer, <main> slot
│   ├── components/
│   │   ├── SEO.astro               # meta tags + 3-4 blocchi JSON-LD
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── SelectedWork.astro
│   │   ├── ProjectCard.astro       # featured + row variants
│   │   ├── Capabilities.astro
│   │   ├── Approach.astro
│   │   ├── Faq.astro               # accordion item con script island
│   │   ├── Contact.astro
│   │   ├── Topbar.astro
│   │   └── Footer.astro
│   ├── data/
│   │   ├── projects.ts             # Project[] tipizzato (5 progetti)
│   │   ├── faqs.ts                 # FAQ per IT/EN
│   │   ├── capabilities.ts
│   │   └── approach.ts
│   ├── i18n/
│   │   ├── types.ts                # Lang = 'it' | 'en', UIStrings type
│   │   ├── it.ts                   # tutte le UI strings IT
│   │   ├── en.ts                   # tutte le UI strings EN
│   │   └── index.ts                # export const strings = { it, en }
│   ├── styles/
│   │   └── global.css              # CSS attuale riusato 1:1 (~880 righe)
│   ├── scripts/
│   │   └── client.ts               # FAQ accordion + scroll observer + smooth scroll
│   └── pages/
│       ├── index.astro             # IT (lang="it")
│       └── en/
│           └── index.astro         # EN (lang="en")
├── scripts/
│   └── og-generators/              # spostati da public/assets/images/
│       ├── og-it.html
│       ├── og-en.html
│       └── ufc-cover.html
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore                      # aggiornato per node_modules/, dist/, .astro/
└── .nvmrc                          # 20
```

### File rimossi dalla root

- `index.html` (sostituito da `src/pages/index.astro` + componenti)
- `en/index.html` (sostituito da `src/pages/en/index.astro`)
- `assets/styles.css` (spostato in `src/styles/global.css`)
- `assets/main.js` (riscritto come `src/scripts/client.ts`)
- `assets/images/_og-generator.html`, `_og-generator-en.html`, `_ufc-cover-generator.html` (spostati in `scripts/og-generators/`)

### File mantenuti as-is (in `public/`)

- `CNAME`, favicons, `google40850cc6cfe29b7e.html`, `llms.txt`, `robots.txt`, `sitemap.xml`
- `assets/Raffaele_Francesco_DAmato_CV.pdf`
- `assets/images/og-image.jpg`, `og-image-en.jpg`, `ufc-cover.png`

## 4. Configurazione

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.raffaelefrancescodamato.it',
  output: 'static',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false }  // / per IT, /en/ per EN
  },
  build: {
    format: 'directory'  // /en/ → /en/index.html (cleaner URL)
  },
  compressHTML: true,
  trailingSlash: 'always'
})
```

### `package.json`

```json
{
  "name": "raffaelefrancescodamato.it",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check && tsc --noEmit",
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

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### `.nvmrc`

```
20
```

### `.gitignore` (additions)

```
node_modules/
dist/
.astro/
.env
.env.local
```

### `.github/workflows/deploy.yml`

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

## 5. Modello dati e i18n

### Type definitions (`src/i18n/types.ts`)

```ts
export type Lang = 'it' | 'en'

export type Tag = 'Enterprise' | 'SaaS' | 'Internal' | 'Open Source'

export interface Project {
  id: string
  num: string                       // "N°01", "N°02"
  year: number
  tag: Tag
  stack: string[]
  href?: string
  github?: string
  cover?: string                    // path public/, only for featured
  featured?: boolean
  title: Record<Lang, string>       // markdown-light, * for italic
  description: Record<Lang, string>
}

export interface FAQ {
  q: Record<Lang, string>
  a: Record<Lang, string>
}

export interface Capability {
  num: string                       // "i.", "ii.", ...
  stack: string[]
  title: Record<Lang, string>
  body: Record<Lang, string>
}

export interface ApproachItem {
  num: string                       // "i.", "ii.", "iii."
  title: Record<Lang, string>
  claim: Record<Lang, string>
  body: Record<Lang, string>
  example: Record<Lang, string>
}
```

### UI strings (esempio `src/i18n/it.ts`)

```ts
import type { Lang } from './types'

export default {
  topbar: { nav: { about: 'About', work: 'Selected Work', capabilities: 'Capabilities', approach: 'Approach', contact: 'Contact' }, langLabel: 'Lingua / Language' },
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
      'Sono un *AI Developer e Founder* italiano. Costruisco strumenti pratici...',
      'Mi sto iscrivendo all’Università di Informatica...',
      'Lavoro in italiano (madrelingua) e inglese tecnico...'
    ],
    facts: { based: 'Based', languages: 'Languages', education: 'Education', currently: 'Currently' }
  },
  // ... etc per tutte le 7 sezioni
  contact: {
    num: 'N°06',
    title: 'Vuoi proporre una *collaborazione*?',
    lede: 'Scrivimi cosa vuoi migliorare. Ti rispondo con una proposta concreta su obiettivi, stack, tempi e prossimi passi.',
    quote: '“Output reali, non demo. Misurabili dal primo rilascio.”'
  },
  footer: {
    rights: '© 2026 Raffaele Francesco D’Amato',
    links: { llms: 'llms.txt', sitemap: 'sitemap', other: 'EN version' }
  }
} as const
```

### Markdown-light convention

Per testi che contengono italici, uso `*text*` come marker. Un piccolo helper converte in `<em>text</em>` lato server (Astro template). Niente full markdown engine.

```astro
---
// src/components/Md.astro
const { children } = Astro.props
const html = (Astro.slots.default ? await Astro.slots.render('default') : '')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
---
<Fragment set:html={html} />
```

### Dati progetti (`src/data/projects.ts`)

Esempio compatto:
```ts
import type { Project } from '../i18n/types'

export const projects: Project[] = [
  {
    id: 'ufc',
    num: 'N°01',
    year: 2026,
    tag: 'Open Source',
    stack: ['TypeScript', 'Vite', 'Zod', 'Mammoth', 'Vitest', 'OpenAI API', 'Chrome MV3'],
    github: 'https://github.com/raffaelefrancescodamato-ai/universal-form-compiler',
    cover: '/assets/images/ufc-cover.png',
    featured: true,
    title: {
      it: 'Universal Form *Compiler*',
      en: 'Universal Form *Compiler*'
    },
    description: {
      it: 'Estensione Chrome che compila automaticamente qualsiasi form web partendo dai tuoi dati personali. Multi-documento, anti-allucinazione, mapping semantico via OpenAI con guard rigorosi sui campi sensibili. Vanilla TypeScript + Vite + Zod, niente framework UI. Architettura a 6 fasi con AI Pass 1+2 e validazione anti-hallucination.',
      en: 'Chrome extension that auto-fills any web form from your personal data. Multi-document, anti-hallucination guards, semantic mapping via OpenAI with strict scrubbing on sensitive fields. Vanilla TypeScript + Vite + Zod, no UI framework. 6-phase architecture with AI Pass 1+2 and anti-hallucination validation.'
    }
  },
  // 4 altri progetti...
]
```

## 6. SEO/GEO preservation

Il componente `<SEO lang={lang} />` riceve la lingua e produce **identico output** a quello attuale:

- `<title>` localizzato
- `<meta name="description">` localizzato
- `<link rel="canonical">` con URL corretta per lingua
- `<link rel="alternate" hreflang>` per IT, EN, x-default
- Open Graph + Twitter cards localizzati
- 4 blocchi `<script type="application/ld+json">`:
  - **Person** (identico, condiviso tra IT/EN tranne `description` e `url`)
  - **WebSite** (con `inLanguage` array)
  - **ItemList** (5 progetti, generato da `projects.ts`, descrizioni nella lingua corrente)
  - **FAQPage** (generato da `faqs.ts`, Q&A nella lingua corrente)

I file statici `llms.txt`, `robots.txt`, `sitemap.xml` rimangono in `public/` come ora — Astro li copia in `dist/` senza toccarli.

## 7. Performance & accessibility

Identici al rebuild precedente:

- Lighthouse target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Astro `compressHTML: true` minifica HTML in build
- Astro non spedisce JS al browser per default (solo `<script>` esplicitamente marcati come island)
- Il `client.ts` (FAQ accordion + scroll obs + smooth scroll) viene incluso solo se referenziato in un componente, e bundlato/minifificato da Vite (di Astro)
- Reduced motion, skip-link, focus-visible: invariati (CSS riusato 1:1)
- Heading hierarchy strict mantenuta dai componenti

## 8. Deploy migration steps (high level)

Questi diventano i task del plan, qui riassunto:

1. Inizializzare progetto Astro nella cartella esistente (mantiene git history)
2. Spostare asset in `public/`
3. Creare types, i18n dictionary, data files
4. Creare BaseLayout + componenti per ogni sezione
5. Creare pages IT e EN
6. Creare workflow GitHub Actions
7. Cambiare GitHub Pages source a "GitHub Actions" (via API o UI)
8. Test build locale + diff visivo con sito attuale
9. Push, attendere deploy, smoke test live

## 9. Out of scope

Esplicitamente **non** in questo cambio:

- Blog / Journal (ma struttura `src/content/` lasciata pronta per averlo in futuro con Astro Content Collections)
- Server-side rendering (output rimane `static`)
- Database, CMS, auth, form backend
- React / Vue / Svelte islands (zero JS by default)
- Dark mode toggle
- Visualizzazioni dinamiche (GitHub stats live, dashboard real-time)
- Analytics avanzato
- Animazioni complex (rispettiamo reduced-motion, niente WebGL)

## 10. Acceptance criteria

Cambio considerato completo quando:

- [ ] `npm run dev` parte e mostra IT su `/` e EN su `/en/`
- [ ] `npm run build` produce `dist/` con `dist/index.html` e `dist/en/index.html`
- [ ] Il diff visivo (screenshot pixel-vicino) tra sito attuale e nuovo dist è impercettibile
- [ ] Tutti i 4 blocchi JSON-LD si parsano in entrambe le lingue
- [ ] `dist/llms.txt`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/CNAME` esistono come ora
- [ ] `npm run check` passa senza errori (TS strict + Astro check)
- [ ] GitHub Actions workflow eseguito con successo, sito serve la nuova build
- [ ] Smoke test: HTTP 200 su `/`, `/en/`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/assets/images/ufc-cover.png`
- [ ] Lighthouse score Mobile + Desktop ≥ 95 Performance, 100 a11y/best/SEO

## 11. Risks & mitigations

- **Rischio**: prima volta che si attiva GitHub Pages source = "GitHub Actions" può causare errori se il workflow ha bug. **Mitigazione**: testo `npm run build` localmente prima del push, e tengo l'opzione di rollback (re-impostare Pages source a "Deploy from branch" e revertare il commit Astro).
- **Rischio**: Astro 4.x potrebbe avere breaking changes con dipendenze esterne. **Mitigazione**: niente integrations esterne nella v1 della migrazione (no React/Vue, no Tailwind), ridotto il superficie d'attacco.
- **Rischio**: il CSS attuale ha `class` selectors globali che potrebbero collidere con qualcosa generato da Astro. **Mitigazione**: importo il CSS in `BaseLayout.astro` come stylesheet globale, non scoped.
- **Rischio**: differenze sottili di rendering tra HTML scritto a mano e HTML generato (es. spazi bianchi, escape entity). **Mitigazione**: diff visivo in screenshot prima di pushare.
