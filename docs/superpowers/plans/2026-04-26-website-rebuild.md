# Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the personal portfolio site at raffaelefrancescodamato.it with an editorial-premium aesthetic, bilingual IT/EN content, and Generative Engine Optimization. Replace the existing card-based layout (with a 487KB unused Vite bundle) with hand-written HTML/CSS/JS, integrate the new Universal Form Compiler open-source project as featured work, and push to the existing public GitHub Pages repo.

**Architecture:** Pure static site — two canonical pages (`/index.html` IT, `/en/index.html` EN), shared `assets/styles.css` and `assets/main.js`, structured data via JSON-LD blocks, `llms.txt` for LLM crawlers. Zero frameworks, zero build step. Deploy via GitHub Pages (existing CNAME → custom domain).

**Tech Stack:** HTML5 semantic · CSS custom properties · vanilla JS · Google Fonts (Playfair Display, EB Garamond, Inter) · JSON-LD schema.org · GitHub Pages

**Spec:** `docs/superpowers/specs/2026-04-26-website-rebuild-design.md`

**Repo:** [github.com/raffaelefrancescodamato-ai/raffaelefrancescodamato.it](https://github.com/raffaelefrancescodamato-ai/raffaelefrancescodamato.it) (public, branch `main`, GitHub Pages with CNAME)

---

## Task 0: Initialize git repository and link to remote

**Files:**
- Create: `.gitignore`
- Configure: local git repo + `origin` remote

The local folder is currently not a git repository. The remote already exists with the live site files. We need to initialize a fresh local repo, set the remote, fetch the existing main branch, reset working tree to remote state (keeping our untracked spec/plan/superpowers files), then proceed.

- [ ] **Step 1: Initialize git and configure user**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
git init
git config user.name "Raffaele Francesco D'Amato"
git config user.email "raffaelefrancesco.damato@gmail.com"
git branch -M main
```

Expected: `Initialized empty Git repository`, `main` branch created.

- [ ] **Step 2: Create `.gitignore`**

Create file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/.gitignore` with:

```
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Brainstorming workspace (private)
.superpowers/

# Editor
.vscode/
.idea/
*.swp

# Logs
*.log

# Node (if ever added)
node_modules/
```

- [ ] **Step 3: Add remote origin**

```bash
git remote add origin https://github.com/raffaelefrancescodamato-ai/raffaelefrancescodamato.it.git
git fetch origin main
```

Expected: fetch completes, `origin/main` is now visible with `git branch -r`.

- [ ] **Step 4: Reset working tree to match origin/main, preserving untracked files**

```bash
git reset --soft origin/main
git status
```

Expected: working tree shows untracked `docs/`, no committed history conflict. Local files (index.html, assets/) match origin and are no longer "new".

- [ ] **Step 5: Verify clean state**

```bash
git status
ls -la
```

Expected: branch is `main`, tracking `origin/main`, status shows only untracked `docs/`, `.gitignore` (new), and `.superpowers/` ignored.

- [ ] **Step 6: Initial commit (gitignore + spec + plan)**

```bash
git add .gitignore docs/
git commit -m "chore: add .gitignore, design spec and implementation plan"
```

Don't push yet — first commit goes up after Task 16.

---

## Task 1: Clean up dead files

**Files:**
- Delete: `assets/app.js` (487KB unused Vite bundle)
- Delete: `assets/AquaMind.png` (775KB, will be replaced)
- Delete: `assets/.DS_Store`, `.DS_Store` (macOS noise)

- [ ] **Step 1: Remove dead files**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
rm -f assets/app.js assets/AquaMind.png assets/.DS_Store .DS_Store
```

- [ ] **Step 2: Verify removal**

```bash
ls -la assets/
```

Expected: no `app.js`, no `AquaMind.png`, no `.DS_Store`. Should still see: `apple-touch-icon.png`, `favicon-512.png`, `favicon-rfd.svg`, `rdditalia.png`, `Raffaele_Francesco_DAmato_CV.pdf`, `README.md`, `styles.css`.

- [ ] **Step 3: Stage deletions and commit**

```bash
git add -A assets/
git commit -m "chore: remove dead Vite bundle and unused assets"
```

Note: `assets/styles.css` will be rewritten in Task 2 — don't delete it yet (we overwrite).

---

## Task 2: Rewrite `assets/styles.css` from scratch — Part 1 (foundations)

**Files:**
- Modify: `assets/styles.css` (full rewrite, this part: variables + reset + typography)

We rewrite the CSS in three parts to keep each task focused. Part 1 establishes the design tokens and base typography.

- [ ] **Step 1: Overwrite `assets/styles.css` with foundations**

Create file `/Users/kekko/Desktop/Lavoro/ME/Sito Web/assets/styles.css` with this content (this completely replaces the existing file):

```css
/* ============================================================
   Raffaele Francesco D'Amato — Editorial Premium
   Design system v2 · 2026
   ============================================================ */

/* --- DESIGN TOKENS --- */
:root {
  /* Palette */
  --bg:           #f6f1e8;
  --bg-secondary: #ede4d4;
  --paper:        #fcfaf6;
  --rule:         #d4c4a0;
  --rule-dark:    #8c7a55;
  --accent:       #8c5a2b;
  --accent-warm:  #b97a3c;
  --gold:         #c4a878;
  --ink:          #1a1a1a;
  --ink-soft:     #5a5a5a;
  --success:      #16a34a;

  /* Typography */
  --display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --body:    'EB Garamond', Georgia, 'Times New Roman', serif;
  --ui:      'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  /* Layout */
  --container-max: 1280px;
  --container-pad: 56px;
  --container-pad-mobile: 24px;
  --section-gap: 96px;
  --section-gap-mobile: 64px;

  /* Motion */
  --transition: 240ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- RESET & BASE --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

body {
  font-family: var(--body);
  font-size: 18px;
  line-height: 1.6;
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img, svg { max-width: 100%; display: block; }
img { height: auto; }

a { color: inherit; text-decoration: none; transition: color var(--transition); }
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

button { font: inherit; cursor: pointer; background: none; border: 0; color: inherit; }
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

ul, ol { list-style: none; }

/* Skip-to-content for a11y */
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--ink);
  color: var(--paper);
  padding: 12px 18px;
  z-index: 100;
  font-family: var(--ui);
  font-size: 13px;
  border-radius: 4px;
  transition: top var(--transition);
}
.skip-link:focus { top: 16px; }

/* --- TYPOGRAPHY UTILITIES --- */
.display { font-family: var(--display); font-weight: 400; letter-spacing: -1px; line-height: 1.05; }
.display-italic { font-family: var(--display); font-weight: 400; font-style: italic; }
.label {
  font-family: var(--ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
}
.label-soft {
  font-family: var(--ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--ink-soft);
}

/* --- CONTAINER --- */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}
@media (max-width: 768px) {
  .container { padding-inline: var(--container-pad-mobile); }
}

/* Continued in next file edit... */
```

- [ ] **Step 2: Verify file written**

```bash
wc -l assets/styles.css
head -20 assets/styles.css
```

Expected: ~120 lines, header `Raffaele Francesco D'Amato — Editorial Premium`.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "style: rewrite CSS foundations (tokens, reset, typography)"
```

---

## Task 3: `assets/styles.css` — Part 2 (topbar, hero, sections)

**Files:**
- Modify: `assets/styles.css` (append layout systems)

- [ ] **Step 1: Append layout CSS to `assets/styles.css`**

Append (do NOT overwrite) the following to the end of `assets/styles.css`:

```css
/* --- TOPBAR --- */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px var(--container-pad);
  border-bottom: 1px solid var(--rule);
  font-family: var(--ui);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--ink-soft);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 50;
  backdrop-filter: blur(10px);
}
.topbar-brand {
  font-family: var(--display);
  font-style: italic;
  font-size: 20px;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
}
.topbar-brand b { font-style: normal; font-weight: 700; letter-spacing: 1px; }
.topbar-nav {
  display: flex;
  gap: 36px;
}
.topbar-nav a {
  color: var(--ink-soft);
  font-weight: 500;
}
.topbar-nav a:hover { color: var(--accent); }
.topbar-right { display: flex; gap: 24px; align-items: center; }

.lang-toggle {
  display: inline-flex;
  border: 1px solid var(--rule-dark);
  border-radius: 999px;
  overflow: hidden;
  background: var(--paper);
}
.lang-toggle a {
  padding: 6px 14px;
  font-family: var(--ui);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: var(--ink-soft);
  transition: all var(--transition);
}
.lang-toggle a.active {
  background: var(--ink);
  color: var(--paper);
}
.lang-toggle a:not(.active):hover { color: var(--accent); }

@media (max-width: 900px) {
  .topbar { padding: 16px var(--container-pad-mobile); flex-wrap: wrap; gap: 16px; }
  .topbar-nav { display: none; }
}

/* --- ISSUE TAG (masthead band) --- */
.issue-band {
  display: flex;
  justify-content: space-between;
  padding: 18px var(--container-pad) 0;
  font-family: var(--ui);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
@media (max-width: 768px) {
  .issue-band { padding-inline: var(--container-pad-mobile); flex-direction: column; gap: 6px; }
}

/* --- HERO --- */
.hero {
  padding: 32px var(--container-pad) 96px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 80px;
  align-items: end;
  min-height: 78vh;
}
.hero-pretitle {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}
.hero-pretitle::before {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--accent);
}
.hero h1 {
  font-family: var(--display);
  font-size: clamp(56px, 9vw, 132px);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -3px;
  color: var(--ink);
  margin-bottom: 28px;
}
.hero h1 .italic {
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}
.hero-rule {
  width: 80px;
  height: 1px;
  background: var(--rule-dark);
  margin: 32px 0 24px;
}
.hero-role {
  font-family: var(--ui);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 28px;
  font-weight: 500;
}
.hero-lede {
  font-family: var(--body);
  font-size: clamp(20px, 2.4vw, 24px);
  line-height: 1.5;
  color: var(--ink);
  max-width: 540px;
  font-weight: 400;
}
.hero-lede em {
  font-style: italic;
  color: var(--accent);
}
.hero-cta {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 40px;
  flex-wrap: wrap;
}

/* Hero right column (masthead metadata) */
.hero-meta {
  font-family: var(--ui);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
  border-left: 1px solid var(--rule);
  padding-left: 36px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.hero-meta-block {
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
}
.hero-meta-block:first-child { padding-top: 0; }
.hero-meta-block:last-child { border-bottom: 0; padding-bottom: 0; }
.hero-meta-label {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 8px;
  font-weight: 600;
}
.hero-meta-value {
  font-family: var(--body);
  font-size: 17px;
  color: var(--ink);
  line-height: 1.4;
}
.hero-meta-value em { color: var(--accent); font-style: italic; }
.hero-meta-value small {
  display: block;
  font-family: var(--ui);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
}

.availability-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
  margin-right: 8px;
  vertical-align: middle;
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15); }
  50%      { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0.05); }
}

@media (max-width: 1000px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 24px var(--container-pad-mobile) 64px;
    min-height: auto;
  }
  .hero-meta {
    border-left: 0;
    border-top: 1px solid var(--rule);
    padding-left: 0;
    padding-top: 16px;
  }
  .hero h1 { letter-spacing: -2px; margin-bottom: 16px; }
}

