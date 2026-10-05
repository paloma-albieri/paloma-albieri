import type { Metadata } from 'next';
import { DiagnosticPage } from '@/components/diagnostic/DiagnosticPage';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'diagnostico');
}

export default function DiagnosticoPage({ params }: { params: { lang: Locale } }) {
  return <DiagnosticPage lang={params.lang} />;
}
