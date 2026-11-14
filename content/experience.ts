import type { Localized, YearMonth } from './types';

export type OrganizationId = 'midas' | 'teknasyon' | 'orion';

export interface Organization {
  name: string;
  logo: string;
}

export const organizations: Record<OrganizationId, Organization> = {
  midas: { name: 'Midas', logo: '/assets/images/midas_logo.png' },
  teknasyon: { name: 'Teknasyon', logo: '/assets/images/teknasyon_icon.jpeg' },
  orion: { name: 'Orion Innovation', logo: '/assets/images/orion_logo.jpeg' },
};

export type RoleKind = 'full-time' | 'internship';

export interface Role {
  id: string;
  organization: OrganizationId;
  product?: { name: string; logo: string };
  title: Localized;
  kind: RoleKind;
  start: YearMonth;
  end: YearMonth | null;
  location: Localized;
  summary: Localized;
  technologies: string[];
}

const istanbul: Localized = { tr: 'İstanbul, Türkiye', en: 'Istanbul, Türkiye' };

export const roles: Role[] = [
  {
    id: 'midas-android',
    organization: 'midas',
    title: { tr: 'Software Engineer, Android', en: 'Software Engineer, Android' },
    kind: 'full-time',
    start: { year: 2026, month: 9 },
    end: null,
    location: istanbul,
    summary: {
      tr: 'Midas ve Midas Kripto uygulamalarının Android geliştirme süreçlerinde aktif rol alıyorum.',
      en: 'I work on Android development for the Midas and Midas Crypto apps.',
    },
    technologies: ['Kotlin', 'Android'],
  },
  {
    id: 'telicall-product',
    organization: 'teknasyon',
    product: { name: 'Telicall', logo: '/assets/images/telicall_icon.png' },
    title: { tr: 'Product Engineer', en: 'Product Engineer' },
    kind: 'full-time',
    start: { year: 2026, month: 5 },
    end: { year: 2026, month: 9 },
    location: istanbul,
    summary: {
      tr: "Ağırlıklı olarak Android tarafında yeni özelliklerin geliştirilmesinde uçtan uca sorumluluk aldım. SIP/VoIP altyapısı, uygulama içi satın alma, bakiye ve paket yönetimi ile numara doğrulama gibi özelliklere katkı sağladım; Telicall'ın web uygulamasında da geliştirme desteği verdim.",
      en: "I owned new features end to end, mostly on Android. I contributed to the SIP/VoIP stack, in-app purchases, balance and package management and number verification, and also supported development of Telicall's web app.",
    },
    technologies: ['Kotlin', 'Android', 'SIP/VoIP', 'In-App Purchase', 'Web'],
  },
  {
    id: 'telicall-android',
    organization: 'teknasyon',
    product: { name: 'Telicall', logo: '/assets/images/telicall_icon.png' },
    title: { tr: 'Android Developer', en: 'Android Developer' },
    kind: 'full-time',
    start: { year: 2025, month: 10 },
    end: { year: 2026, month: 5 },
    location: istanbul,
    summary: {
      tr: "VoIP üzerinden ikinci telefon numarasıyla uluslararası arama ve mesajlaşma sunan Telicall'ın Android uygulamasını geliştirdim. Kotlin ve Jetpack Compose ile Clean Architecture ve modüler yapıya uygun ekranlar yazdım; Maestro ile UI testlerine, Detekt ve Ktlint ile kod kalitesine katkı sağladım.",
      en: 'I built the Android app for Telicall, which offers international calls and messaging over VoIP with a second phone number. I wrote screens in Kotlin and Jetpack Compose following Clean Architecture and a modular structure, and contributed UI tests with Maestro and code quality checks with Detekt and Ktlint.',
    },
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Clean Architecture',
      'MVVM',
      'MVI',
      'Room',
      'Retrofit',
      'Flow',
      'Coroutines',
      'Maestro',
      'Detekt',
      'Ktlint',
    ],
  },
  {
    id: 'orion-long-term',
    organization: 'orion',
    title: { tr: 'Android Uzun Dönem Stajyer', en: 'Android Long-Term Intern' },
    kind: 'internship',
    start: { year: 2024, month: 9 },
    end: { year: 2025, month: 2 },
    location: istanbul,
    summary: {
      tr: 'Jetpack Compose ve Clean Architecture ile ileri düzey Android geliştirmeye odaklanan uzun dönem staj.',
      en: 'A long-term internship focused on advanced Android development with Jetpack Compose and Clean Architecture.',
    },
    technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'MVI', 'Clean Architecture'],
  },
  {
    id: 'orion-summer',
    organization: 'orion',
    title: { tr: 'Android Developer Stajyer', en: 'Android Developer Intern' },
    kind: 'internship',
    start: { year: 2024, month: 6 },
    end: { year: 2024, month: 9 },
    location: istanbul,
    summary: {
      tr: 'Kotlin, Material Design ve Android en iyi uygulamalarıyla mobil geliştirmeye odaklanan yaz stajı.',
      en: 'A summer internship focused on mobile development with Kotlin, Material Design and Android best practices.',
    },
    technologies: [
      'Kotlin',
      'Android SDK',
      'MVVM',
      'Material Design',
      'Retrofit',
      'Hilt',
      'Coroutines',
    ],
  },
  {
    id: 'teknasyon-intern',
    organization: 'teknasyon',
    title: { tr: 'Android Developer Stajyer', en: 'Android Developer Intern' },
    kind: 'internship',
    start: { year: 2023, month: 6 },
    end: { year: 2023, month: 9 },
    location: istanbul,
    summary: {
      tr: 'İlk profesyonel Android deneyimim: temel konular, ekip içinde çalışma ve endüstri standardı uygulamalar.',
      en: 'My first professional Android experience: fundamentals, working in a team and industry-standard practices.',
    },
    technologies: ['Kotlin', 'Android', 'MVVM', 'XML', 'SQLite', 'Retrofit'],
  },
];
