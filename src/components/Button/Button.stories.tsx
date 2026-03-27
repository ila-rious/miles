// ============================================================
// Button stories — Miles Design System
// ============================================================

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import { DoCard, DontCard, Grid2, SLabel, Divider, L, S, PC, C } from '../storyStyles';

// ─── Sample icons ─────────────────────────────────────────────────────────────

const PlusIcon = () => <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ArrowIcon = () => <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const TrashIcon = () => <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none"><path d="M3 5h10M6 5V3h4v2M6 8v4M10 8v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="4" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>;
const DownloadIcon = () => <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const StarIcon = () => <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11l-3.6 1.9.7-4-2.9-2.8 4-.6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant:   { control: 'select',  options: ['primary','secondary','outline','ghost','destructive'] },
    size:      { control: 'radio',   options: ['L','M','S','XS','XXS'] },
    mode:      { control: 'radio',   options: ['light','dark'] },
    disabled:  { control: 'boolean' },
    loading:   { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children:  { control: 'text' },
    onClick:   { action: 'clicked' },
  },
  args: {
    variant: 'primary', size: 'M', mode: 'light',
    disabled: false, loading: false, fullWidth: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ════════════════════════════════════════════════════════════════════════════════
// PLAYGROUND
// ════════════════════════════════════════════════════════════════════════════════

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    const [variant,   setVariant]   = React.useState<'primary'|'secondary'|'outline'|'ghost'|'destructive'>('primary');
    const [size,      setSize]      = React.useState<'L'|'M'|'S'|'XS'|'XXS'>('M');
    const [label,     setLabel]     = React.useState('Button');
    const [disabled,  setDisabled]  = React.useState(false);
    const [loading,   setLoading]   = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(false);
    const [iconBefore,setIconBefore]= React.useState(false);
    const [iconAfter, setIconAfter] = React.useState(false);

    const snippet = [
      `<Button`,
      `  variant="${variant}"`,
      `  size="${size}"`,
      disabled  ? `  disabled`   : null,
      loading   ? `  loading`    : null,
      fullWidth ? `  fullWidth`  : null,
      iconBefore? `  iconBefore={<PlusIcon />}` : null,
      iconAfter ? `  iconAfter={<ArrowIcon />}` : null,
      `>`,
      `  ${label}`,
      `</Button>`,
    ].filter(Boolean).join('\n');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh' }}>
        <div style={L.playgroundPreview}>
          <Button
            variant={variant} size={size}
            disabled={disabled} loading={loading} fullWidth={fullWidth}
            iconBefore={iconBefore ? <PlusIcon /> : undefined}
            iconAfter={iconAfter ? <ArrowIcon /> : undefined}
          >
            {label}
          </Button>
          <pre style={L.snippet}>{snippet}</pre>
        </div>

        <div style={L.playgroundControls}>
          <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={PC.row}>
            <span style={PC.label}>Variant</span>
            <div style={PC.btnGroup}>
              {(['primary','secondary','outline','ghost','destructive'] as const).map(v => (
                <button key={v} style={PC.btn(variant===v)} onClick={() => setVariant(v)}>{v}</button>
              ))}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Size</span>
            <div style={PC.btnGroup}>
              {(['L','M','S','XS','XXS'] as const).map(s => (
                <button key={s} style={PC.btn(size===s)} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Label</span>
            <input value={label} onChange={e => setLabel(e.target.value)} style={PC.textInput} />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Options</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Icon before', val: iconBefore,  set: setIconBefore },
                { label: 'Icon after',  val: iconAfter,   set: setIconAfter  },
                { label: 'Loading',     val: loading,     set: setLoading    },
                { label: 'Disabled',    val: disabled,    set: setDisabled   },
                { label: 'Full width',  val: fullWidth,   set: setFullWidth  },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={PC.toggleRow}>
                  <span style={PC.toggleLabel}>{lbl}</span>
                  <div style={PC.miniToggle(val)} onClick={() => set(!val)}><div style={PC.thumb} /></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button style={PC.resetBtn} onClick={() => { setVariant('primary'); setSize('M'); setLabel('Button'); setDisabled(false); setLoading(false); setFullWidth(false); setIconBefore(false); setIconAfter(false); }}>Reset</button>
          </div>
        </div>
      </div>
    );
  },
};

// ════════════════════════════════════════════════════════════════════════════════
// VARIANTS
// ════════════════════════════════════════════════════════════════════════════════

export const Variants: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { variant: 'primary'     as const, desc: 'The single most important action on a page. Use once per view.' },
        { variant: 'secondary'   as const, desc: 'Brand accent — for high-emphasis marketing or conversion actions.' },
        { variant: 'outline'     as const, desc: 'Secondary actions alongside a primary button.' },
        { variant: 'ghost'       as const, desc: 'Low-emphasis actions — tertiary, inline, or in tight spaces.' },
        { variant: 'destructive' as const, desc: 'Irreversible or dangerous actions only. Confirm before proceeding.' },
      ].map(({ variant, desc }) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, flexShrink: 0 }}>
            <Button variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <Button variant={variant} disabled>Disabled</Button>
            <Button variant={variant} loading>Loading</Button>
          </div>
          <span style={S.small}>{desc}</span>
        </div>
      ))}
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// SIZES
// ════════════════════════════════════════════════════════════════════════════════

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {([
        { size: 'L'   as const, label: 'L — 48px  · 16px / 600' },
        { size: 'M'   as const, label: 'M — 40px  · 14px / 600' },
        { size: 'S'   as const, label: 'S — 32px  · 14px / 400' },
        { size: 'XS'  as const, label: 'XS — 24px · 12px / 400' },
        { size: 'XXS' as const, label: 'XXS — 20px · 12px / 400' },
      ]).map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <code style={{ ...S.caption, fontFamily: 'monospace', width: 200, flexShrink: 0 }}>{label}</code>
          <Button size={size}>Button</Button>
          <Button size={size} variant="outline">Button</Button>
        </div>
      ))}
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════════════════════

