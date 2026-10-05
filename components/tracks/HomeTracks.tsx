import { BadgeCheck, PanelsTopLeft } from 'lucide-react';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';
import { tracks } from '@/lib/site/tracks';

export function HomeTracks({ lang }: { lang: Locale }) {
  const items = Object.values(tracks[lang]);

  return (
    <section className="editorial-section editorial-section-tracks bg-paper-light" id="trilhas">
      <div className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <p className="editorial-kicker label-mono mb-8 text-ink-dark">{lang === 'pt' ? 'DUAS TRILHAS' : '2つの導線'}</p>
            <h2 className="display-h2 text-ink-dark">
              {lang === 'pt' ? 'Escolha pelo sintoma, nao pelo nome do servico.' : 'サービス名ではなく、今の課題から選びます。'}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay="short" className="lg:pt-20">
            <p className="body-lead text-ink-dark">
              {lang === 'pt'
                ? 'Presenca resolve clareza, conteudo e conversao. Estrutura resolve processo, site, automacao e sistema. As duas podem se encontrar, mas a entrada precisa ser simples.'
                : '発信は伝え方、コンテンツ、問い合わせ導線を整えます。仕組みはサイト、フォーム、自動化、社内の流れを整えます。'}
            </p>
          </ScrollReveal>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {items.map((track, index) => (
            <ScrollReveal key={track.key} delay={index === 0 ? 'short' : 'medium'}>
              <article
                className="magazine-card collage-panel interactive-card flex h-full flex-col border border-ink-dark bg-paper-light p-6 text-ink-dark sm:p-8"
                data-issue={track.key === 'presenca' ? 'campo 01' : 'campo 02'}
              >
                <div
                  className="magazine-card-tape mb-8 flex h-11 w-fit items-center gap-2 border border-ink-dark px-3"
                  style={{ background: track.key === 'presenca' ? 'var(--shock)' : 'var(--olive)', color: 'var(--paper-light)' }}
                >
                  {track.key === 'presenca' ? (
                    <BadgeCheck size={18} strokeWidth={1.6} aria-hidden="true" />
                  ) : (
                    <PanelsTopLeft size={18} strokeWidth={1.6} aria-hidden="true" />
                  )}
                  <span className="label-mono text-[10px]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="label-mono text-ink-3">{track.label}</p>
                <h3 className="mt-6 font-display text-[clamp(36px,5vw,68px)] font-light leading-none">
                  {track.homeTitle}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-ink-dark">{track.symptom}</p>
                <p className="mt-5 border-t border-[oklch(.17_.02_42_/_0.18)] pt-5 text-sm leading-relaxed text-ink-3">
                  {track.summary}
                </p>
                <div className="mt-8">
                  <CTAPill href={`/${lang}/${track.key}`} variant={index === 0 ? 'filled-shock' : 'outline-ink'}>
                    {track.cta}
                  </CTAPill>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
