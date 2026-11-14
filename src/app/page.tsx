import type { Metadata } from 'next';
import { fallbackLocale, rootRedirectScript } from '@/i18n/detect';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Oğuzhan Özgökce',
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteUrl}/${fallbackLocale}/` },
};

export default function RootPage() {
  return (
    <html lang={fallbackLocale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: rootRedirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=/${fallbackLocale}/`} />
        </noscript>
      </head>
      <body>
        <a href={`/${fallbackLocale}/`}>Oğuzhan Özgökce</a>
      </body>
    </html>
  );
}
