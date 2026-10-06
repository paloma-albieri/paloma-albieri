import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Exclusion = {
  id: string;
  title: string;
  description: string;
};

export function ScopeFilter() {
  const t = useTranslations('scope');
  const exclusions = t.raw('exclusions') as Exclusion[];

  return (
    <section className="flow-root bg-paper-light" id="escopo" aria-labelledby="scope-title">
      <div className="container-shell">
        <ScrollReveal className="my-16">
          <div className="relative overflow-hidden rounded-sm border border-line border-l-4 border-l-shock bg-paper p-8 text-ink md:p-12">
            <div className="mb-8 flex justify-end">
              <p className="max-w-full text-right font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink-3">
                {t('stamp')}
              </p>
            </div>
            <p className="font-mono text-xs font-semibold uppercase leading-relaxed tracking-widest text-shock">
              {t('tag')}
            </p>
            <h2 id="scope-title" className="mb-4 mt-2 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
              {t('title')}
            </h2>
            <p className="max-w-3xl font-sans text-base leading-relaxed text-ink-3">{t('description')}</p>
            <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12">
              {exclusions.map((exclusion) => (
                <li key={exclusion.id} className="flex min-w-0 items-start gap-3 border-t border-line pt-5">
                  <X size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-shock" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="font-sans text-base font-semibold leading-snug text-ink">{exclusion.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-3">{exclusion.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-6">
              <h3 className="font-sans text-sm font-semibold text-ink">{t('manifesto_title')}</h3>
              <blockquote className="mt-3 max-w-5xl font-sans text-base italic leading-relaxed text-ink-3">
                <p>{t('manifesto')}</p>
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
