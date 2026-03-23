// ============================================================
// MILES — Trumpet Design System Tokens
// Source: Figma file 7DND1T1ZUjrPPI3vzAVOpg
// ============================================================

export const colors = {
  // Neutral
  white:   '#ffffff',
  g50:     '#fbfbfb',
  g100:    '#f7f7f8',
  g150:    '#f1f1f3',
  g200:    '#e4e3e8',
  g300:    '#c8c8d0',
  g400:    '#adacb9',
  g500:    '#9191a1',
  g600:    '#5e5e6e',
  g800:    '#474653',
  black:   '#18171c',

  // Primary (brand purple)
  p100:    '#f2f2fd',
  p200:    '#cccaf6',
  p300:    '#8682d9',
  primary: '#413cc3',
  p500:    '#0a0759',
  p600:    '#050340',
  p700:    '#02012a',

  // System
  error100:   '#ffebeb',
  error200:   '#ff8080',
  error300:   '#d60000',
  success100: '#ebfff1',
  success200: '#41c85a',
  success300: '#00852a',
  alert100:   '#fef8ec',
  alert200:   '#f5be42',
  alert300:   '#916708',

  // Green (toggle variant)
  green500: '#00852a',
  green600: '#00631f',

  // Cyan (toggle hover)
  cyan700:  '#0036a1',
} as const;

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

export const radii = {
  sm: '4px',   // spacing/4 — checkbox, input
  md: '8px',   // spacing/8 — buttons, input wrapper
  full: '32px', // toggle track
} as const;

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

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
