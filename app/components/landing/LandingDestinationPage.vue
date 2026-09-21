<script setup lang="ts">
import { PhArrowRight, PhPhone } from '@phosphor-icons/vue'
import { DESTINATION_SLUGS, destinationCopy, type DestinationSlug } from '~/content/destinations'

/*
 * One component behind all three destination pages.
 *
 * They share a shape because they answer the same shape of question — where is
 * it, how far, which car, what do I need before I go — and three hand-built
 * pages would drift apart on the details that matter (the distances, the
 * deposit, the cross-border wording) the first time one of them was edited.
 *
 * What is NOT shared is the prose: every section body in ~/content/destinations
 * is written for its own page. The template here places content, it does not
 * generate it, so none of these pages is a fill-in-the-blank of another.
 */
const props = defineProps<{ slug: DestinationSlug }>()

const { t, locale, business, localeRoute } = useI18n()

useScrollReveal()

const copy = computed(() => destinationCopy(props.slug, locale.value))

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: copy.value.breadcrumb, path: `/${props.slug}` },
])

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: `/${props.slug}`,
  image: copy.value.image,
  imageAlt: copy.value.imageAlt,
}))

jsonLd(
  breadcrumbSchema(trail.value),
  faqSchema(copy.value.faq),
)

/* Sanity net: a slug typo would otherwise render the Bosnian fallback silently. */
if (import.meta.dev && !DESTINATION_SLUGS.includes(props.slug)) {
  console.warn(`[LandingDestinationPage] unknown slug: ${props.slug}`)
}
</script>

<template>
  <div>
    <LandingHeader />

    <main id="sadrzaj">
      <!-- Header ---------------------------------------------------------- -->
      <section class="reveal-onload relative overflow-hidden">
        <div class="absolute inset-0" aria-hidden="true">
          <img
            :src="copy.image"
            alt=""
            class="h-full w-full object-cover opacity-40"
            width="1440"
            height="900"
            decoding="async"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/70" />
        </div>

        <div class="shell relative pb-16 pt-28 md:pb-20 lg:pt-36">
          <LandingBreadcrumb :trail="trail" />

          <h1 class="h-display reveal mt-6 max-w-4xl" style="--reveal-delay: 60ms">
            {{ copy.h1 }}
          </h1>
          <p class="body-lg reveal mt-5 max-w-[56ch]" style="--reveal-delay: 120ms">
            {{ copy.intro }}
          </p>

          <div
            class="reveal mt-9 flex flex-col gap-3 sm:flex-row"
            style="--reveal-delay: 180ms"
          >
            <LandingButton :href="business.phoneHref" size="lg">
              <PhPhone :size="19" weight="fill" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </LandingButton>
            <LandingButton :to="localeRoute('/vozila')" variant="ghost" size="lg">
              {{ t.nav.fleet }}
            </LandingButton>
          </div>
        </div>
      </section>

      <!-- Distances ------------------------------------------------------- -->
      <section class="reveal-group border-y border-ink-700 bg-ink-950">
        <div class="shell">
          <dl class="grid grid-cols-2 divide-ink-700 md:grid-cols-4 md:divide-x">
            <div
              v-for="(fact, i) in copy.facts"
              :key="fact.label"
              class="reveal px-2 py-6 text-center md:px-6 md:py-8"
              :style="`--reveal-delay: ${i * 50}ms`"
            >
              <dt class="text-[0.75rem] text-mist-500">
                {{ fact.label }}
              </dt>
              <dd class="mt-1.5 font-display text-lg font-semibold text-lime-400 md:text-xl">
                {{ fact.value }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- Body ------------------------------------------------------------ -->
      <section class="reveal-group section-y">
        <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <article
              v-for="(section, i) in copy.sections"
              :key="section.title"
              class="reveal"
              :class="i > 0 ? 'mt-12 border-t border-ink-700 pt-12' : ''"
              :style="`--reveal-delay: ${i * 60}ms`"
            >
              <h2 class="h-section text-[1.75rem] md:text-3xl">
                {{ section.title }}
              </h2>
              <p
                v-for="para in section.body"
                :key="para"
                class="body-lg mt-4 max-w-[62ch]"
              >
                {{ para }}
              </p>
            </article>
          </div>

          <!-- Sticky CTA rail -->
          <aside class="lg:col-span-5">
            <div class="surface reveal sticky top-24 p-6 md:p-7" style="--reveal-delay: 120ms">
              <h2 class="h-card">
                {{ copy.cta.title }}
              </h2>
              <p class="body-base mt-2.5">
                {{ copy.cta.body }}
              </p>

              <div class="mt-6 flex flex-col gap-3">
                <LandingButton :href="business.phoneHref" block size="lg">
                  <PhPhone :size="18" weight="fill" aria-hidden="true" />
                  <span dir="ltr">{{ business.phoneDisplay }}</span>
                </LandingButton>
                <LandingButton
                  :href="business.whatsappHref"
                  variant="ghost"
                  block
                  size="lg"
                  external
                >
                  {{ t.whatsappFab }}
                  <PhArrowRight
                    :size="17"
                    weight="bold"
                    aria-hidden="true"
                    class="rtl:-scale-x-100"
                  />
                </LandingButton>
              </div>

              <dl class="mt-7 space-y-3 border-t border-ink-700 pt-6 text-[0.875rem]">
                <div class="flex justify-between gap-4">
                  <dt class="text-mist-500">{{ t.contact.addressTitle }}</dt>
                  <dd class="text-end font-medium text-mist-0">{{ business.addressShort }}</dd>
                </div>
                <div class="flex justify-between gap-4">
                  <dt class="text-mist-500">{{ t.contact.hoursTitle }}</dt>
                  <dd class="text-end font-medium text-mist-0">{{ t.hoursShort }}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <!-- FAQ ------------------------------------------------------------- -->
      <section class="reveal-group section-y bg-ink-900">
        <div class="shell">
          <LandingSectionHeading :title="t.faq.title" />
          <div class="mt-10 max-w-3xl">
            <LandingAccordion :items="copy.faq" />
          </div>
        </div>
      </section>

      <LandingContact />
    </main>

    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
