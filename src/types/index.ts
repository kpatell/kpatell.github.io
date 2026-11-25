import type React from 'react';

export type {
  Profile,
  Project,
  Experience,
  ExperienceLink,
  NycCategory,
  NycSpot,
  NowItem,
} from './content';

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}
