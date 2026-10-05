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
      title: 'Serviços digitais | Presença e estrutura | Paloma Albieri',
      description:
        'Escolha entre presença digital e estrutura digital: estratégia, conteúdo, sites, automação, sistemas simples, tráfego e acompanhamento.',
      ogLocale: baseSeo.pt.ogLocale
    },
    presenca: {
      title: 'Presença digital | Estratégia, conteúdo e conversão | Paloma Albieri',
      description:
        'Presença digital para marcas e empresas que precisam organizar mensagem, conteúdo, Instagram, tráfego e caminho até o contato.',
      ogLocale: baseSeo.pt.ogLocale
    },
    estrutura: {
      title: 'Estrutura digital | Sites, automação e sistemas | Paloma Albieri',
      description:
        'Estrutura digital para processos que precisam de site, landing page, formulário, automação, organização digital ou sistema interno.',
      ogLocale: baseSeo.pt.ogLocale
    },
    diagnostico: {
      title: 'Diagnóstico Estratégico Digital | Paloma Albieri',
      description:
        'Diagnóstico pago para mapear gargalo, prioridade, risco, escopo e próximos passos antes de executar presença, processo, site ou sistema.',
      ogLocale: baseSeo.pt.ogLocale
    },
    triagem: {
      title: 'Triagem digital | Descobrir meu gargalo | Paloma Albieri',
      description:
        'Formulário público para identificar onde o digital está travando antes de escolher serviço, agenda ou diagnóstico pago.',
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
        '発信の導線と仕組みの設計。戦略、コンテンツ、サイト、フォーム、自動化、広告運用を整理します。',
      ogLocale: baseSeo.jp.ogLocale
    },
    presenca: {
      title: '発信の導線 | 戦略・コンテンツ・問い合わせ | パロマ・アルビエリ',
      description:
        'Instagram、コンテンツ、メッセージ、問い合わせまでの流れを整理するデジタル発信サポートです。',
      ogLocale: baseSeo.jp.ogLocale
    },
    estrutura: {
      title: '仕組みの設計 | サイト・フォーム・自動化 | パロマ・アルビエリ',
      description:
        'サイト、ランディングページ、フォーム、自動化、社内システムなど、事業の流れを整理するデジタル構築です。',
      ogLocale: baseSeo.jp.ogLocale
    },
    diagnostico: {
      title: 'デジタル戦略診断 | パロマ・アルビエリ',
      description:
        '制作前に課題、優先順位、リスク、必要な範囲を整理する有料のデジタル戦略診断です。',
      ogLocale: baseSeo.jp.ogLocale
    },
    triagem: {
      title: '初回チェック | 課題を見つける | パロマ・アルビエリ',
      description:
        'サービスを選ぶ前に、オンライン導線のどこで止まっているかを確認する公開フォームです。',
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
    pageKey === 'servicos' ||
    pageKey === 'presenca' ||
    pageKey === 'estrutura' ||
    pageKey === 'diagnostico' ||
    pageKey === 'triagem' ||
    pageKey === 'portfolio'
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
