import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

export function DiagnosticPage({ lang }: { lang: Locale }) {
  const t = useTranslations('diagnostic');
  const included = t.raw('included') as string[];
  const process = t.raw('process') as { title: string; text: string }[];

  return (
    <main className="pt-32 lg:pt-28 xl:pt-20">
      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <ScrollReveal className="max-w-4xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-shock">{t('badge')}</p>
            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{t('title')}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-3">{t('description')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAPill href="#aplicacao" variant="filled-ink" className="border-shock">{t('cta')}</CTAPill>
              <CTAPill href={`/${lang}/triagem`} variant="outline-inverse">{t('secondary')}</CTAPill>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="bg-paper-2 text-ink">
        <div className="container-shell section-pad">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">{t('included_title')}</h2>
          </ScrollReveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {included.map((item, index) => (
              <li key={item} className="min-w-0">
                <ScrollReveal delay={index % 2 === 0 ? 'short' : 'medium'} className="h-full">
                  <div className="flex h-full items-start gap-4 rounded-sm border border-line p-6">
                    <CheckCircle2 size={24} strokeWidth={1} className="mt-1 shrink-0 text-shock" aria-hidden="true" />
                    <span className="font-serif text-2xl font-semibold leading-snug">{item}</span>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-line pt-6">
            <p className="label-mono text-ink-3">{t('deliverables_title')}</p>
            <p className="mt-4 font-serif text-2xl font-semibold">{t('deliverables')}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {process.map((step, index) => (
              <article key={step.title} className="rounded-sm border border-line p-5">
                <p className="label-mono text-shock">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-sm border border-line bg-paper p-6">
            <p className="label-mono text-shock">{t('price_badge')}</p>
            <p className="mt-4 font-serif text-2xl font-semibold leading-tight">{t('price')}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">{t('price_note')}</p>
          </div>
        </div>
      </section>
      <section className="bg-paper-light text-ink-dark" id="aplicacao">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="label-mono text-accent">{t('application_badge')}</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">{t('application_title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-secondary">{t('application_description')}</p>
          <div className="mt-8 rounded-sm border border-line p-6 sm:p-8">
            <ContactForm track="diagnostico" />
          </div>
        </div>
      </section>
    </main>
  );
}