/* --- SECTIONS --- */
.section {
  padding: var(--section-gap) var(--container-pad);
  border-top: 1px solid var(--rule);
}
.section:nth-of-type(odd) { background: var(--bg); }
.section:nth-of-type(even) { background: var(--bg-secondary); }
.section-num {
  font-family: var(--display);
  font-style: italic;
  font-size: 18px;
  color: var(--gold);
  margin-bottom: 8px;
}
.section h2 {
  font-family: var(--display);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  letter-spacing: -1.5px;
  line-height: 1.05;
  color: var(--ink);
  margin-bottom: 48px;
  max-width: 800px;
}
.section h2 em {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}

@media (max-width: 768px) {
  .section { padding: var(--section-gap-mobile) var(--container-pad-mobile); }
  .section h2 { margin-bottom: 32px; }
}

/* --- BUTTONS --- */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 16px 28px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 999px;
  transition: all var(--transition);
}
.btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

.btn-link {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--ink);
  padding: 14px 0;
  border-bottom: 1px solid var(--ink);
  transition: all var(--transition);
}
.btn-link:hover { color: var(--accent); border-bottom-color: var(--accent); }

.btn-out {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 14px 26px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);
  border-radius: 999px;
  transition: all var(--transition);
}
.btn-out:hover { background: var(--ink); color: var(--paper); }
```

- [ ] **Step 2: Verify file size**

```bash
wc -l assets/styles.css
```

Expected: ~410 lines (after appending part 2).

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "style: add topbar, hero, section, button systems"
```

---

## Task 4: `assets/styles.css` — Part 3 (components: about, work, capabilities, faq, footer)

**Files:**
- Modify: `assets/styles.css` (append component styles)

- [ ] **Step 1: Append component CSS**

Append the following to the end of `assets/styles.css`:

```css
/* --- ABOUT --- */
.about-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 80px;
  align-items: start;
}
.about-text p {
  font-family: var(--body);
  font-size: 19px;
  line-height: 1.7;
  color: var(--ink);
  margin-bottom: 20px;
  max-width: 580px;
}
.about-text p em {
  font-style: italic;
  color: var(--accent);
}
.about-facts {
  background: var(--paper);
  border: 1px solid var(--rule);
  padding: 36px;
  border-radius: 4px;
}
.about-fact {
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
}
.about-fact:last-child { border-bottom: 0; padding-bottom: 0; }
.about-fact:first-child { padding-top: 0; }
.about-fact-label {
  font-family: var(--ui);
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
  font-weight: 600;
}
.about-fact-value {
  font-family: var(--body);
  font-size: 17px;
  color: var(--ink);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* --- SELECTED WORK --- */
.work-featured {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 48px;
  margin-bottom: 8px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 56px;
  align-items: start;
}
.work-featured-cover {
  background: var(--bg-secondary);
  border-radius: 4px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--rule);
}
.work-featured-cover img { width: 100%; height: 100%; object-fit: cover; }
.work-featured-badge {
  display: inline-block;
  font-family: var(--ui);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
  background: var(--accent);
  color: var(--paper);
  border-radius: 3px;
  margin-bottom: 16px;
}
.work-featured h3 {
  font-family: var(--display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin-bottom: 12px;
}
.work-featured h3 em { font-style: italic; color: var(--accent); font-weight: 400; }
.work-featured-sub {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ink-soft);
  font-weight: 500;
  margin-bottom: 24px;
}
.work-featured-desc {
  font-family: var(--body);
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink);
  margin-bottom: 28px;
}
.work-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.work-stack span {
  font-family: var(--ui);
  font-size: 11px;
  letter-spacing: 0.5px;
  font-weight: 500;
  padding: 5px 11px;
  background: var(--bg-secondary);
  border: 1px solid var(--rule);
  border-radius: 3px;
  color: var(--ink-soft);
}
.work-featured-cta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}

@media (max-width: 900px) {
  .work-featured { grid-template-columns: 1fr; gap: 32px; padding: 32px; }
}

.work-rows { margin-top: 16px; }
.work-row {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 32px;
  align-items: baseline;
  padding: 28px 0;
  border-bottom: 1px solid var(--rule);
  transition: background var(--transition);
}
.work-row:hover { background: rgba(196, 168, 120, 0.06); padding-inline: 16px; }
.work-row:last-child { border-bottom: 0; }
.work-num {
  font-family: var(--display);
  font-style: italic;
  font-size: 28px;
  color: var(--gold);
  font-weight: 400;
}
.work-row h3 {
  font-family: var(--display);
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.5px;
}
.work-row h3 em { font-style: italic; color: var(--accent); font-weight: 400; }
.work-row p {
  font-family: var(--body);
  font-size: 16px;
  color: var(--ink-soft);
  margin-top: 8px;
  max-width: 560px;
  line-height: 1.55;
}
.work-row-meta {
  font-family: var(--ui);
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ink-soft);
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .work-row { grid-template-columns: 60px 1fr; gap: 16px; }
  .work-row-meta { grid-column: 1 / -1; text-align: left; padding-left: 76px; margin-top: 4px; }
}

/* --- CAPABILITIES --- */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 56px 64px;
}
.capability {
  border-top: 1px solid var(--rule-dark);
  padding-top: 24px;
}
.capability-num {
  font-family: var(--display);
  font-style: italic;
  font-size: 18px;
  color: var(--gold);
  margin-bottom: 8px;
}
.capability h3 {
  font-family: var(--display);
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
  line-height: 1.15;
}
.capability h3 em { font-style: italic; color: var(--accent); font-weight: 400; }
.capability p {
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink);
  margin-bottom: 18px;
}
.capability-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.capability-stack span {
  font-family: var(--ui);
  font-size: 10.5px;
  letter-spacing: 0.5px;
  font-weight: 500;
  padding: 4px 10px;
  background: transparent;
  border: 1px solid var(--rule-dark);
  border-radius: 3px;
  color: var(--ink-soft);
}

@media (max-width: 768px) {
  .capabilities-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* --- APPROACH --- */
.approach-list { display: flex; flex-direction: column; gap: 56px; max-width: 880px; }
.approach-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  align-items: start;
  padding-bottom: 56px;
  border-bottom: 1px solid var(--rule);
}
.approach-item:last-child { border-bottom: 0; padding-bottom: 0; }
.approach-num {
  font-family: var(--display);
  font-style: italic;
  font-size: 56px;
  color: var(--gold);
  line-height: 1;
}
.approach-item h3 {
  font-family: var(--display);
  font-size: 32px;
  font-weight: 500;
  font-style: italic;
  color: var(--accent);
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.5px;
}
.approach-claim {
  font-family: var(--body);
  font-size: 22px;
  font-style: italic;
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.45;
}
.approach-body {
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink);
}
.approach-example {
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
  font-style: italic;
  margin-top: 14px;
  padding-left: 18px;
  border-left: 2px solid var(--gold);
}

@media (max-width: 768px) {
  .approach-item { grid-template-columns: 1fr; gap: 12px; }
  .approach-num { font-size: 40px; }
}

/* --- FAQ --- */
.faq-list { max-width: 880px; }
.faq-item {
  border-bottom: 1px solid var(--rule);
}
.faq-item:first-child { border-top: 1px solid var(--rule); }
.faq-question {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  cursor: pointer;
}
.faq-question h3 {
  font-family: var(--display);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 500;
  color: var(--ink);
  line-height: 1.25;
  letter-spacing: -0.3px;
  flex: 1;
  padding-right: 24px;
}
.faq-toggle {
  font-family: var(--display);
  font-style: italic;
  font-size: 28px;
  color: var(--accent);
  flex-shrink: 0;
  width: 32px;
  text-align: center;
  transition: transform var(--transition);
}
.faq-item[data-open="true"] .faq-toggle { transform: rotate(45deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 360ms ease, padding 240ms ease;
}
.faq-item[data-open="true"] .faq-answer {
  max-height: 600px;
  padding-bottom: 32px;
}
.faq-answer p {
  font-family: var(--body);
  font-size: 18px;
  line-height: 1.7;
  color: var(--ink);
  max-width: 720px;
}
.faq-answer p a {
  color: var(--accent);
  border-bottom: 1px solid var(--accent);
}

/* --- CONTACT --- */
.contact-block { text-align: center; padding-top: 32px; }
.contact-lead {
  font-family: var(--body);
  font-size: 21px;
  font-style: italic;
  color: var(--ink-soft);
  max-width: 580px;
  margin: 0 auto 40px;
  line-height: 1.55;
}
.contact-email {
  font-family: var(--display);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 400;
  color: var(--accent);
  display: block;
  margin: 24px auto 48px;
  word-break: break-word;
  letter-spacing: -0.5px;
  line-height: 1.1;
}
.contact-email:hover { color: var(--accent-warm); }
.contact-social {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 48px;
}
.contact-social a {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--ink-soft);
  border-bottom: 1px solid var(--rule-dark);
  padding-bottom: 4px;
}
.contact-social a:hover { color: var(--accent); border-bottom-color: var(--accent); }
.contact-quote {
  font-family: var(--display);
  font-style: italic;
  font-size: clamp(22px, 3vw, 32px);
  color: var(--ink-soft);
  max-width: 720px;
  margin: 64px auto 0;
  line-height: 1.4;
  border-top: 1px solid var(--rule);
  padding-top: 48px;
}

/* --- FOOTER --- */
.footer {
  padding: 48px var(--container-pad);
  border-top: 1px solid var(--rule-dark);
  background: var(--bg-secondary);
  font-family: var(--ui);
  font-size: 12px;
  color: var(--ink-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer a { color: var(--ink-soft); border-bottom: 1px solid transparent; }
.footer a:hover { color: var(--accent); border-bottom-color: var(--accent); }
.footer-meta { display: flex; gap: 24px; flex-wrap: wrap; }
@media (max-width: 768px) {
  .footer { padding: 32px var(--container-pad-mobile); flex-direction: column; align-items: flex-start; }
}

/* --- SCROLL ANIMATIONS (intersection observer adds .visible) --- */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms ease, transform 700ms ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .fade-up { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Verify total CSS size**

```bash
wc -l assets/styles.css
```

Expected: ~750-800 lines total.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "style: add about/work/capabilities/approach/faq/contact components"
```

---

## Task 5: Rewrite `index.html` IT — structure + meta + JSON-LD

**Files:**
- Modify: `index.html` (full rewrite — this part: head + structural shell)

We rewrite `index.html` in two tasks because the file will be ~600 lines. Task 5 covers the `<head>` (meta, JSON-LD, schema, OG tags) plus the empty body scaffold. Task 6 fills in all 7 sections.

- [ ] **Step 1: Overwrite `index.html` with head + body scaffold**

Replace the entire content of `/Users/kekko/Desktop/Lavoro/ME/Sito Web/index.html` with:

