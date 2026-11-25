import { profile } from '@/data';
import { BentoCard, Pill } from '@/components/ui';

/**
 * Full-width bento card displaying Krishan's core engineering stack.
 */
export function StackBento() {
  return (
    <BentoCard colSpan={3} delay={0.3}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Toolkit
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Core stack
          </h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Languages, cloud systems, and UI primitives I ship with.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {profile.stack.map((tech) => (
          <Pill key={tech} size="sm" variant="neutral">
            {tech}
          </Pill>
        ))}
      </div>
    </BentoCard>
  );
}
