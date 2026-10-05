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

type DiagnosticContent = {
  eyebrow: string;
  title: string;
  lead: string;
  details: { title: string; text: string }[];
  cta: string;
};

export const tracks: Record<Locale, Record<TrackKey, TrackContent>> = {
  pt: {
    presenca: {
      key: 'presenca',
      label: 'Trilha Presenca',
      homeTitle: 'Aparecer e ser entendida',
      title: 'Presenca digital para quem chega e nao sabe o que fazer depois.',
      symptom: 'As pessoas chegam pelo Instagram, indicacao ou busca, mas o caminho ate o contato ainda esta confuso.',
      summary:
        'Organizo mensagem, conteudo, canais e proximos passos para a marca aparecer com clareza e transformar atencao em conversa.',
      services: [
        'Diagnostico Digital',
        'Estrategia de Presenca',
        'Gestao de Conteudo',
        'Reposicionamento de marca',
        'Gestao de Trafego Pago',
        'Acompanhamento Estrategico'
      ],
      tools: [
        { title: 'Pensar a direcao', text: 'Leitura do negocio, publico, mensagem, concorrencia e caminho de confianca.' },
        { title: 'Criar a presenca', text: 'Linha editorial, conteudo, identidade aplicada e paginas de conversao.' },
        { title: 'Publicar e vender', text: 'Calendario, Instagram, WhatsApp, landing pages e chamadas claras para contato.' },
        { title: 'Medir e melhorar', text: 'Leitura de dados, ajustes mensais, anuncios e melhoria continua.' }
      ],
      proof:
        'A propria marca Paloma Albieri funciona como case vivo: conteudo, site, estrategia e formulario trabalham juntos para gerar conversa qualificada.',
      cta: 'Quero organizar minha presenca'
    },
    estrutura: {
      key: 'estrutura',
      label: 'Trilha Estrutura',
      homeTitle: 'Funcionar sem improviso',
      title: 'Estrutura digital para processo que nao pode depender de memoria.',
      symptom: 'Seu atendimento, cadastro, venda ou organizacao interna ainda depende de alguem lembrar o proximo passo.',
      summary:
        'Construo bases digitais simples e evolutivas: paginas, sites, formularios, automacoes e sistemas internos por fases.',
      services: ['Landing Page', 'Site Institucional', 'Automacao e Organizacao Digital', 'Sistema Interno'],
      tools: [
        { title: 'Construir a base', text: 'Next.js, React, TypeScript, Tailwind, Supabase, PostgreSQL e GitHub.' },
        { title: 'Organizar processos', text: 'Formularios, bancos simples, fluxos de atendimento, automacoes e paineis.' },
        { title: 'Abrir escopo por fases', text: 'Primeiro o que destrava, depois o que escala. Sem empilhar complexidade cedo demais.' },
        { title: 'Traduzir tecnologia', text: 'Explico o que cada parte faz para a pessoa decidir com clareza, nao por susto.' }
      ],
      proof:
        'No Japao, sai da linha de producao para TI e construi sozinha um sistema interno em React, TypeScript, Postgres e Docker usado por 14 setores. Miaucafe e Construtora Connect ficam como arquivos privados de estrutura e presenca.',
      cta: 'Quero estruturar meu processo'
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
      services: ['デジタル診断', '発信戦略', 'コンテンツ運用', 'ブランド再整理', '広告運用', '戦略サポート'],
      tools: [
        { title: '方向性を考える', text: '事業、顧客、メッセージ、競合、信頼までの流れを確認します。' },
        { title: '見せ方を作る', text: '投稿設計、ビジュアル、ページ、問い合わせ導線を整えます。' },
        { title: '公開して売る', text: 'Instagram、WhatsApp、ランディングページ、明確なCTAを組みます。' },
        { title: '測って改善する', text: '数字を見ながら、内容、広告、導線を継続的に調整します。' }
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
      services: ['ランディングページ', '企業サイト', '自動化とデジタル整理', '社内システム'],
      tools: [
        { title: '土台を作る', text: 'Next.js、React、TypeScript、Tailwind、Supabase、PostgreSQL、GitHub。' },
        { title: '流れを整理する', text: 'フォーム、簡単なデータベース、問い合わせ管理、基本的な自動化。' },
        { title: '段階で進める', text: 'まず止まっている所を直し、その後で拡張します。' },
        { title: '技術を翻訳する', text: '何を作るのか、なぜ必要なのかを分かる言葉で説明します。' }
      ],
      proof:
        '日本の製造現場でライン作業から社内IT担当になり、React、TypeScript、Postgres、Dockerで14部門が使う社内システムを一人で作りました。',
      cta: '仕組みを相談する'
    }
  }
};

export const diagnostics: Record<Locale, DiagnosticContent> = {
  pt: {
    eyebrow: 'Diagnostico Estrategico Digital',
    title: 'Uma entrega paga para entender prioridade, caminho e escopo antes de executar.',
    lead:
      'Depois da triagem inicial, o diagnostico aprofunda o cenario e organiza um dossie com leitura do problema, frente prioritaria, riscos, proximos passos e recomendacao de execucao.',
    details: [
      { title: 'Entrada', text: 'A triagem publica vem antes. Eu analiso o contexto e so convido para conversa quando houver aderencia.' },
      { title: 'Entrega', text: 'Dossie em Notion e PDF, apresentacao on-line e uma rodada de esclarecimentos por periodo definido.' },
      { title: 'Uso', text: 'Serve para decidir se o proximo passo e presenca, processos, sistema, acompanhamento ou pausa estrategica.' }
    ],
    cta: 'Solicitar triagem'
  },
  jp: {
    eyebrow: 'デジタル戦略診断',
    title: '制作前に、優先順位と進め方を整理する有料診断。',
    lead:
      '初回チェックのあと、課題、優先領域、リスク、次の進め方を整理し、NotionとPDFで診断資料を作ります。',
    details: [
      { title: '入口', text: 'まず公開フォームで状況を確認します。内容を見て、合う場合だけ15分相談を案内します。' },
      { title: '納品', text: 'NotionとPDFの診断資料、オンライン説明、一定期間の確認対応を含みます。' },
      { title: '使い方', text: '発信、業務整理、システム、伴走、または今は進めない判断のために使います。' }
    ],
    cta: '初回チェックを送る'
  }
};
