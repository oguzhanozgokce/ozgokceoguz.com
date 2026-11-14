import { getTranslations } from 'next-intl/server';
import { articles } from '@content/articles';
import { roles } from '@content/experience';
import github from '@content/generated/github.json';
import { publishedProjects } from '@content/projects';
import { currentYearMonth, monthsBetween } from '@/lib/format';
import { StatNumber } from './stat-number';

export async function StatsStrip() {
  const t = await getTranslations('stats');
  const firstRole = roles[roles.length - 1];
  const years = Math.floor(monthsBetween(firstRole.start, currentYearMonth()) / 12);
  const apps = publishedProjects.filter(
    (project) => project.links.playStore || project.links.appStore,
  ).length;

  const stats = [
    { value: github.total, label: t('contributions') },
    { value: years, suffix: '+', label: t('years') },
    { value: apps, label: t('apps') },
    { value: articles.length, label: t('articles') },
  ];

  return (
    <section aria-label={t('label')} className="site-width pb-8">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-outline-subtle py-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2">
            <dt className="max-w-[16rem] text-sm text-on-surface-variant">{stat.label}</dt>
            <dd className="font-display text-4xl leading-none font-bold tracking-tight font-stretch-expanded tabular-digits sm:text-6xl">
              <StatNumber value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
