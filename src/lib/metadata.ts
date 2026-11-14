import type { Metadata } from 'next';
import { defaultLocale, locales, type AppLocale } from '@/i18n/routing';

export function localizedAlternates(locale: AppLocale, path = '/'): Metadata['alternates'] {
  const suffix = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`;
  const languages: Record<string, string> = {};
  for (const candidate of locales) languages[candidate] = `/${candidate}${suffix}`;
  languages['x-default'] = `/${defaultLocale}${suffix}`;

  return { canonical: `/${locale}${suffix}`, languages };
}
