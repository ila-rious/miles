// ============================================================
// Checkbox — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg?node-id=77-478
// ============================================================

import React from 'react';
import { colors, spacing, radii, typography } from '../../tokens/tokens';

export type CheckboxView = 'unselected' | 'selected' | 'indeterminate';
export type CheckboxSize = 'S' | 'M' | 'L';
export type CheckboxState = 'default' | 'hover' | 'focused' | 'disabled';

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Indeterminate state — some but not all children selected */
  indeterminate?: boolean;
  /** Size variant */
  size?: CheckboxSize;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Show info icon */
  showInfoIcon?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Additional class name */
  className?: string;
}

const SIZES: Record<CheckboxSize, { box: number; radius: number; fontSize: number; lineHeight: string }> = {
  S: { box: 16, radius: 3, fontSize: 12, lineHeight: '125%' },
  M: { box: 20, radius: 4, fontSize: 14, lineHeight: '140%' },
  L: { box: 20, radius: 4, fontSize: 16, lineHeight: '140%' },
};

const Checkmark = ({ size }: { size: number }) => (
  <svg width={size - 5} height={size - 7} viewBox="0 0 12 9" fill="none">
    <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dash = () => (
  <div style={{ width: 10, height: 2, background: colors.white, borderRadius: 1 }} />
);

const InfoIcon = ({ disabled }: { disabled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: 2 }}>
    <circle cx="8" cy="8" r="7" stroke={disabled ? colors.g400 : colors.g500} strokeWidth="1.2" />
    <rect x="7.3" y="6.5" width="1.4" height="5" rx=".7" fill={disabled ? colors.g400 : colors.g500} />
    <rect x="7.3" y="4" width="1.4" height="1.4" rx=".7" fill={disabled ? colors.g400 : colors.g500} />
  </svg>
);

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
