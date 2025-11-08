import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

export function Button({
  as: Comp = 'button',
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

  const variants = {
    default:
      'bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90',
    destructive: 'bg-red-500 text-white hover:bg-red-500/90',
    outline:
      'border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80',
    ghost: 'hover:bg-black/5 dark:hover:bg-white/5',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <Comp className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Comp>
  );
}
