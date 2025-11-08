import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button, Input, LoadingSpinner } from '@/components/ui';
import { cn } from '@/lib/utils';
import { getGeminiResponse } from '@/lib/api';
import { RESUME_TEXT } from '@/lib/utils';

export function AiAssistantSection() {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!companyName.trim()) {
      setError('please enter a company name');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse('');

    try {
      const response = await getGeminiResponse(companyName, RESUME_TEXT);
      setAiResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="learn-more-ai" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="max-w-2xl mx-auto text-left">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-black dark:text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white">
              learn more using ai!
            </h3>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            enter your company's name to see why i'm a great fit, powered by the gemini api
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="your company name..."
              disabled={isLoading}
            />
            <Button
              size="lg"
              onClick={handleGenerateClick}
              disabled={isLoading || !companyName.trim()}
              className={cn(
                'w-full sm:w-auto',
                'disabled:bg-black/80 dark:disabled:bg-white/80 disabled:text-white/70 dark:disabled:text-black/70'
              )}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">generating...</span>
                </>
              ) : (
                'generate talking points'
              )}
            </Button>
          </div>

          {/* Response Area */}
          <div className="mt-6 min-h-[100px] p-4 rounded-md bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {aiResponse && (
              <div
                className="text-gray-900 dark:text-gray-100 space-y-2 whitespace-pre-line"
                style={{ whiteSpace: 'pre-line' }}
              >
                {aiResponse}
              </div>
            )}
            {!isLoading && !error && !aiResponse && (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                the ai magic will happen here...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
