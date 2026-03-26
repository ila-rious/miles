import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radii, typography } from './tokens';

// ─── tiny helpers ────────────────────────────────────────────────────────────

const S = {
  page: {
    fontFamily: typography.fontBody,
    color: colors.black,
    padding: '0 0 48px',
  } satisfies React.CSSProperties,
  section: {
    marginBottom: 48,
  } satisfies React.CSSProperties,
  sectionTitle: {
    fontSize: 11,
    fontWeight: typography.weightBold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: colors.g500,
    marginBottom: 16,
  } satisfies React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 2,
  } satisfies React.CSSProperties,
  swatch: (hex: string): React.CSSProperties => ({
    background: hex,
    padding: '14px 14px 12px',
    borderRadius: 4,
    cursor: 'pointer',
  }),
  swatchName: (hex: string): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: typography.weightBold,
    color: isLight(hex) ? colors.black : colors.white,
    marginBottom: 2,
  }),
  swatchHex: (hex: string): React.CSSProperties => ({
    fontSize: 10,
    color: isLight(hex) ? colors.g600 : 'rgba(255,255,255,0.6)',
    fontFamily: 'monospace',
  }),
};

function isLight(hex: string) {
  const c = hex.replace('#', '');
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const GROUPS: { label: string; tokens: [string, string][] }[] = [
  {
    label: 'Neutral',
    tokens: [
      ['White',  colors.white],
      ['G50',    colors.g50],
      ['G100',   colors.g100],
      ['G150',   colors.g150],
      ['G200',   colors.g200],
      ['G300',   colors.g300],
      ['G400',   colors.g400],
      ['G500',   colors.g500],
      ['G600',   colors.g600],
      ['G800',   colors.g800],
      ['Black',  colors.black],
    ],
  },
  {
    label: 'Primary — Brand Purple',
    tokens: [
      ['P100',    colors.p100],
      ['P200',    colors.p200],
      ['P300',    colors.p300],
      ['Primary', colors.primary],
      ['P500',    colors.p500],
      ['P600',    colors.p600],
      ['P700',    colors.p700],
    ],
  },
  {
    label: 'System',
    tokens: [
      ['Error 100',   colors.error100],
      ['Error 200',   colors.error200],
      ['Error 300',   colors.error300],
      ['Success 100', colors.success100],
      ['Success 200', colors.success200],
      ['Success 300', colors.success300],
      ['Alert 100',   colors.alert100],
      ['Alert 200',   colors.alert200],
      ['Alert 300',   colors.alert300],
    ],
  },
  {
    label: 'Green',
    tokens: [
      ['Green 500', colors.green500],
      ['Green 600', colors.green600],
    ],
  },
  {
    label: 'Cyan',
    tokens: [
      ['Cyan 700', colors.cyan700],
    ],
  },
];

// ─── Color palette component ──────────────────────────────────────────────────

function ColorPalette() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={S.page}>
      {GROUPS.map(({ label, tokens }) => (
        <div key={label} style={S.section}>
          <div style={S.sectionTitle}>{label}</div>
          <div style={S.grid}>
            {tokens.map(([name, hex]) => (
              <div
                key={name}
                style={{
                  ...S.swatch(hex),
                  border: hex === '#ffffff' ? `1px solid ${colors.g200}` : undefined,
                  outline: copied === hex ? `2px solid ${colors.primary}` : undefined,
                }}
                title={`Click to copy ${hex}`}
                onClick={() => copy(hex)}
              >
                <div style={S.swatchName(hex)}>
                  {copied === hex ? '✓ Copied' : name}
                </div>
                <div style={S.swatchHex(hex)}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Spacing scale component ──────────────────────────────────────────────────

function SpacingScale() {
  const entries = Object.entries(spacing) as [string, string][];
  return (
    <div style={{ fontFamily: typography.fontBody, color: colors.black, paddingBottom: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map(([token, value]) => (
          <div
            key={token}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: `1px solid ${colors.g150}` }}
          >
            <div style={{ width: 80, fontSize: 12, fontFamily: 'monospace', color: colors.g600 }}>
              space-{token}
            </div>
            <div style={{ width: 48, fontSize: 12, color: colors.g500, fontFamily: 'monospace' }}>
              {value}
            </div>
            <div style={{ flex: 1 }}>
              {parseInt(value) > 0 && (
                <div
                  style={{
                    height: 14,
                    width: value,
                    background: colors.primary,
                    borderRadius: 3,
                    opacity: 0.6,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Typography specimen ──────────────────────────────────────────────────────

function TypographySpecimen() {
  const styles: { label: string; style: React.CSSProperties; sample: string }[] = [
    { label: 'Display — 32px / 800 / Aeonik',   style: { fontFamily: typography.fontDisplay, fontSize: typography.sizeDisplay,  fontWeight: typography.weightExtraBold, letterSpacing: '-0.03em' }, sample: 'Trumpet' },
    { label: 'Title — 24px / 700 / Aeonik',      style: { fontFamily: typography.fontDisplay, fontSize: typography.sizeTitle,    fontWeight: typography.weightBold }, sample: 'Design System' },
    { label: 'Heading — 20px / 700 / Aeonik',    style: { fontFamily: typography.fontDisplay, fontSize: typography.sizeHeading,  fontWeight: typography.weightBold }, sample: 'Component tokens' },
    { label: 'Body — 16px / 400 / Public Sans',  style: { fontFamily: typography.fontBody,    fontSize: typography.sizeBody,     fontWeight: typography.weightRegular }, sample: 'The quick brown fox jumps over the lazy dog' },
    { label: 'Small — 14px / 400 / Public Sans', style: { fontFamily: typography.fontBody,    fontSize: typography.sizeSmall,    fontWeight: typography.weightRegular }, sample: 'The quick brown fox jumps over the lazy dog' },
    { label: 'Caption — 12px / 400 / Public Sans', style: { fontFamily: typography.fontBody,  fontSize: typography.sizeCaption,  fontWeight: typography.weightRegular, color: colors.g500 }, sample: 'Supporting text and helper labels' },
  ];

  return (
    <div style={{ fontFamily: typography.fontBody, color: colors.black, paddingBottom: 48 }}>
      {styles.map(({ label, style, sample }) => (
        <div key={label} style={{ padding: '20px 0', borderBottom: `1px solid ${colors.g150}` }}>
          <div style={{ fontSize: 11, color: colors.g400, fontFamily: 'monospace', marginBottom: 8 }}>{label}</div>
          <div style={style}>{sample}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Meta & stories ──────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

export const Colors: StoryObj = {
  name: 'Color palette',
  render: () => <ColorPalette />,
};

export const Spacing: StoryObj = {
  name: 'Spacing scale',
  render: () => <SpacingScale />,
};

export const Typography: StoryObj = {
  name: 'Typography',
  render: () => <TypographySpecimen />,
};
