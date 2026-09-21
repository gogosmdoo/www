import type { NuxtPage } from 'nuxt/schema'
import type { Locale } from './app/i18n/types'
import { DEFAULT_LOCALE, isPublishedIn, localePath, LOCALES } from './app/i18n/routing'

/*
 * Bosnian base routes. Every localised URL is derived from these, both for
 * route generation below and for the prerender list, so a page added in
 * app/pages only ever has to be named once.
 */
const BASE_ROUTES = [
  '/',
  '/vozila',
  '/cijene',
  '/o-nama',
  '/uslovi',
  '/kontakt',
  '/najam-sa-vozacem',
  /*
   * The three pages the geography earns. Bihac has no commercial airport, so
   * /dostava-vozila-aerodrom answers the question that follows from that
   * ("then how do I get the car?") rather than pretending to a terminal desk,
   * and the two park pages target the searches that actually bring people to
   * this valley.
   */
  '/dostava-vozila-aerodrom',
  '/plitvicka-jezera-autom',
  '/nacionalni-park-una-autom',
  /*
   * The eleven /vozila/[slug] pages are not listed: the fleet index links to
   * every one of them in the active locale and crawlLinks picks them up, which
   * keeps this list from having to be edited whenever a car joins the fleet.
   */
  '/blog',
  '/blog/dokumenti-i-uslovi-za-najam-auta-u-bihacu',
  '/blog/iz-bihaca-na-plitvicka-jezera-autom',
]

const PRERENDER_ROUTES = BASE_ROUTES.flatMap(base =>
  LOCALES.filter(locale => isPublishedIn(base, locale))
    .map(locale => localePath(base, locale)),
)

/*
 * Clone every page under /en, /de and /ar, tagging each copy with its locale in
 * route meta. useI18n() reads that meta, which is what makes the language a
 * property of the URL rather than of localStorage.
 *
 * Doing it here rather than through @nuxtjs/i18n keeps the existing typed
 * LocaleMessages contract and every component's `t.value.x` access untouched,
 * and means the ~25 pages coming in Faza 3 get their locale variants for free.
 */
function localiseRoute(page: NuxtPage, locale: Locale): NuxtPage {
  return {
    ...page,
    // Goes through localePath so per-language slugs apply: /en/prices, not /en/cijene.
    path: localePath(page.path, locale),
    name: page.name ? `${page.name}___${locale}` : undefined,
    meta: { ...page.meta, locale },
    // Child paths are relative to the parent, so only the parent is prefixed.
    children: page.children?.map(child => ({
      ...child,
      name: child.name ? `${child.name}___${locale}` : undefined,
      meta: { ...child.meta, locale },
    })),
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    'pages:extend'(pages) {
      const originals = [...pages]

      for (const page of originals) {
        page.meta = { ...page.meta, locale: DEFAULT_LOCALE }
      }

      for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue
        for (const page of originals) {
          if (!isPublishedIn(page.path, locale)) continue
          pages.push(localiseRoute(page, locale))
        }
      }
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    public: {
      /*
       * The one place the canonical origin is defined. Canonical, og:url,
       * hreflang, JSON-LD @id and sitemap.xml all derive from this, so a wrong
       * value here is a sitewide SEO failure rather than a local one.
       *
       * The default is what ships whenever the env var is missing from the
       * deploy environment, and it lands in the canonical, og:url, hreflang,
       * JSON-LD @id and sitemap of every page.
       *
       * Still set NUXT_PUBLIC_SITE_URL in Cloudflare Pages for BOTH Production
       * and Preview, so a future domain change is one env edit rather than a
       * code deploy.
       *
       * TODO(client): confirm the domain. The default below is a guess and it
       * lands in the canonical, og:url, hreflang, JSON-LD @id and sitemap of
       * every page, so a wrong value here is a sitewide SEO failure rather
       * than a local one. Set NUXT_PUBLIC_SITE_URL in Cloudflare Pages for
       * BOTH Production and Preview and this default never matters.
       */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://rentacargogo.ba',
      /*
       * Web3Forms access key for the booking form. Empty in local dev, where
       * the form degrades to its mailto: fallback rather than failing.
       */
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
      /*
       * Analytics. Set one of these, not both — Plausible wins if both are
       * present. Empty means no script is loaded and no event is sent.
       */
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [...PRERENDER_ROUTES, '/sitemap.xml', '/robots.txt', '/llms.txt'],
      autoSubfolderIndex: false,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // lang/dir are set per locale in useI18n; these are the prerender defaults.
      htmlAttrs: { lang: 'bs', dir: 'ltr' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        /*
         * Fonts are self-hosted, so the old render-blocking Google Fonts
         * stylesheet is gone. Preloading the two Latin faces used above the
         * fold keeps LCP text from swapping late.
         */
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/outfit-latin.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/instrument-sans-latin.woff2',
          crossorigin: 'anonymous',
        },
      ],
      meta: [
        /* ink-950, matching the page floor, so the mobile browser bar has no
         * visible seam against the top of the hero. */
        { name: 'theme-color', content: '#080a06' },
        /*
         * iOS already gets a real tel: link on every phone CTA; without this it
         * also auto-detects the number in body copy and restyles it, which
         * overrides the site's own link colours.
         */
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
})
