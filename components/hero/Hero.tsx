import { getTranslations } from 'next-intl/server';
import { CTAPill } from '@/components/ui/CTAPill';
import type { Locale } from '@/lib/i18n/config';

export async function Hero({ lang }: { lang: Locale }) {
  const t = await getTranslations('hero');

  return (
    <section className="min-h-[calc(100vh-72px)] bg-paper-light pt-[120px]" id="top">
      <div className="container-shell pb-20">
        <p className="label-mono mb-12 text-ink-3">{t('top_marker')}</p>
        <div className="max-w-[1100px]">
          <h1 className="display-h1 max-w-[12ch] text-ink-dark">{t('headline')}</h1>
          <p className="body-lead mt-8 text-ink-dark">{t('subheadline')}</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <CTAPill href="https://wa.me/817020122563" variant="filled-shock" external>
            {t('cta_primary')}
          </CTAPill>
          <CTAPill href={`/${lang}/pacotes`} variant="outline-ink">
            {t('cta_secondary')}
          </CTAPill>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-ink-3">
          <span className="label-mono">{t('meta_base')}</span>
          <span className="label-mono">{t('meta_foco')}</span>
          <span className="label-mono">{t('meta_idiomas')}</span>
        </div>
      </div>
      <div className="border-y border-ink-dark py-3">
        <div className="container-shell label-mono text-ink-dark">{t('meta_foco')}</div>
      </div>
    </section>
  );
}
