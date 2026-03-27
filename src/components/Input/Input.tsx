// ============================================================
// Input — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg
// ============================================================

import React from 'react';
import { colors, spacing, radii, typography } from '../../tokens/tokens';

export type InputSize = 'S' | 'M' | 'L';
export type InputState = 'default' | 'hover' | 'focused' | 'error' | 'disabled' | 'readonly';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'url' | 'tel';

export interface InputProps {
  /** Input value — controlled */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** HTML input type */
  type?: InputType;
  /** Placeholder text */
  placeholder?: string;
  /** Label shown above the input */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — also triggers error state */
  errorText?: string;
  /** Size variant */
  size?: InputSize;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readOnly?: boolean;
  /** Icon or text shown on the left inside the input */
  prefix?: React.ReactNode;
  /** Icon or text shown on the right inside the input */
  suffix?: React.ReactNode;
  /** Required field indicator */
  required?: boolean;
  /** Additional class name */
  className?: string;
  /** Input id — wires label htmlFor */
  id?: string;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZES: Record<InputSize, {
  height: number;
  fontSize: number;
  lineHeight: string;
  paddingH: number;
  paddingV: number;
  labelSize: number;
  helperSize: number;
  gap: number;
}> = {
  S: { height: 32, fontSize: 12, lineHeight: '125%', paddingH: 10, paddingV: 6,  labelSize: 12, helperSize: 11, gap: 4  },
  M: { height: 40, fontSize: 14, lineHeight: '140%', paddingH: 12, paddingV: 8,  labelSize: 13, helperSize: 12, gap: 6  },
  L: { height: 48, fontSize: 16, lineHeight: '140%', paddingH: 14, paddingV: 12, labelSize: 14, helperSize: 12, gap: 8  },
};

// ─── State → border/bg/shadow ─────────────────────────────────────────────────

function getWrapperStyle(
  state: InputState,
  hovered: boolean,
  focused: boolean,
  hasError: boolean,
  size: InputSize,
): React.CSSProperties {
  const cfg = SIZES[size];
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
    height: cfg.height,
    borderRadius: radii.md,
    paddingLeft: cfg.paddingH,
    paddingRight: cfg.paddingH,
    background: colors.white,
    boxSizing: 'border-box',
    transition: 'border-color 0.12s, box-shadow 0.12s',
    cursor: state === 'disabled' ? 'not-allowed' : state === 'readonly' ? 'default' : 'text',
  };

  if (state === 'disabled') {
    return { ...base, background: colors.g100, border: `1.5px solid ${colors.g200}` };
  }
  if (state === 'readonly') {
    return { ...base, background: colors.g50, border: `1.5px solid ${colors.g200}` };
  }
  if (hasError) {
    return {
      ...base,
      border: `1.5px solid ${colors.error300}`,
      boxShadow: focused ? `0 0 0 3px rgba(214,0,0,0.15)` : undefined,
    };
  }
  if (focused) {
    return {
      ...base,
      border: `1.5px solid ${colors.primary}`,
      boxShadow: `0 0 0 3px rgba(65,60,195,0.2)`,
    };
  }
  if (hovered) {
    return { ...base, border: `1.5px solid ${colors.g300}` };
  }
  return { ...base, border: `1.5px solid ${colors.g200}` };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input: React.FC<InputProps> = ({
  value = '',
  onChange,
  type = 'text',
  placeholder,
  label,
  helperText,
  errorText,
  size = 'M',
  disabled = false,
  readOnly = false,
  prefix,
  suffix,
  required = false,
  className,
  id,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const hasError = Boolean(errorText);
  const state: InputState = disabled ? 'disabled' : readOnly ? 'readonly' : hasError ? 'error' : 'default';
  const cfg = SIZES[size];
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const getTextColor = () => {
    if (disabled) return colors.g400;
    if (readOnly) return colors.g600;
    return colors.black;
  };

  const getPlaceholderColor = () => colors.g400;

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: cfg.gap, width: '100%' }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: typography.fontBody,
            fontSize: cfg.labelSize,
            fontWeight: 600,
            lineHeight: '140%',
            color: disabled ? colors.g400 : colors.black,
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {label}
          {required && (
            <span style={{ color: colors.error300, fontSize: cfg.labelSize }}>*</span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div
        style={getWrapperStyle(state, hovered, focused, hasError, size)}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
        onClick={() => !disabled && !readOnly && inputRef.current?.focus()}
      >
        {/* Prefix */}
        {prefix && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            color: disabled ? colors.g400 : colors.g500,
            fontSize: cfg.fontSize,
            fontFamily: typography.fontBody,
          }}>
            {prefix}
          </span>
        )}

        {/* Native input */}
        <input
          ref={inputRef}
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: typography.fontBody,
            fontSize: cfg.fontSize,
            lineHeight: cfg.lineHeight,
            color: getTextColor(),
            cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
            minWidth: 0,
            // Placeholder via CSS — inline workaround
          }}
        />

        {/* Suffix */}
        {suffix && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            color: disabled ? colors.g400 : colors.g500,
            fontSize: cfg.fontSize,
            fontFamily: typography.fontBody,
          }}>
            {suffix}
          </span>
        )}
      </div>

      {/* Helper / Error text */}
      {(errorText || helperText) && (
        <span style={{
          fontFamily: typography.fontBody,
          fontSize: cfg.helperSize,
          lineHeight: '125%',
          color: errorText ? colors.error300 : colors.g500,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {errorText && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="5.5" stroke={colors.error300} strokeWidth="1.1" />
              <rect x="5.4" y="3" width="1.2" height="4" rx=".6" fill={colors.error300} />
              <rect x="5.4" y="8" width="1.2" height="1.2" rx=".6" fill={colors.error300} />
            </svg>
          )}
          {errorText || helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
