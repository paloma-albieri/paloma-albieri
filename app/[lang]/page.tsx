import type { Metadata } from 'next';
import { AboutCard } from '@/components/about/AboutCard';
import { ContactSection } from '@/components/contact/ContactSection';
import { Hero } from '@/components/hero/Hero';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';
import { OfficialArchitecture } from '@/components/services/OfficialArchitecture';
import { ScopeFilter } from '@/components/services/ScopeFilter';
import { HomeTracks } from '@/components/tracks/HomeTracks';
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
      <HomeTracks lang={params.lang} />
      {params.lang === 'pt' && <OfficialArchitecture />}
      <ScopeFilter />
      <AboutCard />
      <InstagramFeed />
      <ContactSection track="home" />
    </main>
  );
}
