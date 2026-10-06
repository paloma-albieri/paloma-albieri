import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function OfficialArchitecture() {
  const t = useTranslations('architecture');
  const pillars = t.raw('pillars') as string[];

  return (
    <section className="border-t border-line bg-paper-light text-ink-dark" id="arquitetura">
      <div className="container-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="display-h2">{t('title')}</h2>
          </ScrollReveal>
          <ScrollReveal delay="short">
            <ol className="m-0 list-none border-t border-line p-0">
              {pillars.map((pillar, index) => (
                <li key={pillar} className="grid grid-cols-[32px_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-6 sm:gap-6">
                  <span className="label-mono text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{pillar}</h3>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
