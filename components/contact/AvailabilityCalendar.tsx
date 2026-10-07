import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { appointmentUrl } from '@/lib/site/appointments';

export function AvailabilityCalendar() {
  const t = useTranslations('availability');

  return (
    <section id="agenda" className="rounded-sm border border-line bg-paper-2 p-6 text-ink sm:p-8" aria-labelledby="availability-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="label-mono text-shock">{t('badge')}</p>
          <h2 id="availability-title" className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-3">{t('description')}</p>
        </div>
        <a
          href={appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pill cta-outline-inverse shrink-0"
        >
          <span>{t('open_calendar')}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-8 overflow-hidden rounded-sm border border-line bg-paper-light">
        <iframe
          src={appointmentUrl}
          title={t('iframe_title')}
          className="h-[620px] w-full"
          frameBorder="0"
          loading="lazy"
        />
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink-3">{t('note')}</p>
    </section>
  );
}
