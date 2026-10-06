import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ScopeFilter() {
  const t = useTranslations('scope');

  return (
    <section className="bg-ink-dark text-paper-light" id="escopo">
      <div className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{t('title')}</h2>
          </ScrollReveal>
          <ScrollReveal delay="short">
            <p className="body-lead border-l border-shock pl-5">{t('description')}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
