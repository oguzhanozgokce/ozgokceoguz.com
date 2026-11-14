'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useSyncExternalStore } from 'react';
import { ButtonLink } from '@/components/ds/button';
import { useIcons, useMotionPreference } from '@/components/ds/ds-provider';
import { IconButton } from '@/components/ds/icon-button';
import { matchLocale, readLocaleChoice, saveLocaleChoice } from '@/i18n/detect';
import { getPathname, usePathname } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { fluidTween, motionDurations, spatialSpring } from '@/lib/ds/motion';

const copy: Record<AppLocale, { message: string; action: string; dismiss: string }> = {
  tr: {
    message: 'Bu sayfa Türkçe olarak da mevcut.',
    action: 'Türkçe’ye geç',
    dismiss: 'Kapat',
  },
  en: {
    message: 'This page is also available in English.',
    action: 'Switch to English',
    dismiss: 'Dismiss',
  },
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function preferredLocale(): AppLocale | null {
  if (readLocaleChoice()) return null;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return matchLocale(languages);
}

function choose(locale: AppLocale) {
  saveLocaleChoice(locale);
  for (const listener of listeners) listener();
}

export function LocaleSuggestion() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const icons = useIcons();
  const { spatialEnabled, profile } = useMotionPreference();
  const preferred = useSyncExternalStore(subscribe, preferredLocale, () => null);
  const suggested = preferred && preferred !== locale ? preferred : null;

  return (
    <AnimatePresence>
      {suggested ? (
        <motion.div
          key={suggested}
          lang={suggested}
          role="region"
          aria-label={copy[suggested].action}
          initial={spatialEnabled ? { opacity: 0, y: 24 } : { opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={spatialEnabled ? { opacity: 0, y: 16 } : { opacity: 0 }}
          transition={
            spatialEnabled ? spatialSpring('medium', profile) : fluidTween(motionDurations.fast)
          }
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-outline-subtle bg-surface-overlay py-1.5 ps-4 pe-1.5 text-sm shadow-md"
        >
          <span className="min-w-0 truncate text-on-surface">{copy[suggested].message}</span>
          <ButtonLink
            href={getPathname({ href: pathname, locale: suggested })}
            hrefLang={suggested}
            variant="soft"
            size="sm"
            onPress={() => choose(suggested)}
          >
            {copy[suggested].action}
          </ButtonLink>
          <IconButton
            aria-label={copy[suggested].dismiss}
            icon={<icons.close />}
            variant="ghost"
            tone="neutral"
            size="sm"
            onPress={() => choose(locale)}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
