import type { Localized } from './types';

export type ProjectPlatform = 'android' | 'ios' | 'web';

export interface ProjectLinks {
  github?: string;
  playStore?: string;
  appStore?: string;
  website?: string;
}

export interface Project {
  slug: string;
  title: Localized;
  tagline: Localized;
  description: Localized;
  year: number;
  platforms: ProjectPlatform[];
  stack: string[];
  links: ProjectLinks;
  icon?: string;
  highlights?: Localized<string[]>;
  stars?: number;
  draft?: boolean;
}

export const featuredProjects: Project[] = [
  {
    slug: 'cosum',
    title: { tr: 'Cosum', en: 'Cosum' },
    tagline: {
      tr: 'Grup harcamalarını bölüşen uygulama',
      en: 'An app for splitting group expenses',
    },
    description: {
      tr: 'Grup harcamalarını takip edip kimin kime ne kadar borçlu olduğunu hesaplayan, Android ve iOS için geliştirip yayınladığım hesap bölüşme uygulaması.',
      en: 'A bill-splitting app that tracks group expenses and works out who owes whom. I built and published it for both Android and iOS.',
    },
    year: 2026,
    platforms: ['android', 'ios'],
    stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Supabase', 'Koin', 'Ktor'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=app.oguzhanozgokce.cosum',
      appStore: 'https://apps.apple.com/app/id6798811181',
      website: 'https://cosum.app',
    },
    icon: '/assets/images/cosum_icon.png',
    highlights: {
      tr: ['Tek kod tabanından Android ve iOS', 'Google Play ve App Store’da yayında'],
      en: ['Android and iOS from one codebase', 'Live on Google Play and the App Store'],
    },
  },
  {
    slug: 'midmoney',
    title: { tr: 'MidMoney', en: 'MidMoney' },
    tagline: {
      tr: 'Mimarisi için yazılmış piyasa takip uygulaması',
      en: 'A market tracker written for its architecture',
    },
    description: {
      tr: 'Finnhub API üzerine kurulu native Android piyasa takip uygulaması: filtreli hisse listesi, sembol arama, canlı WebSocket fiyatlı detay ekranı, şirket haberleri ve yerelde saklanan izleme listesi. Uygulama bilinçli olarak küçük, asıl konu mimari: feature, plugin ve library katmanlarında 22 Gradle modülü, convention plugin’ler ve hepsini kapsayan tek kalite kapısı.',
      en: 'A native Android market-tracking app built on the Finnhub API: a filtered stock list, symbol search, a detail screen with live WebSocket pricing, company news and a locally persisted watchlist. The app is intentionally small; the architecture is the point: 22 Gradle modules across feature, plugin and library layers, wired by convention plugins, with a single quality gate over all of it.',
    },
    year: 2026,
    platforms: ['android'],
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'Navigation 3',
      'Hilt',
      'Coroutines & Flow',
      'Retrofit',
      'OkHttp WebSocket',
      'DataStore',
      'Firebase',
    ],
    links: { github: 'https://github.com/oguzhanozgokce/MidMoney' },
    highlights: {
      tr: ['22 Gradle modülü', 'Convention plugin’ler', 'Canlı WebSocket fiyatları'],
      en: ['22 Gradle modules', 'Convention plugins', 'Live WebSocket pricing'],
    },
  },
  {
    slug: 'highwren-ui',
    title: { tr: 'Highwren UI', en: 'Highwren UI' },
    tagline: {
      tr: 'Tek renkten türeyen temalı React bileşenleri',
      en: 'React components themed from one seed colour',
    },
    description: {
      tr: 'Erişilebilir React bileşenleri, ortak kurallar ve tek bir renkten türeyen temalar. Bileşenler shadcn registry üzerinden kaynak kod olarak kurulur ve projenin malı olur. Bu site de onunla yapıldı.',
      en: 'Accessible React components, shared conventions and themes generated from a single seed colour. Components install as source through a shadcn registry and become part of your project. This site is built with it.',
    },
    year: 2026,
    platforms: ['web'],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'React Aria Components', 'Motion'],
    links: {
      github: 'https://github.com/oguzhanozgokce/web-design-system',
      website: 'https://ui.highwren.com',
    },
    highlights: {
      tr: ['60’tan fazla bileşen', 'Açık ve koyu mod, üç kontrast seviyesi'],
      en: ['More than 60 components', 'Light and dark modes, three contrast levels'],
    },
  },
  {
    slug: 'cosum-web',
    title: { tr: 'Cosum Web', en: 'Cosum Web' },
    tagline: {
      tr: 'cosum.app sitesi ve tarayıcı uygulaması',
      en: 'The cosum.app site and browser app',
    },
    description: {
      tr: 'Cosum’un tanıtım sitesi ve oturum açılan tarayıcı uygulaması. Next.js ile statik olarak üretilir; hesap verileri çalışma zamanında Supabase’den, mobil uygulamalarla aynı hesap ve erişim kurallarıyla gelir. 18 dilde yayında.',
      en: 'The marketing site and signed-in browser app for Cosum. It is statically generated with Next.js; account data loads at runtime from Supabase with the same account and access rules as the mobile apps. Available in 18 languages.',
    },
    year: 2026,
    platforms: ['web'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS 4', 'next-intl', 'Supabase'],
    links: { website: 'https://cosum.app' },
  },
  {
    slug: 'wova',
    title: { tr: 'Wova', en: 'Wova' },
    tagline: { tr: '', en: '' },
    description: { tr: '', en: '' },
    year: 2026,
    platforms: ['web'],
    stack: [],
    links: {},
    draft: true,
  },
  {
    slug: 'marmara-b2b',
    title: { tr: 'Marmara B2B', en: 'Marmara B2B' },
    tagline: {
      tr: 'Bitirme projesi: B2B e-ticaret platformu',
      en: 'Graduation project: a B2B e-commerce platform',
    },
    description: {
      tr: 'Bitirme projesi olarak geliştirdiğim B2B e-ticaret platformu. Alıcı ve satıcı akışları, gerçek zamanlı bildirimler ve kapsamlı ürün yönetimi içerir; MVVM-MVI, Hilt ve Room üzerine kurulu.',
      en: 'A B2B e-commerce platform I built as my graduation project. It includes buyer and seller flows, real-time notifications and full product management, built on MVVM-MVI, Hilt and Room.',
    },
    year: 2025,
    platforms: ['android'],
    stack: ['Kotlin', 'Jetpack Compose', 'MVVM-MVI', 'Hilt', 'Room', 'Retrofit', 'FCM'],
    links: { github: 'https://github.com/oguzhanozgokce/Marmara_MobilB2B_Ecommerce' },
    stars: 3,
  },
  {
    slug: 'language-learning',
    title: { tr: 'Dil Öğrenme Uygulaması', en: 'Language Learning App' },
    tagline: {
      tr: 'Google Play’de yayınlanan İngilizce öğrenme uygulaması',
      en: 'An English learning app published on Google Play',
    },
    description: {
      tr: 'Ekip lideri olarak geliştirdiğim İngilizce öğrenme uygulaması. Firebase Auth, veritabanı ve Google ile giriş entegrasyonunu kurdum; Clean Architecture ve MVI kullandım.',
      en: 'An English learning app I built as team lead. I set up Firebase Auth, the database and Google sign-in, using Clean Architecture and MVI.',
    },
    year: 2025,
    platforms: ['android'],
    stack: ['Kotlin', 'Firebase', 'Clean Architecture', 'MVI', 'Google Auth'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.og.languagelearning',
    },
  },
  {
    slug: 'ecommerce-compose',
    title: { tr: 'E-Commerce Compose', en: 'E-Commerce Compose' },
    tagline: {
      tr: 'Ekip lideri olarak geliştirdiğim e-ticaret uygulaması',
      en: 'An e-commerce app I led as team lead',
    },
    description: {
      tr: 'Ürün listeleme, favoriler, sepet, sipariş ve kullanıcı yönetimi içeren e-market uygulaması. Geliştirme sürecinde ekip lideri olarak görev aldım.',
      en: 'An e-market app with product listing, favourites, cart, orders and user management. I served as team lead during development.',
    },
    year: 2024,
    platforms: ['android'],
    stack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room', 'Retrofit'],
    links: { github: 'https://github.com/oguzhanozgokce/ECommerceCompose' },
    stars: 10,
  },
];

