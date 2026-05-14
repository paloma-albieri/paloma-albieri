'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';
type ContactChannel = 'email' | 'phone' | 'social';

const fields = [
  ['01', 'form_name', 'name'],
  ['02', 'form_company', 'company'],
  ['03', 'form_contact', 'contact'],
  ['04', 'form_message', 'message']
] as const;

const channels: ContactChannel[] = ['email', 'phone', 'social'];

export function ContactForm() {
  const t = useTranslations('contact');
  const lang = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [activeField, setActiveField] = useState<string>('name');
  const [selectedChannels, setSelectedChannels] = useState<ContactChannel[]>(['email']);

  function toggleChannel(channel: ContactChannel) {
    setSelectedChannels((current) => {
      if (current.includes(channel)) {
        return current.filter((item) => item !== channel);
      }
      return [...current, channel];
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedChannels.length === 0) {
      setActiveField('contact');
      setStatus('error');
      return;
    }

    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'contact');
    formData.set('lang', lang);
    formData.delete('preferred_contact');
    selectedChannels.forEach((channel) => formData.append('preferred_contact', channel));

    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        encoded.append(key, value);
      }
    });

    try {
      const response = await fetch('/forms/contact.html', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: encoded.toString()
      });

      if (response.ok) {
        setStatus('ok');
        form.reset();
        setSelectedChannels(['email']);
        setActiveField('name');
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="contact-success min-h-[520px] border border-ink-dark bg-paper-light p-6 text-ink-dark sm:p-8">
        <div className="flex items-start justify-between gap-8">
          <p className="label-mono text-shock">{t('success_marker')}</p>
          <span className="contact-success-mark" aria-hidden="true" />
        </div>
        <div className="mt-20 max-w-[34rem]">
          <h3 className="font-display text-[clamp(36px,5vw,72px)] font-light leading-[0.95] tracking-[-0.03em]">
            {t('success_title')}
          </h3>
          <p className="body-lead mt-8 text-ink-dark">{t('success_message')}</p>
          <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-ink-3">{t('success_next')}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="cta-pill cta-outline-ink mt-12"
        >
          <span>{t('success_again')}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="contact-editorial-form flex flex-col gap-6"
    >
      <div className="mb-2 border-b border-ink-dark pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label-mono text-shock">{t('form_marker')}</p>
          <p className="label-mono text-[10px] text-ink-3">{t('form_eta')}</p>
        </div>
        <p className="mt-8 max-w-[38rem] font-display text-[clamp(30px,4vw,56px)] font-light leading-none tracking-[-0.03em] text-ink-dark">
          {t('form_prompt')}
        </p>
        <div className="mt-8 grid gap-2 sm:grid-cols-4">
          {fields.map(([number, labelKey, fieldName]) => (
            <span
              key={fieldName}
              className={`label-mono contact-step ${activeField === fieldName ? 'is-active' : ''}`}
            >
              <span>{number}</span>
              {t(labelKey)}
            </span>
          ))}
        </div>
      </div>
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
      <label className="contact-field flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_name')}</span>
        <input
          name="name"
          required
          minLength={2}
          onFocus={() => setActiveField('name')}
          className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <label className="contact-field flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_company')}</span>
        <input
          name="company"
          onFocus={() => setActiveField('company')}
          className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <div className="contact-field flex flex-col gap-4">
        <span className="label-mono text-ink-3">{t('form_contact')}</span>
        <div className="grid gap-2 sm:grid-cols-3">
          {channels.map((channel) => {
            const isSelected = selectedChannels.includes(channel);
            return (
              <label key={channel} className={`contact-choice ${isSelected ? 'is-selected' : ''}`}>
                <input
                  type="checkbox"
                  name="preferred_contact"
                  value={channel}
                  checked={isSelected}
                  onChange={() => {
                    setActiveField('contact');
                    toggleChannel(channel);
                  }}
                />
                <span className="label-mono">{t(`form_contact_${channel}`)}</span>
              </label>
            );
          })}
        </div>
        {selectedChannels.length === 0 && (
          <p className="text-sm leading-relaxed text-ink-dark">{t('form_contact_required')}</p>
        )}
        <div className="grid gap-4">
          {selectedChannels.includes('email') && (
            <label className="flex flex-col gap-2">
              <span className="label-mono text-[10px] text-ink-3">{t('form_email')}</span>
              <input
                name="email"
                type="email"
                required
                onFocus={() => setActiveField('contact')}
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
              />
            </label>
          )}
          {selectedChannels.includes('phone') && (
            <label className="flex flex-col gap-2">
              <span className="label-mono text-[10px] text-ink-3">{t('form_phone')}</span>
              <input
                name="phone"
                type="tel"
                required
                onFocus={() => setActiveField('contact')}
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
              />
            </label>
          )}
          {selectedChannels.includes('social') && (
            <label className="flex flex-col gap-2">
              <span className="label-mono text-[10px] text-ink-3">{t('form_social')}</span>
              <input
                name="social"
                type="text"
                required
                onFocus={() => setActiveField('contact')}
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
              />
            </label>
          )}
        </div>
      </div>
      <label className="contact-field flex flex-col gap-2">
        <span className="label-mono text-ink-3">{t('form_message')}</span>
        <textarea
          name="message"
          required
          minLength={30}
          rows={5}
          onFocus={() => setActiveField('message')}
          className="field-line resize-y border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
        />
      </label>
      <div className="mt-2 flex flex-col gap-4 border-t border-ink-dark pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[30ch] text-sm leading-relaxed text-ink-3">{t('form_reassurance')}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="contact-submit cta-pill cta-filled-shock self-start disabled:opacity-70"
        >
          {status === 'sending' && <span className="submit-spinner" aria-hidden="true" />}
          <span>{status === 'sending' ? t('submit_sending') : t('submit')}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      {status === 'error' && (
        <div className="border border-ink-dark bg-paper-rose p-4 text-sm leading-relaxed text-ink-dark">
          <p className="label-mono mb-2 text-shock">{t('error_marker')}</p>
          <p>{t('error_message')}</p>
        </div>
      )}
    </form>
  );
}
