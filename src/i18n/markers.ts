/**
 * Helpers for the `*emphasis*` italic-marker convention used in i18n strings.
 * See `src/i18n/types.ts` for the full convention.
 */

/** Strips `*x*` markers, returning plain text. Used for JSON-LD output. */
export const stripEm = (s: string): string => s.replace(/\*([^*]+)\*/g, '$1')

/** Wraps `*x*` markers in `<em>` tags. Used by the Md helper component. */
export const renderEm = (s: string): string => s.replace(/\*([^*]+)\*/g, '<em>$1</em>')
