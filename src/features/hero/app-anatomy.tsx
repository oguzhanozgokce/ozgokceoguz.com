'use client';

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { useMotionPreference } from '@/components/ds/ds-provider';
import { SegmentedControl, SegmentedControlItem } from '@/components/ds/segmented-control';
import { fluidTween, spatialSpring } from '@/lib/ds/motion';
import { cn } from '@/lib/ds/utils';
import { FlowContext, FlowGlow } from './flow';

export interface AnatomyLabels {
  caption: string;
  view: string;
  preview: string;
  layers: string;
  ui: string;
  presentation: string;
  domain: string;
  data: string;
  steps: string[];
}

type Mode = 'preview' | 'layers';
type LayerId = 'ui' | 'presentation' | 'domain' | 'data';
type LayerState = 'idle' | 'active' | 'raised' | 'dimmed';

const layerGap = 15;
const restGap = 0.08;
const loopSeconds = 8;
const tiltSpring = { stiffness: 140, damping: 22, mass: 0.6 };
const driftSpring = { stiffness: 120, damping: 30, mass: 0.5 };
const labelSize = 'text-[clamp(0.6875rem,2.5cqw,0.875rem)]';
const blockSize = 'text-[clamp(0.4rem,1.8cqw,0.75rem)]';
const dimming = 'transition-opacity duration-300 ease-out';

const beats: { at: number; step: number; layer: LayerId }[] = [
  { at: 0, step: 0, layer: 'ui' },
  { at: 0.14, step: 0, layer: 'presentation' },
  { at: 0.2, step: 1, layer: 'presentation' },
  { at: 0.34, step: 1, layer: 'domain' },
  { at: 0.42, step: 2, layer: 'domain' },
  { at: 0.49, step: 2, layer: 'data' },
  { at: 0.62, step: 3, layer: 'data' },
  { at: 0.7, step: 3, layer: 'presentation' },
  { at: 0.84, step: 4, layer: 'ui' },
];

function beatAt(value: number) {
  let index = 0;
  for (let cursor = 0; cursor < beats.length; cursor += 1) {
    if (value >= beats[cursor].at) index = cursor;
  }
  return index;
}

interface LayerProps {
  depth: number;
  lift: MotionValue<number>;
  fade?: MotionValue<number>;
  labelOpacity: MotionValue<number>;
  billboard: MotionValue<string>;
  state?: LayerState;
  name?: string;
  nameClassName?: string;
  className?: string;
  children?: ReactNode;
}

