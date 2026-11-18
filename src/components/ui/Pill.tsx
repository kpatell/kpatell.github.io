import React from 'react';
import { cn } from '@/lib/utils';

export interface PillProps {
  variant?: 'neutral' | 'accent' | 'glass';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<NonNullable<PillProps['variant']>, string> = {
  neutral:
    'bg-zinc-900/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
  accent:
    'bg-blue-600 text-white dark:bg-blue-500 border border-transparent',
  glass:
    'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl text-zinc-800 dark:text-zinc-100 border border-zinc-900/10 dark:border-white/10',
};

const interactiveVariantMap: Record<NonNullable<PillProps['variant']>, string> = {
  neutral: 'hover:bg-zinc-900/10 dark:hover:bg-white/15',
  accent: 'hover:bg-blue-700 dark:hover:bg-blue-400',
  glass:
    'hover:bg-white/90 dark:hover:bg-zinc-900/80 hover:border-zinc-900/20 dark:hover:border-white/20',
};

const sizeMap: Record<NonNullable<PillProps['size']>, string> = {
  sm: 'px-3 py-1 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-medium',
};

const focusClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950';

/**
 * Rounded-full badge, button, or link with optional leading icon.
 */
export function Pill({
  variant = 'neutral',
  size = 'md',
  icon,
  href,
  external = false,
  onClick,
  ariaLabel,
  className,
  children,
}: PillProps) {
  const isInteractive = Boolean(href || onClick);
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200',
    variantMap[variant],
    sizeMap[size],
    isInteractive && 'min-h-11 cursor-pointer',
    isInteractive && interactiveVariantMap[variant],
    isInteractive && focusClasses,
    className
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
}
