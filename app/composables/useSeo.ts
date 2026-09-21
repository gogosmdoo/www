import { BUSINESS, FLEET_CARS, LOCALE_OPTIONS } from '~/data/business'
import { DEFAULT_LOCALE, localePath, localesForPath } from '~/i18n/routing'
import type { FleetCar } from '~/i18n/types'

/*
 * Central SEO helper.
 *
 * Everything a crawler or a language model needs is emitted server-side into
 * the prerendered HTML: canonical, hreflang, Open Graph, Twitter, and JSON-LD.
 * Nothing here depends on hydration.
 */

export function useSiteUrl() {
  const config = useRuntimeConfig()
  return String(config.public.siteUrl).replace(/\/$/, '')
}

function join(base: string, path: string) {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/*
 * Must be called during setup. Head resolvers run lazily and outside the Nuxt
 * instance, so anything they touch has to close over a value captured here
 * rather than reach for useRuntimeConfig() at resolve time.
 */
export function absoluteUrl(path = '/') {
  return join(useSiteUrl(), path)
}

interface SeoInput {
  title: string
  description: string
  /*
   * The *base* path: the Bosnian one, with no locale prefix. The canonical and
   * the hreflang set are derived from it, so a page never has to know which
   * language it is being rendered in to describe itself correctly.
   */
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  /* Article-only */
  published?: string
  modified?: string
  noindex?: boolean
}

export function useSeo(input: MaybeRefOrGetter<SeoInput>) {
  const { locale } = useI18n()
  // Captured once, during setup, so the lazy resolvers below stay context-free.
  const origin = useSiteUrl()

  const resolved = computed(() => {
    const value = toValue(input)
    const path = value.path ?? '/'
    const option = LOCALE_OPTIONS.find(o => o.code === locale.value) ?? LOCALE_OPTIONS[0]!

    return {
      ...value,
      path,
      option,
      /*
       * Self-referencing, and pointing at this locale's own URL. The whole
       * site previously declared one canonical for every page and language.
       */
      url: join(origin, localePath(path, locale.value)),
      image: join(origin, value.image ?? BUSINESS.ogImage),
      type: value.type ?? 'website',
    }
  })

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogType: () => resolved.value.type,
    ogUrl: () => resolved.value.url,
    ogImage: () => resolved.value.image,
    ogImageAlt: () => resolved.value.imageAlt,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: BUSINESS.name,
    ogLocale: () => resolved.value.option.ogLocale,
    twitterCard: 'summary_large_image',
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => resolved.value.image,
    articlePublishedTime: () => resolved.value.published,
    articleModifiedTime: () => resolved.value.modified,
    keywords: () => resolved.value.keywords?.join(', '),
    robots: () => (resolved.value.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
  })

  useHead(() => {
    const link: Record<string, string>[] = [
      { rel: 'canonical', href: resolved.value.url },
    ]

    /*
     * hreflang lists only the languages this particular page is actually
     * published in — pointing at a URL that does not exist invalidates the
     * whole annotation set. Language-only codes (bs, not bs-BA): there is one
     * Bosnian version, not a per-country split.
     *
     * Single-language pages get no alternates at all, which is correct: the
     * Bosnian-only guides have nothing to alternate with.
     */
    const published = localesForPath(resolved.value.path)

    if (published.length > 1) {
      for (const code of published) {
        link.push({
          rel: 'alternate',
          hreflang: code,
          href: join(origin, localePath(resolved.value.path, code)),
        })
      }
      link.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: join(origin, localePath(resolved.value.path, DEFAULT_LOCALE)),
      })
    }

    return { link }
  })
}

/* ---- Structured data ----------------------------------------------------- */

/*
 * The business entity. Every other block on the site points at this @id rather
 * than restating the organisation, so there is exactly one node describing the
 * company and search engines can merge the graph.
 */
export const ORGANIZATION_ID = '#organization'

