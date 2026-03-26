import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from './Checkbox';
import { colors, typography } from '../../tokens/tokens';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Checkboxes allow users to select zero, one, or multiple items from a list. Each checkbox works independently. Use radio buttons when only one selection is allowed; use a toggle when the action is immediate.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M', 'L'],
      description: 'S = 16px · M = 20px · L = 24px',
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    showInfoIcon: { control: 'boolean' },
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

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ──────────────────────────────────────────────────────────────────

export const Unselected: Story = {
  args: { checked: false, label: 'Unselected' },
};

export const Selected: Story = {
  args: { checked: true, label: 'Selected' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Indeterminate — some children selected' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled — not interactive' },
};

export const DisabledChecked: Story = {
  name: 'Disabled (checked)',
  args: { disabled: true, checked: true, label: 'Disabled checked' },
};

export const WithInfoIcon: Story = {
  name: 'With info icon',
  args: { showInfoIcon: true, label: 'With info icon' },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Sizes — S / M / L',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['S', 'M', 'L'] as const).map(size => (
        <Checkbox key={size} size={size} checked label={`Size ${size}`} />
      ))}
    </div>
  ),
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: { controls: { disable: true } },
  render: () => {
    const rows: { label: string; props: React.ComponentProps<typeof Checkbox> }[] = [
      { label: 'Unselected — default',     props: { checked: false } },
      { label: 'Selected — default',       props: { checked: true } },
      { label: 'Indeterminate — default',  props: { indeterminate: true } },
      { label: 'Disabled unselected',      props: { disabled: true, checked: false } },
      { label: 'Disabled selected',        props: { disabled: true, checked: true } },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rows.map(({ label, props }) => (
          <Checkbox key={label} {...props} label={label} />
        ))}
      </div>
    );
  },
};

// ─── Group / nesting example ──────────────────────────────────────────────────

export const NestedGroup: Story = {
  name: 'Nested group',
  parameters: { controls: { disable: true } },
  render: () => {
    const [parent, setParent] = React.useState<boolean | 'indeterminate'>('indeterminate');
    const [children, setChildren] = React.useState([true, false, true]);

    const toggle = (i: number) => {
      const next = [...children];
      next[i] = !next[i];
      setChildren(next);
      const all = next.every(Boolean);
      const none = next.every(v => !v);
      setParent(all ? true : none ? false : 'indeterminate');
    };

    const toggleAll = () => {
      const next = parent !== true;
      setChildren([next, next, next]);
      setParent(next);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          checked={parent === true}
          indeterminate={parent === 'indeterminate'}
          label="Notification preferences"
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Email', 'Push', 'SMS'].map((name, i) => (
            <Checkbox key={name} checked={children[i]} label={name} onChange={() => toggle(i)} />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Form example ─────────────────────────────────────────────────────────────

export const FormExample: Story = {
  name: 'Form example',
  parameters: { controls: { disable: true } },
  render: () => {
    const [vals, setVals] = React.useState({ digest: false, invites: true, terms: false });
    const toggle = (k: keyof typeof vals) => setVals(v => ({ ...v, [k]: !v[k] }));
    return (
      <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 340 }}>
        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: typography.fontBody, color: colors.black, marginBottom: 4 }}>
          Communication preferences
        </div>
        <Checkbox checked={vals.digest}  label="Send me the weekly digest"    onChange={() => toggle('digest')} />
        <Checkbox checked={vals.invites} label="Allow team invitations"       onChange={() => toggle('invites')} />
        <Checkbox checked={vals.terms}   label="I agree to the terms of use"  onChange={() => toggle('terms')} />
        <button
          style={{ marginTop: 4, background: colors.primary, color: colors.white, border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          Save preferences
        </button>
      </div>
    );
  },
};
