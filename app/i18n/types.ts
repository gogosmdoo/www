export type Locale = 'bs' | 'en' | 'ar' | 'de'

export interface LocaleOption {
  code: Locale
  label: string
  name: string
  dir: 'ltr' | 'rtl'
  /* BCP 47 tag for <html lang> and hreflang. */
  htmlLang: string
  /* Underscored form for og:locale. */
  ogLocale: string
}

/*
 * Categories are how a visitor shops, not how a dealer classifies. `estate` is
 * separate from `city` because a karavan is chosen for the boot and nothing
 * else, and `sport` exists because exactly one car in the fleet is rented for a
 * reason that has nothing to do with capacity.
 */
export type FleetCategory = 'city' | 'estate' | 'suv' | 'van' | 'sport' | 'business'

export interface FleetCar {
  id: string
  /* URL segment for /vozila/[slug]. Stable — changing one breaks a live URL. */
  slug: string
  name: string
  /*
   * Generation as the client wrote it ("Mk4 (NX)"). Shown as a quiet caption,
   * never in a title or a schema field: it disambiguates two Rapids in the same
   * list without turning the page into a spec sheet.
   */
  generation: string
  /* Bosnian colour word. Used in alt text and to tell the two Rapids apart. */
  colour: string
  category: FleetCategory
  /*
   * Standard factory layout, confirmed per vehicle. Null where genuinely
   * unknown — the UI omits the figure rather than printing a guess a customer
   * would discover was wrong at the counter.
   */
  seats: number | null
  /* Confirmed per vehicle by the client. */
  transmission: 'automatic' | 'manual' | null
  /* Card and page hero, 16:10. A `-sm` variant exists beside every one. */
  image: string
  /*
   * There is deliberately no `year`. Generations here run from 2013 to today
   * and a visible model year starts a comparison the copy has no reason to
   * invite.
   */
  specs: string[]
  featured?: boolean
}

export interface LocaleMessages {
  meta: {
    title: string
    description: string
    ogImageAlt: string
  }
  nav: {
    fleet: string
    about: string
    terms: string
    blog: string
    contact: string
    prices: string
    services: string
    airport: string
    plitvice: string
    una: string
    book: string
    openMenu: string
    closeMenu: string
    mainNav: string
    mobileNav: string
    langLabel: string
  }
  hero: {
    /* The only small label in the hero. */
    eyebrow: string
    titleLead: string
    /* The one word set in lime. Everything else in the headline is mist-0. */
    titleAccent: string
    titleTail: string
    subtitle: string
    imageAlt: string
    /* Two reassurances under the CTA row, not a paragraph. */
    proof: string[]
  }
  /*
   * The booking bar that straddles the bottom edge of the hero. Four fields,
   * three optional: asking for dates and a headcount up front is what lets the
   * reply come back with a price instead of a request for more information.
   */
  enquiry: {
    title: string
    note: string
    dates: string
    datesPlaceholder: string
    people: string
    peoplePlaceholder: string
    pickup: string
    pickupPlaceholder: string
    car: string
    carAny: string
    submit: string
    /* First line of the generated WhatsApp message. */
    intro: string
    reassure: string
  }
  /* Trust facts, under the booking bar. Never inside the hero. */
  facts: { value: string, label: string }[]
  /*
   * The three objections that actually stop a booking in this market: the size
   * of the deposit, whether a credit card is needed, and how the car reaches
   * you in a city with no airport. Answered high on the page, where the doubt
   * appears, rather than buried in terms.
   */
  benefits: {
    title: string
    intro: string
    items: { title: string, body: string }[]
  }
  /*
   * Google reviews. The review bodies are NOT here — they live verbatim and
   * untranslated in ~/data/reviews. Only the chrome around them is localised.
   */
  reviews: {
    title: string
    intro: string
    ratingLabel: string
    /* Carries the review count. `{n}` is substituted at render time. */
    ratingCount: string
    /* Shown under a review we only hold in Google's translation. */
    translatedNote: string
    onGoogle: string
    readOnGoogle: string
    allReviews: string
  }
  fleet: {
    eyebrow: string
    title: string
    intro: string
    book: string
    /* Prefills the WhatsApp message when a fleet card CTA is tapped. */
    bookMessage: string
    seats: string
    seatsUnknown: string
    transmissionUnknown: string
    all: string
    railHint: string
    categories: Record<string, string>
    specs: Record<string, string>
    /* {name} and {colour} are substituted. */
    imageAlt: string
  }
  /* The five stages of a rental, as an accordion. */
  steps: {
    eyebrow: string
    title: string
    intro: string
    items: { label: string, body: string }[]
  }
  /* Where the car can reach you. This is the section the geography carries. */
  locations: {
    title: string
    intro: string
    items: { title: string, body: string, meta: string }[]
    mapsLink: string
    addressNote: string
  }
  why: {
    eyebrow: string
    title: string
    intro: string
    items: { title: string, body: string }[]
  }
  driver: {
    title: string
    intro: string
    withDriver: { title: string, body: string, points: string[] }
    selfDrive: { title: string, body: string, points: string[] }
    cta: string
  }
  faq: {
    title: string
    intro: string
    items: { q: string, a: string }[]
  }
  blog: {
    eyebrow: string
    title: string
    intro: string
    readMore: string
    backToBlog: string
    published: string
    readingTime: string
    allPosts: string
    ctaTitle: string
    ctaBody: string
  }
  contact: {
    title: string
    intro: string
    callTitle: string
    callBody: string
    whatsappTitle: string
    whatsappBody: string
    addressTitle: string
    hoursTitle: string
    hoursNote: string
    formTitle: string
    formNote: string
    name: string
    namePlaceholder: string
    phone: string
    phonePlaceholder: string
    pickup: string
    pickupPlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    sending: string
    sent: string
    errorRequired: string
    errorSend: string
    /* Secondary channel beside the submit button, for anyone who distrusts forms. */
    whatsappAlt: string
  }
  footer: {
    tagline: string
    navigation: string
    contact: string
    followUs: string
    rights: string
    footerNav: string
    /* Where the "we are not the airport" claim is restated, quietly. */
    note: string
  }
  /* Shared chrome. */
  whatsappFab: string
  callFab: string
  hours: string
  hoursShort: string
  skipToContent: string
  breadcrumbHome: string
}
