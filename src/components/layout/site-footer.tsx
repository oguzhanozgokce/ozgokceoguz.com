import { getTranslations } from 'next-intl/server';
import { profile } from '@content/profile';
import { Link } from '@/components/ds/link';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-outline-subtle">
      <div className="site-width flex flex-col gap-4 py-8 text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs">
          © {year} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="https://ui.highwren.com" isExternal variant="standalone">
            {t('built')}
          </Link>
          <Link href={profile.links.github} isExternal variant="standalone">
            GitHub
          </Link>
          <Link href="#top" variant="standalone">
            {t('top')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
