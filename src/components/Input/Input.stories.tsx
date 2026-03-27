// ============================================================
// Input stories — Miles Design System
// ============================================================

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from './Input';
import { colors, typography } from '../../tokens/tokens';

const F = { body: typography.fontBody };
const C = colors;

// ─── Shared primitives ────────────────────────────────────────────────────────

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
const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12, marginTop: 32 }}>{children}</div>
);
const Divider = () => <hr style={{ border: 'none', borderTop: `1px solid ${C.g200}`, margin: '40px 0' }} />;

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7C1 7 3 3 7 3s6 4 6 4-2 4-6 4S1 7 1 7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Text inputs let users enter and edit text. They support labels, helper text, error states, prefix/suffix icons, and three sizes. Always pair an input with a visible label for accessibility.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['S', 'M', 'L'], description: 'S = 32px · M = 40px · L = 48px', table: { defaultValue: { summary: 'M' } } },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'number', 'url', 'tel'] },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    readOnly: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    required: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    size: 'M',
    type: 'text',
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: '',
    errorText: '',
    disabled: false,
    readOnly: false,
    required: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ════════════════════════════════════════════════════════════════════════════════
// PLAYGROUND — side by side
// ════════════════════════════════════════════════════════════════════════════════

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { description: { story: 'Type in the input, tweak controls on the right. The code snippet updates live.' } },
  },
  render: () => {
    const [value, setValue] = React.useState('');
    const [size, setSize] = React.useState<'S' | 'M' | 'L'>('M');
    const [type, setType] = React.useState<'text' | 'email' | 'password' | 'search' | 'number'>('text');
    const [label, setLabel] = React.useState('Label');
    const [placeholder, setPlaceholder] = React.useState('Placeholder text');
    const [helperText, setHelperText] = React.useState('');
    const [errorText, setErrorText] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(false);
    const [required, setRequired] = React.useState(false);
    const [showPrefix, setShowPrefix] = React.useState(false);
    const [showSuffix, setShowSuffix] = React.useState(false);

    const snippet = [
      `<Input`,
      `  size="${size}"`,
      `  type="${type}"`,
      label ? `  label="${label}"` : null,
      placeholder ? `  placeholder="${placeholder}"` : null,
      helperText ? `  helperText="${helperText}"` : null,
      errorText ? `  errorText="${errorText}"` : null,
      disabled ? `  disabled` : null,
      readOnly ? `  readOnly` : null,
      required ? `  required` : null,
      showPrefix ? `  prefix={<SearchIcon />}` : null,
      showSuffix ? `  suffix={<EyeIcon />}` : null,
      `/>`,
    ].filter(Boolean).join('\n');

    const ctrlLabelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: C.g500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: F.body, marginBottom: 6, display: 'block' };
    const ctrlRow: React.CSSProperties = { marginBottom: 18 };
    const btnGrp: React.CSSProperties = { display: 'flex', gap: 3, flexWrap: 'wrap' as const };
    const btn = (active: boolean): React.CSSProperties => ({
      padding: '5px 10px', fontSize: 12, fontWeight: active ? 700 : 400, borderRadius: 6,
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
    const textInput: React.CSSProperties = {
      width: '100%', border: `1.5px solid ${C.g200}`, borderRadius: 7,
      padding: '6px 10px', fontSize: 12, fontFamily: F.body, color: C.black,
      outline: 'none', boxSizing: 'border-box' as const,
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh', fontFamily: F.body }}>
        {/* Left — preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.g100, padding: 48 }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Input
              value={value}
              onChange={setValue}
              size={size}
              type={type}
              label={label || undefined}
              placeholder={placeholder || undefined}
              helperText={helperText || undefined}
              errorText={errorText || undefined}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              prefix={showPrefix ? <SearchIcon /> : undefined}
              suffix={showSuffix ? <EyeIcon /> : undefined}
            />
          </div>
          <pre style={{ fontFamily: 'monospace', fontSize: 11, color: C.g600, background: C.white, border: `1px solid ${C.g200}`, padding: '10px 14px', borderRadius: 8, maxWidth: 360, width: '100%', whiteSpace: 'pre-wrap' as const, lineHeight: 1.7, margin: 0 }}>
            {snippet}
          </pre>
        </div>

        {/* Right — controls */}
        <div style={{ background: C.white, borderLeft: `1px solid ${C.g200}`, padding: 24, overflowY: 'auto' as const }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Size</span>
            <div style={btnGrp}>
              {(['S', 'M', 'L'] as const).map(s => <button key={s} style={btn(size === s)} onClick={() => setSize(s)}>{s}</button>)}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Type</span>
            <div style={btnGrp}>
              {(['text', 'email', 'password', 'search', 'number'] as const).map(t => (
                <button key={t} style={btn(type === t)} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Label</span>
            <input value={label} onChange={e => setLabel(e.target.value)} style={textInput} placeholder="Label text" />
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Placeholder</span>
            <input value={placeholder} onChange={e => setPlaceholder(e.target.value)} style={textInput} />
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Helper text</span>
            <input value={helperText} onChange={e => { setHelperText(e.target.value); if (e.target.value) setErrorText(''); }} style={textInput} placeholder="Optional helper" />
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>Error text</span>
            <input value={errorText} onChange={e => { setErrorText(e.target.value); if (e.target.value) setHelperText(''); }} style={textInput} placeholder="Triggers error state" />
          </div>

          <div style={ctrlRow}>
            <span style={ctrlLabelStyle}>State</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Disabled', val: disabled, set: (v: boolean) => { setDisabled(v); if (v) setReadOnly(false); } },
                { label: 'Read only', val: readOnly, set: (v: boolean) => { setReadOnly(v); if (v) setDisabled(false); } },
                { label: 'Required', val: required, set: setRequired },
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
            <span style={ctrlLabelStyle}>Slots</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Prefix icon', val: showPrefix, set: setShowPrefix },
                { label: 'Suffix icon', val: showSuffix, set: setShowSuffix },
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

          <div style={{ marginTop: 8, paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button
              onClick={() => { setValue(''); setSize('M'); setType('text'); setLabel('Label'); setPlaceholder('Placeholder text'); setHelperText(''); setErrorText(''); setDisabled(false); setReadOnly(false); setRequired(false); setShowPrefix(false); setShowSuffix(false); }}
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

// ════════════════════════════════════════════════════════════════════════════════
// STATES
// ════════════════════════════════════════════════════════════════════════════════

export const States: Story = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Every state the input can be in. Click any enabled input to interact.' } },
  },
  render: () => {
    const [vals, setVals] = React.useState<Record<string, string>>({
      default: '', hover: '', focused: '', error: 'invalid@', readonly: 'Read only value', disabled: '',
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        {[
          { key: 'default',  label: 'Default',   props: { label: 'Default', placeholder: 'Type something...' } },
          { key: 'error',    label: 'Error',      props: { label: 'Email', errorText: 'Please enter a valid email address' } },
          { key: 'readonly', label: 'Read only',  props: { label: 'Username', readOnly: true } },
          { key: 'disabled', label: 'Disabled',   props: { label: 'Disabled field', placeholder: 'Not available', disabled: true } },
          { key: 'helper',   label: 'With helper',props: { label: 'Password', type: 'password' as const, helperText: 'Must be at least 8 characters', placeholder: '••••••••' } },
          { key: 'icons',    label: 'With icons', props: { label: 'Search', placeholder: 'Search...', prefix: <SearchIcon />, suffix: <span style={{ fontSize: 11, color: C.g400, fontFamily: F.body }}>⌘K</span> } },
        ].map(({ key, props }) => (
          <Input
            key={key}
            {...props}
            value={vals[key] ?? ''}
            onChange={v => setVals(prev => ({ ...prev, [key]: v }))}
          />
        ))}
      </div>
    );
  },
};

// ════════════════════════════════════════════════════════════════════════════════
// SIZES
// ════════════════════════════════════════════════════════════════════════════════

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Three sizes — S (32px), M (40px), L (48px).' } },
  },
  render: () => {
    const [vals, setVals] = React.useState({ S: '', M: '', L: '' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        {(['S', 'M', 'L'] as const).map(size => (
          <Input
            key={size}
            size={size}
            label={`Size ${size} — ${size === 'S' ? '32px' : size === 'M' ? '40px' : '48px'}`}
            placeholder="Placeholder text"
            value={vals[size]}
            onChange={v => setVals(prev => ({ ...prev, [size]: v }))}
          />
        ))}
      </div>
    );
  },
};

// ════════════════════════════════════════════════════════════════════════════════
// PREFIX & SUFFIX
// ════════════════════════════════════════════════════════════════════════════════

export const Slots: Story = {
  name: 'Prefix & Suffix',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Prefix and suffix slots accept any React node — icons, text, or buttons.' } },
  },
  render: () => {
    const [vals, setVals] = React.useState({ a: '', b: '', c: '', d: '', e: '' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <Input label="Search" placeholder="Search anything..." prefix={<SearchIcon />} value={vals.a} onChange={v => setVals(p => ({ ...p, a: v }))} />
        <Input label="Email" placeholder="you@example.com" prefix={<MailIcon />} value={vals.b} onChange={v => setVals(p => ({ ...p, b: v }))} />
        <Input label="Password" type="password" placeholder="••••••••" prefix={<LockIcon />} suffix={<EyeIcon />} value={vals.c} onChange={v => setVals(p => ({ ...p, c: v }))} />
        <Input label="Amount" placeholder="0.00" prefix={<span style={{ fontSize: 13, color: C.g500, fontFamily: F.body }}>£</span>} suffix={<span style={{ fontSize: 12, color: C.g400, fontFamily: F.body }}>GBP</span>} value={vals.d} onChange={v => setVals(p => ({ ...p, d: v }))} />
        <Input label="Shortcut" placeholder="Search..." prefix={<SearchIcon />} suffix={<span style={{ fontSize: 11, color: C.g400, fontFamily: F.body, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 4, padding: '2px 5px' }}>⌘K</span>} value={vals.e} onChange={v => setVals(p => ({ ...p, e: v }))} />
      </div>
    );
  },
};

// ════════════════════════════════════════════════════════════════════════════════
// USAGE
// ════════════════════════════════════════════════════════════════════════════════

export const Usage: Story = {
  name: 'Usage',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'When and how to use inputs, label rules, error messaging, and what to avoid.' } },
  },
  render: () => (
    <div style={{ fontFamily: F.body, paddingBottom: 48 }}>

      <SLabel>Labels</SLabel>
      <Grid2>
        <DoCard note="Always use a visible label — never rely on placeholder alone">
          <Input label="Email address" placeholder="you@example.com" value="" onChange={() => {}} />
        </DoCard>
        <DontCard note="Placeholder text disappears when the user starts typing">
          <Input placeholder="Email address" value="" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <SLabel>Error messages</SLabel>
      <Grid2>
        <DoCard note="Specific, actionable error message below the field">
          <Input label="Email" value="notanemail" errorText="Enter a valid email address like you@example.com" onChange={() => {}} />
        </DoCard>
        <DontCard note="Vague errors don't help the user fix the problem">
          <Input label="Email" value="notanemail" errorText="Invalid" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <SLabel>Helper text</SLabel>
      <Grid2>
        <DoCard note="Use helper text to set expectations before the user types">
          <Input label="Password" type="password" placeholder="••••••••" helperText="Must be at least 8 characters and include a number" value="" onChange={() => {}} />
        </DoCard>
        <DontCard note="Don't use helper text to repeat what the label already says">
          <Input label="Email address" placeholder="Enter your email" helperText="Enter your email address here" value="" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <Divider />

      <SLabel>Required fields</SLabel>
      <Grid2>
        <DoCard note="Mark required fields with * and explain at the top of the form">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 12, color: C.g500, fontFamily: F.body }}>* Required fields</span>
            <Input label="Full name" required value="" onChange={() => {}} placeholder="Jane Smith" />
            <Input label="Email" required value="" onChange={() => {}} placeholder="you@example.com" />
            <Input label="Company" value="" onChange={() => {}} placeholder="Optional" />
          </div>
        </DoCard>
        <DontCard note="Don't mark every field as required — reconsider if all fields are truly needed">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Full name" required value="" onChange={() => {}} />
            <Input label="Email" required value="" onChange={() => {}} />
            <Input label="Phone" required value="" onChange={() => {}} />
          </div>
        </DontCard>
      </Grid2>
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

export const Examples: Story = {
  name: 'Examples',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Real-world form patterns — fully interactive.' } },
  },
  render: () => {
    const [login, setLogin] = React.useState({ email: '', password: '' });
    const [loginErrors, setLoginErrors] = React.useState({ email: '', password: '' });
    const [profile, setProfile] = React.useState({ name: '', company: '', url: '', bio: '' });
    const [search, setSearch] = React.useState('');

    const validateLogin = () => {
      const errors = { email: '', password: '' };
      if (!login.email.includes('@')) errors.email = 'Enter a valid email address';
      if (login.password.length < 8) errors.password = 'Password must be at least 8 characters';
      setLoginErrors(errors);
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

        {/* Login form */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12 }}>Login form</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: F.body }}>Sign in</div>
            <Input label="Email" type="email" placeholder="you@example.com" prefix={<MailIcon />} value={login.email} onChange={v => setLogin(p => ({ ...p, email: v }))} errorText={loginErrors.email} required />
            <Input label="Password" type="password" placeholder="••••••••" prefix={<LockIcon />} suffix={<EyeIcon />} value={login.password} onChange={v => setLogin(p => ({ ...p, password: v }))} errorText={loginErrors.password} helperText={loginErrors.password ? '' : 'At least 8 characters'} required />
            <button onClick={validateLogin} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: F.body }}>
              Sign in
            </button>
          </div>
        </div>

        {/* Profile form */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12 }}>Profile settings</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: F.body }}>Edit profile</div>
            <Input label="Display name" placeholder="Jane Smith" required value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} />
            <Input label="Company" placeholder="Trumpet" value={profile.company} onChange={v => setProfile(p => ({ ...p, company: v }))} />
            <Input label="Website" type="url" placeholder="https://trumpet.app" prefix={<span style={{ fontSize: 12, color: C.g400, fontFamily: F.body }}>https://</span>} value={profile.url} onChange={v => setProfile(p => ({ ...p, url: v }))} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: F.body }}>Save</button>
              <button style={{ flex: 1, background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}`, borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: F.body }}>Cancel</button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.g400, marginBottom: 12 }}>Search input</div>
          <Input size="L" placeholder="Search components, tokens, guidelines..." prefix={<SearchIcon />} suffix={search ? <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.g400, fontSize: 16, lineHeight: 1, padding: 0 }}>×</button> : <span style={{ fontSize: 11, color: C.g400, fontFamily: F.body, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 4, padding: '2px 5px' }}>⌘K</span>} value={search} onChange={setSearch} />
        </div>
      </div>
    );
  },
};
