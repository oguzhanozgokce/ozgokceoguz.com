import type { ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  newTabLabel: string;
  className?: string;
}

export function ArrowLink({ href, children, newTabLabel, className }: ArrowLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/link relative z-10 inline-flex items-center gap-1 rounded-full text-sm font-medium text-on-surface underline decoration-outline-variant underline-offset-4 outline-offset-4 outline-primary transition-colors duration-100 ease-out hover:text-primary hover:decoration-primary focus-visible:outline-2',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-150 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
      >
        ↗
      </span>
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
