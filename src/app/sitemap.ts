import type { MetadataRoute } from 'next';
import { publishedProjects } from '@content/projects';
import { defaultLocale, locales } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

const paths = ['/', ...publishedProjects.map((project) => `/projects/${project.slug}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((alternate) => [alternate, `${siteUrl}/${alternate}${path}`]),
          ['x-default', `${siteUrl}/${defaultLocale}${path}`],
        ]),
      },
    })),
  );
}
