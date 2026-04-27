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
      featured: { label: 'Progetto in evidenza', value: '*Nonna*', sub: 'Claude Code Skill · Python · MIT' },
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
      currently: { label: 'Currently', value: 'Nonna', sub: 'Claude Code Skill · MIT · 2026' }
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
