'use client';

import { useSyncExternalStore } from 'react';
import { defaultSeed, isSeed, type Seed } from './seeds';

export type Theme = 'dark' | 'light';

export const defaultTheme: Theme = 'dark';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function readTheme(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function readSeed(): Seed {
  const value = document.documentElement.dataset.seed;
  return isSeed(value) ? value : defaultSeed;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  store('theme', theme);
  emit();
}

export function applySeed(seed: Seed) {
  const root = document.documentElement;
  if (seed === defaultSeed) delete root.dataset.seed;
  else root.dataset.seed = seed;
  store('seed', seed);
  emit();
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => defaultTheme);
}

export function useSeed(): Seed {
  return useSyncExternalStore(subscribe, readSeed, () => defaultSeed);
}
