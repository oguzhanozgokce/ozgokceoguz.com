import { defaultLocale, locales, type AppLocale } from './routing';

export const fallbackLocale: AppLocale = defaultLocale;

export const localeCookie = 'NEXT_LOCALE';

export function matchLocale(preferred: readonly string[]): AppLocale {
  for (const tag of preferred) {
    const language = tag.toLowerCase().split('-')[0];
    const match = locales.find((locale) => locale === language);
    if (match) return match;
  }
  return fallbackLocale;
}

export function readLocaleChoice(): AppLocale | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${localeCookie}=([^;]+)`));
  const value = match?.[1];
  return locales.find((locale) => locale === value) ?? null;
}

export function saveLocaleChoice(locale: AppLocale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export const rootRedirectScript = `(function(){var s=${JSON.stringify(locales)},f=${JSON.stringify(fallbackLocale)},c=document.cookie.match(/(?:^|; )${localeCookie}=([^;]+)/),l=c&&s.indexOf(c[1])>-1?c[1]:null;if(!l){var p=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||f];for(var i=0;i<p.length&&!l;i++){var t=String(p[i]).toLowerCase().split('-')[0];if(s.indexOf(t)>-1)l=t}}location.replace('/'+(l||f)+'/'+location.search+location.hash)})()`;
