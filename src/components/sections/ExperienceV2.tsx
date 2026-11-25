import { experiences } from '@/data';
import { TimelineRow } from '@/components/features/TimelineRow';
import { SectionHeader } from '@/components/ui';

/**
 * Experience section featuring an expandable timeline.
 */
export function ExperienceV2() {
  return (
    <section id="experience" className="py-16 md:py-24 max-w-6xl mx-auto px-6">
      <SectionHeader
        eyebrow="Experience"
        title="Where I've worked"
      />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <TimelineRow
            key={exp.id}
            experience={exp}
          />
        ))}
      </div>
    </section>
  );
}
