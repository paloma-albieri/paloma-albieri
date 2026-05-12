import type { Metadata } from 'next';
import { AboutCard } from '@/components/about/AboutCard';
import { ContactSection } from '@/components/contact/ContactSection';
import { Hero } from '@/components/hero/Hero';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';
import { ServicesMarquee } from '@/components/marquee/ServicesMarquee';
import { PackagesGrid } from '@/components/packages/PackagesGrid';
import { StackSection } from '@/components/stack/StackSection';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang);
}

export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <Hero lang={params.lang} />
      <AboutCard />
      <ServicesMarquee />
      <StackSection />
      <InstagramFeed />
      <PackagesGrid lang={params.lang} variant="home" />
      <ContactSection />
    </main>
  );
}
