/*
 * Pricing.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TO DO — CLIENT DATA REQUIRED
 *
 *  Nothing here is confirmed. Not one daily rate, not the "from" figure, not
 *  a single extra. The client supplied the deposit (400 KM / 200 €) and the
 *  no-credit-card policy and nothing else about money, so every number below
 *  is null and renders as "on request" rather than as an invented figure.
 *
 *  While `PRICING_COMPLETE` is false three things happen automatically:
 *    - /cijene carries noindex, so Google never files a table of "on request"
 *      as a thin page,
 *    - the Prices link is dropped from the footer,
 *    - `offers` is omitted from the AutoRental JSON-LD, because a priceRange
 *      nobody has given us is a fabricated one.
 *
 *  Fill the numbers in, flip the flag, rebuild. Nothing else to change.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const PRICING_COMPLETE = false

/*
 * The cheapest daily rate across the fleet, for the "from X" line and for
 * schema. Null until the client confirms it.
 */
export const PRICE_FROM_EUR: number | null = null

export const CURRENCY = 'EUR'

/*
 * Daily rate per rental length. The rate drops as the rental gets longer,
 * which is the single most useful thing this table communicates.
 * `month` is the total monthly price, not a daily rate.
 */
export interface PriceTiers {
  /* 1–2 days, daily rate */
  short: number | null
  /* 3–6 days, daily rate */
  medium: number | null
  /* 7+ days, daily rate */
  week: number | null
  /* 30 days, total */
  month: number | null
}

export interface VehiclePrice {
  /* Matches FleetCar.id in ~/data/business */
  id: string
  tiers: PriceTiers
  /* Held at collection, returned on the spot. */
  depositBam: number | null
}

const EMPTY: PriceTiers = { short: null, medium: null, week: null, month: null }

/*
 * The deposit is the one figure we do have, and it is the same across the
 * fleet as the client states it. TODO(client): confirm it also holds for the
 * two people carriers — that is the usual place an agency sets it higher.
 */
const DEPOSIT_BAM = 400

export const VEHICLE_PRICES: VehiclePrice[] = [
  { id: 'octavia-limuzina', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'octavia-combi', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'proace-verso', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'golf-gti', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'rapid-crni', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'frontera', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'vivaro', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'rapid-crveni', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'corsa', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'leon-st', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
  { id: 'kamiq', tiers: { ...EMPTY }, depositBam: DEPOSIT_BAM },
]

/*
 * Paid extras. The `key` maps to a translated label; only the amount is data.
 * Every item here is something the site already refers to somewhere — the
 * green card and the cross-border permission in the FAQ, the driver on
 * /najam-sa-vozacem — so the list invents no service the client does not offer.
 *
 * TODO(client): child seats and GPS are the two most asked-for extras in this
 * market and we do not know whether Gogo offers either. They are deliberately
 * NOT listed here; add them if they exist.
 */
export interface Extra {
  key: 'greenCard' | 'crossBorder' | 'extraDriver' | 'delivery' | 'driverDay'
  priceEur: number | null
  /* Renders as "per day" / "per rental" etc. */
  unit: 'perDay' | 'perRental'
}

export const EXTRAS: Extra[] = [
  { key: 'greenCard', priceEur: null, unit: 'perRental' },
  { key: 'crossBorder', priceEur: null, unit: 'perRental' },
  { key: 'extraDriver', priceEur: null, unit: 'perRental' },
  { key: 'delivery', priceEur: null, unit: 'perRental' },
  { key: 'driverDay', priceEur: null, unit: 'perDay' },
]

export function findVehiclePrice(id: string) {
  return VEHICLE_PRICES.find(entry => entry.id === id)
}

/* True once at least one real number exists for a vehicle. */
export function hasAnyPrice(price: VehiclePrice | undefined): boolean {
  if (!price) return false
  return Object.values(price.tiers).some(value => value !== null)
}
