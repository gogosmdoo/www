import { BUSINESS, LOCALE_OPTIONS } from '~/data/business'
import { PRICING_COMPLETE } from '~/data/pricing'
import { locales } from '~/i18n'
import { DEFAULT_LOCALE, isPublishedIn, localePath, localesForPath, stripLocale } from '~/i18n/routing'
import type { Locale } from '~/i18n/types'

/*
 * The language is a property of the URL, not of the browser.
 *
 * This used to hold the locale in useState + localStorage on a single URL,
 * which meant every language rendered at the same address and only Bosnian was
 * ever indexed. Now nuxt.config's pages:extend hook stamps `locale` into each
 * route's meta and this composable simply reads it, so the prerendered HTML for
 * /en is English on the server, in the markup, before any JS runs.
 *
 * There is deliberately no automatic redirect on Accept-Language: it would
 * bounce crawlers between locales and take the choice away from a visitor who
 * followed a link to a specific language. The switcher offers links instead.
 */

export function useI18n() {
  const route = useRoute()

  const locale = computed<Locale>(
    () => (route.meta.locale as Locale | undefined) ?? DEFAULT_LOCALE,
  )

  /* The unprefixed path, i.e. the same page in any language. */
  const basePath = computed(() => stripLocale(route.path).base)

  const t = computed(() => locales[locale.value])
  const option = computed(
    () => LOCALE_OPTIONS.find(o => o.code === locale.value) ?? LOCALE_OPTIONS[0]!,
  )
  const dir = computed(() => option.value.dir)
  const isRtl = computed(() => dir.value === 'rtl')

  /* Build a link to a base path in the current locale. */
  function localeRoute(base: string) {
    return localePath(base, locale.value)
  }

  /*
   * In-page anchors.
   *
   * Empty by design. The client specified a five-item menu of real pages, and
   * mixing anchors into it would mean two links in the same row behave
   * differently — one scrolls, one navigates — which is the usual reason a
   * visitor stops trusting a nav. The on-page sections are still reachable by
   * scrolling and from the footer.
   */
  const navLinks = computed<{ label: string, href: string }[]>(() => [])

  /*
   * The header menu, exactly as specified: Automobili, O nama, Uslovi, Blog,
   * Kontakt. Blog is appended by the header itself because it is published in
   * Bosnian only.
   *
   * Services, Airport and Prices deliberately are NOT here. Eight links wrap to
   * a second row on a laptop, and these three are better reached from the body
   * of the page and the footer, where they have context. Prices additionally
   * stays out until the rate table holds real numbers — it is noindex until
   * then, and a column of "on request" is worse than no link.
   */
  const pageLinks = computed(() => [
    { label: t.value.nav.fleet, to: localePath('/vozila', locale.value) },
    { label: t.value.nav.about, to: localePath('/o-nama', locale.value) },
    { label: t.value.nav.terms, to: localePath('/uslovi', locale.value) },
    { label: t.value.nav.contact, to: localePath('/kontakt', locale.value) },
  ])

  /*
   * Secondary destinations: footer and in-body links, not the header.
   *
   * Every entry is filtered through isPublishedIn, because three of these pages
   * do not exist in every language — the two park guides are Bosnian and
   * English only, and linking an Arabic visitor at a page that was never
   * generated is a 404 that the prerender crawler finds before a user does.
   *
   * Prices stays out until the rate table holds real numbers: it is noindex
   * until then, and a column of "on request" is worse than no link.
   */
  const secondaryLinks = computed(() => {
    const candidates = [
      { label: t.value.nav.services, base: '/najam-sa-vozacem' },
      { label: t.value.nav.airport, base: '/dostava-vozila-aerodrom' },
      { label: t.value.nav.plitvice, base: '/plitvicka-jezera-autom' },
      { label: t.value.nav.una, base: '/nacionalni-park-una-autom' },
      ...(PRICING_COMPLETE
        ? [{ label: t.value.nav.prices, base: '/cijene' }]
        : []),
    ]

    return candidates
      .filter(item => isPublishedIn(item.base, locale.value))
      .map(item => ({ label: item.label, to: localePath(item.base, locale.value) }))
  })

  /*
   * Every language variant of the page currently open. Where a page is not
   * published in a language (the Bosnian-only guides), that language points at
   * its own home page rather than vanishing from the switcher.
   */
  const localeLinks = computed(() => {
    const published = localesForPath(basePath.value)
    return LOCALE_OPTIONS.map(opt => ({
      ...opt,
      to: published.includes(opt.code)
        ? localePath(basePath.value, opt.code)
        : localePath('/', opt.code),
      isCurrent: opt.code === locale.value,
    }))
  })

  /*
   * lang and dir go through useHead so they are already correct in the
   * prerendered HTML rather than being patched in after hydration. Arabic
   * would otherwise flash left-to-right on first paint.
   */
  useHead(computed(() => ({
    htmlAttrs: { lang: option.value.htmlLang, dir: dir.value },
  })))

  const business = computed(() => ({
    ...BUSINESS,
    hours: t.value.hours,
  }))

  return {
    locale,
    basePath,
    t,
    dir,
    isRtl,
    business,
    navLinks,
    pageLinks,
    secondaryLinks,
    localeRoute,
    localeLinks,
    localeOptions: LOCALE_OPTIONS,
  }
}
