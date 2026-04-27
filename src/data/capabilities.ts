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
