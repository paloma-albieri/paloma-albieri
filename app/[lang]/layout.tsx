import type { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { isLocale } from '@/lib/i18n/config';
import { bodyFont as latinBodyFont, editorialFont, monoFont } from '@/lib/fonts';
import { buildJsonLd } from '@/lib/seo/jsonld';
import { Analytics } from '@/components/analytics/Analytics';
import '@/app/styles/globals.css';

export const dynamic = 'force-dynamic';

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
      className={`${editorialFont.variable} ${latinBodyFont.variable} ${monoFont.variable}`}
    >
      <body className={bodyFont}>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <Header lang={params.lang} />
          {children}
          <Footer lang={params.lang} />
          <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-68VJLE4KGY'} />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
