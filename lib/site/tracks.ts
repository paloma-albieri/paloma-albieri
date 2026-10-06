import type { Locale } from '@/lib/i18n/config';

export type TrackKey = 'presenca' | 'estrutura';

type TrackContent = {
  key: TrackKey;
  label: string;
  homeTitle: string;
  title: string;
  symptom: string;
  summary: string;
  services: string[];
  tools: { title: string; text: string }[];
  proof: string;
  cta: string;
};

export const tracks: Record<Locale, Record<TrackKey, TrackContent>> = {
  pt: {
    presenca: {
      key: 'presenca',
      label: '01 · TRILHA PRESENÇA',
      homeTitle: 'Posicionamento & Percepção de Alto Valor',
      title: 'Presenca digital para quem chega e nao sabe o que fazer depois.',
      symptom: 'Seus clientes chegam por indicação ou redes sociais, mas o fluxo até o contato ainda é confuso.',
      summary:
        'Estruturo sua mensagem de marca, páginas de conversão e esteira de entrada para transformar atenção em conversas qualificadas e contratações rápidas.',
      services: [
        'Diagnostico Estrategico Digital',
        'Sites & Experiencias Web',
        'Direcao de conteudo e comunicacao',
        'Direcao Digital'
      ],
      tools: [
        { title: 'Pensar a direcao', text: 'Leitura do negocio, publico, mensagem, concorrencia e caminho de confianca.' },
        { title: 'Criar a experiencia', text: 'Mensagem, hierarquia, paginas, formulario e chamadas claras para contato.' },
        { title: 'Conectar canais', text: 'Instagram, WhatsApp, site, agenda e pontos de conversao trabalhando juntos.' },
        { title: 'Medir e decidir', text: 'Leitura de dados essenciais, prioridades e proximos ciclos com criterio.' }
      ],
      proof:
        'A propria marca Paloma Albieri funciona como case vivo: conteudo, site, estrategia e formulario trabalham juntos para gerar conversa qualificada.',
      cta: 'Quero estruturar meu posicionamento'
    },
    estrutura: {
      key: 'estrutura',
      label: '02 · TRILHA ESTRUTURA',
      homeTitle: 'Arquitetura Web & Eficiência Operacional',
      title: 'Estrutura digital para processo que nao pode depender de memoria.',
      symptom: 'Sua venda, atendimento ou organização interna ainda dependem do envio manual de links e de processos improvisados.',
      summary:
        'Desenvolvo ecossistemas digitais sustentáveis: sites institucionais, automações com IA e fluxos estruturados para sua empresa rodar com previsibilidade.',
      services: ['Sites & Experiencias Web', 'Automacao, IA & Processos', 'Sistemas & Produtos Digitais', 'Direcao Digital'],
      tools: [
        { title: 'Construir a base', text: 'Next.js, React, TypeScript, Tailwind, Supabase, PostgreSQL e GitHub.' },
        { title: 'Organizar processos', text: 'Formularios, CRM, fluxos de atendimento, automacoes, IA delimitada e paineis.' },
        { title: 'Abrir escopo por fases', text: 'Diagnostico ou discovery quando houver incerteza, depois implementacao com criterios claros.' },
        { title: 'Traduzir tecnologia', text: 'Explico o que cada parte faz para a pessoa decidir com clareza, nao por susto.' }
      ],
      proof:
        'No Japao, sai da linha de producao para TI e construi sozinha um sistema interno em React, TypeScript, Postgres e Docker usado por 14 setores.',
      cta: 'Quero automatizar minha operação'
    }
  },
  jp: {
    presenca: {
      key: 'presenca',
      label: '発信の導線',
      homeTitle: '伝わり、理解される',
      title: '見に来た人が、次に何をすればよいか分かる発信へ。',
      symptom: 'Instagram、紹介、検索から人は来ているのに、問い合わせまでの流れがまだ曖昧な状態です。',
      summary:
        'ブランドの伝え方、投稿、媒体、次の行動を整理し、見られるだけで終わらない導線を作ります。',
      services: ['デジタル戦略診断', 'Webサイト・Web体験', 'コンテンツとコミュニケーションの方向性', 'デジタルディレクション'],
      tools: [
        { title: '方向性を考える', text: '事業、顧客、メッセージ、競合、信頼までの流れを確認します。' },
        { title: '体験を作る', text: 'メッセージ、ページ、フォーム、明確なCTAを整えます。' },
        { title: '導線をつなげる', text: 'Instagram、WhatsApp、サイト、予約導線を一つの流れとして見ます。' },
        { title: '測って判断する', text: '必要な数字を見て、優先順位と次のサイクルを決めます。' }
      ],
      proof:
        'Paloma Albieri自身のブランドが実例です。コンテンツ、サイト、戦略、フォームが一つの問い合わせ導線として動いています。',
      cta: '発信を相談する'
    },
    estrutura: {
      key: 'estrutura',
      label: '仕組みの設計',
      homeTitle: '場当たりではなく動く',
      title: '人が覚えておかなくても進む、デジタルの土台へ。',
      symptom: '問い合わせ、予約、販売、社内整理が、まだ誰かの記憶や手作業に頼っている状態です。',
      summary:
        'ページ、サイト、フォーム、自動化、社内システムを段階的に作り、事業の流れを整理します。',
      services: ['Webサイト・Web体験', '自動化・AI・業務プロセス', 'システム・デジタルプロダクト', 'デジタルディレクション'],
      tools: [
        { title: '土台を作る', text: 'Next.js、React、TypeScript、Tailwind、Supabase、PostgreSQL、GitHub。' },
        { title: '流れを整理する', text: 'フォーム、CRM、問い合わせ管理、自動化、限定的なAI活用。' },
        { title: '段階で進める', text: '不確実性が高い時は診断やDiscoveryから始め、基準を決めて実装します。' },
        { title: '技術を翻訳する', text: '何を作るのか、なぜ必要なのかを分かる言葉で説明します。' }
      ],
      proof:
        '日本の製造現場でライン作業から社内IT担当になり、React、TypeScript、Postgres、Dockerで14部門が使う社内システムを一人で作りました。',
      cta: '仕組みを相談する'
    }
  }
};
