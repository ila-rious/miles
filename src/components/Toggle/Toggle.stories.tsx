import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './Toggle';
import { DoCard, DontCard, Grid2, SLabel, Divider, L, S, PC, C } from '../storyStyles';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['!autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:       { control: 'radio',  options: ['S','M','L'] },
    color:      { control: 'radio',  options: ['purple','green'] },
    labelAlign: { control: 'radio',  options: ['left','right'] },
    checked:    { control: 'boolean' },
    disabled:   { control: 'boolean' },
    label:      { control: 'text' },
    showInfoIcon:{ control: 'boolean' },
    onChange:   { action: 'changed' },
  },
  args: { size: 'M', color: 'purple', labelAlign: 'left', checked: false, disabled: false, label: 'Toggle label', showInfoIcon: false },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    const [checked, setChecked]         = React.useState(false);
    const [size, setSize]               = React.useState<'S'|'M'|'L'>('M');
    const [color, setColor]             = React.useState<'purple'|'green'>('purple');
    const [labelAlign, setLabelAlign]   = React.useState<'left'|'right'>('left');
    const [disabled, setDisabled]       = React.useState(false);
    const [label, setLabel]             = React.useState('Toggle label');
    const [showInfoIcon, setInfoIcon]   = React.useState(false);

    const snippet = `<Toggle size="${size}" color="${color}" labelAlign="${labelAlign}"${checked?' checked':''}${disabled?' disabled':''}${label?` label="${label}"`:''}${showInfoIcon?' showInfoIcon':''} />`;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh' }}>
        <div style={L.playgroundPreview}>
          <Toggle size={size} color={color} labelAlign={labelAlign} checked={checked} disabled={disabled} label={label||undefined} showInfoIcon={showInfoIcon} onChange={setChecked} />
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
            <span style={PC.label}>Colour</span>
            <div style={PC.btnGroup}>
              {(['purple','green'] as const).map(c => <button key={c} style={{...PC.btn(color===c), textTransform:'capitalize'}} onClick={() => setColor(c)}>{c}</button>)}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Label position</span>
            <div style={PC.btnGroup}>
              {(['left','right'] as const).map(a => <button key={a} style={{...PC.btn(labelAlign===a), textTransform:'capitalize'}} onClick={() => setLabelAlign(a)}>{a}</button>)}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>State</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'On',       val: checked,  set: setChecked },
                { label: 'Disabled', val: disabled, set: setDisabled },
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
            <input value={label} onChange={e => setLabel(e.target.value)} style={PC.textInput} />
          </div>

          <div style={PC.row}>
            <div style={PC.toggleRow}>
              <span style={PC.label}>Info icon</span>
              <div style={PC.miniToggle(showInfoIcon)} onClick={() => setInfoIcon(v => !v)}><div style={PC.thumb} /></div>
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button style={PC.resetBtn} onClick={() => { setChecked(false); setSize('M'); setColor('purple'); setLabelAlign('left'); setDisabled(false); setLabel('Toggle label'); setInfoIcon(false); }}>Reset</button>
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
    const [vals, setVals] = React.useState<Record<string,boolean>>({ offDefault: false, onPurple: true, onGreen: true, offHover: false });
    const flip = (k: string) => setVals(v => ({ ...v, [k]: !v[k] }));
    return (
      <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.g200}` }}>
              {['State','Preview','Track colour','Label colour'].map(h => <th key={h} style={S.tableHeader}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Off — default',      key: 'offDefault', el: <Toggle checked={vals.offDefault} label="Click to turn on" onChange={() => flip('offDefault')} />,                   track: 'G200 #E4E3E8',      label: 'G600 #5E5E6E' },
              { state: 'On — Purple',        key: 'onPurple',   el: <Toggle checked={vals.onPurple} color="purple" label="Click to turn off" onChange={() => flip('onPurple')} />,       track: 'Primary #413CC3',   label: 'G600 #5E5E6E' },
              { state: 'On — Green',         key: 'onGreen',    el: <Toggle checked={vals.onGreen} color="green" label="Click to turn off" onChange={() => flip('onGreen')} />,          track: 'Green-500 #00852A', label: 'G600 #5E5E6E' },
              { state: 'Off — hover',        key: 'offHover',   el: <Toggle checked={vals.offHover} label="Hover over me" onChange={() => flip('offHover')} />,                          track: 'G300 #C8C8D0',      label: 'Black #18171C' },
              { state: 'Off — disabled',     key: 'dis1',       el: <Toggle disabled checked={false} label="Not available" />,                                                           track: 'G100 + G200 border', label: 'G400 #ADACB9' },
              { state: 'On — disabled',      key: 'dis2',       el: <Toggle disabled checked label="Locked on" />,                                                                       track: 'G100 + G200 border', label: 'G400 #ADACB9' },
            ].map(({ state, el, track, label }) => (
              <tr key={state} style={{ borderBottom: `1px solid ${C.g150}` }}>
                <td style={S.tableCellBold}>{state}</td>
                <td style={S.tableCell}>{el}</td>
                <td style={{ ...S.tableCell, fontFamily: 'monospace' }}>{track}</td>
                <td style={{ ...S.tableCell, fontFamily: 'monospace' }}>{label}</td>
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
    const [c, setC] = React.useState<Record<string,boolean>>({ SP:true,MP:false,LP:true,SG:true,MG:false,LG:true });
    const flip = (k: string) => setC(v => ({...v,[k]:!v[k]}));
    const dims = { S:'28×16px', M:'36×20px', L:'44×24px' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {(['S','M','L'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <code style={{ ...S.caption, fontFamily: 'monospace', width: 80 }}>{size} · {dims[size]}</code>
            <Toggle size={size} color="purple" checked={c[size+'P']} label="Purple" onChange={() => flip(size+'P')} />
            <Toggle size={size} color="green"  checked={c[size+'G']} label="Green"  onChange={() => flip(size+'G')} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Colour variants ──────────────────────────────────────────────────────────

export const ColourVariants: Story = {
  name: 'Colour variants',
  parameters: { controls: { disable: true } },
  render: () => {
    const [p, setP] = React.useState({ sidebar: true, compact: false });
    const [g, setG] = React.useState({ campaign: true, integration: false });
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
          <div style={{ ...S.label, marginBottom: 16 }}>Purple — product settings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['sidebar','Show sidebar'],['compact','Compact view']].map(([k,lbl]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={S.small}>{lbl}</span>
                <Toggle color="purple" checked={p[k as keyof typeof p]} onChange={v => setP(s => ({...s,[k]:v}))} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
          <div style={{ ...S.label, marginBottom: 16 }}>Green — active / go-live</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['campaign','Campaign active'],['integration','Integration enabled']].map(([k,lbl]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={S.small}>{lbl}</span>
                <Toggle color="green" checked={g[k as keyof typeof g]} onChange={v => setG(s => ({...s,[k]:v}))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── Usage ────────────────────────────────────────────────────────────────────

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true } },
  render: () => {
    const [dark, setDark]   = React.useState(true);
    const [email, setEmail] = React.useState(false);
    return (
      <div style={{ paddingBottom: 48 }}>
        <SLabel>Toggle vs checkbox</SLabel>
        <Grid2>
          <DoCard note="Settings that apply instantly — no Save button">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={S.small}>Dark mode</span>
                <Toggle color="purple" checked={dark} onChange={setDark} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={S.small}>Email notifications</span>
                <Toggle color="purple" checked={email} onChange={setEmail} />
              </div>
            </div>
          </DoCard>
          <DontCard note="Form selections that need Submit → use checkbox">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 20, background: C.primary, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={S.small}>I accept the terms</span>
              </label>
              <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '8px 16px', ...S.small, fontWeight: 700, cursor: 'default', alignSelf: 'flex-start' }}>Submit</button>
            </div>
          </DontCard>
        </Grid2>

        <SLabel>Label placement</SLabel>
        <Grid2>
          <DoCard note="Label states the setting — toggle communicates on/off">
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

        <SLabel>When not to use</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { title: 'Checkbox', desc: 'Action requires a form submission or confirmation.' },
            { title: 'Radio button', desc: 'Selecting one option from more than two choices.' },
            { title: 'Button', desc: 'Toggles represent state. Buttons trigger events.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 18 }}>
              <div style={{ ...S.small, fontWeight: 700, color: C.black, marginBottom: 6 }}>{title}</div>
              <div style={S.small}>{desc}</div>
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
  parameters: { controls: { disable: true } },
  render: () => {
    const [settings, setSettings] = React.useState({ dark: true, sidebar: true, compact: false, notifs: false });
    const [integrations, setIntegrations] = React.useState({ email: true, linkedin: false, hubspot: true });
    const flipS = (k: keyof typeof settings) => setSettings(s => ({...s,[k]:!s[k]}));
    const flipI = (k: keyof typeof integrations) => setIntegrations(s => ({...s,[k]:!s[k]}));
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Settings panel</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
            <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 20 }}>Appearance</div>
            {([['dark','Dark mode'],['sidebar','Show sidebar'],['compact','Compact view'],['notifs','Push notifications']] as const).map(([k,lbl], i, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i<arr.length-1?`1px solid ${C.g150}`:undefined }}>
                <span style={S.small}>{lbl}</span>
                <Toggle color="purple" checked={settings[k]} onChange={() => flipS(k)} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Active integrations</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24 }}>
            <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 20 }}>Integrations</div>
            {(['email','linkedin','hubspot'] as const).map((k,i,arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i<arr.length-1?`1px solid ${C.g150}`:undefined }}>
                <span style={{ ...S.small, textTransform: 'capitalize' }}>{k}</span>
                <Toggle color="green" checked={integrations[k]} onChange={() => flipI(k)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
