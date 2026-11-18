import type { NycSpot } from '@/types';

export const nycSpots: NycSpot[] = [
  {
    id: 'chelsea',
    label: 'Home base',
    place: 'Chelsea, NYC',
    detail: 'Morning coffee walks, gallery blocks, and easy access to the Hudson.',
    category: 'neighborhood',
  },
  {
    id: 'running',
    label: 'Running',
    place: 'Central Park & West Side Hwy',
    detail: 'Central Park loops on weekends, occasional West Side Highway runs along the water.',
    category: 'running',
  },
  {
    id: 'taco-bell',
    label: 'Guilty pleasure',
    place: 'Taco Bell · 23rd & 6th',
    detail: 'Unbeatable late-night post-run ritual two avenues over.',
    category: 'food',
  },
];
