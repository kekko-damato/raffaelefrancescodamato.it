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
  featuredSub?: string
  title: Record<Lang, string>
  description: Record<Lang, string>
  rowMeta: string
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
    featuredSub: 'Chrome Extension · TypeScript · 2026',
    title: { it: 'Universal Form *Compiler*', en: 'Universal Form *Compiler*' },
    description: {
      it: 'Estensione Chrome che compila automaticamente qualsiasi form web partendo dai tuoi dati personali. Multi-documento, anti-allucinazione, mapping semantico via OpenAI con guard rigorosi sui campi sensibili (IBAN, password, CVV). Vanilla TypeScript + Vite + Zod, niente framework UI. Architettura a 6 fasi con AI Pass 1+2 e validazione anti-hallucination.',
      en: 'Chrome extension that auto-fills any web form from your personal data. Multi-document, anti-hallucination guards, semantic mapping via OpenAI with strict scrubbing on sensitive fields (IBAN, passwords, CVV). Vanilla TypeScript + Vite + Zod, no UI framework. 6-phase architecture with AI Pass 1+2 and anti-hallucination validation.'
    },
    rowMeta: '2026 · Chrome Ext'
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
    rowMeta: '2025 · Enterprise · Python · FastAPI · Supabase'
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
    rowMeta: '2025 · SaaS · API · Database · Dashboard'
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
    rowMeta: '2025 · Enterprise · FastAPI · Supabase · SQL'
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
    rowMeta: '2024 · Internal · Supabase Auth + DB'
  }
]
