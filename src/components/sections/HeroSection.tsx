import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { DecryptText, ParticlesBackground } from '@/components/features';

export function HeroSection() {
  const decryptDuration = 1500;

  return (
    <section
      id="home"
      className="relative py-24 md:py-40 flex justify-center items-center overflow-hidden"
    >
      <ParticlesBackground />

      <div className="absolute inset-0 z-1 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mx-auto break-words">
          <DecryptText text="krishan patel" duration={decryptDuration} />
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto break-words">
          <DecryptText
            text="software engineer specializing in building scalable cloud solutions and intuitive full-stack applications"
            duration={decryptDuration}
          />
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact">
            <Button size="lg" className="w-full sm:w-auto">
              get in touch
            </Button>
          </a>
          <a href="#projects">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-black/50 text-black dark:border-white/50 dark:text-white"
            >
              view my work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
