import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:lang(pt|jp)/pacotes',
        destination: '/:lang/diagnostico',
        statusCode: 301
      }
    ];
  }
};

export default withNextIntl(nextConfig);
