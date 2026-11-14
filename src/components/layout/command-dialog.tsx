'use client';

import { useLocale } from 'next-intl';
import { useState, type ReactNode } from 'react';
import {
  Autocomplete,
  Header,
  Menu,
  MenuItem,
  MenuSection,
  useFilter,
} from 'react-aria-components';
import { profile } from '@content/profile';
import { Dialog } from '@/components/ds/dialog';
import { useIcons, useMotionPreference } from '@/components/ds/ds-provider';
import { Kbd } from '@/components/ds/kbd';
import { SearchField } from '@/components/ds/search-field';
import { saveLocaleChoice } from '@/i18n/detect';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeNames, locales, type AppLocale } from '@/i18n/routing';
import { applyTheme, useTheme } from '@/lib/appearance';
import { withViewTransition } from '@/lib/view-transition';
import type { PaletteLabels, PaletteLink } from './command-palette';

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  labels: PaletteLabels;
  sections: PaletteLink[];
  projects: PaletteLink[];
}

interface Command {
  id: string;
  label: string;
  icon: ReactNode;
  hint?: string;
  keepOpen?: boolean;
  run: () => void;
}

const item =
  'flex cursor-default items-center gap-3 rounded-item px-3 py-2.5 text-sm text-on-surface outline-none data-[focused]:bg-neutral-soft data-[pressed]:bg-neutral-soft';

export default function CommandDialog({
  open,
  onOpenChange,
  labels,
  sections,
  projects,
}: CommandDialogProps) {
  const [copied, setCopied] = useState(false);
  const icons = useIcons();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const theme = useTheme();
  const { effectsEnabled } = useMotionPreference();
  const { contains } = useFilter({ sensitivity: 'base' });
  const otherLocale = locales.find((candidate) => candidate !== locale) ?? locale;

  const groups: { title: string; commands: Command[] }[] = [
    {
      title: labels.sections,
      commands: sections.map((section) => ({
        id: `section-${section.id}`,
        label: section.label,
        icon: <icons.arrowForward />,
        run: () => router.push(section.href),
      })),
    },
    {
      title: labels.projects,
      commands: projects.map((project) => ({
        id: `project-${project.id}`,
        label: project.label,
        icon: <icons.folder />,
        run: () => router.push(project.href),
      })),
    },
    {
      title: labels.actions,
      commands: [
        {
          id: 'theme',
          label: theme === 'dark' ? labels.toLight : labels.toDark,
          icon: theme === 'dark' ? <icons.lightMode /> : <icons.darkMode />,
          run: () =>
            withViewTransition(
              () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
              effectsEnabled,
            ),
        },
        {
          id: 'language',
          label: `${labels.language}: ${localeNames[otherLocale]}`,
          icon: <icons.language />,
          run: () => {
            saveLocaleChoice(otherLocale);
            router.replace(pathname, { locale: otherLocale });
          },
        },
        {
          id: 'copy-email',
          label: copied ? labels.copied : labels.copyEmail,
          icon: copied ? <icons.check /> : <icons.copy />,
          hint: profile.email,
          keepOpen: true,
          run: () => {
            void navigator.clipboard.writeText(profile.email).then(() => {
              setCopied(true);
              window.setTimeout(() => {
                setCopied(false);
                onOpenChange(false);
              }, 900);
            });
          },
        },
        {
          id: 'cv',
          label: labels.cv,
          icon: <icons.download />,
          run: () => window.location.assign(profile.cv[locale]),
        },
      ],
    },
    {
      title: labels.links,
      commands: [
        { id: 'github', label: 'GitHub', href: profile.links.github },
        { id: 'linkedin', label: 'LinkedIn', href: profile.links.linkedin },
        { id: 'medium', label: 'Medium', href: profile.links.medium },
      ].map((link) => ({
        id: link.id,
        label: link.label,
        icon: <icons.northEast />,
        run: () => window.open(link.href, '_blank', 'noopener,noreferrer'),
      })),
    },
  ];

  const commands = new Map(
    groups.flatMap((group) => group.commands).map((command) => [command.id, command]),
  );

  function run(key: string) {
    const command = commands.get(key);
    if (!command) return;
    if (!command.keepOpen) onOpenChange(false);
    command.run();
  }

  return (
    <Dialog
      isOpen={open}
      onOpenChange={onOpenChange}
      size="lg"
      aria-label={labels.open}
      overlayClassName="sm:items-start sm:pt-[14vh]"
    >
      <Autocomplete filter={contains}>
        <div className="flex items-center gap-2 border-b border-outline-subtle p-3">
          <SearchField
            autoFocus
            aria-label={labels.open}
            placeholder={labels.placeholder}
            variant="soft"
            className="flex-1"
          />
          <Kbd variant="ghost" className="max-sm:hidden">
            esc
          </Kbd>
        </div>
        <Menu
          aria-label={labels.open}
          onAction={(key) => run(String(key))}
          renderEmptyState={() => (
            <p className="px-3 py-8 text-center text-sm text-on-surface-variant">{labels.empty}</p>
          )}
          className="max-h-[min(60vh,26rem)] overflow-y-auto p-2 outline-none"
        >
          {groups.map((group) => (
            <MenuSection key={group.title} className="pb-2 last:pb-0">
              <Header className="px-3 pt-2 pb-1.5 eyebrow">{group.title}</Header>
              {group.commands.map((command) => (
                <MenuItem
                  key={command.id}
                  id={command.id}
                  textValue={command.label}
                  className={item}
                >
                  <span className="flex size-5 shrink-0 items-center justify-center text-on-surface-variant [&_svg]:size-4">
                    {command.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{command.label}</span>
                  {command.hint ? (
                    <span className="truncate font-mono text-xs text-on-surface-variant max-sm:hidden">
                      {command.hint}
                    </span>
                  ) : null}
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Menu>
      </Autocomplete>
    </Dialog>
  );
}
