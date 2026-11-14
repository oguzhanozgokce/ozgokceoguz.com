'use client';

import type { RefObject } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { Popover, PopoverDialog } from '@/components/ds/popover';
import { applySeed, useSeed } from '@/lib/appearance';
import { seedColors, seeds, type Seed } from '@/lib/seeds';
import { withViewTransition } from '@/lib/view-transition';

interface SeedPopoverProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  names: Record<Seed, string>;
}

export default function SeedPopover({
  triggerRef,
  open,
  onOpenChange,
  label,
  names,
}: SeedPopoverProps) {
  const current = useSeed();
  const { effectsEnabled } = useMotionPreference();

  return (
    <Popover
      triggerRef={triggerRef}
      isOpen={open}
      onOpenChange={onOpenChange}
      placement="bottom end"
    >
      <PopoverDialog aria-label={label} padding="sm">
        <div role="radiogroup" aria-label={label} className="flex items-center gap-2">
          {seeds.map((seed) => (
            <button
              key={seed}
              type="button"
              role="radio"
              aria-checked={seed === current}
              aria-label={names[seed]}
              title={names[seed]}
              onClick={() => withViewTransition(() => applySeed(seed), effectsEnabled)}
              style={{ backgroundColor: seedColors[seed] }}
              className="size-7 cursor-pointer rounded-full outline-offset-2 outline-on-surface transition-transform duration-150 ease-out hover:scale-110 focus-visible:outline-2 active:scale-95 aria-checked:outline-2"
            />
          ))}
        </div>
      </PopoverDialog>
    </Popover>
  );
}
