<script setup lang="ts">
import { PhArrowLeft, PhCheck, PhPhone } from '@phosphor-icons/vue'
import { BLOG_POSTS, findPost } from '~/data/blog'
import { BUSINESS } from '~/data/business'

const route = useRoute()
const { t, business } = useI18n()

const post = findPost(String(route.params.slug))

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useScrollReveal()

/*
 * Formatted by hand rather than through Intl: many runtimes ship without
 * bs-BA CLDR data and fall back to "2026 M06 18". The guides are Bosnian only,
 * so a fixed month list is both correct and deterministic.
 */
const BS_MONTHS = [
  'januar', 'februar', 'mart', 'april', 'maj', 'juni',
  'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar',
]

const publishedLabel = computed(() => {
  const date = new Date(post!.published)
  return `${date.getUTCDate()}. ${BS_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}.`
})

useSeo(() => ({
  title: post!.metaTitle,
  description: post!.description,
  path: `/blog/${post!.slug}`,
  image: post!.image,
  imageAlt: post!.imageAlt,
  type: 'article',
  keywords: post!.keywords,
  published: post!.published,
  modified: post!.updated,
}))

jsonLd(
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.published,
    dateModified: post.updated,
    inLanguage: 'bs',
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: BUSINESS.name, url: absoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(BUSINESS.logoLockup) },
    },
  },
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: t.value.blog.allPosts, path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]),
)

/*
 * Two further reads, newest first. With seven guides, always linking whichever
 * one happens to sit first in the array would leave most of them orphaned.
 */
const otherPosts = computed(() =>
  [...BLOG_POSTS]
    .filter(p => p.slug !== post!.slug)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 2),
)
</script>

<template>
  <div v-if="post">
    <LandingHeader />

    <main class="bg-ink-950 pt-28 md:pt-32">
      <article>
        <header class="shell reveal-onload">
          <NuxtLink
            to="/blog"
            class="reveal inline-flex items-center gap-2 text-sm text-mist-500 transition-colors duration-200 hover:text-lime-400"
          >
            <PhArrowLeft :size="15" class="rtl:rotate-180" aria-hidden="true" />
            {{ t.blog.backToBlog }}
          </NuxtLink>

          <h1 class="h-display reveal mt-6 max-w-[24ch] text-mist-0">
            {{ post.title }}
          </h1>

          <p class="reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-mist-500">
            <span>{{ t.blog.published }} {{ publishedLabel }}</span>
            <span aria-hidden="true">/</span>
            <span>{{ fill(t.blog.readingTime, post.readingMinutes) }}</span>
          </p>
        </header>

        <figure class="shell reveal-lcp mt-10">
          <img
            :src="post.image"
            :alt="post.imageAlt"
            class="aspect-[16/10] w-full rounded-card border border-ink-700 object-cover"
            width="1200"
            height="549"
            fetchpriority="high"
            decoding="async"
          >
        </figure>

        <div class="shell reveal-group mt-14 pb-20">
          <div class="max-w-[68ch]">
            <section
              v-for="section in post.sections"
              :key="section.heading"
              class="reveal mb-11"
            >
              <h2 class="font-display text-2xl font-semibold tracking-tight text-mist-0 md:text-[1.75rem]">
                {{ section.heading }}
              </h2>

              <p
                v-for="paragraph in section.paragraphs"
                :key="paragraph"
                class="mt-4 text-[1.0625rem] leading-[1.75] text-mist-400"
              >
                {{ paragraph }}
              </p>

              <ul v-if="section.bullets" class="mt-5 space-y-3">
                <li
                  v-for="bullet in section.bullets"
                  :key="bullet"
                  class="flex items-start gap-3 text-[1.0625rem] leading-[1.7] text-mist-400"
                >
                  <PhCheck
                    :size="16"
                    weight="bold"
                    class="mt-1.5 shrink-0 text-lime-400"
                    aria-hidden="true"
                  />
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </section>

            <!-- In-article conversion point, matching the page's single CTA intent. -->
            <aside class="reveal surface mt-14 p-7">
              <h2 class="h-card text-mist-0">
                {{ t.blog.ctaTitle }}
              </h2>
              <p class="body-base mt-2.5">
                {{ t.blog.ctaBody }}
              </p>
              <LandingButton :href="business.phoneHref" size="lg" class="mt-6">
                <PhPhone :size="18" weight="fill" aria-hidden="true" />
                {{ t.hero.ctaPrimary }}
              </LandingButton>
            </aside>

            <NuxtLink
              v-for="other in otherPosts"
              :key="other.slug"
              :to="`/blog/${other.slug}`"
              class="reveal mt-4 flex items-center justify-between gap-5 rounded-card border border-ink-700 bg-ink-850 p-6 transition duration-300 ease-out hover:border-lime-400/40"
            >
              <span>
                <span class="block text-xs text-mist-500">{{ t.blog.readMore }}</span>
                <span class="mt-1.5 block font-display font-semibold text-mist-0">
                  {{ other.title }}
                </span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </article>
    </main>

    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
