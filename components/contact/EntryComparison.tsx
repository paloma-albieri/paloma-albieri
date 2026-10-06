import { useTranslations } from 'next-intl';
import { ArrowUpRight, Clock3, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

export function EntryComparison({ lang }: { lang: Locale }) {
  const t = useTranslations('entry');

  return (
    <div className="entry-comparison grid gap-5 md:grid-cols-2">
      <article className="flex min-w-0 flex-col rounded-sm border border-line border-t-2 border-t-shock bg-paper-2 p-6 text-ink">
        <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-shock">{t('free.badge')}</p>
        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">{t('free.title')}</h3>
        <dl className="mt-6 grid gap-5 text-sm leading-relaxed">
          <div><dt className="label-mono text-[10px] text-ink-3">{t('format_label')}</dt><dd className="mt-2">{t('free.format')}</dd></div>
          <div><dt className="label-mono text-[10px] text-ink-3">{t('objective_label')}</dt><dd className="mt-2">{t('free.objective')}</dd></div>
        </dl>
        <p className="mt-6 flex items-start gap-3 border-t border-line pt-5 text-sm leading-relaxed text-shock">
          <Clock3 size={18} strokeWidth={1} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{t('free.deadline')}</span>
        </p>
        <p className="mt-5 flex items-start gap-3 text-xs italic leading-relaxed text-ink-3">
          <ShieldCheck size={18} strokeWidth={1} className="shrink-0" aria-hidden="true" />
          <span>{t('free.security')}</span>
        </p>
      </article>
      <article className="flex min-w-0 flex-col rounded-sm border border-line bg-paper-2 p-6 text-ink">
        <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-3">{t('discovery.badge')}</p>
        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">{t('discovery.title')}</h3>
        <dl className="mt-6 grid gap-5 text-sm leading-relaxed">
          <div><dt className="label-mono text-[10px] text-ink-3">{t('format_label')}</dt><dd className="mt-2">{t('discovery.format')}</dd></div>
          <div><dt className="label-mono text-[10px] text-ink-3">{t('objective_label')}</dt><dd className="mt-2">{t('discovery.objective')}</dd></div>
          <div><dt className="label-mono text-[10px] text-ink-3">{t('delivery_label')}</dt><dd className="mt-2">{t('discovery.deliverables')}</dd></div>
        </dl>
        <a href={`/${lang}/diagnostico`} className="mt-6 inline-flex items-center justify-between gap-3 border-t border-line pt-5 text-sm text-shock transition-colors hover:text-ink">
          <span>{t('discovery.cta')}</span><ArrowUpRight size={18} strokeWidth={1} className="shrink-0" aria-hidden="true" />
        </a>
      </article>
    </div>
  );
}
