import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  layoutId?: string;
  className?: string;
}

/**
 * Apple-style segmented control with shared-layout sliding pill indicator.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  layoutId = 'segmented-control-pill',
  className,
}: SegmentedControlProps<T>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-full p-1',
        'bg-zinc-900/5 dark:bg-white/10 border border-zinc-900/10 dark:border-white/10',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 min-h-11 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950',
              isActive
                ? 'text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={prefersReducedMotion ? undefined : layoutId}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-900/5 dark:border-white/10"
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
