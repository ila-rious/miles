// ============================================================
// InlineNotification stories — Miles Design System
// ============================================================

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InlineNotification } from './InlineNotification';
import { DoCard, DontCard, Grid2, SLabel, Divider, L, S, PC, C } from '../storyStyles';

const meta = {
  title: 'Components/InlineNotification',
  component: InlineNotification,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state:       { control: 'select', options: ['info','success','warning','error'], description: 'Visual style of the notification' },
    actions:     { control: 'radio',  options: ['inline','stacked'], description: 'inline = horizontal · stacked = buttons below' },
    title:       { control: 'text' },
    text:        { control: 'text' },
    dismissible: { control: 'boolean' },
    onDismiss:   { action: 'dismissed' },
  },
  args: {
    state: 'info',
    actions: 'inline',
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur.',
    dismissible: false,
  },
} satisfies Meta<typeof InlineNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_ACTIONS = [
  { label: 'Button', onClick: () => {}, variant: 'ghost'   as const },
  { label: 'Button', onClick: () => {}, variant: 'primary' as const },
];

// ════════════════════════════════════════════════════════════════════════════════
// PLAYGROUND
// ════════════════════════════════════════════════════════════════════════════════

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    const [state, setState]         = React.useState<'info'|'success'|'warning'|'error'>('info');
    const [actions, setActions]     = React.useState<'inline'|'stacked'>('inline');
    const [title, setTitle]         = React.useState('Lorem ipsum dolor sit amet');
    const [text, setText]           = React.useState('Lorem ipsum dolor sit amet, consectetur.');
    const [dismissible, setDismiss] = React.useState(false);
    const [showBtns, setShowBtns]   = React.useState(true);
    const [dismissed, setDismissed] = React.useState(false);

    const snippet = [
      `<InlineNotification`,
      `  state="${state}"`,
      `  actions="${actions}"`,
      title       ? `  title="${title}"` : null,
      text        ? `  text="${text}"` : null,
      showBtns    ? `  actionButtons={[...]}` : null,
      dismissible ? `  dismissible onDismiss={...}` : null,
      `/>`,
    ].filter(Boolean).join('\n');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '100vh' }}>
        <div style={L.playgroundPreview}>
          <div style={{ width: '100%', maxWidth: 560 }}>
            {dismissed ? (
              <div style={{ ...S.small, color: C.g400, textAlign: 'center', padding: 24 }}>
                Dismissed —{' '}
                <button onClick={() => setDismissed(false)} style={{ color: C.primary, background: 'none', border: 'none', cursor: 'pointer', ...S.small }}>show again</button>
              </div>
            ) : (
              <InlineNotification
                state={state}
                actions={actions}
                title={title || undefined}
                text={text || undefined}
                actionButtons={showBtns ? SAMPLE_ACTIONS : []}
                dismissible={dismissible}
                onDismiss={() => setDismissed(true)}
              />
            )}
          </div>
          <pre style={L.snippet}>{snippet}</pre>
        </div>
        <div style={L.playgroundControls}>
          <div style={{ ...S.body, fontWeight: 700, color: C.black, marginBottom: 24 }}>Controls</div>

          <div style={PC.row}>
            <span style={PC.label}>State</span>
            <div style={PC.btnGroup}>
              {(['info','success','warning','error'] as const).map(s => (
                <button key={s} style={PC.btn(state===s)} onClick={() => setState(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Actions layout</span>
            <div style={PC.btnGroup}>
              {(['inline','stacked'] as const).map(a => (
                <button key={a} style={PC.btn(actions===a)} onClick={() => setActions(a)}>{a}</button>
              ))}
            </div>
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Title</span>
            <input value={title} onChange={e => setTitle(e.target.value)} style={PC.textInput} />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Text</span>
            <input value={text} onChange={e => setText(e.target.value)} style={PC.textInput} />
          </div>

          <div style={PC.row}>
            <span style={PC.label}>Options</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Action buttons', val: showBtns,   set: setShowBtns },
                { label: 'Dismissible',    val: dismissible, set: (v: boolean) => { setDismiss(v); setDismissed(false); } },
              ].map(({ label: lbl, val, set }) => (
                <div key={lbl} style={PC.toggleRow}>
                  <span style={PC.toggleLabel}>{lbl}</span>
                  <div style={PC.miniToggle(val)} onClick={() => set(!val)}><div style={PC.thumb} /></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.g150}` }}>
            <button style={PC.resetBtn} onClick={() => { setState('info'); setActions('inline'); setTitle('Lorem ipsum dolor sit amet'); setText('Lorem ipsum dolor sit amet, consectetur.'); setDismiss(false); setShowBtns(true); setDismissed(false); }}>Reset</button>
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
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      {(['info','success','warning','error'] as const).map(state => (
        <div key={state}>
          <div style={{ ...S.label, marginBottom: 8 }}>{state}</div>
          <InlineNotification
            state={state}
            actions="inline"
            title="Lorem ipsum dolor sit amet"
            text="Lorem ipsum dolor sit amet, consectetur."
            actionButtons={SAMPLE_ACTIONS}
            dismissible
          />
        </div>
      ))}
    </div>
  ),
};

// ════════════════════════════════════════════════════════════════════════════════
// ACTIONS LAYOUT
// ════════════════════════════════════════════════════════════════════════════════

export const ActionsLayout: Story = {
  name: 'Actions layout',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 560 }}>
      <div>
        <div style={{ ...S.label, marginBottom: 8 }}>Inline — buttons alongside text</div>
        <InlineNotification
          state="info"
          actions="inline"
          title="Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur."
          actionButtons={SAMPLE_ACTIONS}
        />
      </div>
      <div>
        <div style={{ ...S.label, marginBottom: 8 }}>Stacked — buttons below text</div>
        <InlineNotification
          state="info"
          actions="stacked"
          title="Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur."
          actionButtons={SAMPLE_ACTIONS}
        />
      </div>
      <div>
        <div style={{ ...S.label, marginBottom: 8 }}>Dismissible — with close button</div>
        <InlineNotification
          state="warning"
          actions="inline"
          title="Your session will expire soon"
          text="Save your work to avoid losing changes."
          dismissible
          onDismiss={() => {}}
        />
      </div>
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

      <SLabel>Choosing the right state</SLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { state: 'info'    as const, title: 'Info',    desc: 'Neutral updates, tips, or announcements that don\'t require action.' },
          { state: 'success' as const, title: 'Success', desc: 'Confirmation that an action completed successfully.' },
          { state: 'warning' as const, title: 'Warning', desc: 'Potential issues the user should be aware of before proceeding.' },
          { state: 'error'   as const, title: 'Error',   desc: 'Something went wrong. Always explain what and how to fix it.' },
        ].map(({ state, title, desc }) => (
          <div key={state} style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: 16 }}>
              <InlineNotification state={state} title={title} text={desc} />
            </div>
          </div>
        ))}
      </div>

      <SLabel>Actions layout</SLabel>
      <Grid2>
        <DoCard note="Use inline when there is one short action and text is brief">
          <InlineNotification state="info" actions="inline" title="New version available" text="Refresh to update." actionButtons={[{ label: 'Refresh', onClick: () => {}, variant: 'primary' }]} />
        </DoCard>
        <DoCard note="Use stacked when there are two actions or text is long">
          <InlineNotification state="warning" actions="stacked" title="You have unsaved changes" text="Leaving this page will discard your changes." actionButtons={[{ label: 'Discard', onClick: () => {}, variant: 'ghost' }, { label: 'Save', onClick: () => {}, variant: 'primary' }]} />
        </DoCard>
      </Grid2>

      <SLabel>Content guidelines</SLabel>
      <Grid2>
        <DoCard note="Be specific — say what happened and what to do">
          <InlineNotification state="error" title="Payment failed" text="Your card was declined. Please update your payment method." actionButtons={[{ label: 'Update card', onClick: () => {}, variant: 'primary' }]} />
        </DoCard>
        <DontCard note="Don't be vague — the user can't act on 'An error occurred'">
          <InlineNotification state="error" title="Error" text="An error occurred. Please try again." />
        </DontCard>
      </Grid2>

      <Divider />

      <SLabel>When not to use</SLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { title: 'Toast notification', desc: 'For transient messages that auto-dismiss after a few seconds.' },
          { title: 'Modal dialog',        desc: 'When the user must acknowledge something before continuing.' },
          { title: 'Form validation',     desc: 'Use inline error text on the specific field instead.' },
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

// ════════════════════════════════════════════════════════════════════════════════
// EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

export const Examples: Story = {
  name: 'Examples',
  parameters: { controls: { disable: true } },
  render: () => {
    const [dismissed, setDismissed] = React.useState<Record<string,boolean>>({});
    const dismiss = (k: string) => setDismissed(d => ({...d,[k]:true}));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 600 }}>
        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Page-level announcements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!dismissed['update'] && (
              <InlineNotification state="info" actions="inline" title="Miles v2.1 is now available"
                text="New Button and Badge components added."
                actionButtons={[{ label: 'See what\'s new', onClick: () => {}, variant: 'primary' }]}
                dismissible onDismiss={() => dismiss('update')} />
            )}
            {!dismissed['plan'] && (
              <InlineNotification state="warning" actions="inline" title="Your trial ends in 3 days"
                text="Upgrade to keep access to all features."
                actionButtons={[{ label: 'View plans', onClick: () => {}, variant: 'ghost' }, { label: 'Upgrade', onClick: () => {}, variant: 'primary' }]}
                dismissible onDismiss={() => dismiss('plan')} />
            )}
            {(dismissed['update'] && dismissed['plan']) && (
              <div style={{ ...S.caption, color: C.g400, textAlign: 'center', padding: 16 }}>All dismissed — <button onClick={() => setDismissed({})} style={{ color: C.primary, background: 'none', border: 'none', cursor: 'pointer', ...S.caption }}>reset</button></div>
            )}
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Form context</div>
          <div style={{ background: C.white, border: `1px solid ${C.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InlineNotification state="error" actions="stacked" title="There are 2 errors in this form"
              text="Please fix the highlighted fields below before continuing."
              actionButtons={[{ label: 'Jump to first error', onClick: () => {}, variant: 'primary' }]} />
            <div style={{ ...S.small, color: C.g500, paddingTop: 4 }}>↓ form fields would appear here</div>
          </div>
        </div>

        <div>
          <div style={{ ...S.label, marginBottom: 12 }}>Confirmation</div>
          <InlineNotification state="success" actions="inline" title="Your changes have been saved"
            text="Last updated just now."
            dismissible onDismiss={() => {}} />
        </div>
      </div>
    );
  },
};
