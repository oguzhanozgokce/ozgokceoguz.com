'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { effectSpring, spatialSpring, type MotionSpeed } from '@/lib/ds/motion';

const speeds: MotionSpeed[] = ['fast', 'medium', 'slow'];

function Track({ label, transition }: { label: string; transition: object }) {
  const [moved, setMoved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setMoved((value) => !value)}
      className="flex cursor-pointer flex-col gap-2 rounded-container border border-outline-subtle bg-surface-raised p-4 text-start outline-offset-2 outline-primary focus-visible:outline-2"
    >
      <span className="font-mono text-xs text-on-surface-variant">{label}</span>
      <span
        className={`flex h-10 items-center rounded-full bg-neutral-soft px-1 ${moved ? 'justify-end' : 'justify-start'}`}
      >
        <motion.span
          layout
          transition={transition}
          className="block size-8 rounded-full bg-primary-solid"
        />
      </span>
    </button>
  );
}

export function SpringLab() {
  const { profile } = useMotionPreference();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {speeds.map((speed) => (
        <Track
          key={`spatial-${speed}`}
          label={`spatialSpring('${speed}')`}
          transition={spatialSpring(speed, profile)}
        />
      ))}
      {speeds.map((speed) => (
        <Track
          key={`effect-${speed}`}
          label={`effectSpring('${speed}')`}
          transition={effectSpring(speed)}
        />
      ))}
    </div>
  );
}
