import { experiences } from '@/data';
import { TimelineRow } from '@/components/features/TimelineRow';
import { SectionHeader } from '@/components/ui';

/**
 * Experience section featuring an expandable timeline.
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
    </section>
  );
}
