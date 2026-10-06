import { ContactSection } from '@/components/contact/ContactSection';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

const copy = {
  pt: {
    eyebrow: 'Triagem digital',
    title: 'Descubra onde o seu digital esta travando.',
    lead:
      'Voce nao precisa chegar sabendo qual servico pedir. A triagem organiza sintomas, momento e prioridade para eu analisar manualmente antes de convidar para uma conversa.',
    cta: 'Preencher triagem',
    secondary: 'Entender o diagnostico pago',
    steps: [
      {
        title: '01 · Responda o formulario',
        text: 'Leva cerca de 4 minutos e pede contexto, sintomas, canais e prontidao. Nao solicito senhas, acessos ou dados confidenciais.'
      },
      {
        title: '02 · Eu analiso o caso',
        text: 'A resposta vira uma leitura interna: frente provavel, urgencia, aderencia e proxima acao.'
      },
      {
        title: '03 · Se fizer sentido, conversamos',
        text: 'Quando houver encaixe, envio o convite para uma conversa gratuita de 15 minutos. A agenda nao vem automaticamente.'
      }
    ],
    note:
      'A triagem nao e consultoria gratuita. Ela existe para entender se o proximo passo e orientacao, diagnostico pago, execucao ou nenhum servico agora.'
  },
  jp: {
    eyebrow: '初回チェック',
    title: 'どこで止まっているかを見つけます。',
    lead:
      '必要なサービス名が分からなくても大丈夫です。状況、課題、優先度を確認し、内容を読んでから次の案内をします。',
    cta: '初回チェックを送る',
    secondary: '有料診断を見る',
    steps: [
      {
        title: '01 · フォームに回答',
        text: '約4分で、状況、課題、連絡先、開始時期を確認します。パスワードや機密情報は入力しないでください。'
      },
      {
        title: '02 · 内容を確認',
        text: '可能性のある領域、緊急度、相性、次の行動をこちらで整理します。'
      },
      {
        title: '03 · 必要な場合だけ相談へ',
        text: '合いそうな場合は、15分の無料相談をご案内します。予約リンクは自動送信しません。'
      }
    ],
    note:
      '初回チェックは無料コンサルティングではありません。次に必要なのが相談、有料診断、制作、または今は何もしないことなのかを見極める入口です。'
  }
} as const;

export function TriagePage({ lang }: { lang: Locale }) {
  const t = copy[lang];

  return (
    <main className="pt-20">
      <section className="bg-paper-light">
        <div className="container-shell section-pad">
          <ScrollReveal>
            <p className="label-mono mb-8 text-accent">{t.eyebrow}</p>
            <h1 className="display-h1 max-w-[12ch] text-ink-dark">{t.title}</h1>
            <p className="body-lead mt-8 max-w-[58rem] text-ink-dark">{t.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTAPill href="#contato" variant="filled-shock">
                {t.cta}
              </CTAPill>
              <CTAPill href={`/${lang}/diagnostico`} variant="outline-ink">
                {t.secondary}
              </CTAPill>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <div className="grid gap-5 md:grid-cols-3">
            {t.steps.map((step) => (
              <ScrollReveal key={step.title} delay="short">
                <article className="h-full border border-line bg-paper-2 p-6">
                  <h2 className="font-display text-4xl font-semibold leading-none">{step.title}</h2>
                  <p className="mt-6 text-base leading-relaxed text-ink-2">{step.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12 border-t border-line pt-8">
            <p className="body-lead max-w-[56rem]">{t.note}</p>
          </ScrollReveal>
        </div>
      </section>

      <ContactSection track="diagnostico" />
    </main>
  );
}
