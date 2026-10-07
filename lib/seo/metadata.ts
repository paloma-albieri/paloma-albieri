import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const baseSeo = {
  pt: {
    title: 'Paloma Albieri | Presença digital integrada',
    description:
      'Estrategista digital brasileira no Japão. Diagnóstico, sites, automação, IA, sistemas e direção digital para marcas e empresas.',
    ogLocale: 'pt_BR'
  },
  jp: {
    title: 'パロマ・アルビエリ | SNSとサイトを一つの流れに',
    description:
      '日本在住のブラジル人デジタルストラテジスト。診断、Web制作、自動化、AI、システム、デジタルディレクションを整理します。',
    ogLocale: 'ja_JP'
  }
} as const;

const pageSeo = {
  pt: {
    home: baseSeo.pt,
    servicos: {
      title: 'Serviços digitais | Presença e estrutura | Paloma Albieri',
      description:
        'Diagnóstico estratégico, sites e experiências web, automação, IA, sistemas, produtos digitais e direção digital para resolver problemas reais de negócio.',
      ogLocale: baseSeo.pt.ogLocale
    },
    presenca: {
      title: 'Presença digital | Estratégia, conteúdo e conversão | Paloma Albieri',
      description:
        'Presença digital para marcas e empresas que precisam organizar mensagem, experiência web, canais e caminho até o contato.',
      ogLocale: baseSeo.pt.ogLocale
    },
    estrutura: {
      title: 'Estrutura digital | Sites, automação e sistemas | Paloma Albieri',
      description:
        'Estrutura digital para processos que precisam de experiência web, formulários, automação, IA, organização digital ou sistema interno.',
      ogLocale: baseSeo.pt.ogLocale
    },
    diagnostico: {
      title: 'Strategic Discovery & Diagnóstico | Paloma Albieri',
      description:
        'Imersão paga para mapear riscos, arquitetura web, automações, escopo, responsabilidades e critérios antes da execução.',
      ogLocale: baseSeo.pt.ogLocale
    },
    triagem: {
      title: 'Triagem gratuita do seu projeto | Paloma Albieri',
      description:
        'Triagem gratuita para avaliar contexto, urgência e compatibilidade. Formulário inicial e conversa de até 15 minutos, com retorno em até 2 dias úteis.',
      ogLocale: baseSeo.pt.ogLocale
    },
    portfolio: {
      title: 'Documentário & Engenharia de Ecossistemas | Paloma Albieri',
      description:
        'Episódios anonimizados sobre posicionamento, web e automação. Explore a investigação e a arquitetura em quatro atos, com identidades de clientes preservadas.',
      ogLocale: baseSeo.pt.ogLocale
    }
  },
  jp: {
    home: baseSeo.jp,
    servicos: {
      title: 'デジタルサービス | 戦略・コンテンツ・サイト・広告 | パロマ・アルビエリ',
      description:
        'デジタル戦略診断、Web体験、自動化、AI、システム、デジタルディレクションを整理します。',
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
      title: 'Strategic Discovery & 戦略診断 | パロマ・アルビエリ',
      description:
        '実行前に、リスク、Web設計、自動化、対応範囲、責任分担、判断基準を整理する有料の個別診断です。',
      ogLocale: baseSeo.jp.ogLocale
    },
    triagem: {
      title: 'プロジェクトの無料初回相談 | パロマ・アルビエリ',
      description:
        '状況、緊急度、対応の適合性を確認する無料の初回相談。事前フォームと最大15分の相談で、2営業日以内に返信します。',
      ogLocale: baseSeo.jp.ogLocale
    },
    portfolio: {
      title: 'ドキュメンタリー & デジタル基盤設計 | パロマ・アルビエリ',
      description:
        '顧客の識別情報を守りながら、ポジショニング、Web、自動化の調査と設計を4幕の匿名エピソードで紹介します。',
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
