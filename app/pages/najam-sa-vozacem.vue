<script setup lang="ts">
import { PhCheck, PhPhone, PhSteeringWheel, PhWhatsappLogo } from '@phosphor-icons/vue'
import { SCENE_IMAGES, whatsappHref } from '~/data/business'
import { DRIVER_COPY } from '~/content/driver'

/*
 * Chauffeur service.
 *
 * The least contested thing this business sells. Most agencies in the Una-Sana
 * canton rent self-drive only and almost none rank for "sa vozačem", so the
 * page is organised around the three jobs a driver is hired for — transfer,
 * business day, excursion — rather than around the word itself.
 *
 * No prices: per-route and per-day rates have not been supplied. The page
 * explains the two pricing methods, which the landing page already states, and
 * asks for the route instead of quoting a number nobody confirmed.
 */
const { t, locale, business, localeRoute } = useI18n()

useScrollReveal()

const copy = computed(() => DRIVER_COPY[locale.value])

const trail = computed(() => [
  { name: business.value.name, path: '/' },
  { name: copy.value.breadcrumb, path: '/najam-sa-vozacem' },
])

const enquiryHref = computed(() => whatsappHref(copy.value.cta.title))

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: '/najam-sa-vozacem',
  image: SCENE_IMAGES.van,
  imageAlt: copy.value.h1,
}))

jsonLd(
  breadcrumbSchema(trail.value),
  faqSchema(copy.value.faq.items),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: copy.value.h1,
    provider: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
    areaServed: [
      { '@type': 'City', name: business.value.city },
      { '@type': 'AdministrativeArea', name: 'Unsko-sanski kanton' },
      /*
       * The country, not the two Croatian airports. The service reaches them
       * and the routes below say so, but claiming them as areaServed would
       * assert an operating presence in another country.
       */
      { '@type': 'Country', name: 'Bosnia and Herzegovina' },
    ],
    /*
     * The routes as a catalogue. No Offer price on any of them: per-route and
     * per-day rates are not confirmed, and a made-up figure here would be a
     * false price claim.
     */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.value.trips.title,
      itemListElement: copy.value.trips.items.map(trip => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${copy.value.h1} - ${trip.name}` },
      })),
    },
  },
)
</script>

<template>
  <div>
    <LandingHeader />

    <main class="bg-ink-950 pt-28 md:pt-32">
      <section class="reveal-onload">
        <div class="shell">
          <LandingBreadcrumb :trail="trail" />

          <span
            class="reveal mt-6 flex h-11 w-11 items-center justify-center rounded-full border border-lime-400/40 text-lime-400"
            aria-hidden="true"
          >
            <PhSteeringWheel :size="21" />
          </span>

          <h1 class="h-display reveal mt-5 max-w-[20ch] text-mist-0">
            {{ copy.h1 }}
          </h1>
          <p class="body-lg reveal mt-6 max-w-[62ch]">
            {{ copy.intro }}
          </p>

          <div class="reveal mt-9 flex flex-col gap-3 sm:flex-row">
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

      <section class="reveal-group section-y">
        <div class="shell">
          <LandingSectionHeading :title="copy.services.title" :intro="copy.services.intro" />

          <div class="mt-11 grid gap-5 lg:grid-cols-3">
            <article
              v-for="service in copy.services.items"
              :key="service.title"
              class="reveal surface flex flex-col p-7"
            >
              <h2 class="h-card text-mist-0">
                {{ service.title }}
              </h2>
              <p class="body-base mt-2.5">
                {{ service.body }}
              </p>
              <ul class="mt-5 space-y-2.5 border-t border-ink-700 pt-5">
                <li
                  v-for="point in service.points"
                  :key="point"
                  class="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-mist-400"
                >
                  <PhCheck :size="15" weight="bold" class="mt-1 shrink-0 text-lime-400" aria-hidden="true" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- Routes: distance and drive time are the two things people ask first. -->
      <section class="reveal-group section-y bg-ink-950">
        <div class="shell">
          <LandingSectionHeading :title="copy.trips.title" :intro="copy.trips.intro" />

          <ul class="mt-11 divide-y divide-ink-700 border-y border-ink-700">
            <li
              v-for="trip in copy.trips.items"
              :key="trip.name"
              class="reveal grid gap-4 py-7 md:grid-cols-12 md:items-baseline"
            >
              <h3 class="h-card text-[1.0625rem] text-mist-0 md:col-span-3">
                {{ trip.name }}
              </h3>

              <dl class="flex gap-6 font-mono text-xs text-mist-500 md:col-span-3 md:flex-col md:gap-1.5">
                <div>
                  <dt class="inline">
                    {{ copy.trips.distanceLabel }}:
                  </dt>
                  <dd class="inline text-lime-400" dir="ltr">
                    {{ trip.distanceKm }} km
                  </dd>
                </div>
                <div>
                  <dt class="inline">
                    {{ copy.trips.durationLabel }}:
                  </dt>
                  <dd class="inline text-lime-400" dir="ltr">
                    {{ trip.duration }}
                  </dd>
                </div>
              </dl>

              <p class="body-base md:col-span-6">
                {{ trip.body }}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section class="reveal-group section-y">
        <div class="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <figure class="reveal lg:col-span-5">
            <img
              :src="SCENE_IMAGES.van"
              :alt="copy.h1"
              class="aspect-[16/10] w-full rounded-card border border-ink-700 object-cover"
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            >
          </figure>

          <div class="lg:col-span-6 lg:col-start-7">
            <h2 class="h-section reveal text-mist-0">
              {{ copy.why.title }}
            </h2>
            <ul class="mt-7 space-y-4">
              <li
                v-for="item in copy.why.items"
                :key="item"
                class="reveal flex items-start gap-3 text-[0.9375rem] leading-relaxed text-mist-400"
              >
                <PhCheck :size="16" weight="bold" class="mt-1 shrink-0 text-lime-400" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="reveal-group section-y bg-ink-950">
        <div class="shell grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <h2 class="h-section reveal text-mist-0">
              {{ copy.pricing.title }}
            </h2>
            <p
              v-for="paragraph in copy.pricing.paragraphs"
              :key="paragraph"
              class="body-base reveal mt-4 max-w-[54ch]"
            >
              {{ paragraph }}
            </p>
            <LandingButton
              :to="localeRoute('/vozila')"
              variant="secondary"
              size="sm"
              class="reveal mt-7"
            >
              {{ t.nav.fleet }}
            </LandingButton>
          </div>

          <div class="lg:col-span-6 lg:col-start-7">
            <LandingSectionHeading :title="copy.faq.title" />
            <div class="reveal mt-7">
              <LandingAccordion :items="copy.faq.items" />
            </div>
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
