import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from './Input';
import { DoCard, DontCard, Grid2, SLabel, Divider, L, S, PC, C } from '../storyStyles';

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon  = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7C1 7 3 3 7 3s6 4 6 4-2 4-6 4S1 7 1 7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>;
const MailIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const LockIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    view:            { control: 'radio',  options: ['input','search','textarea'] },
    size:            { control: 'radio',  options: ['S','M','L'] },
    type:            { control: 'select', options: ['text','email','password','number','url','tel'] },
    disabled:        { control: 'boolean' },
    readOnly:        { control: 'boolean' },
    required:        { control: 'boolean' },
    showInfoIcon:    { control: 'boolean' },
    label:           { control: 'text' },
    placeholder:     { control: 'text' },
    descriptionAbove:{ control: 'text' },
    helperText:      { control: 'text' },
    errorText:       { control: 'text' },
    descriptionBelow:{ control: 'text' },
    onChange:        { action: 'changed' },
  },
  args: { view:'input', size:'M', type:'text', label:'Label', placeholder:'Placeholder text', descriptionAbove:'', helperText:'', errorText:'', descriptionBelow:'', disabled:false, readOnly:false, required:false, showInfoIcon:false },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    const [value, setValue]           = React.useState('');
    const [view, setView]             = React.useState<'input'|'search'|'textarea'>('input');
    const [size, setSize]             = React.useState<'S'|'M'|'L'>('M');
    const [type, setType]             = React.useState<'text'|'email'|'password'|'number'>('text');
    const [label, setLabel]           = React.useState('Label');
    const [placeholder, setPlaceholder] = React.useState('Placeholder text');
    const [descAbove, setDescAbove]   = React.useState('');
    const [helperText, setHelperText] = React.useState('');
    const [errorText, setErrorText]   = React.useState('');
    const [descBelow, setDescBelow]   = React.useState('');
    const [disabled, setDisabled]     = React.useState(false);
    const [readOnly, setReadOnly]     = React.useState(false);
    const [required, setRequired]     = React.useState(false);
    const [infoIcon, setInfoIcon]     = React.useState(false);
    const [showSuffix, setShowSuffix] = React.useState(false);

    const snippetLines = [
      `<Input`,
      `  view="${view}"`,
      `  size="${size}"`,
      view==='input' ? `  type="${type}"` : null,
      label        ? `  label="${label}"` : null,
      infoIcon     ? `  showInfoIcon` : null,
      descAbove    ? `  descriptionAbove="${descAbove}"` : null,
      placeholder  ? `  placeholder="${placeholder}"` : null,
      helperText   ? `  helperText="${helperText}"` : null,
      errorText    ? `  errorText="${errorText}"` : null,
      descBelow    ? `  descriptionBelow="${descBelow}"` : null,
      disabled     ? `  disabled` : null,
      readOnly     ? `  readOnly` : null,
      required     ? `  required` : null,
      showSuffix   ? `  suffix={<EyeIcon />}` : null,
      `/>`,
    ].filter(Boolean).join('\n');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh' }}>
        <div style={L.playgroundPreview}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Input view={view} size={size} type={view==='input'?type:'text'} value={value} onChange={setValue}
              label={label||undefined} showInfoIcon={infoIcon}
              descriptionAbove={descAbove||undefined} placeholder={placeholder||undefined}
              helperText={helperText||undefined} errorText={errorText||undefined}
              descriptionBelow={descBelow||undefined}
              disabled={disabled} readOnly={readOnly} required={required}
              suffix={showSuffix?<EyeIcon />:undefined}
            />
          </div>
          <pre style={L.snippet}>{snippetLines}</pre>
        </div>

        <div style={L.playgroundControls}>
          <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={PC.row}>
            <span style={PC.label}>View</span>
            <div style={PC.btnGroup}>
              {(['input','search','textarea'] as const).map(v => <button key={v} style={PC.btn(view===v)} onClick={() => setView(v)}>{v}</button>)}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Size</span>
            <div style={PC.btnGroup}>
              {(['S','M','L'] as const).map(s => <button key={s} style={PC.btn(size===s)} onClick={() => setSize(s)}>{s}</button>)}
            </div>
          </div>

          {view==='input' && (
            <div style={PC.row}>
              <span style={PC.label}>Type</span>
              <div style={PC.btnGroup}>
                {(['text','email','password','number'] as const).map(t => <button key={t} style={PC.btn(type===t)} onClick={() => setType(t)}>{t}</button>)}
              </div>
            </div>
          )}

          <div style={PC.row}>
            <span style={PC.label}>Label</span>
            <input value={label} onChange={e => setLabel(e.target.value)} style={PC.textInput} placeholder="Label text" />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Description above</span>
            <input value={descAbove} onChange={e => setDescAbove(e.target.value)} style={PC.textInput} placeholder="Above the input" />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Placeholder</span>
            <input value={placeholder} onChange={e => setPlaceholder(e.target.value)} style={PC.textInput} />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Helper text</span>
            <input value={helperText} onChange={e => { setHelperText(e.target.value); if(e.target.value) setErrorText(''); }} style={PC.textInput} placeholder="Below the input" />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Error text</span>
            <input value={errorText} onChange={e => { setErrorText(e.target.value); if(e.target.value) setHelperText(''); }} style={PC.textInput} placeholder="Triggers error state" />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Description below</span>
            <input value={descBelow} onChange={e => setDescBelow(e.target.value)} style={PC.textInput} placeholder="Below helper/error" />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Toggles</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label:'Info icon',   val:infoIcon,    set:setInfoIcon },
                { label:'Suffix icon', val:showSuffix,  set:setShowSuffix },
                { label:'Required',    val:required,    set:setRequired },
                { label:'Disabled',    val:disabled,    set:(v:boolean)=>{ setDisabled(v); if(v) setReadOnly(false); } },
                { label:'Read only',   val:readOnly,    set:(v:boolean)=>{ setReadOnly(v); if(v) setDisabled(false); } },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={PC.toggleRow}>
                  <span style={PC.toggleLabel}>{lbl}</span>
                  <div style={PC.miniToggle(val)} onClick={() => set(!val)}><div style={PC.thumb} /></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button style={PC.resetBtn} onClick={() => { setValue(''); setView('input'); setSize('M'); setType('text'); setLabel('Label'); setPlaceholder('Placeholder text'); setDescAbove(''); setHelperText(''); setErrorText(''); setDescBelow(''); setDisabled(false); setReadOnly(false); setRequired(false); setInfoIcon(false); setShowSuffix(false); }}>Reset</button>
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
    const [vals, setVals] = React.useState<Record<string,string>>({ default:'', error:'invalid@', readonly:'Read only value', disabled:'' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <Input label="Default" placeholder="Type something..." value={vals.default} onChange={v => setVals(p => ({...p,default:v}))} />
        <Input label="With description" descriptionAbove="Description adding to this component" placeholder="Placeholder text" descriptionBelow="Description adding to this component" showInfoIcon value={vals.default} onChange={v => setVals(p => ({...p,default:v}))} />
        <Input label="Error" errorText="Please enter a valid email address" value={vals.error} onChange={v => setVals(p => ({...p,error:v}))} />
        <Input label="Read only" readOnly value={vals.readonly} onChange={() => {}} />
        <Input label="Disabled" placeholder="Not available" disabled value={vals.disabled} onChange={() => {}} />
        <Input label="With helper" type="password" helperText="Must be at least 8 characters" placeholder="••••••••" value="" onChange={() => {}} />
        <Input view="search" label="Search" placeholder="Search..." value="" onChange={() => {}} />
        <Input view="textarea" label="Message" placeholder="Write your message..." value="" onChange={() => {}} />
      </div>
    );
  },
};

