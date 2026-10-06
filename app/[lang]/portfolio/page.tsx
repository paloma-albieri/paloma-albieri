import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CTAPill } from '@/components/ui/CTAPill';
import { buildMetadata } from '@/lib/seo/metadata';
import { isLocale, type Locale } from '@/lib/i18n/config';

type EcosystemCase = {
  id: string;
  title: string;
  context: string;
  architecture: string;
  outcome: string;
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'portfolio');
}

export default function PortfolioPage({ params }: { params: { lang: Locale } }) {
  const t = useTranslations('portfolio');
  const cases = t.raw('cases') as EcosystemCase[];

  return (
    <main className="bg-paper-light pt-24">
      <section className="container-shell section-pad">
        <p className="label-mono mb-8 text-secondary">{t('overline')}</p>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h1 className="display-h2 text-ink-dark">{t('title')}</h1>
          </div>
          <div className="lg:pt-20">
            <p className="body-lead text-ink-dark">{t('lead')}</p>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {cases.map((ecosystem, index) => (
            <article
              key={ecosystem.id}
              className="interactive-card border border-line bg-paper-light p-6 text-ink-dark sm:p-8"
            >
              <p className="label-mono mb-8 text-accent">
                {t('case_label')} {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="display-h3">{ecosystem.title}</h2>
              <dl className="mt-6 flex flex-col gap-6">
                {(['context', 'architecture', 'outcome'] as const).map((key) => (
                  <div key={key} className="border-t border-line-soft pt-4">
                    <dt className="label-mono text-[10px] text-ink-dark">{t(`${key}_label`)}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-secondary">{ecosystem[key]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <div className="mt-12 border-t border-line-soft pt-8">
          <CTAPill href={`/${params.lang}/diagnostico`} variant="filled-ink">
            {t('diagnostic_cta')}
          </CTAPill>
        </div>
      </section>
    </main>
  );
}
