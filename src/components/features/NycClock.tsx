import { useEffect, useState } from 'react';
import { Pill } from '@/components/ui';
import { profile } from '@/data';

function formatNycTime(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: profile.timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

/**
 * Live local NYC time indicator rendered inside a glass Pill.
 */
export function NycClock() {
  const [time, setTime] = useState<string>(() => formatNycTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(formatNycTime());
    }, 15_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Pill
      variant="glass"
      size="sm"
      icon={
        <span
          aria-hidden="true"
          className="block h-2 w-2 rounded-full bg-emerald-500"
        />
      }
    >
      <span className="tabular-nums">
        {profile.location} · {time}
      </span>
    </Pill>
  );
}
