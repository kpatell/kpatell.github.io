import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Work & Life', href: '#bento' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950';

const iconBtnClass = cn(
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full',
  'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors',
  focusRing
);

/**
 * Sticky frosted-glass top navigation bar with section anchors and theme toggle.
 */
export function GlassNav() {
  const { theme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && systemDark);
    const nextTheme = isDark ? 'light' : 'dark';

    const { clientX: x, clientY: y } = event;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--r', `${r}px`);

    if (prefersReducedMotion || !document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    document.startViewTransition(() => setTheme(nextTheme));
  };

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="max-w-6xl mx-auto px-6">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between rounded-full px-3 py-1.5 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-900/10 dark:border-white/10"
        >
          <a
            href="#home"
            aria-label="Krishan Patel — Home"
            className={cn(
              'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-1.5',
              'hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors',
              focusRing
            )}
          >
            <img
              src="/favicon.svg"
              alt="KP"
              className="h-8 w-8 rounded-full"
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium',
                  'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors',
                  focusRing
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className={cn('relative', iconBtnClass)}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform motion-reduce:transition-none dark:-rotate-90 dark:scale-0" aria-hidden="true" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform motion-reduce:transition-none dark:rotate-0 dark:scale-100" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className={cn('md:hidden', iconBtnClass)}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-1 rounded-3xl p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-900/10 dark:border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-2xl px-4 text-sm font-medium',
                  'text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors',
                  focusRing
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
