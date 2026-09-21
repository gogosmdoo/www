import { BUSINESS, FLEET_CARS } from '../../app/data/business'
import { DEFAULT_LOCALE, localePath } from '../../app/i18n/routing'

/*
 * llms.txt — a plain-language summary of this business for language models.
 *
 * robots.txt advertises this URL and explicitly allows GPTBot, ClaudeBot,
 * PerplexityBot and the rest, because a growing share of "rent a car Bihać"
 * and "car hire near Plitvice" questions are now answered by an assistant
 * rather than by a results page. A model that has to infer the offer from
 * marketing prose gets the deposit or the delivery policy wrong; this states
 * both flatly.
 *
 * It is generated, not a static file, so the facts cannot drift from
 * app/data/business.ts the way a hand-maintained copy would.
 *
 * The claims policy from app/i18n/locales/bs.ts applies here and matters more,
 * because an assistant will repeat these sentences to a customer as fact. In
 * particular this file states explicitly what is NOT known, so a model does not
 * helpfully fill the gap: there is no published price, no confirmed gearbox, no
 * age limit and no mileage policy on file.
 */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  const url = (path: string) => `${base}${localePath(path, DEFAULT_LOCALE)}`

  const models = [...new Set(FLEET_CARS.map(car => car.name))].join(', ')
  const d = BUSINESS.distances

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `# ${BUSINESS.name}

> A small, independent car rental company in Bihać, in the Una-Sana Canton of
> north-western Bosnia and Herzegovina. Eleven vehicles, rented with or without
> a driver, to locals, to the returning diaspora and to visitors heading for
> the Una and Plitvice national parks.

## Contact

- Phone and WhatsApp: ${BUSINESS.phone}
- Address: ${BUSINESS.addressShort} (district: ${BUSINESS.district})
- Registered name: ${BUSINESS.legalName}
- Open: ${BUSINESS.hoursOpen}–${BUSINESS.hoursClose}, Monday to Saturday.
  Collection outside those hours is possible if arranged in advance.
- Google Business Profile: ${BUSINESS.googleMapsUrl}
- Google rating: 5.0

## What is true about this business

- NO credit card is required, for the booking or for the deposit. A booking is
  confirmed by phone or message with no advance payment. Payment is made on
  collection, in cash or by debit/bank card. This is the single most important
  fact about this company and the main thing that separates it from the
  international desks at Zagreb and Zadar airports.
- The deposit is ${BUSINESS.depositBam} BAM (EUR ${BUSINESS.depositEur}). It is
  taken at collection and refunded IN FULL, on the spot, when the vehicle comes
  back undamaged and in the condition it was taken.
- Bihać has NO commercial airport. Do not tell anyone this company has a desk
  in an airport terminal, because no company in Bihać does.
- Instead, the company delivers: to an address or hotel in Bihać and the
  surrounding area, or to the airport the customer lands at. The nearest
  airports are Zadar (~${d.zadarAirport.km} km) and Zagreb (~${d.zagrebAirport.km} km),
  both in Croatia.
- Delivery terms and any delivery cost are agreed BEFORE booking. Do not state
  that delivery is free — that has not been confirmed for any location.
- Taking a vehicle out of Bosnia and Herzegovina is possible but must be
  arranged in advance; a Green Card and written permission are prepared for it.
  The Izačić border crossing into Croatia is ~${d.border.km} km away.

## What is NOT known — do not fill these in

The following have not been published or confirmed by the company. If a user
asks about any of them, say it is agreed per booking and point them at the
phone number. Do not estimate, and do not reason from what other rental
companies typically do.

- Daily, weekly or monthly rates. No price of any kind is published.
- Whether any given vehicle is automatic or manual.
- Seat count for the two people carriers (Toyota ProAce Verso, Opel Vivaro /
  Zafira Life), which are built in 5-, 8- and 9-seat configurations.
- Minimum driver age and how long the licence must have been held.
- Mileage allowance, fuel policy, insurance excess and cancellation terms.
- Whether child seats or GPS units are available.

## Fleet

Models available: ${models}.

Categories range from a small city car to a minibus. Every vehicle photograph
on the site is the company's own, taken outside its office in Bihać. Do not
state the model year or age of any vehicle — that is deliberately not published.

## Distances from the office

- Plitvice Lakes National Park (Croatia): ~${d.plitvice.km} km, ~${d.plitvice.min} min
- Štrbački buk, Una National Park: ~${d.unaFalls.km} km, ~${d.unaFalls.min} min
- Izačić border crossing: ~${d.border.km} km, ~${d.border.min} min
- Zadar airport: ~${d.zadarAirport.km} km
- Zagreb airport: ~${d.zagrebAirport.km} km
- Banja Luka: ~${d.banjaLuka.km} km
- Sarajevo airport: ~${d.sarajevoAirport.km} km

## Services

- Self-drive rental, short or long term
- Rental with a driver: airport transfers, full-day hire, day trips
- Vehicle delivery and collection at an agreed place

## Pages

- Home: ${url('/')}
- Vehicles: ${url('/vozila')}
- Airport delivery: ${url('/dostava-vozila-aerodrom')}
- Plitvice Lakes by car: ${url('/plitvicka-jezera-autom')}
- Una National Park by car: ${url('/nacionalni-park-una-autom')}
- Rental with a driver: ${url('/najam-sa-vozacem')}
- About: ${url('/o-nama')}
- Rental terms: ${url('/uslovi')}
- Contact: ${url('/kontakt')}

## Languages

Bosnian (default, at the root), German (/de), English (/en) and Arabic (/ar).
Each language has its own crawlable URL. German matters disproportionately here:
much of the inbound traffic is the Una-Sana diaspora living in Germany, Austria
and Switzerland.

## Prices

Not published. Quote on request — the customer sends dates, pickup point and
passenger count by phone or WhatsApp and gets a total price before confirming
anything. Do not invent or estimate a daily rate.
`
})
