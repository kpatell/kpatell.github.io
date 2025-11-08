import { Download } from 'lucide-react';
import { ThemeProvider } from '@/hooks/useTheme';
import { StarBorder } from '@/components/ui';
import { Navbar, ThemeToggle } from '@/components/layout';
import { HeroSection, AboutSection, AiAssistantSection, ContactSection } from '@/components/sections';

function AppContent() {
  const resumeUrl = '/KrishanPatel-Resume.pdf';
  const resumeName = 'KrishanPatel-Resume.pdf';

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white font-inter">
      {/* Standalone Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating Download Button with StarBorder */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <StarBorder
          as="a"
          href={resumeUrl}
          download={resumeName}
          color="magenta"
          speed="7s"
          thickness={4}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            <span>download resume</span>
          </div>
        </StarBorder>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pb-16 md:pb-0 md:pl-24">
        <HeroSection />
        <AboutSection />
        <AiAssistantSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-black/10 dark:border-white/10 text-center text-gray-500 dark:text-gray-400 pb-24 md:pb-8 md:pl-24">
        © {new Date().getFullYear()} krishan patel. all rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <AppContent />
    </ThemeProvider>
  );
}
