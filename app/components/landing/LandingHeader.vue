<script setup lang="ts">
import { PhList, PhPhone, PhX } from '@phosphor-icons/vue'

/*
 * Header height is capped at 72px desktop / 64px mobile.
 *
 * The desktop menu is the five links the brief specifies — Automobili, O nama,
 * Uslovi, Blog, Kontakt — and nothing else, so it cannot wrap to a second row.
 * Services, Airport and Prices live in the footer instead.
 *
 * Two things are pinned here because they are what a traveller comparing three
 * tabs actually looks for: the phone number as readable text, and the Google
 * rating. Both survive to mobile — the rating moves into the sheet and the
 * phone becomes a full-width button there.
 *
 * Unlike the dark original, the bar is transparent over a light hero, so the
 * type is graphite from the first frame and only the background and hairline
 * animate in on scroll. Nothing has to re-colour mid-scroll.
 */
const { t, locale, business, pageLinks, localeRoute } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const sentinel = ref<HTMLElement | null>(null)

/*
 * The condensed-on-scroll state is driven by an IntersectionObserver on a
 * zero-height sentinel rather than a scroll listener, so nothing runs per frame.
 */
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinel.value) return
  observer = new IntersectionObserver(
    ([entry]) => { isScrolled.value = !entry?.isIntersecting },
    { threshold: 0 },
  )
  observer.observe(sentinel.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})

// Never leave the mobile sheet open behind a route change.
watch(() => useRoute().fullPath, () => { isMenuOpen.value = false })

/* Blog is published in Bosnian only, so it joins the menu only in that locale. */
const menuLinks = computed(() => [
  ...pageLinks.value,
  ...(locale.value === 'bs' ? [{ label: t.value.nav.blog, to: '/blog' }] : []),
])
</script>

<template>
  <div>
    <span ref="sentinel" aria-hidden="true" class="absolute top-0 h-px w-full" />

    <header
      class="fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ease-out"
      :class="isScrolled || isMenuOpen
        ? 'border-b border-ink-700 bg-ink-950/85 shadow-card backdrop-blur-md'
        : 'border-b border-transparent'"
    >
      <div class="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <NuxtLink :to="localeRoute('/')" class="shrink-0" :aria-label="business.name">
          <LandingLogo />
        </NuxtLink>

        <nav
          class="hidden items-center gap-7 lg:flex"
          :aria-label="t.nav.mainNav"
        >
          <NuxtLink
            v-for="link in menuLinks"
            :key="link.to"
            :to="link.to"
            class="relative text-sm font-medium text-mist-400 transition-colors duration-200 after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-lime-400 after:transition-[width] after:duration-300 after:ease-out hover:text-mist-0 hover:after:w-full"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <LandingGoogleBadge class="hidden md:inline-flex" />

          <LandingLanguageSwitcher />

          <a
            :href="business.phoneHref"
            class="hidden h-10 items-center gap-2 rounded-pill border border-ink-700 bg-ink-950 px-4 text-sm font-semibold text-mist-0 transition duration-200 ease-out hover:border-lime-400 hover:shadow-card xl:flex"
          >
            <PhPhone :size="16" weight="fill" aria-hidden="true" class="text-lime-400" />
            <span dir="ltr">{{ business.phoneDisplay }}</span>
          </a>

          <LandingButton
            :href="business.phoneHref"
            size="sm"
            class="hidden sm:inline-flex xl:hidden"
          >
            {{ t.nav.book }}
          </LandingButton>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-pill border border-ink-700 text-mist-0 transition-colors duration-200 hover:border-lime-400 lg:hidden"
            :aria-label="isMenuOpen ? t.nav.closeMenu : t.nav.openMenu"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-nav"
            @click="isMenuOpen = !isMenuOpen"
          >
            <PhX v-if="isMenuOpen" :size="20" aria-hidden="true" />
            <PhList v-else :size="20" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        v-show="isMenuOpen"
        id="mobile-nav"
        class="border-t border-ink-700 bg-ink-950 lg:hidden"
        :aria-label="t.nav.mobileNav"
      >
        <div class="shell flex flex-col py-3">
          <NuxtLink
            v-for="link in menuLinks"
            :key="link.to"
            :to="link.to"
            class="border-b border-ink-700 py-3.5 font-medium text-mist-400 transition-colors hover:text-mist-0"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="mt-4 flex justify-center md:hidden">
            <LandingGoogleBadge size="md" />
          </div>

          <LandingButton
            :href="business.phoneHref"
            size="lg"
            block
            class="mt-4"
          >
            <PhPhone :size="18" weight="fill" aria-hidden="true" />
            <span dir="ltr">{{ business.phoneDisplay }}</span>
          </LandingButton>
        </div>
      </nav>
    </header>
  </div>
</template>
