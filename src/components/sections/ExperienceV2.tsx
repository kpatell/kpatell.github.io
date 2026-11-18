import { experiences } from '@/data';
import { FitAssistant } from '@/components/features/FitAssistant';
import { TimelineRow } from '@/components/features/TimelineRow';
import { SectionHeader } from '@/components/ui';

/**
 * Experience section featuring an expandable timeline and the Gemini company-fit assistant.
 */
export function ExperienceV2() {
  return (
    <section id="experience" className="py-24 md:py-32 max-w-6xl mx-auto px-6">
      <SectionHeader
        eyebrow="Experience"
        title="Where I've worked."
      />

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <TimelineRow
            key={exp.id}
            experience={exp}
            defaultExpanded={index === 0}
          />
        ))}
      </div>

      <div className="mt-12 md:mt-16">
        <div className="mb-5">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Company fit check
          </h3>
          <p className="mt-1 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            See how my background maps to your team in three concise points.
          </p>
        </div>

        <FitAssistant />
      </div>
    </section>
  );
}
