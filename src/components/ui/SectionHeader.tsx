import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Consistent section heading with sentence-case eyebrow, tight display title, and optional subtitle.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-12',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className
      )}
    >
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      )}
    </div>
  );
}
