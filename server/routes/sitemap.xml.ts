import { BLOG_POSTS } from '../../app/data/blog'
import { FLEET_CARS } from '../../app/data/business'
import { DESTINATION_SLUGS } from '../../app/content/destinations'
import { PRICING_COMPLETE } from '../../app/data/pricing'
import { DEFAULT_LOCALE, localePath, localesForPath } from '../../app/i18n/routing'

/*
 * Generated at prerender time so it can never drift from the routes that
 * actually exist.
 *
 * Every language variant gets its own <url> entry, and each entry carries the
 * full set of xhtml:link alternates — including a self-reference, which the
 * spec requires. Pages published in one language only (the Bosnian guides)
 * carry no alternates at all rather than pointing at URLs that do not exist.
 */

interface SitemapEntry {
  base: string
  lastmod: string
  changefreq: string
  priority: string
}

const today = () => new Date().toISOString().slice(0, 10)

export default defineEventHandler((event) => {
  const origin = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  const now = today()

  const entries: SitemapEntry[] = [
    { base: '/', lastmod: now, changefreq: 'weekly', priority: '1.0' },
    /*
     * The airport-delivery page ranks second only to the home page in intent —
     * it is the one that answers "Bihac has no airport, so how do I get a
     * car?" — so it carries a matching priority. The other two destination
     * pages follow at 0.7 below.
     */
    { base: '/dostava-vozila-aerodrom', lastmod: now, changefreq: 'monthly', priority: '0.9' },
    /*
     * Prices stays out of the sitemap until the rate table holds real numbers.
     * It is noindex until then, and a sitemap entry for a noindex URL is a
     * contradictory signal that Search Console reports as an error.
     */
    ...(PRICING_COMPLETE
      ? [{ base: '/cijene', lastmod: now, changefreq: 'monthly', priority: '0.9' }]
      : []),
    { base: '/najam-sa-vozacem', lastmod: now, changefreq: 'monthly', priority: '0.8' },
    /*
     * The three pages from the client's own menu. Contact carries a higher
     * priority than About because it is a conversion page; Terms is listed but
     * low, since it is a page people arrive at from the site rather than from
     * search.
     */
    { base: '/kontakt', lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { base: '/o-nama', lastmod: now, changefreq: 'yearly', priority: '0.6' },
    { base: '/uslovi', lastmod: now, changefreq: 'monthly', priority: '0.5' },
    ...DESTINATION_SLUGS
      .filter(slug => slug !== 'dostava-vozila-aerodrom')
      .map(slug => ({
        base: `/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: '0.7',
      })),
    { base: '/vozila', lastmod: now, changefreq: 'monthly', priority: '0.8' },
    ...FLEET_CARS.map(car => ({
      base: `/vozila/${car.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    { base: '/blog', lastmod: now, changefreq: 'monthly', priority: '0.6' },
    ...BLOG_POSTS.map(post => ({
      base: `/blog/${post.slug}`,
      lastmod: post.updated,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const urls = entries.flatMap((entry) => {
    const published = localesForPath(entry.base)

    const alternates = published.length > 1
      ? [
          ...published.map(code =>
            `    <xhtml:link rel="alternate" hreflang="${code}" href="${origin}${localePath(entry.base, code)}"/>`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localePath(entry.base, DEFAULT_LOCALE)}"/>`,
        ].join('\n')
      : ''

    return published.map(code => `  <url>
    <loc>${origin}${localePath(entry.base, code)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternates ? `\n${alternates}` : ''}
  </url>`)
  })

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
