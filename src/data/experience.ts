import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'google',
    company: 'Google',
    role: 'Software Engineer — Google Ads',
    period: 'May 2026 – Present',
    location: 'New York, NY',
    logo: '/google-logo.svg',
    logoAlt: 'Google logo',
    summary: 'Authorized Buyers platform.',
    highlights: [
      'Building and scaling real-time ad exchange infrastructure on the Authorized Buyers platform.',
    ],
    tags: ['Google Ads', 'Authorized Buyers', 'Distributed Systems'],
  },
  {
    id: 'capital-one',
    company: 'Capital One',
    role: 'Senior Associate Software Engineer',
    period: 'Aug 2023 – Apr 2026',
    location: 'McLean, VA / New York, NY',
    logo: '/capital-one-logo.svg',
    logoAlt: 'Capital One logo',
    summary:
      'Led AI-driven qualification tools and enterprise-scale fintech infrastructure, driving operational efficiency through ML automation and standardized CI/CD.',
    highlights: [
      'Built the Decrypt and Stream Lambda (DASL) platform for daily transaction files with 99.9% uptime and co-led a full-stack replay recovery tool.',
      'Architected an AI-driven qualification platform using Selenium, BeautifulSoup, Mistral 7B, and collaborative filtering, saving 200+ hours annually.',
      'Standardized Conventional Commits and CI/CD quality checks enterprise-wide and mentored new associates as TDP Program Council Lead.',
    ],
    tags: ['AWS', 'Python', 'React', 'TypeScript', 'ML / LLM'],
  },
  {
    id: 'georgia-tech',
    company: 'Georgia Institute of Technology',
    role: 'B.S. in Computer Science',
    period: 'Graduated May 2023',
    location: 'Atlanta, GA',
    logo: '/georgia-tech-logo.svg',
    logoAlt: 'Georgia Tech logo',
    summary: 'Threads: Intelligence & Devices · GPA 3.81 / 4.0',
    highlights: [
      'Captain of Georgia Tech Ramblin’ Raas collegiate dance team (May 2022 – May 2023) and later Board Member of Raas All-Stars.',
      'Built an interactive JavaScript tutoring platform with MongoDB, React, and Node.js partnering with Atlanta middle schools.',
    ],
    tags: ['Intelligence', 'Devices', 'Ramblin’ Raas'],
    links: [
      {
        label: 'Watch GT Ramblin’ Raas performance',
        url: 'https://www.youtube.com/watch?v=QdFJlOgfd7A',
      },
    ],
  },
];
