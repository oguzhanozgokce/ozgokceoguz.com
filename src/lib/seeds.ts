export const seedColors = {
  kotlin: '#7F52FF',
  android: '#3DDC84',
  compose: '#4285F4',
  amber: '#F88909',
  coral: '#E44857',
} as const;

export type Seed = keyof typeof seedColors;

export const seeds = Object.keys(seedColors) as Seed[];

export const defaultSeed: Seed = 'kotlin';

export function isSeed(value: unknown): value is Seed {
  return typeof value === 'string' && value in seedColors;
}
