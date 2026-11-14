'use client';

import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import type { Matrix4, Object3D, PerspectiveCamera } from 'three';

export interface DomSurface {
  anchor: RefObject<Object3D | null>;
  element: RefObject<HTMLElement | null>;
  pixelsPerUnit: number;
  opacity?: RefObject<number>;
}

interface DomSyncProps {
  overlay: RefObject<HTMLElement | null>;
  cameraLayer: RefObject<HTMLElement | null>;
  surfaces: DomSurface[];
}

const cameraSigns = [1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1];

function round(value: number) {
  return Math.abs(value) < 1e-10 ? 0 : value;
}

function cameraMatrix(matrix: Matrix4) {
  const values = matrix.elements.map((value, index) => round(cameraSigns[index] * value));
  return `matrix3d(${values.join(',')})`;
}

function objectMatrix(matrix: Matrix4, pixelsPerUnit: number) {
  const scale = 1 / pixelsPerUnit;
  const e = matrix.elements;
  const values = [
    e[0] * scale,
    e[1] * scale,
    e[2] * scale,
    e[3],
    -e[4] * scale,
    -e[5] * scale,
    -e[6] * scale,
    -e[7],
    e[8] * scale,
    e[9] * scale,
    e[10] * scale,
    e[11],
    e[12],
    e[13],
    e[14],
    e[15],
  ].map(round);
  return `translate(-50%,-50%)matrix3d(${values.join(',')})`;
}

type SyncedProperty = 'transform' | 'perspective' | 'opacity';

const written = new WeakMap<HTMLElement, Partial<Record<SyncedProperty, string>>>();

function write(element: HTMLElement, property: SyncedProperty, value: string) {
  let record = written.get(element);
  if (!record) {
    record = {};
    written.set(element, record);
  }
  if (record[property] === value) return;
  record[property] = value;
  element.style[property] = value;
}

export function DomSync({ overlay, cameraLayer, surfaces }: DomSyncProps) {
  useFrame(({ camera, size }) => {
    const container = overlay.current;
    const layer = cameraLayer.current;
    if (!container || !layer) return;

    camera.updateMatrixWorld();
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;
    const distance = (camera as PerspectiveCamera).projectionMatrix.elements[5] * halfHeight;

    write(container, 'perspective', `${distance}px`);
    write(
      layer,
      'transform',
      `translateZ(${distance}px)${cameraMatrix(camera.matrixWorldInverse)}translate(${halfWidth}px,${halfHeight}px)`,
    );

    for (const surface of surfaces) {
      const anchor = surface.anchor.current;
      const element = surface.element.current;
      if (!anchor || !element) continue;
      anchor.updateWorldMatrix(true, false);
      write(element, 'transform', objectMatrix(anchor.matrixWorld, surface.pixelsPerUnit));
      if (surface.opacity) write(element, 'opacity', surface.opacity.current.toFixed(3));
    }
  });

  return null;
}
