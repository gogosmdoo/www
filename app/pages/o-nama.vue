<script setup lang="ts">
import { PAGE_COPY } from '~/content/pages'
import { SCENE_IMAGES } from '~/data/business'

/*
 * O nama. Deliberately short, as the brief asks.
 *
 * The angle is the one thing that is actually rare here: a small, owner-run
 * fleet a short walk from the terminal. It states no vehicle age and no fleet
 * count — the client asked for the number of cars to come out of the public
 * copy — and it claims free delivery only to the airport.
 */
const { t, locale, business } = useI18n()

useScrollReveal()

const copy = computed(() => PAGE_COPY[locale.value].about)

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: '/o-nama',
}))

jsonLd(
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: copy.value.title, path: '/o-nama' },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: copy.value.title,
    description: copy.value.metaDescription,
    url: absoluteUrl('/o-nama'),
  },
)
</script>

<template>
  <div>
    <LandingHeader />

    <main class="reveal-onload bg-ink-950 pt-32 md:pt-36">
      <div class="shell">
        <LandingBreadcrumb
          :trail="[
            { name: business.name, path: '/' },
            { name: copy.title, path: '/o-nama' },
          ]"
        />

        <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <h1 class="h-display reveal max-w-[18ch] text-mist-0">
              {{ copy.title }}
            </h1>
            <p class="body-lg reveal mt-6 max-w-[54ch]" style="--reveal-delay: 80ms">
              {{ copy.lead }}
            </p>

            <div class="mt-10 space-y-5">
              <p
                v-for="(para, index) in copy.body"
                :key="index"
                class="body-base reveal max-w-[62ch]"
                :style="{ '--reveal-delay': `${160 + index * 70}ms` }"
              >
                {{ para }}
              </p>
            </div>
          </div>

          <!--
            One image, and it is a vehicle rather than a stock office: the van
            is the part of this fleet that a family or a group is actually
            choosing between agencies for.
          -->
          <div class="lg:col-span-5">
            <figure class="reveal-scale overflow-hidden rounded-card border border-ink-700 shadow-card" style="--reveal-delay: 120ms">
              <img
                :src="SCENE_IMAGES.van"
                :alt="t.driver.imageAlt"
                class="w-full object-cover"
                width="1376"
                height="768"
                loading="lazy"
                decoding="async"
              >
            </figure>
          </div>
        </div>

        <!-- How we work -->
        <section class="reveal-group mt-20 md:mt-24">
          <h2 class="h-section reveal text-mist-0">
            {{ copy.pointsTitle }}
          </h2>

          <dl class="mt-10 grid gap-px overflow-hidden rounded-card bg-ink-700 md:grid-cols-3">
            <div
              v-for="(point, index) in copy.points"
              :key="point.title"
              class="reveal bg-ink-950 p-7 transition-colors duration-300 ease-out hover:bg-ink-900"
              :style="{ '--reveal-delay': `${index * 80}ms` }"
            >
              <dt class="h-card text-mist-0">
                {{ point.title }}
              </dt>
              <dd class="body-base mt-3">
                {{ point.body }}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>

    <LandingReviews />
    <LandingContact />
    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
