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
