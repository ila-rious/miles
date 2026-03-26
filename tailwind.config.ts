import type { Config } from 'tailwindcss';
import { tailwindColors, spacing, radii, typography } from './src/tokens/tokens';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    // Replace Tailwind's default colours entirely with Miles tokens.
    // Every colour in colorScale is now available as a Tailwind class.
    colors: {
      transparent: 'transparent',
      current:     'currentColor',
      ...tailwindColors,
    },

    // Replace Tailwind's default spacing with Miles spacing scale.
    // Produces: p-0, p-2, p-4, p-8, p-12, p-16, p-24, p-32, p-40
    spacing: Object.fromEntries(
      Object.entries(spacing).map(([k, v]) => [k, v])
    ),

    borderRadius: {
      none: '0px',
      sm:   radii.sm,
      DEFAULT: radii.md,
      md:   radii.md,
      lg:   radii.lg,
      full: radii.full,
    },

    fontFamily: {
      sans:    ['"Public Sans"', 'sans-serif'],
      display: ['"Aeonik"', 'sans-serif'],
    },

    fontSize: {
      // Headings — Aeonik
      'h1':      [typography.sizeH1,      { lineHeight: '110%', fontWeight: '600' }],
      'h2':      [typography.sizeH2,      { lineHeight: '120%', fontWeight: '600' }],
      'h3':      [typography.sizeH3,      { lineHeight: '140%', fontWeight: '600' }],
      'h4':      [typography.sizeH4,      { lineHeight: '1.4',  fontWeight: '600' }],
      // Body — Public Sans
      'base':    [typography.sizeBody,    { lineHeight: '140%' }],
      'body-md': [typography.sizeBody,    { lineHeight: '140%', fontWeight: '500' }],
      'body-semi':[typography.sizeBody,   { lineHeight: '140%', fontWeight: '600' }],
      // Small
      'sm':      [typography.sizeSmall,   { lineHeight: '140%' }],
      'sm-semi': [typography.sizeSmall,   { lineHeight: '140%', fontWeight: '600' }],
      // Caption & Overline
      'caption': [typography.sizeCaption, { lineHeight: '125%' }],
      'caption-semi': [typography.sizeCaption, { lineHeight: '125%', fontWeight: '600' }],
      'overline':[typography.sizeOverline,{ lineHeight: '100%', letterSpacing: '0.05em' }],
    },

    fontWeight: {
      normal:    String(typography.weightRegular),
      semibold:  String(typography.weightSemiBold),
      bold:      String(typography.weightBold),
      extrabold: String(typography.weightExtraBold),
    },

    extend: {},
  },
  plugins: [],
};

export default config;
