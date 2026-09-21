<script setup lang="ts">
/*
 * "Naš servis" — the five stages of a rental.
 *
 * A tab list on desktop and a stack of <details> on mobile, rather than the
 * three-card timeline this section used to be. Two reasons:
 *
 * 1. There are five stages, not three, and five equal cards across a desktop
 *    row leaves each one about 240px wide holding a paragraph.
 * 2. Only one stage is relevant to any given reader at a time — somebody
 *    deciding whether to book does not want the return policy in the same
 *    glance — so the content is worth hiding behind a control.
 *
 * Why two mechanisms rather than one responsive one: on a phone, a horizontal
 * tab strip with five items either scrolls sideways (which hides options) or
 * wraps to three rows (which is taller than just stacking). <details> is the
 * right shape there, and it also means every stage is in the prerendered HTML
 * whether or not JS ran.
 *
 * The tab panel does not animate on switch. This control gets clicked several
 * times in a row by anyone actually reading it, and a 200ms fade on each press
 * turns a scan into a wait — the frequency rule from the animation framework.
 * Only the underline moves, and it moves because it is the thing that tells you
 * where you are.
 */
const { t } = useI18n()

const active = ref(0)
</script>

<template>
  <section id="usluge" class="reveal-group section-y bg-ink-850">
    <div class="shell">
      <LandingSectionHeading
        :eyebrow="t.steps.eyebrow"
        :title="t.steps.title"
        :intro="t.steps.intro"
      />

      <!-- Desktop: tabs ------------------------------------------------- -->
      <div class="reveal mt-12 hidden md:block">
        <div
          role="tablist"
          :aria-label="t.steps.title"
          class="flex gap-1 border-b border-ink-700"
        >
          <button
            v-for="(step, index) in t.steps.items"
            :id="`step-tab-${index}`"
            :key="step.label"
            type="button"
            role="tab"
            :aria-selected="active === index"
            :aria-controls="`step-panel-${index}`"
            :tabindex="active === index ? 0 : -1"
            class="relative -mb-px flex items-baseline gap-2.5 px-4 py-3.5 text-sm font-medium transition-colors duration-200 ease-out"
            :class="active === index
              ? 'text-mist-0'
              : 'text-mist-500 hover:text-mist-200'"
            @click="active = index"
            @keydown.right.prevent="active = (index + 1) % t.steps.items.length"
            @keydown.left.prevent="active = (index - 1 + t.steps.items.length) % t.steps.items.length"
          >
            <span
              class="font-mono text-xs transition-colors duration-200 ease-out"
              :class="active === index ? 'text-lime-400' : 'text-mist-600'"
              aria-hidden="true"
            >{{ String(index + 1).padStart(2, '0') }}</span>
            {{ step.label }}

            <!-- The only thing that moves. -->
            <span
              v-if="active === index"
              aria-hidden="true"
              class="absolute inset-x-0 -bottom-px h-0.5 bg-lime-400"
            />
          </button>
        </div>

        <div
          v-for="(step, index) in t.steps.items"
          v-show="active === index"
          :id="`step-panel-${index}`"
          :key="step.label"
          role="tabpanel"
          :aria-labelledby="`step-tab-${index}`"
          class="pt-8"
        >
          <p class="body-lg max-w-[68ch]">
            {{ step.body }}
          </p>
        </div>
      </div>

      <!-- Mobile: stacked disclosures ----------------------------------- -->
      <div class="reveal mt-10 divide-y divide-ink-700 border-y border-ink-700 md:hidden">
        <details
          v-for="(step, index) in t.steps.items"
          :key="step.label"
          class="group"
          :open="index === 0"
        >
          <summary
            class="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden"
          >
            <span
              class="font-mono text-xs text-lime-400"
              aria-hidden="true"
            >{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="font-display text-[1.0625rem] font-medium text-mist-0">
              {{ step.label }}
            </h3>
          </summary>
          <p class="body-base pb-5">
            {{ step.body }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
