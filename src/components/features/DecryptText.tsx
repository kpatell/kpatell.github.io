import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { DecryptTextProps } from '@/types';

export function DecryptText({ text, className = '', duration = 1000 }: DecryptTextProps) {
  const [displayedText, setDisplayedText] = useState(text.replace(/./g, '\u00A0'));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;:,.<>/?';

  const shuffledIndicesRef = useRef<number[]>([]);
  const revealedIndicesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    let iteration = 0;

    // Create and shuffle indices
    const indices = Array.from(Array(text.length).keys());
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    shuffledIndicesRef.current = indices;
    revealedIndicesRef.current = new Set();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const intervalSpeed = duration / text.length;

    intervalRef.current = setInterval(() => {
      if (iteration < text.length) {
        revealedIndicesRef.current.add(shuffledIndicesRef.current[iteration]);
      }

      const newText = text
        .split('')
        .map((_, index) => {
          if (revealedIndicesRef.current.has(index)) {
            return text[index];
          }
          if (text[index] === ' ') {
            return ' ';
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayedText(newText);

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayedText(text);
      }

      iteration += 1;
    }, intervalSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, duration]);

  return <span className={cn(className, 'font-mono')}>{displayedText}</span>;
}
