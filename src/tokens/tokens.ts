// ============================================================
// MILES — Trumpet Design System Tokens
// Source: Figma file 7DND1T1ZUjrPPI3vzAVOpg
//
// Single source of truth for all design tokens.
// tailwind.config.ts imports `tailwindColors` so Figma,
// React components, and Tailwind classes all stay in sync.
// ============================================================

// ─── Raw colour scale ─────────────────────────────────────────────────────────

export const colorScale = {
  gray: {
    50:  '#fbfbfb',
    100: '#f7f7f8',
    150: '#f1f1f3',
    200: '#e4e3e8',
    300: '#c8c8d0',
    400: '#adacb9',
    500: '#9191a1',
    600: '#5e5e6e',
    800: '#474653',
    900: '#18171c',
  },
  purple: {
    50:  '#f2f2fd',
    100: '#f0f0ff',
    200: '#cccaf6',
    300: '#8682d9',
    400: '#413cc3', // PRIMARY
    500: '#2f2aa2', // hover
    600: '#0a0759', // pressed
    700: '#050340',
    800: '#02012a',
  },
  red: {
    100: '#ffebeb',
    200: '#ff8080',
    300: '#d60000',
  },
  green: {
    100: '#ebfff1',
    200: '#41c85a',
    300: '#00852a',
    400: '#00631f',
  },
  yellow: {
    100: '#fef8ec',
    200: '#f5be42',
    300: '#916708',
  },
  cyan: {
    700: '#0036a1',
  },
  seafoam: {
    100: '#e3f7f2',
    200: '#60d2b5',
    300: '#2d9f82',
  },
  violet: {
    100: '#f5ecf9',
    200: '#e0c5ed',
    300: '#cb9ee1',
    400: '#b777d5',
    500: '#983dc3',
    600: '#650a90',
    700: '#32005d',
  },
  fuchsia: {
    100: '#fde8fa',
    200: '#f8b9ef',
    300: '#f174df',
    400: '#e817c9',
    500: '#ce00af',
    600: '#9b007d',
    700: '#69004a',
  },
  orange: {
    100: '#ffede1',
    200: '#fecaa5',
    300: '#fda262',
    400: '#fc7a1e',
    500: '#e26105',
    600: '#af2e00',
    700: '#7d0000',
  },
  teal: {
    100: '#e8f4f5',
    200: '#bbdfe1',
    300: '#77c0c4',
    400: '#49abb0',
    500: '#1c969c',
    600: '#006369',
    700: '#003036',
  },
  blue: {
    100: '#ebf3fd',
    200: '#c4dafa',
    300: '#8ab5f5',
    400: '#639cf1',
    500: '#3c83ee',
    600: '#0950bb',
    700: '#0036a1',
  },
} as const;

// ─── Semantic aliases (used by components) ────────────────────────────────────

export const colors = {
  white: '#ffffff',
  black: colorScale.gray[900],

  g50:  colorScale.gray[50],
  g100: colorScale.gray[100],
  g150: colorScale.gray[150],
  g200: colorScale.gray[200],
  g300: colorScale.gray[300],
  g400: colorScale.gray[400],
  g500: colorScale.gray[500],
  g600: colorScale.gray[600],
  g800: colorScale.gray[800],

  p100:    colorScale.purple[50],
  p200:    colorScale.purple[200],
  p300:    colorScale.purple[300],
  primary: colorScale.purple[400],
  p500:    colorScale.purple[600],
  p600:    colorScale.purple[700],
  p700:    colorScale.purple[800],

  error100:   colorScale.red[100],
  error200:   colorScale.red[200],
  error300:   colorScale.red[300],
  success100: colorScale.green[100],
  success200: colorScale.green[200],
  success300: colorScale.green[300],
  alert100:   colorScale.yellow[100],
  alert200:   colorScale.yellow[200],
  alert300:   colorScale.yellow[300],

  green500: colorScale.green[300],
  green600: colorScale.green[400],
  cyan700:  colorScale.cyan[700],
} as const;

// ─── Tailwind colour map ──────────────────────────────────────────────────────
// tailwind.config.ts imports this — keeps one source of truth for all classes.

export const tailwindColors = {
  white:   '#ffffff',
  black:   colorScale.gray[900],
  gray:    colorScale.gray,
  purple:  colorScale.purple,
  red:     colorScale.red,
  green:   colorScale.green,
  yellow:  colorScale.yellow,
  cyan:    colorScale.cyan,
  seafoam: colorScale.seafoam,
  violet:  colorScale.violet,
  fuchsia: colorScale.fuchsia,
  orange:  colorScale.orange,
  teal:    colorScale.teal,
  blue:    colorScale.blue,
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  0:  '0px',
  2:  '2px',
  4:  '4px',
  8:  '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  40: '40px',
} as const;

// ─── Border radii ─────────────────────────────────────────────────────────────

export const radii = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  full: '32px',
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontBody:    '"Public Sans", sans-serif',
  fontDisplay: '"Aeonik", sans-serif',

  sizeCaption: '12px',
  sizeSmall:   '14px',
  sizeBody:    '16px',
  sizeHeading: '20px',
  sizeTitle:   '24px',
  sizeDisplay: '32px',

  weightRegular:   400,
  weightSemiBold:  600,
  weightBold:      700,
  weightExtraBold: 800,

  lineHeight: 1.4,
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorToken   = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiiToken   = keyof typeof radii;
