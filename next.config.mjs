import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': projectRoot
    };
    return config;
  },
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
