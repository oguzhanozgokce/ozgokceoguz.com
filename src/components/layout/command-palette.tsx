'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useIcons } from '@/components/ds/ds-provider';
import { IconButton } from '@/components/ds/icon-button';

const CommandDialog = dynamic(() => import('./command-dialog'), { ssr: false });

export interface PaletteLink {
  id: string;
  label: string;
  href: string;
}

export interface PaletteLabels {
  open: string;
  placeholder: string;
  empty: string;
  sections: string;
  projects: string;
  actions: string;
  links: string;
  toDark: string;
  toLight: string;
  language: string;
  copyEmail: string;
  copied: string;
  cv: string;
}

interface CommandPaletteProps {
  labels: PaletteLabels;
  sections: PaletteLink[];
  projects: PaletteLink[];
}

export function CommandPalette({ labels, sections, projects }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const icons = useIcons();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setRequested(true);
        setOpen((value) => !value);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <IconButton
        aria-label={labels.open}
        aria-keyshortcuts="Meta+K Control+K"
        icon={<icons.search />}
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
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          labels={labels}
          sections={sections}
          projects={projects}
        />
      ) : null}
    </>
  );
}
