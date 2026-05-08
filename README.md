# Paloma Albieri — React + Vite

Um portfólio moderno de Paloma Albieri transformado em um projeto **React + Vite**.

## 🚀 Como começar

### Pré-requisitos
- Node.js 16+ e npm (ou yarn/pnpm)

### Instalação

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# O navegador abrirá automaticamente em http://localhost:3000
```

### Build para produção

```bash
# Crie uma build otimizada
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do projeto

```
src/
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
├── styles.css             # Estilos globais
├── content.js             # Conteúdo e traduções (PT, EN, JP)
├── components/
│   ├── Cursor.jsx         # Cursor customizado
│   ├── Topbar.jsx         # Navegação superior
│   ├── Hero.jsx           # Seção hero com vídeo
│   ├── BigName.jsx        # Marquee com nome
│   ├── Projects.jsx       # Seção de projetos/cases
│   ├── Stacks.jsx         # Seção de skills e ferramentas
│   ├── Contact.jsx        # Seção de contato e formulário
│   ├── Footer.jsx         # Rodapé
│   └── Tweaks.jsx         # Painel de configurações
└── hooks/
    ├── useReveal.js       # Hook para animação de reveal
    └── useScroll.js       # Hook para tracking de scroll

public/
└── assets/
    └── 3D.mp4            # Vídeo hero
```

## 🎨 Recursos principais

- **React 18** com Hooks modernos
- **Vite** para build ultrarrápido
- **Sistema de temas** (Light/Dark)
- **Múltiplos idiomas** (PT, EN, JP)
- **Cursor customizado** dinâmico
- **Animações suaves** com Intersection Observer
- **Design responsivo** mobile-first
- **Formulário de contato** funcional
- **Painel de tweaks** para customização em tempo real

## 🌍 Suporte a idiomas

O site suporta 3 idiomas nativamente:
- 🇧🇷 Português (PT)
- 🇬🇧 Inglês (EN)
- 🇯🇵 Japonês (JP)

Altere o idioma usando os botões na barra superior.

## ⚙️ Configuração

### Tema
Alterne entre os temas "light" e "dark" usando o painel de Tweaks (canto inferior direito).

### Tipografia
Escolha entre os tipos de fonte:
- Editorial (padrão)
- Grotesk
- Mono
- Classic

### Layout
Customize o layout do hero:
- Offset (padrão)
- Editorial
- Centered

## 📝 Customização

### Editar conteúdo
Todo o conteúdo está em `src/content.js`. Adicione ou edite as traduções conforme necessário.

### Modificar estilos
O arquivo `src/styles.css` contém todos os estilos CSS. As variáveis de tema estão no `:root`.

### Adicionar novos componentes
Crie arquivos `.jsx` na pasta `src/components/` e importe em `App.jsx`.

## 🚀 Deploy

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Faça upload da pasta `dist/` para o Netlify
```

### GitHub Pages
Configure o deploy automático através das Actions do GitHub.

## 📦 Dependências principais

- **react** - UI library
- **react-dom** - React para web
- **vite** - Build tool ultrarrápido

## 📄 Licença

© 2026 Paloma Albieri. Todos os direitos reservados.

---

**Made in Brazil & Japan** 🇧🇷 ⇄ 🇯🇵