function Layer({
  depth,
  lift,
  fade,
  labelOpacity,
  billboard,
  state = 'idle',
  name,
  nameClassName,
  className,
  children,
}: LayerProps) {
  const transform = useMotionTemplate`translateZ(calc(${lift} * ${depth * layerGap}cqw + ${depth * restGap}cqw))`;

  return (
    <motion.div style={{ transform }} className="absolute inset-0 transform-3d">
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-500 ease-fluid transform-3d',
          state === 'active' && '[transform:translateZ(2.4cqw)]',
          state === 'raised' && '[transform:translateZ(4.5cqw)]',
        )}
      >
        <motion.div style={fade ? { opacity: fade } : undefined} className="absolute inset-0">
          <div
            className={cn(
              'absolute inset-0 overflow-hidden rounded-[4.6cqw] border',
              dimming,
              state === 'dimmed' && 'opacity-30',
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
        {name ? (
          <motion.div
            style={{ transform: billboard, opacity: labelOpacity }}
            className="absolute start-full top-full origin-left"
          >
            <span
              className={cn(
                'flex items-center gap-[1.4cqw] font-mono whitespace-nowrap',
                dimming,
                labelSize,
                state === 'dimmed' && 'opacity-30',
                nameClassName,
              )}
            >
              <span className="h-px w-[3.5cqw] bg-current opacity-60" />
              {name}
            </span>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}

interface BlockProps {
  children: ReactNode;
  active?: [number, number];
  className?: string;
}

function Block({ children, active, className }: BlockProps) {
  return (
    <span
      className={cn(
        'relative flex h-[6.4cqw] items-center justify-center overflow-hidden rounded-[1.8cqw] border border-current/40 px-[1.4cqw] font-mono leading-none',
        blockSize,
        className,
      )}
    >
      {active ? <FlowGlow from={active[0]} to={active[1]} className="bg-current/30" /> : null}
      <span className="relative">{children}</span>
    </span>
  );
}

function Connector() {
  return <span className="mx-auto h-[3.2cqw] w-px bg-current opacity-50" />;
}

function Schematic({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex size-full flex-col p-[3.4cqw]">
      <span className={cn('font-mono leading-none opacity-80', blockSize)}>{title}</span>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

interface PulseProps {
  flow: MotionValue<number>;
  lift: MotionValue<number>;
  fade: MotionValue<number>;
  billboard: MotionValue<string>;
  times: number[];
  depths: number[];
  position: string;
  className: string;
}

function Pulse({ flow, lift, fade, billboard, times, depths, position, className }: PulseProps) {
  const start = times[0];
  const end = times[times.length - 1];
  const depth = useTransform(flow, times, depths, { clamp: true });
  const height = useTransform<number, number>(
    [depth, lift],
    ([level, amount]) => amount * layerGap * level,
  );
  const shown = useTransform(flow, [start - 0.02, start, end, end + 0.03], [0, 1, 1, 0], {
    clamp: true,
  });
  const glow = useTransform<number, number>([shown, fade], ([a, b]) => a * b);
  const dot = useMotionTemplate`translateZ(${height}cqw) ${billboard}`;
  const rail = useMotionTemplate`translateZ(calc(${lift} * ${layerGap}cqw)) rotateX(90deg)`;
  const length = useMotionTemplate`calc(${lift} * ${3 * layerGap}cqw)`;
  const railOpacity = useTransform(fade, (value) => value * 0.3);

  return (
    <>
      <motion.span
        style={{ transform: rail, height: length, opacity: railOpacity, left: position }}
        className={cn('absolute top-1/2 w-[0.3cqw] origin-top bg-current', className)}
      />
      <motion.span
        style={{ transform: dot, opacity: glow, left: position }}
        className={cn(
          'absolute top-1/2 -ms-[1.1cqw] -mt-[1.1cqw] size-[2.2cqw] rounded-full bg-current shadow-[0_0_2.4cqw_currentColor]',
          className,
        )}
      />
    </>
  );
}

export function AppAnatomy({ labels, screen }: { labels: AnatomyLabels; screen: ReactNode }) {
  const { spatialEnabled, decorativeEnabled, profile } = useMotionPreference();
  const [mode, setMode] = useState<Mode>('preview');
  const [focused, setFocused] = useState<LayerId | null>(null);
  const [beat, setBeat] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const seen = useInView(stage, { once: true, amount: 0.4 });
  const onScreen = useInView(stage, { amount: 0.15 });

  const explode = useMotionValue(0);
  const flow = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, tiltSpring);
  const smoothY = useSpring(pointerY, tiltSpring);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 12%', 'end start'] });
  const drift = useSpring(scrollYProgress, driftSpring);
  const scrollFactor = spatialEnabled ? 1 : 0;

  const lift = useTransform<number, number>(
    [explode, drift],
    ([e, d]) => Math.max(0, e) * (1 + d * 0.5 * scrollFactor),
  );
  const rotateX = useTransform<number, number>([explode, smoothY], ([e, y]) => e * 58 - y * 6);
  const rotateY = useTransform<number, number>(
    [explode, smoothX],
    ([e, x]) => (1 - e) * (-18 + x * 10),
  );
  const rotateZ = useTransform<number, number>(
    [explode, smoothX, drift],
    ([e, x, d]) => e * (-40 + x * 7 + d * 18 * scrollFactor),
  );
  const inverseX = useTransform(rotateX, (value) => -value);
  const inverseY = useTransform(rotateY, (value) => -value);
  const inverseZ = useTransform(rotateZ, (value) => -value);
  const fade = useTransform(explode, [0.04, 0.34], [0, 1], { clamp: true });
  const labelOpacity = useTransform(explode, [0.3, 0.9], [0, 1], { clamp: true });

  const rig = useMotionTemplate`translate3d(calc(${explode} * -14cqw), calc(${explode} * 19cqw), 0) scale(calc(1 - ${explode} * 0.12)) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  const billboard = useMotionTemplate`rotateZ(${inverseZ}deg) rotateY(${inverseY}deg) rotateX(${inverseX}deg)`;

  const running = mode === 'layers' && decorativeEnabled && onScreen;

  useMotionValueEvent(flow, 'change', (value) => {
    const next = beatAt(value);
    setBeat((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (!seen || !spatialEnabled) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) setMode('layers');
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [seen, spatialEnabled]);

  useEffect(() => {
    const expanding = mode === 'layers';
    const transition = !spatialEnabled
      ? { duration: 0 }
      : expanding
        ? spatialSpring('slow', profile)
        : fluidTween(520);
    const controls = animate(explode, expanding ? 1 : 0, transition);
    return () => controls.stop();
  }, [mode, explode, spatialEnabled, profile]);

  useEffect(() => {
    if (!running) return;
    const controls = animate(flow, [0, 1], {
      duration: loopSeconds,
      ease: 'linear',
      repeat: Infinity,
      delay: 0.9,
    });
    return () => {
      controls.stop();
      flow.set(0);
    };
  }, [running, flow]);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!decorativeEnabled || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function settle() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const current = running ? beats[beat] : null;

  function stateOf(id: LayerId): LayerState {
    if (mode !== 'layers') return 'idle';
    if (focused) return focused === id ? 'raised' : 'dimmed';
    return current?.layer === id ? 'active' : 'idle';
  }

  const legend: { id: LayerId; name: string; text: string; className: string }[] = [
    { id: 'ui', name: ':ui', text: labels.ui, className: 'text-on-surface' },
    {
      id: 'presentation',
      name: ':presentation',
      text: labels.presentation,
      className: 'text-primary',
    },
    { id: 'domain', name: ':domain', text: labels.domain, className: 'text-secondary' },
    { id: 'data', name: ':data', text: labels.data, className: 'text-tertiary' },
  ];

  const shared = { lift, billboard, labelOpacity };
  const step = current?.step ?? null;

  return (
    <FlowContext value={flow}>
      <div className="flex flex-col items-center gap-6">
        <div
          ref={stage}
          role="img"
          aria-label={labels.caption}
          onPointerMove={tilt}
          onPointerLeave={settle}
          className="@container relative aspect-square w-full max-w-[620px]"
        >
          <div className="absolute inset-0 [perspective:240cqw]">
            <div className="absolute inset-0 m-auto h-[78cqw] w-[36cqw]">
              <motion.div style={{ transform: rig }} className="relative size-full transform-3d">
                <Layer
                  depth={0}
                  {...shared}
                  className="-inset-[1.2cqw] rounded-[5.6cqw] border-outline-variant bg-surface-container-highest shadow-lg"
                />
                <Layer
                  depth={1}
                  {...shared}
                  fade={fade}
                  state={stateOf('data')}
                  name=":data"
                  nameClassName="text-tertiary"
                  className="layer-tint-tertiary"
                >
                  <Schematic title="data">
                    <Block active={[0.49, 0.56]}>Repository</Block>
                    <Connector />
                    <span className="grid grid-cols-3 gap-[1.2cqw]">
                      <Block active={[0.55, 0.63]}>Room</Block>
                      <Block active={[0.55, 0.63]}>Ktor</Block>
                      <Block>Store</Block>
                    </span>
                  </Schematic>
                </Layer>
                <Layer
                  depth={2}
                  {...shared}
                  fade={fade}
                  state={stateOf('domain')}
                  name=":domain"
                  nameClassName="text-secondary"
                  className="layer-tint-secondary"
                >
                  <Schematic title="domain">
                    <span className="flex flex-col gap-[2cqw]">
                      <Block active={[0.34, 0.44]} className="rounded-full">
                        GetProfile()
                      </Block>
                      <Block className="rounded-full">ObserveProjects()</Block>
                      <Block className="rounded-full">SendMessage()</Block>
                    </span>
                  </Schematic>
                </Layer>
                <Layer
                  depth={3}
                  {...shared}
                  fade={fade}
                  state={stateOf('presentation')}
                  name=":presentation"
                  nameClassName="text-primary"
                  className="layer-tint-primary"
                >
                  <Schematic title="presentation">
                    <Block active={[0.14, 0.2]}>Intent</Block>
                    <Connector />
                    <Block active={[0.2, 0.3]}>ViewModel</Block>
                    <Connector />
                    <Block active={[0.72, 0.84]}>UiState</Block>
                  </Schematic>
                </Layer>
                <Layer
                  depth={4}
                  {...shared}
                  state={stateOf('ui')}
                  name=":ui"
                  nameClassName="text-on-surface"
                  className="border-outline-variant bg-canvas shadow-md"
                >
                  {screen}
                </Layer>
                <Pulse
                  flow={flow}
                  lift={lift}
                  fade={fade}
                  billboard={billboard}
                  times={[0.08, 0.14, 0.28, 0.34, 0.43, 0.49]}
                  depths={[4, 3, 3, 2, 2, 1]}
                  position="-9%"
                  className="text-primary"
                />
                <Pulse
                  flow={flow}
                  lift={lift}
                  fade={fade}
                  billboard={billboard}
                  times={[0.63, 0.72, 0.82, 0.88]}
                  depths={[1, 3, 3, 4]}
                  position="109%"
                  className="text-success"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-center gap-5">
          <SegmentedControl
            aria-label={labels.view}
            size="sm"
            selectedKeys={[mode]}
            onSelectionChange={(keys) => {
              const [key] = keys;
              if (key !== 'preview' && key !== 'layers') return;
              touched.current = true;
              setMode(key);
            }}
          >
            <SegmentedControlItem id="preview">{labels.preview}</SegmentedControlItem>
            <SegmentedControlItem id="layers">{labels.layers}</SegmentedControlItem>
          </SegmentedControl>
          <motion.div style={{ opacity: fade }} className="flex w-full flex-col gap-4">
            <div className="flex h-6 items-center gap-3 text-sm">
              <span aria-hidden="true" className="flex shrink-0 gap-1">
                {labels.steps.map((label, index) => (
                  <span
                    key={label}
                    className={cn(
                      'h-1 w-4 rounded-full transition-colors duration-300 ease-out',
                      step === null || index > step
                        ? 'bg-neutral-soft'
                        : index === step
                          ? 'bg-primary'
                          : 'bg-primary/40',
                    )}
                  />
                ))}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                {step !== null ? (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={fluidTween(180)}
                    className="min-w-0 truncate text-on-surface"
                  >
                    <span className="me-2 font-mono text-xs text-primary">
                      {step + 1}/{labels.steps.length}
                    </span>
                    {labels.steps[step]}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
            <ul className="grid w-full grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
              {legend.map((item) => (
                <li
                  key={item.id}
                  onPointerEnter={() => setFocused(item.id)}
                  onPointerLeave={() => setFocused(null)}
                  className={cn(
                    '-mx-2 flex cursor-default items-baseline gap-2 rounded-item px-2 py-1 transition-colors duration-100 ease-out',
                    (focused ?? current?.layer) === item.id && 'bg-neutral-soft',
                  )}
                >
                  <span className={cn('shrink-0 font-mono text-xs', item.className)}>
                    {item.name}
                  </span>
                  <span className="text-on-surface-variant">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </FlowContext>
  );
}
