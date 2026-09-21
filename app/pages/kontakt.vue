<script setup lang="ts">
import { PhMapPin, PhNavigationArrow } from '@phosphor-icons/vue'
import { PAGE_COPY } from '~/content/pages'

/*
 * Kontakt. The page is mostly LandingContact, which already holds the form and
 * the call / WhatsApp channels; what it adds is the thing a visitor comes to a
 * contact page for and cannot get from a form — where the office actually is,
 * and how far that is from the terminal they are standing in.
 *
 * The map is a plain link to the verified Google listing rather than an
 * embedded iframe: an embed loads Google's cookies on every visit, which would
 * oblige a consent banner this site does not have.
 */
const { t, locale, business } = useI18n()

useScrollReveal()

const copy = computed(() => PAGE_COPY[locale.value].contact)

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: '/kontakt',
}))

jsonLd(
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: copy.value.title, path: '/kontakt' },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: copy.value.title,
    description: copy.value.metaDescription,
    url: absoluteUrl('/kontakt'),
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
            { name: copy.title, path: '/kontakt' },
          ]"
        />

        <div class="mt-8 max-w-[56ch]">
          <h1 class="h-display reveal text-mist-0">
            {{ copy.title }}
          </h1>
          <p class="body-lg reveal mt-6" style="--reveal-delay: 80ms">
            {{ copy.lead }}
          </p>
        </div>

        <div class="reveal-group mt-14 grid gap-5 md:grid-cols-2">
          <!-- Where we are -->
          <a
            :href="business.googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="surface surface-hover reveal group flex flex-col justify-between p-7"
          >
            <div>
              <PhMapPin :size="30" weight="thin" class="text-lime-400" aria-hidden="true" />
              <h2 class="h-card mt-5 text-mist-0">
                {{ copy.mapTitle }}
              </h2>
              <p class="body-base mt-3">
                {{ business.addressShort }}
              </p>
            </div>
            <span class="mt-6 text-sm font-semibold text-lime-400">
              {{ t.locations.mapsLink }}
            </span>
          </a>

          <!-- Distance from the terminal -->
          <div class="surface reveal p-7" style="--reveal-delay: 90ms">
            <PhNavigationArrow :size="30" weight="thin" class="text-lime-400 rtl:-scale-x-100" aria-hidden="true" />
            <h2 class="h-card mt-5 text-mist-0">
              {{ copy.directionsTitle }}
            </h2>
            <p class="body-base mt-3">
              {{ copy.directionsBody }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <LandingContact />
    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
