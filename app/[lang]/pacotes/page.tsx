import type { Metadata } from 'next';
import { PackagesGrid } from '@/components/packages/PackagesGrid';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'pacotes');
}

export default function PackagesPage({ params }: { params: { lang: Locale } }) {
  return (
    <main className="pt-20">
      <PackagesGrid lang={params.lang} variant="page" />
    </main>
  );
}
