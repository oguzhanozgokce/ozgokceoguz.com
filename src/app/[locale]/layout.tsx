import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { profile } from '@content/profile';
import { bodyFont, codeFont } from '@/app/fonts';
import { LocaleSuggestion } from '@/components/layout/locale-suggestion';
import { Providers } from '@/components/layout/providers';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { isAppLocale, locales } from '@/i18n/routing';
import { appearanceScript } from '@/lib/appearance-script';
import { siteUrl } from '@/lib/site';
import '@/app/globals.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t('title'), template: `%s · ${profile.name}` },
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: profile.name,
      title: t('title'),
      description: t('description'),
      url: `/${locale}/`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: locale === 'tr' ? 'en_US' : 'tr_TR',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
    icons: {
      icon: [{ url: '/favicon.png', type: 'image/png' }],
      apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations('nav');

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${codeFont.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body id="top" className="min-h-dvh overflow-x-clip">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers locale={locale}>
            <a
              href="#main"
              className="sr-only z-50 rounded-full bg-primary-solid px-4 py-2 text-sm text-on-primary-solid focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
            >
              {t('skip')}
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <LocaleSuggestion />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
