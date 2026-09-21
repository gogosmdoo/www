<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

/*
 * FAQ accordion built on <details>, so every answer is present in the
 * prerendered HTML. That matters twice over here: crawlers and language models
 * read the answers without running JS, and the FAQPage structured data on the
 * page then matches what is actually rendered.
 */
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="divide-y divide-ink-700 border-y border-ink-700">
    <details
      v-for="item in items"
      :key="item.q"
      class="group"
    >
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start transition-colors duration-200 hover:text-lime-400 [&::-webkit-details-marker]:hidden"
      >
        <h3 class="font-display text-[1.0625rem] font-medium text-mist-0 group-hover:text-lime-400">
          {{ item.q }}
        </h3>
        <span
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-700 text-mist-500 transition-transform duration-300 ease-out group-open:rotate-45 group-open:border-lime-400/50 group-open:text-lime-400"
          aria-hidden="true"
        >
          <PhPlus :size="13" weight="bold" />
        </span>
      </summary>
      <p class="body-base max-w-[68ch] pb-6 pe-10">
        {{ item.a }}
      </p>
    </details>
  </div>
</template>
