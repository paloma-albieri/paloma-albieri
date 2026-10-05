import { ContactSection } from '@/components/contact/ContactSection';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';
import { type TrackKey, tracks } from '@/lib/site/tracks';

export function TrackPage({ lang, trackKey }: { lang: Locale; trackKey: TrackKey }) {
  const track = tracks[lang][trackKey];
  const isPresence = trackKey === 'presenca';

  return (
    <main className="pt-20">
      <section
        className={isPresence ? 'bg-shock text-ink-dark' : 'text-ink'}
        style={isPresence ? undefined : { background: 'var(--olive)' }}
      >
        <div className="container-shell section-pad">
          <ScrollReveal>
            <p className="label-mono mb-8">{track.label}</p>
            <h1 className="display-h1 max-w-[13ch]">{track.title}</h1>
            <p className="body-lead mt-8">{track.symptom}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTAPill href={`/${lang}/triagem?track=${track.key}`} variant={isPresence ? 'filled-ink' : 'outline-inverse'}>
                {track.cta}
              </CTAPill>
              <CTAPill href={`/${lang}/portfolio`} variant={isPresence ? 'outline-ink' : 'outline-inverse'}>
                {lang === 'pt' ? 'Ver portfolio' : '実績を見る'}
              </CTAPill>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <ScrollReveal>
              <p className="label-mono mb-8 text-ink-2">{lang === 'pt' ? 'SERVICOS' : 'サービス'}</p>
              <h2 className="display-h2 max-w-[10ch]">{lang === 'pt' ? 'O que pode entrar.' : '含まれる内容。'}</h2>
            </ScrollReveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {track.services.map((service) => (
                <ScrollReveal key={service} delay="short">
                  <div className="border border-line bg-paper-2 p-5">
                    <p className="font-display text-3xl font-light leading-none">{service}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-light">
        <div className="container-shell section-pad">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {track.tools.map((tool) => (
              <ScrollReveal key={tool.title} delay="short">
                <article className="interactive-card h-full border border-ink-dark bg-paper-light p-6 text-ink-dark">
                  <p className="label-mono text-shock">{tool.title}</p>
                  <p className="mt-6 text-base leading-relaxed">{tool.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-14 border-t border-ink-dark pt-8">
            <p className="body-lead text-ink-dark">{track.proof}</p>
          </ScrollReveal>
        </div>
      </section>

      <ContactSection track={track.key} />
    </main>
  );
}
