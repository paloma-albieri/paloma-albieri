import { useLocale, useTranslations } from 'next-intl';
import { Cpu, FileText, Workflow } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AboutCard() {
  const t = useTranslations('about');
  const locale = useLocale();
  const paragraphs = (locale === 'pt' ? ['p1', 'p2'] : ['p1', 'p2', 'p4']) as Array<'p1' | 'p2' | 'p4'>;
  const pillars = t.raw('pillars') as string[];
  const icons = [FileText, Workflow, Cpu];

  return (
    <section className="magazine-about editorial-section bg-paper-light py-12" id="sobre">
      <div className="container-shell">
        <ScrollReveal>
          <article className="interactive-card relative overflow-hidden border border-line bg-paper-rose px-6 py-12 text-ink-dark sm:px-12 lg:px-16 lg:py-16">
            <div className="paper-grain" aria-hidden="true" />
            <p className="editorial-kicker label-mono mb-8 text-ink-dark">{t('overline')}</p>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <h2 className="display-h2">{t('h2')}</h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="label-mono border border-line px-3 py-2 text-[10px]"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex max-w-[58ch] flex-col gap-8 text-base leading-[1.65] sm:text-lg">
                {paragraphs.map((key, index) => {
                  const Icon = icons[index];
                  return (
                    <div key={key} className="about-note grid gap-4 border-l border-line pl-5 sm:grid-cols-[32px_1fr]">
                      <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                      <p>{t(key)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