export function autoRentalSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}`,
    name: BUSINESS.name,
    description,
    url: absoluteUrl('/'),
    telephone: BUSINESS.phone,
    image: absoluteUrl(BUSINESS.ogImage),
    logo: absoluteUrl(BUSINESS.logoLockup),
    priceRange: '$$',
    currenciesAccepted: 'BAM, EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    /*
     * Monday to Saturday, from the RADNO VRIJEME card in the office window.
     * Sunday is deliberately absent rather than listed as closed: the client
     * has not confirmed either way, and the copy says Sunday is by arrangement.
     */
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
      ],
      opens: BUSINESS.hoursOpen,
      closes: BUSINESS.hoursClose,
    }],
    /*
     * No airport is listed here, and that is the point.
     *
     * Bihać has no commercial airport, so there is no terminal to claim. What
     * this business actually serves is the canton it sits in and the two
     * national parks either side of it, plus the country as a whole for
     * one-way and long-distance hires. Naming Zagreb or Zadar airport as an
     * areaServed would assert a presence in another country's terminal that
     * this company does not have.
     */
    areaServed: [
      { '@type': 'City', name: BUSINESS.city },
      { '@type': 'AdministrativeArea', name: 'Unsko-sanski kanton' },
      { '@type': 'TouristAttraction', name: 'Nacionalni park Una' },
      { '@type': 'Country', name: 'Bosnia and Herzegovina' },
    ],
    hasMap: BUSINESS.googleMapsUrl,
    sameAs: [BUSINESS.instagramUrl, BUSINESS.facebookUrl].filter(Boolean),
    /*
     * No aggregateRating and no review nodes, although the business does have
     * real 5.0 reviews. They were collected on Google, and Google's structured
     * data policy disallows marking up third-party reviews as your own
     * first-party rating — doing it risks a manual action against the whole
     * domain. The reviews are displayed, attributed and linked instead, which
     * is allowed and is what actually persuades anyone.
     */
  }
}

export function fleetSchema(categoryLabel: (id: string) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BUSINESS.name} - fleet`,
    numberOfItems: FLEET_CARS.length,
    itemListElement: FLEET_CARS.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Car',
        name: `${car.name}`,
        ...(car.seats !== null ? { seatingCapacity: car.seats } : {}),
        image: absoluteUrl(car.image),
        vehicleConfiguration: categoryLabel(car.category),
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
        },
      },
    })),
  }
}

/*
 * A single vehicle, for /vozila/[slug].
 *
 * Only fields backed by real data are emitted. cargoVolume and fuelConsumption
 * are omitted rather than guessed: both vary by body style and engine, and
 * neither is confirmed for these particular cars.
 */
export function vehicleSchema(input: {
  car: FleetCar
  path: string
  description: string
  categoryLabel: string
  /*
   * This vehicle's own daily rate, or null when it is not known. Never the
   * fleet-wide "from" figure: stating €15 on the Audi Q7 page would be a
   * false price claim to a search engine, not a rounding.
   */
  price: number | null
}) {
  const { car } = input
  const { locale } = useI18n()
  const origin = useSiteUrl()

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.name}`,
    description: input.description,
    // The URL for the locale being rendered, not the Bosnian base path.
    url: join(origin, localePath(input.path, locale.value)),
    image: absoluteUrl(car.image),
    seatingCapacity: car.seats,
    vehicleConfiguration: input.categoryLabel,
    vehicleTransmission: car.transmission === 'automatic' ? 'AutomaticTransmission' : 'ManualTransmission',
    offers: {
      '@type': 'Offer',
      // Price omitted entirely until this vehicle's own rate is confirmed.
      ...(input.price !== null
        ? { price: input.price, priceCurrency: 'EUR' }
        : {}),
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
    },
  }

  /*
   * seatingCapacity and vehicleTransmission are both nullable on FleetCar.
   * Emitting `null` for either would assert to a crawler that we know the
   * value and it is empty, so the keys are dropped instead.
   */
  if (car.seats === null) delete schema.seatingCapacity
  if (car.transmission === null) delete schema.vehicleTransmission

  return schema
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/*
 * Trail entries carry base paths; the emitted URLs are for the locale the page
 * is being rendered in, so the English breadcrumb never links into Bosnian.
 * Must be called during setup — it reads the active locale.
 */
export function breadcrumbSchema(trail: { name: string, path: string }[]) {
  const { locale } = useI18n()
  const origin = useSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: join(origin, localePath(crumb.path, locale.value)),
    })),
  }
}

export function jsonLd(...blocks: Record<string, unknown>[]) {
  useHead({
    script: blocks.map(block => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    })),
  })
}
