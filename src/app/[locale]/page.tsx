import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import { ContactSection } from '@/features/contact/contact-section';
import { ExperienceSection } from '@/features/experience/experience-section';
import { GithubSection } from '@/features/github/github-section';
import { HeroSection } from '@/features/hero/hero-section';
import { ProjectsSection } from '@/features/projects/projects-section';
import { StackSection } from '@/features/stack/stack-section';
import { StatsStrip } from '@/features/stats/stats-strip';
import { WritingSection } from '@/features/writing/writing-section';
import { isAppLocale } from '@/i18n/routing';
import { localizedAlternates } from '@/lib/metadata';
import { personSchema } from '@/lib/structured-data';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  return { alternates: localizedAlternates(locale) };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
        />
        <HeroSection locale={locale} />
        <StatsStrip />
        <ExperienceSection locale={locale} />
        <ProjectsSection locale={locale} />
        <StackSection locale={locale} />
        <GithubSection locale={locale} />
        <WritingSection locale={locale} />
        <ContactSection locale={locale} />
      </div>
    </ViewTransition>
  );
}
