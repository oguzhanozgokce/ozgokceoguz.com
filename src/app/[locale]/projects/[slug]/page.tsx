import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import { projectDetails } from '@content/project-details';
import { publishedProjects } from '@content/projects';
import { Reveal } from '@/components/motion/reveal';
import { Pill } from '@/components/ui/pill';
import { ProjectGallery } from '@/features/projects/project-gallery';
import { ProjectLinks } from '@/features/projects/project-links';
import { Link } from '@/i18n/navigation';
import { isAppLocale } from '@/i18n/routing';
import { localizedAlternates } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);
  if (!isAppLocale(locale) || !project) notFound();

  return {
    title: project.title[locale],
    description: project.tagline[locale],
    alternates: localizedAlternates(locale, `/projects/${slug}`),
    openGraph: {
      type: 'article',
      title: project.title[locale],
      description: project.tagline[locale],
      url: `/${locale}/projects/${slug}/`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title[locale],
      description: project.tagline[locale],
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const index = publishedProjects.findIndex((item) => item.slug === slug);
  if (!isAppLocale(locale) || index === -1) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const common = await getTranslations('common');
  const project = publishedProjects[index];
  const detail = projectDetails[slug] ?? {};
  const previous = publishedProjects[index - 1];
  const next = publishedProjects[index + 1];

  const facts = [
    { label: t('yearLabel'), value: String(project.year) },
    {
      label: t('platformLabel'),
      value: project.platforms.map((platform) => t(platform)).join(' · '),
    },
    detail.role ? { label: t('role'), value: detail.role[locale] } : null,
    project.stars ? { label: 'GitHub', value: `★ ${project.stars}` } : null,
  ].filter((fact) => fact !== null);

  const shots = (detail.gallery ?? []).map((shot) => ({
    id: shot.file,
    src: `/assets/projects/${slug}/${shot.file}.webp`,
    label: shot.label[locale],
  }));

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <article className="site-width flex flex-col gap-16 pt-32 pb-8 sm:gap-20">
        <header className="flex flex-col gap-7">
          <Link
            href="/#projects"
            className="self-start rounded-full eyebrow outline-offset-4 outline-primary transition-colors duration-100 ease-out hover:text-on-surface focus-visible:outline-2"
          >
            <span aria-hidden="true">← </span>
            {t('back')}
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            {project.icon ? (
              <Image
                src={project.icon}
                alt=""
                width={96}
                height={96}
                priority
                className="size-16 rounded-3xl shadow-md sm:size-24"
              />
            ) : null}
            <ViewTransition name={`project-title-${slug}`} share="morph" default="none">
              <h1 className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-balance font-stretch-expanded sm:text-7xl">
                {project.title[locale]}
              </h1>
            </ViewTransition>
          </div>
          <p className="max-w-3xl text-xl text-pretty text-on-surface-variant sm:text-2xl">
            {project.tagline[locale]}
          </p>
          <dl className="flex flex-wrap gap-x-12 gap-y-5 border-y border-outline-subtle py-6">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="font-medium text-on-surface">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ProjectLinks
            links={project.links}
            labels={{
              playStore: t('playStore'),
              appStore: t('appStore'),
              website: t('website'),
              github: t('github'),
              newTab: common('newTab'),
            }}
          />
        </header>

        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <p className="text-lg text-pretty text-on-surface sm:text-xl">
            {project.description[locale]}
          </p>
          <div className="flex flex-col gap-4">
            <h2 className="eyebrow">{t('stackTitle')}</h2>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item}>
                  <Pill>{item}</Pill>
                </li>
              ))}
            </ul>
            {project.highlights ? (
              <ul className="flex flex-wrap gap-1.5">
                {project.highlights[locale].map((highlight) => (
                  <li key={highlight}>
                    <Pill tone="primary">{highlight}</Pill>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {shots.length > 0 ? (
          <section aria-labelledby="gallery-title" className="flex flex-col gap-6">
            <h2 id="gallery-title" className="eyebrow">
              {t('gallery')}
            </h2>
            <ProjectGallery title={project.title[locale]} shots={shots} openLabel={t('openShot')} />
          </section>
        ) : null}

        {detail.notes ? (
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {detail.notes.map((note, noteIndex) => (
              <Reveal
                key={note.title[locale]}
                delay={noteIndex * 0.06}
                className={detail.notes?.length === 1 ? 'md:col-span-2' : undefined}
              >
                <div className="flex h-full flex-col gap-4 rounded-container border border-outline-subtle bg-surface-raised p-6">
                  <h2 className="font-display text-xl font-semibold tracking-tight font-stretch-expanded">
                    {note.title[locale]}
                  </h2>
                  <ul className="flex flex-col gap-3 text-sm text-pretty text-on-surface-variant">
                    {note.points[locale].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </section>
        ) : null}

        <nav
          aria-label={t('eyebrow')}
          className="grid gap-4 border-t border-outline-subtle pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group/nav flex flex-col gap-1 rounded-container p-4 outline-offset-2 outline-primary transition-colors duration-150 ease-out hover:bg-neutral-soft focus-visible:outline-2"
            >
              <span className="eyebrow">← {t('previous')}</span>
              <span className="font-display text-2xl font-semibold tracking-tight font-stretch-expanded">
                {previous.title[locale]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group/nav flex flex-col gap-1 rounded-container p-4 outline-offset-2 outline-primary transition-colors duration-150 ease-out hover:bg-neutral-soft focus-visible:outline-2 sm:items-end sm:text-end"
            >
              <span className="eyebrow">{t('next')} →</span>
              <span className="font-display text-2xl font-semibold tracking-tight font-stretch-expanded">
                {next.title[locale]}
              </span>
            </Link>
          ) : null}
        </nav>
      </article>
    </ViewTransition>
  );
}
