<script setup lang="ts">
import { PhCheck, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'
import { FLEET_CARS, whatsappHref } from '~/data/business'
import {
  EXTRAS,
  findVehiclePrice,
  PRICE_FROM_EUR,
  PRICING_COMPLETE,
} from '~/data/pricing'
import { PRICING_COPY } from '~/content/pricing'

/*
 * Prices.
 *
 * The single biggest content gap on the site: competitors rank on exactly this
 * page. The structure is complete and every number comes from ~/data/pricing.
 *
 * While PRICING_COMPLETE is false the page is noindex — a table of "on request"
 * would get filed as thin content, and that judgement is hard to undo once
 * made. Flip the flag with the real numbers and it enters the index clean.
 */
const { t, locale, business } = useI18n()

useScrollReveal()

const copy = computed(() => PRICING_COPY[locale.value])

/*
 * The "from" figure, or the words "on request". PRICE_FROM_EUR is null until
 * the client confirms the cheapest rate in the fleet, and `${null} €` renders
 * the string "null €" — which is exactly the kind of thing that ships.
 */
const fromPrice = computed(() =>
  PRICE_FROM_EUR === null ? copy.value.fromLabel : `${PRICE_FROM_EUR} €`,
)

const rows = computed(() =>
  FLEET_CARS.map(car => ({
    car,
    price: findVehiclePrice(car.id),
  })),
)

function money(value: number | null, suffix = '') {
  if (value === null) return null
  return `${value} €${suffix}`
}

/* The deposit is quoted in convertible marks, which is what is actually left. */
function bam(value: number | null) {
  if (value === null) return null
  return `${value} KM`
}

const trail = computed(() => [
  { name: business.value.name, path: '/' },
  { name: copy.value.breadcrumb, path: '/cijene' },
])

const enquiryHref = computed(() => whatsappHref(copy.value.cta.title))

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: '/cijene',
  noindex: !PRICING_COMPLETE,
}))

jsonLd(
  breadcrumbSchema(trail.value),
  faqSchema(copy.value.faq.items),
)
</script>

