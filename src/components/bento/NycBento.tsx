import type { ComponentType } from 'react';
import { Footprints, MapPin, Utensils } from 'lucide-react';
import { nycSpots, profile } from '@/data';
import type { NycCategory } from '@/types';
import { BentoCard, Pill } from '@/components/ui';

const categoryIconMap: Record<NycCategory, ComponentType<{ className?: string }>> = {
  neighborhood: MapPin,
  running: Footprints,
  food: Utensils,
};

/**
 * Two-column bento card highlighting NYC neighborhood life, running routes, and local staples.
 */
export function NycBento() {
  return (
    <BentoCard colSpan={2} delay={0.18}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            New York City
          </p>
          <h3 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Around the neighborhood
          </h3>
        </div>

        <Pill
          size="sm"
          variant="glass"
          icon={<MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />}
        >
          {profile.location}
        </Pill>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {nycSpots.map((spot) => {
          const Icon = categoryIconMap[spot.category];
          return (
            <div
              key={spot.id}
              className="rounded-2xl p-4 bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/10"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {spot.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {spot.place}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {spot.detail}
              </p>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
