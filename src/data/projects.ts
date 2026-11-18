import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'generations',
    title: 'generations',
    summary:
      'Connecting a big family (my grandma has 10 siblings) so everyone can actually keep track of who is who at reunions.',
    url: 'https://github.com/kpatell/generations',
    tags: ['React', 'TypeScript', 'Family Graph'],
    highlight: 'Built for family reunions',
  },
  {
    id: 'reds',
    title: 'reds',
    summary:
      'A multiplayer card game built to play with college friends and stay in touch across cities.',
    url: 'https://github.com/kpatell/reds',
    tags: ['Multiplayer', 'Real-time', 'TypeScript'],
    highlight: 'Game night with college friends',
  },
  {
    id: 'costume-creator',
    title: 'costume-creator',
    summary:
      "An interactive SVG color editor for college Raas costumes to preview how guys' and girls' outfits look together on stage.",
    url: 'https://github.com/kpatell/costume-creator',
    tags: ['SVG', 'React', 'Design Tool'],
    highlight: 'Stage palette previewer',
  },
];
