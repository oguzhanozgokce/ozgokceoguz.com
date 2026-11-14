import type { ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

interface PillProps {
  children: ReactNode;
  tone?: 'neutral' | 'primary';
  className?: string;
}

export function Pill({ children, tone = 'neutral', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full px-2.5 font-mono text-xs whitespace-nowrap',
        tone === 'primary'
          ? 'bg-primary-soft text-primary'
          : 'bg-neutral-soft text-on-surface-variant',
        className,
      )}
    >
      {children}
    </span>
  );
}
