<script setup lang="ts">
import { PhCheck, PhInfo } from '@phosphor-icons/vue'
import { PAGE_COPY } from '~/content/pages'

/*
 * Uslovi. The client has not sent their rental conditions yet.
 *
 * So this page publishes only the terms already confirmed elsewhere on the
 * site — deposit, payment, delivery, the vehicle — and states plainly, in a
 * visible notice rather than a comment, that the rest is still coming. It does
 * not guess at a minimum age, a licence-held period, a cancellation window, a
 * fuel policy or a damage excess. Those are the clauses a customer would be
 * held to, and an invented one is worse than an absent one.
 *
 * When the real conditions arrive they go into PAGE_COPY[locale].terms.sections
 * and the `pending` string is deleted, which removes the notice automatically.
 */
const { locale, business } = useI18n()

useScrollReveal()

const copy = computed(() => PAGE_COPY[locale.value].terms)

useSeo(() => ({
  title: copy.value.metaTitle,
  description: copy.value.metaDescription,
  path: '/uslovi',
}))

jsonLd(
  breadcrumbSchema([
    { name: business.value.name, path: '/' },
    { name: copy.value.title, path: '/uslovi' },
  ]),
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
            { name: copy.title, path: '/uslovi' },
          ]"
        />

        <div class="mt-8 max-w-[62ch]">
          <h1 class="h-display reveal text-mist-0">
            {{ copy.title }}
          </h1>
          <p class="body-lg reveal mt-6" style="--reveal-delay: 80ms">
            {{ copy.lead }}
          </p>
        </div>

        <!-- Honest notice about what is not yet published. -->
        <aside
          v-if="copy.pending"
          class="reveal mt-10 flex max-w-[70ch] gap-4 rounded-card border border-lime-400/25 bg-lime-400/[0.07] p-6"
          style="--reveal-delay: 140ms"
        >
          <PhInfo :size="22" weight="fill" class="mt-0.5 shrink-0 text-lime-400" aria-hidden="true" />
          <p class="text-[0.9375rem] leading-relaxed text-mist-200">
            {{ copy.pending }}
          </p>
        </aside>

        <!-- Confirmed terms -->
        <h2 class="h-section reveal mt-16 text-[1.75rem] md:text-3xl">
          {{ copy.confirmedTitle }}
        </h2>
        <div class="reveal-group mt-10 grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
          <section
            v-for="(section, index) in copy.sections"
            :key="section.title"
            class="reveal"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <h2 class="h-card border-b border-ink-700 pb-3 text-mist-0">
              {{ section.title }}
            </h2>
            <ul class="mt-5 space-y-3.5">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex gap-3"
              >
                <PhCheck
                  :size="16"
                  weight="bold"
                  class="mt-1 shrink-0 text-lime-400"
                  aria-hidden="true"
                />
                <span class="body-base">{{ item }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>

    <LandingFaq />
    <LandingContact />
    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
