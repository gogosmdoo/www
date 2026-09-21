<script setup lang="ts">
import { PhCaretDown, PhCheck, PhTranslate } from '@phosphor-icons/vue'

/*
 * Each language is a real link to a real URL, not a button that mutates state.
 * That is the whole point of the locale routing: a crawler follows these and
 * discovers the English, Turkish and Arabic versions of the page it is on.
 */
const { t, localeLinks } = useI18n()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(
  () => localeLinks.value.find(o => o.isCurrent) ?? localeLinks.value[0]!,
)

function onPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) isOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex h-10 items-center gap-1.5 rounded-full border border-ink-700 px-3 text-sm font-medium text-mist-400 transition-colors duration-200 hover:border-lime-400/50 hover:text-mist-0"
      :aria-label="t.nav.langLabel"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="isOpen = !isOpen"
    >
      <PhTranslate :size="17" aria-hidden="true" />
      <span>{{ current.label }}</span>
      <PhCaretDown
        :size="12"
        class="transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <div
      v-show="isOpen"
      role="menu"
      class="absolute end-0 top-12 z-50 min-w-[10rem] overflow-hidden rounded-card border border-ink-700 bg-ink-950 shadow-lift"
    >
      <NuxtLink
        v-for="opt in localeLinks"
        :key="opt.code"
        :to="opt.to"
        role="menuitem"
        :hreflang="opt.code"
        :lang="opt.code"
        :aria-current="opt.isCurrent ? 'true' : undefined"
        class="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition-colors duration-150 hover:bg-ink-900"
        :class="opt.isCurrent ? 'text-lime-400' : 'text-mist-400'"
        @click="isOpen = false"
      >
        <span :dir="opt.dir">{{ opt.name }}</span>
        <PhCheck v-if="opt.isCurrent" :size="14" aria-hidden="true" />
      </NuxtLink>
    </div>
  </div>
</template>
