import { nowItems } from '@/data';
import type { NowItem } from '@/types';
import { BentoCard } from '@/components/ui';
import { cn } from '@/lib/utils';

const statusDotMap: Record<NowItem['status'], string> = {
  active: 'bg-blue-600 dark:bg-blue-400',
  exploring: 'border-2 border-zinc-400 dark:border-zinc-500 bg-transparent',
};

/**
 * Single-column bento card showing current focus areas and explorations.
 */
export function NowBento() {
  return (
    <BentoCard colSpan={1} delay={0.24}>
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Lately
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          What I'm up to
        </h3>

        <ul className="mt-5 space-y-4">
          {nowItems.map((item) => (
            <li key={item.id}>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn('h-2 w-2 shrink-0 rounded-full', statusDotMap[item.status])}
                />
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
