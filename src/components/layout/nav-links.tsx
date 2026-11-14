'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { Link, usePathname } from '@/i18n/navigation';
import { spatialSpring } from '@/lib/ds/motion';
import type { SectionId } from '@/lib/site';

export interface NavItem {
  id: SectionId;
  label: string;
}

function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}

export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  const { profile } = useMotionPreference();
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveSection(ids, pathname === '/');

  return (
    <nav aria-label={label} className="hidden items-center md:flex">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/#${item.id}`}
          aria-current={active === item.id ? 'location' : undefined}
          className="relative rounded-full px-3 py-1.5 text-sm text-on-surface-variant outline-offset-2 outline-primary transition-colors duration-100 ease-out hover:text-on-surface focus-visible:outline-2 aria-[current]:text-on-surface"
        >
          {active === item.id ? (
            <motion.span
              layoutId="nav-active"
              transition={spatialSpring('fast', profile)}
              className="absolute inset-0 rounded-full bg-neutral-soft"
            />
          ) : null}
          <span className="relative">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
