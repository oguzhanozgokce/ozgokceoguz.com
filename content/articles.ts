import type { Localized } from './types';

export interface Article {
  slug: string;
  title: Localized;
  summary: Localized;
  url: string;
  publishedAt: string;
  readMinutes: number;
  language: 'tr' | 'en';
}

export const articles: Article[] = [
  {
    slug: 'android-to-backend-spring-boot',
    title: {
      tr: "Android Developer'dan Backend Developer'a: Spring Boot ile Modern REST API Geliştirme Rehberi",
      en: 'From Android Developer to Backend Developer: A Guide to Modern REST APIs with Spring Boot',
    },
    summary: {
      tr: 'Android geliştiriciler için backend dünyasına adım atma rehberi: Spring Boot ile sıfırdan REST API, JWT ile kimlik doğrulama ve Android entegrasyonu.',
      en: 'A guide for Android developers stepping into backend work: a REST API from scratch with Spring Boot, JWT authentication and Android integration.',
    },
    url: 'https://ozgokceoguzhan.medium.com/android-developerdan-backend-developer-a-spring-boot-ile-modern-rest-api-geli%C5%9Ftirme-rehberi-bfeca8ce6208',
    publishedAt: '2025-07-11',
    readMinutes: 11,
    language: 'tr',
  },
  {
    slug: 'mvi-architecture-android',
    title: {
      tr: "Android'de MVI (Model-View-Intent) Mimarisi: Temelden Uygulamaya Kadar Her Şey",
      en: 'MVI (Model-View-Intent) Architecture on Android: From Fundamentals to Implementation',
    },
    summary: {
      tr: 'MVI mimarisini temelden uygulamaya kadar ele alan rehber: Android uygulamalarında state yönetimi ve tek yönlü veri akışı.',
      en: 'A guide to MVI from fundamentals to implementation: state management and unidirectional data flow in Android apps.',
    },
    url: 'https://ozgokceoguzhan.medium.com/androidde-mvi-model-view-intent-mimarisi-temelden-uygulamaya-kadar-her-%C5%9Fey-d784c4c3b988',
    publishedAt: '2025-04-27',
    readMinutes: 7,
    language: 'tr',
  },
  {
    slug: 'pre-commit-hooks-code-quality',
    title: {
      tr: "Pre-Commit Hook'lar ile Kod Kalitesini Nasıl Arttırdık?",
      en: 'How We Improved Code Quality with Pre-Commit Hooks',
    },
    summary: {
      tr: "Pre-commit hook'larıyla kod kalitesini nasıl artırdığımızı anlatan pratik rehber: otomatik kod kontrolü ve kalite standartlarının projeye entegrasyonu.",
      en: 'A practical guide to how we raised code quality with pre-commit hooks: automated checks and bringing quality standards into the project.',
    },
    url: 'https://ozgokceoguzhan.medium.com/pre-commit-hooklar-ile-kod-kalitesini-nas%C4%B1l-artt%C4%B1rd%C4%B1k-f0a705e118fa',
    publishedAt: '2024-12-24',
    readMinutes: 6,
    language: 'tr',
  },
  {
    slug: 'hilt-dagger-annotations',
    title: {
      tr: 'Hilt & Dagger Annotations',
      en: 'Hilt & Dagger Annotations',
    },
    summary: {
      tr: "Hilt ve Dagger annotation'larının detaylı kullanımı: Android projelerinde bağımlılık enjeksiyonu için pratik örnekler.",
      en: 'A detailed look at Hilt and Dagger annotations, with practical dependency injection examples for Android projects.',
    },
    url: 'https://ozgokceoguzhan.medium.com/hilt-dagger-annotations-dc74c42bea4f',
    publishedAt: '2024-12-07',
    readMinutes: 5,
    language: 'tr',
  },
];
