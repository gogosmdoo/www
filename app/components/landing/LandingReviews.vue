<script setup lang="ts">
import { PhArrowUpRight } from '@phosphor-icons/vue'
import { GOOGLE_REVIEWS, GOOGLE_RATING } from '~/data/reviews'

/*
 * Google reviews.
 *
 * Layout family: an offset two-column column-flow, so the cards interlock
 * rather than forming a grid of equal boxes. The five reviews are very
 * different lengths (one is a paragraph, one is nine words) and a strict grid
 * would either crop the long one or leave craters around the short ones.
 *
 * Every review is quoted verbatim and untranslated — see the note in
 * ~/data/reviews for why — and each card links to its own permalink, which is
 * the only thing that makes a testimonial on a company's own site worth
 * anything. `lang="en"` is set on the quote so a screen reader in Bosnian or
 * Arabic mode does not read English prose with the wrong phoneme set.
 *
 * Deliberately no AggregateRating JSON-LD here: marking up reviews collected
 * on another platform as first-party ratings is against Google's structured
 * data policy and risks a manual action.
 */
const { t, business, isRtl } = useI18n()

const score = computed(() => GOOGLE_RATING.score.toFixed(1))

/*
 * "based on 14 reviews" only renders when the count is actually known — a
 * rating with no number beside it is honest, a rating beside a zero is not.
 */
const countLabel = computed(() =>
  GOOGLE_RATING.count
    ? fill(t.value.reviews.ratingCount, GOOGLE_RATING.count)
    : null,
)
</script>

<template>
  <section id="recenzije" class="section-y bg-ink-850">
    <div class="shell reveal-group">
      <!-- Heading block: rating on the left, framing copy on the right. -->
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-5">
          <div class="reveal flex items-center gap-3" style="--reveal-delay: 0ms">
            <svg class="h-7 w-7 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
            </svg>

            <div class="flex items-baseline gap-2">
              <span class="font-display text-4xl font-semibold tabular-nums leading-none text-mist-0">
                {{ score }}
              </span>
              <span class="flex items-center gap-0.5" aria-hidden="true">
                <svg v-for="star in 5" :key="star" class="h-4 w-4" viewBox="0 0 24 24" fill="#E7711B">
                  <path d="M12 2.5l2.9 6.06 6.6.88-4.82 4.6 1.2 6.56L12 17.5l-5.88 3.1 1.2-6.56L2.5 9.44l6.6-.88L12 2.5z" />
                </svg>
              </span>
            </div>
          </div>

          <p class="body-base reveal mt-3" style="--reveal-delay: 60ms">
            {{ t.reviews.ratingLabel }}<template v-if="countLabel"> · {{ countLabel }}</template>
          </p>

          <h2 class="h-section reveal mt-5 text-mist-0" style="--reveal-delay: 120ms">
            {{ t.reviews.title }}
          </h2>
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <p class="body-lg reveal" style="--reveal-delay: 180ms">
            {{ t.reviews.intro }}
          </p>
        </div>
      </div>

      <!--
        Column flow rather than a grid: cards keep their natural height and the
        browser balances the columns, so the long review is never truncated.
      -->
      <div class="mt-14 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        <a
          v-for="(review, index) in GOOGLE_REVIEWS"
          :key="review.author"
          :href="review.href ?? business.googleMapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="surface surface-hover reveal group block p-6"
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="h-card text-[1.0625rem] text-mist-0">{{ review.author }}</p>
              <span class="mt-1.5 flex items-center gap-0.5" :aria-label="`${review.rating} / 5`">
                <svg
                  v-for="star in review.rating"
                  :key="star"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="#E7711B"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.9 6.06 6.6.88-4.82 4.6 1.2 6.56L12 17.5l-5.88 3.1 1.2-6.56L2.5 9.44l6.6-.88L12 2.5z" />
                </svg>
              </span>
            </div>

            <PhArrowUpRight
              :size="17"
              weight="bold"
              class="mt-1 shrink-0 text-mist-600 transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-lime-400 rtl:-scale-x-100"
              aria-hidden="true"
            />
          </div>

          <!--
            lang is per review, not pinned: these are a mix of Bosnian and
            English, and a screen reader set to the page locale would otherwise
            read one of the two with the wrong phoneme set. dir is forced to ltr
            because both scripts are Latin even when the page is Arabic.
          -->
          <blockquote
            :lang="review.lang"
            dir="ltr"
            class="body-base mt-4 whitespace-pre-line"
            :class="isRtl ? 'text-start' : ''"
          >
            {{ review.body }}
          </blockquote>

          <!--
            Two of these are Google's own English rendering of a Bosnian
            original, which the client supplied in place of the original. Saying
            so is the difference between quoting a customer and paraphrasing
            one.
          -->
          <p
            v-if="review.translated"
            class="mt-2 text-[0.6875rem] text-mist-600"
          >
            {{ t.reviews.translatedNote }}
          </p>

          <span class="mt-4 inline-block text-[0.75rem] font-medium text-mist-500 transition-colors duration-200 group-hover:text-lime-400">
            {{ t.reviews.readOnGoogle }}
          </span>
        </a>
      </div>

      <div class="reveal mt-10 flex flex-wrap items-center justify-center gap-4" style="--reveal-delay: 120ms">
        <LandingButton :href="business.googleMapsUrl" variant="ghost" size="md" external>
          {{ t.reviews.allReviews }}
          <PhArrowUpRight :size="17" weight="bold" aria-hidden="true" class="rtl:-scale-x-100" />
        </LandingButton>
      </div>

    </div>
  </section>
</template>
