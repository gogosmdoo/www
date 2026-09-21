<script setup lang="ts">
/*
 * Trust strip. Lives directly under the hero rather than inside it.
 *
 * Every figure here is verifiable from the client's own material: the fleet
 * count is the twelve vehicles actually photographed, the model-year range is
 * read off those posters. No invented ratings, review counts or "customers
 * served" numbers appear anywhere on this site.
 */
const { t } = useI18n()
</script>

<template>
  <section class="reveal-group border-y border-ink-700 bg-ink-950">
    <div class="shell">
      <dl class="grid grid-cols-2 divide-ink-700 md:grid-cols-4 md:divide-x">
        <div
          v-for="fact in t.facts"
          :key="fact.label"
          class="reveal px-2 py-7 text-center md:px-6 md:py-9"
        >
          <dt class="sr-only">{{ fact.label }}</dt>
          <dd>
            <span class="block font-display text-2xl font-semibold text-lime-400 md:text-3xl">
              {{ fact.value }}
            </span>
            <span class="mt-1.5 block text-[0.8125rem] text-mist-500">
              {{ fact.label }}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