```html
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <title>Raffaele Francesco D'Amato — AI Developer & Founder | Chatbot · Automazioni · Dashboard</title>
  <meta name="description" content="AI Developer e Founder italiano. Costruisco chatbot AI, automazioni n8n e dashboard web con impatto misurabile. Universal Form Compiler open source. Portfolio, progetti e CV scaricabile." />
  <meta name="author" content="Raffaele Francesco D'Amato" />
  <meta name="keywords" content="Raffaele Francesco D'Amato, AI Developer Italia, automazioni n8n, chatbot AI, dashboard web, Universal Form Compiler, FastAPI, Supabase, Python, TypeScript, RAG, LLM, founder" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <link rel="canonical" href="https://raffaelefrancescodamato.it/" />
  <link rel="alternate" hreflang="it" href="https://raffaelefrancescodamato.it/" />
  <link rel="alternate" hreflang="en" href="https://raffaelefrancescodamato.it/en/" />
  <link rel="alternate" hreflang="x-default" href="https://raffaelefrancescodamato.it/" />

  <!-- Open Graph -->
  <meta property="og:type" content="profile" />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:locale:alternate" content="en_US" />
  <meta property="og:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta property="og:description" content="Chatbot AI, automazioni e dashboard con impatto misurabile. Universal Form Compiler open source. Portfolio e progetti." />
  <meta property="og:url" content="https://raffaelefrancescodamato.it/" />
  <meta property="og:site_name" content="Raffaele Francesco D'Amato" />
  <meta property="og:image" content="https://raffaelefrancescodamato.it/assets/images/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta property="profile:first_name" content="Raffaele Francesco" />
  <meta property="profile:last_name" content="D'Amato" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta name="twitter:description" content="Chatbot AI, automazioni e dashboard con impatto misurabile. Universal Form Compiler open source." />
  <meta name="twitter:image" content="https://raffaelefrancescodamato.it/assets/images/og-image.jpg" />

  <!-- Icons -->
  <link rel="icon" type="image/svg+xml" href="/assets/favicon-rfd.svg" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <!-- Styles -->
  <link rel="stylesheet" href="/assets/styles.css" />

  <!-- JSON-LD: Person -->
  <script type="application/ld+json">
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
      "Anthropic Claude API",
      "Sviluppo Full-Stack",
      "Web Development"
    ],
    "alumniOf": [
      {"@type": "EducationalOrganization", "name": "Università di Informatica"},
      {"@type": "EducationalOrganization", "name": "Istituto Tecnico Aeronautico"}
    ],
    "nationality": {"@type": "Country", "name": "Italy"},
    "workLocation": {"@type": "Country", "name": "Italy"}
  }
  </script>

  <!-- JSON-LD: WebSite -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://raffaelefrancescodamato.it/#website",
    "url": "https://raffaelefrancescodamato.it/",
    "name": "Raffaele Francesco D'Amato — AI Developer & Founder",
    "inLanguage": ["it", "en"],
    "publisher": {"@id": "https://raffaelefrancescodamato.it/#person"}
  }
  </script>

  <!-- JSON-LD: ItemList of projects -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Selected Work — Raffaele Francesco D'Amato",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareSourceCode",
          "name": "Universal Form Compiler",
          "description": "Estensione Chrome che compila automaticamente qualsiasi form web partendo dai dati personali, con mapping semantico via OpenAI e anti-allucinazione.",
          "programmingLanguage": "TypeScript",
          "codeRepository": "https://github.com/raffaelefrancescodamato-ai/universal-form-compiler",
          "license": "https://opensource.org/licenses/MIT",
          "url": "https://github.com/raffaelefrancescodamato-ai/universal-form-compiler"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "CreativeWork",
          "name": "Chatbot RDD Italia",
          "description": "Assistente AI integrato per richieste clienti e consultazione documenti aziendali.",
          "url": "https://rdditalia.com"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "CreativeWork",
          "name": "AquaMind AI",
          "description": "Dashboard interattiva con assistente AI e integrazione API esterne.",
          "url": "https://aquamind-ai.lovable.app/"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "CreativeWork",
          "name": "Gestionale web + Chatbot",
          "description": "Area login, dashboard clienti, chatbot per aggiornamenti automatici."
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "CreativeWork",
          "name": "Dashboard Clienti RDD Italia",
          "description": "Monitoraggio progetti con accesso protetto, notifiche e interfaccia intuitiva."
        }
      }
    ]
  }
  </script>

  <!-- JSON-LD: FAQ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto dura un progetto tipo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per chatbot o flusso n8n di complessità media servono 2-4 settimane: discovery, prototipo, test su dati reali, rilascio. Per dashboard web complete: 4-8 settimane."
        }
      },
      {
        "@type": "Question",
        "name": "Serve avere già un CRM o dati strutturati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Mappiamo insieme dati, fonti e API da integrare. Se hai CRM o help desk li collego, altrimenti propongo uno stack leggero (Supabase + FastAPI) da zero."
        }
      },
      {
        "@type": "Question",
        "name": "Come si misura il ROI di un progetto AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Imposto KPI all'inizio: tempi risposta, costi per ticket, conversioni, ore team risparmiate. Report automatici settimanali leggibili anche da non-tecnici."
        }
      },
      {
        "@type": "Question",
        "name": "Lavori in remoto o on-site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remote-first dall'Italia. Disponibile a sessioni on-site per discovery o kick-off, lavoro asincrono per il resto. Tools standard: Slack/Teams, Linear/Notion, Loom per demo."
        }
      },
      {
        "@type": "Question",
        "name": "Quali tecnologie usi e perché?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Python per backend AI/automazioni, TypeScript per frontend e tooling, FastAPI + Supabase come stack veloce, n8n per orchestrazione workflow, OpenAI/Anthropic per LLM. Scelta pragmatica, ottimizzata per velocità di rilascio."
        }
      },
      {
        "@type": "Question",
        "name": "Posso vedere il tuo codice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì. Universal Form Compiler è open source su GitHub con licenza MIT — github.com/raffaelefrancescodamato-ai/universal-form-compiler. Per progetti aziendali sotto NDA condivido architettura sintetica e demo."
        }
      }
    ]
  }
  </script>
</head>
<body>
  <a href="#main" class="skip-link">Salta al contenuto</a>

  <!-- TOPBAR -->
  <header class="topbar" role="banner">
    <a href="/" class="topbar-brand"><b>RFD</b><i> · Studio</i></a>
    <nav class="topbar-nav" aria-label="Navigazione principale">
      <a href="#about">About</a>
      <a href="#work">Selected Work</a>
      <a href="#capabilities">Capabilities</a>
      <a href="#approach">Approach</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="topbar-right">
      <div class="lang-toggle" role="group" aria-label="Lingua / Language">
        <a class="active" href="/" aria-current="true">IT</a>
        <a href="/en/">EN</a>
      </div>
    </div>
  </header>

  <main id="main">
    <!-- ISSUE BAND -->
    <div class="issue-band">
      <span>Vol. 01 · Edition 2026</span>
      <span>Updated April 2026</span>
    </div>

    <!-- HERO -->
    <!-- HERO_SECTION_PLACEHOLDER -->

    <!-- ABOUT -->
    <!-- ABOUT_SECTION_PLACEHOLDER -->

    <!-- SELECTED WORK -->
    <!-- WORK_SECTION_PLACEHOLDER -->

    <!-- CAPABILITIES -->
    <!-- CAPABILITIES_SECTION_PLACEHOLDER -->

    <!-- APPROACH -->
    <!-- APPROACH_SECTION_PLACEHOLDER -->

    <!-- FAQ -->
    <!-- FAQ_SECTION_PLACEHOLDER -->

    <!-- CONTACT -->
    <!-- CONTACT_SECTION_PLACEHOLDER -->
  </main>

  <footer class="footer">
    <span>&copy; 2026 Raffaele Francesco D'Amato</span>
    <div class="footer-meta">
      <a href="/llms.txt">llms.txt</a>
      <a href="/sitemap.xml">sitemap</a>
      <a href="/en/">EN version</a>
    </div>
  </footer>

  <script src="/assets/main.js" defer></script>
</body>
</html>
```

The placeholders (`<!-- *_SECTION_PLACEHOLDER -->`) will be replaced one-by-one in Task 6.

- [ ] **Step 2: Verify file is well-formed**

```bash
wc -l index.html
grep -c "_SECTION_PLACEHOLDER" index.html
```

Expected: ~210 lines, 7 placeholders.

- [ ] **Step 3: Validate JSON-LD blocks parse**

```bash
python3 -c "
import re, json
html = open('index.html').read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
for i, b in enumerate(blocks):
    try:
        json.loads(b)
        print(f'Block {i+1}: OK')
    except Exception as e:
        print(f'Block {i+1}: INVALID — {e}')
"
```

Expected: 4 blocks, all OK.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html head with full meta, OG, JSON-LD"
```

---

## Task 6: `index.html` IT — fill section bodies

**Files:**
- Modify: `index.html` (replace 7 placeholders)

This is the longest task — replace each `<!-- *_SECTION_PLACEHOLDER -->` line with the full section markup.

- [ ] **Step 1: Replace `HERO_SECTION_PLACEHOLDER`**

Use the Edit tool with `old_string`:
```
    <!-- HERO -->
    <!-- HERO_SECTION_PLACEHOLDER -->
```
And `new_string`:
```
    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-left">
        <div class="hero-pretitle"><span class="label">Portfolio · Vol.01</span></div>
        <h1 id="hero-title">
          Raffaele<br/>
          Francesco<br/>
          <span class="italic">D&rsquo;Amato</span>
        </h1>
        <div class="hero-rule"></div>
        <p class="hero-role">AI Developer &amp; Founder · Automation Builder</p>
        <p class="hero-lede">
          Costruisco <em>chatbot</em>, <em>automazioni</em> e <em>dashboard</em> che riducono tempi operativi e restituiscono controllo sui dati. Output reali, non demo. Misurabili dal primo rilascio.
        </p>
        <div class="hero-cta">
          <a href="/assets/Raffaele_Francesco_DAmato_CV.pdf" target="_blank" rel="noopener" class="btn-primary">Scarica CV (PDF) →</a>
          <a href="#work" class="btn-link">Vedi i progetti</a>
        </div>
      </div>
      <aside class="hero-meta" aria-label="Metadata">
        <div class="hero-meta-block">
          <div class="hero-meta-label">Status</div>
          <div class="hero-meta-value"><span class="availability-dot" aria-hidden="true"></span>Aperto a <em>collaborazioni</em></div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Stack principale</div>
          <div class="hero-meta-value">Python · TypeScript · FastAPI · Supabase · n8n · LLM/RAG</div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Progetto in evidenza</div>
          <div class="hero-meta-value">Universal Form <em>Compiler</em><small>Chrome Extension · TypeScript · MIT</small></div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Sede</div>
          <div class="hero-meta-value">Italia · Remote-first</div>
        </div>
      </aside>
    </section>
