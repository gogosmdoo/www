<script setup lang="ts">
import { PhWhatsappLogo } from '@phosphor-icons/vue'

/*
 * Floating WhatsApp button, bottom right (bottom left under RTL, so it never
 * covers the start of a line). The pulse ring is the one perpetual animation on
 * the site and it earns its place: it marks the always-available contact
 * channel. It collapses under prefers-reduced-motion.
 */
const { t, business } = useI18n()
</script>

<template>
  <a
    :href="business.whatsappHref"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lift transition duration-200 ease-out hover:scale-105 active:scale-95 md:bottom-7 md:end-7"
    :aria-label="t.whatsappFab"
  >
    <span
      aria-hidden="true"
      class="animate-pulse-ring absolute inset-0 rounded-full bg-[#25d366]/50"
    />
    <PhWhatsappLogo :size="29" weight="fill" class="relative" aria-hidden="true" />
  </a>
</template>
