import type { Metadata } from 'next';
import { TrackPage } from '@/components/tracks/TrackPage';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'presenca');
}

export default function PresencaPage({ params }: { params: { lang: Locale } }) {
  return <TrackPage lang={params.lang} trackKey="presenca" />;
}
