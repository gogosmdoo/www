<script setup lang="ts">
import { BUSINESS } from '~/data/business'
import { LOCALES } from '~/i18n/routing'

/*
 * Section order follows the buying decision, not a template:
 * promise + the enquiry bar -> proof in numbers -> the three objections that
 * stop a booking -> other people's proof -> how it works -> the product ->
 * the one real choice -> where the car reaches you -> differentiators ->
 * remaining questions -> research -> book.
 *
 * Benefits and reviews sit high on purpose. "No credit card", a 400 KM deposit
 * and "we drive it to you" are risk answers, and a risk answer is worth nothing
 * in a footer — it has to arrive at the moment the doubt does.
 *
 * LandingLocations sits after the fleet rather than before it because it is the
 * section the geography carries, and geography only matters once the visitor
 * has decided they want one of these cars.
 *
 * Layout families used, each at most once: full-bleed hero with an overlapping
 * enquiry bar, divided stat row, hairline icon triptych, offset review columns,
 * tabbed stages, filtered rail, overlaid choice pair, bento, hairline
 * two-column list, accordion, article cards, form split.
 *
 * Eyebrow budget: 12 sections, so ceil(12/3) = 4 allowed. Used 4 (fleet, steps,
 * why, blog). Every other section leads with its headline.
 */
const { t } = useI18n()

useScrollReveal()

useSeo(() => ({
  title: t.value.meta.title,
  description: t.value.meta.description,
  path: '/',
  imageAlt: t.value.meta.ogImageAlt,
}))

jsonLd(
  autoRentalSchema(t.value.meta.description),
  fleetSchema(id => t.value.fleet.categories[id] ?? id),
  faqSchema(t.value.faq.items),
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: absoluteUrl('/'),
    inLanguage: [...LOCALES],
    publisher: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
  },
)
</script>

<template>
  <div>
    <a
      href="#sadrzaj"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-950"
    >
      {{ t.skipToContent }}
    </a>

    <LandingHeader />

    <main id="sadrzaj">
      <LandingHero />
      <LandingFacts />
      <LandingBenefits />
      <LandingReviews />
      <LandingSteps />
      <LandingFleet />
      <LandingDriver />
      <LandingLocations />
      <LandingWhy />
      <LandingFaq />
      <LandingBlogTeaser />
      <LandingContact />
    </main>

    <LandingFooter />
    <LandingWhatsapp />
  </div>
</template>
