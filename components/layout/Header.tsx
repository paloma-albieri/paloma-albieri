'use client';

import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { Locale } from '@/lib/i18n/config';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const navTargets = [
  ['servicos', 'servicos'],
  ['triagem', 'triagem'],
  ['portfolio', 'portfolio'],
  ['contato', 'contato']
] as const;

export function Header({ lang }: { lang: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const switchPath = (nextLang: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'pt' || segments[0] === 'jp') segments[0] = nextLang;
    else segments.unshift(nextLang);
    return `/${segments.join('/')}`;
  };

  const status = (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-3">
      <span className="animate-pulse text-shock motion-reduce:animate-none" aria-hidden="true">●</span>
      <span>{t('marker.top_right_availability')}</span>
    </span>
  );

  const navLink = (key: typeof navTargets[number][0], target: string) => (
    <a
      key={key}
      href={key === 'contato' ? `/${lang}#${target}` : `/${lang}/${target}`}
      onClick={() => setMenuOpen(false)}
      aria-current={pathname === `/${lang}/${target}` ? 'page' : undefined}
      className="label-mono relative py-3 text-[11px] text-ink transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-shock after:transition-transform hover:text-shock hover:after:scale-x-100"
    >
      {t(`nav.${key}`)}
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper text-ink">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <a href={`/${lang}`} className="flex min-w-0 items-center gap-3" aria-label="Paloma Albieri">
          <Image src="/favicon.svg" alt="" width={40} height={40} className="shrink-0" unoptimized />
          <span className="truncate font-sans text-xs font-semibold uppercase tracking-wider sm:text-sm xl:hidden 2xl:block">Paloma Albieri</span>
        </a>
        <nav className="hidden items-center gap-6 xl:flex" aria-label={lang === 'pt' ? 'Navegação principal' : 'メインナビゲーション'}>
          {navTargets.map(([key, target]) => navLink(key, target))}
        </nav>
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden xl:block">{status}</div>
          <div className="inline-flex rounded-sm border border-line font-mono text-[10px] uppercase">
            {(['pt', 'jp'] as const).map((locale) => (
              <a key={locale} href={switchPath(locale)} aria-current={lang === locale ? 'true' : undefined}
                className={clsx('px-2 py-2 transition-colors', lang === locale ? 'bg-ink text-paper' : 'hover:text-shock')}>
                {locale.toUpperCase()}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-line hover:text-shock xl:hidden"
            aria-label={lang === 'pt' ? (menuOpen ? 'Fechar menu' : 'Abrir menu') : (menuOpen ? 'メニューを閉じる' : 'メニューを開く')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="border-t border-line px-6 py-2 text-center xl:hidden">{status}</div>
      {menuOpen && (
        <nav id="mobile-navigation" className="container-shell flex flex-col border-t border-line bg-paper py-3 xl:hidden"
          aria-label={lang === 'pt' ? 'Navegação principal' : 'メインナビゲーション'}>
          {navTargets.map(([key, target]) => navLink(key, target))}
        </nav>
      )}
      <ScrollProgress />
    </header>
  );
}
