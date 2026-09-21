<script setup lang="ts">
import { PhArrowRight, PhGear, PhUsers } from '@phosphor-icons/vue'
import { FLEET_CARS, FLEET_CATEGORIES } from '~/data/business'
import { VEHICLE_COPY } from '~/content/vehicles'
import type { FleetCar } from '~/i18n/types'

/*
 * A filtered scroll-snap rail rather than a grid: the tabs narrow the set and
 * the rail carries the breadth, which keeps the section one row tall whether
 * the fleet is eleven cars or thirty.
 *
 * Card images are pinned to `aspect-[16/10]`, matching the frame every fleet
 * photo is re-exported to. That is belt and braces — the files are already all
 * 16:10 — but it means dropping in a photo at some other ratio can never make
 * one card in a row taller than its neighbours.
 *
 * Cards link to the vehicle page rather than straight out to WhatsApp. The
 * vehicle page answers what a card cannot (who the car suits, how many it
 * seats) before asking for the enquiry, and those internal links are what give
 * the eleven vehicle pages any standing in search at all.
 */
const { t, locale, localeRoute } = useI18n()

const active = ref<string>('all')

const visible = computed<FleetCar[]>(() =>
  active.value === 'all'
    ? FLEET_CARS
    : FLEET_CARS.filter(car => car.category === active.value),
)

/* Seats and gearbox both come from ~/utils/copy; see the note there. */
function imageAlt(car: FleetCar) {
  return t.value.fleet.imageAlt
    .replace('{name}', car.name)
    .replace('{colour}', car.colour)
}
</script>

<template>
  <section id="vozila" class="reveal-group section-y bg-ink-950">
    <div class="shell">
      <LandingSectionHeading
        :eyebrow="t.fleet.eyebrow"
        :title="t.fleet.title"
        :intro="t.fleet.intro"
      />

      <div
        class="reveal mt-9 flex flex-wrap gap-2"
        role="tablist"
        :aria-label="t.fleet.title"
      >
        <button
          v-for="category in FLEET_CATEGORIES"
          :key="category"
          type="button"
          role="tab"
          :aria-selected="active === category"
          class="h-10 rounded-pill border px-4 text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.97]"
          :class="active === category
            ? 'border-lime-400 bg-lime-400 text-ink-950'
            : 'border-ink-700 text-mist-400 hover:border-lime-400/50 hover:text-mist-0'"
          @click="active = category"
        >
          {{ t.fleet.categories[category] }}
        </button>
      </div>

      <p class="reveal mt-4 text-xs text-mist-500 md:hidden">
        {{ t.fleet.railHint }}
      </p>
    </div>

    <!-- Rail breaks the shell so cards can bleed to the viewport edge. -->
    <div class="reveal mt-6">
      <div class="rail shell !overflow-x-auto">
        <article
          v-for="car in visible"
          :key="car.id"
          class="group w-[17rem] shrink-0 snap-start overflow-hidden rounded-card border border-ink-700 bg-ink-850 transition-[border-color,transform] duration-300 ease-out sm:w-[19rem]"
        >
          <div class="relative overflow-hidden bg-ink-900">
            <img
              :src="car.image"
              :srcset="fleetSrcset(car.image)"
              sizes="(max-width: 640px) 90vw, 19rem"
              :alt="imageAlt(car)"
              class="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            >
            <span
              class="absolute end-3 top-3 rounded-pill bg-ink-950/80 px-2.5 py-1 text-[0.6875rem] font-medium text-mist-200 backdrop-blur-sm"
            >
              {{ t.fleet.categories[car.category] }}
            </span>
          </div>

          <div class="p-5">
            <h3 class="h-card">
              {{ car.name }}
            </h3>
            <!--
              Generation disambiguates the two Rapid Spacebacks, which are
              otherwise the same name twice in the same rail.
            -->
            <p class="mt-1 text-xs text-mist-600">
              {{ car.generation }} · {{ car.colour }}
            </p>

            <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <p v-if="seatsLabel(car, t)" class="flex items-center gap-1.5 text-xs text-mist-500">
                <PhUsers :size="14" aria-hidden="true" />
                {{ seatsLabel(car, t) }}
              </p>
              <p v-if="gearboxLabel(car, VEHICLE_COPY[locale].spec)" class="flex items-center gap-1.5 text-xs text-mist-500">
                <PhGear :size="14" aria-hidden="true" />
                {{ gearboxLabel(car, VEHICLE_COPY[locale].spec) }}
              </p>
            </div>

            <ul class="mt-4 space-y-1.5">
              <li
                v-for="spec in car.specs"
                :key="spec"
                class="text-[0.8125rem] text-mist-400"
              >
                {{ t.fleet.specs[spec] }}
              </li>
            </ul>

            <LandingButton
              :to="localeRoute(`/vozila/${car.slug}`)"
              variant="secondary"
              size="sm"
              block
              class="mt-5"
            >
              {{ VEHICLE_COPY[locale].viewCar }}
              <PhArrowRight :size="15" class="rtl:-scale-x-100" aria-hidden="true" />
            </LandingButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
