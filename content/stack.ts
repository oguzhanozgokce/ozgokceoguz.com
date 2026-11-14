import type { Localized } from './types';

export interface StackModule {
  id: string;
  gradlePath: string;
  title: Localized;
  items: string[];
  dependsOn: string[];
}

export const stackModules: StackModule[] = [
  {
    id: 'ui',
    gradlePath: ':ui',
    title: { tr: 'Arayüz', en: 'Interface' },
    items: [
      'Jetpack Compose',
      'Compose Multiplatform',
      'Material 3',
      'Navigation 3',
      'XML Views',
      'Coil',
    ],
    dependsOn: ['architecture'],
  },
  {
    id: 'architecture',
    gradlePath: ':architecture',
    title: { tr: 'Mimari', en: 'Architecture' },
    items: [
      'Clean Architecture',
      'MVI',
      'MVVM',
      'Multi-module',
      'Convention plugins',
      'Hilt',
      'Koin',
    ],
    dependsOn: ['data'],
  },
  {
    id: 'data',
    gradlePath: ':data',
    title: { tr: 'Veri', en: 'Data' },
    items: [
      'Coroutines & Flow',
      'Retrofit',
      'Ktor',
      'OkHttp WebSocket',
      'Room',
      'DataStore',
      'Supabase',
    ],
    dependsOn: ['platform'],
  },
  {
    id: 'beyond',
    gradlePath: ':beyond-android',
    title: { tr: 'Android’in ötesi', en: 'Beyond Android' },
    items: ['Kotlin Multiplatform', 'iOS', 'Spring Boot', 'Next.js', 'React', 'TypeScript'],
    dependsOn: [],
  },
  {
    id: 'quality',
    gradlePath: ':quality',
    title: { tr: 'Kalite ve otomasyon', en: 'Quality and automation' },
    items: ['Detekt', 'Ktlint', 'Maestro', 'Pre-commit hooks', 'GitHub Actions', 'Gradle'],
    dependsOn: ['ui', 'architecture', 'data'],
  },
  {
    id: 'platform',
    gradlePath: ':platform',
    title: { tr: 'Platform', en: 'Platform' },
    items: ['Firebase', 'FCM', 'In-App Purchase', 'SIP/VoIP', 'Android Keystore', 'Gemini AI'],
    dependsOn: [],
  },
];
