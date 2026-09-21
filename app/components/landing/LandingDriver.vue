<script setup lang="ts">
import { PhCheck, PhSteeringWheel, PhUsers } from '@phosphor-icons/vue'
import { SCENE_IMAGES } from '~/data/business'

/*
 * The "with a driver / without a driver" fork. This is the single question that
 * decides which service the visitor is buying, so it gets a full-width image
 * band with the two options laid over it rather than another text split.
 */
const { t, business, localeRoute } = useI18n()
</script>

<template>
  <section class="reveal-group relative overflow-hidden bg-ink-950 section-y">
    <div aria-hidden="true" class="absolute inset-0">
      <img
        :src="SCENE_IMAGES.van"
        :alt="t.driver.imageAlt"
        class="parallax-slow h-full w-full object-cover opacity-[0.55]"
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
      >
      <div class="absolute inset-0 bg-ink-950/60" />
    </div>

    <div class="shell relative">
      <LandingSectionHeading
        :title="t.driver.title"
        :intro="t.driver.intro"
        align="center"
      />

      <div class="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <div
          v-for="(option, key) in { withDriver: t.driver.withDriver, selfDrive: t.driver.selfDrive }"
          :key="key"
          class="reveal rounded-card border border-ink-700 bg-ink-950/85 p-7 backdrop-blur-sm transition duration-300 ease-out hover:border-lime-400/40"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full border border-lime-400/30 text-lime-400"
            aria-hidden="true"
          >
            <PhUsers v-if="key === 'withDriver'" :size="21" />
            <PhSteeringWheel v-else :size="21" />
          </span>

          <h3 class="h-card mt-5 text-mist-0">
            {{ option.title }}
          </h3>
          <p class="body-base mt-2.5">
            {{ option.body }}
          </p>

          <ul class="mt-5 space-y-2.5 border-t border-ink-700 pt-5">
            <li
              v-for="point in option.points"
              :key="point"
              class="flex items-start gap-2.5 text-[0.875rem] text-mist-400"
            >
              <PhCheck
                :size="15"
                class="mt-1 shrink-0 text-lime-400"
                weight="bold"
                aria-hidden="true"
              />
              {{ point }}
            </li>
          </ul>
        </div>
      </div>

      <div class="reveal mt-10 text-center">
        <!--
          Points at the chauffeur page rather than straight at the phone. The
          service needs explaining before it converts, and this is the internal
          link that gives that page standing.
        -->
        <LandingButton :to="localeRoute('/najam-sa-vozacem')" size="lg">
          {{ t.driver.cta }}
        </LandingButton>
      </div>
    </div>
  </section>
</template>
