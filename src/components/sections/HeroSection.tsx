import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { DecryptText, ParticlesBackground } from '@/components/features';

export function HeroSection() {
  const decryptDuration = 1500;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mx-auto min-h-[1.2em] break-words">
          <DecryptText text="krishan patel" duration={decryptDuration} />
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto min-h-[3em] break-words">
          <DecryptText
            text="software engineer specializing in building scalable cloud solutions and intuitive full-stack applications"
            duration={decryptDuration}
          />
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a href="#learn-more-ai">
            <Button size="lg" className="w-full sm:w-auto">
              view my work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              get in touch
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
