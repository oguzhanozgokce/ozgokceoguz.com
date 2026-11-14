import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@content/profile';
import { isAppLocale, locales, defaultLocale } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = profile.name;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const layers = [
  { color: '#3a2a2e', border: '#b0607a', offset: 0 },
  { color: '#2f2b40', border: '#8f7bd6', offset: 62 },
  { color: '#2b2550', border: '#7f52ff', offset: 124 },
  { color: '#17171a', border: '#4a4a55', offset: 186 },
];

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = isAppLocale(requested) ? requested : defaultLocale;
  const photo = await readFile(join(process.cwd(), 'public', profile.photo));
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        background: '#111113',
        padding: 72,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: 720,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src={photoSrc}
            width={72}
            height={72}
            alt=""
            style={{ borderRadius: 36, border: '3px solid #7f52ff' }}
          />
          <div style={{ display: 'flex', fontSize: 30, color: '#e6e1e9' }}>
            oguzhan<span style={{ color: '#a78bff' }}>.kt</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: '#f4f0f7',
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 32, color: '#a78bff' }}>{profile.roles[locale].join(' · ')}</div>
        </div>

        <div style={{ fontSize: 26, color: '#938f99' }}>{siteUrl.replace(/^https?:\/\//, '')}</div>
      </div>

      <div style={{ display: 'flex', position: 'relative', width: 300, height: 486 }}>
        {layers.map((layer) => (
          <div
            key={layer.offset}
            style={{
              position: 'absolute',
              top: 186 - layer.offset,
              left: layer.offset / 3,
              width: 230,
              height: 300,
              borderRadius: 34,
              background: layer.color,
              border: `2px solid ${layer.border}`,
              transform: 'skewY(-18deg)',
            }}
          />
        ))}
      </div>
    </div>,
    size,
  );
}
