'use client';

import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState, type CSSProperties } from 'react';
import type { Localized } from '@content/types';
import { profile } from '@content/profile';
import { Button } from '@/components/ds/button';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { SegmentedControl, SegmentedControlItem } from '@/components/ds/segmented-control';
import type { AppLocale } from '@/i18n/routing';
import { spatialSpring } from '@/lib/ds/motion';

interface Candidate {
  id: string;
  name: string;
  family: string;
  note: Localized;
  rest: string;
  active: string;
  heading: string;
}

const displayCandidates: Candidate[] = [
  {
    id: 'flex',
    name: 'Google Sans Flex',
    family: 'var(--font-flex-full)',
    note: {
      tr: 'Android’in kendi yazı tipi. Genişlik, kalınlık ve yuvarlaklık eksenleri birlikte oynar.',
      en: 'Android’s own typeface. Width, weight and roundness axes move together.',
    },
    rest: "'wdth' 100, 'wght' 500, 'ROND' 0",
    active: "'wdth' 151, 'wght' 900, 'ROND' 100",
    heading: "'wdth' 125, 'wght' 700, 'ROND' 0",
  },
  {
    id: 'science',
    name: 'Science Gothic',
    family: 'var(--font-science)',
    note: {
      tr: 'Endüstriyel, teknik bir grotesk. Genişlik ekseni %50’den %200’e kadar açılır.',
      en: 'An industrial, technical grotesque. The width axis runs from 50% to 200%.',
    },
    rest: "'wdth' 100, 'wght' 500, 'CTRS' 0",
    active: "'wdth' 200, 'wght' 900, 'CTRS' 60",
    heading: "'wdth' 150, 'wght' 700, 'CTRS' 0",
  },
  {
    id: 'anybody',
    name: 'Anybody',
    family: 'var(--font-anybody)',
    note: {
      tr: 'Sportif ve geniş. Dar ile ultra geniş arasında sert bir karakter değişimi.',
      en: 'Sporty and wide. A sharp change of character between condensed and ultra wide.',
    },
    rest: "'wdth' 100, 'wght' 500",
    active: "'wdth' 150, 'wght' 900",
    heading: "'wdth' 130, 'wght' 800",
  },
  {
    id: 'bricolage',
    name: 'Bricolage Grotesque',
    family: 'var(--font-bricolage)',
    note: {
      tr: 'Karakterli, hafif tuhaf bir grotesk. Büyük boyda mürekkep tuzakları belirir.',
      en: 'A characterful, slightly odd grotesque. Ink traps appear at large sizes.',
    },
    rest: "'wdth' 100, 'wght' 500, 'opsz' 96",
    active: "'wdth' 75, 'wght' 800, 'opsz' 96",
    heading: "'wdth' 100, 'wght' 700, 'opsz' 96",
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    family: 'var(--font-fraunces)',
    note: {
      tr: 'Yumuşak bir serif. Kodun mono yüzüyle keskin bir karşıtlık kurar.',
      en: 'A soft serif. It sets up a sharp contrast with the mono face used for code.',
    },
    rest: "'SOFT' 0, 'WONK' 0, 'wght' 400, 'opsz' 144",
    active: "'SOFT' 100, 'WONK' 1, 'wght' 900, 'opsz' 144",
    heading: "'SOFT' 50, 'WONK' 0, 'wght' 600, 'opsz' 144",
  },
];

const pixelCandidates: Candidate[] = [
  {
    id: 'bitcount',
    name: 'Bitcount Grid Double',
    family: 'var(--font-bitcount)',
    note: {
      tr: 'Piksel ızgarası. Piksellerin şekli ve boyutu eksenlerle değişir.',
      en: 'A pixel grid. The shape and size of the pixels change along the axes.',
    },
    rest: "'ELSH' 0, 'ELXP' 0, 'wght' 400",
    active: "'ELSH' 100, 'ELXP' 100, 'wght' 400",
    heading: "'ELSH' 0, 'ELXP' 0, 'wght' 400",
  },
  {
    id: 'geist-pixel',
    name: 'Geist Pixel',
    family: 'var(--font-geist-pixel)',
    note: {
      tr: 'Sade bir piksel yüzü. Tek eksen: piksel şekli.',
      en: 'A plain pixel face. One axis: the pixel shape.',
    },
    rest: "'ELSH' 0",
    active: "'ELSH' 100",
    heading: "'ELSH' 0",
  },
  {
    id: 'doto',
    name: 'Doto',
    family: 'var(--font-doto)',
    note: {
      tr: 'Nokta matris. Noktalar kareden daireye yuvarlanır.',
      en: 'Dot matrix. The dots round off from squares to circles.',
    },
    rest: "'ROND' 0, 'wght' 700",
    active: "'ROND' 100, 'wght' 900",
    heading: "'ROND' 0, 'wght' 700",
  },
];

