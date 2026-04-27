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
