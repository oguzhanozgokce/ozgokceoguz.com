import type { ProjectLinks as Links } from '@content/projects';
import { ArrowLink } from '@/components/ui/arrow-link';

export interface ProjectLinkLabels {
  playStore: string;
  appStore: string;
  website: string;
  github: string;
  newTab: string;
}

export function ProjectLinks({ links, labels }: { links: Links; labels: ProjectLinkLabels }) {
  const entries = [
    links.playStore ? { href: links.playStore, label: labels.playStore } : null,
    links.appStore ? { href: links.appStore, label: labels.appStore } : null,
    links.website ? { href: links.website, label: labels.website } : null,
    links.github ? { href: links.github, label: labels.github } : null,
  ].filter((entry) => entry !== null);

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {entries.map((entry) => (
        <ArrowLink key={entry.href} href={entry.href} newTabLabel={labels.newTab}>
          {entry.label}
        </ArrowLink>
      ))}
    </div>
  );
}
