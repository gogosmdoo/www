<script setup lang="ts">
/*
 * Section header. Headline and intro stack vertically on purpose: the
 * "big headline left / small paragraph floating right" split is banned here,
 * because it reads as templated and gives a section two competing entry
 * points. `eyebrow` is optional and rationed by the page, not by this file.
 */
defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  align?: 'start' | 'center'
}>()
</script>

<template>
  <header
    class="max-w-3xl"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <p v-if="eyebrow" class="eyebrow reveal mb-4">
      {{ eyebrow }}
    </p>
    <h2 class="h-section reveal text-mist-0">
      {{ title }}
    </h2>
    <p v-if="intro" class="body-lg reveal mt-5 max-w-[60ch]">
      {{ intro }}
    </p>
  </header>
</template>
