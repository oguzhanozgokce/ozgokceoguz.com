import { organizations, roles } from '@content/experience';
import { profile } from '@content/profile';
import type { AppLocale } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

export function personSchema(locale: AppLocale) {
  const current = roles.find((role) => role.end === null);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${siteUrl}/${locale}/`,
    image: `${siteUrl}${profile.photo}`,
    jobTitle: profile.roles[locale][1],
    description: profile.summary[locale],
    worksFor: current
      ? { '@type': 'Organization', name: organizations[current.organization].name }
      : undefined,
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Marmara Üniversitesi' },
    address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
    knowsAbout: ['Android', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform'],
    sameAs: Object.values(profile.links),
  };
}
