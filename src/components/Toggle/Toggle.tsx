// ============================================================
// Toggle — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg?node-id=5-10
// ============================================================

import React from 'react';
import { colors, spacing, radii, typography } from '../../tokens/tokens';

export type ToggleSize = 'S' | 'M' | 'L';
export type ToggleColor = 'purple' | 'green';
export type ToggleLabelAlign = 'left' | 'right';

export interface ToggleProps {
  /** Controlled on/off state */
  checked?: boolean;
  /** Size variant */
  size?: ToggleSize;
  /** Color variant — purple (default) for product settings, green for active/go-live states */
  color?: ToggleColor;
  /** Label position relative to the track */
  labelAlign?: ToggleLabelAlign;
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

// Track dimensions per size — Figma token spec
const SIZES: Record<ToggleSize, { trackW: number; trackH: number; thumb: number; fontSize: number; lineHeight: string }> = {
  S: { trackW: 28, trackH: 16, thumb: 12, fontSize: 12, lineHeight: '125%' },
  M: { trackW: 36, trackH: 20, thumb: 16, fontSize: 14, lineHeight: '140%' },
  L: { trackW: 44, trackH: 24, thumb: 20, fontSize: 16, lineHeight: '140%' },
};

// Track colors derived from Figma state specs
const TRACK_COLORS = {
  off: {
    default:  colors.g200,
    hover:    colors.g300,
    disabled: colors.g100,
  },
  on: {
    purple: {
      default:  colors.primary,
      hover:    colors.cyan700,
      disabled: colors.g100,
    },
    green: {
      default:  colors.green500,
      hover:    colors.green600,
      disabled: colors.g100,
    },
  },
} as const;

const InfoIcon = ({ disabled }: { disabled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: 2 }}>
    <circle cx="8" cy="8" r="7" stroke={disabled ? colors.g400 : colors.g500} strokeWidth="1.2" />
    <rect x="7.3" y="6.5" width="1.4" height="5" rx=".7" fill={disabled ? colors.g400 : colors.g500} />
    <rect x="7.3" y="4" width="1.4" height="1.4" rx=".7" fill={disabled ? colors.g400 : colors.g500} />
  </svg>
);

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  size = 'M',
  color = 'purple',
  labelAlign = 'right',
  disabled = false,
  label,
  showInfoIcon = false,
  onChange,
  className,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const cfg = SIZES[size];

  // Resolve track color from state matrix
  const getTrackColor = (): string => {
    if (disabled) return checked ? TRACK_COLORS.on[color].disabled : TRACK_COLORS.off.disabled;
    if (checked) return hovered ? TRACK_COLORS.on[color].hover : TRACK_COLORS.on[color].default;
    return hovered ? TRACK_COLORS.off.hover : TRACK_COLORS.off.default;
  };

  const getLabelColor = (): string => {
    if (disabled) return colors.g400;
    if (hovered) return colors.black;
    return colors.g600;
  };

  const getTrackStyle = (): React.CSSProperties => ({
    position: 'relative',
    width: cfg.trackW,
    height: cfg.trackH,
    borderRadius: radii.full,
    background: getTrackColor(),
    border: disabled ? `1px solid ${colors.g200}` : undefined,
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: checked ? 'flex-end' : 'flex-start',
    flexShrink: 0,
    transition: 'background 0.2s, border-color 0.2s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
  });

  const getThumbStyle = (): React.CSSProperties => ({
    width: cfg.thumb,
    height: cfg.thumb,
    borderRadius: '50%',
    background: colors.white,
    flexShrink: 0,
    transition: 'transform 0.2s',
  });

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const trackEl = (
    <div style={getTrackStyle()} aria-hidden>
      <div style={getThumbStyle()} />
    </div>
  );

  const labelEl = label ? (
    <span style={{
      fontFamily: typography.fontBody,
      fontSize: cfg.fontSize,
      lineHeight: cfg.lineHeight,
      color: getLabelColor(),
      userSelect: 'none',
    }}>
      {label}
    </span>
  ) : null;

  const infoEl = showInfoIcon ? <InfoIcon disabled={disabled} /> : null;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[8],
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        aria-label={label}
        aria-checked={checked}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />

      {labelAlign === 'left' && (
        <>
          {trackEl}
          {labelEl}
          {infoEl}
        </>
      )}

      {labelAlign === 'right' && (
        <>
          {labelEl}
          {infoEl}
          {trackEl}
        </>
      )}
    </div>
  );
};

export default Toggle;
