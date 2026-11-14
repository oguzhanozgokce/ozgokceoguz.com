import type { Localized } from './types';

export interface ProjectShot {
  file: string;
  label: Localized;
}

export interface ProjectNote {
  title: Localized;
  points: Localized<string[]>;
}

export interface ProjectDetail {
  role?: Localized;
  gallery?: ProjectShot[];
  notes?: ProjectNote[];
}

export const projectDetails: Record<string, ProjectDetail> = {
  cosum: {
    role: { tr: 'Tasarım, geliştirme ve yayın', en: 'Design, development and release' },
    notes: [
      {
        title: { tr: 'Tek kod tabanı, iki mağaza', en: 'One codebase, two stores' },
        points: {
          tr: [
            'Arayüz ve iş mantığı Kotlin Multiplatform ve Compose Multiplatform ile ortak yazıldı.',
            'Hesaplar ve veriler Supabase üzerinde; ağ katmanı Ktor, bağımlılık yönetimi Koin.',
            'Google Play ve App Store’da yayında; tanıtım sitesi ve web uygulaması cosum.app adresinde.',
          ],
          en: [
            'Interface and business logic are shared through Kotlin Multiplatform and Compose Multiplatform.',
            'Accounts and data live on Supabase; networking is Ktor and dependency injection is Koin.',
            'Live on Google Play and the App Store, with the marketing site and web app at cosum.app.',
          ],
        },
      },
    ],
  },
  midmoney: {
    gallery: [
      { file: 'market', label: { tr: 'Piyasa', en: 'Market' } },
      { file: 'detail', label: { tr: 'Hisse detayı', en: 'Stock detail' } },
      { file: 'watchlist', label: { tr: 'Takip listesi', en: 'Watchlist' } },
      { file: 'profile', label: { tr: 'Profil', en: 'Profile' } },
    ],
    notes: [
      {
        title: { tr: 'Mimari', en: 'Architecture' },
        points: {
          tr: [
            'Bağımlılık yönü feature → plugin → library. Feature’lar birbirini, library’ler plugin’leri görmez.',
            'Bir feature bir plugin’le yalnızca client facade üzerinden konuşur, repository’ye doğrudan erişmez.',
            'Build ayarlarının tek kaynağı convention plugin’ler; 22 modül aynı kurallarla derlenir.',
          ],
          en: [
            'Dependencies point feature → plugin → library. Features never see each other and libraries never see plugins.',
            'A feature talks to a plugin only through its client facade, never to a repository directly.',
            'Convention plugins are the single source of build configuration, so all 22 modules build by the same rules.',
          ],
        },
      },
      {
        title: { tr: 'Öne çıkan kararlar', en: 'Key decisions' },
        points: {
          tr: [
            'MVI kalıtımla değil delegasyonla: ViewModel state, action ve effect’i bir base class’tan türemeden alır.',
            'State bir StateFlow, tek seferlik effect’ler bir Channel; böylece bir toast yapılandırma değişiminde iki kez tetiklenmez.',
            'Navigasyon bir komut yolu: ViewModel hedefi bildirir, NavController ViewModel’e sızmaz.',
            'Hatalar veri katmanında bir kez sınıflandırılır; ViewModel hiçbir Throwable’a bakmaz.',
          ],
          en: [
            'MVI by delegation rather than inheritance: a ViewModel gets state, actions and effects without a base class.',
            'State is a StateFlow and one-shot effects are a Channel, so a toast never fires twice after a configuration change.',
            'Navigation is a command bus: a ViewModel names the destination and no NavController leaks into it.',
            'Errors are classified once, in the data layer; a ViewModel never inspects a Throwable.',
          ],
        },
      },
      {
        title: { tr: 'Kalite', en: 'Quality' },
        points: {
          tr: [
            '68 birim testi: tüm feature ViewModel’leri, hata yönetimi ve analytics yönlendirmesi.',
            '9 Maestro akışıyla uçtan uca test.',
            'detekt uyarıları hata sayılır ve baseline dosyası yoktur; biçim için ktlint.',
            'Her push ve pull request’te GitHub Actions: ktlint, detekt, testler, derleme.',
          ],
          en: [
            '68 unit tests: every feature ViewModel, the error handler and analytics routing.',
            '9 end-to-end Maestro flows.',
            'detekt treats warnings as errors with no baseline file; ktlint handles formatting.',
            'GitHub Actions on every push and pull request: ktlint, detekt, tests, assemble.',
          ],
        },
      },
    ],
  },
  'highwren-ui': {
    notes: [
      {
        title: { tr: 'Nasıl çalışır', en: 'How it works' },
        points: {
          tr: [
            'Bileşenler React Aria Components üzerine kurulu; klavye, odak ve ekran okuyucu davranışı hazır gelir.',
            'Tek bir renkten açık ve koyu mod ile üç kontrast seviyesi için tüm roller üretilir.',
            'Bileşenler bir shadcn registry’sinden kaynak kod olarak kurulur ve projenin malı olur.',
            'Hareket ayarı tek yerden yönetilir; işletim sistemindeki azaltılmış hareket tercihine uyar.',
          ],
          en: [
            'Components are built on React Aria Components, so keyboard, focus and screen reader behaviour come included.',
            'Every colour role is generated from one seed, for light and dark modes and three contrast levels.',
            'Components install as source from a shadcn registry and become part of your project.',
            'Motion is configured in one place and follows the operating system’s reduced motion preference.',
          ],
        },
      },
    ],
  },
  'cosum-web': {
    notes: [
      {
        title: { tr: 'Nasıl çalışır', en: 'How it works' },
        points: {
          tr: [
            'Site Next.js ile statik olarak üretilir ve paylaşımlı hosting üzerinde Apache ile sunulur; istek anında çalışan bir sunucu yoktur.',
            'Oturumlu veriler çalışma zamanında Supabase’den, mobil uygulamalarla aynı hesap ve erişim kurallarıyla yüklenir.',
            '18 dilde yayınlanır; dil, tarayıcının tercihine göre sunucu kurallarıyla seçilir.',
          ],
          en: [
            'The site is statically generated with Next.js and served by Apache on shared hosting; no server runs at request time.',
            'Signed-in data loads at runtime from Supabase with the same account and access rules as the mobile apps.',
            'Published in 18 languages; the language is chosen by server rules from the browser’s preference.',
          ],
        },
      },
    ],
  },
  'marmara-b2b': {
    role: { tr: 'Bitirme projesi', en: 'Graduation project' },
    gallery: [
      { file: 'home', label: { tr: 'Ana ekran', en: 'Home' } },
      { file: 'detail', label: { tr: 'Ürün detayı', en: 'Product detail' } },
      { file: 'cart', label: { tr: 'Sepet', en: 'Cart' } },
      { file: 'payment', label: { tr: 'Ödeme', en: 'Payment' } },
      { file: 'favorite', label: { tr: 'Favoriler', en: 'Favourites' } },
      { file: 'profile', label: { tr: 'Profil', en: 'Profile' } },
      { file: 'seller-dashboard', label: { tr: 'Satıcı paneli', en: 'Seller dashboard' } },
      { file: 'add-product', label: { tr: 'Ürün ekleme', en: 'Add product' } },
    ],
    notes: [
      {
        title: { tr: 'Teknik yapı', en: 'Technical structure' },
        points: {
          tr: [
            'Marmara Üniversitesi’ndeki bitirme tezimin parçası: işletmelerin katalog gezip sipariş yönettiği bir B2B uygulaması.',
            'Clean Architecture üzerinde MVVM ve MVI; tip güvenli navigasyon ve alt gezinme çubuğu.',
            'Hilt, Retrofit, Coroutines Flow ve Coil; statik analiz için Detekt, bağımlılıklar için version catalog.',
          ],
          en: [
            'Part of my graduation thesis at Marmara University: a B2B app where businesses browse catalogues and manage orders.',
            'MVVM and MVI on Clean Architecture, with type-safe navigation and a bottom navigation bar.',
            'Hilt, Retrofit, Coroutines Flow and Coil; Detekt for static analysis and a version catalog for dependencies.',
          ],
        },
      },
    ],
  },
  'language-learning': {
    role: { tr: 'Ekip lideri', en: 'Team lead' },
    gallery: [
      { file: 'home', label: { tr: 'Ana ekran', en: 'Home' } },
      { file: 'category', label: { tr: 'Kategori', en: 'Category' } },
      { file: 'question', label: { tr: 'Soru', en: 'Question' } },
      { file: 'speak', label: { tr: 'Konuşma', en: 'Speaking' } },
      { file: 'word-match', label: { tr: 'Kelime eşleştirme', en: 'Word match' } },
      { file: 'word-puzzle', label: { tr: 'Kelime bulmacası', en: 'Word puzzle' } },
    ],
  },
  'ecommerce-compose': {
    role: { tr: 'Üç kişilik ekipte ekip lideri', en: 'Team lead in a team of three' },
    gallery: [
      { file: 'home', label: { tr: 'Ana ekran', en: 'Home' } },
      { file: 'detail', label: { tr: 'Ürün detayı', en: 'Product detail' } },
      { file: 'category', label: { tr: 'Kategoriler', en: 'Categories' } },
      { file: 'search', label: { tr: 'Arama', en: 'Search' } },
      { file: 'cart', label: { tr: 'Sepet', en: 'Cart' } },
      { file: 'favorite', label: { tr: 'Favoriler', en: 'Favourites' } },
    ],
    notes: [
      {
        title: { tr: 'Teknik yapı', en: 'Technical structure' },
        points: {
          tr: [
            'Tamamı Jetpack Compose ile yazıldı; Clean Architecture üzerinde MVVM ve MVI.',
            'Hilt, Retrofit ve Room; kimlik doğrulama ve veri için Firebase Auth ve Firestore.',
            'Statik analiz için Detekt, görseller için Coil, bağımlılıklar için version catalog.',
          ],
          en: [
            'Written entirely in Jetpack Compose, with MVVM and MVI on Clean Architecture.',
            'Hilt, Retrofit and Room; Firebase Auth and Firestore for sign-in and data.',
            'Detekt for static analysis, Coil for images and a version catalog for dependencies.',
          ],
        },
      },
    ],
  },
};
