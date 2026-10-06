import { ContactSection } from '@/components/contact/ContactSection';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';
import { diagnostics } from '@/lib/site/tracks';

export function DiagnosticPage({ lang }: { lang: Locale }) {
  const diagnostic = diagnostics[lang];

  return (
    <main className="pt-20">
      <section className="bg-paper-light">
        <div className="container-shell section-pad">
          <ScrollReveal>
            <p className="label-mono mb-8 text-accent">{diagnostic.eyebrow}</p>
            <h1 className="display-h1 max-w-[13ch] text-ink-dark">{diagnostic.title}</h1>
            <p className="body-lead mt-8 text-ink-dark">{diagnostic.lead}</p>
            <CTAPill href={`/${lang}/triagem`} className="mt-10" variant="filled-shock">
              {diagnostic.cta}
            </CTAPill>
          </ScrollReveal>
        </div>
      </section>
      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <div className="grid gap-5 md:grid-cols-3">
            {diagnostic.details.map((item) => (
              <ScrollReveal key={item.title} delay="short">
                <article className="h-full border border-line bg-paper-2 p-6">
                  <h2 className="font-display text-4xl font-semibold leading-none">{item.title}</h2>
                  <p className="mt-6 text-base leading-relaxed text-ink-2">{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <ContactSection track="diagnostico" />
    </main>
  );
}
