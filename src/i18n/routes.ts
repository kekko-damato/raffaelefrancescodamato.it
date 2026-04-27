import type { Lang } from './types'

/** Path to the home page in the given locale (relative URL). */
export const homePathOf = (l: Lang): string => l === 'it' ? '/' : '/en/'

/** Path to the other locale's home from the current one. */
export const otherPathOf = (l: Lang): string => l === 'it' ? '/en/' : '/'

/** Open Graph locale string for the given language. */
export const ogLocaleOf = (l: Lang): string => l === 'it' ? 'it_IT' : 'en_US'
