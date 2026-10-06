import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { PortfolioMotion } from './PortfolioMotion';

export function PortfolioHero() {
  const t = useTranslations('portfolio');
  return (
    <section className="border-b border-line">
      <div className="container-shell py-16 md:py-20">
        <PortfolioMotion className="max-w-4xl">
          <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-3">{t('overline')}</p>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">{t('title')}</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-3 sm:text-lg">{t('lead')}</p>
          <div className="mt-8 flex items-start gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-shock">
            <ShieldCheck size={18} strokeWidth={1} className="shrink-0" aria-hidden="true" />
            <p><span className="mr-2" aria-hidden="true">●</span>{t('privacy')}</p>
          </div>
        </PortfolioMotion>
      </div>
    </section>
  );
}
