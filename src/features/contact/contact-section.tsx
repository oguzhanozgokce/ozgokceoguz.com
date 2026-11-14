import { getTranslations } from 'next-intl/server';
import { profile } from '@content/profile';
import { ButtonLink } from '@/components/ds/button';
import { CopyButton } from '@/components/ds/copy-button';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import type { AppLocale } from '@/i18n/routing';

export async function ContactSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations('contact');

  const links = [
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'GitHub', href: profile.links.github },
    { label: 'Medium', href: profile.links.medium },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="site-width py-24 sm:py-36">
      <div className="flex flex-col items-start gap-8">
        <p className="eyebrow">
          <span className="text-primary">06</span> / {t('eyebrow')}
        </p>
        <h2
          id="contact-title"
          className="max-w-5xl font-display text-5xl leading-[0.98] font-bold tracking-tight text-balance font-stretch-expanded sm:text-7xl lg:text-8xl"
        >
          <SplitText text={t('title')} />
        </h2>
        <p className="max-w-xl text-lg text-pretty text-on-surface-variant">{t('lead')}</p>
        <Reveal className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full font-mono text-lg text-on-surface underline decoration-primary decoration-2 underline-offset-8 outline-offset-4 outline-primary transition-colors duration-100 ease-out hover:text-primary focus-visible:outline-2 sm:text-2xl"
          >
            {profile.email}
          </a>
          <CopyButton value={profile.email} variant="soft" aria-label={t('copy')} />
        </Reveal>
        <Reveal delay={0.08} className="flex flex-wrap items-center gap-3 pt-4">
          {links.map((link) => (
            <Magnetic key={link.label}>
              <ButtonLink
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                tone="neutral"
                size="lg"
              >
                {link.label}
              </ButtonLink>
            </Magnetic>
          ))}
          <Magnetic>
            <ButtonLink href={profile.cv[locale]} download variant="soft" size="lg">
              {t('cv')}
            </ButtonLink>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
