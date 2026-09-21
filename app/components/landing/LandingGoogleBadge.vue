<script setup lang="ts">
import { GOOGLE_RATING } from '~/data/reviews'

/*
 * Compact "5,0 on Google" badge. Used in the header and the hero, where the
 * brief asks for the rating to be visible before a visitor scrolls.
 *
 * The G is Google's own four-colour mark, inline so it costs no request and
 * cannot 404. The stars use #E7711B — the amber Google actually renders review
 * stars in, which is not the yellow from the logo.
 *
 * The score renders from GOOGLE_RATING and the review count is omitted while it
 * is null, because "5,0" beside an invented count is a worse claim than "5,0"
 * on its own.
 */
withDefaults(defineProps<{
  size?: 'sm' | 'md'
  /* On the graphite plate the label has to flip to a light colour. */
  onPlate?: boolean
}>(), { size: 'sm', onPlate: false })

const { t, business } = useI18n()

/* 5,0 in Bosnian/German, 5.0 in English/Arabic. */
const { locale } = useI18n()
const score = computed(() =>
  locale.value === 'bs' || locale.value === 'de'
    ? GOOGLE_RATING.score.toFixed(1).replace('.', ',')
    : GOOGLE_RATING.score.toFixed(1),
)
</script>

<template>
  <a
    :href="business.googleMapsUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="group inline-flex items-center gap-2 rounded-pill border transition duration-200 ease-out"
    :class="[
      onPlate
        ? 'border-white/15 bg-white/5 hover:border-white/30'
        : 'border-ink-700 bg-ink-950 hover:border-lime-300 hover:shadow-card',
      size === 'md' ? 'px-3.5 py-2' : 'px-3 py-1.5',
    ]"
    :aria-label="`${t.reviews.ratingLabel}: ${score} / 5`"
  >
    <svg
      :class="size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>

    <span
      class="font-semibold tabular-nums"
      :class="[
        onPlate ? 'text-mist-0' : 'text-mist-0',
        size === 'md' ? 'text-sm' : 'text-[0.8125rem]',
      ]"
    >{{ score }}</span>

    <span class="flex items-center gap-px" aria-hidden="true">
      <svg
        v-for="star in 5"
        :key="star"
        :class="size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3'"
        viewBox="0 0 24 24"
        fill="#E7711B"
      >
        <path d="M12 2.5l2.9 6.06 6.6.88-4.82 4.6 1.2 6.56L12 17.5l-5.88 3.1 1.2-6.56L2.5 9.44l6.6-.88L12 2.5z" />
      </svg>
    </span>

    <span
      class="hidden text-[0.75rem] sm:inline"
      :class="onPlate ? 'text-mist-500' : 'text-mist-500'"
    >{{ t.reviews.onGoogle }}</span>
  </a>
</template>
