import React from 'react';
import { cn } from '@/lib/utils';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

const paddingMap: Record<NonNullable<SurfaceProps['padding']>, string> = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
};

/**
 * Frosted glass container with a hairline border following Apple/Material 3 surface tokens.
 */
export function Surface({
  padding = 'md',
  interactive = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl',
        'border border-zinc-900/10 dark:border-white/10',
        'transition-colors duration-200',
        interactive &&
          'hover:bg-white/90 dark:hover:bg-zinc-900/80 hover:border-zinc-900/20 dark:hover:border-white/20',
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
