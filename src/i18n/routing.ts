import { defineRouting } from 'next-intl/routing';

export const locales = ['tr', 'en'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'en';

export const localeNames: Record<AppLocale, string> = {
  tr: 'Türkçe',
  en: 'English',
};

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