// ─── Views ────────────────────────────────────────────────────────────────────

export const Views: Story = {
  name: 'Views',
  parameters: { controls: { disable: true } },
  render: () => {
    const [vals, setVals] = React.useState({ input:'', search:'', textarea:'' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <Input view="input" label="Text input" placeholder="Standard text input" value={vals.input} onChange={v => setVals(p => ({...p,input:v}))} />
        <Input view="search" label="Search" placeholder="Search icon appears automatically..." value={vals.search} onChange={v => setVals(p => ({...p,search:v}))} />
        <Input view="textarea" label="Textarea" placeholder="Multiline text input..." value={vals.textarea} onChange={v => setVals(p => ({...p,textarea:v}))} />
      </div>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => {
    const [vals, setVals] = React.useState({ S:'', M:'', L:'' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        {(['S','M','L'] as const).map(size => (
          <Input key={size} size={size} label={`Size ${size} — ${size==='S'?'32px':size==='M'?'40px':'48px'}`} placeholder="Placeholder text" value={vals[size]} onChange={v => setVals(p => ({...p,[size]:v}))} />
        ))}
      </div>
    );
  },
};

// ─── Prefix & Suffix ──────────────────────────────────────────────────────────

export const Slots: Story = {
  name: 'Prefix & Suffix',
  parameters: { controls: { disable: true } },
  render: () => {
    const [vals, setVals] = React.useState({ a:'',b:'',c:'',d:'' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <Input label="Email" placeholder="you@example.com" prefix={<MailIcon />} value={vals.a} onChange={v => setVals(p => ({...p,a:v}))} />
        <Input label="Password" type="password" placeholder="••••••••" prefix={<LockIcon />} suffix={<EyeIcon />} value={vals.b} onChange={v => setVals(p => ({...p,b:v}))} />
        <Input label="Amount" placeholder="0.00" prefix={<span style={{ ...S.small, color: C.g500 }}>£</span>} suffix={<span style={{ ...S.caption, color: C.g400 }}>GBP</span>} value={vals.c} onChange={v => setVals(p => ({...p,c:v}))} />
        <Input label="Shortcut" view="search" placeholder="Search..." suffix={<span style={{ ...S.caption, color: C.g400, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 4, padding: '2px 5px' }}>⌘K</span>} value={vals.d} onChange={v => setVals(p => ({...p,d:v}))} />
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
      <SLabel>Labels</SLabel>
      <Grid2>
        <DoCard note="Always use a visible label — never rely on placeholder alone">
          <Input label="Email address" placeholder="you@example.com" value="" onChange={() => {}} />
        </DoCard>
        <DontCard note="Placeholder disappears when the user starts typing">
          <Input placeholder="Email address" value="" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <SLabel>Error messages</SLabel>
      <Grid2>
        <DoCard note="Specific, actionable error message">
          <Input label="Email" value="notanemail" errorText="Enter a valid email like you@example.com" onChange={() => {}} />
        </DoCard>
        <DontCard note="Vague errors don't help the user fix the problem">
          <Input label="Email" value="notanemail" errorText="Invalid" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <SLabel>Helper & description</SLabel>
      <Grid2>
        <DoCard note="Description above sets context, helper below sets expectations">
          <Input label="Password" type="password" descriptionAbove="Choose a strong password" placeholder="••••••••" helperText="At least 8 characters including a number" showInfoIcon value="" onChange={() => {}} />
        </DoCard>
        <DontCard note="Don't repeat the label in helper text">
          <Input label="Email address" placeholder="Enter your email" helperText="Enter your email address here" value="" onChange={() => {}} />
        </DontCard>
      </Grid2>

      <Divider />

      <SLabel>Required fields</SLabel>
      <Grid2>
        <DoCard note="Mark required with * and explain at the top of the form">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={S.caption}>* Required fields</span>
            <Input label="Full name" required value="" onChange={() => {}} placeholder="Jane Smith" />
            <Input label="Email" required value="" onChange={() => {}} placeholder="you@example.com" />
            <Input label="Company" value="" onChange={() => {}} placeholder="Optional" />
          </div>
        </DoCard>
        <DontCard note="Don't mark every field as required">
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

// ─── Examples ─────────────────────────────────────────────────────────────────

export const Examples: Story = {
  name: 'Examples',
  parameters: { controls: { disable: true } },
  render: () => {
    const [login, setLogin] = React.useState({ email:'', password:'' });
    const [errors, setErrors] = React.useState({ email:'', password:'' });
    const [profile, setProfile] = React.useState({ name:'', company:'', bio:'' });
    const [search, setSearch] = React.useState('');

    const validateLogin = () => setErrors({
      email:    !login.email.includes('@') ? 'Enter a valid email address like you@example.com' : '',
      password: login.password.length<8    ? 'Password must be at least 8 characters' : '',
    });

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Login form</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ ...S.body, fontWeight: 700, color: C.black, fontSize: 18 }}>Sign in</div>
            <Input label="Email" type="email" placeholder="you@example.com" prefix={<MailIcon />} value={login.email} onChange={v => setLogin(p => ({...p,email:v}))} errorText={errors.email} required />
            <Input label="Password" type="password" placeholder="••••••••" prefix={<LockIcon />} suffix={<EyeIcon />} value={login.password} onChange={v => setLogin(p => ({...p,password:v}))} errorText={errors.password} helperText={errors.password?'':'At least 8 characters'} required />
            <button onClick={validateLogin} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 18px', ...S.small, fontWeight: 700, cursor: 'pointer' }}>Sign in</button>
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Profile settings</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ ...S.body, fontWeight: 700, color: C.black, fontSize: 18 }}>Edit profile</div>
            <Input label="Display name" placeholder="Jane Smith" required value={profile.name} onChange={v => setProfile(p => ({...p,name:v}))} />
            <Input label="Company" placeholder="Trumpet" value={profile.company} onChange={v => setProfile(p => ({...p,company:v}))} />
            <Input view="textarea" label="Bio" descriptionAbove="Tell us a bit about yourself" placeholder="I'm a product designer..." value={profile.bio} onChange={v => setProfile(p => ({...p,bio:v}))} helperText="Max 200 characters" />
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex:1, background:C.primary, color:C.white, border:'none', borderRadius:8, padding:'10px', ...S.small, fontWeight:700, cursor:'pointer' }}>Save</button>
              <button style={{ flex:1, background:'transparent', color:C.primary, border:`1.5px solid ${C.primary}`, borderRadius:8, padding:'10px', ...S.small, fontWeight:700, cursor:'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ ...S.label, marginBottom: 12 }}>Search</div>
          <Input view="search" size="L" placeholder="Search components, tokens, guidelines..."
            suffix={search
              ? <button onClick={() => setSearch('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.g400, fontSize:16, lineHeight:1, padding:0 }}>×</button>
              : <span style={{ ...S.caption, color:C.g400, background:C.g100, border:`1px solid ${C.g200}`, borderRadius:4, padding:'2px 5px' }}>⌘K</span>
            }
            value={search} onChange={setSearch}
          />
        </div>
      </div>
    );
  },
};
