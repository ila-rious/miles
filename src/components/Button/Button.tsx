// ============================================================
// Button — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg?node-id=364-2619
// ============================================================

import React from 'react';
import { colors, textStyles } from '../../tokens/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize    = 'L' | 'M' | 'S' | 'XS' | 'XXS';
export type ButtonMode    = 'light' | 'dark';

export interface ButtonProps {
  /** Button label */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size */
  size?: ButtonSize;
  /** Light or dark mode */
  mode?: ButtonMode;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Icon before label */
  iconBefore?: React.ReactNode;
  /** Icon after label */
  iconAfter?: React.ReactNode;
  /** Icon-only button (no label, square) */
  iconOnly?: React.ReactNode;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Full width */
  fullWidth?: boolean;
  className?: string;
  /** aria-label for icon-only buttons */
  'aria-label'?: string;
}

// ─── Size tokens — from Figma measurements ───────────────────────────────────

const SIZES: Record<ButtonSize, {
  height: number;
  paddingH: number;
  paddingV: number;
  fontSize: number;
  fontWeight: number;
  lineHeight: string;
  iconSize: number;
  gap: number;
}> = {
  L:   { height: 48, paddingH: 20, paddingV: 12, fontSize: 16, fontWeight: 600, lineHeight: '140%', iconSize: 20, gap: 8 },
  M:   { height: 40, paddingH: 16, paddingV: 10, fontSize: 14, fontWeight: 600, lineHeight: '140%', iconSize: 16, gap: 6 },
  S:   { height: 32, paddingH: 12, paddingV: 8,  fontSize: 14, fontWeight: 400, lineHeight: '140%', iconSize: 16, gap: 6 },
  XS:  { height: 24, paddingH: 8,  paddingV: 4,  fontSize: 12, fontWeight: 400, lineHeight: '125%', iconSize: 14, gap: 4 },
  XXS: { height: 20, paddingH: 6,  paddingV: 2,  fontSize: 12, fontWeight: 400, lineHeight: '125%', iconSize: 12, gap: 4 },
};

// ─── Variant tokens — from Figma state specs ─────────────────────────────────

type VariantTokens = {
  bg:          string;
  bgHover:     string;
  bgDisabled:  string;
  color:       string;
  colorDisabled: string;
  border?:     string;
  borderHover?: string;
  borderDisabled?: string;
  focusRing:   string;
};

const VARIANTS: Record<ButtonVariant, VariantTokens> = {
  primary: {
    bg:             colors.primary,          // #413cc3
    bgHover:        '#2f2aa2',
    bgDisabled:     colors.g200,
    color:          colors.white,
    colorDisabled:  colors.g400,
    focusRing:      'rgba(65,60,195,0.3)',
  },
  secondary: {
    bg:             'rgba(245,73,102,1)',     // brand pink/red
    bgHover:        'rgba(220,50,80,1)',
    bgDisabled:     colors.g200,
    color:          colors.white,
    colorDisabled:  colors.g400,
    focusRing:      'rgba(245,73,102,0.3)',
  },
  outline: {
    bg:             'transparent',
    bgHover:        colors.white,
    bgDisabled:     'transparent',
    color:          colors.primary,
    colorDisabled:  colors.g400,
    border:         '#cccaf6',               // P200
    borderHover:    '#8682d9',               // P300
    borderDisabled: colors.g200,
    focusRing:      'rgba(65,60,195,0.2)',
  },
  ghost: {
    bg:             'transparent',
    bgHover:        colors.p100,             // #f2f2fd
    bgDisabled:     'transparent',
    color:          colors.primary,
    colorDisabled:  colors.g400,
    focusRing:      'rgba(65,60,195,0.2)',
  },
  destructive: {
    bg:             'transparent',
    bgHover:        colors.error100,         // #ffebeb
    bgDisabled:     'transparent',
    color:          colors.error300,         // #d60000
    colorDisabled:  colors.g400,
    focusRing:      'rgba(214,0,0,0.2)',
  },
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    style={{ animation: 'miles-spin 0.8s linear infinite', flexShrink: 0 }}
  >
    <style>{`@keyframes miles-spin { to { transform: rotate(360deg); } }`}</style>
    <circle cx="8" cy="8" r="6" stroke={color} strokeOpacity="0.25" strokeWidth="2" />
    <path d="M14 8a6 6 0 0 0-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const Button: React.FC<ButtonProps> = ({
  children,
  variant   = 'primary',
  size      = 'M',
  mode      = 'light',
  disabled  = false,
  loading   = false,
  iconBefore,
  iconAfter,
  iconOnly,
  onClick,
  type      = 'button',
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}) => {
  const [hovered, setHovered]   = React.useState(false);
  const [focused, setFocused]   = React.useState(false);
  const isDisabled = disabled || loading;

  const cfg = SIZES[size];
  const v   = VARIANTS[variant];

  const getBg = () => {
    if (isDisabled) return v.bgDisabled;
    if (hovered || focused) return v.bgHover;
    return v.bg;
  };

  const getColor = () => {
    if (isDisabled) return v.colorDisabled;
    return v.color;
  };

  const getBorder = () => {
    if (!v.border) return undefined;
    if (isDisabled) return `1.5px solid ${v.borderDisabled ?? colors.g200}`;
    if (hovered || focused) return `1.5px solid ${v.borderHover ?? v.border}`;
    return `1.5px solid ${v.border}`;
  };

  const getBoxShadow = () => {
    if (focused && !isDisabled) return `0 0 0 3px ${v.focusRing}`;
    return undefined;
  };

  const style: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            cfg.gap,
    height:         cfg.height,
    paddingLeft:    iconOnly ? cfg.paddingV : cfg.paddingH,
    paddingRight:   iconOnly ? cfg.paddingV : cfg.paddingH,
    width:          fullWidth ? '100%' : iconOnly ? cfg.height : undefined,
    borderRadius:   8,
    border:         getBorder() ?? 'none',
    background:     getBg(),
    color:          getColor(),
    fontFamily:     '"Public Sans", sans-serif',
    fontSize:       cfg.fontSize,
    fontWeight:     cfg.fontWeight,
    lineHeight:     cfg.lineHeight,
    cursor:         isDisabled ? 'not-allowed' : 'pointer',
    transition:     'background 0.12s, border-color 0.12s, box-shadow 0.12s, color 0.12s',
    boxShadow:      getBoxShadow(),
    boxSizing:      'border-box',
    outline:        'none',
    userSelect:     'none',
    whiteSpace:     'nowrap',
    opacity:        mode === 'dark' && isDisabled ? 0.4 : undefined,
  };

  const iconColor = getColor();

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? String(children) : undefined)}
      aria-busy={loading}
      className={className}
      style={style}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => !isDisabled && setHovered(false)}
      onFocus={()  => setFocused(true)}
      onBlur={()   => setFocused(false)}
    >
      {loading ? (
        <Spinner size={cfg.iconSize} color={iconColor} />
      ) : iconOnly ? (
        <span style={{ display: 'flex', alignItems: 'center', color: iconColor, fontSize: cfg.iconSize }}>{iconOnly}</span>
      ) : (
        <>
          {iconBefore && <span style={{ display: 'flex', alignItems: 'center', color: iconColor, fontSize: cfg.iconSize, flexShrink: 0 }}>{iconBefore}</span>}
          <span>{children}</span>
          {iconAfter  && <span style={{ display: 'flex', alignItems: 'center', color: iconColor, fontSize: cfg.iconSize, flexShrink: 0 }}>{iconAfter}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
