import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { HeroVisual } from '@/components/hero/HeroVisual';
import { ServicesMarquee } from '@/components/marquee/ServicesMarquee';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export async function Hero({ lang }: { lang: Locale }) {
  const t = await getTranslations('hero');

  return (
    <>
      <section className="hero-section bg-paper pt-32 text-ink lg:pt-28 xl:pt-20" id="top">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 border-b border-line px-6 py-16 md:py-24 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <span className="mb-4 block font-mono text-xs font-medium uppercase tracking-widest text-shock">
              {t('top_marker')}
            </span>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              {t('headline')}
            </h1>
            <p className="mb-8 max-w-xl font-sans text-base leading-relaxed text-ink-3 sm:text-lg">
              {t('subheadline')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`/${lang}/triagem`} className="btn-runway">
                <span>{t('cta_primary')}</span>
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href={`/${lang}/diagnostico`}
                className="inline-flex max-w-full items-center gap-4 rounded-sm border border-line px-6 py-4 font-sans text-sm font-medium text-ink transition-colors duration-300 hover:border-shock hover:text-shock"
              >
                <span className="min-w-0">{t('cta_secondary')}</span>
                <ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay="short" className="lg:col-span-5">
            <HeroVisual />
          </ScrollReveal>
        </div>
      </section>
      <ServicesMarquee />
    </>
  );
}