```

- [ ] **Step 2: Replace `ABOUT_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- ABOUT -->
    <!-- ABOUT_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- ABOUT -->
    <section class="section" id="about" aria-labelledby="about-title">
      <div class="section-num">N°01</div>
      <h2 id="about-title">About — chi <em>sono</em></h2>
      <div class="about-grid">
        <div class="about-text fade-up">
          <p>Sono un <em>AI Developer e Founder</em> italiano. Costruisco strumenti pratici che uniscono intelligenza artificiale, automazioni e sviluppo full-stack. Lavoro su sistemi che riducono attività ripetitive, restituiscono controllo sui dati e accelerano decisioni operative.</p>
          <p>Mi sto iscrivendo all&rsquo;Università di Informatica per consolidare le basi teoriche dietro a quello che già costruisco in produzione. Vengo da un percorso tecnico aeronautico — precisione, sistemi complessi, attenzione ai dettagli sono cose che porto nel codice.</p>
          <p>Lavoro in italiano (madrelingua) e inglese tecnico (documentazione AI/API). Italia, remote-first, aperto a <em>collaborazioni concrete</em>.</p>
        </div>
        <aside class="about-facts fade-up">
          <div class="about-fact">
            <div class="about-fact-label">Based</div>
            <div class="about-fact-value">Italia · Remote-first</div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Languages</div>
            <div class="about-fact-value">Italiano · English (B2 tecnico)</div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Education</div>
            <div class="about-fact-value">Università di Informatica<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">Istituto Tecnico Aeronautico</small></div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Currently</div>
            <div class="about-fact-value">Universal Form Compiler<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">MIT · TypeScript · 2026</small></div>
          </div>
        </aside>
      </div>
    </section>
```

- [ ] **Step 3: Replace `WORK_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- SELECTED WORK -->
    <!-- WORK_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- SELECTED WORK -->
    <section class="section" id="work" aria-labelledby="work-title">
      <div class="section-num">N°02</div>
      <h2 id="work-title">Selected <em>Work</em></h2>

      <article class="work-featured fade-up">
        <div class="work-featured-cover">
          <img src="/assets/images/ufc-cover.png" alt="Universal Form Compiler — screenshot dell'estensione Chrome in azione" width="800" height="600" loading="lazy" />
        </div>
        <div class="work-featured-body">
          <span class="work-featured-badge">Featured · Open Source · MIT</span>
          <h3>Universal Form <em>Compiler</em></h3>
          <div class="work-featured-sub">Chrome Extension · TypeScript · 2026</div>
          <p class="work-featured-desc">
            Estensione Chrome che compila automaticamente qualsiasi form web partendo dai tuoi dati personali. Multi-documento, anti-allucinazione, mapping semantico via OpenAI con guard rigorosi sui campi sensibili (IBAN, password, CVV). Vanilla TypeScript + Vite + Zod, niente framework UI. Architettura a 6 fasi con AI Pass 1+2 e validazione anti-hallucination.
          </p>
          <div class="work-stack">
            <span>TypeScript</span>
            <span>Vite</span>
            <span>Zod</span>
            <span>Mammoth</span>
            <span>Vitest</span>
            <span>OpenAI API</span>
            <span>Chrome MV3</span>
          </div>
          <div class="work-featured-cta">
            <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener" class="btn-primary">Vedi su GitHub →</a>
            <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler#readme" target="_blank" rel="noopener" class="btn-link">Leggi la README</a>
          </div>
        </div>
      </article>

      <div class="work-rows">
        <div class="work-row fade-up">
          <div class="work-num">N°02</div>
          <div>
            <h3>Chatbot <em>RDD Italia</em></h3>
            <p>Assistente AI integrato per richieste clienti e consultazione documenti aziendali, con gestione dati automatizzata. Riduzione richieste ripetitive e accesso più rapido alle informazioni.</p>
          </div>
          <div class="work-row-meta">2025 · Enterprise<br/>Python · FastAPI · Supabase</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°03</div>
          <div>
            <h3><em>AquaMind</em> AI</h3>
            <p>Dashboard interattiva con servizi automatizzati e contenuti dinamici. Piattaforma con assistente AI e integrazione con API esterne per gestione semplice dei contenuti.</p>
          </div>
          <div class="work-row-meta">2025 · SaaS<br/>API · Database · Dashboard</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°04</div>
          <div>
            <h3>Gestionale <em>web</em> + Chatbot</h3>
            <p>Area login, dashboard clienti e chatbot per aggiornamenti automatici. Centralizza clienti, avanzamento lavori e comunicazioni — meno aggiornamenti manuali, processo più ordinato.</p>
          </div>
          <div class="work-row-meta">2025 · Enterprise<br/>FastAPI · Supabase · SQL</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°05</div>
          <div>
            <h3>Dashboard <em>Clienti</em> RDD</h3>
            <p>Monitoraggio stato progetti con accesso protetto, notifiche e interfaccia intuitiva. Riduzione comunicazioni a ping-pong e monitoraggio continuo.</p>
          </div>
          <div class="work-row-meta">2024 · Internal<br/>Supabase Auth + DB</div>
        </div>
      </div>
    </section>
```

- [ ] **Step 4: Replace `CAPABILITIES_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- CAPABILITIES -->
    <!-- CAPABILITIES_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- CAPABILITIES -->
    <section class="section" id="capabilities" aria-labelledby="capabilities-title">
      <div class="section-num">N°03</div>
      <h2 id="capabilities-title">Capabilities — cosa <em>costruisco</em></h2>
      <div class="capabilities-grid">
        <article class="capability fade-up">
          <div class="capability-num">i.</div>
          <h3>Chatbot &amp; <em>Assistenti AI</em></h3>
          <p>Assistenti contestuali con retrieval documentale (RAG) e risposte naturali su dati reali aziendali. Gestiscono in autonomia richieste frequenti, integrandosi con i sistemi esistenti.</p>
          <div class="capability-stack">
            <span>Python</span><span>LLM</span><span>RAG</span><span>Vector DB</span><span>FastAPI</span>
          </div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">ii.</div>
          <h3>Automazioni &amp; <em>Integrazioni</em></h3>
          <p>Workflow tra email, CRM, database e API per eliminare passaggi manuali e ridurre errori di processo. Orchestrazione affidabile con n8n e custom code dove serve.</p>
          <div class="capability-stack">
            <span>n8n</span><span>Python</span><span>REST</span><span>Webhook</span><span>OAuth</span>
          </div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">iii.</div>
          <h3>Dashboard &amp; <em>Web App</em></h3>
          <p>Piattaforme con login, gestione utenti e KPI in tempo reale. Backend API solido + frontend reattivo per monitorare attività e performance senza fragilità.</p>
          <div class="capability-stack">
            <span>FastAPI</span><span>Supabase</span><span>SQL</span><span>JS</span><span>Auth</span>
          </div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">iv.</div>
          <h3>AI Setup &amp; <em>Roadmap</em></h3>
          <p>Discovery iniziale con priorità, tempi e roadmap tecnica concreta. Per chi vuole partire ordinato senza bruciare budget. Output: documento + prototipo funzionante.</p>
          <div class="capability-stack">
            <span>Discovery</span><span>Roadmap</span><span>Prototype</span><span>Architecture</span>
          </div>
        </article>
      </div>
    </section>
```

- [ ] **Step 5: Replace `APPROACH_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- APPROACH -->
    <!-- APPROACH_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- APPROACH -->
    <section class="section" id="approach" aria-labelledby="approach-title">
      <div class="section-num">N°04</div>
      <h2 id="approach-title">Approach — <em>tre</em> principi</h2>
      <div class="approach-list">
        <article class="approach-item fade-up">
          <div class="approach-num">i.</div>
          <div>
            <h3>Efficienza chirurgica</h3>
            <p class="approach-claim">L&rsquo;automazione non è magia, è ingegneria.</p>
            <p class="approach-body">Elimino il superfluo per lasciare spazio al valore. Ogni componente esiste perché toglie attrito reale, non perché &ldquo;sta bene avere&rdquo;.</p>
            <p class="approach-example">Esempio: nella dashboard RDD, il chatbot ha sostituito 4 punti di contatto manuali con 1 conversazione strutturata, riducendo i tempi di risposta interna.</p>
          </div>
        </article>
        <article class="approach-item fade-up">
          <div class="approach-num">ii.</div>
          <div>
            <h3>Intelligenza applicata</h3>
            <p class="approach-claim">Non uso l&rsquo;AI perché va di moda.</p>
            <p class="approach-body">La uso quando risolve problemi che prima erano impossibili o troppo costosi. Quando un&rsquo;euristica fa lo stesso lavoro, scrivo l&rsquo;euristica.</p>
            <p class="approach-example">Esempio: in Universal Form Compiler, prima di chiamare l&rsquo;AI passo per un fast-path locale (autocomplete, name=email). Solo i campi rimasti vanno al modello, e l&rsquo;anti-allucinazione è guard di sistema, non opzionale.</p>
          </div>
        </article>
        <article class="approach-item fade-up">
          <div class="approach-num">iii.</div>
          <div>
            <h3>Rilascio misurabile</h3>
            <p class="approach-claim">Ogni progetto parte da un KPI.</p>
            <p class="approach-body">Tempo risposta, ore risparmiate, errori ridotti, conversioni aumentate. I report sono automatici e leggibili anche dal management.</p>
            <p class="approach-example">Esempio: per ogni chatbot misuro percentuale di richieste auto-risolte, latenza media, accuratezza su test set reale. I numeri arrivano in dashboard ogni settimana, senza dover chiedere.</p>
          </div>
        </article>
      </div>
    </section>
```

- [ ] **Step 6: Replace `FAQ_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- FAQ -->
    <!-- FAQ_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- FAQ -->
    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="section-num">N°05</div>
      <h2 id="faq-title">FAQ — domande <em>frequenti</em></h2>
      <div class="faq-list">
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-1">
            <h3>Quanto dura un progetto tipo?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-1">
            <p>Per chatbot o flusso n8n di complessità media servono <strong>2-4 settimane</strong>: discovery, prototipo, test su dati reali, rilascio. Per dashboard web complete: <strong>4-8 settimane</strong>.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-2">
            <h3>Serve avere già un CRM o dati strutturati?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-2">
            <p>No. Mappiamo insieme dati, fonti e API da integrare. Se hai CRM o help desk li collego, altrimenti propongo uno stack leggero (Supabase + FastAPI) da zero.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-3">
            <h3>Come si misura il ROI di un progetto AI?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-3">
            <p>Imposto KPI all&rsquo;inizio: tempi risposta, costi per ticket, conversioni, ore team risparmiate. Report automatici settimanali leggibili anche da non-tecnici.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-4">
            <h3>Lavori in remoto o on-site?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-4">
            <p>Remote-first dall&rsquo;Italia. Disponibile a sessioni on-site per discovery o kick-off, lavoro asincrono per il resto. Tools standard: Slack/Teams, Linear/Notion, Loom per demo.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-5">
            <h3>Quali tecnologie usi e perché?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-5">
            <p>Python per backend AI/automazioni, TypeScript per frontend e tooling, FastAPI + Supabase come stack veloce, n8n per orchestrazione workflow, OpenAI/Anthropic per LLM. Scelta pragmatica, ottimizzata per velocità di rilascio.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-6">
            <h3>Posso vedere il tuo codice?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-6">
            <p>Sì. Universal Form Compiler è open source su GitHub con licenza MIT — <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener">github.com/raffaelefrancescodamato-ai/universal-form-compiler</a>. Per progetti aziendali sotto NDA condivido architettura sintetica e demo.</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 7: Replace `CONTACT_SECTION_PLACEHOLDER`**

