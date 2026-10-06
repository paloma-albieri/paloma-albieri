import { useTranslations } from 'next-intl';
import { ArrowLeftRight, ArrowRight, Boxes, Compass, Crown, Layout, Workflow } from 'lucide-react';
import { clsx } from 'clsx';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Pillar = {
  id: 'strategy' | 'web' | 'processes' | 'products' | 'direction';
  tag: string;
  title: string;
  highlight: string;
  concept: string;
  flow: string[];
  deliverables: string[];
};

const icons = {
  strategy: Compass,
  web: Layout,
  processes: Workflow,
  products: Boxes,
  direction: Crown
};

export function OfficialArchitecture() {
  const t = useTranslations('architecture');
  const pillars = t.raw('pillars') as Pillar[];

  return (
    <section className="blueprint-section relative isolate border-y border-line bg-paper-2 text-ink" id="arquitetura">
      <div className="container-shell section-pad relative z-10">
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase leading-relaxed tracking-widest text-shock">
            {t('overline')}
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-ink-3">{t('description')}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const featured = pillar.id === 'direction';
            const Icon = icons[pillar.id];
            const FlowArrow = featured ? ArrowLeftRight : ArrowRight;
            const highlightIndex = pillar.title.indexOf(pillar.highlight);

            return (
              <ScrollReveal key={pillar.id} delay={index % 2 === 0 ? 'short' : 'medium'}
                className={clsx('h-full', featured && 'md:col-span-2')}>
                <article
                  aria-labelledby={`pillar-${pillar.id}`}
                  className={clsx(
                    'group flex h-full min-w-0 flex-col rounded-sm border border-line p-5 transition-[border-color,transform] duration-300 ease-out hover:border-shock/60 motion-safe:hover:-translate-y-0.5 sm:p-8',
                    featured
                      ? 'border-l-4 border-l-shock bg-paper hover:border-l-shock'
                      : 'border-t-2 border-t-shock/70 bg-paper-2'
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="border border-dashed border-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                      [ BLUEPRINT {String(index + 1).padStart(2, '0')} ]
                    </span>
                    <Icon size={28} strokeWidth={1} className="shrink-0 text-shock" aria-hidden="true" />
                  </div>
                  <div className={clsx('mt-7', featured && 'lg:grid lg:grid-cols-2 lg:gap-10')}>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink-3">
                        {pillar.tag}
                      </p>
                      <h3 id={`pillar-${pillar.id}`} className="mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                        {highlightIndex < 0 ? pillar.title : (
                          <>
                            {pillar.title.slice(0, highlightIndex)}
                            <span className="underline decoration-shock/40 decoration-[5px] underline-offset-4 [text-decoration-skip-ink:none]">
                              {pillar.highlight}
                            </span>
                            {pillar.title.slice(highlightIndex + pillar.highlight.length)}
                          </>
                        )}
                      </h3>
                      <p className="mt-4 font-sans text-base leading-relaxed text-ink-3">{pillar.concept}</p>
                      <div role="group" aria-label={t('flow_label')}
                        className="mt-7 grid grid-cols-1 items-center gap-2 lg:grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)_16px_minmax(0,1fr)]">
                        {pillar.flow.map((step, stepIndex) => (
                          <div key={step} className="contents">
                            <span className="flex min-h-[56px] min-w-0 items-center justify-center border border-dashed border-line px-2 py-3 text-center font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink">
                              {step}
                            </span>
                            {stepIndex < pillar.flow.length - 1 && (
                              <FlowArrow size={16} strokeWidth={1} className="justify-self-center rotate-90 text-ink-3 lg:rotate-0" aria-hidden="true" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={clsx('min-w-0 border-t border-line pt-6', featured ? 'mt-7 lg:mt-0' : 'mt-7')}>
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                        {t('deliverables_label')}
                      </p>
                      <ul className="grid gap-3">
                        {pillar.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-ink">
                            <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-shock" aria-hidden="true" />
                            <span className="min-w-0">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
