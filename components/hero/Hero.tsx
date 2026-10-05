import { getTranslations } from 'next-intl/server';
import { ClipboardCheck, Globe2, Route } from 'lucide-react';
import { HeroVisual } from '@/components/hero/HeroVisual';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export async function Hero({ lang }: { lang: Locale }) {
  const t = await getTranslations('hero');
  const signals =
    lang === 'pt'
      ? [
          { icon: Globe2, text: 'Presenca que explica' },
          { icon: Route, text: 'Estrutura que sustenta' },
          { icon: ClipboardCheck, text: 'Triagem como entrada' }
        ]
      : [
          { icon: Globe2, text: '伝わる発信' },
          { icon: Route, text: '支える仕組み' },
          { icon: ClipboardCheck, text: '入口は初回確認' }
        ];

  return (
    <section className="hero-section min-h-[calc(100vh-72px)] overflow-hidden bg-paper-light pt-[108px]" id="top">
      <div className="container-shell pb-20">
        <ScrollReveal>
          <div className="hero-editorial-rule mb-12 text-ink-dark">
            <p className="label-mono">{t('top_marker')}</p>
            <p className="label-mono text-shock">{t('meta_foco')}</p>
          </div>
        </ScrollReveal>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:gap-16">
          <ScrollReveal delay="short">
            <div className="mb-8 inline-flex border border-ink-dark bg-shock px-3 py-2 text-paper-light">
              <span className="label-mono">{lang === 'pt' ? 'PRESENCA + ESTRUTURA' : '発信 + 仕組み'}</span>
            </div>
            <h1 className="display-h1 max-w-[11ch] text-ink-dark">{t('headline')}</h1>
            <p className="body-lead mt-8 text-ink-dark">{t('subheadline')}</p>
            <div className="hero-signal-grid mt-10 bg-paper-light text-ink-dark">
              {signals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                <span key={signal.text}>
                  <strong className="label-mono block text-shock">{String(index + 1).padStart(2, '0')}</strong>
                  <Icon className="mt-4" size={20} strokeWidth={1.6} aria-hidden="true" />
                  <span className="mt-3 block text-sm leading-tight">{signal.text}</span>
                </span>
                );
              })}
            </div>
          </ScrollReveal>
          <ScrollReveal delay="medium">
            <HeroVisual meta={t('meta_base')} />
          </ScrollReveal>
        </div>
        <ScrollReveal delay="medium" className="mt-12 flex flex-wrap gap-3">
          <CTAPill href={`/${lang}/triagem`} variant="filled-shock">
            {t('cta_primary')}
          </CTAPill>
          <CTAPill href={`/${lang}/diagnostico`} variant="outline-ink">
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
