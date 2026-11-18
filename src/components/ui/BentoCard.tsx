import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BentoCardProps {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const colSpanMap: Record<NonNullable<BentoCardProps['colSpan']>, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
};

const rowSpanMap: Record<NonNullable<BentoCardProps['rowSpan']>, string> = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
};

const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
};

/**
 * Animated bento grid card with glass surface, optional link wrapper, and reduced-motion support.
 */
export function BentoCard({
  colSpan = 1,
  rowSpan = 1,
  href,
  external = true,
  ariaLabel,
  delay = 0,
  className,
  children,
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isInteractive = Boolean(href);

  const cardClasses = cn(
    'group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-8',
    'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl',
    'border border-zinc-900/10 dark:border-white/10',
    'transition-colors duration-200',
    isInteractive &&
      'hover:bg-white/90 dark:hover:bg-zinc-900/80 hover:border-zinc-900/20 dark:hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950',
    colSpanMap[colSpan],
    rowSpanMap[rowSpan],
    className
  );

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 };
  const animateInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const hoverEffect =
    isInteractive && !prefersReducedMotion ? { scale: 1.01 } : undefined;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        initial={initial}
        whileInView={animateInView}
        whileHover={hoverEffect}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ ...springTransition, delay }}
        className={cardClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animateInView}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...springTransition, delay }}
      className={cardClasses}
    >
      {children}
    </motion.div>
  );
}
