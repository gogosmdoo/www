/*
 * Analytics.
 *
 * Two things this file is careful about.
 *
 * 1. It never competes with LCP. The provider script is not in the document at
 *    all until the visitor either interacts or the browser goes idle, so the
 *    first paint races nothing. On a phone on airport wifi that is worth more
 *    than the few sessions lost from people who bounce before idle.
 *
 * 2. It is provider-agnostic. Set NUXT_PUBLIC_GA_ID for GA4, or
 *    NUXT_PUBLIC_PLAUSIBLE_DOMAIN for Plausible. Whichever is present wins; if
 *    neither is, every call here is a no-op and nothing is loaded or sent.
 *    Switching later is an environment variable, not a code change.
 *
 * Note on consent: Plausible is cookieless and needs no banner. GA4 sets
 * cookies and, for EU visitors — which is most of this site's foreign traffic —
 * wants a consent banner before it fires. There is no banner on this site yet,
 * so choosing GA4 means adding one.
 */

export type AnalyticsEvent =
  | 'call_click'
  | 'whatsapp_click'
  | 'form_submit'
  | 'vehicle_book_click'
  | 'review_click'
  | 'maps_click'

type Params = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (event: string, options?: { props?: Params }) => void
  }
}

let loaded = false
let loading = false

function injectScript(src: string, attrs: Record<string, string> = {}) {
  const el = document.createElement('script')
  el.src = src
  el.defer = true
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  document.head.appendChild(el)
}

function loadProvider(gaId: string, plausibleDomain: string) {
  if (loaded || loading) return
  loading = true

  if (plausibleDomain) {
    // Cookieless, ~1 KB, no consent banner required.
    window.plausible = window.plausible || ((...args: unknown[]) => {
      ;(window.plausible as unknown as { q?: unknown[] }).q
        = (window.plausible as unknown as { q?: unknown[] }).q || []
      ;(window.plausible as unknown as { q: unknown[] }).q.push(args)
    }) as typeof window.plausible
    injectScript('https://plausible.io/js/script.tagged-events.js', {
      'data-domain': plausibleDomain,
    })
  }
  else if (gaId) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) { window.dataLayer!.push(args) }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { send_page_view: true })
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)
  }

  loaded = true
}

export function useAnalytics() {
  const config = useRuntimeConfig()
  const gaId = String(config.public.gaId || '')
  const plausibleDomain = String(config.public.plausibleDomain || '')
  const enabled = !!(gaId || plausibleDomain)

  function track(event: AnalyticsEvent, params: Params = {}) {
    if (!enabled || !import.meta.client) return
    loadProvider(gaId, plausibleDomain)

    if (plausibleDomain) {
      window.plausible?.(event, { props: params })
      return
    }
    window.gtag?.('event', event, params)
  }

  return { track, enabled }
}

/*
 * Sitewide click tracking by delegation.
 *
 * One listener on the document, classifying links by their href, rather than a
 * tracking prop threaded through twenty components. It covers every phone and
 * WhatsApp link on the site automatically, including ones added later, and it
 * cannot drift out of sync with the markup.
 *
 * Mounted once, from the default layout.
 */
export function useClickTracking() {
  const { track, enabled } = useAnalytics()

  function classify(href: string): { event: AnalyticsEvent, params: Params } | null {
    if (href.startsWith('tel:')) return { event: 'call_click', params: {} }

    if (href.includes('g.page/r/')) return { event: 'review_click', params: {} }

    if (href.includes('google.com/maps')) return { event: 'maps_click', params: {} }

    if (href.includes('wa.me/')) {
      /*
       * Vehicle CTAs carry the model in the prefilled message, so the same
       * link tells us which car was clicked without any extra wiring.
       */
      const text = new URL(href).searchParams.get('text') ?? ''
      const vehicle = text.includes(':') ? text.split(':').pop()!.trim() : ''
      return vehicle
        ? { event: 'vehicle_book_click', params: { vehicle } }
        : { event: 'whatsapp_click', params: {} }
    }

    return null
  }

  function onClick(event: MouseEvent) {
    const anchor = (event.target as HTMLElement | null)?.closest('a')
    const href = anchor?.getAttribute('href')
    if (!href) return

    try {
      const hit = classify(href)
      if (hit) track(hit.event, { ...hit.params, path: window.location.pathname })
    }
    catch {
      // A malformed href is not a reason to break a click.
    }
  }

  onMounted(() => {
    if (!enabled) return
    document.addEventListener('click', onClick, { capture: true, passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('click', onClick, { capture: true })
  })
}

/*
 * Warm the provider up once the page is quiet, so the first real event does not
 * pay the script's download cost. Never before load — that is the whole point.
 */
export function useAnalyticsWarmup() {
  const config = useRuntimeConfig()
  const gaId = String(config.public.gaId || '')
  const plausibleDomain = String(config.public.plausibleDomain || '')

  onMounted(() => {
    if (!gaId && !plausibleDomain) return

    const start = () => loadProvider(gaId, plausibleDomain)

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(start, { timeout: 6000 })
    }
    else {
      setTimeout(start, 4000)
    }
  })
}
