'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';
type ContactChannel = 'email' | 'phone' | 'social';
type ContactTrack = 'home' | 'presenca' | 'estrutura' | 'diagnostico';

type Choice = {
  value: string;
  label: {
    pt: string;
    jp: string;
  };
};

const fields = [
  ['01', 'form_name', 'name'],
  ['02', 'form_company', 'company'],
  ['03', 'form_contact', 'contact'],
  ['04', 'form_message', 'message']
] as const;

const channels: ContactChannel[] = ['email', 'phone', 'social'];

const bottleneckChoices: Choice[] = [
  { value: 'message', label: { pt: 'Minha comunicação não está clara', jp: '伝え方が整理できていない' } },
  { value: 'site', label: { pt: 'Preciso criar ou melhorar um site', jp: 'サイトを作る、または改善したい' } },
  { value: 'manual_process', label: { pt: 'Meus processos são manuais ou desorganizados', jp: '手作業や管理の流れが多い' } },
  { value: 'digital_product', label: { pt: 'Preciso de um sistema ou produto digital', jp: 'システムやデジタル商品が必要' } },
  { value: 'direction', label: { pt: 'Preciso de acompanhamento e direção', jp: '方向性と伴走が必要' } },
  { value: 'unknown', label: { pt: 'Ainda não sei identificar o problema', jp: '何が問題かまだ分からない' } }
];

const startChoices: Choice[] = [
  { value: 'now', label: { pt: 'Agora / nas próximas semanas', jp: '今すぐ / 数週間以内' } },
  { value: '30_days', label: { pt: 'Em até 30 dias', jp: '30日以内' } },
  { value: '60_days', label: { pt: 'Em 60 a 90 dias', jp: '60〜90日以内' } },
  { value: 'exploring', label: { pt: 'Ainda estou entendendo possibilidades', jp: 'まだ可能性を確認している' } }
];

export function ContactForm({ track = 'home' }: { track?: ContactTrack }) {
  const t = useTranslations('contact');
  const lang = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [activeField, setActiveField] = useState<string>('name');
  const [selectedChannels, setSelectedChannels] = useState<ContactChannel[]>(['email']);
  const isDiagnostic = track === 'diagnostico';

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
    const payload = {
      name: String(formData.get('name') ?? ''),
      company: String(formData.get('company') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      social: String(formData.get('social') ?? ''),
      country_timezone: String(formData.get('country_timezone') ?? ''),
      website_url: String(formData.get('website_url') ?? ''),
      offer_summary: String(formData.get('offer_summary') ?? ''),
      tried_before: String(formData.get('tried_before') ?? ''),
      looking_for: String(formData.get('looking_for') ?? ''),
      bottlenecks: formData.getAll('bottlenecks').map(String),
      start_timing: String(formData.get('start_timing') ?? ''),
      decision_context: String(formData.get('decision_context') ?? ''),
      paid_diagnostic_readiness: String(formData.get('paid_diagnostic_readiness') ?? ''),
      message: String(formData.get('message') ?? ''),
      preferred_contact: selectedChannels,
      lang,
      track,
      source_path: window.location.pathname,
      website: String(formData.get('website') ?? '')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
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
          {isDiagnostic
            ? lang === 'pt'
              ? 'Vamos descobrir onde o seu digital está travando antes de falar em serviço.'
              : 'サービスを選ぶ前に、どこで止まっているかを確認します。'
            : t('form_prompt')}
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
      <input type="hidden" name="track" value={track} />
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
      {isDiagnostic && (
        <div className="contact-field flex flex-col gap-5 border-y border-ink-dark py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="label-mono text-ink-3">
                {lang === 'pt' ? 'País e fuso horário' : '国とタイムゾーン'}
              </span>
              <input
                name="country_timezone"
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
                placeholder={lang === 'pt' ? 'Ex.: Japão, JST' : '例: 日本、JST'}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label-mono text-ink-3">
                {lang === 'pt' ? 'Site e redes sociais' : 'サイト・SNS'}
              </span>
              <input
                name="website_url"
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
                placeholder="https:// / @perfil"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-ink-3">
              {lang === 'pt' ? 'O que voce oferece?' : '何を提供していますか？'}
            </span>
            <input
              name="offer_summary"
              className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
            />
          </label>
          <div>
            <span className="label-mono text-ink-3">
              {lang === 'pt' ? 'O que parece estar travando?' : 'どこで止まっている感じがありますか？'}
            </span>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {bottleneckChoices.map((choice) => (
                <label key={choice.value} className="contact-choice">
                  <input type="checkbox" name="bottlenecks" value={choice.value} />
                  <span className="label-mono">{choice.label[lang as 'pt' | 'jp']}</span>
                </label>
              ))}
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-ink-3">
              {lang === 'pt' ? 'O que ja foi tentado?' : 'これまで試したこと'}
            </span>
            <input
              name="tried_before"
              className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="label-mono text-ink-3">
                {lang === 'pt' ? 'Quem participa da decisão?' : '決定に関わる人'}
              </span>
              <input
                name="decision_context"
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
                placeholder={lang === 'pt' ? 'Só eu, sócios, diretoria, equipe...' : '自分のみ、共同経営者、チームなど'}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label-mono text-ink-3">
                {lang === 'pt' ? 'Busca orientação, execução ou os dois?' : '相談、制作、または両方？'}
              </span>
              <input
                name="looking_for"
                className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-ink-3">
              {lang === 'pt' ? 'Quando você quer começar a resolver isso?' : 'いつ頃から進めたいですか？'}
            </span>
            <select
              name="start_timing"
              className="field-line border-0 border-b border-ink-dark bg-transparent py-3 text-base text-ink-dark outline-none focus:border-shock focus:ring-0"
              defaultValue=""
            >
              <option value="" disabled>
                {lang === 'pt' ? 'Selecione uma opção' : '選択してください'}
              </option>
              {startChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label[lang as 'pt' | 'jp']}
                </option>
              ))}
            </select>
          </label>
          <label className="contact-choice self-start">
            <input type="checkbox" name="paid_diagnostic_readiness" value="yes" />
            <span className="label-mono">
              {lang === 'pt'
                ? 'Estou aberta(o) a contratar um diagnóstico pago se fizer sentido.'
                : '必要であれば有料診断を検討できます。'}
            </span>
          </label>
        </div>
      )}
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
        <span className="label-mono text-ink-3">
          {isDiagnostic
            ? lang === 'pt'
              ? 'Conte o cenário em poucas linhas'
              : '現在の状況を簡単に教えてください'
            : t('form_message')}
        </span>
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
