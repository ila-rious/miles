// ============================================================
// Toggle stories — Miles Design System
// ============================================================

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './Toggle';
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
  title: 'Components/Toggle',
  component: Toggle,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Toggles switch between on and off immediately — no confirmation step needed. Two colour variants: **Purple** for product settings, **Green** for active/go-live states. Use a **checkbox** when the action requires a form submission.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['S', 'M', 'L'], description: 'S = 28×16px · M = 36×20px · L = 44×24px', table: { defaultValue: { summary: 'M' } } },
    color: { control: 'radio', options: ['purple', 'green'], description: 'purple = product settings · green = active / go-live', table: { defaultValue: { summary: 'purple' } } },
    labelAlign: { control: 'radio', options: ['left', 'right'], description: 'Label position relative to the track', table: { defaultValue: { summary: 'right' } } },
    checked: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text' },
    showInfoIcon: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    onChange: { action: 'changed' },
  },
  args: {
    size: 'M',
    color: 'purple',
    labelAlign: 'left',
    checked: false,
    disabled: false,
    label: 'Toggle label',
    showInfoIcon: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { description: { story: 'Flip the toggle, tweak controls on the right. The code snippet updates live.' } },
  },
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [size, setSize] = React.useState<'S' | 'M' | 'L'>('M');
    const [color, setColor] = React.useState<'purple' | 'green'>('purple');
    const [labelAlign, setLabelAlign] = React.useState<'left' | 'right'>('left');
    const [disabled, setDisabled] = React.useState(false);
    const [label, setLabel] = React.useState('Toggle label');
    const [showInfoIcon, setShowInfoIcon] = React.useState(false);

    const snippet = `<Toggle size="${size}" color="${color}" labelAlign="${labelAlign}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}${label ? ` label="${label}"` : ''}${showInfoIcon ? ' showInfoIcon' : ''} />`;

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
    const miniToggle = (on: boolean): React.CSSProperties => ({
      width: 36, height: 20, borderRadius: 32, padding: 2,
      background: on ? C.primary : C.g200,
      display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
      cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
    });

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh', fontFamily: F.body }}>
        {/* Left — component preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.g100, padding: 48 }}>
          <Toggle
            size={size}
            color={color}
            labelAlign={labelAlign}
            checked={checked}
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
            <span style={ctrlLabel}>Colour</span>
            <div style={btnGroup}>
              {(['purple', 'green'] as const).map(c => (
                <button key={c} style={{ ...btn(color === c), textTransform: 'capitalize' }} onClick={() => setColor(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabel}>Label position</span>
            <div style={btnGroup}>
              {(['left', 'right'] as const).map(a => (
                <button key={a} style={{ ...btn(labelAlign === a), textTransform: 'capitalize' }} onClick={() => setLabelAlign(a)}>{a}</button>
              ))}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabel}>State</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'On', val: checked, set: setChecked },
                { label: 'Disabled', val: disabled, set: setDisabled },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: C.g600 }}>{lbl}</span>
                  <div style={miniToggle(val)} onClick={() => set(!val)}>
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
              <div style={miniToggle(showInfoIcon)} onClick={() => setShowInfoIcon(v => !v)}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.white }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 8, paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button
              onClick={() => { setChecked(false); setSize('M'); setColor('purple'); setLabelAlign('left'); setDisabled(false); setLabel('Toggle label'); setShowInfoIcon(false); }}
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
    docs: { description: { story: 'Every state for both colour variants. Click any enabled toggle to flip it.' } },
  },
  render: () => {
    const [vals, setVals] = React.useState<Record<string, boolean>>({
      offDefault: false, onPurple: true, onGreen: true,
      offHover: false, offDisabled: false, onDisabled: true,
    });
    const flip = (k: string) => setVals(v => ({ ...v, [k]: !v[k] }));

    return (
      <div style={{ fontFamily: F.body, background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.g100, borderBottom: `1px solid ${C.g200}` }}>
              {['State', 'Preview', 'Track colour', 'Label colour'].map(h => (
                <th key={h} style={{ padding: '10px 20px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Off — default',        key: 'offDefault',  el: <Toggle checked={vals.offDefault}  label="Click to turn on"    onChange={() => flip('offDefault')} />,               track: 'G200 #E4E3E8',          label: 'G600 #5E5E6E' },
              { state: 'On — Purple',           key: 'onPurple',   el: <Toggle checked={vals.onPurple}   color="purple" label="Click to turn off" onChange={() => flip('onPurple')} />,     track: 'Primary #413CC3',       label: 'G600 #5E5E6E' },
              { state: 'On — Green',            key: 'onGreen',    el: <Toggle checked={vals.onGreen}    color="green"  label="Click to turn off" onChange={() => flip('onGreen')} />,      track: 'Green-500 #00852A',     label: 'G600 #5E5E6E' },
              { state: 'Off — hover',           key: 'offHover',   el: <Toggle checked={vals.offHover}   label="Hover over me"        onChange={() => flip('offHover')} />,                 track: 'G300 #C8C8D0',          label: 'Black #18171C' },
              { state: 'Off — disabled',        key: 'offDisabled',el: <Toggle disabled checked={false}  label="Not available" />,                                                          track: 'G100 + G200 border',    label: 'G400 #ADACB9' },
              { state: 'On — disabled',         key: 'onDisabled', el: <Toggle disabled checked label="Locked on" />,                                                                       track: 'G100 + G200 border',    label: 'G400 #ADACB9' },
            ].map(({ state, el, track, label }) => (
              <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' as const }}>{state}</td>
                <td style={{ padding: '16px 20px' }}>{el}</td>
                <td style={{ padding: '16px 20px', fontSize: 12, color: C.g500, fontFamily: 'monospace' }}>{track}</td>
                <td style={{ padding: '16px 20px', fontSize: 12, color: C.g500, fontFamily: 'monospace' }}>{label}</td>
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
    docs: { description: { story: 'Three track sizes. Click any to flip. Both colour variants shown per size.' } },
  },
  render: () => {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ SP: true, MP: false, LP: true, SG: true, MG: false, LG: true });
    const flip = (k: string) => setChecked(v => ({ ...v, [k]: !v[k] }));
    const dims = { S: '28×16px', M: '36×20px', L: '44×24px' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {(['S', 'M', 'L'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ width: 80, fontFamily: 'monospace', fontSize: 11, color: C.g400 }}>{size} · {dims[size]}</div>
            <Toggle size={size} color="purple" checked={checked[size + 'P']} label="Purple" onChange={() => flip(size + 'P')} />
            <Toggle size={size} color="green"  checked={checked[size + 'G']} label="Green"  onChange={() => flip(size + 'G')} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Colour variants ──────────────────────────────────────────────────────────

export const ColourVariants: Story = {
  name: 'Colour variants',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Purple for product UI settings. Green when the "on" state has positive meaning — e.g. campaign active, integration enabled.' } },
  },
  render: () => {
    const [p, setP] = React.useState({ sidebar: true, compact: false });
    const [g, setG] = React.useState({ campaign: true, integration: false });
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 16, fontFamily: F.body }}>Purple — product settings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Show sidebar</span>
              <Toggle color="purple" checked={p.sidebar} onChange={v => setP(s => ({ ...s, sidebar: v }))} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Compact view</span>
              <Toggle color="purple" checked={p.compact} onChange={v => setP(s => ({ ...s, compact: v }))} />
            </div>
          </div>
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 16, fontFamily: F.body }}>Green — active / go-live</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Campaign active</span>
              <Toggle color="green" checked={g.campaign} onChange={v => setG(s => ({ ...s, campaign: v }))} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Integration enabled</span>
              <Toggle color="green" checked={g.integration} onChange={v => setG(s => ({ ...s, integration: v }))} />
            </div>
          </div>
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
    docs: { description: { story: 'When to use toggles vs checkboxes, label placement rules, and colour variant guidance.' } },
  },
  render: () => {
    const [dark, setDark] = React.useState(true);
    const [email, setEmail] = React.useState(false);
    return (
      <div style={{ fontFamily: F.body, paddingBottom: 48 }}>

        <Label>Toggle vs checkbox</Label>
        <Grid2>
          <DoCard note="Settings that apply instantly — no Save button">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Dark mode</span>
                <Toggle color="purple" checked={dark} onChange={setDark} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>Email notifications</span>
                <Toggle color="purple" checked={email} onChange={setEmail} />
              </div>
            </div>
          </DoCard>
          <DontCard note="Form selections that need Submit → use checkbox">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 20, height: 20, background: C.primary, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>I accept the terms</span>
              </label>
              <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'default', alignSelf: 'flex-start', fontFamily: F.body }}>Submit</button>
            </div>
          </DontCard>
        </Grid2>

        <Label>Label placement</Label>
        <Grid2>
          <DoCard note="Label states the setting — toggle communicates on/off visually">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Toggle checked label="Enable two-factor authentication" labelAlign="left" />
              <Toggle checked={false} label="Allow data sharing" labelAlign="left" />
            </div>
          </DoCard>
          <DontCard note={"Don't use 'On/Off' as the label"}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Toggle checked label="On" labelAlign="left" />
              <Toggle checked={false} label="Off" labelAlign="left" />
            </div>
          </DontCard>
        </Grid2>

        <Divider />

        <Label>When not to use</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { title: 'Checkbox', desc: 'Use when the action requires a form submission or confirmation step.' },
            { title: 'Radio button', desc: 'Use when selecting one option from more than two choices.' },
            { title: 'Button', desc: 'Toggles represent state. Buttons trigger events.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: C.g500, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ─── Examples ─────────────────────────────────────────────────────────────────

export const Examples: Story = {
  name: 'Examples',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Real-world patterns — fully interactive.' } },
  },
  render: () => {
    const [settings, setSettings] = React.useState({ dark: true, sidebar: true, compact: false, notifs: false });
    const [integrations, setIntegrations] = React.useState({ email: true, linkedin: false, hubspot: true });
    const flipS = (k: keyof typeof settings) => setSettings(s => ({ ...s, [k]: !s[k] }));
    const flipI = (k: keyof typeof integrations) => setIntegrations(s => ({ ...s, [k]: !s[k] }));
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, fontFamily: F.body }}>Settings panel</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: F.body, marginBottom: 20 }}>Appearance</div>
            {[
              { key: 'dark' as const, label: 'Dark mode' },
              { key: 'sidebar' as const, label: 'Show sidebar' },
              { key: 'compact' as const, label: 'Compact view' },
              { key: 'notifs' as const, label: 'Push notifications' },
            ].map(({ key, label }, i, arr) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.g150}` : undefined }}>
                <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body }}>{label}</span>
                <Toggle color="purple" checked={settings[key]} onChange={() => flipS(key)} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, fontFamily: F.body }}>Active integrations</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: F.body, marginBottom: 20 }}>Integrations</div>
            {(['email', 'linkedin', 'hubspot'] as const).map((key, i, arr) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.g150}` : undefined }}>
                <span style={{ fontSize: 14, color: C.g600, fontFamily: F.body, textTransform: 'capitalize' as const }}>{key}</span>
                <Toggle color="green" checked={integrations[key]} onChange={() => flipI(key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
