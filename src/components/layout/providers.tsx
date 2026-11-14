'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { DSProvider } from '@/components/ds/ds-provider';
import { isAppLocale } from '@/i18n/routing';
import { dsLabels } from '@/lib/ds-labels';

export function Providers({ locale, children }: { locale: string; children: ReactNode }) {
  const router = useRouter();
  const labels = isAppLocale(locale) ? dsLabels(locale) : undefined;

  return (
    <DSProvider locale={locale} labels={labels} navigate={(href) => router.push(href)}>
      {children}
    </DSProvider>
  );
}
