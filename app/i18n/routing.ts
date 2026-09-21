import type { Locale } from './types'

/*
 * Locale routing.
 *
 * Every locale gets a real, crawlable URL: Bosnian on the root, the rest under
 * a path prefix. This module is imported from three very different places —
 * nuxt.config.ts (route generation), the app (links, canonical, hreflang) and
 * the Nitro route that builds sitemap.xml — so it deliberately holds nothing
 * but plain functions over strings.
 *
 * Paths here are always the *base* path: the Bosnian one, with no prefix.
 * `/blog/x` is the base; `/en/blog/x` is that base rendered in a locale.
 */

export const LOCALES = ['bs', 'de', 'en', 'ar'] as const

export const DEFAULT_LOCALE: Locale = 'bs'

/*
 * Routes that deliberately do not exist in every language.
 *
 * The guides are Bosnian only because they target Bosnian-language local
 * search. Cloning them under /en, /de and /ar would publish four
 * near-identical pages of Bosnian prose with translated chrome — thin
 * duplicate content that competes with the original for no gain.
 *
 * The two destination pages are Bosnian and English. "Bihać Plitvice autom" is
 * a Bosnian query and "Plitvice from Bihać" an English one; nobody searches
 * for either in Arabic, and a German speaker heading to Plitvice searches in
 * German for Plitvice, not for Bihać.
 *
 * The airport page is the exception that gets German: the single largest
 * inbound group for this agency is the Una-Sana diaspora flying into Zagreb
 * from Germany, Austria and Switzerland, and that page is written for them.
 *
 * Matching is by prefix, so each entry covers both the route pattern
 * (/blog/:slug()) and a real path (/blog/dokumenti-za-najam-auta).
 */
const LOCALE_SCOPES: { prefix: string, locales: Locale[] }[] = [
  { prefix: '/blog', locales: ['bs'] },
  { prefix: '/plitvicka-jezera-autom', locales: ['bs', 'en'] },
  { prefix: '/nacionalni-park-una-autom', locales: ['bs', 'en'] },
  { prefix: '/dostava-vozila-aerodrom', locales: ['bs', 'en', 'de'] },
]

/*
 * Per-language slugs.
 *
 * The URL is a ranking and a comprehension signal, so an English page does not
 * sit on a Bosnian slug: /cijene is /en/prices, not /en/cijene. Matching is by
 * prefix, so one entry covers a section and everything under it — /vozila also
 * rewrites /vozila/skoda-kamiq and the /vozila/:slug() route pattern.
 *
 * Arabic reuses the English slugs. An Arabic-script URL would be
 * percent-encoded into an unreadable string everywhere it is pasted, and
 * transliterated Arabic is no more meaningful to the reader than English.
 */
const PATH_OVERRIDES: { base: string, paths: Partial<Record<Locale, string>> }[] = [
  {
    base: '/vozila',
    paths: { en: '/cars', de: '/fahrzeuge', ar: '/cars' },
  },
  {
    base: '/cijene',
    paths: { en: '/prices', de: '/preise', ar: '/prices' },
  },
  {
    base: '/o-nama',
    paths: { en: '/about', de: '/ueber-uns', ar: '/about' },
  },
  {
    base: '/uslovi',
    paths: { en: '/terms', de: '/mietbedingungen', ar: '/terms' },
  },
  {
    base: '/kontakt',
    paths: { en: '/contact', de: '/kontakt', ar: '/contact' },
  },
  {
    base: '/najam-sa-vozacem',
    paths: {
      en: '/car-with-driver',
      de: '/mietwagen-mit-fahrer',
      ar: '/car-with-driver',
    },
  },
  {
    base: '/dostava-vozila-aerodrom',
    paths: {
      en: '/airport-car-delivery',
      de: '/mietwagen-lieferung-flughafen',
    },
  },
  {
    base: '/plitvicka-jezera-autom',
    paths: { en: '/plitvice-lakes-by-car' },
  },
  {
    base: '/nacionalni-park-una-autom',
    paths: { en: '/una-national-park-by-car' },
  },
]

function overrideFor(base: string, locale: Locale): string {
  const entry = PATH_OVERRIDES.find(
    item => base === item.base || base.startsWith(`${item.base}/`),
  )
  const replacement = entry?.paths[locale]
  if (!entry || !replacement) return base
  return `${replacement}${base.slice(entry.base.length)}`
}

/* The inverse of overrideFor: a localised path back to its base path. */
function baseFromOverride(path: string, locale: Locale): string {
  for (const entry of PATH_OVERRIDES) {
    const localised = entry.paths[locale]
    if (!localised) continue
    if (path === localised || path.startsWith(`${localised}/`)) {
      return `${entry.base}${path.slice(localised.length)}`
    }
  }
  return path
}

/* Which languages a given base path is actually published in. */
export function localesForPath(base: string): Locale[] {
  const scope = LOCALE_SCOPES.find(
    entry => base === entry.prefix || base.startsWith(`${entry.prefix}/`),
  )
  return scope ? [...scope.locales] : [...LOCALES]
}

export function isPublishedIn(base: string, locale: Locale): boolean {
  return localesForPath(base).includes(locale)
}

/*
 * Base path -> the URL for one locale.
 *
 * No trailing slash on the prefix (`/en`, not `/en/`). The site serves `/blog`
 * without one and Cloudflare Pages 308s the slashed form onto the bare one, so
 * a single unslashed form everywhere keeps canonical, hreflang and sitemap
 * byte-identical to the URL that actually answers.
 */
export function localePath(base: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return base || '/'
  const path = overrideFor(base, locale)
  return `/${locale}${path === '/' ? '' : path}`
}

/* The inverse: a real path -> which locale it is, and its base path. */
export function stripLocale(path: string): { locale: Locale, base: string } {
  const match = /^\/([a-z]{2})(?=\/|$)/.exec(path)
  const code = match?.[1] as Locale | undefined

  if (code && code !== DEFAULT_LOCALE && (LOCALES as readonly string[]).includes(code)) {
    const localised = path.slice(code.length + 1) || '/'
    return { locale: code, base: baseFromOverride(localised, code) }
  }

  return { locale: DEFAULT_LOCALE, base: path || '/' }
}
