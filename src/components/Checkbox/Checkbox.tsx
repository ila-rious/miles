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
  size = 'M',
  disabled = false,
  label,
  showInfoIcon = false,
  onChange,
  className,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const cfg = SIZES[size];

  // Derive box styles from state + view — tokens from Figma
  const getBoxStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: cfg.box,
      height: cfg.box,
      borderRadius: cfg.radius,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.12s',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxSizing: 'border-box',
    };

    if (disabled) {
      return checked || indeterminate
        ? { ...base, background: colors.g300 }
        : { ...base, background: colors.g100, border: `1.5px solid ${colors.g200}` };
    }

    if (checked || indeterminate) {
      return {
        ...base,
        background: colors.primary,
        boxShadow: focused ? `0 0 0 3px rgba(65,60,195,0.2)` : undefined,
      };
    }

    // Unselected
    if (focused) return { ...base, border: `1.5px solid ${colors.g300}`, background: colors.white, boxShadow: '0 0 0 3px rgba(65,60,195,0.2)' };
    if (hovered) return { ...base, border: `1.5px solid ${colors.g300}`, background: colors.white };
    return { ...base, border: `1.5px solid ${colors.g200}`, background: colors.white };
  };

  const getLabelColor = (): string => {
    if (disabled) return colors.g400;
    if (hovered || focused) return colors.black;
    return colors.g600;
  };

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: spacing[8], cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        aria-label={label}
      />

      {/* Visual box */}
      <div style={getBoxStyle()}>
        {indeterminate && !disabled && <Dash />}
        {indeterminate && disabled && <Dash />}
        {checked && !indeterminate && <Checkmark size={cfg.box} />}
      </div>

      {/* Label */}
      {label && (
        <span style={{
          fontFamily: typography.fontBody,
          fontSize: cfg.fontSize,
          lineHeight: cfg.lineHeight,
          color: getLabelColor(),
          userSelect: 'none',
        }}>
          {label}
        </span>
      )}

      {/* Info icon */}
      {showInfoIcon && <InfoIcon disabled={disabled} />}
    </div>
  );
};

export default Checkbox;
