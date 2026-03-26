import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './Toggle';
import { colors, typography } from '../../tokens/tokens';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toggles switch between two mutually exclusive states — on and off — and take effect immediately without a confirmation step. Use a checkbox instead when the action requires a form submission.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M', 'L'],
      description: 'S = 28×16px · M = 36×20px · L = 44×24px',
    },
    color: {
      control: 'radio',
      options: ['purple', 'green'],
      description: 'purple = product settings · green = active / go-live states',
    },
    labelAlign: {
      control: 'radio',
      options: ['left', 'right'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    showInfoIcon: { control: 'boolean' },
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

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Color variants ───────────────────────────────────────────────────────────

export const Purple: Story = {
  args: { color: 'purple', checked: true, label: 'Show sidebar' },
};

export const Green: Story = {
  args: { color: 'green', checked: true, label: 'Campaign active' },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const OffDefault: Story = {
  name: 'Off — default',
  args: { checked: false, label: 'Email notifications' },
};

export const OnDefault: Story = {
  name: 'On — default (purple)',
  args: { checked: true, label: 'Dark mode' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledOn: Story = {
  name: 'Disabled (on)',
  args: { disabled: true, checked: true, label: 'Disabled on' },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Sizes — S / M / L',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['S', 'M', 'L'] as const).map(size => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Toggle size={size} checked={false} label={`${size} — off`} />
          <Toggle size={size} checked={true}  label={`${size} — on`}  color="purple" />
          <Toggle size={size} checked={true}  label={`${size} — on`}  color="green"  />
        </div>
      ))}
    </div>
  ),
};

// ─── Both color variants ──────────────────────────────────────────────────────

export const ColorVariants: Story = {
  name: 'Color variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 11, fontFamily: typography.fontBody, color: colors.g500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Purple — product settings
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle color="purple" checked={true}  label="Show sidebar" />
          <Toggle color="purple" checked={false} label="Compact view" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: typography.fontBody, color: colors.g500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Green — active / go-live states
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle color="green" checked={true}  label="Campaign active" />
          <Toggle color="green" checked={false} label="Integration enabled" />
        </div>
      </div>
    </div>
  ),
};

// ─── Label alignment ──────────────────────────────────────────────────────────

export const LabelAlignment: Story = {
  name: 'Label alignment',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle labelAlign="left"  checked={true}  label="Label on the left (default)" />
      <Toggle labelAlign="right" checked={false} label="Label on the right" />
      <Toggle labelAlign="left"  checked={true}  label="With info icon" showInfoIcon />
    </div>
  ),
};

// ─── Settings panel example ───────────────────────────────────────────────────

export const SettingsPanel: Story = {
  name: 'Settings panel',
  parameters: { controls: { disable: true } },
  render: () => {
    const [settings, setSettings] = React.useState({
      darkMode:      true,
      sidebar:       true,
      compactView:   false,
      notifications: false,
    });
    const toggle = (k: keyof typeof settings) =>
      setSettings(s => ({ ...s, [k]: !s[k] }));

    return (
      <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, padding: 24, maxWidth: 320 }}>
        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: typography.fontBody, color: colors.black, marginBottom: 20 }}>
          Appearance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { key: 'darkMode',      label: 'Dark mode',           color: 'purple' as const },
            { key: 'sidebar',       label: 'Show sidebar',        color: 'purple' as const },
            { key: 'compactView',   label: 'Compact view',        color: 'purple' as const },
            { key: 'notifications', label: 'Push notifications',  color: 'purple' as const },
          ].map(({ key, label, color }, i, arr) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.g150}` : undefined,
              }}
            >
              <span style={{ fontSize: 14, fontFamily: typography.fontBody, color: colors.g600 }}>{label}</span>
              <Toggle
                color={color}
                checked={settings[key as keyof typeof settings]}
                onChange={() => toggle(key as keyof typeof settings)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ─── Go-live panel example ────────────────────────────────────────────────────

export const GoLivePanel: Story = {
  name: 'Go-live panel (green)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [active, setActive] = React.useState({ email: true, linkedin: false, hubspot: true });
    const toggle = (k: keyof typeof active) => setActive(s => ({ ...s, [k]: !s[k] }));
    return (
      <div style={{ background: colors.white, border: `1px solid ${colors.g200}`, borderRadius: 12, padding: 24, maxWidth: 320 }}>
        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: typography.fontBody, color: colors.black, marginBottom: 20 }}>
          Active integrations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {(['email', 'linkedin', 'hubspot'] as const).map((k, i, arr) => (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.g150}` : undefined,
              }}
            >
              <span style={{ fontSize: 14, fontFamily: typography.fontBody, color: colors.g600, textTransform: 'capitalize' }}>{k}</span>
              <Toggle
                color="green"
                checked={active[k]}
                onChange={() => toggle(k)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
