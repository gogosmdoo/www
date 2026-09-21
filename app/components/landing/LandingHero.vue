<script setup lang="ts">
import { PhArrowRight, PhCheck, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'
import { FLEET_CARS, HERO_IMAGE, whatsappHref } from '~/data/business'

/*
 * Full-bleed hero photograph with the enquiry bar straddling its bottom edge.
 *
 * Why this shape rather than the usual copy-left / form-right split. The
 * photograph is the argument: a car on the road above the Una, which is where
 * most of these rentals are actually going. Cutting it to half-width to make
 * room for a form beside it would spend the one asset that says "here" and
 * leave a form floating on a background. So the picture runs the full width,
 * the headline sits in the open left third the composition already leaves, and
 * the form overlaps the seam — visible above the fold on a laptop, and the
 * first thing under the thumb on a phone.
 *
 * Why it posts to WhatsApp rather than to an inbox. This agency answers on
 * WhatsApp, the client gave no reservations email, and a deep link with the
 * message pre-typed needs no backend, no key and no consent banner. It also
 * degrades correctly: with JS off the fields are still labelled and the phone
 * button beside them still works. The long-form enquiry lower down the page is
 * the one that would go to an inbox once there is one.
 *
 * Five fields, all optional. Asking for dates, headcount and a car up front is
 * what lets the reply come back with a real price instead of a request for
 * more information.
 */
const { t, business } = useI18n()

const form = reactive({
  dates: '',
  people: '',
  pickup: '',
  car: '',
})

/*
 * Built as a computed href rather than a submit handler so the control is a
 * real link: keyboard-activatable, middle-clickable, and working before
 * hydration — none of which is true of a button waiting on JS.
 */
const enquiryHref = computed(() => {
  const lines = [
    t.value.enquiry.intro,
    form.dates && `${t.value.enquiry.dates}: ${form.dates}`,
    form.people && `${t.value.enquiry.people}: ${form.people}`,
    form.pickup && `${t.value.enquiry.pickup}: ${form.pickup}`,
    form.car && `${t.value.enquiry.car}: ${form.car}`,
  ].filter(Boolean)

  return whatsappHref(lines.join('\n'))
})
</script>

<template>
  <section class="reveal-onload relative">
    <!-- Photograph ------------------------------------------------------- -->
    <div class="relative min-h-[34rem] overflow-hidden md:min-h-[38rem] lg:min-h-[44rem]">
      <picture>
        <source media="(max-width: 639px)" :srcset="HERO_IMAGE.portrait">
        <source media="(max-width: 1023px)" srcset="/images/hero/hero-sm.webp">
        <img
          :src="HERO_IMAGE.wide"
          :alt="t.hero.imageAlt"
          class="reveal-lcp absolute inset-0 h-full w-full object-cover object-[64%_center] sm:object-center"
          width="1920"
          height="820"
          fetchpriority="high"
          decoding="async"
        >
      </picture>

      <!--
        Two scrims, not one. The sun in this frame sits low on the left, which
        is exactly where the headline goes, so a single bottom gradient leaves
        white type on a bright sky. The horizontal pass darkens the copy side
        and clears over the car; the vertical one seats the section into the
        page and gives the enquiry bar something to sit against.
      -->
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10 sm:to-transparent"
      />
      <div
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"
      />
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-950/85 to-transparent"
      />

      <!-- Copy ----------------------------------------------------------- -->
      <div class="relative flex min-h-[34rem] items-end md:min-h-[38rem] lg:min-h-[44rem]">
        <div class="shell w-full pb-24 pt-32 md:pb-32 lg:pb-40">
          <div class="max-w-2xl">
            <div class="reveal flex flex-wrap items-center gap-3" style="--reveal-delay: 0ms">
              <LandingGoogleBadge size="md" on-plate />
              <span class="text-[0.8125rem] font-medium text-mist-200">
                {{ t.hero.eyebrow }}
              </span>
            </div>

            <h1 class="h-display reveal mt-6" style="--reveal-delay: 60ms">
              {{ t.hero.titleLead }}
              <span class="block text-lime-400">{{ t.hero.titleAccent }}</span>
            </h1>

            <p class="body-lg reveal mt-5 max-w-[46ch] text-mist-200" style="--reveal-delay: 120ms">
              {{ t.hero.subtitle }}
            </p>

            <!--
              The phone number is the primary action and it is rendered as
              readable text, not just an icon: the brief asks for it to be
              prominent, and a visible number is the thing a traveller
              screenshots before they lose signal.
            -->
            <div
              class="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style="--reveal-delay: 180ms"
            >
              <LandingButton :href="business.phoneHref" size="lg">
                <PhPhone :size="19" weight="fill" aria-hidden="true" />
                <span dir="ltr">{{ business.phoneDisplay }}</span>
              </LandingButton>

              <LandingButton
                :href="business.whatsappHref"
                variant="ghost"
                size="lg"
                external
              >
                <PhWhatsappLogo :size="19" weight="fill" aria-hidden="true" />
                {{ t.whatsappFab }}
              </LandingButton>
            </div>

            <ul
              class="reveal mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6"
              style="--reveal-delay: 240ms"
            >
              <li
                v-for="line in t.hero.proof"
                :key="line"
                class="flex items-start gap-2 text-[0.875rem] text-mist-200"
              >
                <PhCheck
                  :size="16"
                  weight="bold"
                  class="mt-0.5 shrink-0 text-lime-400"
                  aria-hidden="true"
                />
                {{ line }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Enquiry bar ------------------------------------------------------- -->
    <!--
      Pulled up over the seam. Negative margin rather than absolute positioning
      so the bar still occupies layout height and the section below it cannot
      slide underneath at an unexpected width.
    -->
    <div class="shell relative -mt-16 pb-4 md:-mt-14">
      <form
        class="surface reveal-scale p-5 shadow-lift sm:p-6"
        style="--reveal-delay: 300ms"
        @submit.prevent
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 class="h-card">
            {{ t.enquiry.title }}
          </h2>
          <p class="text-[0.8125rem] text-mist-500">
            {{ t.enquiry.note }}
          </p>
        </div>

        <!--
          Five controls on one row at desktop, stacked on a phone. The submit
          is a grid cell like the rest so it lines up with the fields rather
          than hanging below them.
        -->
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-9">
          <label class="block lg:col-span-2">
            <span class="field-label">{{ t.enquiry.dates }}</span>
            <input
              v-model.trim="form.dates"
              type="text"
              name="dates"
              :placeholder="t.enquiry.datesPlaceholder"
              class="field"
            >
          </label>

          <label class="block lg:col-span-2">
            <span class="field-label">{{ t.enquiry.pickup }}</span>
            <input
              v-model.trim="form.pickup"
              type="text"
              name="pickup"
              :placeholder="t.enquiry.pickupPlaceholder"
              class="field"
            >
          </label>

          <label class="block lg:col-span-1">
            <span class="field-label">{{ t.enquiry.people }}</span>
            <input
              v-model.trim="form.people"
              type="text"
              inputmode="numeric"
              name="people"
              :placeholder="t.enquiry.peoplePlaceholder"
              class="field"
            >
          </label>

          <label class="block sm:col-span-2 lg:col-span-2">
            <span class="field-label">{{ t.enquiry.car }}</span>
            <select v-model="form.car" name="car" class="field">
              <option value="">{{ t.enquiry.carAny }}</option>
              <option v-for="car in FLEET_CARS" :key="car.id" :value="car.name">
                {{ car.name }}
              </option>
            </select>
          </label>

          <div class="flex items-end sm:col-span-2 lg:col-span-2">
            <LandingButton :href="enquiryHref" size="lg" block external>
              {{ t.enquiry.submit }}
              <PhArrowRight
                :size="18"
                weight="bold"
                aria-hidden="true"
                class="rtl:-scale-x-100"
              />
            </LandingButton>
          </div>
        </div>

        <p class="mt-4 text-[0.75rem] text-mist-500">
          {{ t.enquiry.reassure }}
        </p>
      </form>
    </div>
  </section>
</template>
