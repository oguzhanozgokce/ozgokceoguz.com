import type { Localized } from './types';

export const profile = {
  name: 'Oğuzhan Özgökce',
  initials: 'OÖ',
  roles: {
    tr: ['Bilgisayar Mühendisi', 'Software Engineer'],
    en: ['Computer Engineer', 'Software Engineer'],
  } satisfies Localized<string[]>,
  headline: {
    tr: 'Kotlin ile ölçeklenen Android uygulamaları geliştiriyorum.',
    en: 'I build Android apps in Kotlin that scale.',
  } satisfies Localized,
  summary: {
    tr: "Midas'ta Android mühendisiyim. Jetpack Compose, modüler mimari ve temiz kod üzerine çalışıyorum; kendi ürünlerimi Kotlin Multiplatform ile Android ve iOS'a çıkarıyorum. Marmara Üniversitesi Bilgisayar Mühendisliği mezunuyum.",
    en: 'I am an Android engineer at Midas. I work with Jetpack Compose, modular architecture and clean code, and I ship my own products to Android and iOS with Kotlin Multiplatform. I hold a Computer Engineering degree from Marmara University.',
  } satisfies Localized,
  location: {
    tr: 'İstanbul, Türkiye',
    en: 'Istanbul, Türkiye',
  } satisfies Localized,
  email: 'oguzhanozgokce@gmail.com',
  photo: '/assets/images/oguzhanozgokce-profile-2026.jpg',
  cv: {
    tr: '/assets/documents/OguzhanOzgokceCV2026.pdf',
    en: '/assets/documents/OguzhanOzgokceCV2026.pdf',
  } satisfies Localized,
  links: {
    github: 'https://github.com/oguzhanozgokce',
    linkedin: 'https://www.linkedin.com/in/oğuzhan-özgökce',
    medium: 'https://ozgokceoguzhan.medium.com/',
  },
  githubUsername: 'oguzhanozgokce',
} as const;
