'use client';

import dynamic from 'next/dynamic';

const SceneSpike = dynamic(() => import('@/features/hero/scene/spike'), {
  ssr: false,
  loading: () => <div className="size-full animate-ds-pulse rounded-container bg-neutral-soft" />,
});

export function SceneLab() {
  return (
    <div className="h-[420px] overflow-hidden rounded-container border border-outline-subtle bg-surface-raised sm:h-[520px]">
      <SceneSpike />
    </div>
  );
}
