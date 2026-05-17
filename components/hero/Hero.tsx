import { getTranslations } from 'next-intl/server';
import { HeroVisual } from '@/components/hero/HeroVisual';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export async function Hero({ lang }: { lang: Locale }) {
  const t = await getTranslations('hero');

  return (
    <section className="min-h-[calc(100vh-72px)] bg-paper-light pt-[120px]" id="top">
      <div className="container-shell pb-20">
        <ScrollReveal>
          <p className="label-mono mb-12 text-ink-3">{t('top_marker')}</p>
        </ScrollReveal>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-16">
          <ScrollReveal delay="short">
            <h1 className="display-h1 max-w-[12ch] text-ink-dark">{t('headline')}</h1>
            <p className="body-lead mt-8 text-ink-dark">{t('subheadline')}</p>
          </ScrollReveal>
          <ScrollReveal delay="medium">
            <HeroVisual meta={t('meta_base')} />
          </ScrollReveal>
        </div>
        <ScrollReveal delay="medium" className="mt-12 flex flex-wrap gap-3">
          <CTAPill href="https://wa.me/817020122563" variant="filled-shock" external>
            {t('cta_primary')}
          </CTAPill>
          <CTAPill href={`/${lang}/servicos`} variant="outline-ink">
            {t('cta_secondary')}
          </CTAPill>
        </ScrollReveal>
        <ScrollReveal delay="long" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-ink-3">
          <span className="label-mono">{t('meta_base')}</span>
          <span className="label-mono">{t('meta_foco')}</span>
          <span className="label-mono">{t('meta_idiomas')}</span>
        </ScrollReveal>
      </div>
      <div className="border-y border-ink-dark py-3">
        <div className="container-shell label-mono text-ink-dark">{t('meta_foco')}</div>
      </div>
    </section>
  );
}
