'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';
import { RollingNumber } from '@/components/ds/rolling-number';

export function StatNumber({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <RollingNumber value={inView ? value : 0} />
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </span>
  );
}
