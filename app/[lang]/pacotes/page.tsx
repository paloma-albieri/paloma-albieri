import { redirect } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/config';

export default function LegacyPackagesPage({ params }: { params: { lang: Locale } }) {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  redirect(`/${lang}/servicos`);
}
