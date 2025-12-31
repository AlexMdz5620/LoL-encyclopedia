// app/fonts.ts
import localFont from 'next/font/local';

// Beaufort for LOL (títulos)
export const beaufort = localFont({
  src: [
    {
      path: '../public/fonts/BeaufortforLOL-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BeaufortforLOL-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/BeaufortforLOL-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/BeaufortforLOL-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-beaufort',
  display: 'swap',
});

// Spiegel (texto principal)
export const spiegel = localFont({
  src: [
    {
      path: '../public/fonts/Spiegel_TT_Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spiegel_TT_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spiegel_TT_Regular_Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Spiegel_TT_Bold_Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-spiegel',
  display: 'swap',
});