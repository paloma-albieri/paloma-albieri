import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://palomaalbieri.com';
  const paths = [
    '/pt',
    '/jp',
    '/pt/servicos',
    '/jp/servicos',
    '/pt/presenca',
    '/jp/presenca',
    '/pt/estrutura',
    '/jp/estrutura',
    '/pt/triagem',
    '/jp/triagem',
    '/pt/diagnostico',
    '/jp/diagnostico',
    '/pt/portfolio',
    '/jp/portfolio',
    '/pt/portfolio/paloma-albieri',
    '/jp/portfolio/paloma-albieri'
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
