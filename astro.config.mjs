import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.raffaelefrancescodamato.it',
  output: 'static',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  build: {
    format: 'directory'
  },
  compressHTML: true,
  trailingSlash: 'always'
})
