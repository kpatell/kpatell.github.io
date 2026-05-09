import { useState, useEffect, useRef } from 'react';
import { TimelineItem } from '@/components/features';
import type { TimelineData } from '@/types';

const techStack = [
  'React', 'TypeScript', 'Python', 'AWS', 'Supabase', 'PostgreSQL',
  'Node.js', 'Vite', 'TailwindCSS', 'Framer Motion', 'Zustand', 'REST APIs',
];

export function AboutSection() {
  const [fillHeight, setFillHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineData: TimelineData[] = [
    {
      icon: (
        <img
          src="/georgia-tech-logo.svg"
          alt="Georgia Tech Logo"
          className="w-full h-full object-contain"
        />
      ),
      title: 'georgia institute of technology',
      subtitle: 'b.s. in computer science',
      date: 'graduated may 2023',
      content: (
        <span>threads: intelligence & devices</span>
      ),
    },
    {
      icon: (
        <img
          src="/capital-one-logo.svg"
          alt="Capital One Logo"
          className="w-full h-full object-contain"
        />
      ),
      title: 'capital one',
      subtitle: 'senior associate software engineer',
      date: 'aug 2023 - apr 2026',
      content: (
        <span>
          led the development of AI-driven qualification tools and enterprise-scale fintech infrastructure, driving operational efficiency through ML automation and standardized CI/CD practices.
        </span>
      ),
    },
    {
      icon: (
        <img
          src="/google-logo.svg"
          alt="Google Logo"
          className="w-full h-full object-contain"
        />
      ),
      title: 'google',
      subtitle: 'software engineer | google ads',
      date: 'may 2026 - present',
      content: (
        <span>authorized buyers platform</span>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const viewportHeight = window.innerHeight;

      const startFilling = timelineTop + viewportHeight * 0.3;
      const endFilling = timelineTop + timelineHeight;

      if (scrollPosition > startFilling) {
        const scrolled = scrollPosition - startFilling;
        const total = endFilling - startFilling;
        const percentage = Math.min((scrolled / total) * 100, 100);
        setFillHeight(percentage);
      } else {
        setFillHeight(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-black dark:text-white mb-12">
          about me
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative w-full flex flex-col items-center">
          {/* Background Line */}
          <div className="absolute top-0 h-full w-1 bg-gray-200 dark:bg-gray-800 rounded-full left-[2.5rem] md:left-1/2 md:-translate-x-1/2" />

          {/* Animated Fill Line */}
          <div
            className="absolute top-0 w-1 bg-black dark:bg-white rounded-full transition-all duration-300 ease-out left-[2.5rem] md:left-1/2 md:-translate-x-1/2"
            style={{ height: `${fillHeight}%` }}
          />

          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              side={index % 2 === 0 ? 'left' : 'right'}
            >
              {item.content}
            </TimelineItem>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-black dark:text-white mb-8">
            core technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium text-black dark:text-white bg-white/50 dark:bg-black/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
