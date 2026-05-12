import { useTranslations } from 'next-intl';

export function AboutCard() {
  const t = useTranslations('about');
  const paragraphs = ['p1', 'p2', 'p3', 'p4'] as const;

  return (
    <section className="bg-paper-light py-12" id="sobre">
      <div className="container-shell">
        <article className="bg-paper-rose px-6 py-12 text-ink-dark sm:px-12 lg:px-16 lg:py-16">
          <p className="label-mono mb-8 text-ink-dark">{t('overline')}</p>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h2 className="display-h2">{t('h2')}</h2>
            <div className="flex max-w-[56ch] flex-col gap-8 text-base leading-[1.65] sm:text-lg">
              {paragraphs.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