`old_string`:
```
    <!-- CONTACT -->
    <!-- CONTACT_SECTION_PLACEHOLDER -->
```
`new_string`:
```
    <!-- CONTACT -->
    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="section-num">N°06</div>
      <h2 id="contact-title" style="text-align: center; margin-inline: auto;">Vuoi proporre una <em>collaborazione</em>?</h2>
      <div class="contact-block">
        <p class="contact-lead">Scrivimi cosa vuoi migliorare. Ti rispondo con una proposta concreta su obiettivi, stack, tempi e prossimi passi.</p>
        <a href="mailto:raffaelefrancesco.damato@gmail.com" class="contact-email">raffaelefrancesco.damato@gmail.com</a>
        <div class="contact-social">
          <a href="https://github.com/raffaelefrancescodamato-ai" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://www.instagram.com/_kekkodamato_/" target="_blank" rel="noopener">Instagram</a>
        </div>
        <p class="contact-quote">&ldquo;Output reali, non demo. Misurabili dal primo rilascio.&rdquo;</p>
      </div>
    </section>
```

- [ ] **Step 8: Verify no placeholders left and HTML structure**

```bash
grep -c "_SECTION_PLACEHOLDER" index.html
wc -l index.html
```

Expected: 0 placeholders, ~580-650 lines.

- [ ] **Step 9: Open in browser and visually verify**

```bash
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/
```

