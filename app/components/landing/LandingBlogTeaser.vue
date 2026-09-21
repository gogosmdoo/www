<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { BLOG_POSTS } from '~/data/blog'

/*
 * The guides are written in Bosnian only, because they target local-intent
 * search. Surfacing Bosnian cards to an English or Arabic reader is noise, so
 * the teaser is scoped to the bs locale. The /blog routes stay crawlable and
 * stay in the sitemap either way, which is what the SEO value depends on.
 */
const { t, locale } = useI18n()

/*
 * Two cards, newest first. The teaser is a doorway to /blog, not a replacement
 * for it — seven cards here would push the booking section off the page.
 */
const featured = computed(() =>
  [...BLOG_POSTS]
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 2),
)
</script>

<template>
  <section v-if="locale === 'bs'" class="reveal-group section-y bg-ink-950">
    <div class="shell">
      <LandingSectionHeading
        :eyebrow="t.blog.eyebrow"
        :title="t.blog.title"
        :intro="t.blog.intro"
      />

      <div class="mt-11 grid gap-5 md:grid-cols-2">
        <NuxtLink
          v-for="post in featured"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="reveal group flex flex-col overflow-hidden rounded-card border border-ink-700 bg-ink-850 transition duration-300 ease-out hover:border-lime-400/40"
        >
          <img
            :src="post.image"
            :alt="post.imageAlt"
            class="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            width="1200"
            height="750"
            loading="lazy"
            decoding="async"
          >
          <div class="flex flex-1 flex-col p-6">
            <p class="font-mono text-xs text-mist-500">
              {{ fill(t.blog.readingTime, post.readingMinutes) }}
            </p>
            <h3 class="h-card mt-3 text-mist-0 group-hover:text-lime-400">
              {{ post.title }}
            </h3>
            <p class="body-base mt-2.5 flex-1">
              {{ post.excerpt }}
            </p>
            <span class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-400">
              {{ t.blog.readMore }}
              <PhArrowRight
                :size="15"
                class="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
