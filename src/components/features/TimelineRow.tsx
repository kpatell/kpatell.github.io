import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import type { Experience } from '@/types';
import { Pill, Surface } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface TimelineRowProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
};

/**
 * Expandable experience row displaying company summary, highlights, and tech tags.
 */
export function TimelineRow({ experience, defaultExpanded = false }: TimelineRowProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();

  return (
    <Surface interactive padding="none">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={cn(
          'w-full min-h-11 p-6 md:p-8 text-left rounded-3xl',
          'flex items-start justify-between gap-4',
          'transition-colors duration-200',
          'hover:bg-zinc-900/5 dark:hover:bg-white/5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950'
        )}
      >
        <div className="flex items-start gap-4 min-w-0">
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-zinc-800/90 border border-zinc-900/10 dark:border-white/10 p-2 flex items-center justify-center overflow-hidden">
            <img
              src={experience.logo}
              alt={experience.logoAlt}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {experience.company}
              </h3>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {experience.period}
              </span>
            </div>

            <p className="mt-0.5 text-sm md:text-base font-medium text-blue-600 dark:text-blue-400">
              {experience.role}
            </p>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {experience.summary}
            </p>
          </div>
        </div>

        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { rotate: isExpanded ? 180 : 0 }}
          transition={springTransition}
          className={cn(
            'mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            'bg-zinc-900/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-400',
            prefersReducedMotion && isExpanded && 'rotate-180'
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0.15 } : springTransition}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8 pt-5 border-t border-zinc-900/10 dark:border-white/10">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {experience.location}
              </p>

              <ul className="mt-4 space-y-2.5">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {experience.links?.map((link) => (
                  <Pill
                    key={link.url}
                    href={link.url}
                    external
                    size="sm"
                    variant="glass"
                    icon={<Play className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />}
                  >
                    {link.label}
                  </Pill>
                ))}
                {experience.tags.map((tag) => (
                  <Pill key={tag} size="sm" variant="neutral">
                    {tag}
                  </Pill>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Surface>
  );
}
