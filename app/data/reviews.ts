/*
 * Real Google reviews for Rent a Car Gogo.
 *
 * Every entry below is a genuine public review supplied by the client. Three
 * rules govern this file:
 *
 * 1. Nothing is edited. Not the spelling, not the missing space after a comma,
 *    not the capitalisation. These are the customers' own words and a tidied-up
 *    quote is a fabricated one.
 *
 * 2. Nothing is translated by us. A review written in Bosnian renders in
 *    Bosnian in all four locales. A "translated" testimonial is a testimonial
 *    the customer never gave.
 *
 *    Two entries are the exception and they are marked `translated: true`: the
 *    client supplied only Google's own English rendering of them, not the
 *    Bosnian original. The UI labels those so nobody reads a machine
 *    translation as the reviewer's own phrasing.
 *    TODO(client): paste the Bosnian originals and drop the flag.
 *
 * 3. These are deliberately NOT emitted as Review / AggregateRating JSON-LD.
 *    Google's structured data policy disallows marking up reviews collected
 *    from another platform as your own first-party ratings, and doing it risks
 *    a manual action against the whole domain. They are displayed, attributed
 *    and linked — which is allowed, and which is what actually persuades.
 *
 * TODO(client): per-review permalinks. The client sent the review text but not
 * the individual share links, so `href` is null on every entry and the UI falls
 * back to the listing. Each review has a "Share" option on Google that produces
 * a maps.app.goo.gl link; pasting those in makes each quote independently
 * checkable, which is most of why quoting them works at all.
 */

export interface GoogleReview {
  /* Display name exactly as it appears on Google. */
  author: string
  rating: 5
  /* The review body, verbatim. */
  body: string
  /* BCP 47 tag for the body, so the markup can carry a correct `lang`. */
  lang: 'bs' | 'en'
  /* True when the text we hold is Google's translation, not the original. */
  translated?: boolean
  /* Google labels prolific reviewers; it makes a review read as less anonymous. */
  localGuide?: boolean
  /* Permalink to the review. Null falls back to the listing. */
  href: string | null
  /*
   * Which trust objection this review answers, so the UI can place it beside
   * the section that raises it rather than dumping them all in a carousel.
   */
  theme: 'service' | 'repeat' | 'trust' | 'price'
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'SPD Krošnja',
    rating: 5,
    body:
      'Bilo kuda Gogo svuda,rent a car za poželjeti i svaka preporuka za veoma '
      + 'ljubazno osoblje i susretljivost profesionalna.',
    lang: 'bs',
    localGuide: true,
    href: null,
    theme: 'service',
  },
  {
    author: 'Edwin Delić',
    rating: 5,
    body:
      'Very kind and warm people, looking to help in any way shape or form. Take '
      + 'your business to them, you will not regret it! They are my go to people '
      + 'when visiting north-west Bosnia',
    lang: 'en',
    href: null,
    theme: 'repeat',
  },
  {
    author: 'Emir Dizdaric',
    rating: 5,
    body: '100% profesionalno i susretljivo\nPreporučujem svima',
    lang: 'bs',
    href: null,
    theme: 'trust',
  },
  {
    author: 'Asim Emrić',
    rating: 5,
    body: 'Najbolja usluga u gradu, sve pohvale',
    lang: 'bs',
    href: null,
    theme: 'service',
  },
  {
    author: 'A L',
    rating: 5,
    body: 'The best service, very fair and correct business.',
    lang: 'en',
    translated: true,
    href: null,
    theme: 'price',
  },
  {
    author: 'Hasan Ponjevic',
    rating: 5,
    body: 'Very satisfied with the service they offer',
    lang: 'en',
    translated: true,
    href: null,
    theme: 'trust',
  },
]

/*
 * The headline rating as shown on the Google Business Profile.
 *
 * `count` stays nullable: set it back to null and the UI drops the "based on N
 * reviews" line rather than printing a zero.
 *
 * TODO(client): confirm the count. The client's own paste shows ten reviewers
 * (six with text, four rating-only), while the bihacdanas.ba directory listed
 * eight at the time it was compiled. Ten is what we can see, so ten is what is
 * printed — but a number that lags the real one is exactly the detail a visitor
 * checks, and being under is as bad as being over. Keep this in step with the
 * profile.
 */
export const GOOGLE_RATING = {
  score: 5.0,
  count: 10 as number | null,
} as const

/* Google's brand palette, for the review badge. Used nowhere else on the site. */
export const GOOGLE_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
  /* The star fill Google itself uses in review UI — not the logo yellow. */
  star: '#E7711B',
} as const

export function reviewsByTheme(theme: GoogleReview['theme']) {
  return GOOGLE_REVIEWS.filter(review => review.theme === theme)
}
