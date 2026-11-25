import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data';
import { BentoCard, Pill } from '@/components/ui';

/**
 * Renders selected engineering projects as interactive bento cards.
 */
export function ProjectsBento() {
  return (
    <>
      {projects.map((project, index) => (
        <BentoCard
          key={project.id}
          colSpan={1}
          href={project.url}
          external
          ariaLabel={`View ${project.title} on GitHub (opens in a new tab)`}
          delay={index * 0.06}
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              {project.highlight ? (
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {project.highlight}
                </p>
              ) : (
                <span />
              )}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              />
            </div>

            <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {project.title}
            </h3>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {project.summary}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Pill key={tag} size="sm" variant="neutral">
                {tag}
              </Pill>
            ))}
          </div>
        </BentoCard>
      ))}
    </>
  );
}
