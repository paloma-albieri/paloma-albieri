import type { Locale } from '@/lib/i18n/config';

const baseUrl = 'https://palomaalbieri.com';

const services = [
  'Triagem digital',
  'Diagnostico Estrategico Digital',
  'Sites e Experiencias Web',
  'Automacao, IA e Processos',
  'Sistemas e Produtos Digitais',
  'Direcao Digital'
];

const localized = {
  pt: {
    language: 'pt-BR',
    description:
      'Estrategista digital brasileira no Japao. Diagnostica, estrutura e constroi solucoes digitais para melhorar presenca, processos e operacao.',
    serviceDescription:
      'Diagnostico estrategico, sites e experiencias web, automacao, IA, sistemas, produtos digitais e direcao digital para resolver problemas reais de negocio.'
  },
  jp: {
    language: 'ja-JP',
    description:
      '日本在住のブラジル人デジタルストラテジスト。診断、Web体験、自動化、AI、システム、デジタルディレクションを整理します。',
    serviceDescription:
      'デジタル戦略診断、Web体験、自動化、AI、システム、デジタルディレクションで事業課題を整理します。'
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
          'landing pages',
          'sites institucionais',
          'sistemas internos',
          'automacao digital',
          'inteligencia artificial aplicada a processos',
          'direcao digital',
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
          'Sites e experiencias web',
          'Automacao e IA',
          'Sistemas e produtos digitais',
          'Direcao digital'
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
