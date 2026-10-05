import type { Locale } from '@/lib/i18n/config';

const baseUrl = 'https://palomaalbieri.com';

const services = [
  'Triagem digital',
  'Diagnostico Estrategico Digital',
  'Presenca, mensagem e conversao',
  'Processos, automacao e IA',
  'Sistema ou produto digital',
  'Direcao e evolucao'
];

const localized = {
  pt: {
    language: 'pt-BR',
    description:
      'Estrategista digital brasileira no Japao. Organiza presenca digital e estrutura digital para marcas e empresas.',
    serviceDescription:
      'Triagem publica e diagnostico estrategico para identificar prioridade antes de executar presenca digital, processos, sites, automacoes ou sistemas.'
  },
  jp: {
    language: 'ja-JP',
    description:
      '日本在住のブラジル人デジタルストラテジスト。戦略、コンテンツ、Webサイト、自動化、広告運用を整理します。',
    serviceDescription:
      '初回チェックとデジタル戦略診断で、発信、業務、サイト、自動化、システムの優先順位を整理します。'
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
          'sistemas internos',
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
          'Diagnostico digital',
          'Triagem digital',
          'Presenca digital',
          'Desenvolvimento de sites',
          'Sistemas internos',
          'Automacao digital'
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
