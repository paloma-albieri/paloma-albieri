import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net'
      }
    ],
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
