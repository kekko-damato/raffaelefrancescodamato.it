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
      it: 'Sì. <a href="https://github.com/kekko-damato/nonna" target="_blank" rel="noopener">Nonna</a> (skill per Claude Code) e <a href="https://github.com/kekko-damato/universal-form-compiler" target="_blank" rel="noopener">Universal Form Compiler</a> (estensione Chrome) sono open source su GitHub con licenza MIT. Per progetti aziendali sotto NDA condivido architettura sintetica e demo.',
      en: 'Yes. <a href="https://github.com/kekko-damato/nonna" target="_blank" rel="noopener">Nonna</a> (Claude Code skill) and <a href="https://github.com/kekko-damato/universal-form-compiler" target="_blank" rel="noopener">Universal Form Compiler</a> (Chrome extension) are open source on GitHub under MIT. For NDA enterprise projects I share architecture summaries and demos.'
    }
  }
]

/**
 * Plain-text projection of `faq.a` for schema.org FAQPage JSON-LD output.
 *
 * The HTML allowed in `faq.a` today is a strict subset: `<strong>` and `<a>`.
 * This stripper removes any HTML tag (so adding new tags to the answers
 * doesn't silently break JSON-LD) and decodes the most common entities.
 */
export function plainAnswer(faq: FAQ, lang: Lang): string {
  return faq.a[lang]
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
