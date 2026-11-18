import { ArrowUp } from 'lucide-react';
import { profile } from '@/data';
import { cn } from '@/lib/utils';

/**
 * Minimal footer with copyright, NYC location, and back-to-top anchor.
 */
export function Footer() {
  return (
    <footer className="border-t border-zinc-900/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
          <span>© 2026 {profile.name}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </div>

        <a
          href="#home"
          className={cn(
            'inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 font-medium',
            'text-zinc-600 dark:text-zinc-300',
            'hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-900/5 dark:hover:bg-white/10',
            'transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950'
          )}
        >
          <span>Back to top</span>
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
