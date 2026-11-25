import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pill, SectionHeader, Surface } from '@/components/ui';
import { profile } from '@/data';

const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
};

/**
 * Contact section featuring a frosted Surface card with email and social Pill links.
 */
export function ContactV2() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 };
  const animateInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section id="contact" className="py-24 md:py-32 max-w-6xl mx-auto px-6">
      <SectionHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Always down to chat about distributed systems, AI tooling, or the best slice in Chelsea."
      />

      <motion.div
        initial={initial}
        whileInView={animateInView}
        viewport={{ once: true, margin: '-40px' }}
        transition={springTransition}
      >
        <Surface padding="lg" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Direct line
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 break-all">
              {profile.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Pill
              href={`mailto:${profile.email}`}
              variant="accent"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
            >
              Email me
            </Pill>
            <Pill
              href={profile.github}
              external
              variant="glass"
              icon={<Github className="h-4 w-4" aria-hidden="true" />}
            >
              GitHub
            </Pill>
            <Pill
              href={profile.linkedin}
              external
              variant="glass"
              icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
            >
              LinkedIn
            </Pill>
            <Pill
              href={profile.resumeUrl}
              external
              variant="glass"
              icon={<FileText className="h-4 w-4" aria-hidden="true" />}
            >
              Resume
            </Pill>
          </div>
        </Surface>
      </motion.div>
    </section>
  );
}
