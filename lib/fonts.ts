import localFont from 'next/font/local';

export const editorialFont = localFont({
  src: '../public/fonts/cormorant-garamond-latin.woff2',
  variable: '--font-cormorant',
  weight: '600 700',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman'
});

export const bodyFont = localFont({
  src: '../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  weight: '400 700',
  display: 'swap',
  fallback: ['Arial', 'sans-serif']
});

export const monoFont = localFont({
  src: '../public/fonts/jetbrains-mono-latin.woff2',
  variable: '--font-jetbrains',
  weight: '400 500',
  display: 'swap',
  fallback: ['monospace'],
  adjustFontFallback: false
});
