import type { Metadata } from 'next';
import { TriagePage } from '@/components/diagnostic/TriagePage';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'triagem');
}

export default function TriagemPage({ params, searchParams }: { params: { lang: Locale }; searchParams: { track?: string } }) {
  const track = searchParams.track === 'presenca' || searchParams.track === 'estrutura' ? searchParams.track : 'home';
  return <TriagePage lang={params.lang} track={track} />;
}
