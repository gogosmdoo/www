<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="pitanja" class="reveal-group section-y bg-ink-950">
    <div class="shell">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <LandingSectionHeading :title="t.faq.title" :intro="t.faq.intro" />
        </div>

        <div class="reveal lg:col-span-7 lg:col-start-6">
          <LandingAccordion :items="t.faq.items" />
        </div>
      </div>
    </div>
  </section>
</template>
