<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { BLOG_POSTS } from '~/data/blog'

const { t, business } = useI18n()

useScrollReveal()

/* Newest first; the list is now long enough for order to matter. */
const sortedPosts = computed(() =>
  [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published)),
)

useSeo(() => ({
  title: `${t.value.blog.allPosts} | ${business.value.name}`,
  description: t.value.blog.intro,
  path: '/blog',
}))

jsonLd(
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: t.value.blog.allPosts, path: '/blog' },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.value.blog.allPosts,
    url: absoluteUrl('/blog'),
    hasPart: BLOG_POSTS.map(post => ({
      '@type': 'Article',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.published,
    })),
  },
)
</script>

<template>
  <div>
    <LandingHeader />

    <main class="reveal-onload bg-ink-950 pb-8 pt-32 md:pt-36">
      <div class="shell">
        <h1 class="h-display reveal max-w-[20ch] text-mist-0">
          {{ t.blog.allPosts }}
        </h1>
        <p class="body-lg reveal mt-5 max-w-[58ch]">
          {{ t.blog.intro }}
        </p>

        <div class="mt-14 grid gap-5 md:grid-cols-2">
          <NuxtLink
            v-for="post in sortedPosts"
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
              <h2 class="h-card mt-3 text-mist-0 group-hover:text-lime-400">
                {{ post.title }}
              </h2>
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
    </main>

    <LandingContact />
    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
