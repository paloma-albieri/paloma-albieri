import type { Locale } from '@/lib/i18n/config';

const baseUrl = 'https://palomaalbieri.com';

const services = [
  'Diagnostico Digital',
  'Estrategia de Presenca Digital',
  'Gestao de Conteudo',
  'Landing Page',
  'Site Institucional',
  'Automacao e Organizacao Digital',
  'Gestao de Trafego Pago',
  'Acompanhamento Estrategico'
];

const localized = {
  pt: {
    language: 'pt-BR',
    description:
      'Estrategista digital brasileira no Japao. Une estrategia, conteudo, sites, automacao e trafego para organizar presenca digital de marcas e empresas.',
    serviceDescription:
      'Servicos digitais para planejar, criar e melhorar presenca digital: diagnostico, estrategia, conteudo, landing page, site institucional, automacao, trafego pago e acompanhamento.'
  },
  jp: {
    language: 'ja-JP',
    description:
      '日本在住のブラジル人デジタルストラテジスト。戦略、コンテンツ、Webサイト、自動化、広告運用を整理します。',
    serviceDescription:
      '診断、デジタル戦略、コンテンツ制作、ランディングページ、企業サイト、自動化、広告運用、改善伴走を行います。'
  }
} as const;

export function buildJsonLd(lang: Locale) {
  const copy = localized[lang];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'Paloma Albieri',
        url: baseUrl,
        inLanguage: copy.language,
        publisher: {
          '@id': `${baseUrl}/#person`
        }
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Paloma Albieri',
        jobTitle: 'Estrategista digital',
        description: copy.description,
        url: baseUrl,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'JP'
        },
        sameAs: [
          'https://instagram.com/paloma.albieri',
          'https://www.threads.net/@paloma.albieri'
        ],
        knowsLanguage: ['pt-BR', 'ja-JP'],
        knowsAbout: [
          'estrategia digital',
          'presenca digital',
          'marketing digital',
          'conteudo para redes sociais',
          'landing pages',
          'sites institucionais',
          'automacao digital',
          'trafego pago',
          'Next.js',
          'React',
          'Supabase',
          'PostgreSQL'
        ]
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${baseUrl}/#service`,
        name: 'Paloma Albieri',
        url: `${baseUrl}/${lang}/servicos`,
        description: copy.serviceDescription,
        provider: {
          '@id': `${baseUrl}/#person`
        },
        availableLanguage: ['pt-BR', 'ja-JP'],
        serviceType: [
          'Estrategia digital',
          'Marketing digital',
          'Criacao de conteudo',
          'Desenvolvimento de sites',
          'Automacao digital',
          'Trafego pago'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicos digitais',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
              provider: {
                '@id': `${baseUrl}/#person`
              }
            }
          }))
        }
      }
    ]
  };
}
