import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { TextareaProps } from '@/types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 px-3 py-2 text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white',
          'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
