import { useTranslations } from 'next-intl';
import { ContactForm } from './ContactForm';

const links = [
  ['channels_email', 'mailto:contato@palomaalbieri.com'],
  ['channels_whatsapp', 'https://wa.me/817020122563'],
  ['channels_instagram', 'https://instagram.com/paloma.albieri'],
  ['channels_calendar', 'https://calendar.app.google/rRpgFSAxLS5xpL1v9']
] as const;

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section className="bg-paper-rose" id="contato">
      <div className="container-shell section-pad">
        <p className="label-mono mb-8 text-ink-dark">{t('overline')}</p>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="display-h2 text-ink-dark">{t('headline')}</h2>
            <p className="body-lead mt-8 text-ink-dark">{t('sub')}</p>
            <div className="mt-10 flex flex-col border-t border-ink-dark">
              {links.map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between gap-4 border-b border-ink-dark py-4 text-sm"
                >
                  <span className="label-mono text-[10px] text-ink-dark">{key.replace('channels_', '')}</span>
                  <strong className="font-normal">{t(key)}</strong>
                </a>
              ))}
            </div>
          </div>
          <div className="border border-ink-dark bg-paper-light p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
