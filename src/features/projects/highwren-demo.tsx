'use client';

import { CopyButton } from '@/components/ds/copy-button';
import { SegmentedControl, SegmentedControlItem } from '@/components/ds/segmented-control';

const command = 'npx shadcn add @ds/button';

export function HighwrenDemo({ label }: { label: string }) {
  return (
    <div className="relative z-10 flex flex-col items-start gap-3">
      <SegmentedControl aria-label={label} size="sm" defaultSelectedKeys={['solid']}>
        <SegmentedControlItem id="solid">Solid</SegmentedControlItem>
        <SegmentedControlItem id="soft">Soft</SegmentedControlItem>
        <SegmentedControlItem id="outline">Outline</SegmentedControlItem>
      </SegmentedControl>
      <div className="flex max-w-full items-center gap-2 rounded-full border border-outline-subtle bg-surface-container-lowest py-1 ps-4 pe-1">
        <code className="truncate font-mono text-xs text-on-surface-variant">{command}</code>
        <CopyButton value={command} variant="ghost" size="sm" />
      </div>
    </div>
  );
}