const glyphs = 'ğ ü ş ı ö ç İ Ğ Ü Ş Ö Ç';

function Letters({ text, candidate, wave }: { text: string; candidate: Candidate; wave: number }) {
  const { decorativeEnabled, profile: motionProfile } = useMotionPreference();
  let index = 0;

  return (
    <span aria-label={text} role="img" className="block">
      {text.split(' ').map((word) => (
        <span key={word} aria-hidden="true" className="me-[0.25em] inline-block whitespace-nowrap">
          {Array.from(word).map((letter) => {
            const order = index++;
            return (
              <motion.span
                key={`${candidate.id}-${wave}-${order}`}
                className="inline-block"
                initial={false}
                animate={{
                  fontVariationSettings:
                    wave > 0 && decorativeEnabled
                      ? [candidate.rest, candidate.active, candidate.rest]
                      : candidate.rest,
                }}
                whileHover={decorativeEnabled ? { fontVariationSettings: candidate.active } : {}}
                transition={
                  wave > 0
                    ? {
                        duration: 0.9,
                        delay: order * 0.045,
                        times: [0, 0.35, 1],
                        ease: 'easeInOut',
                      }
                    : spatialSpring('fast', motionProfile)
                }
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function PixelSpecimen({ candidate }: { candidate: Candidate }) {
  const { decorativeEnabled } = useMotionPreference();

  return (
    <div className="flex flex-col gap-3 rounded-container border border-outline-subtle bg-surface-raised p-5">
      <motion.p
        lang="tr"
        style={{ fontFamily: candidate.family }}
        className="text-3xl leading-tight text-on-surface sm:text-4xl"
        initial={false}
        animate={{
          fontVariationSettings: decorativeEnabled
            ? [candidate.rest, candidate.active]
            : candidate.rest,
        }}
        transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        01 / DENEYİM
        <br />
        3.955 · 2026
      </motion.p>
      <p className="font-mono text-xs text-on-surface-variant">{candidate.name}</p>
    </div>
  );
}

export function TypeLab() {
  const t = useTranslations('lab');
  const locale = useLocale() as AppLocale;
  const [selected, setSelected] = useState(displayCandidates[0].id);
  const [wave, setWave] = useState(0);
  const candidate = displayCandidates.find((item) => item.id === selected) ?? displayCandidates[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SegmentedControl
          aria-label={t('display')}
          selectedKeys={[selected]}
          onSelectionChange={(keys) => {
            const [key] = keys;
            if (key === undefined) return;
            setSelected(String(key));
            setWave(0);
          }}
        >
          {displayCandidates.map((item) => (
            <SegmentedControlItem key={item.id} id={item.id}>
              {item.name}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
        <Button variant="soft" onPress={() => setWave((count) => count + 1)}>
          {t('wave')}
        </Button>
      </div>

      <div
        style={{ '--font-display-face': candidate.family } as CSSProperties}
        className="flex flex-col gap-6 rounded-container border border-outline-subtle bg-surface-raised p-6 sm:p-10"
      >
        <p className="font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] tracking-tight text-on-surface">
          <Letters text={profile.name} candidate={candidate} wave={wave} />
        </p>
        <p
          style={{ fontVariationSettings: candidate.heading }}
          className="font-display text-3xl leading-tight tracking-tight text-balance text-on-surface sm:text-5xl"
        >
          {t('sample')}
        </p>
        <p
          lang="tr"
          style={{ fontVariationSettings: candidate.rest }}
          className="font-display text-xl text-on-surface-variant"
        >
          {t('pangram')} {glyphs}
        </p>
        <p className="max-w-2xl text-sm text-on-surface-variant">{candidate.note[locale]}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="eyebrow">{t('pixel')}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {pixelCandidates.map((item) => (
            <PixelSpecimen key={item.id} candidate={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
