import { useTranslations } from 'next-intl';
import { ContactForm, type ContactTrack } from '@/components/contact/ContactForm';
import { EntryComparison } from '@/components/contact/EntryComparison';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export function TriagePage({ lang, track = 'home' }: { lang: Locale; track?: ContactTrack }) {
  const t = useTranslations('triage');

  return (
    <main className="bg-paper-light pt-32 text-ink-dark lg:pt-28 xl:pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <ScrollReveal>
          <p className="label-mono mb-5 text-accent">{t('badge')}</p>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">{t('description')}</p>
          <CTAPill href="#formulario" variant="filled-ink" className="mt-8">{t('cta')}</CTAPill>
        </ScrollReveal>
        <div className="mt-12"><EntryComparison lang={lang} /></div>
        <section id="formulario" aria-labelledby="triage-form-title" className="mt-12 rounded-sm border border-line bg-paper-light p-6 sm:p-8">
          <h2 id="triage-form-title" className="sr-only">{t('form_title')}</h2>
          <ContactForm track={track} />
        </section>
      </div>
    </main>
  );
}
