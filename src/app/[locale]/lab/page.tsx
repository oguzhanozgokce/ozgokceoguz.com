import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { profile } from '@content/profile';
import { Button } from '@/components/ds/button';
import { CopyButton } from '@/components/ds/copy-button';
import { KbdCombo } from '@/components/ds/kbd';
import { Tag } from '@/components/ds/tag';
import { labFontVariables } from '@/features/lab/fonts';
import { SceneLab } from '@/features/lab/scene-lab';
import { SpringLab } from '@/features/lab/spring-lab';
import { TypeLab } from '@/features/lab/type-lab';
import { isAppLocale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const colorRoles = [
  'canvas',
  'surface-raised',
  'surface-overlay',
  'surface-container',
  'surface-container-highest',
  'primary',
  'primary-container',
  'primary-solid',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'error',
  'info',
  'outline',
  'outline-variant',
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'lab' });
  return { title: t('title'), robots: { index: false, follow: false } };
}

function Block({ index, title, hint, children }: BlockProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="eyebrow">
          {index} / {title}
        </p>
        {hint ? <p className="max-w-2xl text-sm text-on-surface-variant">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

interface BlockProps {
  index: string;
  title: string;
  hint?: string;
  children: ReactNode;
}

export default async function LabPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('lab');

  return (
    <div className={`site-width flex flex-col gap-20 pt-32 ${labFontVariables}`}>
      <header className="flex flex-col gap-4">
        <h1 className="font-display text-6xl font-bold tracking-tight font-stretch-expanded sm:text-8xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant">{t('intro')}</p>
      </header>

      <Block index="01" title={t('type')} hint={t('typeHint')}>
        <TypeLab />
      </Block>

      <Block index="02" title={t('scene')} hint={t('sceneHint')}>
        <SceneLab />
      </Block>

      <Block index="03" title={t('motion')} hint={t('motionHint')}>
        <SpringLab />
      </Block>

      <Block index="04" title={t('colors')}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {colorRoles.map((role) => (
            <div key={role} className="flex flex-col gap-2">
              <div
                style={{ backgroundColor: `var(--${role})` }}
                className="h-16 rounded-item border border-outline-subtle"
              />
              <p className="font-mono text-[11px] text-on-surface-variant">{role}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block index="05" title={t('components')}>
        <div className="flex flex-wrap items-center gap-3">
          <Button>{t('primaryAction')}</Button>
          <Button variant="soft">{t('secondaryAction')}</Button>
          <Button variant="outline" tone="neutral">
            {t('secondaryAction')}
          </Button>
          <Button variant="ghost" tone="neutral">
            {t('secondaryAction')}
          </Button>
          <CopyButton value={profile.email} variant="soft">
            {t('copy')}
          </CopyButton>
          <KbdCombo keys={['mod', 'k']} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="primary">Kotlin</Tag>
          <Tag>Jetpack Compose</Tag>
          <Tag tone="success" dot="pulse">
            Midas
          </Tag>
          <Tag tone="info" variant="outline">
            Kotlin Multiplatform
          </Tag>
        </div>
      </Block>
    </div>
  );
}
