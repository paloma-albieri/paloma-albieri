'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Status = 'idle' | 'sending' | 'ok' | 'error';
type TriageDepth = 'quick' | 'complete';
export type ContactTrack = 'home' | 'presenca' | 'estrutura' | 'diagnostico';

const questions = [
  ['offer_summary', 'question_offer'],
  ['main_customer', 'question_customer'],
  ['motivation', 'question_motivation'],
  ['message', 'question_problem'],
  ['business_impact', 'question_impact'],
  ['tried_before', 'question_tried'],
  ['desired_outcome', 'question_outcome'],
  ['current_tools', 'question_tools'],
  ['start_timing', 'question_urgency'],
  ['decision_context', 'question_decision']
] as const;

export function ContactForm({ track = 'home' }: { track?: ContactTrack }) {
  const t = useTranslations('contact');
  const lang = useLocale();
  const formId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [ready, setReady] = useState(false);
  const [triageDepth, setTriageDepth] = useState<TriageDepth>('quick');
  useEffect(() => setReady(true), []);
  const busy = !ready || status === 'sending';
  const fieldClass = 'field-line w-full min-w-0 border-0 border-b border-line bg-transparent py-3 text-base text-ink-dark focus:border-shock';
  const visibleQuestions = triageDepth === 'quick' ? questions.slice(0, 4) : questions;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('source_path', window.location.pathname);
    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });
    setStatus('sending');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div role="status" className="contact-success bg-paper-light p-2 text-ink-dark">
        <p className="label-mono text-accent">{t('success_marker')}</p>
        <h3 className="mt-6 font-serif text-3xl font-semibold leading-tight">{t('success_title')}</h3>
        <p className="mt-5 text-base leading-relaxed">{t('success_message')}</p>
        <p className="mt-4 text-sm leading-relaxed text-secondary">{t('success_next')}</p>
        <button type="button" onClick={() => setStatus('idle')} className="cta-pill cta-outline-ink mt-8">
          <span>{t('success_again')}</span><ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form name="contact" method="POST" onSubmit={handleSubmit} aria-busy={busy}
      className="contact-editorial-form flex flex-col gap-8">
      <div className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label-mono text-accent">{t('form_marker')}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">{t('form_eta')}</p>
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-ink-dark">{t('form_prompt')}</h3>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="track" value={track} />
      <input type="hidden" name="triage_type" value="initial_triage" />
      <input type="hidden" name="triage_depth" value={triageDepth} />
      <input type="hidden" name="source_path" value="" />
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">01</span>{t('form_contact')}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_name')}</span>
            <input name="name" required minLength={2} autoComplete="name" className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_company')}</span>
            <input name="company" required autoComplete="organization" className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_email')}</span>
            <input name="email" type="email" required autoComplete="email" className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_other_contact')}</span>
            <input name="other_contact" className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_country_timezone')}</span>
            <input name="country_timezone" required className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark">
            <span>{t('form_preferred_language')}</span>
            <input name="preferred_language" required defaultValue={lang === 'jp' ? '日本語' : 'Português'} className={fieldClass} />
          </label>
          <label className="min-w-0 text-sm text-ink-dark sm:col-span-2">
            <span>{t('form_website')}</span>
            <input name="website_url" className={fieldClass} />
          </label>
        </div>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">02</span>{t('form_context')}</legend>
        <div className="mb-6 grid gap-3 sm:grid-cols-2" role="group" aria-label={t('form_depth_label')}>
          {(['quick', 'complete'] as const).map((depth) => (
            <button
              key={depth}
              type="button"
              onClick={() => setTriageDepth(depth)}
              className={`min-h-20 rounded-sm border p-4 text-left transition-colors ${
                triageDepth === depth
                  ? 'border-shock bg-paper-rose text-paper'
                  : 'border-line bg-transparent text-ink-dark hover:border-shock'
              }`}
            >
              <span className="label-mono block text-[10px]">{t(`form_depth_${depth}_label`)}</span>
              <span className="mt-2 block text-sm leading-relaxed">{t(`form_depth_${depth}_description`)}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {visibleQuestions.map(([name, label], index) => (
            <label key={name} className="block min-w-0 text-sm leading-relaxed text-ink-dark">
              <span>{index + 1}. {t(label)}</span>
              <textarea name={name} required rows={2} className={`${fieldClass} resize-y`} />
            </label>
          ))}
          <label className="block min-w-0 text-sm leading-relaxed text-ink-dark">
            <span>{visibleQuestions.length + 1}. {t('question_looking_for')}</span>
            <select name="looking_for" required defaultValue="" className={fieldClass}>
              <option value="" disabled>{t('form_select')}</option>
              <option value="diagnosis">{t('looking_for_diagnosis')}</option>
              <option value="execution">{t('looking_for_execution')}</option>
              <option value="unsure">{t('looking_for_unsure')}</option>
            </select>
          </label>
          {triageDepth === 'quick' && (
            <label className="block min-w-0 text-sm leading-relaxed text-ink-dark">
              <span>{visibleQuestions.length + 2}. {t('question_urgency')}</span>
              <input name="start_timing" required className={fieldClass} />
            </label>
          )}
          <label className="block min-w-0 text-sm leading-relaxed text-ink-dark">
            <span>{visibleQuestions.length + (triageDepth === 'quick' ? 3 : 2)}. {t('question_investment')}</span>
            <input name="investment_range" className={fieldClass} />
          </label>
        </div>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">03</span>{t('form_materials')}</legend>
        <label className="block min-w-0 text-sm leading-relaxed text-ink-dark" htmlFor={`${formId}-materials`}>
          <span>{t('form_materials_links')}</span>
          <textarea id={`${formId}-materials`} name="materials" rows={3} className={`${fieldClass} resize-y`} />
        </label>
      </fieldset>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="label-mono mb-4 text-secondary"><span className="mr-3 text-accent">04</span>{t('form_confirmations')}</legend>
        <div className="flex flex-col gap-4">
          {[
            ['free_triage_consent', 'consent_free_triage'],
            ['paid_diagnostic_readiness', 'consent_paid_work'],
            ['information_consent', 'consent_information']
          ].map(([name, label]) => (
            <label key={name} className="flex items-start gap-3 text-sm leading-relaxed text-secondary">
              <input type="checkbox" name={name} value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-shock" />
              <span>{t(label)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col items-start gap-5 border-t border-line pt-6">
        <p className="text-sm leading-relaxed text-secondary">{t('form_reassurance')}</p>
        <button type="submit" disabled={busy} className="contact-submit cta-pill cta-filled-shock disabled:opacity-70">
          {status === 'sending' && <span className="submit-spinner" aria-hidden="true" />}
          <span>{t(status === 'sending' ? 'submit_sending' : 'submit')}</span>
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
