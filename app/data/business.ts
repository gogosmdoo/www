import type { FleetCar, LocaleOption } from '~/i18n/types'

/*
 * Single source of truth for everything factual about the business.
 *
 * Nothing here is invented. Where a fact could not be established it is null
 * and the UI omits it, rather than being filled with a plausible guess — a
 * wrong seat count or a wrong gearbox is the kind of detail a customer
 * discovers at the counter, which is the worst possible place to discover it.
 *
 * Everything still open is marked TODO(client) and collected in
 * PITANJA-ZA-KLIJENTA.md at the repo root.
 *
 * Provenance of the contact block: the coordinates and the CID come from the
 * client's own Google share link (maps.app.goo.gl/Avib8fqdcuWY7t9NA). The
 * street address and phone number were then confirmed against two independent
 * sources — the agency's Facebook page and the bihacdanas.ba directory of
 * Bihać rental agencies — which agree on both. Reverse-geocoding the
 * coordinates lands on Dr. Irfana Ljubijankića in Ozimice I, next door to the
 * butcher whose MESNICA sign is visible in the client's own vehicle photos.
 */

const PHONE_E164 = '+38761798203'
const PHONE_DISPLAY = '061 798 203'

export const BUSINESS = {
  name: 'Rent a Car Gogo',
  /* Registered entity, read off the door in the client's vehicle photos. */
  legalName: 'D.O.O. "GOGO-SM"',
  /*
   * Not a slogan the client gave us — it is what the mark itself says, used as
   * the brand line so nothing has to be invented for the footer.
   */
  tagline: 'Go Go Rent a Car',

  phone: PHONE_E164,
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  whatsappNumber: PHONE_E164.replace('+', ''),
  whatsappHref: `https://wa.me/${PHONE_E164.replace('+', '')}`,

  /*
   * TODO(client): the reservations inbox. The brief says bookings should also
   * reach an email address and that the address must never be rendered as
   * text — only as the target of a mailto: — but the address itself was not
   * included. Until it is, `inboxHref` is null and every email affordance on
   * the site is omitted; WhatsApp and the phone carry the enquiries. Set this
   * one constant and the contact form's email fallback comes back on its own.
   */
  inboxHref: null as string | null,

  street: 'Dr. Irfana Ljubijankića 139',
  city: 'Bihać',
  postalCode: '77000',
  country: 'BA',
  /*
   * One NAP string, used verbatim everywhere the address is rendered: footer,
   * contact block, schema. Keeping a single spelling — with diacritics, in the
   * same order — is what lets Google match it against the Business Profile.
   */
  addressShort: 'Dr. Irfana Ljubijankića 139, 77000 Bihać',
  /* Ozimice I, the retail strip on the main road through town. */
  district: 'Ozimice I',

  /*
   * Google Business Profile, resolved from the client's share link to its
   * stable CID form. A ?cid= URL is tied to the listing itself, so it cannot
   * drift onto a neighbouring pin the way a maps/search?query=<address> link
   * can — and on this street the neighbouring pins are a butcher and a
   * furniture shop.
   */
  cid: '1957312648229792940',
  googleMapsUrl: 'https://www.google.com/maps?cid=1957312648229792940',
  googleShortUrl: 'https://maps.app.goo.gl/Avib8fqdcuWY7t9NA',
  /*
   * TODO(client): the "write a review" short link from the GBP dashboard
   * (g.page/r/…/review), which opens the review composer directly. Until the
   * client sends it, the review CTA points at the listing instead, which still
   * works — it just costs the customer one extra tap.
   */
  reviewUrl: null as string | null,

  /* TODO(client): social profiles. Empty means "do not render". */
  instagramUrl: '',
  facebookUrl: 'https://www.facebook.com/p/Rent-a-car-Gogo-Biha%C4%87-100083565812971/',

  /*
   * Two renderings of the same artwork, both keyed out of the wall mockup the
   * client supplied. The mark is a black car silhouette with a lime wordmark,
   * so on the ink page it is redrawn in near-white and on any light surface it
   * keeps its original graphite. See scripts/build-images.py.
   */
  logoLockup: '/images/brand/lockup-dark.webp',
  logoLockupLight: '/images/brand/lockup-light.webp',
  ogImage: '/images/og-image.jpg',

  /* Read off the verified Google listing, not geocoded. */
  geo: { lat: 44.8225992, lng: 15.8537419 },

  /*
   * Opening hours, read off the RADNO VRIJEME card in the office window in the
   * client's own photographs: 08:00-18:00.
   * TODO(client): confirm which days this covers, and Saturday/Sunday. The copy
   * currently says Mon-Sat and treats Sunday as by arrangement, which is the
   * safe reading, but it is a reading.
   */
  hoursOpen: '08:00',
  hoursClose: '18:00',

  /*
   * The positioning, and the reason this site does not lead with an airport.
   *
   * Bihać has no commercial airport, so the usual rent-a-car play — "we are in
   * the terminal" — is unavailable to every agency in the city, not just this
   * one. What the address does give is a position between two national parks
   * and 13 km from the Croatian border, on the main arterial through town
   * rather than in a back street.
   *
   * Every figure below is a real driving route (OSRM, from the office
   * coordinates), rounded down to the nearest 5 km and the nearest 5 minutes.
   * They are quoted in the copy, so they have to survive someone checking them
   * on their phone.
   */
  distances: {
    plitvice: { km: 35, min: 55 },
    unaFalls: { km: 40, min: 45 },
    border: { km: 13, min: 25 },
    zagrebAirport: { km: 165, min: 165 },
    zadarAirport: { km: 150, min: 140 },
    banjaLuka: { km: 155, min: 165 },
    split: { km: 275, min: 220 },
    sarajevoAirport: { km: 300, min: 320 },
  },

  /* Deposit, exactly as the client states it. Refunded in full on return. */
  depositBam: 400,
  depositEur: 200,

  /* Minimum age / licence held. TODO(client): confirm both. */
  minAge: null as number | null,
  minLicenceYears: null as number | null,
} as const

