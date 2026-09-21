import type { FleetCar, LocaleMessages } from '~/i18n/types'

/*
 * Copy strings that carry a count use a `{n}` placeholder rather than being
 * split into a prefix and a suffix, because word order around a number is not
 * the same in every language this site ships.
 *
 * These helpers exist because the obvious thing — `{{ n }} {{ t.fleet.seats }}`
 * — renders "5 {n} sjedišta" and looks close enough to correct in review that
 * it shipped on eleven vehicle pages in four languages. Interpolate, never
 * concatenate.
 */
export function fill(template: string, n: number | string): string {
  return template.replace('{n}', String(n))
}

/* "5 sjedišta", or null when the configuration is not confirmed. */
export function seatsLabel(car: FleetCar, t: LocaleMessages): string | null {
  return car.seats === null ? null : fill(t.fleet.seats, car.seats)
}

/* The gearbox, or null when unknown. */
export function gearboxLabel(
  car: FleetCar,
  spec: { automatic: string, manual: string },
): string | null {
  return car.transmission === null ? null : spec[car.transmission]
}

/*
 * Fleet photos ship at 1440w and 720w. A card is at most ~304px wide, so a 1x
 * phone that downloads the 1440 file is pulling roughly four times the pixels
 * it can show — across eleven cards on the home rail, that is most of the
 * page weight.
 *
 * `sizes` is deliberately generous rather than exact: it only has to be close
 * enough that the browser never picks the smaller file for a card that would
 * show it soft.
 */
export function fleetSrcset(image: string): string {
  return `${image.replace(/\.webp$/, '-sm.webp')} 720w, ${image} 1440w`
}
