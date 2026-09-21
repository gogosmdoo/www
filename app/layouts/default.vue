<script setup lang="ts">
/*
 * Mounted once for the whole site: one delegated click listener classifies
 * every phone, WhatsApp, review and Maps link, and the provider script is
 * warmed up only after the browser goes idle.
 */
useClickTracking()
useAnalyticsWarmup()
</script>

<template>
  <div class="layout">
    <slot />
  </div>
</template>
