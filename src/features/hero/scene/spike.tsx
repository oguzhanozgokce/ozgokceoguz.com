'use client';

import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import { MathUtils, type Group, type MeshStandardMaterial } from 'three';
import { useSeed, useTheme } from '@/lib/appearance';
import { DomSync } from './dom-sync';

const openAngle = -0.2;
const closedAngle = Math.PI / 2;
const screenPixelsPerUnit = 200;

function readToken(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function useSceneColors() {
  const theme = useTheme();
  const seed = useSeed();

  return useMemo(
    () => ({
      key: `${theme}-${seed}`,
      body: theme === 'dark' ? '#5a5a64' : '#e4e4ea',
      accent: readToken('--primary', '#7f52ff'),
      shadow: theme === 'dark' ? '#000000' : '#5c5c66',
    }),
    [theme, seed],
  );
}

function Screen() {
  return (
    <div className="h-[392px] w-[620px] overflow-hidden rounded-[10px] border border-outline-subtle bg-surface-container-lowest text-on-surface select-none">
      <div className="flex h-9 items-center gap-2 border-b border-outline-subtle px-3">
        <span className="size-2.5 rounded-full bg-error" />
        <span className="size-2.5 rounded-full bg-warning" />
        <span className="size-2.5 rounded-full bg-success" />
        <span className="ms-3 font-mono text-xs text-on-surface-variant">Profile.kt</span>
      </div>
      <pre className="p-5 font-mono text-[15px] leading-7">
        <span className="text-tertiary">@Composable</span>
        {'\n'}
        <span className="text-primary">fun</span> <span className="text-on-surface">Profile</span>
        {'() {\n'}
        {'    '}
        <span className="text-secondary">Column</span>
        {' {\n'}
        {'        '}
        <span className="text-secondary">Avatar</span>
        {'(photo)\n'}
        {'        '}
        <span className="text-secondary">Text</span>
        {'('}
        <span className="text-success">{'"Oğuzhan Özgökce"'}</span>
        {')\n'}
        {'        '}
        <span className="text-secondary">Chip</span>
        {'('}
        <span className="text-success">{'"Android"'}</span>
        {')\n'}
        {'    }\n}'}
        <span className="ms-0.5 inline-block h-5 w-2 translate-y-1 animate-pulse bg-primary" />
      </pre>
    </div>
  );
}

interface LaptopProps {
  body: string;
  accent: string;
  screenAnchorRef: RefObject<Group | null>;
  screenOpacityRef: RefObject<number>;
}

function Laptop({ body, accent, screenAnchorRef, screenOpacityRef }: LaptopProps) {
  const group = useRef<Group>(null);
  const lid = useRef<Group>(null);
  const glass = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = MathUtils.damp(
        group.current.rotation.y,
        -0.35 + state.pointer.x * 0.3,
        4,
        delta,
      );
      group.current.rotation.x = MathUtils.damp(
        group.current.rotation.x,
        0.12 - state.pointer.y * 0.12,
        4,
        delta,
      );
    }
    if (lid.current) {
      lid.current.rotation.x = MathUtils.damp(lid.current.rotation.x, openAngle, 3, delta);
      const progress = MathUtils.clamp(
        MathUtils.inverseLerp(0.5, openAngle + 0.05, lid.current.rotation.x),
        0,
        1,
      );
      screenOpacityRef.current = progress;
      if (glass.current) glass.current.emissiveIntensity = progress * 0.12;
    }
  });

  return (
    <group ref={group} position={[0, -0.7, 0]}>
      <RoundedBox args={[3.3, 0.12, 2.25]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color={body} metalness={0.7} roughness={0.32} />
      </RoundedBox>
      <mesh position={[0, 0.065, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial color={body} metalness={0.5} roughness={0.5} />
      </mesh>
      <group ref={lid} position={[0, 0.06, -1.1]} rotation={[closedAngle, 0, 0]}>
        <RoundedBox args={[3.3, 2.15, 0.07]} radius={0.05} smoothness={4} position={[0, 1.075, 0]}>
          <meshStandardMaterial color={body} metalness={0.7} roughness={0.32} />
        </RoundedBox>
        <mesh position={[0, 1.075, 0.037]}>
          <planeGeometry args={[3.14, 2]} />
          <meshStandardMaterial
            ref={glass}
            color="#050506"
            emissive={accent}
            emissiveIntensity={0}
            roughness={0.2}
          />
        </mesh>
        <group ref={screenAnchorRef} position={[0, 1.075, 0.04]} />
      </group>
    </group>
  );
}

export default function SceneSpike() {
  const colors = useSceneColors();
  const overlay = useRef<HTMLDivElement>(null);
  const cameraLayer = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const screenAnchorRef = useRef<Group>(null);
  const screenOpacityRef = useRef(0);

  return (
    <div className="relative size-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.8, 5.6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <pointLight position={[-3, 1.5, 2]} intensity={30} color={colors.accent} />
        <Laptop
          body={colors.body}
          accent={colors.accent}
          screenAnchorRef={screenAnchorRef}
          screenOpacityRef={screenOpacityRef}
        />
        <ContactShadows
          key={colors.key}
          position={[0, -0.78, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={2.5}
          color={colors.shadow}
        />
        <Environment resolution={128}>
          <Lightformer intensity={4} position={[0, 4, 3]} scale={[8, 3, 1]} />
          <Lightformer
            intensity={2.4}
            position={[-4, 1, 2]}
            rotation-y={Math.PI / 2}
            scale={[5, 2, 1]}
          />
          <Lightformer
            intensity={3}
            position={[4, 1, -1]}
            rotation-y={-Math.PI / 2}
            scale={[5, 2, 1]}
            color={colors.accent}
          />
        </Environment>
        <DomSync
          overlay={overlay}
          cameraLayer={cameraLayer}
          surfaces={[
            {
              anchor: screenAnchorRef,
              element: screen,
              pixelsPerUnit: screenPixelsPerUnit,
              opacity: screenOpacityRef,
            },
          ]}
        />
      </Canvas>
      <div ref={overlay} className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={cameraLayer} className="absolute inset-0 transform-3d">
          <div ref={screen} className="absolute top-0 left-0 opacity-0 backface-hidden">
            <Screen />
          </div>
        </div>
      </div>
    </div>
  );
}
