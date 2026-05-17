import type { ReactNode } from 'react';
import { Fraunces, Inter_Tight, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { isLocale } from '@/lib/i18n/config';
import { buildJsonLd } from '@/lib/seo/jsonld';
import '@/app/styles/globals.css';

export const dynamic = 'force-dynamic';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-display',
  display: 'swap'
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap'
});

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap'
});

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const messages = useMessages();
  const bodyFont = params.lang === 'jp' ? 'font-[var(--font-jp)]' : 'font-body';
  const jsonLd = buildJsonLd(params.lang);

  return (
    <html
      lang={params.lang === 'jp' ? 'ja' : 'pt-BR'}
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} ${notoSansJp.variable}`}
    >
      <body className={bodyFont}>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <Header lang={params.lang} />
          {children}
          <Footer lang={params.lang} />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
