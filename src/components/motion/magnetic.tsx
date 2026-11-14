'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const spring = { stiffness: 260, damping: 18, mass: 0.5 };

export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const { decorativeEnabled } = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  function follow(event: PointerEvent<HTMLSpanElement>) {
    if (!decorativeEnabled || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function release() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className={`inline-block ${className ?? ''}`}
      style={{ x: smoothX, y: smoothY }}
      onPointerMove={follow}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
