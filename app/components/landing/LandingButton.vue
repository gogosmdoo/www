<script setup lang="ts">
/*
 * Shape lock: every interactive control on this site is a full pill.
 *
 * Motion: 160ms ease-out on transform, and scale(0.97) while pressed. The
 * press state is not decoration — it is the only confirmation the interface
 * gives that the tap landed, on a phone where the tel: handoff can take a
 * moment. Transform and opacity only, so it never triggers layout.
 */
const props = withDefaults(defineProps<{
  /* External or protocol link (tel:, https://wa.me/...). */
  href?: string
  /* Internal route — rendered as NuxtLink so navigation stays client-side. */
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  block?: boolean
  type?: 'button' | 'submit'
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

/*
 * Contrast is checked per variant.
 *
 * The primary button carries ink text, never white: lime-400 (#a3c93f) against
 * mist-0 is about 1.9:1 and fails at every size, while against ink-950
 * (#080a06) it is roughly 10:1. This is the single easiest mistake to make in
 * this palette and the one most likely to survive review, because lime-on-white
 * still *looks* legible on a bright desktop monitor.
 */
const VARIANTS = {
  // lime-400 bg + ink-950 text -> 10.3:1
  primary: 'bg-lime-400 text-ink-950 shadow-card hover:bg-lime-300 hover:shadow-glow',
  // mist-0 bg + ink-950 text -> 19:1. The light counterweight to lime.
  secondary: 'bg-mist-0 text-ink-950 shadow-card hover:bg-mist-100 hover:shadow-lift',
  // transparent on ink + mist-0 text -> 19:1
  ghost: 'border border-ink-600 bg-ink-900/60 text-mist-0 backdrop-blur-sm hover:border-lime-400 hover:bg-ink-800',
} as const

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
} as const

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold',
  'whitespace-nowrap', // CTA labels never wrap to a second line
  /*
   * Named properties rather than `transition: all`: `all` would also animate
   * the background on first paint and pick up any property added later.
   */
  'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out',
  'active:scale-[0.97]',
  VARIANTS[props.variant],
  SIZES[props.size],
  props.block ? 'w-full' : '',
])

const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    v-bind="externalAttrs"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="classes"
  >
    <slot />
  </button>
</template>
