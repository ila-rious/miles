import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colorScale, spacing, radii, typography } from './tokens';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function Swatch({ name, shade, hex, twClass }: { name: string; shade: string; hex: string; twClass: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(twClass).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const light = isLight(hex);
  return (
    <div
      onClick={copy}
      title={`Click to copy: ${twClass}`}
      style={{
        background: hex,
        border: hex === '#ffffff' ? '1px solid #e4e3e8' : undefined,
        borderRadius: 6,
        padding: '12px 10px 10px',
        cursor: 'pointer',
        minWidth: 0,
        outline: copied ? '2px solid #413cc3' : undefined,
        outlineOffset: 2,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: light ? '#18171c' : '#ffffff', marginBottom: 2 }}>
        {copied ? '✓ copied' : shade}
      </div>
      <div style={{ fontSize: 10, color: light ? '#5e5e6e' : 'rgba(255,255,255,0.65)', fontFamily: 'monospace', marginBottom: 4 }}>
        {hex}
      </div>
      <div style={{ fontSize: 10, color: light ? '#9191a1' : 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
        {twClass}
      </div>
    </div>
  );
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#9191a1',
  marginBottom: 12,
  marginTop: 32,
};

const GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: 8,
  marginBottom: 4,
};

// ─── Colour palette story ─────────────────────────────────────────────────────

function ColourPalette() {
  const groups = Object.entries(colorScale) as [string, Record<string | number, string>][];
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: '#5e5e6e', marginBottom: 24, maxWidth: 560, lineHeight: 1.6 }}>
        Every colour is available as a Tailwind utility class. Click any swatch to copy its class name.
        Use <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>bg-</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>text-</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>border-</code> prefixes with any token.
      </p>

      {/* White and black first */}
      <div style={LABEL_STYLE}>Base</div>
      <div style={{ ...GRID_STYLE, gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
        <Swatch name="white" shade="white" hex="#ffffff" twClass="bg-white" />
        <Swatch name="black" shade="black" hex="#18171c" twClass="bg-black" />
      </div>

      {groups.map(([name, shades]) => (
        <div key={name}>
          <div style={LABEL_STYLE}>{name}</div>
          <div style={GRID_STYLE}>
            {Object.entries(shades).map(([shade, hex]) => (
              <Swatch
                key={shade}
                name={name}
                shade={shade}
                hex={hex as string}
                twClass={`bg-${name}-${shade}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Spacing story ────────────────────────────────────────────────────────────

function SpacingScale() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (cls: string) => {
    navigator.clipboard.writeText(cls).catch(() => {});
    setCopied(cls);
    setTimeout(() => setCopied(null), 1400);
  };
  const entries = Object.entries(spacing) as [string, string][];
  const utilPairs = [
    { prefix: 'p',  label: 'Padding' },
    { prefix: 'px', label: 'Padding X' },
    { prefix: 'py', label: 'Padding Y' },
    { prefix: 'm',  label: 'Margin' },
    { prefix: 'gap',label: 'Gap' },
  ];
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: '#5e5e6e', marginBottom: 24, maxWidth: 560, lineHeight: 1.6 }}>
        Miles spacing is a 4px-base scale. Click a cell to copy the Tailwind class.
      </p>

      {/* Scale visualisation */}
      <div style={{ marginBottom: 40 }}>
        <div style={LABEL_STYLE}>Scale</div>
        {entries.map(([token, value]) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0', borderBottom: '1px solid #f1f1f3' }}>
            <div style={{ width: 56, fontSize: 12, fontFamily: 'monospace', color: '#5e5e6e', flexShrink: 0 }}>
              {token}
            </div>
            <div style={{ width: 40, fontSize: 12, fontFamily: 'monospace', color: '#9191a1', flexShrink: 0 }}>
              {value}
            </div>
            <div style={{ flex: 1 }}>
              {parseInt(value) > 0 && (
                <div style={{ height: 12, width: value, background: '#413cc3', borderRadius: 2, opacity: 0.5 }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Utility reference */}
      <div style={LABEL_STYLE}>Tailwind utilities — click to copy</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ background: '#f7f7f8' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: '#9191a1', fontWeight: 700, borderBottom: '1px solid #e4e3e8' }}>Token</th>
              {utilPairs.map(u => (
                <th key={u.prefix} style={{ padding: '8px 12px', textAlign: 'left', color: '#9191a1', fontWeight: 700, borderBottom: '1px solid #e4e3e8' }}>{u.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.filter(([t]) => t !== '0').map(([token]) => (
              <tr key={token} style={{ borderBottom: '1px solid #f1f1f3' }}>
                <td style={{ padding: '8px 12px', color: '#5e5e6e' }}>{token}</td>
                {utilPairs.map(({ prefix }) => {
                  const cls = `${prefix}-${token}`;
                  return (
                    <td key={prefix} style={{ padding: '8px 12px' }}>
                      <code
                        onClick={() => copy(cls)}
                        style={{
                          background: copied === cls ? '#f0f0ff' : '#f7f7f8',
                          color: copied === cls ? '#413cc3' : '#18171c',
                          padding: '2px 6px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: copied === cls ? '#413cc3' : '#e4e3e8',
                          display: 'inline-block',
                        }}
                      >
                        {copied === cls ? '✓' : cls}
                      </code>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Border radius story ──────────────────────────────────────────────────────

function BorderRadii() {
  const entries = Object.entries(radii) as [string, string][];
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: '#5e5e6e', marginBottom: 24 }}>
        Use <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-sm</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-lg</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-full</code>.
      </p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {entries.map(([name, value]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 64,
              height: 64,
              background: '#413cc3',
              borderRadius: value,
              opacity: 0.85,
            }} />
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5e5e6e', textAlign: 'center' }}>
              {name === 'sm' ? 'rounded-sm' : name === 'md' ? 'rounded' : `rounded-${name}`}
            </div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#9191a1' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Typography story ─────────────────────────────────────────────────────────

function TypographyScale() {
  const styles = [
    { cls: 'text-display font-extrabold font-display', label: 'text-display / font-extrabold / font-display', value: '32px / 800 / Aeonik', sample: 'Trumpet Design System' },
    { cls: 'text-xl font-bold font-display', label: 'text-xl / font-bold / font-display', value: '24px / 700 / Aeonik', sample: 'Component Library' },
    { cls: 'text-lg font-bold font-display', label: 'text-lg / font-bold / font-display', value: '20px / 700 / Aeonik', sample: 'Tokens & Variables' },
    { cls: 'text-base font-normal font-sans', label: 'text-base / font-normal / font-sans', value: '16px / 400 / Public Sans', sample: 'The quick brown fox jumps over the lazy dog' },
    { cls: 'text-sm font-normal font-sans', label: 'text-sm / font-normal / font-sans', value: '14px / 400 / Public Sans', sample: 'The quick brown fox jumps over the lazy dog' },
    { cls: 'text-caption font-normal font-sans text-gray-500', label: 'text-caption / font-sans / text-gray-500', value: '12px / 400 / Public Sans', sample: 'Supporting text and helper labels' },
  ];

  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      {styles.map(({ cls, label, value, sample }) => (
        <div key={cls} style={{ padding: '20px 0', borderBottom: '1px solid #f1f1f3' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap' }}>
            <code style={{ fontSize: 11, background: '#f0f0ff', color: '#413cc3', padding: '2px 6px', borderRadius: 4 }}>{cls}</code>
            <span style={{ fontSize: 11, color: '#9191a1', fontFamily: 'monospace' }}>{value}</span>
          </div>
          <div style={{ fontSize: 11, color: '#c8c8d0', fontFamily: 'monospace', marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: cls.includes('font-display') ? '"Aeonik", sans-serif' : '"Public Sans", sans-serif', fontSize: cls.includes('display') ? 32 : cls.includes('xl') ? 24 : cls.includes('lg') ? 20 : cls.includes('sm') ? 14 : cls.includes('caption') ? 12 : 16, fontWeight: cls.includes('extrabold') ? 800 : cls.includes('bold') ? 700 : 400, color: cls.includes('gray-500') ? '#9191a1' : '#18171c', letterSpacing: cls.includes('display') ? '-0.03em' : undefined }}>
            {sample}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Tailwind Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'All Miles design tokens as Tailwind utility classes. `tailwind.config.ts` imports `tailwindColors` directly from `tokens.ts` — one source of truth for Figma, React components, and Tailwind classes.',
      },
    },
  },
} satisfies Meta;

export default meta;

export const Colours: StoryObj = {
  name: 'Colours',
  render: () => <ColourPalette />,
};

export const Spacing: StoryObj = {
  name: 'Spacing',
  render: () => <SpacingScale />,
};

export const Radii: StoryObj = {
  name: 'Border radius',
  render: () => <BorderRadii />,
};

export const Typography: StoryObj = {
  name: 'Typography',
  render: () => <TypographyScale />,
};
