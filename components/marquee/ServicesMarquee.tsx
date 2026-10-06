import { useTranslations } from 'next-intl';

export function ServicesMarquee() {
  const t = useTranslations('services_marquee');
  const ticker = t('ticker');

  return (
    <section className="runway-ticker overflow-hidden border-y border-line bg-paper py-3" aria-label={ticker}>
      <div className="runway-ticker-track whitespace-nowrap font-mono text-xs uppercase tracking-widest text-ink-3" aria-hidden="true">
        {[0, 1].map((group) => (
          <span key={group} className="inline-flex min-w-[100vw] gap-12">
            <span>{ticker}</span>
            <span>{ticker}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
