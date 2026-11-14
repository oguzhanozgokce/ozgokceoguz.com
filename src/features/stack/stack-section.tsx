import { getTranslations } from 'next-intl/server';
import { stackModules, type StackModule } from '@content/stack';
import { Section } from '@/components/layout/section';
import { Pill } from '@/components/ui/pill';
import type { AppLocale } from '@/i18n/routing';
import { ModuleGraph } from './module-graph';

function ModuleCard({ module, locale }: { module: StackModule; locale: AppLocale }) {
  const dependencies = module.dependsOn
    .map((id) => stackModules.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <article
      tabIndex={0}
      className="flex h-full flex-col gap-4 rounded-container border border-outline-subtle bg-surface-raised p-5 outline-offset-2 outline-primary focus-visible:outline-2 sm:p-6"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-mono text-sm font-medium text-primary">{module.gradlePath}</h3>
        <p className="text-sm text-on-surface-variant">{module.title[locale]}</p>
      </header>
      <ul className="flex flex-wrap gap-1.5">
        {module.items.map((item) => (
          <li key={item}>
            <Pill>{item}</Pill>
          </li>
        ))}
      </ul>
      {dependencies.length > 0 ? (
        <p
          lang="en"
          className="mt-auto flex flex-col pt-2 font-mono text-[11px] leading-5 text-on-surface-variant"
        >
          {dependencies.map((dependency) => (
            <span key={dependency.id}>
              <span className="text-tertiary">implementation</span>(project(
              <span className="text-on-surface">&quot;{dependency.gradlePath}&quot;</span>))
            </span>
          ))}
        </p>
      ) : null}
    </article>
  );
}

export async function StackSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('stack');

  const modules = stackModules.map((module) => ({
    id: module.id,
    dependsOn: module.dependsOn,
    content: <ModuleCard module={module} locale={locale} />,
  }));

  return (
    <Section id="stack" index="03" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')}>
      <ModuleGraph modules={modules} />
    </Section>
  );
}
