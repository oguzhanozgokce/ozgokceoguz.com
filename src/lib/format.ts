import type { YearMonth } from '@content/types';
import type { AppLocale } from '@/i18n/routing';

export function formatYearMonth(value: YearMonth, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    new Date(Date.UTC(value.year, value.month - 1, 1)),
  );
}

export function monthsBetween(start: YearMonth, end: YearMonth) {
  return (end.year - start.year) * 12 + (end.month - start.month);
}

export function formatDuration(months: number, locale: AppLocale) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const units = locale === 'tr' ? { year: 'yıl', month: 'ay' } : { year: 'yr', month: 'mo' };
  const parts = [];
  if (years > 0) parts.push(`${years} ${units.year}`);
  if (rest > 0 || years === 0) parts.push(`${Math.max(rest, 1)} ${units.month}`);
  return parts.join(' ');
}

export function formatDate(iso: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function currentYearMonth(): YearMonth {
  const now = new Date();
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
}

export function shortHash(input: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}
