import { getTranslations } from 'next-intl/server';
import { CTAPill } from '@/components/ui/CTAPill';
import type { Locale } from '@/lib/i18n/config';

export async function Hero({ lang }: { lang: Locale }) {
  const t = await getTranslations('hero');

  return (
    <section className="min-h-[calc(100vh-72px)] bg-paper-light pt-[120px]" id="top">
      <div className="container-shell pb-20">
        <p className="label-mono mb-12 text-ink-3">{t('top_marker')}</p>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-16">
          <div>
            <h1 className="display-h1 max-w-[12ch] text-ink-dark">{t('headline')}</h1>
            <p className="body-lead mt-8 text-ink-dark">{t('subheadline')}</p>
          </div>
          <div className="relative aspect-[4/5] min-h-[360px] overflow-hidden border border-ink-dark bg-paper-rose sm:aspect-[16/10] lg:aspect-[9/12] lg:min-h-0">
            <video
              className="h-full w-full object-cover"
              src="/assets/3D.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Vídeo visual de apresentação da Paloma Albieri"
            />
            <div className="pointer-events-none absolute inset-0 border-[12px] border-paper-light/20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-shock">
              <span className="label-mono text-[10px]">{t('meta_base')}</span>
              <span className="h-2 w-2 rounded-full bg-shock" aria-hidden="true" />
            </div>
          </div>
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
