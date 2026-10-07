import { useTranslations } from 'next-intl';
import { ContactForm, type ContactTrack } from '@/components/contact/ContactForm';
import { AvailabilityCalendar } from '@/components/contact/AvailabilityCalendar';
import { EntryComparison } from '@/components/contact/EntryComparison';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export function TriagePage({ lang, track = 'home' }: { lang: Locale; track?: ContactTrack }) {
  const t = useTranslations('triage');
  const steps = t.raw('steps') as { title: string; text: string }[];

  return (
    <main className="bg-paper-light pt-32 text-ink-dark lg:pt-28 xl:pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <ScrollReveal>
          <p className="label-mono mb-5 text-accent">{t('badge')}</p>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">{t('description')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAPill href="#formulario" variant="filled-ink">{t('cta')}</CTAPill>
            <CTAPill href="#agenda" variant="outline-ink">{t('calendar_cta')}</CTAPill>
          </div>
        </ScrollReveal>
        <div className="mt-12"><EntryComparison lang={lang} /></div>
        <section aria-labelledby="triage-flow-title" className="mt-12 border-y border-line py-10">
          <p className="label-mono text-accent">{t('flow_badge')}</p>
          <h2 id="triage-flow-title" className="mt-4 font-serif text-3xl font-semibold leading-tight">{t('flow_title')}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="min-w-0 rounded-sm border border-line bg-paper-light p-5">
                <p className="label-mono text-accent">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{step.text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-12">
          <AvailabilityCalendar />
        </div>
        <section id="formulario" aria-labelledby="triage-form-title" className="mt-12 rounded-sm border border-line bg-paper-light p-6 sm:p-8">
          <h2 id="triage-form-title" className="sr-only">{t('form_title')}</h2>
          <ContactForm track={track} />
        </section>
      </div>
    </main>
  );
}