<template>
  <div>
    <LandingHeader />

    <main class="bg-ink-950 pt-28 md:pt-32">
      <section class="reveal-onload">
        <div class="shell">
          <LandingBreadcrumb :trail="trail" />

          <h1 class="h-display reveal mt-6 max-w-[20ch] text-mist-0">
            {{ copy.h1 }}
          </h1>

          <p class="body-lg reveal mt-6 max-w-[62ch]">
            {{ copy.intro }}
          </p>

          <p class="reveal mt-8 flex items-baseline gap-2">
            <span class="text-sm text-mist-500">{{ copy.fromLabel }}</span>
            <span class="font-display text-4xl font-semibold text-lime-400 md:text-5xl" dir="ltr">
              {{ fromPrice }}
            </span>
            <span class="text-sm text-mist-500">{{ copy.perDay }}</span>
          </p>

          <div class="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <LandingButton :href="business.phoneHref" size="lg">
              <PhPhone :size="18" weight="fill" aria-hidden="true" />
              {{ t.hero.ctaPrimary }}
            </LandingButton>
            <LandingButton :href="enquiryHref" variant="secondary" size="lg" external>
              <PhWhatsappLogo :size="18" weight="fill" aria-hidden="true" />
              {{ t.hero.ctaSecondary }}
            </LandingButton>
          </div>
        </div>
      </section>

      <!-- Rate table. Scrolls inside its own container so the page body never does. -->
      <section class="reveal-group section-y">
        <div class="shell">
          <h2 class="h-section reveal text-mist-0">
            {{ copy.table.caption }}
          </h2>

          <div class="reveal mt-8 overflow-x-auto rounded-card border border-ink-700">
            <table class="w-full min-w-[46rem] border-collapse text-start">
              <caption class="sr-only">
                {{ copy.table.caption }}
              </caption>
              <thead>
                <tr class="bg-ink-850">
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.vehicle }}
                  </th>
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.short }}
                  </th>
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.medium }}
                  </th>
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.week }}
                  </th>
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.month }}
                  </th>
                  <th scope="col" class="px-5 py-4 text-start text-sm font-semibold text-mist-0">
                    {{ copy.table.deposit }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-ink-700">
                <tr v-for="row in rows" :key="row.car.id" class="transition-colors hover:bg-ink-850/60">
                  <th scope="row" class="px-5 py-4 text-start">
                    <span class="block text-[0.9375rem] font-medium text-mist-0">{{ row.car.name }}</span>
                  </th>
                  <td class="px-5 py-4 text-sm text-mist-400" dir="ltr">
                    {{ money(row.price?.tiers.short ?? null) ?? copy.table.onRequest }}
                  </td>
                  <td class="px-5 py-4 text-sm text-mist-400" dir="ltr">
                    {{ money(row.price?.tiers.medium ?? null) ?? copy.table.onRequest }}
                  </td>
                  <td class="px-5 py-4 text-sm text-mist-400" dir="ltr">
                    {{ money(row.price?.tiers.week ?? null) ?? copy.table.onRequest }}
                  </td>
                  <td class="px-5 py-4 text-sm text-mist-400" dir="ltr">
                    {{ money(row.price?.tiers.month ?? null) ?? copy.table.onRequest }}
                  </td>
                  <td class="px-5 py-4 text-sm text-mist-400" dir="ltr">
                    {{ bam(row.price?.depositBam ?? null) ?? copy.table.onRequest }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="reveal mt-4 max-w-[68ch] text-sm text-mist-500">
            {{ copy.table.note }}
          </p>
        </div>
      </section>

      <!-- Included vs extra, side by side: the comparison is the point. -->
      <section class="reveal-group section-y bg-ink-950">
        <div class="shell grid gap-6 lg:grid-cols-2">
          <div class="reveal surface p-7 md:p-8">
            <h2 class="h-card text-mist-0">
              {{ copy.included.title }}
            </h2>
            <p class="body-base mt-2.5">
              {{ copy.included.intro }}
            </p>
            <ul class="mt-6 space-y-3.5">
              <li
                v-for="item in copy.included.items"
                :key="item"
                class="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-mist-400"
              >
                <PhCheck :size="16" weight="bold" class="mt-1 shrink-0 text-lime-400" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="reveal surface p-7 md:p-8">
            <h2 class="h-card text-mist-0">
              {{ copy.extras.title }}
            </h2>
            <p class="body-base mt-2.5">
              {{ copy.extras.intro }}
            </p>
            <ul class="mt-6 divide-y divide-ink-700 border-t border-ink-700">
              <li
                v-for="extra in EXTRAS"
                :key="extra.key"
                class="flex items-baseline justify-between gap-5 py-3.5"
              >
                <span class="text-[0.9375rem] text-mist-400">
                  {{ copy.extras.labels[extra.key] }}
                </span>
                <span class="shrink-0 font-mono text-sm text-lime-400" dir="ltr">
                  {{ money(extra.priceEur) ?? copy.table.onRequest }}
                  <span v-if="extra.priceEur !== null" class="text-mist-500">
                    {{ copy.extras.units[extra.unit] }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y">
        <div class="shell grid gap-12 lg:grid-cols-2">
          <div>
            <h2 class="h-section reveal text-mist-0">
              {{ copy.deposit.title }}
            </h2>
            <p
              v-for="paragraph in copy.deposit.paragraphs"
              :key="paragraph"
              class="body-base reveal mt-4 max-w-[58ch]"
            >
              {{ paragraph }}
            </p>
          </div>
          <div>
            <h2 class="h-section reveal text-mist-0">
              {{ copy.howPriced.title }}
            </h2>
            <p
              v-for="paragraph in copy.howPriced.paragraphs"
              :key="paragraph"
              class="body-base reveal mt-4 max-w-[58ch]"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y bg-ink-950">
        <div class="shell grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <LandingSectionHeading :title="copy.faq.title" />
          </div>
          <div class="reveal lg:col-span-7 lg:col-start-6">
            <LandingAccordion :items="copy.faq.items" />
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
              <LandingButton :href="enquiryHref" variant="secondary" size="lg" external>
                <PhWhatsappLogo :size="18" weight="fill" aria-hidden="true" />
                {{ t.hero.ctaSecondary }}
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
