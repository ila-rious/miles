import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from './Checkbox';
import { DoCard, DontCard, Grid2, SLabel, Divider, L, S, PC, C } from '../storyStyles';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['!autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:         { control: 'radio',   options: ['S', 'M', 'L'] },
    checked:      { control: 'boolean' },
    indeterminate:{ control: 'boolean' },
    disabled:     { control: 'boolean' },
    label:        { control: 'text' },
    showInfoIcon: { control: 'boolean' },
    onChange:     { action: 'changed' },
  },
  args: { size: 'M', checked: false, indeterminate: false, disabled: false, label: 'Checkbox label', showInfoIcon: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    const [checked, setChecked]       = React.useState(false);
    const [indeterminate, setIndet]   = React.useState(false);
    const [size, setSize]             = React.useState<'S'|'M'|'L'>('M');
    const [disabled, setDisabled]     = React.useState(false);
    const [label, setLabel]           = React.useState('Checkbox label');
    const [showInfoIcon, setInfoIcon] = React.useState(false);

    const snippet = `<Checkbox size="${size}"${checked ? ' checked' : ''}${indeterminate ? ' indeterminate' : ''}${disabled ? ' disabled' : ''}${label ? ` label="${label}"` : ''}${showInfoIcon ? ' showInfoIcon' : ''} />`;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh' }}>
        <div style={L.playgroundPreview}>
          <Checkbox size={size} checked={checked} indeterminate={indeterminate} disabled={disabled} label={label || undefined} showInfoIcon={showInfoIcon} onChange={setChecked} />
          <pre style={L.snippet}>{snippet}</pre>
        </div>
        <div style={L.playgroundControls}>
          <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={PC.row}>
            <span style={PC.label}>Size</span>
            <div style={PC.btnGroup}>
              {(['S','M','L'] as const).map(s => <button key={s} style={PC.btn(size===s)} onClick={() => setSize(s)}>{s}</button>)}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>State</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Checked',       val: checked,      set: (v: boolean) => { setChecked(v); if (v) setIndet(false); } },
                { label: 'Indeterminate', val: indeterminate,set: (v: boolean) => { setIndet(v); if (v) setChecked(false); } },
                { label: 'Disabled',      val: disabled,     set: setDisabled },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={PC.toggleRow}>
                  <span style={PC.toggleLabel}>{lbl}</span>
                  <div style={PC.miniToggle(val)} onClick={() => set(!val)}><div style={PC.thumb} /></div>
                </div>
              ))}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Label</span>
            <input value={label} onChange={e => setLabel(e.target.value)} style={PC.textInput} placeholder="Label text" />
          </div>

          <div style={PC.row}>
            <div style={PC.toggleRow}>
              <span style={PC.label}>Info icon</span>
              <div style={PC.miniToggle(showInfoIcon)} onClick={() => setInfoIcon(v => !v)}><div style={PC.thumb} /></div>
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button style={PC.resetBtn} onClick={() => { setChecked(false); setIndet(false); setSize('M'); setDisabled(false); setLabel('Checkbox label'); setInfoIcon(false); }}>Reset</button>
          </div>
        </div>
      </div>
    );
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => {
    const [vals, setVals] = React.useState({ a: false, b: true });
    return (
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.g200}` }}>
              {['State', 'Preview', 'Description'].map(h => <th key={h} style={S.tableHeader}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Unselected',       el: <Checkbox checked={vals.a} label="Click to select" onChange={() => setVals(v => ({...v, a: !v.a}))} />,   desc: 'Default. Nothing selected.' },
              { state: 'Selected',         el: <Checkbox checked={vals.b} label="Click to deselect" onChange={() => setVals(v => ({...v, b: !v.b}))} />, desc: 'Primary fill, white checkmark.' },
              { state: 'Indeterminate',    el: <Checkbox indeterminate label="Some children selected" />,                                                  desc: 'Some but not all children selected.' },
              { state: 'Hover',            el: <Checkbox checked={false} label="Hover over me" />,                                                        desc: 'Primary border + P100 bg. Label → Black.' },
              { state: 'Focused',          el: (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${C.primary}`, background: '#f0f0ff', boxShadow: '0 0 0 3px rgba(65,60,195,.2)', flexShrink: 0, boxSizing: 'border-box' as const }} />
                  <span style={S.small}>Keyboard focused</span>
                </label>
              ), desc: '3px focus ring at 20% opacity.' },
              { state: 'Disabled',         el: <Checkbox disabled label="Not available" />,      desc: 'G200 border, G100 fill. Not interactive.' },
              { state: 'Disabled (checked)',el: <Checkbox disabled checked label="Locked on" />, desc: 'G300 fill, white checkmark, G400 label.' },
            ].map(({ state, el, desc }) => (
              <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={S.tableCellBold}>{state}</td>
                <td style={S.tableCell}>{el}</td>
                <td style={S.tableCell}>{desc}</td>
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
  parameters: { controls: { disable: true } },
  render: () => {
    const [checked, setChecked] = React.useState({ S: true, M: true, L: false });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['S','M','L'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <code style={{ ...S.caption, fontFamily: 'monospace', width: 24 }}>{size}</code>
            <Checkbox size={size} checked={checked[size]} label={`Size ${size} — ${size==='S'?'16px':size==='M'?'20px':'24px'}`} showInfoIcon onChange={v => setChecked(c => ({...c, [size]: v}))} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Nesting ──────────────────────────────────────────────────────────────────

export const Nesting: Story = {
  name: 'Nesting',
  parameters: { controls: { disable: true } },
  render: () => {
    const [children, setChildren] = React.useState([true, false, true]);
    const allChecked = children.every(Boolean);
    const indeterminate = children.some(Boolean) && !allChecked;
    const toggleAll = () => { const n = !allChecked; setChildren([n,n,n]); };
    const toggleChild = (i: number) => { const n=[...children]; n[i]=!n[i]; setChildren(n); };
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
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ paddingBottom: 48 }}>
      <SLabel>When to use</SLabel>
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

      <SLabel>Labels</SLabel>
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

      <SLabel>Layout</SLabel>
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

      <SLabel>When not to use</SLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { title: 'Radio button', desc: 'Only one option can be selected.' },
          { title: 'Toggle switch', desc: 'Action applies immediately, no submission needed.' },
          { title: 'Data table', desc: 'Use checkboxes inside tables for batch selection.' },
        ].map(({ title, desc }) => (
          <div key={title} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 18 }}>
            <div style={{ ...S.small, fontWeight: 700, color: C.black, marginBottom: 6 }}>{title}</div>
            <div style={S.small}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Examples ─────────────────────────────────────────────────────────────────

export const Examples: Story = {
  name: 'Examples',
  parameters: { controls: { disable: true } },
  render: () => {
    const [prefs, setPrefs] = React.useState({ digest: false, invites: true, terms: false });
    const toggle = (k: keyof typeof prefs) => setPrefs(v => ({ ...v, [k]: !v[k] }));
    const [notifs, setNotifs] = React.useState([true, false, true]);
    const allNotifs = notifs.every(Boolean);
    const someNotifs = notifs.some(Boolean) && !allNotifs;
    const toggleAllNotifs = () => { const n = !allNotifs; setNotifs([n,n,n]); };
    const toggleNotif = (i: number) => { const n=[...notifs]; n[i]=!n[i]; setNotifs(n); };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Form with submission</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ ...S.body, fontWeight: 700, color: C.black }}>Communication preferences</div>
            <Checkbox checked={prefs.digest} label="Send weekly digest" onChange={() => toggle('digest')} />
            <Checkbox checked={prefs.invites} label="Allow team invitations" onChange={() => toggle('invites')} />
            <Checkbox checked={prefs.terms} label="I agree to the terms of use" onChange={() => toggle('terms')} />
            <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '9px 18px', ...S.small, fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>Save preferences</button>
          </div>
        </div>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Nested group</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked={allNotifs} indeterminate={someNotifs} label="Notification preferences" onChange={toggleAllNotifs} />
            <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Email','Push','SMS'].map((name, i) => (
                <Checkbox key={name} checked={notifs[i]} label={name} onChange={() => toggleNotif(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
