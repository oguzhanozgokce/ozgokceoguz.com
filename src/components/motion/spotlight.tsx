'use client';

import type { PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

const glow =
  'radial-gradient(440px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 65%)';

export function Spotlight({ children, className }: SpotlightProps) {
  function track(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={track} className={cn('group/spot relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
