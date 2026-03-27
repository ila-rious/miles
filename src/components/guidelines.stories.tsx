import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, typography, textStyles } from '../tokens/tokens';

// ─── Shared primitives ────────────────────────────────────────────────────────

const T = {
  body: typography.fontBody,
  display: typography.fontDisplay,
};

const C = colors;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: T.display,
      fontSize: 24,
      fontWeight: 700,
      color: C.black,
      letterSpacing: '-0.02em',
      margin: '0 0 8px',
    }}>
      {children}
    </h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: T.body,
      fontSize: 15,
      color: C.g600,
      lineHeight: 1.7,
      margin: '0 0 32px',
      maxWidth: 600,
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: `1px solid ${C.g200}`, margin: '48px 0' }} />;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: T.body,
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: C.g400,
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

// ─── Do / Don't card ──────────────────────────────────────────────────────────

function DoCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{
        padding: '8px 14px',
        background: '#f0fdf4',
        borderBottom: '1px solid #bbf7d0',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        color: '#16a34a',
        fontFamily: T.body,
      }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>✓</span>
        Do
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && (
        <div style={{ padding: '8px 14px', fontSize: 11, color: C.g500, borderTop: `1px solid ${C.g150}`, fontFamily: T.body }}>
          {note}
        </div>
      )}
    </div>
  );
}

function DontCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{
        padding: '8px 14px',
        background: '#fff1f2',
        borderBottom: '1px solid #fecdd3',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        color: '#dc2626',
        fontFamily: T.body,
      }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>✕</span>
        Don't
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && (
        <div style={{ padding: '8px 14px', fontSize: 11, color: C.g500, borderTop: `1px solid ${C.g150}`, fontFamily: T.body }}>
          {note}
        </div>
      )}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
      {children}
    </div>
  );
}

// ─── Checkbox icon helpers ────────────────────────────────────────────────────

