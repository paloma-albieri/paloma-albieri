import { useTranslations } from 'next-intl';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

type Service = {
  name: string;
  promise: string;
  description: string;
  items: string[];
  example: string;
  fit: string;
};

type ServiceLayer = {
  label: string;
  title: string;
  summary: string;
  services: Service[];
};

function ServiceCard({ service, compact }: { service: Service; compact: boolean }) {
  const t = useTranslations('packages');

  return (
    <article className="service-card interactive-card group flex h-full flex-col border border-line bg-paper-light p-6 text-ink-dark transition-colors hover:border-shock sm:p-7">
      <h4 className="font-display text-3xl font-semibold leading-none">{service.name}</h4>
      <p className="mt-5 text-base leading-relaxed">{service.promise}</p>
      {!compact && (
        <>
          <p className="mt-5 border-t border-line-soft pt-5 text-sm leading-relaxed">
            {service.description}
          </p>
          <div className="mt-6">
            <p className="label-mono mb-3 text-secondary">{t('includes_label')}</p>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed">
              {service.items.map((item) => (
                <li key={item} className="border-t border-line-soft pt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-secondary">
            <span className="label-mono text-ink-dark">{t('example_label')}</span> {service.example}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            <span className="label-mono text-ink-dark">{t('fit_label')}</span> {service.fit}
          </p>
        </>
      )}
    </article>
  );
}

export function PackagesGrid({
  lang,
  variant = 'page'
}: {
  lang: Locale;
  variant?: 'home' | 'page';
}) {
  const t = useTranslations('packages');
  const layers = t.raw('layers') as ServiceLayer[];
  const compact = variant === 'home';

  return (
    <section className="editorial-section editorial-section-services bg-paper-light" id="servicos">
      <div className="container-shell section-pad">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <ScrollReveal>
            <p className="editorial-kicker label-mono mb-8 text-ink-dark">{t('overline')}</p>
            <h2 className="display-h2 text-ink-dark">
              {variant === 'page' ? t('page_title') : t('title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay="short" className="lg:pt-20">
            <p className="body-lead text-ink-dark">
              {variant === 'page' ? t('page_lead') : t('lead')}
            </p>
            {variant === 'home' && (
              <CTAPill href={`/${lang}/servicos`} className="mt-8">
                {t('diagnostic')}
              </CTAPill>
            )}
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-14">
          {layers.map((layer, layerIndex) => (
            <div key={layer.label} className="service-layer-collage border-t border-line pt-8">
              <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-10">
                <ScrollReveal delay={layerIndex === 0 ? 'short' : 'medium'}>
                  <p className="label-mono text-accent">{layer.label}</p>
                  <h3 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-semibold leading-none text-ink-dark">
                    {layer.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ink-dark">{layer.summary}</p>
                </ScrollReveal>

                <div className="grid gap-4 md:grid-cols-2">
                  {layer.services.map((service) => (
                    <ScrollReveal key={service.name} delay="short">
                      <ServiceCard service={service} compact={compact} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal className="mt-14 border-t border-line pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="body-lead max-w-3xl text-ink-dark">{t('closing')}</p>
            <CTAPill href="https://wa.me/817020122563" variant="filled-shock" external>
              {t('cta')}
            </CTAPill>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
