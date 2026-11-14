import type { ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn('@container w-full', className)}>
      <div className="relative aspect-[9/19.6] rounded-[14cqw] border border-outline-variant bg-surface-container-highest p-[3cqw] shadow-lg">
        <div className="relative size-full overflow-hidden rounded-[11cqw] bg-canvas">
          {children}
        </div>
      </div>
    </div>
  );
}
