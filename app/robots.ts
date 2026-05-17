import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'Bingbot', 'Googlebot'],
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: 'https://palomaalbieri.com/sitemap.xml'
  };
}