Verify visually:
- Topbar con brand RFD · Studio + nav + lang toggle IT/EN
- Hero con titolo gigante "Raffaele Francesco D'Amato" + colonna metadata destra
- Tutte 6 sezioni numerate (N°01-N°06) presenti e leggibili
- FAQ accordion: i toggle `+` sono visibili (l'animazione apre/chiude arriverà nel Task 7)
- Footer con © 2026 + link

Stop the server: `kill %1` or close terminal.

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "feat: fill index.html sections (hero, about, work, capabilities, approach, faq, contact)"
```

---

## Task 7: Create `assets/main.js` (vanilla JS — accordion, scroll obs, smooth scroll)

**Files:**
- Create: `assets/main.js`

- [ ] **Step 1: Write the JS file**

Create `/Users/kekko/Desktop/Lavoro/ME/Sito Web/assets/main.js` with:

```javascript
/* ============================================================
   Raffaele Francesco D'Amato — Editorial Premium
   Vanilla JS · accordion · scroll obs · smooth scroll
   ============================================================ */

(function () {
  'use strict';

  // --- FAQ ACCORDION ---
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const button = item.querySelector('.faq-question');
      if (!button) return;
      button.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        const next = !isOpen;
        item.setAttribute('data-open', String(next));
        button.setAttribute('aria-expanded', String(next));
      });
    });
  }

  // --- SCROLL FADE-UP (Intersection Observer) ---
  function initScrollAnim() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // --- INIT ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFAQ();
      initScrollAnim();
      initSmoothScroll();
    });
  } else {
    initFAQ();
    initScrollAnim();
    initSmoothScroll();
  }
})();
```

- [ ] **Step 2: Verify file size**

```bash
wc -c assets/main.js
```

Expected: ~2.5KB (well under 5KB target).

- [ ] **Step 3: Visual test — FAQ accordion**

```bash
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/#faq
```

Click each FAQ question — verify:
- Toggle `+` rotates to `×` (45°) on open
- Answer slides down smoothly
- Multiple can be open at once
- Click again to close

Stop server: `kill %1`.

- [ ] **Step 4: Commit**

```bash
git add assets/main.js
git commit -m "feat: add vanilla JS for FAQ accordion, scroll fade-up, smooth scroll"
```

---

## Task 8: Create `en/index.html` (English mirror)

**Files:**
- Create: `en/index.html`

The English version is a faithful translation. Structure identical to IT, swap text + meta + JSON-LD `inLanguage`.

- [ ] **Step 1: Create the `en/` directory**

```bash
mkdir -p "/Users/kekko/Desktop/Lavoro/ME/Sito Web/en"
```

- [ ] **Step 2: Write `en/index.html`**

Create `/Users/kekko/Desktop/Lavoro/ME/Sito Web/en/index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <title>Raffaele Francesco D'Amato — AI Developer & Founder | Chatbots · Automations · Dashboards</title>
  <meta name="description" content="Italian AI Developer and Founder. I build AI chatbots, n8n automations and web dashboards with measurable impact. Universal Form Compiler open source. Portfolio, projects and downloadable CV." />
  <meta name="author" content="Raffaele Francesco D'Amato" />
  <meta name="keywords" content="Raffaele Francesco D'Amato, Italian AI Developer, n8n automations, AI chatbot, web dashboard, Universal Form Compiler, FastAPI, Supabase, Python, TypeScript, RAG, LLM, founder" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <link rel="canonical" href="https://raffaelefrancescodamato.it/en/" />
  <link rel="alternate" hreflang="it" href="https://raffaelefrancescodamato.it/" />
  <link rel="alternate" hreflang="en" href="https://raffaelefrancescodamato.it/en/" />
  <link rel="alternate" hreflang="x-default" href="https://raffaelefrancescodamato.it/" />

  <meta property="og:type" content="profile" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="it_IT" />
  <meta property="og:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta property="og:description" content="AI chatbots, automations and dashboards with measurable impact. Universal Form Compiler open source. Portfolio and projects." />
  <meta property="og:url" content="https://raffaelefrancescodamato.it/en/" />
  <meta property="og:site_name" content="Raffaele Francesco D'Amato" />
  <meta property="og:image" content="https://raffaelefrancescodamato.it/assets/images/og-image-en.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta property="profile:first_name" content="Raffaele Francesco" />
  <meta property="profile:last_name" content="D'Amato" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Raffaele Francesco D'Amato — AI Developer & Founder" />
  <meta name="twitter:description" content="AI chatbots, automations and dashboards with measurable impact. Universal Form Compiler open source." />
  <meta name="twitter:image" content="https://raffaelefrancescodamato.it/assets/images/og-image-en.jpg" />

  <link rel="icon" type="image/svg+xml" href="/assets/favicon-rfd.svg" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/assets/styles.css" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://raffaelefrancescodamato.it/#person",
    "name": "Raffaele Francesco D'Amato",
    "alternateName": "RFD",
    "jobTitle": "AI Developer & Founder",
    "description": "Italian AI Developer specializing in AI chatbots, automations and web dashboards. Founder and creator of the open-source Universal Form Compiler project.",
    "email": "mailto:raffaelefrancesco.damato@gmail.com",
    "url": "https://raffaelefrancescodamato.it/en/",
    "image": "https://raffaelefrancescodamato.it/assets/images/og-image-en.jpg",
    "sameAs": [
      "https://github.com/raffaelefrancescodamato-ai",
      "https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/",
      "https://www.instagram.com/_kekkodamato_/"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Large Language Models",
      "Retrieval Augmented Generation",
      "AI Chatbots",
      "n8n Automations",
      "FastAPI",
      "Supabase",
      "Python",
      "TypeScript",
      "Chrome Extensions",
      "OpenAI API",
      "Anthropic Claude API",
      "Full-Stack Development",
      "Web Development"
    ],
    "alumniOf": [
      {"@type": "EducationalOrganization", "name": "University of Computer Science"},
      {"@type": "EducationalOrganization", "name": "Aeronautical Technical Institute"}
    ],
    "nationality": {"@type": "Country", "name": "Italy"},
    "workLocation": {"@type": "Country", "name": "Italy"}
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://raffaelefrancescodamato.it/#website",
    "url": "https://raffaelefrancescodamato.it/en/",
    "name": "Raffaele Francesco D'Amato — AI Developer & Founder",
    "inLanguage": ["en", "it"],
    "publisher": {"@id": "https://raffaelefrancescodamato.it/#person"}
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "How long does a typical project take?", "acceptedAnswer": {"@type": "Answer", "text": "Medium-complexity chatbots or n8n flows take 2-4 weeks: discovery, prototype, real-data testing, release. Full web dashboards: 4-8 weeks."}},
      {"@type": "Question", "name": "Do I need an existing CRM or structured data?", "acceptedAnswer": {"@type": "Answer", "text": "No. We map data, sources and APIs to integrate together. If you have CRM or help desk I plug in, otherwise I propose a lightweight stack (Supabase + FastAPI) from scratch."}},
      {"@type": "Question", "name": "How do you measure ROI on an AI project?", "acceptedAnswer": {"@type": "Answer", "text": "I set KPIs upfront: response times, cost per ticket, conversions, team hours saved. Automated weekly reports readable by non-technical stakeholders."}},
      {"@type": "Question", "name": "Do you work remote or on-site?", "acceptedAnswer": {"@type": "Answer", "text": "Remote-first from Italy. Available for on-site discovery or kick-off sessions, async work for the rest. Standard tools: Slack/Teams, Linear/Notion, Loom for demos."}},
      {"@type": "Question", "name": "What technologies do you use and why?", "acceptedAnswer": {"@type": "Answer", "text": "Python for AI/automation backend, TypeScript for frontend and tooling, FastAPI + Supabase as a fast stack, n8n for workflow orchestration, OpenAI/Anthropic for LLMs. Pragmatic choices, optimized for time-to-release."}},
      {"@type": "Question", "name": "Can I see your code?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Universal Form Compiler is open source on GitHub under MIT — github.com/raffaelefrancescodamato-ai/universal-form-compiler. For NDA enterprise projects I share architecture summaries and demos."}}
    ]
  }
  </script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header class="topbar" role="banner">
    <a href="/en/" class="topbar-brand"><b>RFD</b><i> · Studio</i></a>
    <nav class="topbar-nav" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#work">Selected Work</a>
      <a href="#capabilities">Capabilities</a>
      <a href="#approach">Approach</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="topbar-right">
      <div class="lang-toggle" role="group" aria-label="Language / Lingua">
        <a href="/">IT</a>
        <a class="active" href="/en/" aria-current="true">EN</a>
      </div>
    </div>
  </header>

  <main id="main">
    <div class="issue-band">
      <span>Vol. 01 · Edition 2026</span>
      <span>Updated April 2026</span>
    </div>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-left">
        <div class="hero-pretitle"><span class="label">Portfolio · Vol.01</span></div>
        <h1 id="hero-title">
          Raffaele<br/>
          Francesco<br/>
          <span class="italic">D&rsquo;Amato</span>
        </h1>
        <div class="hero-rule"></div>
        <p class="hero-role">AI Developer &amp; Founder · Automation Builder</p>
        <p class="hero-lede">
          I build <em>chatbots</em>, <em>automations</em> and <em>dashboards</em> that cut operational time and give back data control. Real outputs, not demos. Measurable from day one.
        </p>
        <div class="hero-cta">
          <a href="/assets/Raffaele_Francesco_DAmato_CV.pdf" target="_blank" rel="noopener" class="btn-primary">Download CV (PDF) →</a>
          <a href="#work" class="btn-link">See projects</a>
        </div>
      </div>
      <aside class="hero-meta" aria-label="Metadata">
        <div class="hero-meta-block">
          <div class="hero-meta-label">Status</div>
          <div class="hero-meta-value"><span class="availability-dot" aria-hidden="true"></span>Open to <em>collaborations</em></div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Main stack</div>
          <div class="hero-meta-value">Python · TypeScript · FastAPI · Supabase · n8n · LLM/RAG</div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Featured project</div>
          <div class="hero-meta-value">Universal Form <em>Compiler</em><small>Chrome Extension · TypeScript · MIT</small></div>
        </div>
        <div class="hero-meta-block">
          <div class="hero-meta-label">Based</div>
          <div class="hero-meta-value">Italy · Remote-first</div>
        </div>
      </aside>
    </section>

    <section class="section" id="about" aria-labelledby="about-title">
      <div class="section-num">N°01</div>
      <h2 id="about-title">About — who I <em>am</em></h2>
      <div class="about-grid">
        <div class="about-text fade-up">
          <p>I&rsquo;m an Italian <em>AI Developer and Founder</em>. I build practical tools that combine artificial intelligence, automations and full-stack development. I work on systems that cut repetitive tasks, give back data control and accelerate operational decisions.</p>
          <p>I&rsquo;m enrolling in a Computer Science degree to consolidate the theory behind what I already build in production. My background is technical-aeronautical — precision, complex systems, attention to detail are things I bring to the code.</p>
          <p>I work in Italian (native) and technical English (AI/API documentation). Italy, remote-first, open to <em>concrete collaborations</em>.</p>
        </div>
        <aside class="about-facts fade-up">
          <div class="about-fact">
            <div class="about-fact-label">Based</div>
            <div class="about-fact-value">Italy · Remote-first</div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Languages</div>
            <div class="about-fact-value">Italian · English (technical B2)</div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Education</div>
            <div class="about-fact-value">Computer Science (enrolling)<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">Aeronautical Technical Institute</small></div>
          </div>
          <div class="about-fact">
            <div class="about-fact-label">Currently</div>
            <div class="about-fact-value">Universal Form Compiler<br/><small style="color: var(--ink-soft); font-family: var(--ui); font-size: 12px;">MIT · TypeScript · 2026</small></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section" id="work" aria-labelledby="work-title">
      <div class="section-num">N°02</div>
      <h2 id="work-title">Selected <em>Work</em></h2>

      <article class="work-featured fade-up">
        <div class="work-featured-cover">
          <img src="/assets/images/ufc-cover.png" alt="Universal Form Compiler — Chrome extension screenshot" width="800" height="600" loading="lazy" />
        </div>
        <div class="work-featured-body">
          <span class="work-featured-badge">Featured · Open Source · MIT</span>
          <h3>Universal Form <em>Compiler</em></h3>
          <div class="work-featured-sub">Chrome Extension · TypeScript · 2026</div>
          <p class="work-featured-desc">
            Chrome extension that auto-fills any web form from your personal data. Multi-document, anti-hallucination guards, semantic mapping via OpenAI with strict scrubbing on sensitive fields (IBAN, passwords, CVV). Vanilla TypeScript + Vite + Zod, no UI framework. 6-phase architecture with AI Pass 1+2 and anti-hallucination validation.
          </p>
          <div class="work-stack">
            <span>TypeScript</span>
            <span>Vite</span>
            <span>Zod</span>
            <span>Mammoth</span>
            <span>Vitest</span>
            <span>OpenAI API</span>
            <span>Chrome MV3</span>
          </div>
          <div class="work-featured-cta">
            <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener" class="btn-primary">View on GitHub →</a>
            <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler#readme" target="_blank" rel="noopener" class="btn-link">Read the README</a>
          </div>
        </div>
      </article>

      <div class="work-rows">
        <div class="work-row fade-up">
          <div class="work-num">N°02</div>
          <div>
            <h3>RDD Italia <em>Chatbot</em></h3>
            <p>AI assistant integrated for client requests and corporate document lookup, with automated data handling. Reduced repetitive requests, faster access to information.</p>
          </div>
          <div class="work-row-meta">2025 · Enterprise<br/>Python · FastAPI · Supabase</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°03</div>
          <div>
            <h3><em>AquaMind</em> AI</h3>
            <p>Interactive dashboard with automated services and dynamic content. Platform with AI assistant and external API integration for simple content management.</p>
          </div>
          <div class="work-row-meta">2025 · SaaS<br/>API · Database · Dashboard</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°04</div>
          <div>
            <h3>Web <em>Management</em> + Chatbot</h3>
            <p>Login area, client dashboard and chatbot for automatic updates. Centralizes clients, work progress and communications — fewer manual updates, cleaner process.</p>
          </div>
          <div class="work-row-meta">2025 · Enterprise<br/>FastAPI · Supabase · SQL</div>
        </div>

        <div class="work-row fade-up">
          <div class="work-num">N°05</div>
          <div>
            <h3>RDD <em>Client</em> Dashboard</h3>
            <p>Project status monitoring with secure access, notifications and intuitive interface. Cuts ping-pong communications, continuous monitoring.</p>
          </div>
          <div class="work-row-meta">2024 · Internal<br/>Supabase Auth + DB</div>
        </div>
      </div>
    </section>

    <section class="section" id="capabilities" aria-labelledby="capabilities-title">
      <div class="section-num">N°03</div>
      <h2 id="capabilities-title">Capabilities — what I <em>build</em></h2>
      <div class="capabilities-grid">
        <article class="capability fade-up">
          <div class="capability-num">i.</div>
          <h3>Chatbots &amp; <em>AI Assistants</em></h3>
          <p>Contextual assistants with document retrieval (RAG) and natural responses on real corporate data. They handle frequent requests autonomously, integrating with existing systems.</p>
          <div class="capability-stack"><span>Python</span><span>LLM</span><span>RAG</span><span>Vector DB</span><span>FastAPI</span></div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">ii.</div>
          <h3>Automations &amp; <em>Integrations</em></h3>
          <p>Workflows between email, CRM, databases and APIs to eliminate manual steps and reduce process errors. Reliable orchestration with n8n and custom code where needed.</p>
          <div class="capability-stack"><span>n8n</span><span>Python</span><span>REST</span><span>Webhook</span><span>OAuth</span></div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">iii.</div>
          <h3>Dashboards &amp; <em>Web Apps</em></h3>
          <p>Platforms with login, user management and real-time KPIs. Solid backend API + reactive frontend to monitor activity and performance without fragility.</p>
          <div class="capability-stack"><span>FastAPI</span><span>Supabase</span><span>SQL</span><span>JS</span><span>Auth</span></div>
        </article>
        <article class="capability fade-up">
          <div class="capability-num">iv.</div>
          <h3>AI Setup &amp; <em>Roadmap</em></h3>
          <p>Initial discovery with priorities, timelines and concrete technical roadmap. For those who want to start cleanly without burning budget. Output: document + working prototype.</p>
          <div class="capability-stack"><span>Discovery</span><span>Roadmap</span><span>Prototype</span><span>Architecture</span></div>
        </article>
      </div>
    </section>

    <section class="section" id="approach" aria-labelledby="approach-title">
      <div class="section-num">N°04</div>
      <h2 id="approach-title">Approach — <em>three</em> principles</h2>
      <div class="approach-list">
        <article class="approach-item fade-up">
          <div class="approach-num">i.</div>
          <div>
            <h3>Surgical efficiency</h3>
            <p class="approach-claim">Automation isn&rsquo;t magic, it&rsquo;s engineering.</p>
            <p class="approach-body">I cut the superfluous to leave room for value. Every component exists because it removes real friction, not because it&rsquo;s nice to have.</p>
            <p class="approach-example">Example: in the RDD dashboard, the chatbot replaced 4 manual touchpoints with 1 structured conversation, reducing internal response times.</p>
          </div>
        </article>
        <article class="approach-item fade-up">
          <div class="approach-num">ii.</div>
          <div>
            <h3>Applied intelligence</h3>
            <p class="approach-claim">I don&rsquo;t use AI because it&rsquo;s trendy.</p>
            <p class="approach-body">I use it when it solves problems that were previously impossible or too expensive. When a heuristic does the same job, I write the heuristic.</p>
            <p class="approach-example">Example: in Universal Form Compiler, before calling the AI I run a local fast-path (autocomplete, name=email). Only remaining fields go to the model, and anti-hallucination is system-level guard, not optional.</p>
          </div>
        </article>
        <article class="approach-item fade-up">
          <div class="approach-num">iii.</div>
          <div>
            <h3>Measurable releases</h3>
            <p class="approach-claim">Every project starts from a KPI.</p>
            <p class="approach-body">Response time, hours saved, errors reduced, conversions up. Reports are automated and readable by management too.</p>
            <p class="approach-example">Example: for every chatbot I track auto-resolution rate, average latency, accuracy on real test sets. Numbers land in a dashboard weekly, no need to ask.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="section-num">N°05</div>
      <h2 id="faq-title">FAQ — <em>frequent</em> questions</h2>
      <div class="faq-list">
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-1">
            <h3>How long does a typical project take?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-1">
            <p>Medium-complexity chatbots or n8n flows take <strong>2-4 weeks</strong>: discovery, prototype, real-data testing, release. Full web dashboards: <strong>4-8 weeks</strong>.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-2">
            <h3>Do I need an existing CRM or structured data?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-2">
            <p>No. We map data, sources and APIs to integrate together. If you have CRM or help desk I plug in, otherwise I propose a lightweight stack (Supabase + FastAPI) from scratch.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-3">
            <h3>How do you measure ROI on an AI project?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-3">
            <p>I set KPIs upfront: response times, cost per ticket, conversions, team hours saved. Automated weekly reports readable by non-technical stakeholders.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-4">
            <h3>Do you work remote or on-site?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-4">
            <p>Remote-first from Italy. Available for on-site discovery or kick-off sessions, async work for the rest. Standard tools: Slack/Teams, Linear/Notion, Loom for demos.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-5">
            <h3>What technologies do you use and why?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-5">
            <p>Python for AI/automation backend, TypeScript for frontend and tooling, FastAPI + Supabase as a fast stack, n8n for workflow orchestration, OpenAI/Anthropic for LLMs. Pragmatic choices, optimized for time-to-release.</p>
          </div>
        </div>
        <div class="faq-item" data-open="false">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-6">
            <h3>Can I see your code?</h3>
            <span class="faq-toggle" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-6">
            <p>Yes. Universal Form Compiler is open source on GitHub under MIT — <a href="https://github.com/raffaelefrancescodamato-ai/universal-form-compiler" target="_blank" rel="noopener">github.com/raffaelefrancescodamato-ai/universal-form-compiler</a>. For NDA enterprise projects I share architecture summaries and demos.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="section-num">N°06</div>
      <h2 id="contact-title" style="text-align: center; margin-inline: auto;">Want to propose a <em>collaboration</em>?</h2>
      <div class="contact-block">
        <p class="contact-lead">Tell me what you want to improve. I&rsquo;ll reply with a concrete proposal — goals, stack, timeline, next steps.</p>
        <a href="mailto:raffaelefrancesco.damato@gmail.com" class="contact-email">raffaelefrancesco.damato@gmail.com</a>
        <div class="contact-social">
          <a href="https://github.com/raffaelefrancescodamato-ai" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://www.instagram.com/_kekkodamato_/" target="_blank" rel="noopener">Instagram</a>
        </div>
        <p class="contact-quote">&ldquo;Real outputs, not demos. Measurable from day one.&rdquo;</p>
      </div>
    </section>
  </main>

  <footer class="footer">
    <span>&copy; 2026 Raffaele Francesco D'Amato</span>
    <div class="footer-meta">
      <a href="/llms.txt">llms.txt</a>
      <a href="/sitemap.xml">sitemap</a>
      <a href="/">IT version</a>
    </div>
  </footer>

  <script src="/assets/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Verify and validate JSON-LD**

