import type { LabelOverrides } from '@/lib/ds/labels';
import type { AppLocale } from '@/i18n/routing';

const turkish: LabelOverrides = {
  button: { pending: 'Yükleniyor' },
  iconButton: { pending: 'Yükleniyor' },
  link: { opensInNewTab: '(yeni sekmede açılır)' },
  popover: { close: 'Kapat' },
  sheet: { close: 'Kapat', dragHandle: 'Paneli yeniden boyutlandır' },
  dialog: { close: 'Kapat' },
  copyButton: { copy: 'Kopyala', copied: 'Kopyalandı', copyFailed: 'Kopyalanamadı' },
  searchField: { search: 'Ara', clear: 'Aramayı temizle', searching: 'Aranıyor' },
  lightbox: {
    title: 'Görsel görüntüleyici',
    close: 'Görsel görüntüleyiciyi kapat',
    previous: 'Önceki görsel',
    next: 'Sonraki görsel',
    thumbnails: 'Bir görsel seç',
    viewport: 'Görsel alanı',
    zoomIn: 'Yakınlaştır',
    zoomOut: 'Uzaklaştır',
    fit: 'Görseli sığdır',
    loading: 'Görsel yükleniyor',
    error: 'Bu görsel yüklenemedi.',
    retry: 'Tekrar dene',
    position: '{current} / {total}',
    thumbnail: 'Görsel {number}: {name}',
  },
};

export function dsLabels(locale: AppLocale): LabelOverrides | undefined {
  return locale === 'tr' ? turkish : undefined;
}
