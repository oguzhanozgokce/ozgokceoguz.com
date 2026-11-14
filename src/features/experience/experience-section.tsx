import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { organizations, roles, type Role } from '@content/experience';
import { Section } from '@/components/layout/section';
import { Pill } from '@/components/ui/pill';
import type { AppLocale } from '@/i18n/routing';
import {
  currentYearMonth,
  formatDuration,
  formatYearMonth,
  monthsBetween,
  shortHash,
} from '@/lib/format';
import { GitGraph } from './git-graph';

interface EntryProps {
  role: Role;
  locale: AppLocale;
  presentLabel: string;
  internshipLabel: string;
}

function branchName(role: Role) {
  return role.kind === 'internship' ? `intern/${role.organization}` : null;
}

function Entry({ role, locale, presentLabel, internshipLabel }: EntryProps) {
  const organization = organizations[role.organization];
  const end = role.end ?? currentYearMonth();
  const duration = formatDuration(monthsBetween(role.start, end) + 1, locale);
  const range = `${formatYearMonth(role.start, locale)} — ${
    role.end ? formatYearMonth(role.end, locale) : presentLabel
  }`;
  const branch = branchName(role);

  return (
    <article className="flex flex-col gap-3">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-on-surface-variant">
        <span className={branch ? 'text-tertiary' : 'text-primary'}>{shortHash(role.id)}</span>
        <span>{range}</span>
        <span>{duration}</span>
        {role.end === null ? (
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-primary">HEAD → main</span>
        ) : null}
        {branch ? (
          <span className="rounded-full bg-neutral-soft px-2 py-0.5">
            <span className="sr-only">{internshipLabel}: </span>
            {branch}
          </span>
        ) : null}
      </p>
      <h3
        lang="en"
        className="font-display text-2xl leading-tight font-semibold tracking-tight font-stretch-expanded sm:text-3xl"
      >
        {role.title[locale]}
      </h3>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface-variant">
        <Image
          src={role.product?.logo ?? organization.logo}
          alt=""
          width={24}
          height={24}
          className="size-6 rounded-md object-cover"
        />
        <span className="font-medium text-on-surface">
          {organization.name}
          {role.product ? ` · ${role.product.name}` : ''}
        </span>
        <span aria-hidden="true" className="max-sm:hidden">
          ·
        </span>
        <span className="max-sm:basis-full">{role.location[locale]}</span>
      </p>
      <p className="max-w-2xl text-pretty text-on-surface-variant">{role.summary[locale]}</p>
      <ul className="flex flex-wrap gap-1.5">
        {role.technologies.map((technology) => (
          <li key={technology}>
            <Pill>{technology}</Pill>
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function ExperienceSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('experience');
  const common = await getTranslations('common');

  const rows = roles.map((role) => ({
    id: role.id,
    hash: shortHash(role.id),
    label: `${role.title[locale]} · ${role.product?.name ?? organizations[role.organization].name}`,
    branch: branchName(role),
    current: role.end === null,
    content: (
      <Entry
        role={role}
        locale={locale}
        presentLabel={common('present')}
        internshipLabel={common('internship')}
      />
    ),
  }));

  return (
    <Section id="experience" index="01" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')}>
      <GitGraph rows={rows} />
    </Section>
  );
}
