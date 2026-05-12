'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { Locale } from '@/lib/i18n/config';

const navTargets = [
  ['pacotes', 'pacotes'],
  ['stacks', 'stacks'],
  ['sobre', 'sobre'],
  ['contato', 'contato']
] as const;

export function Header({ lang }: { lang: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchPath = (nextLang: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'pt' || segments[0] === 'jp') {
      segments[0] = nextLang;
    } else {
      segments.unshift(nextLang);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 bg-[var(--bg-topbar)] backdrop-blur transition-colors duration-300',
        scrolled && 'border-b border-[oklch(.14_.01_270_/_0.18)]'
      )}
    >
      <div className="container-shell flex items-center justify-between gap-5 py-[18px]">
        <a href={`/${lang}`} className="min-w-0 font-body text-sm font-medium sm:text-base">
          <span className="block truncate">{t('marker.top_left')}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navTargets.map(([key, target]) => (
            <a
              key={key}
              href={key === 'pacotes' ? `/${lang}/pacotes` : `/${lang}#${target}`}
              className="label-mono text-[11px] text-ink-dark transition-colors hover:text-shock"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <span className="label-mono hidden text-[10px] text-ink-dark lg:inline">
            {t('marker.top_right_availability')}
          </span>
          <div className="inline-flex border border-ink-dark font-mono text-[10px] uppercase">
            <a
              href={switchPath('pt')}
              className={clsx('px-2 py-1', lang === 'pt' && 'bg-ink-dark text-paper-light')}
            >
              PT
            </a>
            <a
              href={switchPath('jp')}
              className={clsx('px-2 py-1', lang === 'jp' && 'bg-ink-dark text-paper-light')}
            >
              JP
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
