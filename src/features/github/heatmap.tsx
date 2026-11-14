'use client';

import { useInView } from 'motion/react';
import { useRef, type CSSProperties } from 'react';
import { cn } from '@/lib/ds/utils';

interface Week {
  label: string | null;
  levels: number[];
}

interface HeatmapProps {
  weeks: Week[];
  summary: string;
  mobileWeeks?: number;
}

const tones = [
  'bg-neutral-soft',
  'bg-primary/30',
  'bg-primary/50',
  'bg-primary/75',
  'bg-primary-solid',
];

export function Heatmap({ weeks, summary, mobileWeeks = 26 }: HeatmapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const hiddenBefore = weeks.length - mobileWeeks;

  return (
    <div ref={ref} data-visible={inView} className="heat-map flex flex-col gap-2">
      <div
        aria-hidden="true"
        className="grid h-4 auto-cols-fr grid-flow-col gap-[3px] font-mono text-[10px] text-on-surface-variant sm:gap-1"
      >
        {weeks.map((week, index) => (
          <span
            key={index}
            className={cn('whitespace-nowrap', index < hiddenBefore && 'max-sm:hidden')}
          >
            {week.label}
          </span>
        ))}
      </div>
      <div
        role="img"
        aria-label={summary}
        className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-[3px] sm:gap-1"
      >
        {weeks.flatMap((week, column) =>
          week.levels.map((level, row) => (
            <span
              key={`${column}-${row}`}
              style={{ '--delay': `${column * 12 + row * 6}ms` } as CSSProperties}
              className={cn('heat-cell', tones[level], column < hiddenBefore && 'max-sm:hidden')}
            />
          )),
        )}
      </div>
    </div>
  );
}
