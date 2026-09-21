<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'

/*
 * Visual breadcrumb for subpages. Takes base (Bosnian) paths and renders links
 * for the active locale, so it stays in step with the BreadcrumbList JSON-LD
 * built from the same trail.
 *
 * The last crumb is the current page and is not a link.
 */
defineProps<{ trail: { name: string, path: string }[] }>()

const { localeRoute } = useI18n()
</script>

<template>
  <nav class="reveal" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 font-mono text-xs text-mist-500">
      <li
        v-for="(crumb, index) in trail"
        :key="crumb.path"
        class="flex items-center gap-1.5"
      >
        <NuxtLink
          v-if="index < trail.length - 1"
          :to="localeRoute(crumb.path)"
          class="transition-colors duration-200 hover:text-lime-400"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-else class="text-mist-400" aria-current="page">
          {{ crumb.name }}
        </span>

        <PhCaretRight
          v-if="index < trail.length - 1"
          :size="11"
          class="shrink-0 rtl:rotate-180"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
