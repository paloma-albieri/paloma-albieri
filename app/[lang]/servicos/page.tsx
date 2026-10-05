import type { Metadata } from 'next';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'servicos');
}

export default function ServicesPage({ params }: { params: { lang: Locale } }) {
  const copy = {
    pt: {
      eyebrow: 'Servicos',
      title: 'Cinco frentes para organizar o problema antes de vender uma solucao.',
      lead:
        'A pessoa nao precisa escolher um pacote. A triagem identifica qual frente pede atencao primeiro e evita comprar post, site ou automacao sem base.',
      diagnostic: 'Solicitar triagem',
      fronts: [
        {
          title: 'Diagnostico Estrategico Digital',
          text: 'Entrada paga e adaptavel para mapear gargalo, prioridade, risco e escopo antes da execucao.'
        },
        {
          title: 'Presenca, mensagem e conversao',
          text: 'Clareza de oferta, posicionamento, conteudo, canais e caminho ate o contato.'
        },
        {
          title: 'Processos, automacao e IA',
          text: 'Fluxos manuais, atendimento, cadastro, organizacao interna, formularios e automacoes simples.'
        },
        {
          title: 'Sistema ou produto digital',
          text: 'Sites, landing pages, portais, ferramentas internas e produtos digitais por fases.'
        },
        {
          title: 'Direcao e evolucao',
          text: 'Acompanhamento estrategico, priorizacao, leitura de dados e melhoria continua.'
        }
      ]
    },
    jp: {
      eyebrow: 'サービス',
      title: '売る前に課題を整理する、5つの領域。',
      lead:
        '最初からサービスを選ぶ必要はありません。初回チェックで、投稿、サイト、自動化、仕組みのどこから整えるべきかを見ます。',
      diagnostic: '初回チェックを送る',
      fronts: [
        {
          title: 'デジタル戦略診断',
          text: '制作前に課題、優先度、リスク、必要な範囲を整理する有料診断です。'
        },
        {
          title: '発信、メッセージ、問い合わせ',
          text: '提供内容、見せ方、投稿、媒体、問い合わせまでの流れを整えます。'
        },
        {
          title: '業務、 自動化、AI',
          text: '手作業、問い合わせ、登録、社内整理、フォーム、簡単な自動化を見直します。'
        },
        {
          title: 'システム、デジタル商品',
          text: 'サイト、ランディングページ、ポータル、社内ツール、デジタル商品を段階的に作ります。'
        },
        {
          title: '方向性と改善',
          text: '戦略サポート、優先順位、データ確認、継続的な改善を行います。'
        }
      ]
    }
  }[params.lang];

  return (
    <main className="pt-20">
      <section className="bg-paper-light">
        <div className="container-shell section-pad">
          <ScrollReveal>
            <p className="label-mono mb-8 text-shock">{copy.eyebrow}</p>
            <h1 className="display-h1 max-w-[13ch] text-ink-dark">{copy.title}</h1>
            <p className="body-lead mt-8 text-ink-dark">{copy.lead}</p>
          </ScrollReveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {copy.fronts.map((front) => (
              <ScrollReveal key={front.title} delay="short">
                <article className="interactive-card flex h-full flex-col border border-ink-dark bg-paper-light p-6 text-ink-dark sm:p-8">
                  <p className="label-mono text-shock">{copy.eyebrow}</p>
                  <h2 className="mt-6 font-display text-[clamp(36px,5vw,68px)] font-light leading-none">
                    {front.title}
                  </h2>
                  <p className="mt-6 text-base leading-relaxed">{front.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12">
            <CTAPill href={`/${params.lang}/triagem`} variant="filled-shock">
              {copy.diagnostic}
            </CTAPill>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
