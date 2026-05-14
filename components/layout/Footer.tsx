import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';

const footerLinks = [
  ['instagram', 'Instagram', 'https://instagram.com/paloma.albieri', true],
  ['whatsapp', 'WhatsApp', 'https://wa.me/817020122563', true],
  ['email', 'E-mail', 'mailto:contato@palomaalbieri.com', false]
] as const;

export function Footer({ lang }: { lang: Locale }) {
  const t = useTranslations('footer');
  const links = [
    ...footerLinks,
    ['portfolio', t('portfolio'), `/${lang}/portfolio`, false]
  ] as const;

  return (
    <footer className="border-t border-ink-dark bg-paper-light py-12">
      <div className="container-shell flex flex-col gap-6 text-sm text-ink-dark md:flex-row md:items-center md:justify-between">
        <p className="label-mono text-[11px]">{t('copyright')}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label={t('links_label')}>
          {links.map(([key, label, href, external]) => (
            <a
              key={key}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="label-mono relative text-[11px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-shock after:transition-transform after:duration-200 hover:text-shock hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
