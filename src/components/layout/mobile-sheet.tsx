'use client';

import { Sheet, SheetBody, SheetHeader } from '@/components/ds/sheet';
import { Link } from '@/i18n/navigation';
import type { NavItem } from './nav-links';

interface MobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  label: string;
}

export default function MobileSheet({ open, onOpenChange, items, label }: MobileSheetProps) {
  return (
    <Sheet side="bottom" isOpen={open} onOpenChange={onOpenChange} aria-label={label}>
      <SheetHeader title={label} />
      <SheetBody>
        <nav aria-label={label} className="flex flex-col pb-6">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={() => onOpenChange(false)}
              className="flex items-baseline gap-4 border-b border-outline-subtle py-4 font-display text-3xl font-semibold tracking-tight text-on-surface font-stretch-expanded outline-offset-2 outline-primary focus-visible:outline-2"
            >
              <span className="font-mono text-xs font-normal text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetBody>
    </Sheet>
  );
}
