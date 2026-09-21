<script setup lang="ts">
import { PhFacebookLogo, PhInstagramLogo, PhPhone } from '@phosphor-icons/vue'

/*
 * On a dark site the footer cannot close the page by going darker, so it does
 * it by going one step lighter (ink-900) with a hairline above — the same move
 * the light build made in reverse. The logo needs no special handling here:
 * the near-white lockup is the default everywhere on this site.
 *
 * Social links render only if the client actually has those profiles.
 * business.ts ships Instagram as an empty string until confirmed, and an icon
 * linking to "" navigates to the current page, which is worse than no icon.
 *
 * The aria-labels are the platform names, untranslated. Instagram and Facebook
 * are proper nouns and do not belong in the locale files — an earlier version
 * translated them and that is what broke the footer when the `social` block was
 * removed.
 *
 * The email address is intentionally absent: enquiries go through the phone,
 * WhatsApp or the form.
 */
const { t, locale, business, pageLinks, secondaryLinks } = useI18n()
const year = new Date().getFullYear()

const hasSocial = computed(() =>
  Boolean(business.value.instagramUrl || business.value.facebookUrl),
)

/* The header menu plus the destinations the header does not have room for. */
const footerLinks = computed(() => [
  ...pageLinks.value,
  ...secondaryLinks.value,
  ...(locale.value === 'bs' ? [{ label: t.value.nav.blog, to: '/blog' }] : []),
])
</script>

<template>
  <footer class="reveal-group border-t border-ink-700 bg-ink-900">
    <div class="shell py-14 md:py-16">
      <div class="grid gap-10 md:grid-cols-12">
        <div class="reveal md:col-span-5">
          <LandingLogo size="md" lazy />
          <p class="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-mist-500">
            {{ t.footer.tagline }}
          </p>

          <div v-if="hasSocial" class="mt-6 flex gap-3">
            <a
              v-if="business.instagramUrl"
              :href="business.instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-pill border border-ink-700 text-mist-500 transition-[color,border-color] duration-200 ease-out hover:border-lime-400/60 hover:text-lime-400"
              aria-label="Instagram"
            >
              <PhInstagramLogo :size="20" aria-hidden="true" />
            </a>
            <a
              v-if="business.facebookUrl"
              :href="business.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-pill border border-ink-700 text-mist-500 transition-[color,border-color] duration-200 ease-out hover:border-lime-400/60 hover:text-lime-400"
              aria-label="Facebook"
            >
              <PhFacebookLogo :size="20" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav class="reveal md:col-span-3" :aria-label="t.footer.footerNav">
          <h2 class="text-sm font-semibold text-mist-0">
            {{ t.footer.navigation }}
          </h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-mist-500 transition-colors duration-200 ease-out hover:text-lime-400"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="reveal md:col-span-4">
          <h2 class="text-sm font-semibold text-mist-0">
            {{ t.footer.contact }}
          </h2>
          <address class="mt-4 space-y-3 not-italic">
            <a
              :href="business.phoneHref"
              class="flex items-center gap-2 text-lg font-semibold text-mist-0 transition-colors duration-200 ease-out hover:text-lime-400"
            >
              <PhPhone :size="18" weight="fill" class="text-lime-400" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </a>
            <p class="text-sm text-mist-500">
              {{ business.addressShort }}
            </p>
            <p class="text-sm text-mist-400">
              {{ business.hours }}
            </p>
          </address>

          <div class="mt-6">
            <LandingGoogleBadge size="md" on-plate />
          </div>
        </div>
      </div>

      <!--
        The "no airport" line, restated quietly at the bottom. It is the single
        most load-bearing fact about this business's logistics, and a visitor
        who scrolled past it in the hero should not have to go back up for it.
      -->
      <div class="reveal mt-12 border-t border-ink-700 pt-7">
        <p class="max-w-[70ch] text-sm text-mist-500">
          {{ t.footer.note }}
        </p>
        <p class="mt-4 text-sm text-mist-600">
          &copy; {{ year }} {{ business.name }} · {{ business.legalName }}. {{ t.footer.rights }}
        </p>
      </div>
    </div>
  </footer>
</template>
