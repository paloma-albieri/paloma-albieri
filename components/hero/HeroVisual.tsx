import { useTranslations } from 'next-intl';

type Specification = { label: string; value: string };

export function HeroVisual() {
  const t = useTranslations('hero');
  const specifications = t.raw('executive_specs') as Specification[];

  return (
    <aside
      className="hero-executive-card relative overflow-hidden rounded-sm border border-line border-t-2 border-t-shock bg-paper-2 p-8 shadow-2xl"
      aria-labelledby="executive-title"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-3">{t('executive_tag')}</p>
      <h2 id="executive-title" className="my-3 font-serif text-2xl font-semibold leading-tight text-ink">
        {t('executive_title')}
      </h2>
      <dl className="mt-8">
        {specifications.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-line py-4">
            <dt className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink-3">{label}</dt>
            <dd className="font-sans text-sm leading-relaxed text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 border-t border-line pt-4 font-sans text-xs italic leading-relaxed text-ink-3">
        {t('executive_symptom')}
      </p>
    </aside>
  );
}
