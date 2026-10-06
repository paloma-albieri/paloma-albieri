import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CTAPill } from '@/components/ui/CTAPill';
import { EpisodesExplorer } from '@/components/portfolio/EpisodesExplorer';
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioMotion, PortfolioMotionProvider } from '@/components/portfolio/PortfolioMotion';
import type { PortfolioEpisode } from '@/components/portfolio/types';
import { buildMetadata } from '@/lib/seo/metadata';
import { isLocale, type Locale } from '@/lib/i18n/config';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'portfolio');
}

export default function PortfolioPage({ params }: { params: { lang: Locale } }) {
  const t = useTranslations('portfolio');
  const episodes = t.raw('episodes') as PortfolioEpisode[];

  return (
    <PortfolioMotionProvider>
      <main className="bg-paper pt-32 text-ink lg:pt-28 xl:pt-20">
        <PortfolioHero />
        <EpisodesExplorer episodes={episodes} />
        <section className="border-t border-line bg-paper-2">
          <div className="container-shell py-16 md:py-20">
            <PortfolioMotion>
              <h2 className="max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-4xl">{t('closing_title')}</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAPill href={`/${params.lang}/triagem`} variant="filled-shock" className="border-shock bg-shock text-paper">{t('closing_primary')}</CTAPill>
                <CTAPill href={`/${params.lang}/diagnostico`} variant="outline-inverse">{t('closing_secondary')}</CTAPill>
              </div>
            </PortfolioMotion>
          </div>
        </section>
      </main>
    </PortfolioMotionProvider>
  );
}
