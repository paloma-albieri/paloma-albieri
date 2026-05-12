export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paloma Albieri',
  jobTitle: 'Estrategista digital',
  description:
    'Estrategista digital com mão na execução. Atende PME no Brasil e estabelecimentos no Japão.',
  url: 'https://palomaalbieri.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Iwata',
    addressRegion: 'Shizuoka',
    addressCountry: 'JP'
  },
  sameAs: ['https://instagram.com/paloma.albieri', 'https://www.threads.net/@paloma.albieri'],
  knowsLanguage: ['pt-BR', 'ja-JP']
};
