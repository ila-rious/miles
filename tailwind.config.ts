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
      caption: [typography.sizeCaption, { lineHeight: '1.4' }],
      sm:      [typography.sizeSmall,   { lineHeight: '1.4' }],
      base:    [typography.sizeBody,    { lineHeight: '1.5' }],
      lg:      [typography.sizeHeading, { lineHeight: '1.4' }],
      xl:      [typography.sizeTitle,   { lineHeight: '1.3' }],
      display: [typography.sizeDisplay, { lineHeight: '1.2', letterSpacing: '-0.03em' }],
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
