<script setup lang="ts">
/*
 * Brand lockup.
 *
 * The supplied logo is a photograph of glossy black acrylic lettering on a pale
 * office wall. scripts/build-images.py keys the wall out and renders the
 * artwork twice: once in near-white for the ink page, once in its original
 * graphite for any light surface. The green wordmark is the only part that
 * keeps its colour in both, one stop brighter on dark so it clears contrast.
 *
 * On this site the near-white version is the default, because the site is
 * dark everywhere. `onLight` is there for the rare light ground — a printed
 * sheet, an email, a light-card embed — and is deliberately not used by any
 * current page.
 *
 * Intrinsic size is set so the header reserves the right box before the image
 * decodes; without it the nav shifts sideways on first paint.
 */
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  /* Footer sits well below the fold and should not compete with the hero. */
  lazy?: boolean
  /* Set on a light surface, where the graphite artwork is the readable one. */
  onLight?: boolean
}>(), { size: 'sm', lazy: false, onLight: false })

const { business } = useI18n()

const HEIGHTS = {
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-14',
} as const
</script>

<template>
  <img
    :src="onLight ? business.logoLockupLight : business.logoLockup"
    :alt="business.name"
    class="w-auto"
    :class="HEIGHTS[size]"
    width="1213"
    height="544"
    :loading="lazy ? 'lazy' : undefined"
    decoding="async"
  >
</template>
