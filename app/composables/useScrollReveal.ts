/*
 * Scroll reveal via IntersectionObserver only.
 *
 * The previous version also ran a `window.addEventListener('scroll')` parallax
 * loop that repainted on every frame. Parallax now lives in CSS
 * (`.parallax-slow` + `animation-timeline: view()`), so no scroll listener and
 * no per-frame JS remain.
 *
 * Contract: put `.reveal-group` on a section, `.reveal` / `.reveal-x` /
 * `.reveal-scale` on its children. Children get a stagger delay by DOM order,
 * overridable per element with `data-reveal-delay="240ms"`.
 */

const CHILD_SELECTOR = '.reveal, .reveal-x, .reveal-scale'
const STAGGER_MS = 80
const MAX_STAGGER_MS = 480

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  function prepare(group: HTMLElement) {
    group.querySelectorAll<HTMLElement>(CHILD_SELECTOR).forEach((child, index) => {
      const override = child.dataset.revealDelay
      child.style.setProperty(
        '--reveal-delay',
        override ?? `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`,
      )
    })
  }

  onMounted(() => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>('.reveal-group'))
    if (!groups.length) return

    // Reduced motion: mark everything visible, never observe.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      groups.forEach(group => group.classList.add('is-in'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    groups.forEach((group) => {
      prepare(group)

      // Anything already on screen at mount reveals immediately, so the hero
      // never waits on a scroll event that may never come.
      const rect = group.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        group.classList.add('is-in')
        return
      }

      observer?.observe(group)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
