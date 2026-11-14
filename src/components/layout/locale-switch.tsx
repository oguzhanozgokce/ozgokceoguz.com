'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ds/button';
import { saveLocaleChoice } from '@/i18n/detect';
import { getPathname, usePathname } from '@/i18n/navigation';
import { localeNames, locales, type AppLocale } from '@/i18n/routing';

export function LocaleSwitch() {
  const t = useTranslations('appearance');
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const other = locales.find((candidate) => candidate !== locale) ?? locale;

  return (
    <ButtonLink
      href={getPathname({ href: pathname, locale: other })}
      hrefLang={other}
      aria-label={`${other.toUpperCase()} · ${t('language')}: ${localeNames[other]}`}
      variant="ghost"
      tone="neutral"
      size="sm"
      className="font-mono uppercase"
      onPress={() => saveLocaleChoice(other)}
    >
      {other}
    </ButtonLink>
  );
}
