'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { fluidTween } from '@/lib/ds/motion';
import { cn } from '@/lib/ds/utils';

export interface GraphModule {
  id: string;
  dependsOn: string[];
  content: ReactNode;
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Edge {
  from: string;
  to: string;
  d: string;
  end: { x: number; y: number };
}

interface Layout {
  width: number;
  height: number;
  edges: Edge[];
}

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value));
}

function connect(a: Rect, b: Rect) {
  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  const bx = b.left + b.width / 2;
  const by = b.top + b.height / 2;

  if (Math.abs(ay - by) < a.height / 2) {
    const forward = ax < bx;
    const start = { x: forward ? a.left + a.width : a.left, y: ay };
    const end = { x: forward ? b.left : b.left + b.width, y: by };
    const middle = (start.x + end.x) / 2;
    return {
      d: `M ${start.x} ${start.y} C ${middle} ${start.y}, ${middle} ${end.y}, ${end.x} ${end.y}`,
      end,
    };
  }

  const upward = by < ay;
  const shift = clamp((bx - ax) * 0.22, a.width * 0.3);
  const start = { x: ax + shift, y: upward ? a.top : a.top + a.height };
  const end = { x: bx - shift, y: upward ? b.top + b.height : b.top };
  const middle = (start.y + end.y) / 2;
  return {
    d: `M ${start.x} ${start.y} C ${start.x} ${middle}, ${end.x} ${middle}, ${end.x} ${end.y}`,
    end,
  };
}

export function ModuleGraph({ modules }: { modules: GraphModule[] }) {
  const grid = useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const { spatialEnabled } = useMotionPreference();

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const rects = new Map<string, Rect>();
      for (const item of Array.from(element.children) as HTMLElement[]) {
        const id = item.dataset.module;
        if (!id) continue;
        rects.set(id, {
          left: item.offsetLeft,
          top: item.offsetTop,
          width: item.offsetWidth,
          height: item.offsetHeight,
        });
      }
      const edges: Edge[] = [];
      for (const item of modules) {
        const from = rects.get(item.id);
        if (!from) continue;
        for (const dependency of item.dependsOn) {
          const to = rects.get(dependency);
          if (to) edges.push({ from: item.id, to: dependency, ...connect(from, to) });
        }
      }
      setLayout({ width: element.offsetWidth, height: element.offsetHeight, edges });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [modules]);

  const related = active
    ? new Set([active, ...(modules.find((item) => item.id === active)?.dependsOn ?? [])])
    : null;

  return (
    <div className="relative">
      <ul ref={grid} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {modules.map((item) => (
          <li
            key={item.id}
            data-module={item.id}
            onPointerEnter={() => setActive(item.id)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(item.id)}
            onBlur={() => setActive(null)}
            className={cn(
              'transition-opacity duration-200 ease-out',
              related && !related.has(item.id) && 'opacity-40',
            )}
          >
            {item.content}
          </li>
        ))}
      </ul>
      {layout ? (
        <svg
          aria-hidden="true"
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="pointer-events-none absolute start-0 top-0 hidden overflow-visible lg:block"
        >
          {layout.edges.map((edge, index) => {
            const highlighted = active === edge.from;
            const dimmed = active !== null && !highlighted;
            return (
              <g
                key={`${edge.from}-${edge.to}`}
                className={cn(
                  'transition-opacity duration-200 ease-out',
                  dimmed ? 'opacity-20' : 'opacity-100',
                )}
              >
                <motion.path
                  d={edge.d}
                  fill="none"
                  stroke={highlighted ? 'var(--primary)' : 'var(--outline)'}
                  strokeWidth={highlighted ? 2 : 1.5}
                  strokeLinecap="round"
                  initial={spatialEnabled ? { pathLength: 0 } : false}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ ...fluidTween(700), delay: 0.15 + index * 0.08 }}
                />
                <circle
                  cx={edge.end.x}
                  cy={edge.end.y}
                  r={3.5}
                  fill="var(--canvas)"
                  stroke={highlighted ? 'var(--primary)' : 'var(--outline)'}
                  strokeWidth={1.5}
                />
              </g>
            );
          })}
        </svg>
      ) : null}
    </div>
  );
}
