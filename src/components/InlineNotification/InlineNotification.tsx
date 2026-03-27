// ============================================================
// InlineNotification — Miles Design System
// Figma: https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg?node-id=2615-18691
// ============================================================

import React from 'react';
import { colors, textStyles } from '../../tokens/tokens';
import { Button } from '../Button';

export type NotificationState   = 'info' | 'success' | 'warning' | 'error';
export type NotificationActions = 'inline' | 'stacked';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';
}

export interface InlineNotificationProps {
  /** The visual style of the notification */
  state?: NotificationState;
  /** Layout mode: inline (horizontal) or stacked (vertical with buttons below) */
  actions?: NotificationActions;
  /** Main title text */
  title?: string;
  /** Descriptive body text */
  text?: string;
  /** Action buttons — max 2 */
  actionButtons?: NotificationAction[];
  /** Whether to show a close button */
  dismissible?: boolean;
  /** Callback when close button is clicked */
  onDismiss?: () => void;
  className?: string;
}

// ─── State tokens — derived from Figma spec ──────────────────────────────────

const STATE_STYLES: Record<NotificationState, {
  bg: string;
  border: string;
  iconColor: string;
  icon: React.ReactNode;
}> = {
  info: {
    bg:        'rgba(235,243,253,1)',
    border:    'rgba(196,218,250,1)',
    iconColor: '#3c83ee',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill="rgba(60,131,238,1)" />
        <rect x="9.1" y="8.5" width="1.8" height="6" rx=".9" fill="white" />
        <rect x="9.1" y="5.5" width="1.8" height="1.8" rx=".9" fill="white" />
      </svg>
    ),
  },
  success: {
    bg:        'rgba(236,253,242,1)',
    border:    'rgba(196,233,209,1)',
    iconColor: colors.success300,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={colors.success300} />
        <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  warning: {
    bg:        'rgba(254,248,236,1)',
    border:    'rgba(245,190,66,0.4)',
    iconColor: colors.alert200,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18.5 17H1.5L10 2Z" fill={colors.alert200} />
        <rect x="9.1" y="8" width="1.8" height="5" rx=".9" fill="white" />
        <rect x="9.1" y="14.2" width="1.8" height="1.8" rx=".9" fill="white" />
      </svg>
    ),
  },
  error: {
    bg:        'rgba(255,235,235,1)',
    border:    'rgba(255,128,128,0.4)',
    iconColor: colors.error300,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={colors.error300} />
        <rect x="9.1" y="5.5" width="1.8" height="6" rx=".9" fill="white" />
        <rect x="9.1" y="12.7" width="1.8" height="1.8" rx=".9" fill="white" />
      </svg>
    ),
  },
};

// ─── Close icon ───────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L12 12M12 4L4 12" stroke={colors.g500} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const InlineNotification: React.FC<InlineNotificationProps> = ({
  state = 'info',
  actions = 'inline',
  title,
  text,
  actionButtons = [],
  dismissible = false,
  onDismiss,
  className,
}) => {
  const style = STATE_STYLES[state];

  const ActionButtons = actionButtons.length > 0 ? (
    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
      {actionButtons.map((btn, i) => {
        const isPrimary = btn.variant === 'primary' || (btn.variant === undefined && i === actionButtons.length - 1 && actionButtons.length > 1);
        return (
          <Button
            key={i}
            size="S"
            variant={isPrimary ? 'primary' : 'outline'}
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        );
      })}
    </div>
  ) : null;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: actions === 'inline' ? 'center' : 'flex-start',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 12,
        background: style.bg,
        border: `1px solid ${style.border}`,
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Icon */}
      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', marginTop: actions === 'stacked' ? 1 : 0 }}>
        {style.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {actions === 'stacked' ? (
          // Stacked: title + text on top, buttons below
          <>
            <div style={{ marginBottom: actionButtons.length > 0 ? 12 : 0 }}>
              {title && (
                <div style={{ ...textStyles.smallSemi, color: colors.black, marginBottom: text ? 2 : 0 }}>
                  {title}
                </div>
              )}
              {text && (
                <div style={{ ...textStyles.small, color: colors.black }}>
                  {text}
                </div>
              )}
            </div>
            {ActionButtons}
          </>
        ) : (
          // Inline: title + text side by side with buttons
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <span style={{ ...textStyles.smallSemi, color: colors.black }}>
                  {title}{' '}
                </span>
              )}
              {text && (
                <span style={{ ...textStyles.small, color: colors.black }}>
                  {text}
                </span>
              )}
            </div>
            {ActionButtons}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 4,
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default InlineNotification;
