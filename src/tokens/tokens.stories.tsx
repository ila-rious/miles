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

// ════════════════════════════════════════════════════════════════════════════════
// COLOUR GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function DoCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#16a34a', fontFamily: typography.fontBody }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#16a34a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff' }}>✓</span>
        Do
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && <div style={{ padding: '8px 14px', fontSize: 11, color: colors.g500, borderTop: `1px solid ${colors.g150}`, fontFamily: typography.fontBody }}>{note}</div>}
    </div>
  );
}

function DontCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: '#fff1f2', borderBottom: '1px solid #fecdd3', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#dc2626', fontFamily: typography.fontBody }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff' }}>✕</span>
        {"Don't"}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && <div style={{ padding: '8px 14px', fontSize: 11, color: colors.g500, borderTop: `1px solid ${colors.g150}`, fontFamily: typography.fontBody }}>{note}</div>}
    </div>
  );
}

function Btn({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'ghost' | 'warning' | 'extra' }) {
  const s: Record<string, React.CSSProperties> = {
    primary: { background: colors.primary, color: '#fff', border: 'none' },
    ghost:   { background: 'transparent', color: colors.primary, border: `1.5px solid ${colors.primary}` },
    warning: { background: colors.alert200, color: colors.black, border: 'none' },
    extra:   { background: '#983dc3', color: '#fff', border: 'none' },
  };
  return <button style={{ ...s[variant], borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'default', fontFamily: typography.fontBody }}>{label}</button>;
}

function ColourGuidelines() {
  return (
    <div style={{ fontFamily: typography.fontBody, paddingBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: colors.g400, marginBottom: 12 }}>Colour roles</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
        {[
          { swatch: '#f7f7f8', label: 'Background', desc: 'Page and surface backgrounds.' },
          { swatch: '#18171c', label: 'Text', desc: 'Primary and secondary text.' },
          { swatch: colors.primary, label: 'Interactive', desc: 'Buttons, links, focus rings.' },
          { swatch: '#e3f7f2', label: 'Support', desc: 'Hover states, confirmations.' },
          { swatch: colors.error300, label: 'Danger', desc: 'Destructive actions, errors.' },
          { swatch: colors.success300, label: 'Success', desc: 'Completed, confirmed states.' },
          { swatch: colors.alert200, label: 'Warning', desc: 'Warnings, pending states.' },
          { swatch: 'linear-gradient(135deg,#f54966,#983dc3,#3c83ee)', label: 'Extra', desc: 'Charts, tags, decorative.' },
        ].map(({ swatch, label, desc }) => (
          <div key={label} style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 48, borderRadius: 8, border: '1px solid rgba(0,0,0,.06)', background: swatch }} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 11, color: colors.g500, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: colors.g400, marginBottom: 12 }}>Interactive elements</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <DoCard note="Primary (#413cc3) for CTAs">
          <div style={{ display: 'flex', gap: 10 }}><Btn label="Primary" /><Btn label="Secondary" variant="ghost" /></div>
        </DoCard>
        <DontCard note="Don't use Alert/Extra colours for interactive elements">
          <div style={{ display: 'flex', gap: 10 }}><Btn label="Primary" variant="warning" /><Btn label="Secondary" variant="extra" /></div>
        </DontCard>
      </div>

      <div style={{ background: '#f0f0ff', borderLeft: `3px solid ${colors.primary}`, borderRadius: '0 8px 8px 0', padding: '14px 18px', fontSize: 13, color: '#333', lineHeight: 1.7 }}>
        <strong>AA</strong> = 4.5:1 · <strong>AAA</strong> = 7:1 · Large text (18px+ bold) = 3:1 · All text must meet WCAG 2.1 AA minimum.
      </div>
    </div>
  );
}

function SpacingGuidelines() {
  return (
    <div style={{ fontFamily: typography.fontBody, paddingBottom: 48 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { icon: '⚡', title: 'Efficiency first', desc: "Dense layouts are a feature. Don't pad for aesthetics." },
          { icon: '📐', title: '4px base unit', desc: 'All spacing values are multiples of 4px.' },
          { icon: '🧱', title: 'Consistent rhythm', desc: 'Same token for same role everywhere.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: colors.g500, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: colors.g400, marginBottom: 12 }}>Usage reference</div>
      <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: colors.g100, borderBottom: `1px solid ${colors.g200}` }}>
              {['Token', 'Value', 'Use'].map(h => <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, color: colors.g400, textAlign: 'left' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { token: 'space-2',  val: '2px',  use: 'Icon-to-text gap' },
              { token: 'space-4',  val: '4px',  use: 'Inline gap' },
              { token: 'space-8',  val: '8px',  use: 'Button padding (v), checkbox gap' },
              { token: 'space-12', val: '12px', use: 'Input padding (h)' },
              { token: 'space-16', val: '16px', use: 'Card padding' },
              { token: 'space-24', val: '24px', use: 'Card section gap' },
              { token: 'space-32', val: '32px', use: 'Page sections' },
              { token: 'space-40', val: '40px', use: 'Page rhythm' },
            ].map(({ token, val, use }) => (
              <tr key={token} style={{ borderBottom: `1px solid ${colors.g150}` }}>
                <td style={{ padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }}>{token}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', color: colors.g500 }}>{val}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: colors.g500 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TypographyGuidelines() {
  return (
    <div style={{ fontFamily: typography.fontBody, paddingBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: colors.g400, marginBottom: 12 }}>Hierarchy</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <DoCard note="Each level visually distinct — clear hierarchy">
          <div style={{ fontFamily: typography.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.black }}>Page title</div>
          <div style={{ fontFamily: typography.fontDisplay, fontSize: 16, fontWeight: 600, marginTop: 6 }}>Heading</div>
          <div style={{ fontFamily: typography.fontBody, fontSize: 14, color: colors.g600, marginTop: 4, lineHeight: 1.6 }}>Body text at a readable size with clear contrast from the heading above.</div>
        </DoCard>
        <DontCard note="Sizes too similar — no visual hierarchy">
          <div style={{ fontFamily: typography.fontBody, fontSize: 15, color: colors.black }}>Page title</div>
          <div style={{ fontFamily: typography.fontBody, fontSize: 14, marginTop: 6 }}>Heading</div>
          <div style={{ fontFamily: typography.fontBody, fontSize: 13, marginTop: 4, lineHeight: 1.6 }}>Body text the same size as everything else.</div>
        </DontCard>
      </div>
      <div style={{ background: '#f0f0ff', borderLeft: `3px solid ${colors.primary}`, borderRadius: '0 8px 8px 0', padding: '14px 18px', fontSize: 13, color: '#333', lineHeight: 1.7 }}>
        Use <strong>Aeonik</strong> (font-display) for H1–H4 only. Use <strong>Public Sans</strong> (font-sans) for all body, UI, labels, and captions.
      </div>
    </div>
  );
}

export const ColourGuide: StoryObj = {
  name: 'Colour guidelines',
  render: () => <ColourGuidelines />,
};

export const SpacingGuide: StoryObj = {
  name: 'Spacing guidelines',
  render: () => <SpacingGuidelines />,
};

export const TypographyGuide: StoryObj = {
  name: 'Typography guidelines',
  render: () => <TypographyGuidelines />,
};
