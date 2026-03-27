// ============================================================
// Checkbox stories — Miles Design System
// ============================================================

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from './Checkbox';
import { colors, typography } from '../../tokens/tokens';

const F = { body: typography.fontBody };
const C = colors;

function DoCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#16a34a', fontFamily: F.body }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#16a34a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff' }}>✓</span>
        Do
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && <div style={{ padding: '8px 14px', fontSize: 11, color: C.g500, borderTop: `1px solid ${C.g150}`, fontFamily: F.body }}>{note}</div>}
    </div>
  );
}

function DontCard({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: '#fff1f2', borderBottom: '1px solid #fecdd3', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#dc2626', fontFamily: F.body }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff' }}>✕</span>
        {"Don't"}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
      {note && <div style={{ padding: '8px 14px', fontSize: 11, color: C.g500, borderTop: `1px solid ${C.g150}`, fontFamily: F.body }}>{note}</div>}
    </div>
  );
}

const Grid2 = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, marginTop: 32 }}>{children}</div>
);

const Divider = () => <hr style={{ border: 'none', borderTop: `1px solid ${C.g200}`, margin: '40px 0' }} />;

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Checkboxes allow users to select zero, one, or multiple items from a list. Each checkbox works independently. Use **radio buttons** when only one selection is allowed. Use a **toggle** when the action takes effect immediately without a form submission.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['S', 'M', 'L'], description: 'S = 16px · M = 20px · L = 24px', table: { defaultValue: { summary: 'M' } } },
    checked: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    indeterminate: { control: 'boolean', description: 'Some but not all children selected', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text', description: 'Label text — leave empty to show checkbox only' },
    showInfoIcon: { control: 'boolean', description: 'Show the info icon to the right of the label', table: { defaultValue: { summary: 'false' } } },
    onChange: { action: 'changed' },
  },
  args: {
    size: 'M',
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Checkbox label',
    showInfoIcon: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { description: { story: 'Click the checkbox, tweak controls on the right. The code snippet updates live.' } },
  },
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [indeterminate, setIndeterminate] = React.useState(false);
    const [size, setSize] = React.useState<'S' | 'M' | 'L'>('M');
    const [disabled, setDisabled] = React.useState(false);
    const [label, setLabel] = React.useState('Checkbox label');
    const [showInfoIcon, setShowInfoIcon] = React.useState(false);

    const snippet = `<Checkbox size="${size}"${checked ? ' checked' : ''}${indeterminate ? ' indeterminate' : ''}${disabled ? ' disabled' : ''}${label ? ` label="${label}"` : ''}${showInfoIcon ? ' showInfoIcon' : ''} />`;

    const ctrlLabel: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: C.g500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: F.body, marginBottom: 6, display: 'block' };
    const ctrlRow: React.CSSProperties = { marginBottom: 20 };
    const btnGroup: React.CSSProperties = { display: 'flex', gap: 4 };
    const btn = (active: boolean): React.CSSProperties => ({
      padding: '5px 12px', fontSize: 12, fontWeight: active ? 700 : 400, borderRadius: 6,
      border: `1px solid ${active ? C.primary : C.g200}`,
      background: active ? C.primary : C.white,
      color: active ? C.white : C.g600,
      cursor: 'pointer', fontFamily: F.body,
    });
    const toggle = (on: boolean, set: (v: boolean) => void): React.CSSProperties => ({
      width: 36, height: 20, borderRadius: 32, padding: 2,
      background: on ? C.primary : C.g200,
      display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
      cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
    });

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh', fontFamily: F.body }}>
        {/* Left — component preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.g100, padding: 48 }}>
          <Checkbox
            size={size}
            checked={checked}
            indeterminate={indeterminate}
            disabled={disabled}
            label={label || undefined}
            showInfoIcon={showInfoIcon}
            onChange={setChecked}
          />
          <code style={{ fontFamily: 'monospace', fontSize: 12, color: C.g600, background: C.white, border: `1px solid ${C.g200}`, padding: '10px 14px', borderRadius: 8, maxWidth: 400, wordBreak: 'break-all' as const, lineHeight: 1.6 }}>
            {snippet}
          </code>
        </div>

        {/* Right — controls */}
        <div style={{ background: C.white, borderLeft: `1px solid ${C.g200}`, padding: 24, overflowY: 'auto' as const }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={ctrlRow}>
            <span style={ctrlLabel}>Size</span>
            <div style={btnGroup}>
              {(['S', 'M', 'L'] as const).map(s => (
                <button key={s} style={btn(size === s)} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabel}>State</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Checked', val: checked, set: (v: boolean) => { setChecked(v); if (v) setIndeterminate(false); } },
                { label: 'Indeterminate', val: indeterminate, set: (v: boolean) => { setIndeterminate(v); if (v) setChecked(false); } },
                { label: 'Disabled', val: disabled, set: setDisabled },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: C.g600 }}>{lbl}</span>
                  <div style={toggle(val, set)} onClick={() => set(!val)}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.white }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabel}>Label</span>
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              style={{ width: '100%', border: `1.5px solid ${C.g200}`, borderRadius: 7, padding: '7px 10px', fontSize: 13, fontFamily: F.body, color: C.black, outline: 'none', boxSizing: 'border-box' as const }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.g200}
            />
          </div>

          <div style={ctrlRow}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={ctrlLabel}>Info icon</span>
              <div style={toggle(showInfoIcon, setShowInfoIcon)} onClick={() => setShowInfoIcon(v => !v)}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.white }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 8, paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button
              onClick={() => { setChecked(false); setIndeterminate(false); setSize('M'); setDisabled(false); setLabel('Checkbox label'); setShowInfoIcon(false); }}
              style={{ width: '100%', padding: '8px', fontSize: 12, fontWeight: 600, color: C.g500, background: 'transparent', border: `1px solid ${C.g200}`, borderRadius: 7, cursor: 'pointer', fontFamily: F.body }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Every state the checkbox can be in. Click any enabled checkbox to toggle it.' } },
  },
  render: () => {
    const [vals, setVals] = React.useState({ a: false, b: true });
    return (
      <div style={{ fontFamily: F.body, background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.g100, borderBottom: `1px solid ${C.g200}` }}>
              {['State', 'Preview', 'Description'].map(h => (
                <th key={h} style={{ padding: '10px 20px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Unselected', el: <Checkbox checked={vals.a} label="Click to select" onChange={() => setVals(v => ({ ...v, a: !v.a }))} />, desc: 'Default. Nothing selected.' },
              { state: 'Selected', el: <Checkbox checked={vals.b} label="Click to deselect" onChange={() => setVals(v => ({ ...v, b: !v.b }))} />, desc: 'Primary fill, white checkmark. Label colour: G600.' },
              { state: 'Indeterminate', el: <Checkbox indeterminate label="Some children selected" />, desc: 'Some but not all children selected. Shows a dash.' },
              { state: 'Hover', el: <Checkbox checked={false} label="Hover over me" />, desc: 'Primary border + P100 background. Label → Black.' },
              { state: 'Focused', el: (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${C.primary}`, background: '#f0f0ff', boxShadow: '0 0 0 3px rgba(65,60,195,.2)', flexShrink: 0, boxSizing: 'border-box' as const }} />
                  <span style={{ fontSize: 14, color: C.black, fontFamily: F.body }}>Keyboard focused</span>
                </label>
              ), desc: '3px focus ring at 20% opacity for keyboard accessibility.' },
              { state: 'Disabled', el: <Checkbox disabled label="Not available" />, desc: 'G200 border, G100 fill. Not interactive.' },
              { state: 'Disabled (checked)', el: <Checkbox disabled checked label="Locked on" />, desc: 'G300 fill, white checkmark, G400 label.' },
            ].map(({ state, el, desc }) => (
              <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' as const }}>{state}</td>
                <td style={{ padding: '16px 20px' }}>{el}</td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: C.g500 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Three sizes — S (16px), M (20px), L (24px). Click any to toggle.' } },
  },
  render: () => {
    const [checked, setChecked] = React.useState({ S: true, M: true, L: false });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['S', 'M', 'L'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <code style={{ width: 24, fontSize: 11, color: C.g400, fontFamily: 'monospace' }}>{size}</code>
            <Checkbox
              size={size}
              checked={checked[size]}
              label={`Size ${size} — ${size === 'S' ? '16px · Caption' : size === 'M' ? '20px · Small' : '24px · Body'}`}
              showInfoIcon
              onChange={v => setChecked(c => ({ ...c, [size]: v }))}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Nesting ──────────────────────────────────────────────────────────────────

export const Nesting: Story = {
  name: 'Nesting',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Parent shows **indeterminate** when only some children are checked. Clicking the parent selects or deselects all children.' } },
  },
  render: () => {
    const [children, setChildren] = React.useState([true, false, true]);
    const allChecked = children.every(Boolean);
    const indeterminate = children.some(Boolean) && !allChecked;
    const toggleAll = () => { const n = !allChecked; setChildren([n, n, n]); };
    const toggleChild = (i: number) => { const n = [...children]; n[i] = !n[i]; setChildren(n); };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox checked={allChecked} indeterminate={indeterminate} label="Notification preferences" onChange={toggleAll} />
        <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Email', 'Push notifications', 'SMS'].map((name, i) => (
            <Checkbox key={name} checked={children[i]} label={name} onChange={() => toggleChild(i)} />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Usage ────────────────────────────────────────────────────────────────────

export const Usage: Story = {
  name: 'Usage',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'When to use checkboxes, how to write labels, and layout best practices.' } },
  },
  render: () => (
    <div style={{ fontFamily: F.body, paddingBottom: 48 }}>
      <Label>When to use</Label>
      <Grid2>
        <DoCard note="Multiple independent selections">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked label="Email notifications" />
            <Checkbox checked={false} label="Push notifications" />
            <Checkbox checked label="SMS" />
          </div>
        </DoCard>
        <DontCard note="Mutually exclusive → use radio buttons">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked label="Small" />
            <Checkbox checked label="Large" />
          </div>
        </DontCard>
      </Grid2>

      <Label>Labels</Label>
      <Grid2>
        <DoCard note="Short, positive, sentence-case">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Checkbox checked={false} label="Send weekly digest" />
            <Checkbox checked={false} label="Allow team invitations" />
          </div>
        </DoCard>
        <DontCard note="Avoid double negatives and vague text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Checkbox checked={false} label="Don't send me emails" />
            <Checkbox checked={false} label="Option 1" />
          </div>
        </DontCard>
      </Grid2>

      <Label>Layout</Label>
      <Grid2>
        <DoCard note="Vertical stacking — easier to scan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked label="Email" />
            <Checkbox checked={false} label="Push" />
            <Checkbox checked label="SMS" />
          </div>
        </DoCard>
        <DontCard note="Horizontal is hard to scan">
          <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Checkbox checked label="Email" />
            <Checkbox checked={false} label="Push" />
            <Checkbox checked label="SMS" />
          </div>
        </DontCard>
      </Grid2>

      <Divider />

      <Label>When not to use</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { title: 'Radio button', desc: 'Only one option can be selected.' },
          { title: 'Toggle switch', desc: 'Action applies immediately, no submission needed.' },
          { title: 'Data table', desc: 'Use checkboxes inside tables for batch selection.' },
        ].map(({ title, desc }) => (
          <div key={title} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 13, color: C.g500, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Examples ─────────────────────────────────────────────────────────────────

export const Examples: Story = {
  name: 'Examples',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Real-world patterns — fully interactive.' } },
  },
  render: () => {
    const [prefs, setPrefs] = React.useState({ digest: false, invites: true, terms: false });
    const toggle = (k: keyof typeof prefs) => setPrefs(v => ({ ...v, [k]: !v[k] }));
    const [notifs, setNotifs] = React.useState([true, false, true]);
    const allNotifs = notifs.every(Boolean);
    const someNotifs = notifs.some(Boolean) && !allNotifs;
    const toggleAllNotifs = () => { const n = !allNotifs; setNotifs([n, n, n]); };
    const toggleNotif = (i: number) => { const n = [...notifs]; n[i] = !n[i]; setNotifs(n); };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, fontFamily: F.body }}>Form with submission</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: F.body }}>Communication preferences</div>
            <Checkbox checked={prefs.digest} label="Send weekly digest" onChange={() => toggle('digest')} />
            <Checkbox checked={prefs.invites} label="Allow team invitations" onChange={() => toggle('invites')} />
            <Checkbox checked={prefs.terms} label="I agree to the terms of use" onChange={() => toggle('terms')} />
            <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', fontFamily: F.body }}>
              Save preferences
            </button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, fontFamily: F.body }}>Nested group</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked={allNotifs} indeterminate={someNotifs} label="Notification preferences" onChange={toggleAllNotifs} />
            <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Email', 'Push', 'SMS'].map((name, i) => (
                <Checkbox key={name} checked={notifs[i]} label={name} onChange={() => toggleNotif(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
