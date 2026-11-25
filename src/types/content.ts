export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  timezone: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  highlight?: string;
}

export interface ExperienceLink {
  label: string;
  url: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo: string;
  logoAlt: string;
  summary: string;
  highlights: string[];
  tags: string[];
  links?: ExperienceLink[];
}

export type NycCategory = 'neighborhood' | 'running' | 'food';

export interface NycSpot {
  id: string;
  label: string;
  place: string;
  detail: string;
  category: NycCategory;
}

export interface NowItem {
  id: string;
  label: string;
  detail: string;
  status: 'active' | 'exploring';
}
