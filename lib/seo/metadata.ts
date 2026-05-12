import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const seo = {
  pt: {
    title: 'Paloma Albieri | Presença digital integrada para PME',
    description:
      'Estrategista digital brasileira em Iwata, Shizuoka. Conteúdo, site, automação de lead e tráfego para PME no Brasil e negócios no Japão.',
    ogLocale: 'pt_BR'
  },
  jp: {
    title: 'パロマ・アルビエリ | SNSとサイトを一つの流れに',
    description:
      '静岡県磐田市在住のデジタルストラテジスト。中小企業向けにSNS運用、サイト制作、リード導線、広告運用を提供します。',
    ogLocale: 'ja_JP'
  }
} as const;

export function buildMetadata(lang: Locale, path = ''): Metadata {
  const base = process.env.SITE_URL ?? 'https://palomaalbieri.com';
  const current = seo[lang];
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  const url = `${base}/${lang}${normalizedPath}`;

  return {
    metadataBase: new URL(base),
    title: current.title,
    description: current.description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${base}/pt${normalizedPath}`,
        'ja-JP': `${base}/jp${normalizedPath}`
      }
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url,
      siteName: 'Paloma Albieri',
      locale: current.ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description
    }
  };
}
