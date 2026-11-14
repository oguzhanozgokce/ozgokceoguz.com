'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { fluidTween } from '@/lib/ds/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, distance = 16, className }: RevealProps) {
  const { spatialEnabled, effectsEnabled } = useMotionPreference();

  if (!effectsEnabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={spatialEnabled ? { opacity: 0, y: distance } : { opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...fluidTween(550), delay }}
    >
      {children}
    </motion.div>
  );
}
