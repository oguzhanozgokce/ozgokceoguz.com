import type { Metadata } from 'next';
import { bodyFont, codeFont } from '@/app/fonts';
import { NotFound } from '@/components/ds/not-found';
import { Providers } from '@/components/layout/providers';
import { defaultLocale } from '@/i18n/routing';
import { appearanceScript } from '@/lib/appearance-script';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Sayfa bulunamadı · Page not found',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <html
      lang={defaultLocale}
      className={`${bodyFont.variable} ${codeFont.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className="min-h-dvh">
        <Providers locale={defaultLocale}>
          <main className="grid min-h-dvh place-items-center p-6">
            <NotFound
              homeHref="/"
              labels={{
                title: 'Sayfa bulunamadı · Page not found',
                description:
                  'Aradığın sayfa taşınmış ya da bağlantı eskimiş olabilir. The page may have moved, or the link may be out of date.',
                home: 'Ana sayfa · Home',
              }}
            />
          </main>
        </Providers>
      </body>
    </html>
  );
}
