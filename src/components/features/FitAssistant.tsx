import { type FormEvent, useId, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '@/lib/api';
import { RESUME_TEXT, cn } from '@/lib/utils';
import { Surface } from '@/components/ui';

function parseBullets(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[•*-]|\d+[.)])\s+/, '').trim())
    .filter(Boolean)
    .slice(0, 3);
}

/**
 * Interactive Gemini-powered assistant generating three tailored fit takeaways for a company.
 */
export function FitAssistant() {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = companyName.trim();
    if (!trimmed) {
      setError('Enter a company name to check fit.');
      return;
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setBullets([]);
      setError('Gemini API key is not configured (VITE_GEMINI_API_KEY is missing).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBullets([]);

    try {
      const response = await getGeminiResponse(trimmed, RESUME_TEXT);
      const parsed = parseBullets(response);
      setBullets(parsed.length > 0 ? parsed : [response.trim()]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to generate fit summary right now. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Surface padding="md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={inputId} className="sr-only">
          Company name
        </label>
        <input
          id={inputId}
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter a company (e.g. Stripe, Figma, Anthropic)..."
          disabled={isLoading}
          className={cn(
            'w-full min-h-11 rounded-2xl px-4 py-2.5 text-sm md:text-base',
            'bg-white/80 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-50',
            'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
            'border border-zinc-900/10 dark:border-white/10',
            'hover:border-zinc-900/20 dark:hover:border-white/20',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950',
            'transition-colors duration-200 disabled:opacity-60'
          )}
        />

        <button
          type="submit"
          disabled={isLoading || !companyName.trim()}
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-2 min-h-11 rounded-full px-5 py-2.5 text-sm font-medium',
            'bg-blue-600 text-white dark:bg-blue-500',
            'hover:bg-blue-700 dark:hover:bg-blue-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950',
            'transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
              <span>Checking fit...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Check fit</span>
            </>
          )}
        </button>
      </form>

      <div aria-live="polite" className="mt-5">
        {error && (
          <p className="rounded-2xl px-4 py-3 text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20">
            {error}
          </p>
        )}

        {bullets.length > 0 && (
          <ul className="space-y-3 pt-1">
            {bullets.map((bullet, index) => (
              <li
                key={`${index}-${bullet.slice(0, 24)}`}
                className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !error && bullets.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Powered by Gemini — generates 3 tailored talking points from my resume.
          </p>
        )}
      </div>
    </Surface>
  );
}
