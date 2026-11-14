'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useIcons, useMotionPreference } from '@/components/ds/ds-provider';
import { IconButton } from '@/components/ds/icon-button';
import { applyTheme, useTheme } from '@/lib/appearance';
import { withViewTransition } from '@/lib/view-transition';

export function ThemeToggle() {
  const t = useTranslations('appearance');
  const theme = useTheme();
  const icons = useIcons();
  const { spatialEnabled } = useMotionPreference();
  const button = useRef<HTMLButtonElement>(null);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const rect = button.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.classList.add('theme-switching');
    const transition = withViewTransition(() => applyTheme(next), spatialEnabled);
    if (!transition) {
      root.classList.remove('theme-switching');
      return;
    }
    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 560,
            easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => undefined);
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }

  return (
    <IconButton
      ref={button}
      aria-label={theme === 'dark' ? t('toLight') : t('toDark')}
      icon={theme === 'dark' ? <icons.lightMode /> : <icons.darkMode />}
      variant="ghost"
      tone="neutral"
      size="sm"
      onPress={toggle}
    />
  );
}
