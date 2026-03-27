// ============================================================
// Story styles — shared across all component stories
// All values derived directly from tokens.ts — no raw values
// ============================================================

import { colors, textStyles, typography } from '../tokens/tokens';

// ─── Re-export tokens for convenience ────────────────────────────────────────
export { colors as C, textStyles as TS, typography as T };

// ─── Typography presets used in stories ──────────────────────────────────────
// Maps to exact Figma text styles

export const S = {
  // Labels, section headings, overlines
  overline: {
    ...textStyles.overlineSemi,
    color: colors.g400,
  } as React.CSSProperties,

  // Card/section sub-labels
  label: {
    ...textStyles.captionSemi,
    color: colors.g400,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  // Component title in docs
  sectionTitle: {
    ...textStyles.h3,
    color: colors.black,
    marginBottom: 8,
  } as React.CSSProperties,

  // Lead text under section title
  lead: {
    ...textStyles.body,
    color: colors.g600,
    lineHeight: 1.7,
    maxWidth: 600,
    marginBottom: 32,
  } as React.CSSProperties,

  // Standard body text
  body: {
    ...textStyles.body,
    color: colors.g600,
  } as React.CSSProperties,

  // Small descriptive text
  small: {
    ...textStyles.small,
    color: colors.g600,
  } as React.CSSProperties,

  // Caption / helper text
  caption: {
    ...textStyles.caption,
    color: colors.g500,
  } as React.CSSProperties,

  // Monospace — code snippets
  mono: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 1.6,
    color: colors.g600,
  } as React.CSSProperties,

  // Table header cells
  tableHeader: {
    padding: '10px 20px',
    ...textStyles.overlineSemi,
    color: colors.g400,
    textAlign: 'left' as const,
    background: colors.g100,
  } as React.CSSProperties,

  // Table body cells
  tableCell: {
    padding: '16px 20px',
    ...textStyles.small,
    color: colors.g600,
  } as React.CSSProperties,

  tableCellBold: {
    padding: '16px 20px',
    ...textStyles.smallSemi,
    color: colors.black,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
} as const;

// ─── Layout helpers ───────────────────────────────────────────────────────────

export const L = {
  // Two column grid
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 32,
  } as React.CSSProperties,

  // Three column grid
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    marginBottom: 24,
  } as React.CSSProperties,

  // Section divider
  divider: {
    border: 'none',
    borderTop: `1px solid ${colors.g200}`,
    margin: '40px 0',
  } as React.CSSProperties,

  // Card wrapper
  card: {
    background: colors.white,
    border: `1px solid ${colors.g200}`,
    borderRadius: 12,
  } as React.CSSProperties,

  // Playground left panel
  playgroundPreview: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 32,
    background: colors.g100,
    padding: '48px 48px 0',
  } as React.CSSProperties,

  // Playground right panel
  playgroundControls: {
    background: colors.white,
    borderLeft: `1px solid ${colors.g200}`,
    padding: 24,
    overflowY: 'auto' as const,
  } as React.CSSProperties,

  // Playground code snippet
  snippet: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: colors.g600,
    background: colors.white,
    border: `1px solid ${colors.g200}`,
    padding: '10px 14px',
    borderRadius: 8,
    maxWidth: 360,
    width: '100%',
    whiteSpace: 'pre-wrap' as const,
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,
} as const;

// ─── Playground control styles ────────────────────────────────────────────────

export const PC = {
  label: {
    ...textStyles.overlineSemi,
    color: colors.g500,
    display: 'block',
    marginBottom: 6,
  } as React.CSSProperties,

  row: {
    marginBottom: 18,
  } as React.CSSProperties,

  btnGroup: {
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  btn: (active: boolean): React.CSSProperties => ({
    padding: '5px 10px',
    ...textStyles.caption,
    fontWeight: active ? 700 : 400,
    borderRadius: 6,
    border: `1px solid ${active ? colors.primary : colors.g200}`,
    background: active ? colors.primary : colors.white,
    color: active ? colors.white : colors.g600,
    cursor: 'pointer',
  }),

  miniToggle: (on: boolean): React.CSSProperties => ({
    width: 36,
    height: 20,
    borderRadius: 32,
    padding: 2,
    background: on ? colors.primary : colors.g200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: on ? 'flex-end' : 'flex-start',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.2s',
  }),

  thumb: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: colors.white,
  } as React.CSSProperties,

  textInput: {
    width: '100%',
    border: `1.5px solid ${colors.g200}`,
    borderRadius: 7,
    padding: '6px 10px',
    ...textStyles.caption,
    color: colors.black,
    outline: 'none',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,

  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  toggleLabel: {
    ...textStyles.small,
    color: colors.g600,
  } as React.CSSProperties,

  resetBtn: {
    width: '100%',
    padding: '8px',
    ...textStyles.captionSemi,
    color: colors.g500,
    background: 'transparent',
    border: `1px solid ${colors.g200}`,
    borderRadius: 7,
    cursor: 'pointer',
  } as React.CSSProperties,
} as const;

// ─── Do / Don't cards ─────────────────────────────────────────────────────────

import React from 'react';

export function DoCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={L.card}>
      <div style={{
        padding: '8px 14px', background: '#f0fdf4', borderBottom: '1px solid #bbf7d0',
        display: 'flex', alignItems: 'center', gap: 6,
        ...textStyles.captionSemi, color: '#16a34a',
      }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#16a34a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>✓</span>
        Do
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && (
        <div style={{ padding: '8px 14px', borderTop: `1px solid ${colors.g150}`, ...S.caption }}>{note}</div>
      )}
    </div>
  );
}

export function DontCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={L.card}>
      <div style={{
        padding: '8px 14px', background: '#fff1f2', borderBottom: '1px solid #fecdd3',
        display: 'flex', alignItems: 'center', gap: 6,
        ...textStyles.captionSemi, color: '#dc2626',
      }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>✕</span>
        {"Don't"}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && (
        <div style={{ padding: '8px 14px', borderTop: `1px solid ${colors.g150}`, ...S.caption }}>{note}</div>
      )}
    </div>
  );
}

export const Grid2 = ({ children }: { children: React.ReactNode }) => (
  <div style={L.grid2}>{children}</div>
);

export const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...S.label, marginBottom: 12, marginTop: 32 }}>{children}</div>
);

export const Divider = () => <hr style={L.divider} />;
