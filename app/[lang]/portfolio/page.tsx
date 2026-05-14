import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { buildMetadata } from '@/lib/seo/metadata';
import { isLocale, type Locale } from '@/lib/i18n/config';

const projects = [
  ['paloma-albieri', 'paloma_title', 'paloma_copy'],
  ['miaucafe', 'miaucafe_title', 'miaucafe_copy'],
  ['construtora-connect', 'connect_title', 'connect_copy']
] as const;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'portfolio');
}

export default function PortfolioPage({ params }: { params: { lang: Locale } }) {
  const t = useTranslations('portfolio');

  return (
    <main className="bg-paper-light pt-24">
      <section className="container-shell section-pad">
        <p className="label-mono mb-8 text-ink-3">{t('overline')}</p>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h1 className="display-h2 text-ink-dark">{t('title')}</h1>
          </div>
          <div className="lg:pt-20">
            <p className="body-lead text-ink-dark">{t('lead')}</p>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {projects.map(([slug, titleKey, copyKey]) => (
            <a
              key={slug}
              href={`/${params.lang}/portfolio/${slug}`}
              className="interactive-card group border border-ink-dark bg-paper-light p-6 text-ink-dark sm:p-8"
            >
              <p className="label-mono mb-8 text-shock">{t('project_label')}</p>
              <h2 className="display-h3">{t(titleKey)}</h2>
              <p className="mt-6 text-sm leading-relaxed text-ink-3">{t(copyKey)}</p>
              <span className="label-mono mt-10 inline-flex text-[10px] transition-colors group-hover:text-shock">
                {t('project_cta')} ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
