import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ViewTransition } from 'react';
import { publishedProjects, sideProjects, type Project } from '@content/projects';
import { Section } from '@/components/layout/section';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { ArrowLink } from '@/components/ui/arrow-link';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { Pill } from '@/components/ui/pill';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/ds/utils';
import { HighwrenDemo } from './highwren-demo';
import { ProjectLinks, type ProjectLinkLabels } from './project-links';

const spans: Record<string, string> = {
  cosum: 'lg:col-span-3 lg:row-span-2',
  midmoney: 'lg:col-span-3 lg:row-span-2',
  'highwren-ui': 'lg:col-span-4',
  'cosum-web': 'lg:col-span-2',
  'marmara-b2b': 'lg:col-span-2 lg:row-span-2',
  'language-learning': 'lg:col-span-2 lg:row-span-2',
  'ecommerce-compose': 'lg:col-span-2 lg:row-span-2',
};

const shots: Record<string, string[]> = {
  midmoney: ['detail', 'market'],
  'marmara-b2b': ['home'],
  'language-learning': ['home'],
  'ecommerce-compose': ['home'],
};

const detailed = new Set(['cosum', 'midmoney']);

const sideShots = new Set(['midmoney']);

type Translate = Awaited<ReturnType<typeof getTranslations<'projects'>>>;

function Shots({ slug, title }: { slug: string; title: string }) {
  const names = shots[slug];
  if (!names) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative mt-auto flex h-56 justify-end pe-2 lg:absolute lg:end-0 lg:bottom-0 lg:mt-0 lg:pe-6',
        sideShots.has(slug)
          ? 'lg:top-0 lg:h-auto lg:w-[40%] lg:items-end'
          : 'lg:start-0 lg:h-[46%]',
      )}
    >
      {names.map((name, index) => (
        <PhoneFrame
          key={name}
          className={cn(
            'w-40 shrink-0 transition-transform duration-500 ease-fluid motion-reduce:transition-none',
            sideShots.has(slug) ? 'lg:w-[72%]' : 'lg:w-[42%] lg:max-w-52',
            index === 0 && names.length > 1
              ? 'translate-x-10 translate-y-10 -rotate-6 group-hover/spot:translate-y-6'
              : 'translate-y-4 rotate-3 group-hover/spot:translate-y-0 group-hover/spot:rotate-1',
          )}
        >
          <Image
            src={`/assets/projects/${slug}/${name}.webp`}
            alt={title}
            width={640}
            height={1400}
            sizes="220px"
            className="size-full object-cover object-top"
          />
        </PhoneFrame>
      ))}
    </div>
  );
}

function Card({ project, locale, t, labels }: CardProps) {
  const platforms = project.platforms.map((platform) => t(platform)).join(' · ');
  const hasShots = Boolean(shots[project.slug]);
  const isDetailed = detailed.has(project.slug);

  return (
    <Spotlight
      className={cn(
        'flex h-full flex-col rounded-container border border-outline-subtle bg-surface-raised',
        hasShots && 'min-h-[30rem] lg:min-h-0',
      )}
    >
      <div
        className={cn(
          'relative flex flex-col gap-4 p-6 sm:p-7',
          (project.slug === 'highwren-ui' || sideShots.has(project.slug)) && 'lg:max-w-[60%]',
        )}
      >
        <p className="flex items-center gap-3 font-mono text-xs text-on-surface-variant">
          <span>{project.year}</span>
          <span>{platforms}</span>
          {project.stars ? (
            <span aria-label={t('stars', { count: project.stars })}>★ {project.stars}</span>
          ) : null}
        </p>
        <div className="flex items-center gap-4">
          {project.icon ? (
            <Image
              src={project.icon}
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-2xl shadow-sm"
            />
          ) : null}
          <div className="flex flex-col gap-1">
            <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
              <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight font-stretch-expanded sm:text-3xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-item outline-offset-4 outline-primary after:absolute after:inset-0 after:content-[''] focus-visible:outline-2"
                >
                  {project.title[locale]}
                </Link>
              </h3>
            </ViewTransition>
            <p className="text-on-surface-variant">{project.tagline[locale]}</p>
          </div>
        </div>
        {isDetailed ? (
          <p className="max-w-xl text-sm text-pretty text-on-surface-variant">
            {project.description[locale]}
          </p>
        ) : null}
        {isDetailed && project.highlights ? (
          <ul className="flex flex-wrap gap-1.5">
            {project.highlights[locale].map((highlight) => (
              <li key={highlight}>
                <Pill tone="primary">{highlight}</Pill>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, isDetailed ? 6 : 4).map((item) => (
            <li key={item}>
              <Pill>{item}</Pill>
            </li>
          ))}
        </ul>
        <ProjectLinks links={project.links} labels={labels} />
      </div>
      {project.slug === 'highwren-ui' ? (
        <div className="px-6 pb-6 sm:px-7 lg:absolute lg:end-7 lg:top-1/2 lg:-translate-y-1/2 lg:p-0">
          <HighwrenDemo label={t('demoAction')} />
        </div>
      ) : null}
      <Shots slug={project.slug} title={project.title[locale]} />
      {project.slug === 'cosum' && project.icon ? (
        <Image
          src={project.icon}
          alt=""
          aria-hidden="true"
          width={192}
          height={192}
          className="pointer-events-none absolute -end-6 -bottom-8 hidden size-44 rotate-12 rounded-[2.5rem] opacity-90 shadow-lg transition-transform duration-500 ease-fluid group-hover/spot:rotate-6 motion-reduce:transition-none lg:block"
        />
      ) : null}
    </Spotlight>
  );
}

interface CardProps {
  project: Project;
  locale: AppLocale;
  t: Translate;
  labels: ProjectLinkLabels;
}

export async function ProjectsSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('projects');
  const common = await getTranslations('common');
  const newTab = common('newTab');
  const labels: ProjectLinkLabels = {
    playStore: t('playStore'),
    appStore: t('appStore'),
    website: t('website'),
    github: t('github'),
    newTab,
  };

  return (
    <Section id="projects" index="02" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')}>
      <ul className="grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(15.5rem,auto)] lg:grid-cols-6">
        {publishedProjects.map((project, index) => (
          <li key={project.slug} className={cn('min-w-0', spans[project.slug])}>
            <Reveal delay={(index % 3) * 0.06} className="h-full">
              <Card project={project} locale={locale} t={t} labels={labels} />
            </Reveal>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 mb-4 eyebrow">{t('more')}</h3>
      <ul className="border-t border-outline-subtle">
        {sideProjects.map((project) => (
          <li
            key={project.slug}
            className="grid gap-x-8 gap-y-3 border-b border-outline-subtle py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] md:items-center"
          >
            <p lang="en" className="font-medium text-on-surface">
              {project.title}
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-pretty text-on-surface-variant">
                {project.description[locale]}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Pill>{item}</Pill>
                  </li>
                ))}
              </ul>
            </div>
            {project.github ? (
              <ArrowLink href={project.github} newTabLabel={newTab}>
                {t('github')}
              </ArrowLink>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
