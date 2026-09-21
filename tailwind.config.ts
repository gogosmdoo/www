import type { Config } from 'tailwindcss'

/*
 * Rent a Car Gogo design tokens.
 *
 * The logo is a glossy black car silhouette with a lime-green GO GO wordmark,
 * so the page is built the way the mark is: a near-black ground with one
 * saturated green doing all the pointing. Sections move only within the `ink`
 * ladder; `lime` is reserved for the action that matters (call / WhatsApp /
 * send the enquiry) and for the single accent word in a headline. Spending it
 * anywhere else is what turns an accent into a background.
 *
 * Two greens, not one. #8ba937 is the literal wordmark colour and it is the
 * one used on white — in the footer-light lockup and on print-adjacent
 * surfaces. On the ink floor it sits at about 4.2:1, which is under the bar for
 * body-sized text, so everything on dark uses lime-400 (#a3c93f) instead, at
 * roughly 10:1. Never swap them.
 *
 * Radius scale is locked: `rounded-card` (1rem) for surfaces, `rounded-pill`
 * for interactive pills. Nothing else.
 */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/data/**/*.{js,ts}',
    './app/content/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        /*
         * The accent. 400 is the button fill and always carries ink-950 text,
         * never white — lime on white fails contrast at every usable weight.
         */
        lime: {
          50: '#f5faea',
          100: '#e9f4d0',
          200: '#d3e9a4',
          300: '#bcdd73',
          400: '#a3c93f', // primary accent, on ink
          500: '#8ba937', // the literal logo green, on white
          600: '#6e872b',
          700: '#53651f',
        },
        /*
         * Surface ladder, warm-shifted toward green rather than neutral grey:
         * a pure grey next to this lime reads cold and makes the accent look
         * like it was dropped in from another palette.
         */
        ink: {
          950: '#080a06', // page floor
          900: '#0d100a',
          850: '#12160e', // alternating section band
          800: '#181d12', // cards
          750: '#1f2618', // raised / hover
          700: '#2a3220', // borders
          600: '#3b4630', // strong hairline
        },
        /* Type on ink. 400 is body copy at ~9.5:1, 500 muted at ~6.2:1. */
        mist: {
          0: '#fbfcf8', // headlines
          100: '#eef1e8',
          200: '#dde2d4',
          400: '#b0b8a4', // body copy
          500: '#8b9480', // muted
          600: '#6e7765', // decorative only — 4.1:1, never body text
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        // Noto Sans Arabic is scoped by unicode-range, so bs/en/de visitors
        // never download it and ar visitors get a real Arabic face rather than
        // a system fallback.
        sans: ['Instrument Sans', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '1rem',
        pill: '999px',
      },
      maxWidth: {
        shell: '1400px',
      },
      transitionTimingFunction: {
        /*
         * The built-in CSS easings are too weak to read as intentional. These
         * are the three curves the whole site uses: `out` for anything
         * entering or responding to a press, `in-out` for something already on
         * screen that moves, `drawer` for the mobile sheet.
         *
         * There is deliberately no `ease-in` here. It delays the first frame,
         * which is the frame the user is watching hardest.
         */
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        /*
         * On a dark ground a shadow is nearly invisible, so elevation is
         * carried by a light inner hairline at the top edge plus a deep,
         * wide-spread black. The hairline is what actually reads as "raised".
         */
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -18px rgb(0 0 0 / 0.9)',
        lift: '0 1px 0 0 rgb(255 255 255 / 0.07) inset, 0 24px 56px -24px rgb(0 0 0 / 0.95)',
        glow: '0 0 0 1px rgb(163 201 63 / 0.35), 0 16px 44px -20px rgb(163 201 63 / 0.45)',
      },
      keyframes: {
        /* Speed lines, borrowed from the slashes cut through the GO GO mark. */
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(320%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.5' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
      },
      animation: {
        sweep: 'sweep 5.5s cubic-bezier(0.77, 0, 0.175, 1) infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