export interface SideProject {
  slug: string;
  title: string;
  description: Localized;
  stack: string[];
  github?: string;
}

export const sideProjects: SideProject[] = [
  {
    slug: 'kotlin-error-handling',
    title: 'Kotlin Error Handling',
    description: {
      tr: 'Kotlin ve Flow ile Android uygulamaları için temiz, test edilebilir ve genişletilebilir API hata yönetimi yapısı.',
      en: 'A clean, testable and extensible API error handling structure for Android apps with Kotlin and Flow.',
    },
    stack: ['Kotlin', 'Flow', 'Retrofit'],
    github: 'https://github.com/oguzhanozgokce/Kotlin-Error-Handling',
  },
  {
    slug: 'package-version-cicd',
    title: 'Package Version CI/CD',
    description: {
      tr: 'Android uygulamaları için branch tabanlı otomatik versiyonlama ve GitHub Actions ile build, kalite kontrolü ve release hattı.',
      en: 'Branch-based automatic versioning for Android apps, with a GitHub Actions pipeline for builds, quality checks and releases.',
    },
    stack: ['GitHub Actions', 'Gradle', 'Detekt', 'Ktlint'],
  },
  {
    slug: 'boot-mobile-secure',
    title: 'BootMobileSecure',
    description: {
      tr: 'Kendi yazdığım Spring Boot backend’iyle çalışan Android uygulaması: JWT ile kimlik doğrulama ve Android Keystore destekli şifreleme.',
      en: 'An Android app that works with a Spring Boot backend I wrote: JWT authentication and encryption backed by the Android Keystore.',
    },
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Android Keystore'],
    github: 'https://github.com/oguzhanozgokce/BootMobileSecure',
  },
  {
    slug: 'spring-boot-project',
    title: 'Spring Boot Backend',
    description: {
      tr: 'Clean Architecture ve SOLID ile yazılmış Spring Boot backend: JWT ve refresh token, rol tabanlı yetkilendirme, entegrasyon testleri.',
      en: 'A Spring Boot backend written with Clean Architecture and SOLID: JWT with refresh tokens, role-based access control and integration tests.',
    },
    stack: ['Kotlin', 'Spring Boot', 'Spring Security', 'JPA'],
    github: 'https://github.com/oguzhanozgokce/SpringBootProject',
  },
  {
    slug: 'car-assistant-ai',
    title: 'Car Assistant AI',
    description: {
      tr: 'Gemini AI ile geliştirdiğim sesli araç asistanı: sesli komutla araç bilgisi sorgulama, navigasyon yardımı ve bakım hatırlatmaları.',
      en: 'A voice car assistant I built with Gemini AI: vehicle queries by voice, navigation help and maintenance reminders.',
    },
    stack: ['Kotlin', 'Gemini AI', 'Speech Recognition', 'TTS'],
  },
];

export const publishedProjects = featuredProjects.filter((project) => !project.draft);