```bash
wc -l en/index.html
python3 -c "
import re, json
html = open('en/index.html').read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
for i, b in enumerate(blocks):
    try:
        json.loads(b)
        print(f'Block {i+1}: OK')
    except Exception as e:
        print(f'Block {i+1}: INVALID — {e}')
"
```

Expected: ~330 lines, 3 JSON-LD blocks all OK.

- [ ] **Step 4: Visual test**

```bash
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/en/
```

Verify: English content, lang toggle EN active, IT link goes to `/`.

Stop server: `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add en/
git commit -m "feat: add English mirror at /en/ with full translation and JSON-LD"
```

---

## Task 9: Create `llms.txt` (LLM crawler summary)

**Files:**
- Create: `llms.txt`

- [ ] **Step 1: Write `llms.txt`**

Create `/Users/kekko/Desktop/Lavoro/ME/Sito Web/llms.txt`:

```
# Raffaele Francesco D'Amato

> Italian AI Developer and Founder. I build AI chatbots, n8n automations and web dashboards focused on measurable impact — real outputs from day one, not demos.

## About

Raffaele Francesco D'Amato is an Italian AI Developer and Founder based in Italy, working remote-first. He combines artificial intelligence, workflow automation and full-stack development to build practical tools that reduce repetitive work, give teams back control over their data, and accelerate operational decisions.

He's enrolling in a Computer Science degree to consolidate the theory behind production work he already ships. His technical background started in an Aeronautical Technical Institute — precision, complex systems, attention to detail.

Native Italian. Technical English (B2) for AI/API documentation.

## Selected projects

- **Universal Form Compiler** — Chrome extension (TypeScript, MIT) that auto-fills any web form from personal data using OpenAI for semantic mapping. Multi-document, anti-hallucination guards, sensitive-field scrubbing (IBAN, passwords, CVV). 6-phase architecture with local fast-path before AI calls. Open source: https://github.com/raffaelefrancescodamato-ai/universal-form-compiler
- **Chatbot RDD Italia** (2025) — AI assistant for client requests and corporate document lookup. Python · FastAPI · Supabase. https://rdditalia.com
- **AquaMind AI** (2025) — Interactive dashboard with automated services and dynamic content. AI assistant + external API integration. https://aquamind-ai.lovable.app/
- **Web management + Chatbot** (2025) — Login area, client dashboard and chatbot for automatic updates. FastAPI · Supabase · SQL.
- **RDD Client Dashboard** (2024) — Project monitoring with secure access and notifications. Supabase Auth + DB.

## Capabilities

- **Chatbots & AI Assistants** — Contextual assistants with document retrieval (RAG) and natural responses on real corporate data. Stack: Python, LLM, vector DB, FastAPI.
- **Automations & Integrations** — Workflows between email, CRM, databases and APIs. Stack: n8n, Python, REST, webhooks, OAuth.
- **Dashboards & Web Apps** — Platforms with login, user management, real-time KPIs. Stack: FastAPI, Supabase, SQL.
- **AI Setup & Roadmap** — Discovery, priorities, technical roadmap, time estimates. Output: document + working prototype.

## Stack

Python, TypeScript, FastAPI, Supabase, SQL, n8n, OpenAI API, Anthropic Claude API, Chrome MV3, Vite, Zod.

## Approach

Three principles: surgical efficiency (cut the superfluous), applied intelligence (use AI only where it solves what was previously impossible or too costly), measurable releases (every project starts from a KPI).

## Contact

- Email: raffaelefrancesco.damato@gmail.com
- GitHub: https://github.com/raffaelefrancescodamato-ai
- LinkedIn: https://www.linkedin.com/in/raffaele-francesco-d%E2%80%99amato-32a833382/
- Site (IT): https://raffaelefrancescodamato.it/
- Site (EN): https://raffaelefrancescodamato.it/en/
- CV (PDF): https://raffaelefrancescodamato.it/assets/Raffaele_Francesco_DAmato_CV.pdf

## Open to

Concrete collaborations, freelance engagements, internships, technical co-founder roles. Italy or remote.
```

- [ ] **Step 2: Verify**

```bash
wc -l llms.txt
head -5 llms.txt
```

Expected: ~50 lines, starts with `# Raffaele Francesco D'Amato`.

- [ ] **Step 3: Commit**

```bash
git add llms.txt
git commit -m "feat: add llms.txt with fact-rich summary for LLM crawlers"
```

---

## Task 10: Update `robots.txt` (allow AI bots) and `sitemap.xml` (bilingual + hreflang)

**Files:**
- Modify: `robots.txt`
- Modify: `sitemap.xml`

- [ ] **Step 1: Overwrite `robots.txt`**

Replace content of `/Users/kekko/Desktop/Lavoro/ME/Sito Web/robots.txt` with:

```
# robots.txt — raffaelefrancescodamato.it
# Updated 2026-04-26

User-agent: *
Allow: /

# Search & social crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI / LLM crawlers — explicitly allowed for GEO
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://raffaelefrancescodamato.it/sitemap.xml
```

- [ ] **Step 2: Overwrite `sitemap.xml`**

Replace content of `/Users/kekko/Desktop/Lavoro/ME/Sito Web/sitemap.xml` with:

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

- [ ] **Step 3: Validate sitemap XML**

```bash
python3 -c "
import xml.etree.ElementTree as ET
tree = ET.parse('sitemap.xml')
root = tree.getroot()
urls = root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
print(f'URLs: {len(urls)}')
for u in urls:
    loc = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
    print(f'  - {loc}')
"
```

Expected: 2 URLs (root and /en/).

- [ ] **Step 4: Commit**

```bash
git add robots.txt sitemap.xml
git commit -m "feat: extend robots.txt for AI bots, bilingual sitemap with hreflang"
```

---

## Task 11: Generate placeholder cover images

**Files:**
- Create: `assets/images/og-image.jpg`, `assets/images/og-image-en.jpg`, `assets/images/ufc-cover.png`
- Optional: `assets/images/aquamind-cover.png` (since AquaMind.png was deleted)

For a sustainable workflow, we generate the og-image and UFC cover via HTML (rendered in browser, screenshotted manually if needed). The site references these images even if they're temporarily placeholder — broken images break OG previews.

- [ ] **Step 1: Create images directory**

```bash
mkdir -p "/Users/kekko/Desktop/Lavoro/ME/Sito Web/assets/images"
```

- [ ] **Step 2: Create OG image generator HTML**

