import type { ReactNode } from 'react';
import { SplitText } from '@/components/motion/split-text';
import type { SectionId } from '@/lib/site';

interface SectionProps {
  id: SectionId | 'github';
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

export function Section({ id, index, eyebrow, title, lead, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="site-width py-20 sm:py-28">
      <header className="mb-12 flex flex-col gap-4 sm:mb-16">
        <p className="eyebrow">
          <span className="text-primary">{index}</span> / {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="max-w-4xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance font-stretch-expanded sm:text-6xl"
        >
          <SplitText text={title} />
        </h2>
        {lead ? (
          <p className="max-w-2xl text-lg text-pretty text-on-surface-variant">{lead}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
