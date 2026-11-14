import {
  Anybody,
  Bitcount_Grid_Double,
  Bricolage_Grotesque,
  Doto,
  Fraunces,
  Geist_Pixel,
  Google_Sans_Flex,
  Science_Gothic,
} from 'next/font/google';

export const flexFull = Google_Sans_Flex({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth', 'ROND'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-flex-full',
});

export const scienceGothic = Science_Gothic({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth', 'CTRS', 'slnt'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-science',
});

export const anybody = Anybody({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-anybody',
});

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth', 'opsz'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-bricolage',
});

export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-fraunces',
});

export const bitcount = Bitcount_Grid_Double({
  subsets: ['latin', 'latin-ext'],
  axes: ['ELSH', 'ELXP', 'CRSV', 'slnt'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-bitcount',
});

export const geistPixel = Geist_Pixel({
  subsets: ['latin', 'latin-ext'],
  axes: ['ELSH'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-geist-pixel',
});

export const doto = Doto({
  subsets: ['latin', 'latin-ext'],
  axes: ['ROND'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-doto',
});

export const labFontVariables = [
  flexFull,
  scienceGothic,
  anybody,
  bricolage,
  fraunces,
  bitcount,
  geistPixel,
  doto,
]
  .map((font) => font.variable)
  .join(' ');
