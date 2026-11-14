'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useIcons } from '@/components/ds/ds-provider';
import { IconButton } from '@/components/ds/icon-button';
import { seeds, type Seed } from '@/lib/seeds';

const SeedPopover = dynamic(() => import('./seed-popover'), { ssr: false });

export function SeedPicker() {
  const t = useTranslations('appearance');
  const seedNames = useTranslations('seeds');
  const icons = useIcons();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const names = Object.fromEntries(seeds.map((seed) => [seed, seedNames(seed)])) as Record<
    Seed,
    string
  >;

  return (
    <>
      <IconButton
        ref={trigger}
        aria-label={t('seed')}
        aria-haspopup="dialog"
        aria-expanded={open}
        icon={<icons.palette />}
        variant="ghost"
        tone="neutral"
        size="sm"
        onHoverStart={() => setRequested(true)}
        onPress={() => {
          setRequested(true);
          setOpen(true);
        }}
      />
      {requested ? (
        <SeedPopover
          triggerRef={trigger}
          open={open}
          onOpenChange={setOpen}
          label={t('seed')}
          names={names}
        />
      ) : null}
    </>
  );
}
