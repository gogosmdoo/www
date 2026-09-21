/*
 * robots.txt is generated rather than served from public/ so the Sitemap line
 * derives from the same siteUrl as every other absolute URL on the site. As a
 * static file it silently kept pointing at a dead domain after the domain
 * changed, which is precisely the drift this move prevents.
 */

const ALLOWED_AGENTS = [
  /* Search */
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'DuckDuckBot',
  'YandexBot',
  /*
   * Answer engines. These increasingly mediate "rent a car Bihac" and "car hire near Plitvice"
   * style questions for travellers, and a blocked crawler here means the
   * business is simply absent from the answer.
   */
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Bingbot-Extended',
  'meta-externalagent',
]

export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')

  const blocks = [
    'User-agent: *\nAllow: /',
    ...ALLOWED_AGENTS.map(agent => `User-agent: ${agent}\nAllow: /`),
  ]

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `${blocks.join('\n\n')}

# A plain-language summary of this business for language models: ${base}/llms.txt

Sitemap: ${base}/sitemap.xml
`
})
