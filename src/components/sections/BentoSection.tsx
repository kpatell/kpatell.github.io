import { useState } from 'react';
import { ProjectsBento } from '@/components/bento/ProjectsBento';
import { NycBento } from '@/components/bento/NycBento';
import { NowBento } from '@/components/bento/NowBento';
import { StackBento } from '@/components/bento/StackBento';
import {
  SectionHeader,
  SegmentedControl,
  type SegmentedOption,
} from '@/components/ui';

type BentoFilter = 'all' | 'engineering' | 'life';

const filterOptions: SegmentedOption<BentoFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'life', label: 'NYC & Life' },
];

/**
 * Bento grid section showcasing selected engineering projects, NYC life, current focus, and stack.
 */
export function BentoSection() {
  const [filter, setFilter] = useState<BentoFilter>('all');

  const showEngineering = filter === 'all' || filter === 'engineering';
  const showLife = filter === 'all' || filter === 'life';

  return (
    <section id="bento" className="py-24 md:py-32 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        <SectionHeader
          eyebrow="Work & Life"
          title="Things I'm building and living."
          className="mb-0 md:mb-0"
        />
        <SegmentedControl
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter bento cards"
          layoutId="bento-filter-pill"
          className="self-start md:self-auto"
        />
      </div>

      <div key={filter} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {showEngineering && <ProjectsBento />}
        {showLife && (
          <>
            <NycBento />
            <NowBento />
          </>
        )}
        {showEngineering && <StackBento />}
      </div>
    </section>
  );
}
