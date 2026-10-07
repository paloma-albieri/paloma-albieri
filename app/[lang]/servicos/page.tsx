import type { Metadata } from 'next';
import { ArrowRight, Compass, Layout, Workflow, Boxes } from 'lucide-react';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { servicesCopy } from '@/lib/site/services';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return buildMetadata(isLocale(params.lang) ? params.lang : 'pt', 'servicos');
}

const icons = [Layout, Workflow, Boxes, Compass];

export default function ServicesPage({ params }: { params: { lang: Locale } }) {
  const copy = servicesCopy[params.lang];
  return (
    <main className="pt-28 xl:pt-20">
      <section className="border-b border-line bg-paper-light text-ink-dark">
        <div className="container-shell py-12 sm:py-16">
          <ScrollReveal>
            <p className="label-mono mb-5 text-accent">PALOMA ALBIERI</p>
            <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed">{copy.lead}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.intro}</p>
            <div className="mt-8"><CTAPill href={`/${params.lang}/triagem`} variant="filled-shock">{copy.cta}</CTAPill></div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{copy.needsTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {copy.fronts.map((front, index) => {
              const Icon = icons[index];
              return (
                <ScrollReveal key={front.service} className="h-full">
                  <article className="flex h-full min-w-0 flex-col rounded-sm border border-line p-6 sm:p-8">
                    <div className="flex items-start gap-3 text-accent">
                      <Icon size={24} className="shrink-0" aria-hidden="true" />
                      <p className="label-mono leading-relaxed">{front.service}</p>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-3xl">{front.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-3">{front.text}</p>
                    <p className="label-mono mb-3 mt-6 text-xs text-ink-3">{copy.deliveryLabel}</p>
                    <ul className="mb-8 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                      {front.deliveries.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <a href={`/${params.lang}/${front.href}`} className="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold underline decoration-accent underline-offset-4 hover:text-accent">
                      {front.link}<ArrowRight size={18} className="shrink-0" aria-hidden="true" />
                    </a>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2 text-ink">
        <div className="container-shell section-pad grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-mono mb-5 text-accent">{copy.diagnosticLabel}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{copy.diagnosticTitle}</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed">{copy.diagnosticText}</p>
            <p className="mt-5 text-base leading-relaxed text-ink-3">{copy.diagnosticNote}</p>
            <div className="mt-7"><CTAPill href={`/${params.lang}/diagnostico`} variant="outline-ink">{copy.diagnosticLink}</CTAPill></div>
          </div>
        </div>
      </section>

      <section className="bg-paper-light text-ink-dark">
        <div className="container-shell section-pad">
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{copy.processTitle}</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="border-t border-line pt-5">
                <p className="label-mono text-accent">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy.closeTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{copy.closeText}</p>
            <div className="mt-6"><CTAPill href={`/${params.lang}/triagem`} variant="filled-shock">{copy.cta}</CTAPill></div>
          </div>
        </div>
      </section>
    </main>
  );
}
