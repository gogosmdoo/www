<script setup lang="ts">
import { PhArrowRight, PhUsers } from '@phosphor-icons/vue'
import { FLEET_CARS } from '~/data/business'
import { VEHICLE_COPY } from '~/content/vehicles'

/*
 * Fleet index.
 *
 * Exists so the twelve vehicle pages have a parent: it makes the breadcrumb
 * trail honest, and it is the page crawlLinks follows to discover every
 * /vozila/[slug] in each locale.
 */
const { t, locale, business, localeRoute } = useI18n()

useScrollReveal()

const copy = computed(() => VEHICLE_COPY[locale.value])

const trail = computed(() => [
  { name: business.value.name, path: '/' },
  { name: copy.value.breadcrumbAll, path: '/vozila' },
])

useSeo(() => ({
  title: copy.value.indexMetaTitle,
  description: copy.value.indexMetaDescription,
  path: '/vozila',
}))

jsonLd(
  breadcrumbSchema(trail.value),
  fleetSchema(id => t.value.fleet.categories[id] ?? id),
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
            {{ copy.indexH1 }}
          </h1>
          <p class="body-lg reveal mt-6 max-w-[62ch]">
            {{ copy.indexIntro }}
          </p>
        </div>
      </section>

      <section class="reveal-group section-y">
        <div class="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="car in FLEET_CARS"
            :key="car.id"
            :to="localeRoute(`/vozila/${car.slug}`)"
            class="reveal group flex flex-col overflow-hidden rounded-card border border-ink-700 bg-ink-850 transition duration-300 ease-out hover:border-lime-400/40"
          >
            <div class="overflow-hidden bg-ink-900">
              <img
                :src="car.image"
                :srcset="fleetSrcset(car.image)"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30rem"
                :alt="t.fleet.imageAlt.replace('{name}', car.name).replace('{colour}', car.colour)"
                class="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
              >
            </div>

            <div class="flex grow flex-col p-5">
              <div class="flex items-baseline justify-between gap-3">
                <h2 class="h-card text-mist-0">
                  {{ car.name }}
                </h2>
              </div>

              <p class="mt-1.5 flex items-center gap-3 text-xs text-mist-500">
                <span v-if="car.seats" class="flex items-center gap-1.5">
                  <PhUsers :size="14" aria-hidden="true" />
                  {{ seatsLabel(car, t) }}
                </span>
                <span>{{ gearboxLabel(car, copy.spec) }}</span>
              </p>

              <p class="body-base mt-3 grow text-[0.9375rem]">
                {{ copy.audience[car.id] }}
              </p>

              <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lime-400">
                {{ copy.viewCar }}
                <PhArrowRight :size="14" class="rtl:rotate-180" aria-hidden="true" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>

    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
