<script setup lang="ts">
/*
 * Differentiators. Deliberately a 2-column numbered list separated by hairlines
 * rather than a card grid, so it does not repeat the bento layout above it.
 */
const { t } = useI18n()
</script>

<template>
  <section class="reveal-group section-y bg-ink-950">
    <div class="shell">
      <LandingSectionHeading
        :eyebrow="t.why.eyebrow"
        :title="t.why.title"
        :intro="t.why.intro"
      />

      <div class="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        <div
          v-for="(item, index) in t.why.items"
          :key="item.title"
          class="reveal border-t border-ink-700 pt-6"
        >
          <span class="font-mono text-xs text-lime-400" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="h-card mt-3 text-mist-0">
            {{ item.title }}
          </h3>
          <p class="body-base mt-2.5 max-w-[46ch]">
            {{ item.body }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
