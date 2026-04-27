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
