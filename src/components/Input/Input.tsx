// ============================================================
// Input — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg?node-id=281-17809
// ============================================================

import React from 'react';
import { colors, spacing, radii, typography } from '../../tokens/tokens';

export type InputSize  = 'S' | 'M' | 'L';
export type InputView  = 'input' | 'search' | 'textarea';
export type InputState = 'default' | 'hover' | 'focused' | 'error' | 'disabled' | 'readonly' | 'loading';
export type InputType  = 'text' | 'email' | 'password' | 'search' | 'number' | 'url' | 'tel';

export interface InputProps {
  /** Controlled value */
  value?: string;
  onChange?: (value: string) => void;
  /** View variant — search auto-adds the search icon prefix */
  view?: InputView;
  /** HTML input type */
  type?: InputType;
  /** Placeholder */
  placeholder?: string;
  /** Label shown above */
  label?: string;
  /** Info icon next to label */
  showInfoIcon?: boolean;
  /** Description above the input (below label) */
  descriptionAbove?: string;
  /** Helper text below */
  helperText?: string;
  /** Error message — also triggers error state */
  errorText?: string;
  /** Description below (below helper/error text) */
  descriptionBelow?: string;
  /** Size variant */
  size?: InputSize;
  /** Disabled */
  disabled?: boolean;
  /** Readonly */
  readOnly?: boolean;
  /** Required marker */
  required?: boolean;
  /** Custom prefix slot */
  prefix?: React.ReactNode;
  /** Custom suffix slot */
  suffix?: React.ReactNode;
  className?: string;
  id?: string;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZES: Record<InputSize, {
  height: number; fontSize: number; lineHeight: string;
  paddingH: number; labelSize: number; helperSize: number; gap: number;
}> = {
  S: { height: 32, fontSize: 12, lineHeight: '125%', paddingH: 10, labelSize: 12, helperSize: 11, gap: 4 },
  M: { height: 40, fontSize: 14, lineHeight: '140%', paddingH: 12, labelSize: 13, helperSize: 12, gap: 6 },
  L: { height: 48, fontSize: 16, lineHeight: '140%', paddingH: 14, labelSize: 14, helperSize: 12, gap: 8 },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="7" stroke={colors.g500} strokeWidth="1.2" />
    <rect x="7.3" y="6.5" width="1.4" height="5" rx=".7" fill={colors.g500} />
    <rect x="7.3" y="4" width="1.4" height="1.4" rx=".7" fill={colors.g500} />
  </svg>
);

const ErrorIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6" cy="6" r="5.5" stroke={colors.error300} strokeWidth="1.1" />
    <rect x="5.4" y="3" width="1.2" height="4" rx=".6" fill={colors.error300} />
    <rect x="5.4" y="8" width="1.2" height="1.2" rx=".6" fill={colors.error300} />
  </svg>
);

// ─── Wrapper border/shadow by state ──────────────────────────────────────────

function getWrapperStyle(
  hovered: boolean, focused: boolean, hasError: boolean,
  disabled: boolean, readOnly: boolean, size: InputSize
): React.CSSProperties {
  const cfg = SIZES[size];
  const base: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: spacing[8],
    height: cfg.height, borderRadius: radii.md,
    paddingLeft: cfg.paddingH, paddingRight: cfg.paddingH,
    background: colors.white, boxSizing: 'border-box',
    transition: 'border-color 0.12s, box-shadow 0.12s',
    cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
  };
  if (disabled) return { ...base, background: colors.g100, border: `1.5px solid ${colors.g200}` };
  if (readOnly) return { ...base, background: colors.g50, border: `1.5px solid ${colors.g200}` };
  if (hasError)  return { ...base, border: `1.5px solid ${colors.error300}`, boxShadow: focused ? '0 0 0 3px rgba(214,0,0,0.15)' : undefined };
  if (focused)   return { ...base, border: `1.5px solid ${colors.primary}`,  boxShadow: '0 0 0 3px rgba(65,60,195,0.2)' };
  if (hovered)   return { ...base, border: `1.5px solid ${colors.g300}` };
  return { ...base, border: `1.5px solid ${colors.g200}` };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input: React.FC<InputProps> = ({
  value = '',
  onChange,
  view = 'input',
  type = 'text',
  placeholder,
  label,
  showInfoIcon = false,
  descriptionAbove,
  helperText,
  errorText,
  descriptionBelow,
  size = 'M',
  disabled = false,
  readOnly = false,
  required = false,
  prefix,
  suffix,
  className,
  id,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const hasError = Boolean(errorText);
  const cfg = SIZES[size];
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  // Search view always shows the search icon as prefix (unless overridden)
  const resolvedPrefix = prefix ?? (view === 'search' ? <SearchIcon size={cfg.fontSize} /> : undefined);
  const resolvedType   = view === 'search' ? 'search' : type;

  const textColor = disabled ? colors.g400 : readOnly ? colors.g600 : colors.black;
  const iconColor = disabled ? colors.g400 : colors.g500;

  const metaStyle: React.CSSProperties = {
    fontFamily: typography.fontBody, fontSize: cfg.helperSize,
    lineHeight: '125%', color: colors.g500,
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: cfg.gap, width: '100%' }}>

      {/* Label row */}
      {(label || showInfoIcon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {label && (
            <label htmlFor={inputId} style={{
              fontFamily: typography.fontBody, fontSize: cfg.labelSize,
              fontWeight: 600, lineHeight: '140%',
              color: disabled ? colors.g400 : colors.black,
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {label}
              {required && <span style={{ color: colors.error300, fontSize: cfg.labelSize }}>*</span>}
            </label>
          )}
          {showInfoIcon && <InfoIcon />}
        </div>
      )}

      {/* Description above */}
      {descriptionAbove && (
        <span style={{ ...metaStyle, color: colors.g500 }}>{descriptionAbove}</span>
      )}

      {/* Input wrapper */}
      {view === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={inputId}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => !disabled && setHovered(false)}
          style={{
            ...getWrapperStyle(hovered, focused, hasError, disabled, readOnly, size),
            height: 'auto', minHeight: cfg.height * 2.5,
            padding: `${cfg.paddingH}px`,
            fontFamily: typography.fontBody, fontSize: cfg.fontSize,
            lineHeight: cfg.lineHeight, color: textColor,
            resize: 'vertical', outline: 'none',
          }}
        />
      ) : (
        <div
          style={getWrapperStyle(hovered, focused, hasError, disabled, readOnly, size)}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => !disabled && setHovered(false)}
          onClick={() => !disabled && !readOnly && inputRef.current?.focus()}
        >
          {resolvedPrefix && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: iconColor }}>
              {resolvedPrefix}
            </span>
          )}
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={inputId}
            type={resolvedType}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: typography.fontBody, fontSize: cfg.fontSize,
              lineHeight: cfg.lineHeight, color: textColor,
              cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
              minWidth: 0,
            }}
          />
          {suffix && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: iconColor }}>
              {suffix}
            </span>
          )}
        </div>
      )}

      {/* Helper / Error */}
      {(errorText || helperText) && (
        <span style={{ ...metaStyle, color: errorText ? colors.error300 : colors.g500, display: 'flex', alignItems: 'center', gap: 4 }}>
          {errorText && <ErrorIcon size={cfg.helperSize} />}
          {errorText || helperText}
        </span>
      )}

      {/* Description below */}
      {descriptionBelow && (
        <span style={{ ...metaStyle, color: colors.g500 }}>{descriptionBelow}</span>
      )}
    </div>
  );
};

export default Input;
