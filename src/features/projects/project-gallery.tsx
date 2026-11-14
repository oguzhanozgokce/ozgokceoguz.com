'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { PhoneFrame } from '@/components/ui/phone-frame';

const Lightbox = dynamic(() => import('@/components/ds/lightbox').then((mod) => mod.Lightbox), {
  ssr: false,
});

export interface GalleryShot {
  id: string;
  src: string;
  label: string;
}

interface ProjectGalleryProps {
  title: string;
  shots: GalleryShot[];
  openLabel: string;
}

export function ProjectGallery({ title, shots, openLabel }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(shots[0]?.id ?? '');
  const [requested, setRequested] = useState(false);

  return (
    <>
      <ul className="-mx-[clamp(20px,4vw,48px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(20px,4vw,48px)] pb-4">
        {shots.map((shot) => (
          <li key={shot.id} className="w-44 shrink-0 snap-start sm:w-52">
            <button
              type="button"
              aria-label={`${openLabel}: ${shot.label}`}
              onClick={() => {
                setSelected(shot.id);
                setRequested(true);
                setOpen(true);
              }}
              className="group/shot flex w-full cursor-zoom-in flex-col gap-3 rounded-[2rem] text-start outline-offset-4 outline-primary focus-visible:outline-2"
            >
              <PhoneFrame className="transition-transform duration-300 ease-fluid group-hover/shot:-translate-y-1.5 motion-reduce:transition-none">
                <Image
                  src={shot.src}
                  alt={`${title}: ${shot.label}`}
                  width={640}
                  height={1400}
                  sizes="208px"
                  className="size-full object-cover object-top"
                />
              </PhoneFrame>
              <span className="px-1 font-mono text-xs text-on-surface-variant">{shot.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {requested ? (
        <Lightbox
          isOpen={open}
          onOpenChange={setOpen}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(String(key))}
          items={shots.map((shot) => ({
            id: shot.id,
            src: shot.src,
            alt: `${title}: ${shot.label}`,
            title: shot.label,
          }))}
        />
      ) : null}
    </>
  );
}
