'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export function ContactForm() {
  const t = useTranslations('contact');
  const lang = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'contact');
    formData.set('lang', lang);

    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        encoded.append(key, value);
      }
    });

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: encoded.toString()
      });

      if (response.ok) {
        setStatus('ok');
        form.reset();
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return <p className="body-lead text-ink-dark">{t('success_message')}</p>;
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="website"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="lang" value={lang} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />
      <label className="flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_name')}</span>
        <input
          name="name"
          required
          minLength={2}
          className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_company')}</span>
        <input
          name="company"
          className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_email')}</span>
        <input
          name="email"
          type="email"
          required
          className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_message')}</span>
        <textarea
          name="message"
          required
          minLength={30}
          rows={5}
          className="field-line resize-y border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="cta-pill cta-filled-shock self-start disabled:opacity-50"
      >
        {status === 'sending' ? t('submit_sending') : t('submit')}
        <span aria-hidden="true">↗</span>
      </button>
      {status === 'error' && <p className="text-sm leading-relaxed text-ink-dark">{t('error_message')}</p>}
    </form>
  );
}
