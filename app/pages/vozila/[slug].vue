<script setup lang="ts">
import { PhArrowRight, PhCheck, PhPhone, PhUsers, PhWhatsappLogo } from '@phosphor-icons/vue'
import { findCarBySlug, similarCars, whatsappHref } from '~/data/business'
import { findVehiclePrice, hasAnyPrice, PRICING_COMPLETE } from '~/data/pricing'
import { VEHICLE_COPY } from '~/content/vehicles'
import { stripLocale } from '~/i18n/routing'

/*
 * One page per vehicle.
 *
 * The slug is locale-independent (mercedes-vito-2020 under every language
 * prefix): a model name is a proper noun, so translating it would only break
 * links and split any inbound equity across four spellings.
 *
 * Gallery: the client supplied one studio render per car, so `gallery` is
 * empty everywhere and the hero image stands alone. Add photos to
 * FleetCar.gallery and the grid below appears on its own.
 */
const route = useRoute()
const { t, locale, business, localeRoute } = useI18n()

/*
 * route.params.slug is the raw URL segment. Under a locale prefix the router
 * still hands us the same segment, so no un-prefixing is needed for the lookup
 * itself — but the base path for canonical/hreflang has to be rebuilt.
 */
const car = findCarBySlug(String(route.params.slug))

if (!car) {
  throw createError({ statusCode: 404, statusMessage: 'Vehicle not found', fatal: true })
}

useScrollReveal()

const copy = computed(() => VEHICLE_COPY[locale.value])
const basePath = computed(() => stripLocale(route.path).base)

const price = findVehiclePrice(car.id)
const related = similarCars(car)

const audience = computed(() => copy.value.audience[car!.id] ?? '')

/*
 * Only what is actually known.
 *
 * `transmission` is null for every car in the fleet right now, and a ternary on
 * `=== 'automatic'` would quietly print "Manuelni" for all eleven — a specific,
 * wrong claim about the gearbox on every vehicle page. It renders "Na upit"
 * until the client confirms, and turns into a real value on its own once they
 * do. `seats` is the same story for the two people carriers.
 */
const specs = computed(() => {
  const spec = copy.value.spec
  return [
    { label: spec.generation, value: car!.generation },
    { label: spec.colour, value: car!.colour },
    {
      label: spec.transmission,
      value: car!.transmission === null
        ? spec.unknown
        : spec[car!.transmission],
    },
    {
      label: spec.seats,
      value: car!.seats === null ? spec.unknown : String(car!.seats),
    },
    { label: spec.category, value: t.value.fleet.categories[car!.category] ?? car!.category },
  ]
})

/* Daily rate by rental length, mirroring the columns on /cijene. */
const priceRows = computed(() => {
  if (!price) return []
  return [
    { label: '1-2', value: price.tiers.short },
    { label: '3-6', value: price.tiers.medium },
    { label: '7+', value: price.tiers.week },
  ]
})

const bookHref = computed(() =>
  whatsappHref(t.value.fleet.bookMessage.replace('{car}', car!.name)),
)

useSeo(() => ({
  title: copy.value.metaTitle(car!),
  description: copy.value.metaDescription(car!),
  path: basePath.value,
  image: car!.image,
  imageAlt: `${car!.name}`,
}))

jsonLd(
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: copy.value.breadcrumbAll, path: '/vozila' },
    { name: `${car.name}`, path: `/vozila/${car.slug}` },
  ]),
  vehicleSchema({
    car,
    path: basePath.value,
    description: audience.value,
    categoryLabel: t.value.fleet.categories[car.category] ?? car.category,
    price: price?.tiers.short ?? null,
  }),
)
</script>

