<script setup lang="ts">
import { PhCreditCard, PhTruck, PhWallet } from '@phosphor-icons/vue'

/*
 * The three objections that actually stop a booking: what delivery costs,
 * how big the deposit is, and whether a credit card is required.
 *
 * Placed immediately under the hero on purpose. These are risk answers, and a
 * risk answer is worthless in a footer — it has to arrive at the moment the
 * doubt does, which is right after the offer.
 *
 * Layout family: vertical hairline rules with an oversized outline icon. Used
 * once on the page. The rule is drawn with a border rather than a divider
 * element so it collapses cleanly when the columns stack on mobile.
 */
const { t } = useI18n()

/*
 * Positional, matching the order of t.benefits.items: no credit card, the
 * deposit, then delivery. The card objection leads because it is the one that
 * disqualifies a customer outright rather than merely costing them money.
 */
const ICONS = [PhCreditCard, PhWallet, PhTruck] as const
</script>

<template>
  <section class="section-y bg-ink-950">
    <div class="shell reveal-group">
      <h2 class="h-section reveal max-w-[24ch]">
        {{ t.benefits.title }}
      </h2>
      <p class="body-lg reveal mt-5 max-w-[58ch]" style="--reveal-delay: 60ms">
        {{ t.benefits.intro }}
      </p>

      <dl class="mt-12 grid gap-px overflow-hidden rounded-card bg-ink-700 md:grid-cols-3">
        <div
          v-for="(item, index) in t.benefits.items"
          :key="item.title"
          class="reveal group bg-ink-950 p-7 transition-colors duration-300 ease-out hover:bg-ink-900 lg:p-9"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <component
            :is="ICONS[index]"
            :size="34"
            weight="thin"
            aria-hidden="true"
            class="text-lime-400 transition-transform duration-500 ease-out group-hover:-translate-y-1"
          />

          <dt class="h-card mt-6 text-mist-0">
            {{ item.title }}
          </dt>

          <dd class="body-base mt-3">
            {{ item.body }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
