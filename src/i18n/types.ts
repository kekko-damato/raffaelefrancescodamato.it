export type Lang = 'it' | 'en'

/**
 * Shape of all UI strings for a given locale.
 *
 * String values may contain `*emphasis*` markers that components MUST render
 * through the `Md` helper component (see `src/components/Md.astro`), which
 * expands `*x*` into `<em>x</em>`. No other Markdown is supported.
 *
 * Locale dictionaries (`it.ts`, `en.ts`) are typed as `UIStrings` to enforce
 * structural parity at compile time — a missing or extra key in either locale
 * is a TypeScript error.
 */
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
