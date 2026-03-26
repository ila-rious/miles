import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { textStyles, colorScale, colors, spacing, radii, typography } from './tokens';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function Swatch({ name, shade, hex }: { name: string; shade: string; hex: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(`bg-${name}-${shade}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const light = isLight(hex);
  return (
    <div onClick={copy} title={`Click to copy: bg-${name}-${shade}`} style={{ background: hex, border: hex === '#ffffff' ? `1px solid ${colors.g200}` : undefined, borderRadius: 6, padding: '12px 10px 10px', cursor: 'pointer', outline: copied ? `2px solid ${colors.primary}` : undefined, outlineOffset: 2 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: light ? colors.black : colors.white, marginBottom: 2 }}>{copied ? '✓ copied' : shade}</div>
      <div style={{ fontSize: 10, color: light ? colors.g600 : 'rgba(255,255,255,0.65)', fontFamily: 'monospace', marginBottom: 4 }}>{hex}</div>
      <div style={{ fontSize: 10, color: light ? colors.g400 : 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>bg-{name}-{shade}</div>
    </div>
  );
}

const GRID: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 4 };
const GROUP_LABEL: React.CSSProperties = { fontFamily: '"Public Sans", sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.g400, marginBottom: 12, marginTop: 32 };

// ─── Colour palette ───────────────────────────────────────────────────────────

function ColourPalette() {
  const groups = Object.entries(colorScale) as [string, Record<string | number, string>][];
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: colors.g600, marginBottom: 24, maxWidth: 560, lineHeight: 1.6 }}>
        Every colour is available as a Tailwind class. Click any swatch to copy the class name.
        Use <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>bg-</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>text-</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>border-</code> prefixes.
      </p>
      <div style={GROUP_LABEL}>Base</div>
      <div style={GRID}>
        <Swatch name="white" shade="white" hex="#ffffff" />
        <Swatch name="black" shade="black" hex={colors.black} />
      </div>
      {groups.map(([name, shades]) => (
        <div key={name}>
          <div style={GROUP_LABEL}>{name}</div>
          <div style={GRID}>
            {Object.entries(shades).map(([shade, hex]) => (
              <Swatch key={shade} name={name} shade={shade} hex={hex as string} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Spacing scale ────────────────────────────────────────────────────────────

function SpacingScale() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (cls: string) => { navigator.clipboard.writeText(cls).catch(() => {}); setCopied(cls); setTimeout(() => setCopied(null), 1400); };
  const entries = Object.entries(spacing) as [string, string][];
  const utilPairs = [
    { prefix: 'p', label: 'Padding' },
    { prefix: 'px', label: 'Padding X' },
    { prefix: 'py', label: 'Padding Y' },
    { prefix: 'm', label: 'Margin' },
    { prefix: 'gap', label: 'Gap' },
  ];
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: colors.g600, marginBottom: 24, maxWidth: 560, lineHeight: 1.6 }}>4px-base scale. Click a cell to copy the class.</p>
      <div style={GROUP_LABEL}>Scale</div>
      {entries.map(([token, value]) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0', borderBottom: `1px solid ${colors.g150}` }}>
          <div style={{ width: 56, fontSize: 12, fontFamily: 'monospace', color: colors.g600, flexShrink: 0 }}>{token}</div>
          <div style={{ width: 40, fontSize: 12, fontFamily: 'monospace', color: colors.g400, flexShrink: 0 }}>{value}</div>
          <div style={{ flex: 1 }}>{parseInt(value) > 0 && <div style={{ height: 12, width: value, background: colors.primary, borderRadius: 2, opacity: 0.5 }} />}</div>
        </div>
      ))}
      <div style={{ ...GROUP_LABEL, marginTop: 40 }}>Tailwind utilities — click to copy</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ background: colors.g100 }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: colors.g400, fontWeight: 700, borderBottom: `1px solid ${colors.g200}` }}>Token</th>
              {utilPairs.map(u => <th key={u.prefix} style={{ padding: '8px 12px', textAlign: 'left', color: colors.g400, fontWeight: 700, borderBottom: `1px solid ${colors.g200}` }}>{u.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {entries.filter(([t]) => t !== '0').map(([token]) => (
              <tr key={token} style={{ borderBottom: `1px solid ${colors.g150}` }}>
                <td style={{ padding: '8px 12px', color: colors.g600 }}>{token}</td>
                {utilPairs.map(({ prefix }) => {
                  const cls = `${prefix}-${token}`;
                  return (
                    <td key={prefix} style={{ padding: '8px 12px' }}>
                      <code onClick={() => copy(cls)} style={{ background: copied === cls ? '#f0f0ff' : colors.g100, color: copied === cls ? colors.primary : colors.black, padding: '2px 6px', borderRadius: 4, cursor: 'pointer', border: `1px solid ${copied === cls ? colors.primary : colors.g200}`, display: 'inline-block' }}>
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

// ─── Typography scale ─────────────────────────────────────────────────────────

const SAMPLE = 'Amet minim mollit non deserunt ullamco est sit';
const META_STYLE: React.CSSProperties = { fontFamily: '"Public Sans", sans-serif', fontSize: 12, color: colors.g500 };
const ROW: React.CSSProperties = { display: 'grid', gridTemplateColumns: '140px 80px 100px 80px 110px 80px 1fr', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${colors.g150}`, gap: 8 };

function TypographyScale() {
  const groups: { label: string; rows: { token: string; size: string; lh: string; style: string; font: string; spacing: string; sample?: string }[] }[] = [
    {
      label: 'Headers',
      rows: [
        { token: 'h1', size: '48px', lh: '110%', style: 'Semibold', font: 'Aeonik', spacing: '0%' },
        { token: 'h2', size: '36px', lh: '120%', style: 'Semibold', font: 'Aeonik', spacing: '0%' },
        { token: 'h3', size: '24px', lh: '140%', style: 'Semibold', font: 'Aeonik', spacing: '0%' },
        { token: 'h4', size: '18px', lh: 'Auto',  style: 'Semibold', font: 'Aeonik', spacing: '0%' },
      ],
    },
    {
      label: 'Body',
      rows: [
        { token: 'body',       size: '16px', lh: '140%', style: 'Regular',  font: 'Public Sans', spacing: '0%' },
        { token: 'bodyMedium', size: '16px', lh: '140%', style: 'Medium',   font: 'Public Sans', spacing: '0%' },
        { token: 'bodySemi',   size: '16px', lh: '140%', style: 'Semibold', font: 'Public Sans', spacing: '0%' },
      ],
    },
    {
      label: 'Small',
      rows: [
        { token: 'small',      size: '14px', lh: '140%', style: 'Regular',  font: 'Public Sans', spacing: '0%' },
        { token: 'smallSemi',  size: '14px', lh: '140%', style: 'Semibold', font: 'Public Sans', spacing: '0%' },
        { token: 'smallSemiUp',size: '14px', lh: '140%', style: 'Semibold', font: 'Public Sans', spacing: '0%', sample: 'AMET MINIM MOLLIT NON DESERUNT ULLAMCO' },
      ],
    },
    {
      label: 'Extras',
      rows: [
        { token: 'caption',     size: '12px', lh: '125%', style: 'Regular',  font: 'Public Sans', spacing: '0%' },
        { token: 'captionSemi', size: '12px', lh: '125%', style: 'Semibold', font: 'Public Sans', spacing: '0%' },
        { token: 'overline',    size: '12px', lh: '100%', style: 'Regular',  font: 'Public Sans', spacing: '5%', sample: 'AMET MINIM MOLLIT NON DESERUNT' },
        { token: 'overlineSemi',size: '12px', lh: '100%', style: 'Semibold', font: 'Public Sans', spacing: '5%', sample: 'AMET MINIM MOLLIT NON DESERUNT' },
      ],
    },
  ];

  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      {/* Column headers */}
      <div style={{ ...ROW, fontFamily: '"Public Sans", sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.g400, borderBottom: `1px solid ${colors.g200}`, paddingBottom: 10 }}>
        <span>Token name</span><span>Size</span><span>Line-height</span><span>Style</span><span>Font</span><span>Spacing</span><span>Preview</span>
      </div>

      {groups.map(({ label, rows }) => (
        <div key={label}>
          <div style={{ ...GROUP_LABEL, marginTop: 28 }}>{label}</div>
          {rows.map(row => (
            <div key={row.token} style={ROW}>
              <code style={{ ...META_STYLE, fontFamily: 'monospace', color: colors.g600 }}>{row.token}</code>
              <span style={META_STYLE}>{row.size}</span>
              <span style={META_STYLE}>{row.lh}</span>
              <span style={META_STYLE}>{row.style}</span>
              <span style={META_STYLE}>{row.font}</span>
              <span style={META_STYLE}>{row.spacing}</span>
              <span style={textStyles[row.token as keyof typeof textStyles]}>{row.sample || SAMPLE}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Typefaces */}
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'Display & Titles', sub: 'Aeonik', use: 'Headers — H1 through H4', fontFamily: typography.fontDisplay },
          { label: 'Body & UI', sub: 'Public Sans', use: 'Body, small, captions, labels, all UI text', fontFamily: typography.fontBody },
        ].map(({ label, sub, use, fontFamily }) => (
          <div key={label} style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 14, padding: '28px 32px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.g400, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.primary, marginBottom: 20 }}>{sub}</div>
            <div style={{ fontFamily, fontSize: 52, fontWeight: 600, lineHeight: 1, marginBottom: 16 }}>Aa</div>
            <div style={{ fontSize: 13, color: colors.g500, lineHeight: 1.7 }}>{use}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Border radii ─────────────────────────────────────────────────────────────

function BorderRadii() {
  return (
    <div style={{ fontFamily: '"Public Sans", sans-serif', paddingBottom: 48 }}>
      <p style={{ fontSize: 14, color: colors.g600, marginBottom: 24 }}>
        Use <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-sm</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-lg</code>,{' '}
        <code style={{ background: '#f0f0ff', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>rounded-full</code>.
      </p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {(Object.entries(radii) as [string, string][]).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 64, height: 64, background: colors.primary, borderRadius: value, opacity: 0.85 }} />
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: colors.g600, textAlign: 'center' }}>
              {name === 'sm' ? 'rounded-sm' : name === 'md' ? 'rounded' : `rounded-${name}`}
            </div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: colors.g400 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Meta & stories ───────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

export const Colors: StoryObj = {
  name: 'Color palette',
  render: () => <ColourPalette />,
};

export const Spacing: StoryObj = {
  name: 'Spacing scale',
  render: () => <SpacingScale />,
};

export const Typography: StoryObj = {
  name: 'Typography',
  render: () => <TypographyScale />,
};

export const Radii: StoryObj = {
  name: 'Border radius',
  render: () => <BorderRadii />,
};
