import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

const packageKeys = ['micro', 'starter', 'growth', 'full'] as const;
type PackageKey = (typeof packageKeys)[number];

function PackageCard({ packageKey, compact = false }: { packageKey: PackageKey; compact?: boolean }) {
  const t = useTranslations('packages');
  const includes = t.raw(`${packageKey}.includes`) as string[];
  const isRecommended = packageKey === 'growth';
  const badge = isRecommended ? t(`${packageKey}.badge`) : null;

  return (
    <article
      className={clsx(
        'interactive-card group flex h-full flex-col border bg-paper-light p-6 text-ink-dark sm:p-8',
        isRecommended ? 'border-2 border-shock bg-paper-rose' : 'border-ink-dark hover:border-shock'
      )}
    >
      {badge && <p className="label-mono mb-6 text-shock">{badge}</p>}
      <h3 className="display-h3">{t(`${packageKey}.name`)}</h3>
      <p className="mt-6 text-base leading-relaxed">{t(`${packageKey}.fit`)}</p>
      <p className="mt-5 border-t border-ink-dark pt-5 text-sm leading-relaxed text-ink-dark">
        {t(`${packageKey}.outcome`)}
      </p>
      {!compact && (
        <ul className="mt-8 flex flex-col gap-3 text-sm leading-relaxed">
          {includes.map((item) => (
            <li key={item} className="border-t border-[oklch(.14_.01_270_/_0.18)] pt-3 transition-colors group-hover:border-[oklch(.68_.24_8_/_0.42)]">
              {item}
            </li>
          ))}
        </ul>
      )}
      <CTAPill
        href="https://wa.me/817020122563"
        variant={isRecommended ? 'filled-ink' : 'outline-ink'}
        external
        className="mt-8 self-start"
      >
        {t('cta')}
      </CTAPill>
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
  const compact = variant === 'home';

  return (
    <section className="bg-paper-light" id="pacotes">
      <div className="container-shell section-pad">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <p className="label-mono mb-8 text-ink-3">{t('overline')}</p>
            <h2 className="display-h2 text-ink-dark">
              {variant === 'page' ? t('page_title') : t('title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay="short" className="lg:pt-20">
            <p className="body-lead text-ink-dark">
              {variant === 'page' ? t('page_lead') : t('lead')}
            </p>
            {variant === 'home' && (
              <CTAPill href={`/${lang}/pacotes`} className="mt-8">
                {t('diagnostic')}
              </CTAPill>
            )}
          </ScrollReveal>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packageKeys.map((key, index) => (
            <ScrollReveal key={key} delay={index > 1 ? 'medium' : 'short'}>
              <PackageCard packageKey={key} compact={compact} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