/*
 * WhatsApp deep link with the message already typed.
 *
 * Every booking CTA on the site routes through here. The alternative — a
 * mailto: link — is rewritten by Cloudflare's Email Address Obfuscation into
 * /cdn-cgi/l/email-protection#..., which Googlebot will not follow and which
 * silently does nothing on a phone with no mail client configured.
 */
export function whatsappHref(message?: string) {
  if (!message) return BUSINESS.whatsappHref
  return `${BUSINESS.whatsappHref}?text=${encodeURIComponent(message)}`
}

/*
 * Order is deliberate: the local language first, then German — Bihać's largest
 * inbound market by a distance, because the Una-Sana diaspora in Germany,
 * Austria and Switzerland drives home every summer — then English for the
 * Plitvice and Una traffic, then Arabic.
 */
export const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'bs', label: 'BS', name: 'Bosanski', dir: 'ltr', htmlLang: 'bs-BA', ogLocale: 'bs_BA' },
  { code: 'de', label: 'DE', name: 'Deutsch', dir: 'ltr', htmlLang: 'de', ogLocale: 'de_DE' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_AR' },
]

/*
 * Fleet: eleven vehicles, as listed by the client.
 *
 * Model, generation and colour are the client's own list. The images are the
 * client's photographs, taken outside the office — which is why they are worth
 * far more than the studio renders a template would use: the shopfront, the
 * RENT-A-CAR sign and the Bihać registration plates are all visible, and that
 * is the proof a visitor is actually looking for.
 *
 * `seats` is the standard factory layout for each model. The two people
 * carriers — a ProAce Verso and a Vivaro/Zafira Life — are built in 5-, 8- and
 * 9-seat configurations; the client confirmed both of these are 8-seaters.
 *
 * `transmission` is confirmed per vehicle, from the client: manual on the Golf
 * GTI, both Rapid Spacebacks, the Vivaro/Zafira Life and the Corsa; automatic
 * on the rest.
 *
 * `year` is deliberately absent as a field, not merely unrendered: generations
 * here span 2013 to today, and a visible model year invites a comparison the
 * copy has no reason to start.
 */