Create `/Users/kekko/Desktop/Lavoro/ME/Sito Web/assets/images/_og-generator.html` (the underscore prefix keeps it visually flagged as a tool, not a public asset):

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>OG Image Generator (1200×630)</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@500;600&display=swap');
  body { margin: 0; font-family: 'Inter', sans-serif; background: #999; padding: 24px; }
  .og-wrap { display: flex; flex-direction: column; gap: 24px; }
  .og {
    width: 1200px; height: 630px;
    background: linear-gradient(135deg, #f6f1e8 0%, #ede4d4 100%);
    color: #1a1a1a;
    padding: 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .og::before {
    content: ''; position: absolute; top: -100px; right: -100px;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(140, 90, 43, 0.18), transparent 65%);
    border-radius: 50%; filter: blur(40px);
  }
  .og-top {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 16px; letter-spacing: 3px; text-transform: uppercase;
    color: #8c5a2b; font-weight: 600;
  }
  .og-title {
    font-family: 'Playfair Display', serif;
    font-size: 124px; line-height: 0.95; letter-spacing: -3px;
    font-weight: 400; margin: 0;
  }
  .og-title em { font-style: italic; color: #8c5a2b; }
  .og-bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
    font-family: 'Inter', sans-serif;
  }
  .og-role {
    font-size: 26px; font-weight: 500;
    letter-spacing: 0.5px; color: #1a1a1a;
  }
  .og-role-line { width: 56px; height: 2px; background: #8c5a2b; margin-bottom: 14px; }
  .og-domain {
    font-size: 18px; letter-spacing: 2px; text-transform: uppercase;
    color: #5a5a5a; font-weight: 600;
  }
</style>
</head>
<body>
<div class="og-wrap">
  <!-- IT version -->
  <div class="og" id="og-it">
    <div class="og-top">
      <span>Vol. 01 · Edition 2026</span>
      <span>Portfolio</span>
    </div>
    <h1 class="og-title">Raffaele Francesco<br/><em>D&rsquo;Amato</em></h1>
    <div class="og-bottom">
      <div>
        <div class="og-role-line"></div>
        <div class="og-role">AI Developer &amp; Founder · Automation Builder</div>
      </div>
      <div class="og-domain">raffaelefrancescodamato.it</div>
    </div>
  </div>

  <!-- EN version (identical for now) -->
  <div class="og" id="og-en">
    <div class="og-top">
      <span>Vol. 01 · Edition 2026</span>
      <span>Portfolio</span>
    </div>
    <h1 class="og-title">Raffaele Francesco<br/><em>D&rsquo;Amato</em></h1>
    <div class="og-bottom">
      <div>
        <div class="og-role-line"></div>
        <div class="og-role">AI Developer &amp; Founder · Automation Builder</div>
      </div>
      <div class="og-domain">raffaelefrancescodamato.it/en</div>
    </div>
  </div>
</div>
<p style="color: #fff; font-family: monospace; padding: 16px; background: #333;">
  Manual export: take a screenshot of each .og box at exact 1200×630, save as<br>
  • og-image.jpg → assets/images/og-image.jpg<br>
  • og-image-en.jpg → assets/images/og-image-en.jpg
</p>
</body>
</html>
```

- [ ] **Step 3: Try headless screenshot via macOS `webkit2png` if available, else fall back to manual**

Try the automated path first:

```bash
which webkit2png 2>/dev/null && echo "webkit2png available" || echo "not available — use manual"
```

If `webkit2png` is **not** available (likely default), use Chrome headless:

```bash
# Try Chrome headless to capture og-image
CHROME=$(ls /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome 2>/dev/null || which google-chrome 2>/dev/null || which chrome 2>/dev/null)
if [ -n "$CHROME" ]; then
  echo "Chrome found: $CHROME"
  cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
  python3 -m http.server 8765 &
  SERVER_PID=$!
  sleep 1
  "$CHROME" --headless --disable-gpu --window-size=1200,630 --screenshot=assets/images/og-image.jpg "http://localhost:8765/assets/images/_og-generator.html#og-it" 2>&1 | head -5
  "$CHROME" --headless --disable-gpu --window-size=1200,630 --screenshot=assets/images/og-image-en.jpg "http://localhost:8765/assets/images/_og-generator.html#og-en" 2>&1 | head -5
  kill $SERVER_PID 2>/dev/null
  ls -la assets/images/
else
  echo "Chrome not found. Manual fallback required:"
  echo "1. Open in browser: file://$(pwd)/assets/images/_og-generator.html"
  echo "2. Take a 1200×630 screenshot of each .og element"
  echo "3. Save as og-image.jpg and og-image-en.jpg in assets/images/"
fi
```

Note: Chrome headless screenshot captures the whole page, not the specific element. The output may need trimming. If the screenshot is wrong, fall back to manual screenshot via DevTools (F12 → Device Toolbar → 1200×630 → screenshot).

- [ ] **Step 4: Create UFC cover (placeholder generator)**

Create `/Users/kekko/Desktop/Lavoro/ME/Sito Web/assets/images/_ufc-cover-generator.html`:

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>UFC Cover (800×600)</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  body { margin: 0; padding: 0; background: #444; }
  .cover {
    width: 800px; height: 600px;
    background: #fcfaf6;
    color: #1a1a1a;
    padding: 56px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover::before {
    content: ''; position: absolute; bottom: -60px; right: -60px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(140, 90, 43, 0.18), transparent 65%);
    border-radius: 50%; filter: blur(30px);
  }
  .top { display: flex; justify-content: space-between; align-items: center; }
  .badge {
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    color: #8c5a2b; font-weight: 700;
    padding: 6px 12px; background: rgba(140, 90, 43, 0.08);
    border-radius: 4px;
  }
  .ext-icon {
    width: 56px; height: 56px;
    background: #1a1a1a;
    color: #fcfaf6;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 32px; font-style: italic; font-weight: 700;
  }
  .middle { display: flex; flex-direction: column; gap: 18px; }
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 72px; line-height: 1; letter-spacing: -2px; font-weight: 400; margin: 0;
  }
  h1 em { font-style: italic; color: #8c5a2b; }
  .tagline { font-size: 18px; color: #5a5a5a; max-width: 500px; line-height: 1.5; }
  .form-mock {
    background: #fff; border: 1px solid #d4c4a0; border-radius: 6px;
    padding: 18px; display: flex; flex-direction: column; gap: 10px;
  }
  .form-row { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border: 1px solid #e0d6bc; border-radius: 4px; font-size: 13px; }
  .form-row.filled { background: rgba(22, 163, 74, 0.06); border-color: #16a34a; }
  .form-label { color: #5a5a5a; min-width: 90px; }
  .form-value { font-family: 'JetBrains Mono', monospace; color: #1a1a1a; }
  .check { color: #16a34a; font-size: 14px; margin-left: auto; }
  .bottom-meta {
    display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace;
    font-size: 12px; color: #8c7a55; padding-top: 12px; border-top: 1px solid #d4c4a0;
  }
</style>
</head>
<body>
<div class="cover">
  <div class="top">
    <span class="badge">Universal Form Compiler · MIT</span>
    <div class="ext-icon">U</div>
  </div>
  <div class="middle">
    <h1>Universal Form<br/><em>Compiler</em></h1>
    <p class="tagline">Auto-fills any web form from your personal data using OpenAI semantic mapping. Multi-document, anti-hallucination guards.</p>
    <div class="form-mock">
      <div class="form-row filled">
        <span class="form-label">Email</span>
        <span class="form-value">raffaele@example.it</span>
        <span class="check">✓</span>
      </div>
      <div class="form-row filled">
        <span class="form-label">Cognome</span>
        <span class="form-value">D'Amato</span>
        <span class="check">✓</span>
      </div>
      <div class="form-row filled">
        <span class="form-label">Telefono</span>
        <span class="form-value">+39 ••• ••• ••••</span>
        <span class="check">✓</span>
      </div>
    </div>
  </div>
  <div class="bottom-meta">
    <span>// chrome extension · typescript</span>
    <span>github.com/.../universal-form-compiler</span>
  </div>
</div>
</body>
</html>
```

- [ ] **Step 5: Capture UFC cover screenshot**

```bash
CHROME=$(ls /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome 2>/dev/null)
if [ -n "$CHROME" ]; then
  cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
  python3 -m http.server 8765 &
  SERVER_PID=$!
  sleep 1
  "$CHROME" --headless --disable-gpu --window-size=800,600 --screenshot=assets/images/ufc-cover.png "http://localhost:8765/assets/images/_ufc-cover-generator.html"
  kill $SERVER_PID 2>/dev/null
fi
ls -la assets/images/
```

Expected: `ufc-cover.png` exists, ~800x600.

If Chrome is unavailable, manually open `assets/images/_ufc-cover-generator.html` in browser, screenshot the `.cover` element at 800×600, save as `ufc-cover.png`.

- [ ] **Step 6: Commit images**

```bash
git add assets/images/
git commit -m "feat: add OG image and UFC cover assets (with HTML generators)"
```

---

## Task 12: Final validation

**Files:** none (validation only)

- [ ] **Step 1: Start local server and open both pages**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/
open http://localhost:8000/en/
```

- [ ] **Step 2: Visual checklist (manually verify each)**

In browser, visit `/` (IT) and confirm:
- [x] Hero: titolo grande, colonna destra metadata visibile
- [x] About: testo + about-facts in 2 colonne (mobile: 1 colonna)
- [x] Selected Work: UFC card featured + 4 progetti in righe
- [x] Capabilities: 4 article in griglia 2×2
- [x] Approach: 3 principi numerati
- [x] FAQ: 6 domande, accordion funzionante (click apre/chiude)
- [x] Contact: email gigante in Playfair, social links
- [x] Footer: minimale con link a llms.txt

Same for `/en/`.

- [ ] **Step 3: Run W3C HTML validation (offline)**

```bash
python3 -c "
from html.parser import HTMLParser
class Validator(HTMLParser):
    def __init__(self): super().__init__(); self.stack = []
    def handle_starttag(self, tag, attrs):
        if tag not in ('br','hr','img','input','meta','link','source','area','base','col','embed','param','wbr','track'):
            self.stack.append(tag)
    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag: self.stack.pop()
        else: print(f'  Mismatch: closing {tag}, stack top {self.stack[-3:] if self.stack else \"empty\"}')
for f in ['index.html', 'en/index.html']:
    v = Validator()
    v.feed(open(f).read())
    print(f'{f}: residual stack {v.stack}' if v.stack else f'{f}: balanced ✓')
"
```

Expected: both files balanced ✓.

- [ ] **Step 4: Validate JSON-LD on schema.org validator**

Manually open https://validator.schema.org/ and paste:
1. The full URL once deployed (`https://raffaelefrancescodamato.it/`) — but until deployed, copy the rendered HTML from the running local server
2. Paste each `<script type="application/ld+json">` block content individually if needed

Expected: no errors. Warnings on optional fields are OK.

- [ ] **Step 5: Run Lighthouse (Chrome DevTools or CLI)**

If Chrome is open at localhost:8000, open DevTools → Lighthouse tab → Run for Mobile + Desktop.

Targets:
- Performance ≥ 95
- Accessibility = 100
- Best Practices = 100
- SEO = 100

If any score < target, fix issues:
- Performance: usually image lazy-loading or render-blocking CSS
- Accessibility: contrast (verify with `--ink #1a1a1a` on `--bg #f6f1e8` = 16.8:1 ✓), alt text, label-input
- SEO: title, meta description, canonical (all already present)

- [ ] **Step 6: Test FAQ accordion + scroll fade-up**

In browser:
- Click each FAQ question → opens/closes smoothly
- Scroll down slowly → sezioni con `.fade-up` appaiono con transizione opacity+translateY
- Anchor link in topbar → smooth scroll alla sezione

- [ ] **Step 7: Stop local server**

```bash
kill %1 2>/dev/null
```

- [ ] **Step 8: No commit needed (validation only)**

If issues were found and fixed, commit with descriptive message. Otherwise skip.

---

## Task 13: Push to GitHub

**Files:** none (git operations only)

- [ ] **Step 1: Verify clean state and current commits**

```bash
cd "/Users/kekko/Desktop/Lavoro/ME/Sito Web"
git status
git log --oneline | head -20
```

Expected: clean working tree, multiple commits ahead of `origin/main`.

- [ ] **Step 2: Pull remote first (defensive — should be no-op since we reset to origin/main earlier)**

```bash
git fetch origin main
git log --oneline origin/main | head -3
```

Expected: origin/main is at the original site commit (pre-rebuild).

- [ ] **Step 3: Push to remote**

```bash
git push -u origin main
```

Expected: push succeeds. Output shows `main -> main` and the commits go up.

- [ ] **Step 4: Verify on GitHub**

```bash
gh repo view raffaelefrancescodamato-ai/raffaelefrancescodamato.it --json defaultBranchRef,pushedAt
gh api repos/raffaelefrancescodamato-ai/raffaelefrancescodamato.it/commits/main --jq '.commit.message' | head -5
```

Expected: latest commit message matches our most recent commit.

- [ ] **Step 5: Wait ~1-2 minutes, then verify GitHub Pages deployment**

```bash
echo "Wait ~1-2 minutes for GitHub Pages to rebuild, then check:"
echo "  https://raffaelefrancescodamato.it/"
echo "  https://raffaelefrancescodamato.it/en/"
echo "  https://raffaelefrancescodamato.it/llms.txt"
echo "  https://raffaelefrancescodamato.it/sitemap.xml"
echo "  https://raffaelefrancescodamato.it/robots.txt"
```

Optionally check GitHub Pages build status:

```bash
gh api repos/raffaelefrancescodamato-ai/raffaelefrancescodamato.it/pages/builds/latest --jq '{status: .status, error: .error.message, created: .created_at}'
```

Expected: `status: "built"`, no error.

- [ ] **Step 6: Final smoke test on live site**

```bash
curl -sI https://raffaelefrancescodamato.it/ | head -5
curl -sI https://raffaelefrancescodamato.it/en/ | head -5
curl -s https://raffaelefrancescodamato.it/llms.txt | head -5
```

Expected: HTTP 200, content matches our local files.

---

## Self-Review

**1. Spec coverage check:**
- Architettura file (spec §3) → Tasks 0, 1, 11
- Design system (spec §4) → Tasks 2, 3, 4
- 7 sezioni (spec §5) → Tasks 5, 6
- Vanilla JS (spec §7) → Task 7
- Bilingue EN (spec §4 lingue) → Task 8
- llms.txt (spec §6) → Task 9
- robots.txt + sitemap.xml (spec §6) → Task 10
- Cover images (spec §11 open questions) → Task 11
- Performance + a11y validation (spec §8) → Task 12
- Push to GitHub → Task 13
- All spec sections covered ✓

**2. Placeholder scan:** No "TBD", "TODO", "fill in details" in any task. ✓

**3. Type/path consistency:**
- CSS classes used in HTML tasks (Task 6) match those defined in CSS tasks (2-4): `.topbar`, `.hero`, `.hero-meta`, `.section`, `.work-featured`, `.work-row`, `.capability`, `.approach-item`, `.faq-item`, `.contact-block` — all consistent ✓
- IDs used in JSON-LD (`#person`, `#website`) and `aria-controls` (`faq-answer-1` through `faq-answer-6`) match between IT and EN versions ✓
- File paths consistent: `/assets/styles.css`, `/assets/main.js`, `/assets/images/og-image.jpg`, `/assets/images/ufc-cover.png` — used identically across HTML files ✓

**4. Outstanding gaps:** None — every spec deliverable has a concrete task with full code.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-04-26-website-rebuild.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review work between tasks before moving on. Best for catching issues early. Slightly slower per-task but higher quality and traceability.

2. **Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints for your review. Faster overall but I'd be the only set of eyes mid-flight.

**Which approach?**
