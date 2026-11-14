import { getLocale, getTranslations } from 'next-intl/server';
import { publishedProjects } from '@content/projects';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { sections } from '@/lib/site';
import { CommandPalette } from './command-palette';
import { LocaleSwitch } from './locale-switch';
import { MobileMenu } from './mobile-menu';
import { NavLinks } from './nav-links';
import { SeedPicker } from './seed-picker';
import { ThemeToggle } from './theme-toggle';

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const palette = await getTranslations('palette');
  const appearance = await getTranslations('appearance');
  const locale = (await getLocale()) as AppLocale;
  const items = sections.map((id) => ({ id, label: t(id) }));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:pt-4">
      <div className="pointer-events-auto flex h-12 max-w-full items-center gap-1 rounded-full border border-outline-subtle bg-surface-raised/80 ps-4 pe-1.5 shadow-sm backdrop-blur-xl">
        <Link
          href="/"
          aria-label={`oguzhan.kt · ${t('home')}`}
          className="me-1 rounded-full font-mono text-sm font-medium text-on-surface outline-offset-4 outline-primary focus-visible:outline-2"
        >
          oguzhan<span className="text-primary">.kt</span>
        </Link>
        <NavLinks items={items} label={t('label')} />
        <div className="ms-1 flex items-center">
          <CommandPalette
            labels={{
              open: palette('open'),
              placeholder: palette('placeholder'),
              empty: palette('empty'),
              sections: palette('sections'),
              projects: palette('projects'),
              actions: palette('actions'),
              links: palette('links'),
              toDark: appearance('toDark'),
              toLight: appearance('toLight'),
              language: appearance('language'),
              copyEmail: palette('copyEmail'),
              copied: palette('copied'),
              cv: palette('cv'),
            }}
            sections={items.map((item) => ({ ...item, href: `/#${item.id}` }))}
            projects={publishedProjects.map((project) => ({
              id: project.slug,
              label: project.title[locale],
              href: `/projects/${project.slug}`,
            }))}
          />
          <SeedPicker />
          <ThemeToggle />
          <LocaleSwitch />
          <MobileMenu items={items} label={t('menu')} />
        </div>
      </div>
    </header>
  );
}
