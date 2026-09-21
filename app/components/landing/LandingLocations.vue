<script setup lang="ts">
import { PhAirplaneTilt, PhArrowUpRight, PhHouseLine, PhMapPin, PhSignpost } from '@phosphor-icons/vue'

/*
 * Where the car can reach you.
 *
 * This is the section the geography carries, and it is the one that does not
 * exist on a competitor's site in this town. Bihać has no airport, so the four
 * cells run outward from the office rather than inward from a terminal: our
 * counter, your address, the airport you actually land at, and the border 13 km
 * away. The order is deliberate — it answers "where are you?" before it answers
 * "how far will you come?", because a visitor who cannot place the business
 * does not care about its delivery radius yet.
 *
 * The first cell is the real address and carries the map link. Rendering it as
 * the same NAP string used in the footer and in the LocalBusiness schema is
 * what lets Google tie the three together.
 */
const { t, business } = useI18n()

useScrollReveal()

/* Icons are positional, matching the order of `locations.items`. */
const ICONS = [PhMapPin, PhHouseLine, PhAirplaneTilt, PhSignpost]
</script>

<template>
  <section class="reveal-group section-y bg-ink-900">
    <div class="shell">
      <LandingSectionHeading :title="t.locations.title" :intro="t.locations.intro" />

      <!--
        Bento rather than four equal cards: the office cell is the only one with
        an address, a map link and opening hours in it, so it gets the width to
        hold them. The other three are equal because they are alternatives to
        each other.
      -->
      <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, i) in t.locations.items"
          :key="item.title"
          class="surface surface-hover reveal relative flex flex-col p-6 md:p-7"
          :class="i === 0 ? 'lg:col-span-2' : ''"
          :style="`--reveal-delay: ${i * 60}ms`"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-lime-400/10 text-lime-400"
            >
              <component :is="ICONS[i]" :size="20" weight="regular" aria-hidden="true" />
            </span>
            <span class="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mist-500">
              {{ item.meta }}
            </span>
          </div>

          <h3 class="h-card mt-5">
            {{ item.title }}
          </h3>
          <p class="body-base mt-2.5 max-w-[52ch]">
            {{ item.body }}
          </p>

          <!-- The office cell carries the NAP, the hours and the map link. -->
          <div v-if="i === 0" class="mt-6 border-t border-ink-700 pt-5">
            <p class="font-medium text-mist-0">
              {{ business.addressShort }}
            </p>
            <p class="mt-1 text-[0.8125rem] text-mist-500">
              {{ t.locations.addressNote }}
            </p>
            <a
              :href="business.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lime-400 transition-colors duration-200 ease-out hover:text-lime-300"
            >
              {{ t.locations.mapsLink }}
              <PhArrowUpRight
                :size="15"
                weight="bold"
                aria-hidden="true"
                class="rtl:-scale-x-100"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