export const FLEET_CARS: FleetCar[] = [
  {
    id: 'octavia-limuzina',
    slug: 'skoda-octavia-limuzina',
    name: 'Škoda Octavia Limousine',
    generation: 'Mk4 (NX)',
    colour: 'siva',
    category: 'business',
    seats: 5,
    transmission: 'automatic',
    image: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
    specs: ['comfort', 'longTrips', 'business', 'luggage'],
    featured: true,
  },
  {
    id: 'octavia-combi',
    slug: 'skoda-octavia-combi',
    name: 'Škoda Octavia Combi',
    generation: 'Mk3 Facelift (5E)',
    colour: 'bijela',
    category: 'estate',
    seats: 5,
    transmission: 'automatic',
    image: '/images/fleet/skoda-octavia-mk3-facelift-combi-bijela.webp',
    specs: ['luggage', 'family', 'longTrips', 'comfort'],
  },
  {
    id: 'proace-verso',
    slug: 'toyota-proace-verso',
    name: 'Toyota ProAce Verso',
    generation: '2. generacija',
    colour: 'bijela',
    category: 'van',
    seats: 8,
    transmission: 'automatic',
    image: '/images/fleet/toyota-proace-verso-kombi-bijeli.webp',
    specs: ['group', 'luggage', 'transfer', 'family'],
    featured: true,
  },
  {
    id: 'golf-gti',
    slug: 'volkswagen-golf-8-gti',
    name: 'Volkswagen Golf GTI',
    generation: 'Golf 8 (Mk8)',
    colour: 'crna',
    category: 'sport',
    seats: 5,
    transmission: 'manual',
    image: '/images/fleet/volkswagen-golf-8-gti-crni.webp',
    specs: ['sport', 'comfort', 'longTrips'],
    featured: true,
  },
  {
    id: 'rapid-crni',
    slug: 'skoda-rapid-spaceback-crni',
    name: 'Škoda Rapid Spaceback',
    generation: '1. generacija',
    colour: 'crna',
    category: 'city',
    seats: 5,
    transmission: 'manual',
    image: '/images/fleet/skoda-rapid-spaceback-crni.webp',
    specs: ['economy', 'cityDrive', 'easyParking'],
  },
  {
    id: 'frontera',
    slug: 'opel-frontera',
    name: 'Opel Frontera',
    generation: '1. generacija',
    colour: 'bijela s crnim krovom',
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    image: '/images/fleet/opel-frontera-suv-bijeli-crni-krov.webp',
    specs: ['highSeat', 'cityDrive', 'comfort', 'easyParking'],
  },
  {
    id: 'vivaro',
    slug: 'opel-vivaro-zafira-life',
    name: 'Opel Vivaro / Zafira Life',
    generation: '3. generacija',
    colour: 'siva',
    category: 'van',
    seats: 8,
    transmission: 'manual',
    image: '/images/fleet/opel-vivaro-zafira-life-kombi-sivi.webp',
    specs: ['group', 'luggage', 'transfer'],
  },
  {
    id: 'rapid-crveni',
    slug: 'skoda-rapid-spaceback-crveni',
    name: 'Škoda Rapid Spaceback',
    generation: '1. generacija',
    colour: 'crvena',
    category: 'city',
    seats: 5,
    transmission: 'manual',
    image: '/images/fleet/skoda-rapid-spaceback-crveni.webp',
    specs: ['economy', 'cityDrive', 'easyParking'],
  },
  {
    id: 'corsa',
    slug: 'opel-corsa',
    name: 'Opel Corsa',
    generation: 'Corsa E',
    colour: 'plava',
    category: 'city',
    seats: 5,
    transmission: 'manual',
    image: '/images/fleet/opel-corsa-e-plava.webp',
    specs: ['economy', 'cityDrive', 'easyParking'],
  },
  {
    id: 'leon-st',
    slug: 'seat-leon-st',
    name: 'SEAT Leon ST',
    generation: 'Mk3 (5F)',
    colour: 'bijela',
    category: 'estate',
    seats: 5,
    transmission: 'automatic',
    image: '/images/fleet/seat-leon-mk3-st-karavan-bijeli.webp',
    specs: ['luggage', 'family', 'longTrips'],
  },
  {
    id: 'kamiq',
    slug: 'skoda-kamiq',
    name: 'Škoda Kamiq',
    generation: '1. generacija',
    colour: 'tamnosiva',
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    image: '/images/fleet/skoda-kamiq-suv-tamnosiva.webp',
    specs: ['highSeat', 'cityDrive', 'comfort', 'easyParking'],
  },
]

/*
 * Category order runs small to large, then sport last because it is the one
 * category chosen for a reason other than capacity.
 */
export const FLEET_CATEGORIES = ['all', 'city', 'estate', 'suv', 'van', 'sport'] as const

export function findCarBySlug(slug: string) {
  return FLEET_CARS.find(car => car.slug === slug)
}

/* The cars carrying the home page rail and the hero. */
export const FEATURED_CARS = FLEET_CARS.filter(car => car.featured)

/*
 * Three related cars for the bottom of a vehicle page. Same category first,
 * then the rest of the fleet, so a visitor comparing vans sees vans and never
 * lands on a page with an empty related rail.
 */
export function similarCars(car: FleetCar, count = 3): FleetCar[] {
  const sameCategory = FLEET_CARS.filter(
    other => other.id !== car.id && other.category === car.category,
  )
  const rest = FLEET_CARS.filter(
    other => other.id !== car.id && other.category !== car.category,
  )
  return [...sameCategory, ...rest].slice(0, count)
}

/*
 * The hero photograph.
 *
 * Currently the Octavia frame, widened. It is a placeholder for an AI-generated
 * hero of a car in the Una valley — swapping that in is a one-line change here,
 * and the `-portrait` variant is what mobile loads.
 */
export const HERO_IMAGE = {
  wide: '/images/hero/hero.webp',
  portrait: '/images/hero/hero-portrait.webp',
} as const

/*
 * Named stills for the pages that want a photograph rather than a fleet card.
 *
 * These are the client's own vehicle photographs, picked so each page gets a
 * car that matches what it is about — the van page gets the van. There is no
 * separate location or lifestyle photography: the only non-fleet image on the
 * site is the hero, and anything that wants scenery draws from here instead of
 * shipping a dead <img>.
 */
export const SCENE_IMAGES = {
  hero: HERO_IMAGE.wide,
  van: '/images/fleet/toyota-proace-verso-kombi-bijeli.webp',
  suv: '/images/fleet/skoda-kamiq-suv-tamnosiva.webp',
  city: '/images/fleet/opel-corsa-e-plava.webp',
  business: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
  estate: '/images/fleet/seat-leon-mk3-st-karavan-bijeli.webp',
} as const
