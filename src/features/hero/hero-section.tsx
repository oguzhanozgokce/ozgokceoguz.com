import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';
import { organizations, roles } from '@content/experience';
import github from '@content/generated/github.json';
import { profile } from '@content/profile';
import { publishedProjects } from '@content/projects';
import { ButtonLink } from '@/components/ds/button';
import type { AppLocale } from '@/i18n/routing';
import { AppAnatomy } from './app-anatomy';
import { ProfileScreen } from './profile-screen';

function enter(order: number) {
  return { '--enter': order } as CSSProperties;
}

export async function HeroSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('hero');
  const anatomy = await getTranslations('anatomy');
  const current = roles.find((role) => role.end === null);
  const organization = current ? organizations[current.organization] : null;
  const company = organization?.name ?? '';
  const apps = publishedProjects.filter(
    (project) => project.links.playStore || project.links.appStore,
  ).length;
  const screenStats = [
    { value: new Intl.NumberFormat(locale).format(github.total), label: t('screenContributions') },
    { value: String(apps), label: t('screenApps') },
  ];
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <section className="site-width grid min-h-dvh items-center gap-x-10 gap-y-14 pt-28 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex flex-col gap-7">
        <p style={enter(0)} className="eyebrow motion-safe:hero-enter">
          {t('greeting')}
        </p>
        <h1 className="font-display text-[clamp(2.75rem,13vw,5.5rem)] leading-[0.9] font-bold tracking-tight font-stretch-expanded lg:text-[clamp(4rem,7.2vw,6.5rem)]">
          <span className="block">
            <span style={enter(1)} className="block motion-safe:hero-settle">
              {firstName}
            </span>
          </span>
          <span className="block">
            <span style={enter(2)} className="block motion-safe:hero-settle">
              {rest.join(' ')}
            </span>
          </span>
        </h1>
        <p
          style={enter(4)}
          className="font-mono text-sm text-primary motion-safe:hero-enter sm:text-base"
        >
          {profile.roles[locale].join(' · ')}
        </p>
        <p
          style={enter(5)}
          className="max-w-xl text-lg text-pretty text-on-surface-variant motion-safe:hero-settle sm:text-xl"
        >
          {profile.summary[locale]}
        </p>
        {current ? (
          <p
            style={enter(6)}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm motion-safe:hero-enter"
          >
            <span className="eyebrow">{t('now')}</span>
            <span lang="en" className="flex items-center gap-2 text-on-surface">
              <span aria-hidden="true" className="size-2 rounded-full bg-success-solid" />
              {current.title[locale]} · {company}
            </span>
          </p>
        ) : null}
        <div style={enter(7)} className="flex flex-wrap items-center gap-3 motion-safe:hero-enter">
          <ButtonLink href="#contact" size="lg">
            {t('contact')}
          </ButtonLink>
          <ButtonLink href={profile.cv[locale]} download variant="outline" tone="neutral" size="lg">
            {t('cv')}
          </ButtonLink>
        </div>
      </div>
      <div style={enter(5)} className="motion-safe:hero-enter">
        <AppAnatomy
          labels={{
            caption: anatomy('caption'),
            view: anatomy('view'),
            preview: anatomy('preview'),
            layers: anatomy('layers'),
            ui: anatomy('ui'),
            presentation: anatomy('presentation'),
            domain: anatomy('domain'),
            data: anatomy('data'),
            steps: [
              anatomy('step1'),
              anatomy('step2'),
              anatomy('step3'),
              anatomy('step4'),
              anatomy('step5'),
            ],
          }}
          screen={
            <ProfileScreen
              role={profile.roles[locale][1]}
              nowLabel={t('now')}
              company={company}
              companyLogo={organization?.logo ?? profile.photo}
              action={t('contact')}
              stats={screenStats}
            />
          }
        />
      </div>
    </section>
  );
}
