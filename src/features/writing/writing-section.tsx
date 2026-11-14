import { getTranslations } from 'next-intl/server';
import { articles } from '@content/articles';
import { profile } from '@content/profile';
import { Section } from '@/components/layout/section';
import { Reveal } from '@/components/motion/reveal';
import { ArrowLink } from '@/components/ui/arrow-link';
import type { AppLocale } from '@/i18n/routing';
import { formatDate } from '@/lib/format';

export async function WritingSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('writing');
  const common = await getTranslations('common');

  return (
    <Section id="writing" index="05" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')}>
      <ol className="border-t border-outline-subtle">
        {articles.map((article, index) => (
          <li key={article.slug} className="border-b border-outline-subtle">
            <Reveal delay={index * 0.05}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                hrefLang={article.language}
                className="group/article -mx-4 grid gap-x-8 gap-y-2 rounded-container px-4 py-7 outline-offset-2 outline-primary transition-colors duration-150 ease-out hover:bg-neutral-soft focus-visible:outline-2 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:items-baseline"
              >
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-on-surface-variant md:flex-col md:items-start md:gap-1">
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt, locale)}
                  </time>
                  <span>{t('minutes', { count: article.readMinutes })}</span>
                  {article.language !== locale ? (
                    <span className="rounded-full bg-neutral-soft px-2 py-0.5">
                      {t('inTurkish')}
                    </span>
                  ) : null}
                </p>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl leading-snug font-semibold tracking-tight text-balance transition-colors duration-150 ease-out group-hover/article:text-primary sm:text-2xl">
                    {article.title[locale]}
                  </h3>
                  <p className="max-w-2xl text-sm text-pretty text-on-surface-variant">
                    {article.summary[locale]}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-on-surface-variant transition-transform duration-200 ease-out group-hover/article:translate-x-1 group-hover/article:-translate-y-1 group-hover/article:text-primary motion-reduce:transition-none md:block"
                >
                  ↗
                </span>
                <span className="sr-only">{common('newTab')}</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <ArrowLink href={profile.links.medium} newTabLabel={common('newTab')}>
          {t('all')}
        </ArrowLink>
      </div>
    </Section>
  );
}
