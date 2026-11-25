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
 * Two-column bento card highlighting NYC neighborhood life, running routes, local staples, and a post-run photo.
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

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {nycSpots.map((spot) => {
            const Icon = categoryIconMap[spot.category];
            return (
              <div
                key={spot.id}
                className="rounded-2xl p-4 bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/10 flex items-start gap-3"
              >
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {spot.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {spot.place}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {spot.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <figure className="relative overflow-hidden rounded-2xl border border-zinc-900/10 dark:border-white/10 bg-zinc-900/5 dark:bg-white/5 min-h-64">
          <img
            src="/post-jersey-city-marathon.jpg"
            alt="Krishan smiling with post-race snacks after the Jersey City Half Marathon"
            className="h-full w-full object-cover object-top"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-xs font-medium text-white">
            Post-Jersey City Half Marathon
          </figcaption>
        </figure>
      </div>
    </BentoCard>
  );
}