export const Icons: Story = {
  name: 'Icons',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SLabel>Icon before label</SLabel>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button iconBefore={<PlusIcon />}>New item</Button>
        <Button variant="outline" iconBefore={<DownloadIcon />}>Download</Button>
        <Button variant="ghost" iconBefore={<StarIcon />}>Favourite</Button>
      </div>

      <SLabel>Icon after label</SLabel>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button iconAfter={<ArrowIcon />}>Continue</Button>
        <Button variant="outline" iconAfter={<ArrowIcon />}>Learn more</Button>
      </div>

      <SLabel>Icon only</SLabel>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {(['L','M','S','XS','XXS'] as const).map(size => (
          <Button key={size} size={size} iconOnly={<PlusIcon />} aria-label="Add item" />
        ))}
        <Button variant="outline" iconOnly={<TrashIcon />} aria-label="Delete" />
        <Button variant="ghost"   iconOnly={<StarIcon />}  aria-label="Favourite" />
        <Button variant="destructive" iconOnly={<TrashIcon />} aria-label="Delete permanently" />
      </div>
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// STATES
// ════════════════════════════════════════════════════════════════════════════════

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.g200}` }}>
            {['State','Primary','Outline','Ghost','Destructive'].map(h => <th key={h} style={S.tableHeader}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            { state: 'Default',  primary: <Button>Button</Button>,          outline: <Button variant="outline">Button</Button>,    ghost: <Button variant="ghost">Button</Button>,   destr: <Button variant="destructive">Delete</Button> },
            { state: 'Loading',  primary: <Button loading>Button</Button>,  outline: <Button variant="outline" loading>Button</Button>, ghost: <Button variant="ghost" loading>Button</Button>, destr: <Button variant="destructive" loading>Delete</Button> },
            { state: 'Disabled', primary: <Button disabled>Button</Button>, outline: <Button variant="outline" disabled>Button</Button>, ghost: <Button variant="ghost" disabled>Button</Button>, destr: <Button variant="destructive" disabled>Delete</Button> },
          ].map(({ state, primary, outline, ghost, destr }) => (
            <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
              <td style={S.tableCellBold}>{state}</td>
              <td style={S.tableCell}>{primary}</td>
              <td style={S.tableCell}>{outline}</td>
              <td style={S.tableCell}>{ghost}</td>
              <td style={S.tableCell}>{destr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// USAGE
// ════════════════════════════════════════════════════════════════════════════════

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ paddingBottom: 48 }}>
      <SLabel>Hierarchy</SLabel>
      <Grid2>
        <DoCard note="One primary button per view — it's the most important action">
          <div style={{ display: 'flex', gap: 10 }}>
            <Button>Save changes</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </DoCard>
        <DontCard note="Never two primary buttons side by side — it confuses hierarchy">
          <div style={{ display: 'flex', gap: 10 }}>
            <Button>Save</Button>
            <Button>Cancel</Button>
          </div>
        </DontCard>
      </Grid2>

      <SLabel>Destructive actions</SLabel>
      <Grid2>
        <DoCard note="Use destructive variant with a confirmation step for irreversible actions">
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="destructive">Delete account</Button>
          </div>
        </DoCard>
        <DontCard note="Don't use primary for destructive actions — it looks too positive">
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost">Cancel</Button>
            <Button>Delete account</Button>
          </div>
        </DontCard>
      </Grid2>

      <SLabel>Labels</SLabel>
      <Grid2>
        <DoCard note="Use verb-led, specific labels that describe the action">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button size="S">Save changes</Button>
            <Button size="S" variant="outline">Export CSV</Button>
            <Button size="S" variant="ghost">View details</Button>
          </div>
        </DoCard>
        <DontCard note="Avoid vague labels like 'Click here', 'Submit', or 'OK'">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button size="S">Submit</Button>
            <Button size="S" variant="outline">Click here</Button>
            <Button size="S" variant="ghost">OK</Button>
          </div>
        </DontCard>
      </Grid2>

      <Divider />

      <SLabel>Size guidance</SLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          { size: 'L',   use: 'Hero CTAs, landing pages, empty states' },
          { size: 'M',   use: 'Default — most UI contexts' },
          { size: 'S',   use: 'Tables, toolbars, compact forms' },
          { size: 'XS',  use: 'Inline actions, chips, tags' },
          { size: 'XXS', use: 'Dense data tables, tight layouts' },
        ].map(({ size, use }) => (
          <div key={size} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button size={size as ButtonSize}>Size {size}</Button>
            <div style={S.caption}>{use}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

export const Examples: Story = {
  name: 'Examples',
  parameters: { controls: { disable: true } },
  render: () => {
    const [saving, setSaving]   = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const handleSave = () => {
      setSaving(true);
      setTimeout(() => setSaving(false), 2000);
    };
    const handleDelete = () => {
      setDeleting(true);
      setTimeout(() => setDeleting(false), 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Form actions</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button loading={saving} onClick={handleSave} iconBefore={saving ? undefined : <DownloadIcon />}>
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
            <Button variant="ghost">Discard</Button>
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Danger zone</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ ...S.small, fontWeight: 700, color: C.black, marginBottom: 4 }}>Delete account</div>
              <div style={S.caption}>This action cannot be undone. All your data will be permanently removed.</div>
            </div>
            <Button variant="destructive" loading={deleting} onClick={handleDelete} iconBefore={deleting ? undefined : <TrashIcon />}>
              {deleting ? 'Deleting...' : 'Delete account'}
            </Button>
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Toolbar</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 16, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="S" iconBefore={<PlusIcon />}>New</Button>
              <Button size="S" variant="outline" iconBefore={<DownloadIcon />}>Export</Button>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button size="XS" variant="ghost" iconOnly={<StarIcon />} aria-label="Favourite" />
              <Button size="XS" variant="ghost" iconOnly={<TrashIcon />} aria-label="Delete" />
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Full width</div>
          <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button fullWidth>Create account</Button>
            <Button fullWidth variant="outline">Sign in with Google</Button>
          </div>
        </div>
      </div>
    );
  },
};

// needed for size reference in Usage story
import type { ButtonSize } from './Button';
