import type { AppLocale } from '@/i18n/routing';

export type Localized<T = string> = Record<AppLocale, T>;

export function localize<T>(value: Localized<T>, locale: AppLocale): T {
  return value[locale];
}

export interface YearMonth {
  year: number;
  month: number;
}
