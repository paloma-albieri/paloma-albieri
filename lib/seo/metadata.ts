import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const baseSeo = {
  pt: {
    title: 'Paloma Albieri | Presença digital integrada',
    description:
      'Estrategista digital brasileira no Japão. Estratégia, conteúdo, sites, automação e tráfego para marcas e empresas.',
    ogLocale: 'pt_BR'
  },
  jp: {
    title: 'パロマ・アルビエリ | SNSとサイトを一つの流れに',
    description:
      '日本在住のブラジル人デジタルストラテジスト。ブランドや企業向けにSNS運用、サイト制作、問い合わせ導線、広告運用を整理します。',
    ogLocale: 'ja_JP'
  }
} as const;

const pageSeo = {
  pt: {
    home: baseSeo.pt,
    servicos: {
      title: 'Serviços digitais | Estratégia, conteúdo, sites e tráfego | Paloma Albieri',
      description:
        'Serviços para planejar, criar e melhorar presença digital: diagnóstico, estratégia, conteúdo, landing page, site institucional, automação, tráfego pago e acompanhamento.',
      ogLocale: baseSeo.pt.ogLocale
    },
    portfolio: {
      title: 'Portfólio | Presença digital, sites e conteúdo | Paloma Albieri',
      description:
        'Projetos de presença digital, sites, conteúdo e comunicação criados por Paloma Albieri para marcas e empresas.',
      ogLocale: baseSeo.pt.ogLocale
    }
  },
  jp: {
    home: baseSeo.jp,
    servicos: {
      title: 'デジタルサービス | 戦略・コンテンツ・サイト・広告 | パロマ・アルビエリ',
      description:
        '診断、デジタル戦略、コンテンツ制作、ランディングページ、企業サイト、自動化、広告運用、改善伴走まで整理します。',
      ogLocale: baseSeo.jp.ogLocale
    },
    portfolio: {
      title: 'ポートフォリオ | SNS・サイト・デジタル設計 | パロマ・アルビエリ',
      description:
        'パロマ・アルビエリによるデジタルプレゼンス、サイト、コンテンツ、コミュニケーション設計の制作事例です。',
      ogLocale: baseSeo.jp.ogLocale
    }
  }
} as const;

export function buildMetadata(lang: Locale, path = ''): Metadata {
  const base = process.env.SITE_URL ?? 'https://palomaalbieri.com';
  const pageKey = path.replace(/^\/+/, '').split('/')[0] || 'home';
  const current =
    pageKey === 'servicos' || pageKey === 'portfolio'
      ? pageSeo[lang][pageKey]
      : pageSeo[lang].home;
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  const url = `${base}/${lang}${normalizedPath}`;

  return {
    metadataBase: new URL(base),
    title: current.title,
    description: current.description,
    applicationName: 'Paloma Albieri',
    authors: [{ name: 'Paloma Albieri', url: base }],
    creator: 'Paloma Albieri',
    publisher: 'Paloma Albieri',
    category: 'digital strategy',
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg'
    },
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${base}/pt${normalizedPath}`,
        'ja-JP': `${base}/jp${normalizedPath}`,
        'x-default': `${base}/pt${normalizedPath}`
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url,
      siteName: 'Paloma Albieri',
      locale: current.ogLocale,
      alternateLocale: lang === 'pt' ? 'ja_JP' : 'pt_BR',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description
    }
  };
}
