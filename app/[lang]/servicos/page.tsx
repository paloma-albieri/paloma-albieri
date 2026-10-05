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
      title: 'Cinco serviços para resolver o problema certo, na ordem certa.',
      lead:
        'A pessoa nao precisa escolher um pacote. A triagem identifica se o proximo passo e diagnostico, web, automacao, sistema ou direcao digital.',
      diagnostic: 'Solicitar triagem',
      fronts: [
        {
          title: 'Diagnostico Estrategico Digital',
          text: 'Entrada paga e adaptavel para mapear gargalo, prioridade, risco e escopo antes da execucao.'
        },
        {
          title: 'Sites & Experiencias Web',
          text: 'Presenca web clara, confiavel e funcional, conectada ao caminho do cliente e a uma acao relevante.'
        },
        {
          title: 'Automacao, IA & Processos',
          text: 'Fluxos mais simples, rastreaveis e eficientes para reduzir tempo, erros, retrabalho e perda de informacao.'
        },
        {
          title: 'Sistemas & Produtos Digitais',
          text: 'Produtos digitais para processos que exigem dados, usuarios, permissoes, regras e experiencia propria.'
        },
        {
          title: 'Direcao Digital',
          text: 'Coordenacao continua para priorizar e evoluir presenca, experiencia, processos e tecnologia com criterio.'
        }
      ]
    },
    jp: {
      eyebrow: 'サービス',
      title: '正しい課題を、正しい順番で解決する5つのサービス。',
      lead:
        '最初からサービスを選ぶ必要はありません。初回チェックで、診断、Web、業務整理、システム、継続的な方向性のどれが必要かを見ます。',
      diagnostic: '初回チェックを送る',
      fronts: [
        {
          title: 'デジタル戦略診断',
          text: '制作前に課題、優先度、リスク、必要な範囲を整理する有料診断です。'
        },
        {
          title: 'Webサイト・Web体験',
          text: '顧客の流れと事業目的につながる、分かりやすく信頼できるWeb体験を作ります。'
        },
        {
          title: '自動化・AI・業務プロセス',
          text: '手作業、ミス、情報の抜け漏れを減らすために、業務の流れを整理し自動化します。'
        },
        {
          title: 'システム・デジタルプロダクト',
          text: 'データ、ユーザー、権限、ルールが必要な業務を、段階的なプロダクトとして設計します。'
        },
        {
          title: 'デジタルディレクション',
          text: '発信、体験、業務、技術をつなげながら、毎月の優先順位と改善を整理します。'
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
