'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useIcons } from '@/components/ds/ds-provider';
import { IconButton } from '@/components/ds/icon-button';
import type { NavItem } from './nav-links';

const MobileSheet = dynamic(() => import('./mobile-sheet'), { ssr: false });

export function MobileMenu({ items, label }: { items: NavItem[]; label: string }) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const icons = useIcons();

  return (
    <>
      <IconButton
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        icon={<icons.menu />}
        variant="ghost"
        tone="neutral"
        size="sm"
        className="md:hidden"
        onPress={() => {
          setRequested(true);
          setOpen(true);
        }}
      />
      {requested ? (
        <MobileSheet open={open} onOpenChange={setOpen} items={items} label={label} />
      ) : null}
    </>
  );
}
