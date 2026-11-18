import { ThemeProvider } from '@/hooks/useTheme';
import { GlassNav, Footer } from '@/components/layout';
import {
  HeroV2,
  BentoSection,
  ExperienceV2,
  ContactV2,
} from '@/components/sections';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <GlassNav />
        <main>
          <HeroV2 />
          <BentoSection />
          <ExperienceV2 />
          <ContactV2 />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
