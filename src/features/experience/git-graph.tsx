'use client';

import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { spatialSpring } from '@/lib/ds/motion';
import { cn } from '@/lib/ds/utils';

export interface GraphRow {
  id: string;
  hash: string;
  label: string;
  branch: string | null;
  current: boolean;
  content: ReactNode;
}

interface Layout {
  height: number;
  ys: number[];
}

const lanes = [12, 36];
const nodeOffset = 9;
const curve = 52;
const width = 48;

function branchRuns(rows: GraphRow[]) {
  const runs: [number, number][] = [];
  let start = -1;
  rows.forEach((row, index) => {
    const previous = rows[index - 1];
    if (start !== -1 && row.branch !== previous?.branch) {
      runs.push([start, index - 1]);
      start = -1;
    }
    if (row.branch && start === -1) start = index;
  });
  if (start !== -1) runs.push([start, rows.length - 1]);
  return runs;
}

interface TraceProps {
  d: string;
  from: number;
  to: number;
  progress: MotionValue<number>;
  animated: boolean;
  color: string;
}

function Trace({ d, from, to, progress, animated, color }: TraceProps) {
  const length = useTransform(progress, [from, to], [0, 1], { clamp: true });

  return (
    <>
      <path d={d} fill="none" stroke="var(--outline-variant)" strokeWidth={2} />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={animated ? { pathLength: length } : undefined}
      />
    </>
  );
}

interface NodeProps {
  x: number;
  y: number;
  at: number;
  progress: MotionValue<number>;
  animated: boolean;
  color: string;
  current: boolean;
}

function Node({ x, y, at, progress, animated, color, current }: NodeProps) {
  const visibility = useTransform(progress, [at - 0.04, at], [0, 1], { clamp: true });

  return (
    <motion.g style={animated ? { opacity: visibility } : undefined}>
      {current ? (
        <circle
          cx={x}
          cy={y}
          r={6}
          fill={color}
          className="origin-center [transform-box:fill-box] motion-safe:animate-ping"
        />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={5.5}
        fill={current ? color : 'var(--canvas)'}
        stroke={color}
        strokeWidth={2.5}
      />
    </motion.g>
  );
}

export function GitGraph({ rows }: { rows: GraphRow[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [active, setActive] = useState<string | null>(rows[0]?.id ?? null);
  const { spatialEnabled, profile } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 72%', 'end 58%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const items = Array.from(element.children) as HTMLElement[];
      setLayout({
        height: element.offsetHeight,
        ys: items.map((item) => item.offsetTop + nodeOffset),
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.row ?? null);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const item of Array.from(element.children)) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  const [main, side] = lanes;
  const runs = branchRuns(rows);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-14">
      <div className="relative">
        {layout ? (
          <svg
            aria-hidden="true"
            width={width}
            height={layout.height}
            viewBox={`0 0 ${width} ${layout.height}`}
            className="absolute start-0 top-0 overflow-visible"
          >
            <Trace
              d={`M ${main} ${layout.ys[0]} L ${main} ${layout.height - 8}`}
              from={layout.ys[0] / layout.height}
              to={1}
              progress={progress}
              animated={spatialEnabled}
              color="var(--primary)"
            />
            {runs.map(([first, last]) => {
              const top = layout.ys[first];
              const bottom = layout.ys[last];
              const d = [
                `M ${main} ${top - curve}`,
                `C ${main} ${top - curve / 2}, ${side} ${top - curve / 2}, ${side} ${top}`,
                `L ${side} ${bottom}`,
                `C ${side} ${bottom + curve / 2}, ${main} ${bottom + curve / 2}, ${main} ${bottom + curve}`,
              ].join(' ');
              return (
                <Trace
                  key={rows[first].id}
                  d={d}
                  from={(top - curve) / layout.height}
                  to={(bottom + curve) / layout.height}
                  progress={progress}
                  animated={spatialEnabled}
                  color="var(--tertiary)"
                />
              );
            })}
            {rows.map((row, index) => (
              <Node
                key={row.id}
                x={row.branch ? side : main}
                y={layout.ys[index]}
                at={layout.ys[index] / layout.height}
                progress={progress}
                animated={spatialEnabled}
                color={row.branch ? 'var(--tertiary)' : 'var(--primary)'}
                current={row.current}
              />
            ))}
            <circle
              cx={main}
              cy={layout.height - 8}
              r={3.5}
              fill="var(--canvas)"
              stroke="var(--outline)"
              strokeWidth={2}
            />
          </svg>
        ) : null}
        <ol ref={list} className="flex flex-col ps-16 pb-16">
          {rows.map((row) => (
            <li
              key={row.id}
              id={`role-${row.id}`}
              data-row={row.id}
              className="scroll-mt-28 pb-14 last:pb-10"
            >
              {row.content}
            </li>
          ))}
        </ol>
      </div>
      <aside
        lang="en"
        className="sticky top-28 hidden rounded-container border border-outline-subtle bg-surface-raised p-4 font-mono text-xs lg:block"
      >
        <p className="flex items-center gap-1.5 px-2 pb-3 text-on-surface-variant">
          <span className="size-2.5 rounded-full bg-neutral-soft" />
          <span className="size-2.5 rounded-full bg-neutral-soft" />
          <span className="size-2.5 rounded-full bg-neutral-soft" />
          <span className="ms-2">git log --oneline</span>
        </p>
        <ol className="flex flex-col">
          {rows.map((row) => (
            <li key={row.id}>
              <a
                href={`#role-${row.id}`}
                aria-current={active === row.id ? 'location' : undefined}
                className="relative flex gap-2 rounded-item px-2 py-1.5 leading-5 text-on-surface-variant outline-offset-2 outline-primary transition-colors duration-100 ease-out hover:text-on-surface focus-visible:outline-2 aria-[current]:text-on-surface"
              >
                {active === row.id ? (
                  <motion.span
                    layoutId="log-active"
                    transition={spatialSpring('fast', profile)}
                    className="absolute inset-0 rounded-item bg-neutral-soft"
                  />
                ) : null}
                <span className={cn('relative', row.branch ? 'text-tertiary' : 'text-primary')}>
                  {row.hash}
                </span>
                <span className="relative min-w-0 truncate">{row.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
