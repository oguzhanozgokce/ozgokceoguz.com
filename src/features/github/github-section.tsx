import { getTranslations } from 'next-intl/server';
import github from '@content/generated/github.json';
import { profile } from '@content/profile';
import { Section } from '@/components/layout/section';
import { Reveal } from '@/components/motion/reveal';
import { ArrowLink } from '@/components/ui/arrow-link';
import type { AppLocale } from '@/i18n/routing';
import { formatDate } from '@/lib/format';
import { Heatmap } from './heatmap';

const languageColors = [
  'var(--primary)',
  'var(--chart-1)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export async function GithubSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('github');
  const common = await getTranslations('common');
  const total = new Intl.NumberFormat(locale).format(github.total);
  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });

  const weeks = github.weeks.map((week, index) => {
    const date = new Date(`${week.start}T00:00:00Z`);
    const previous = github.weeks[index - 1];
    const changed =
      !previous || new Date(`${previous.start}T00:00:00Z`).getUTCMonth() !== date.getUTCMonth();
    return { label: changed && index > 0 ? month.format(date) : null, levels: week.levels };
  });

  const languages = github.languages.map((language, index) => ({
    ...language,
    color: languageColors[index % languageColors.length],
  }));

  return (
    <Section
      id="github"
      index="04"
      eyebrow={t('eyebrow')}
      title={t('title')}
      lead={t('lead', { count: total })}
    >
      <div className="flex flex-col gap-10 rounded-container border border-outline-subtle bg-surface-raised p-5 sm:p-8">
        <Heatmap weeks={weeks} summary={t('lead', { count: total })} />
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-on-surface-variant">
          <span>{t('updated', { date: formatDate(github.fetchedAt, locale) })}</span>
          <span className="flex items-center gap-1.5">
            {t('less')}
            <span className="size-3 rounded-[3px] bg-neutral-soft" />
            <span className="size-3 rounded-[3px] bg-primary/30" />
            <span className="size-3 rounded-[3px] bg-primary/50" />
            <span className="size-3 rounded-[3px] bg-primary/75" />
            <span className="size-3 rounded-[3px] bg-primary-solid" />
            {t('more')}
          </span>
        </div>
        <Reveal className="flex flex-col gap-4">
          <h3 className="eyebrow">{t('languages')}</h3>
          <div className="flex h-3 overflow-hidden rounded-full bg-neutral-soft">
            {languages.map((language) => (
              <span
                key={language.name}
                style={{ width: `${language.share}%`, backgroundColor: language.color }}
                className="h-full border-e-2 border-surface-raised last:border-e-0"
              />
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {languages.map((language) => (
              <li key={language.name} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: language.color }}
                  className="size-2.5 rounded-full"
                />
                <span lang="en" className="text-on-surface">
                  {language.name}
                </span>
                <span className="text-on-surface-variant tabular-digits">
                  {percent.format(language.share / 100)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <ArrowLink
          href={profile.links.github}
          newTabLabel={common('newTab')}
          className="self-start"
        >
          {t('profile')}
        </ArrowLink>
      </div>
    </Section>
  );
}
