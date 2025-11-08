import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from '@/types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 px-3 py-2 text-sm',
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

Input.displayName = 'Input';
