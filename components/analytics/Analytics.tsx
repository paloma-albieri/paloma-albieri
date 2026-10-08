'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getAttribution, getConsent, initializeAnalytics, setConsent, trackCalendarOpen, trackContactClick, trackPageView, type Consent } from '@/lib/tracking';

export function Analytics({ measurementId }: { measurementId: string }) {
  const language = useLocale();
  const t = useTranslations('analytics');
  const pathname = usePathname();
  const [choice, setChoice] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const lastPage = useRef('');
  const configured = /^G-[A-Z0-9]+$/.test(measurementId);

  useEffect(() => {
    getAttribution();
    const stored = getConsent();
    if (stored) setConsent(stored);
    setChoice(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!configured || choice !== 'granted') { lastPage.current = ''; return; }
    initializeAnalytics(measurementId);
    if (lastPage.current !== pathname) {
      trackPageView(language);
      lastPage.current = pathname;
    }
  }, [choice, configured, language, measurementId, pathname]);

  useEffect(() => {
    function click(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor || event.defaultPrevented) return;
      const href = anchor.getAttribute('href') || '';
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return; }
      if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') trackContactClick('whatsapp', language);
      else if (url.protocol === 'mailto:') trackContactClick('email', language);
      else if (url.hostname === 'calendar.google.com' || url.hostname === 'calendar.app.google') trackCalendarOpen(language, 'google');
      else if (url.hash === '#agenda') trackCalendarOpen(language, 'section');
    }
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [language]);

  function choose(consent: Consent) {
    setConsent(consent);
    setChoice(consent);
    setPreferencesOpen(false);
  }

  if (!ready || !configured) return null;
  return (
    <>
      {choice === 'granted' && process.env.NODE_ENV === 'production' && (
        <Script id="google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      )}
      {choice === null || preferencesOpen ? (
        <section aria-label={t('title')} className="fixed inset-x-0 bottom-0 z-[60] max-h-[70vh] overflow-y-auto border-t border-line bg-paper-light p-5 text-ink-dark shadow-lg">
          <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl"><h2 className="text-base font-semibold">{t('title')}</h2><p className="mt-2 text-sm leading-relaxed">{t('description')}</p></div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button type="button" onClick={() => choose('denied')} className="min-h-11 rounded-sm border border-line px-4 py-2 text-sm">{t('reject')}</button>
              <button type="button" onClick={() => choose('granted')} className="min-h-11 rounded-sm border border-shock bg-paper-rose px-4 py-2 text-sm">{t('accept')}</button>
            </div>
          </div>
        </section>
      ) : (
        <div className="border-t border-line bg-paper px-6 py-3 text-center text-ink">
          <button type="button" onClick={() => setPreferencesOpen(true)} className="min-h-11 text-xs underline underline-offset-4">{t('preferences')}</button>
        </div>
      )}
    </>
  );
}
