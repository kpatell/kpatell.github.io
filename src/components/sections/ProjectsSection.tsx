import { ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  githubUrl: string | null;
}

const projects: Project[] = [
  {
    name: 'generations',
    description:
      'A modern, secure, and collaborative family tree application for visualizing ancestry, managing family members, and sharing trees with relatives.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vite'],
    githubUrl: 'https://github.com/kpatell/generations',
  },
  {
    name: 'reds',
    description:
      'Real-time two-player card game with a unique out-of-turn Stacking mechanic that rewards fast reflexes and knowledge of your own hand.',
    tech: ['React 19', 'TypeScript', 'Supabase Realtime', 'Zustand', 'Framer Motion', 'Vitest'],
    githubUrl: 'https://github.com/kpatell/reds',
  },
  {
    name: 'hit your macros',
    description:
      'Scalable full-stack nutrition intelligence platform serving 100+ users to find restaurant meals that fit their health goals.',
    tech: ['Python', 'React Native', 'Claude API', 'Amazon Textract', 'Supabase'],
    githubUrl: null,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-black dark:text-white mb-12">
          projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col p-6 rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-white/5"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {project.name}
                </h3>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} github repository`}
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-2 flex-shrink-0"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                ) : (
                  <span className="ml-2 flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 border border-black/10 dark:border-white/10 rounded px-2 py-1">
                    private
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded-md border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 bg-black/5 dark:bg-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
