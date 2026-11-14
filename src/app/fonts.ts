import { Google_Sans_Flex, JetBrains_Mono } from 'next/font/google';

export const bodyFont = Google_Sans_Flex({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-body',
});

export const codeFont = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-code',
});
