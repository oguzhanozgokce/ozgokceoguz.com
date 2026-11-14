'use client';

import { motion } from 'motion/react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { fluidTween } from '@/lib/ds/motion';

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const word = {
  hidden: { y: '110%' },
  shown: { y: 0 },
};

export function SplitText({ text, delay = 0, className }: SplitTextProps) {
  const { spatialEnabled } = useMotionPreference();

  if (!spatialEnabled) return <span className={className}>{text}</span>;

  const words = text.split(' ');

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
      >
        {words.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="-my-[0.18em] inline-block overflow-hidden py-[0.18em] align-bottom"
          >
            <motion.span className="inline-block" variants={word} transition={fluidTween(650)}>
              {value}
              {index < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