<template>
  <div v-if="car">
    <LandingHeader />

    <main class="bg-ink-950 pt-28 md:pt-32">
      <section class="reveal-onload">
        <div class="shell">
          <LandingBreadcrumb
            :trail="[
              { name: business.name, path: '/' },
              { name: copy.breadcrumbAll, path: '/vozila' },
              { name: `${car.name}`, path: `/vozila/${car.slug}` },
            ]"
          />

          <div class="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            <figure class="reveal-lcp lg:col-span-7">
              <img
                :src="car.image"
                :srcset="fleetSrcset(car.image)"
                sizes="(max-width: 1024px) 100vw, 46rem"
                :alt="t.fleet.imageAlt.replace('{name}', car.name).replace('{colour}', car.colour)"
                class="aspect-[16/10] w-full rounded-card border border-ink-700 object-cover"
                width="1440"
                height="900"
                fetchpriority="high"
                decoding="async"
              >

              <!-- Appears on its own once extra photos exist in FleetCar.gallery. -->
              <div v-if="car.gallery?.length" class="mt-4 grid grid-cols-3 gap-3">
                <img
                  v-for="(shot, index) in car.gallery"
                  :key="shot"
                  :src="shot"
                  :alt="`${car.name} - ${index + 2}`"
                  class="aspect-[4/3] w-full rounded-card border border-ink-700 object-cover"
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </figure>

            <div class="lg:col-span-5">
              <h1 class="h-display reveal text-mist-0">
                {{ car.name }}
               
              </h1>

              <p class="reveal mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mist-500">
                <span v-if="car.seats" class="flex items-center gap-1.5">
                  <PhUsers :size="15" aria-hidden="true" />
                  {{ seatsLabel(car, t) }}
                </span>
                <span>{{ gearboxLabel(car, copy.spec) }}</span>
                <span>{{ t.fleet.categories[car.category] }}</span>
              </p>

              <h2 class="h-card reveal mt-8 text-mist-0">
                {{ copy.audienceTitle }}
              </h2>
              <p class="body-base reveal mt-2.5">
                {{ audience }}
              </p>

              <div class="reveal mt-8 flex flex-col gap-3 sm:flex-row">
                <LandingButton :href="business.phoneHref" size="lg">
                  <PhPhone :size="18" weight="fill" aria-hidden="true" />
                  {{ t.hero.ctaPrimary }}
                </LandingButton>
                <LandingButton :href="bookHref" variant="secondary" size="lg" external>
                  <PhWhatsappLogo :size="18" weight="fill" aria-hidden="true" />
                  {{ t.fleet.book }}
                </LandingButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y">
        <div class="shell grid gap-6 lg:grid-cols-3">
          <div class="reveal surface p-7">
            <h2 class="h-card text-mist-0">
              {{ copy.specsTitle }}
            </h2>
            <dl class="mt-6 divide-y divide-ink-700 border-t border-ink-700">
              <div
                v-for="spec in specs"
                :key="spec.label"
                class="flex items-baseline justify-between gap-5 py-3"
              >
                <dt class="text-sm text-mist-500">
                  {{ spec.label }}
                </dt>
                <dd class="text-[0.9375rem] text-mist-0">
                  {{ spec.value }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="reveal surface p-7">
            <h2 class="h-card text-mist-0">
              {{ copy.equipmentTitle }}
            </h2>
            <ul class="mt-6 space-y-3">
              <li
                v-for="spec in car.specs"
                :key="spec"
                class="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-mist-400"
              >
                <PhCheck :size="15" weight="bold" class="mt-1 shrink-0 text-lime-400" aria-hidden="true" />
                <span>{{ t.fleet.specs[spec] }}</span>
              </li>
            </ul>
          </div>

          <div class="reveal surface p-7">
            <h2 class="h-card text-mist-0">
              {{ copy.priceTitle }}
            </h2>

            <p v-if="!hasAnyPrice(price)" class="mt-4 flex items-baseline gap-2">
              <span class="text-sm text-mist-500">{{ copy.spec.unknown }}</span>
            </p>
            <dl v-else class="mt-6 divide-y divide-ink-700 border-t border-ink-700">
              <div
                v-for="row in priceRows"
                :key="row.label"
                class="flex items-baseline justify-between gap-5 py-3"
              >
                <dt class="text-sm text-mist-500">
                  {{ row.label }}
                </dt>
                <dd class="font-mono text-[0.9375rem] text-lime-400" dir="ltr">
                  {{ row.value !== null ? `${row.value} €` : copy.spec.unknown }}
                </dd>
              </div>
            </dl>

            <p class="body-base mt-5 text-[0.9375rem]">
              {{ copy.priceIntro }}
            </p>

            <LandingButton
              v-if="PRICING_COMPLETE"
              :to="localeRoute('/cijene')"
              variant="secondary"
              size="sm"
              class="mt-5"
            >
              {{ copy.priceCta }}
              <PhArrowRight :size="14" class="rtl:rotate-180" aria-hidden="true" />
            </LandingButton>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y bg-ink-950">
        <div class="shell">
          <LandingSectionHeading :title="copy.similarTitle" />

          <div class="mt-9 grid gap-5 sm:grid-cols-3">
            <NuxtLink
              v-for="other in related"
              :key="other.id"
              :to="localeRoute(`/vozila/${other.slug}`)"
              class="reveal group overflow-hidden rounded-card border border-ink-700 bg-ink-850 transition duration-300 ease-out hover:border-lime-400/40"
            >
              <img
                :src="other.image"
                :alt="`${other.name}`"
                class="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
              >
              <div class="flex items-baseline justify-between gap-3 p-5">
                <h3 class="h-card text-[1.0625rem] text-mist-0">
                  {{ other.name }}
                </h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y">
        <div class="shell">
          <div class="reveal surface p-7 md:p-9">
            <h2 class="h-card text-mist-0">
              {{ copy.cta.title }}
            </h2>
            <p class="body-base mt-2.5 max-w-[56ch]">
              {{ copy.cta.body }}
            </p>
            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <LandingButton :href="business.phoneHref" size="lg">
                <PhPhone :size="18" weight="fill" aria-hidden="true" />
                {{ t.hero.ctaPrimary }}
              </LandingButton>
              <LandingButton :href="bookHref" variant="secondary" size="lg" external>
                <PhWhatsappLogo :size="18" weight="fill" aria-hidden="true" />
                {{ t.fleet.book }}
              </LandingButton>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
