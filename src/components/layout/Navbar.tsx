import { useState, useEffect } from 'react';
import { Home, User, Mail, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems: NavItem[] = [
    { name: 'home', id: 'home', icon: Home },
    { name: 'about', id: 'about', icon: User },
    { name: 'learn more using ai!', id: 'learn-more-ai', icon: Sparkles, tooltip: 'try me!' },
    { name: 'contact', id: 'contact', icon: Mail },
  ];

  // Scroll-spy logic
  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      let currentSection = 'home';
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
            break;
          }
        }
      }

      // Fix for Contact Section Highlighting
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const contactSection = sections[sections.length - 1];
      if (contactSection) {
        if (
          scrollPosition + windowHeight >= documentHeight - 50 ||
          scrollPosition + windowHeight / 2 > contactSection.offsetTop
        ) {
          currentSection = 'contact';
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ item }: { item: NavItem }) => {
    const { name, id, icon: Icon } = item;
    const isActive = activeSection === id;

    return (
      <a href={`#${id}`} className="group relative flex items-center justify-center p-3" aria-label={name}>
        <Icon
          className={cn(
            'h-5 w-5 transition-all',
            isActive
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white'
          )}
        />
        <span
          className={cn(
            'absolute left-full ml-4 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md',
            'scale-0 group-hover:scale-100 origin-left transition-transform',
            'pointer-events-none lowercase'
          )}
        >
          {item.tooltip || item.name}
        </span>
      </a>
    );
  };

  return (
    <>
      {/* Desktop: Floating Vertical Pill */}
      <nav
        className={cn(
          'hidden md:flex flex-col items-center fixed z-50 left-6 top-1/2 -translate-y-1/2',
          'bg-white/50 dark:bg-black/50 backdrop-blur-md',
          'border border-black/10 dark:border-white/10',
          'py-4 rounded-full shadow-lg shadow-black/10 dark:shadow-white/10'
        )}
      >
        <div className="flex flex-col items-center justify-center">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </div>
      </nav>

      {/* Mobile: Bottom Horizontal Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => {
            const { id, icon: Icon } = item;
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="flex flex-col items-center justify-center p-2"
                aria-label={item.name}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-all',
                    isActive ? 'text-black dark:text-white' : 'text-gray-500'
                  )}
                />
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
