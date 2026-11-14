'use client';

import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import { createContext, use } from 'react';
import { cn } from '@/lib/ds/utils';

export const FlowContext = createContext<MotionValue<number> | null>(null);

interface FlowGlowProps {
  from: number;
  to: number;
  className?: string;
}

export function FlowGlow({ from, to, className }: FlowGlowProps) {
  const flow = use(FlowContext);
  const idle = useMotionValue(0);
  const opacity = useTransform(flow ?? idle, [from - 0.025, from, to, to + 0.05], [0, 1, 1, 0], {
    clamp: true,
  });

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
}
