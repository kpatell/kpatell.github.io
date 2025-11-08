import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TimelineItemProps } from '@/types';

export function TimelineItem({ icon, title, subtitle, date, children, side }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const isRight = side === 'right';

  return (
    <div
      ref={itemRef}
      className={cn(
        'relative w-full my-8 transition-all duration-700 ease-out',
        'flex flex-col md:flex-row',
        isRight ? 'md:flex-row-reverse' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      {/* Connector Dot with Logo */}
      <div
        className={cn(
          'absolute h-12 w-12 rounded-full z-10',
          'flex items-center justify-center',
          'bg-white dark:bg-white border-2 border-black dark:border-white',
          'shadow-lg',
          // Mobile: position on left side
          'left-4 top-8',
          // Desktop: position in center
          'md:left-1/2 md:-translate-x-1/2'
        )}
      >
        <div className="w-8 h-8 flex items-center justify-center p-1 rounded-full bg-white">
          {icon}
        </div>
      </div>

      {/* Content Half */}
      <div className={cn(
        'w-full md:w-1/2 py-4',
        // Mobile: add left margin to avoid circle overlap, reduce right margin
        'ml-20 mr-2 pr-2',
        // Desktop: normal padding
        'md:ml-0 md:mr-0 md:px-4 md:pr-4'
      )}>
        <div
          className={cn(
            'w-full bg-white/50 dark:bg-black/50 backdrop-blur-md',
            'border border-black/10 dark:border-white/10',
            'p-4 md:p-6 rounded-lg shadow-lg shadow-black/5 dark:shadow-white/5'
          )}
        >
          <div
            className={cn(
              'flex flex-col',
              isRight ? 'sm:items-start' : 'sm:items-start md:items-end'
            )}
          >
            <time
              className={cn(
                'text-sm font-medium text-gray-500 dark:text-gray-400',
                isRight ? '' : 'md:text-right'
              )}
            >
              {date}
            </time>
            <h3
              className={cn(
                'text-xl font-semibold text-black dark:text-white mt-1',
                isRight ? '' : 'md:text-right'
              )}
            >
              {title}
            </h3>
            <h4
              className={cn(
                'text-md font-medium text-gray-700 dark:text-gray-300',
                isRight ? '' : 'md:text-right'
              )}
            >
              {subtitle}
            </h4>
            {children && (
              <div className={cn('mt-3 text-sm text-gray-600 dark:text-gray-400', isRight ? '' : 'md:text-right')}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer Half */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
