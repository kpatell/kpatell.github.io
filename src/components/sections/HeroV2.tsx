import { ArrowDownRight, FileText } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { NycClock } from '@/components/features/NycClock';
import { Pill } from '@/components/ui';
import { profile } from '@/data';

const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
};

/**
 * Editorial hero section with live NYC clock, display heading, bio, and primary CTAs.
 */
export function HeroV2() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 };
  const animate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section id="home" className="py-24 md:py-32 max-w-6xl mx-auto px-6">
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...springTransition, delay: 0 }}
        className="mb-8"
      >
        <NycClock />
      </motion.div>

      <motion.h1
        initial={initial}
        animate={animate}
        transition={{ ...springTransition, delay: 0.06 }}
        className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        initial={initial}
        animate={animate}
        transition={{ ...springTransition, delay: 0.12 }}
        className="mt-6 max-w-3xl text-xl md:text-2xl font-medium tracking-tight text-zinc-700 dark:text-zinc-200"
      >
        {profile.tagline}
      </motion.p>

      <motion.p
        initial={initial}
        animate={animate}
        transition={{ ...springTransition, delay: 0.18 }}
        className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300"
      >
        {profile.bio}
      </motion.p>

      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...springTransition, delay: 0.24 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <Pill
          href="#bento"
          variant="accent"
          icon={<ArrowDownRight className="h-4 w-4" aria-hidden="true" />}
        >
          Explore work
        </Pill>
        <Pill
          href={profile.resumeUrl}
          external
          variant="glass"
          icon={<FileText className="h-4 w-4" aria-hidden="true" />}
        >
          Resume
        </Pill>
      </motion.div>
    </section>
  );
}
