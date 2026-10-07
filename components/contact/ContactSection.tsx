import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm, type ContactTrack } from './ContactForm';
import { EntryComparison } from './EntryComparison';
import { appointmentUrl } from '@/lib/site/appointments';

const links = [
  ['channels_email', 'mailto:contato@palomaalbieri.com'],
  ['channels_whatsapp', 'https://wa.me/817020122563'],
  ['channels_instagram', 'https://instagram.com/paloma.albieri'],
  ['channels_calendar', appointmentUrl]
] as const;

export function ContactSection({ track = 'home' }: { track?: ContactTrack }) {
  const t = useTranslations('contact');
  const lang = useLocale() as Locale;

  return (
    <section className="contact-collage bg-paper-rose" id="contato">
      <div className="container-shell section-pad">
        <ScrollReveal>
          <p className="editorial-kicker label-mono mb-6 text-ink-dark">{t('overline')}</p>
          <h2 className="max-w-4xl font-serif text-3xl font-semibold leading-tight text-ink-dark md:text-4xl">{t('headline')}</h2>
          <p className="body-lead mt-5 text-ink-dark">{t('sub')}</p>
        </ScrollReveal>
        <div className="mt-10"><EntryComparison lang={lang} /></div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <ScrollReveal>
            <div className="flex flex-col border-t border-line">
              {links.map(([key, href]) => (
                <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="link-row flex flex-wrap items-center justify-between gap-3 border-b border-line py-4 text-sm">
                  <span className="label-mono text-[10px] text-ink-dark">{key.replace('channels_', '')}</span>
                  <strong className="min-w-0 break-words font-normal">{t(key)}</strong>
                </a>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="rounded-sm border border-line bg-paper-light p-6 sm:p-8">
            <ContactForm track={track} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
