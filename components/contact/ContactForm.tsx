'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Status = 'idle' | 'sending' | 'ok' | 'error';
export type ContactTrack = 'home' | 'presenca' | 'estrutura' | 'diagnostico';
type ContactMode = 'triage' | 'discovery';
type ContactChannel = 'email' | 'phone';

export function ContactForm({ track = 'home', mode = 'triage' }: { track?: ContactTrack; mode?: ContactMode }) {
  const t = useTranslations('contact');
  const lang = useLocale();
  const formId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [channel, setChannel] = useState<ContactChannel>('email');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const busy = !ready || status === 'sending';
  const isDiscovery = mode === 'discovery';
  const fieldClass = 'field-line w-full min-w-0 border-0 border-b border-line bg-transparent py-3 text-base text-ink-dark focus:border-shock';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      social: '',
      website_url: String(data.get('website_url') ?? '').trim(),
      country_timezone: '',
      offer_summary: '',
      tried_before: '',
      decision_context: '',
      start_timing: '',
      looking_for: isDiscovery ? 'strategic_discovery' : 'initial_triage',
      paid_diagnostic_readiness: String(data.get('paid_diagnostic_readiness') ?? ''),
      bottlenecks: data.getAll('bottlenecks').map(String),
      message: String(data.get('message') ?? '').trim(),
      preferred_contact: [channel],
      lang,
      track: isDiscovery ? 'diagnostico' : track,
      source_path: window.location.pathname,
      website: String(data.get('website') ?? '')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      form.reset();
      setChannel('email');
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div role="status" className="contact-success bg-paper-light p-2 text-ink-dark">
        <p className="label-mono text-accent">{t('success_marker')}</p>
        <h3 className="mt-6 font-serif text-3xl font-semibold leading-tight">
          {t(isDiscovery ? 'discovery_success_title' : 'success_title')}
        </h3>
        <p className="mt-5 text-base leading-relaxed">{t(isDiscovery ? 'discovery_success_message' : 'success_message')}</p>
        <p className="mt-4 text-sm leading-relaxed text-secondary">{t(isDiscovery ? 'discovery_success_next' : 'success_next')}</p>
        <button type="button" onClick={() => setStatus('idle')} className="cta-pill cta-outline-ink mt-8">
          <span>{t('success_again')}</span><ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form name="contact" method="POST" onSubmit={handleSubmit} aria-busy={busy} className="contact-editorial-form flex flex-col gap-8">
      <div className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label-mono text-accent">{t(isDiscovery ? 'discovery_marker' : 'form_marker')}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">{t(isDiscovery ? 'discovery_eta' : 'form_eta')}</p>
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-ink-dark">
          {t(isDiscovery ? 'discovery_prompt' : 'form_prompt')}
        </h3>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="track" value={isDiscovery ? 'diagnostico' : track} />
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">01</span>{t('form_name_company')}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_name')}</span>
            <input name="name" required minLength={2} autoComplete="name" className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_company')}</span>
            <input name="company" autoComplete="organization" className={fieldClass} />
          </label>
        </div>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">02</span>{t('form_contact')}</legend>
        <div className="grid grid-cols-2 gap-3">
          {(['email', 'phone'] as const).map((option) => (
            <label key={option} className={`contact-choice px-3 py-3 text-sm ${channel === option ? 'is-selected' : ''}`}>
              <input type="radio" name="preferred_contact" value={option} checked={channel === option} onChange={() => setChannel(option)} />
              <span>{t(`form_contact_${option}`)}</span>
            </label>
          ))}
        </div>
        <label className="mt-5 block min-w-0 text-sm text-ink-dark" htmlFor={`${formId}-reply`}>
          <span>{t(channel === 'email' ? 'form_email' : 'form_phone')}</span>
          <input key={channel} id={`${formId}-reply`} name={channel} type={channel === 'email' ? 'email' : 'tel'} required
            autoComplete={channel === 'email' ? 'email' : 'tel'} className={fieldClass} />
        </label>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">03</span>{t('form_bottleneck')}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['message', 'bottleneck_presence'],
            ['manual_process', 'bottleneck_structure'],
            ['unknown', 'bottleneck_unknown']
          ].map(([value, label]) => (
            <label key={value} className="contact-choice px-5 py-3 text-sm leading-relaxed">
              <input type="radio" name="bottlenecks" value={value} required />
              <span>{t(label)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">04</span>{t('form_message')}</legend>
        <label className="block" htmlFor={`${formId}-message`}>
          <span className="sr-only">{t('form_message')}</span>
          <textarea id={`${formId}-message`} name="message" required minLength={30} rows={5}
            aria-describedby={`${formId}-message-hint`} className={`${fieldClass} resize-y`} />
        </label>
        <p id={`${formId}-message-hint`} className="mt-3 text-xs leading-relaxed text-secondary">{t('form_message_hint')}</p>
        {isDiscovery && (
          <label className="mt-5 block text-sm text-ink-dark">
            <span>{t('form_website')}</span>
            <input name="website_url" className={fieldClass} />
          </label>
        )}
      </fieldset>
      {isDiscovery && (
        <label className="flex items-start gap-3 text-sm leading-relaxed text-secondary">
          <input type="checkbox" name="paid_diagnostic_readiness" value="yes" required disabled={busy}
            className="mt-1 h-4 w-4 shrink-0 accent-shock" />
          <span>{t('discovery_consent')}</span>
        </label>
      )}
      <div className="flex flex-col items-start gap-5 border-t border-line pt-6">
        <p className="text-sm leading-relaxed text-secondary">{t(isDiscovery ? 'discovery_reassurance' : 'form_reassurance')}</p>
        <button type="submit" disabled={busy} className="contact-submit cta-pill cta-filled-shock disabled:opacity-70">
          {status === 'sending' && <span className="submit-spinner" aria-hidden="true" />}
          <span>{t(status === 'sending' ? 'submit_sending' : isDiscovery ? 'discovery_submit' : 'submit')}</span>
          <ArrowUpRight size={18} strokeWidth={1} className="shrink-0" aria-hidden="true" />
        </button>
      </div>
      {status === 'error' && (
        <div role="alert" className="border border-line bg-paper-rose p-4 text-sm leading-relaxed text-ink-dark">
          <p className="label-mono mb-2 text-accent">{t('error_marker')}</p>
          <p>{t('error_message')}</p>
        </div>
      )}
    </form>
  );
}
