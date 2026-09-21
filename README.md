# Rent a Car Gogo — Bihać

Static marketing site for a small car rental agency in Bihać, Bosnia and
Herzegovina. Nuxt 4, Tailwind, fully prerendered, deployed to Cloudflare Pages.

Four languages, each on its own crawlable URL: Bosnian at the root, German
under `/de`, English under `/en`, Arabic under `/ar`.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static build -> .output/public
npm run pages:deploy # generate + wrangler pages deploy
```

Node 20 or newer.

---

## The one thing to read first

**`PITANJA-ZA-KLIJENTA.md`** at the repo root. It lists everything the client
has not confirmed, where each unconfirmed claim appears on the site, and which
file to edit when the answer arrives.

The rule this codebase follows: **where a fact is unknown, it is `null` and the
UI omits it.** No placeholder prices, no guessed seat counts, no invented
gearbox. Every open item is marked `TODO(client)` in the source:

```bash
grep -rn "TODO(client)" app/
```

---

## How it is organised

```
app/
  data/business.ts     every fact about the business — phone, address, fleet,
                       distances. Single source of truth; nothing is duplicated.
  data/pricing.ts      rates and extras. All null; PRICING_COMPLETE gates the
                       prices page, its nav links and the schema price.
  data/reviews.ts      the real Google reviews, verbatim and untranslated
  data/blog.ts         two Bosnian SEO guides
  content/             per-page prose, keyed by locale
  i18n/locales/        site chrome copy in bs / de / en / ar. bs.ts is the
                       master; the other three are translations of it.
  i18n/routing.ts      which pages exist in which language, and the per-language
                       slugs (/cijene -> /en/prices -> /de/preise)
  components/landing/  every UI component
  composables/useSeo   meta tags, canonical, hreflang, JSON-LD
server/routes/         sitemap.xml, robots.txt, llms.txt — generated, not static
scripts/build-images.py  rebuilds every image from the client's originals
```

### Adding a car

Append to `FLEET_CARS` in `app/data/business.ts`, add the vehicle photo to
`source-images/` and register it in `scripts/build-images.py`, then write an
`audience` line for it in each locale in `app/content/vehicles.ts`. The fleet
index, the vehicle page, the sitemap and the schema all follow automatically.

### Adding a page

Create it under `app/pages`, add its base path to `BASE_ROUTES` in
`nuxt.config.ts`, and — if it is not published in all four languages — add it to
`LOCALE_SCOPES` in `app/i18n/routing.ts`. Per-language slugs go in
`PATH_OVERRIDES` in the same file.

---

## Design

Dark. `ink` surfaces, `mist` type, and a single lime accent sampled off the
client's logo (`#8ba937`, brightened to `#a3c93f` for use on dark, where the
literal logo green sits at only 4.2:1).

Lime is reserved for the action that matters — call, WhatsApp, send the
enquiry — and for one accent word per headline. A lime button always carries
`text-ink-950`, never white: lime on white is about 1.9:1 and fails at every
size while still *looking* legible on a bright monitor.

Tokens live in `tailwind.config.ts`; component classes and motion rules in
`app/assets/css/main.css`. Radius scale is locked to `rounded-card` and
`rounded-pill`.

### Motion

- Transform and opacity only. Nothing animates layout.
- Custom easing curves (`ease-out`, `ease-in-out`, `ease-drawer`); no `ease-in`
  anywhere, because it delays the frame the user is watching hardest.
- UI transitions stay under 300 ms. Stagger delays 30–80 ms.
- Nothing enters from `scale(0)` — 0.97 is the floor.
- Hover effects are gated behind `@media (hover: hover)` so they do not latch
  on touch.
- `prefers-reduced-motion` keeps the opacity transitions and drops everything
  that moves in space.

---

## Images

Everything in `public/images/` is generated. Sources live in `source-images/`,
which is not deployed.

```bash
python -m venv .venv
.venv/bin/pip install numpy pillow scipy "fonttools[woff]"
GOGO_FONTS=scripts .venv/bin/python scripts/build-images.py
```

See `scripts/README.md`. The logo is keyed out of a photograph of office signage
and rendered twice — near-white for the dark page, graphite for light surfaces.

To replace the hero with new photography, write these two files directly and
skip `build_hero()`:

- `public/images/hero/hero.webp` — 1920×820, subject right, copy space left
- `public/images/hero/hero-portrait.webp` — 820×1025, subject low, space above

---

## SEO

- Every locale is a real prerendered URL with reciprocal `hreflang` and a
  self-reference, plus `x-default` on the Bosnian page.
- `sitemap.xml`, `robots.txt` and `llms.txt` are generated at prerender time, so
  they cannot drift from the routes that exist.
- JSON-LD: `AutoRental`, `ItemList` for the fleet, `Car` per vehicle, `FAQPage`,
  `BreadcrumbList`, `WebSite`.
- **No `aggregateRating` or `Review` markup**, despite the real 5.0 rating.
  Those reviews were collected on Google, and marking up third-party reviews as
  first-party ratings is against Google's structured data policy and risks a
  manual action on the whole domain. They are displayed, attributed and linked
  instead.
- Pages with nothing real to say carry `noindex` rather than thin content —
  currently `/cijene`, until the rate table holds numbers.

---

## Deploying

Cloudflare Pages, via the dashboard or `npm run pages:deploy`.

| Setting | Value |
| --- | --- |
| Build command | `npm run generate` |
| Output directory | `.output/public` |
| Node version | 20 |

Set `NUXT_PUBLIC_SITE_URL` in **both** Production and Preview environments. It
feeds canonical, `og:url`, `hreflang`, the JSON-LD `@id` and the sitemap, so a
wrong value there is a sitewide failure rather than a local one.

`public/_headers` ships the cache policy and security headers. It deliberately
contains no `X-Robots-Tag` — a stray `noindex` there would quietly de-list the
whole site.