function CheckboxBox({ checked, indeterminate, disabled }: { checked?: boolean; indeterminate?: boolean; disabled?: boolean }) {
  const bg = disabled ? (checked || indeterminate ? C.g300 : C.g100) : (checked || indeterminate ? C.primary : C.white);
  const border = disabled ? `1.5px solid ${C.g200}` : (!checked && !indeterminate ? `1.5px solid ${C.g200}` : undefined);
  return (
    <div style={{ width: 20, height: 20, borderRadius: 4, background: bg, border, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {checked && !disabled && <svg width="11" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      {checked && disabled && <svg width="11" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      {indeterminate && <div style={{ width: 10, height: 2, background: '#fff', borderRadius: 1 }} />}
    </div>
  );
}

function CheckRow({ label, checked, indeterminate, disabled, color }: { label: string; checked?: boolean; indeterminate?: boolean; disabled?: boolean; color?: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <CheckboxBox checked={checked} indeterminate={indeterminate} disabled={disabled} />
      <span style={{ fontSize: 14, color: color || (disabled ? C.g400 : C.g600), fontFamily: T.body, lineHeight: '140%' }}>{label}</span>
    </label>
  );
}

function ToggleTrack({ on, color = 'purple', size = 'M', disabled }: { on?: boolean; color?: 'purple' | 'green'; size?: 'S' | 'M' | 'L'; disabled?: boolean }) {
  const dims = { S: { w: 28, h: 16, t: 12 }, M: { w: 36, h: 20, t: 16 }, L: { w: 44, h: 24, t: 20 } };
  const d = dims[size];
  const trackColor = disabled ? C.g150 : on ? (color === 'green' ? C.green500 : C.primary) : C.g200;
  const border = disabled ? `1px solid ${C.g200}` : undefined;
  return (
    <div style={{ width: d.w, height: d.h, borderRadius: 32, background: trackColor, border, padding: 2, display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', flexShrink: 0 }}>
      <div style={{ width: d.t, height: d.t, borderRadius: '50%', background: '#fff' }} />
    </div>
  );
}

// ─── Btn helpers ──────────────────────────────────────────────────────────────

function Btn({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'ghost' | 'destructive' | 'disabled' | 'warning' | 'extra' }) {
  const styles: Record<string, React.CSSProperties> = {
    primary:     { background: C.primary, color: '#fff', border: 'none' },
    ghost:       { background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}` },
    destructive: { background: C.error300, color: '#fff', border: 'none' },
    disabled:    { background: C.g200, color: C.g400, border: 'none', cursor: 'not-allowed' },
    warning:     { background: C.alert200, color: C.black, border: 'none' },
    extra:       { background: '#983dc3', color: '#fff', border: 'none' },
  };
  return (
    <button style={{ ...styles[variant], borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: variant === 'disabled' ? 'not-allowed' : 'default', fontFamily: T.body }}>
      {label}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// COLOUR GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function ColourGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Colour guidelines</SectionTitle>
      <SectionLead>Trumpet's colour system uses purposeful palettes with defined roles to ensure accessible, meaningful interfaces.</SectionLead>

      {/* Roles */}
      <SubLabel>Colour roles</SubLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { swatch: '#f7f7f8', label: 'Background', desc: 'Page and surface backgrounds.' },
          { swatch: '#18171c', label: 'Text', desc: 'Primary and secondary text.' },
          { swatch: C.primary, label: 'Interactive', desc: 'Buttons, links, focus rings.' },
          { swatch: '#e3f7f2', label: 'Support', desc: 'Hover states, confirmations.' },
          { swatch: C.error300, label: 'Danger', desc: 'Destructive actions, errors.' },
          { swatch: C.success300, label: 'Success', desc: 'Completed, confirmed states.' },
          { swatch: C.alert200, label: 'Warning', desc: 'Warnings, pending states.' },
          { swatch: 'linear-gradient(135deg,#f54966,#983dc3,#3c83ee)', label: 'Extra', desc: 'Charts, tags, decorative.' },
        ].map(({ swatch, label, desc }) => (
          <div key={label} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 48, borderRadius: 8, border: `1px solid rgba(0,0,0,.06)`, background: swatch }} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 11, color: C.g500, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Interactive guidelines */}
      <SubLabel>Interactive elements</SubLabel>
      <Grid2>
        <DoCard note="Primary (#413cc3) for CTAs">
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn label="Primary" variant="primary" />
            <Btn label="Secondary" variant="ghost" />
          </div>
        </DoCard>
        <DontCard note="Don't use Alert/Extra for interactive">
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn label="Primary" variant="warning" />
            <Btn label="Secondary" variant="extra" />
          </div>
        </DontCard>
      </Grid2>

      {/* Accessibility callout */}
      <div style={{ background: '#f0f0ff', borderLeft: `3px solid ${C.primary}`, borderRadius: '0 8px 8px 0', padding: '14px 18px', fontSize: 13, color: '#333', lineHeight: 1.7, fontFamily: T.body }}>
        <strong>AA</strong> = 4.5:1 · <strong>AAA</strong> = 7:1 · Large text (18px+ bold) = 3:1 · All text must meet WCAG 2.1 AA minimum.
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function TypographyGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Typography guidelines</SectionTitle>
      <SectionLead><strong>Aeonik</strong> for display and headings. <strong>Public Sans</strong> for body and UI text.</SectionLead>

      <SubLabel>Hierarchy</SubLabel>
      <Grid2>
        <DoCard note="Each level visually distinct">
          <div style={{ fontFamily: T.display, fontSize: 24, fontWeight: 700, color: C.black }}>Page title</div>
          <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 600, marginTop: 6 }}>Heading</div>
          <div style={{ fontFamily: T.body, fontSize: 14, color: C.g600, marginTop: 4, lineHeight: 1.6 }}>Body text at a readable size with clear contrast from the heading above.</div>
        </DoCard>
        <DontCard note="Sizes too similar — no visual hierarchy">
          <div style={{ fontFamily: T.body, fontSize: 15, color: C.black }}>Page title</div>
          <div style={{ fontFamily: T.body, fontSize: 14, marginTop: 6 }}>Heading</div>
          <div style={{ fontFamily: T.body, fontSize: 13, marginTop: 4, lineHeight: 1.6 }}>Body text the same size as everything else.</div>
        </DontCard>
      </Grid2>

      <Divider />

      <SubLabel>Type scale reference</SubLabel>
      {[
        {
          group: 'Headers', rows: [
            { token: 'h1', label: 'H1', spec: '48px / Semibold', font: 'Aeonik' },
            { token: 'h2', label: 'H2', spec: '36px / Semibold', font: 'Aeonik' },
            { token: 'h3', label: 'H3', spec: '24px / Semibold', font: 'Aeonik' },
            { token: 'h4', label: 'H4', spec: '18px / Semibold', font: 'Aeonik' },
          ]
        },
        {
          group: 'Body', rows: [
            { token: 'body',       label: 'Body',        spec: '16px / Regular',  font: 'Public Sans' },
            { token: 'bodyMedium', label: 'Body Medium', spec: '16px / Medium',   font: 'Public Sans' },
            { token: 'bodySemi',   label: 'Body Semi',   spec: '16px / Semibold', font: 'Public Sans' },
          ]
        },
        {
          group: 'Small', rows: [
            { token: 'small',       label: 'Small',           spec: '14px / Regular',            font: 'Public Sans' },
            { token: 'smallSemi',   label: 'Small Semi',      spec: '14px / Semibold',           font: 'Public Sans' },
            { token: 'smallSemiUp', label: 'Small Semi Up',   spec: '14px / Semibold Uppercase', font: 'Public Sans' },
          ]
        },
        {
          group: 'Extras', rows: [
            { token: 'caption',      label: 'Caption',       spec: '12px / Regular',            font: 'Public Sans' },
            { token: 'captionSemi',  label: 'Caption Semi',  spec: '12px / Semibold',           font: 'Public Sans' },
            { token: 'overline',     label: 'Overline',      spec: '12px / Regular Uppercase',  font: 'Public Sans' },
            { token: 'overlineSemi', label: 'Overline Semi', spec: '12px / Semibold Uppercase', font: 'Public Sans' },
          ]
        },
      ].map(({ group, rows }) => (
        <div key={group} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 8 }}>{group}</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {rows.map(({ token, label, spec, font }) => (
                  <tr key={token} style={{ borderBottom: `1px solid ${C.g150}` }}>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'monospace', width: 140 }}>{label}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: C.g500, fontFamily: 'monospace', width: 180 }}>{spec}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: C.g500, width: 100 }}>{font}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={textStyles[token as keyof typeof textStyles]}>
                        {token.includes('Up') || token.includes('overline') ? 'SAMPLE TEXT' : 'Sample text'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// BUTTON GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function ButtonGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Button guidelines</SectionTitle>
      <SectionLead>Buttons trigger actions. They communicate importance through hierarchy — from high-emphasis primary to low-emphasis ghost.</SectionLead>

      <SubLabel>Hierarchy reference</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.g200}` }}>
              {['Variant', 'Example', 'When to use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { variant: 'Primary', btn: <Btn label="Save changes" variant="primary" />, when: 'The single most important action on a page' },
              { variant: 'Ghost', btn: <Btn label="Cancel" variant="ghost" />, when: 'Secondary actions alongside a primary' },
              { variant: 'Destructive', btn: <Btn label="Delete" variant="destructive" />, when: 'Irreversible, destructive actions only' },
              { variant: 'Disabled', btn: <Btn label="Disabled" variant="disabled" />, when: 'Unavailable — explain why nearby if possible' },
            ].map(({ variant, btn, when }) => (
              <tr key={variant} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={{ padding: '14px', fontSize: 13, fontWeight: 600 }}>{variant}</td>
                <td style={{ padding: '14px' }}>{btn}</td>
                <td style={{ padding: '14px', fontSize: 12, color: C.g500 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>Usage</SubLabel>
      <Grid2>
        <DoCard note="One primary per view">
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn label="Save changes" variant="primary" />
            <Btn label="Cancel" variant="ghost" />
          </div>
        </DoCard>
        <DontCard note="Never two primary buttons side by side">
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn label="Save" variant="primary" />
            <Btn label="Cancel" variant="primary" />
          </div>
        </DontCard>
      </Grid2>

      <SubLabel>States</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, padding: 24, marginBottom: 32 }}>
        <div style={{ marginBottom: 16, fontSize: 12, fontWeight: 600, color: C.g500 }}>Primary</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { label: 'Default', style: { background: C.primary, color: '#fff', border: 'none' } },
            { label: 'Hover', style: { background: '#2f2aa2', color: '#fff', border: 'none' } },
            { label: 'Pressed', style: { background: '#0a0759', color: '#fff', border: 'none' } },
            { label: 'Focused', style: { background: C.primary, color: '#fff', border: `2px solid #60d2b5` } },
            { label: 'Disabled', style: { background: C.g200, color: C.g400, border: 'none', cursor: 'not-allowed' } },
          ].map(({ label, style }) => (
            <button key={label} style={{ ...style, borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, fontFamily: T.body }}>{label}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.g500, marginBottom: 12 }}>Ghost</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Default', style: { background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}` } },
            { label: 'Hover', style: { background: '#f0f0ff', color: C.primary, border: `1.5px solid ${C.primary}` } },
            { label: 'Pressed', style: { background: '#e0dfff', color: '#2f2aa2', border: `1.5px solid #2f2aa2` } },
            { label: 'Disabled', style: { background: 'transparent', color: C.g400, border: `1.5px solid ${C.g300}`, cursor: 'not-allowed' } },
          ].map(({ label, style }) => (
            <button key={label} style={{ ...style, borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, fontFamily: T.body }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// CHECKBOX GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function CheckboxGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Checkbox guidelines</SectionTitle>
      <SectionLead>Use checkboxes when there are multiple items to select. Each checkbox works independently. Users can select zero, one, or any number of items.</SectionLead>

      <SubLabel>When to use / not use</SubLabel>
      <Grid2>
        <DoCard note="Multiple independent selections">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CheckRow label="Email notifications" checked />
            <CheckRow label="Push notifications" />
            <CheckRow label="SMS" checked />
          </div>
        </DoCard>
        <DontCard note="Only one option can be selected → use radio buttons">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CheckRow label="Small" checked />
            <CheckRow label="Large" checked />
          </div>
        </DontCard>
      </Grid2>

      <SubLabel>Labels</SubLabel>
      <Grid2>
        <DoCard note="Short, positive, sentence-case labels">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CheckRow label="Send weekly digest" />
            <CheckRow label="Allow team invitations" />
          </div>
        </DoCard>
        <DontCard note="Avoid double negatives and vague text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CheckRow label="Don't send me emails" />
            <CheckRow label="Option 1" />
          </div>
        </DontCard>
      </Grid2>

      <SubLabel>Layout</SubLabel>
      <Grid2>
        <DoCard note="Prefer vertical — easier to scan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CheckRow label="Email notifications" checked />
            <CheckRow label="Push notifications" />
            <CheckRow label="SMS" checked />
          </div>
        </DoCard>
        <DontCard note="Horizontal groups are hard to scan">
          <div style={{ display: 'flex', flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
            <CheckRow label="Email" checked />
            <CheckRow label="Push" />
            <CheckRow label="SMS" checked />
          </div>
        </DontCard>
      </Grid2>

      <Divider />

      <SubLabel>Nesting / indeterminate state</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, padding: 24, marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: C.g600, lineHeight: 1.7, marginBottom: 16, maxWidth: 520 }}>
          Use when there is a parent/child relationship. The parent shows <strong>indeterminate</strong> when only some children are selected. Checking the parent selects all; unchecking deselects all.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CheckRow label="Notification preferences" indeterminate />
          <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CheckRow label="Email" checked />
            <CheckRow label="Push" />
            <CheckRow label="SMS" checked />
          </div>
        </div>
      </div>

      <SubLabel>States reference</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.g200}` }}>
              {['State', 'Preview', 'Notes'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Unselected', el: <CheckRow label="Label" />, note: 'Default. No option selected.' },
              { state: 'Selected', el: <CheckRow label="Label" checked />, note: 'Primary fill, white checkmark.' },
              { state: 'Indeterminate', el: <CheckRow label="Select all" indeterminate />, note: 'Some but not all children selected.' },
              { state: 'Hover', el: <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${C.primary}`, background: '#f0f0ff', flexShrink: 0 }} /><span style={{ fontSize: 13, color: C.black, fontFamily: T.body }}>Label</span></label>, note: 'Primary border, P100 background.' },
              { state: 'Focused', el: <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${C.primary}`, background: '#f0f0ff', boxShadow: '0 0 0 3px rgba(65,60,195,.2)', flexShrink: 0 }} /><span style={{ fontSize: 13, color: C.black, fontFamily: T.body }}>Label</span></label>, note: '3px focus ring at 20% opacity.' },
              { state: 'Disabled', el: <CheckRow label="Label" disabled />, note: 'G300 border, G100 background, not interactive.' },
            ].map(({ state, el, note }) => (
              <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={{ padding: '14px', fontSize: 13, fontWeight: 600 }}>{state}</td>
                <td style={{ padding: '14px' }}>{el}</td>
                <td style={{ padding: '14px', fontSize: 12, color: C.g500 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// TOGGLE GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function ToggleGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Toggle guidelines</SectionTitle>
      <SectionLead>Toggles switch between on and off immediately — no confirmation step. Trumpet supports two colour variants: Purple (primary brand) and Green (active/go-live states).</SectionLead>

      <SubLabel>Toggle vs checkbox</SubLabel>
      <Grid2>
        <DoCard note="Settings that apply instantly — no Save button needed">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Dark mode</span>
              <ToggleTrack on color="purple" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Email notifications</span>
              <ToggleTrack color="purple" />
            </div>
          </div>
        </DoCard>
        <DontCard note="Form selections that need a Save / Submit action — use checkbox">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CheckRow label="I accept the terms" checked />
            <CheckRow label="Subscribe to newsletter" />
            <button style={{ background: C.primary, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, alignSelf: 'flex-start', cursor: 'default', fontFamily: T.body }}>Submit</button>
          </div>
        </DontCard>
      </Grid2>

      <SubLabel>Label placement</SubLabel>
      <Grid2>
        <DoCard note="Label states the setting, toggle indicates on/off">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Enable two-factor authentication</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Allow data sharing</span>
            </div>
          </div>
        </DoCard>
        <DontCard note="Don't use 'On/Off' as the label — the toggle communicates this visually">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>On</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Off</span>
            </div>
          </div>
        </DontCard>
      </Grid2>

      <SubLabel>Colour variant usage</SubLabel>
      <Grid2>
        <DoCard note="Use Purple (Primary) as the default for UI settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Show sidebar</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="purple" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Compact view</span>
            </div>
          </div>
        </DoCard>
        <DoCard note="Use Green when the 'on' state has positive / go-live meaning">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="green" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Campaign active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleTrack on color="green" />
              <span style={{ fontSize: 14, color: C.g600, fontFamily: T.body }}>Integration enabled</span>
            </div>
          </div>
        </DoCard>
      </Grid2>

      <Divider />

      <SubLabel>Sizes & colours reference</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.g200}` }}>
              {['Size', 'Track', 'Off', 'On — Purple', 'On — Green'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(['S', 'M', 'L'] as const).map(size => {
              const dims = { S: '28×16px', M: '36×20px', L: '44×24px' };
              return (
                <tr key={size} style={{ borderBottom: `1px solid ${C.g150}` }}>
                  <td style={{ padding: '16px 14px', fontSize: 13, fontWeight: 600 }}>{size}</td>
                  <td style={{ padding: '16px 14px', fontSize: 12, color: C.g500, fontFamily: 'monospace' }}>{dims[size]}</td>
                  <td style={{ padding: '16px 14px' }}><ToggleTrack size={size} /></td>
                  <td style={{ padding: '16px 14px' }}><ToggleTrack size={size} on color="purple" /></td>
                  <td style={{ padding: '16px 14px' }}><ToggleTrack size={size} on color="green" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SPACING GUIDELINES
// ════════════════════════════════════════════════════════════════════════════════

function SpacingGuidelines() {
  return (
    <div style={{ fontFamily: T.body, paddingBottom: 48 }}>
      <SectionTitle>Spacing guidelines</SectionTitle>
      <SectionLead>Built for time-poor users on dashboards and workflows. Spacing should serve clarity and efficiency, not decoration.</SectionLead>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { icon: '⚡', title: 'Efficiency first', desc: "Dense layouts are a feature. Don't pad for aesthetics." },
          { icon: '📐', title: '4px base unit', desc: 'All values are multiples of 4px.' },
          { icon: '🧱', title: 'Consistent rhythm', desc: 'Same token for same role everywhere.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: C.g500, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      <SubLabel>Scale</SubLabel>
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.g200}` }}>
              {['Token', 'px', 'Visual', 'Use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { token: 'space-0',  px: '0px',  use: 'Reset' },
              { token: 'space-2',  px: '2px',  use: 'Icon-to-text gap' },
              { token: 'space-4',  px: '4px',  use: 'Inline gap' },
              { token: 'space-8',  px: '8px',  use: 'Button padding (v)' },
              { token: 'space-12', px: '12px', use: 'Input padding (h)' },
              { token: 'space-16', px: '16px', use: 'Card padding' },
              { token: 'space-24', px: '24px', use: 'Card section gap' },
              { token: 'space-32', px: '32px', use: 'Page sections' },
              { token: 'space-40', px: '40px', use: 'Page rhythm' },
            ].map(({ token, px, use }) => (
              <tr key={token} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={{ padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }}>{token}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: C.g500, fontFamily: 'monospace' }}>{px}</td>
                <td style={{ padding: '12px 14px' }}>
                  {parseInt(px) > 0 && <div style={{ height: 14, width: px, background: C.primary, borderRadius: 3, opacity: 0.6 }} />}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: C.g500 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Meta & stories ───────────────────────────────────────────────────────────

const meta = {
  title: 'Guidelines',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

export const Colours: StoryObj = {
  name: '🎨 Colour',
  render: () => <ColourGuidelines />,
};

export const TypographyGuide: StoryObj = {
  name: '✏️ Typography',
  render: () => <TypographyGuidelines />,
};

export const SpacingGuide: StoryObj = {
  name: '📐 Spacing',
  render: () => <SpacingGuidelines />,
};

export const Buttons: StoryObj = {
  name: '🔘 Buttons',
  render: () => <ButtonGuidelines />,
};

export const Checkboxes: StoryObj = {
  name: '☑️ Checkbox',
  render: () => <CheckboxGuidelines />,
};

export const Toggles: StoryObj = {
  name: '🔛 Toggle',
  render: () => <ToggleGuidelines />,
};
