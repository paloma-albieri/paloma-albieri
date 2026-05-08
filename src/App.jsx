import { useState, useEffect } from 'react'
import Cursor from './components/Cursor'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import BigName from './components/BigName'
import Projects from './components/Projects'
import Stacks from './components/Stacks'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Tweaks from './components/Tweaks'
import { useReveal } from './hooks/useReveal'
import { COPY } from './content'


const SEO_BY_LANG = {
  pt: {
    title: 'Paloma Albieri | Estratégia, Produto e Experiência Digital',
    description: 'Paloma Albieri lidera projetos digitais de alto impacto com estratégia, design e engenharia. Transforme sua operação em produto com performance real.',
    ogTitle: 'Paloma Albieri | Estratégia que vira produto e resultado',
    ogDescription: 'Da visão à execução: produtos digitais mais claros, rápidos e escaláveis para marcas que querem crescer com consistência.',
    twitterTitle: 'Paloma Albieri | Estratégia que vira produto e resultado',
    twitterDescription: 'Projetos digitais com direção estratégica, execução técnica e foco total em performance, conversão e experiência.',
    ogLocale: 'pt_BR'
  },
  en: {
    title: 'Paloma Albieri | Strategy, Product and Digital Experience',
    description: 'Paloma Albieri leads high-impact digital projects with strategy, design, and engineering. Turn your operation into product with real performance.',
    ogTitle: 'Paloma Albieri | Strategy transformed into product and results',
    ogDescription: 'From vision to execution: clearer, faster, and scalable digital products for brands ready to grow consistently.',
    twitterTitle: 'Paloma Albieri | Strategy transformed into product and results',
    twitterDescription: 'Digital projects with strategic direction, technical execution, and full focus on performance, conversion, and experience.',
    ogLocale: 'en_US'
  },
  jp: {
    title: 'Paloma Albieri | 戦略・プロダクト・デジタル体験',
    description: 'Paloma Albieriは、戦略・デザイン・エンジニアリングを統合し、高インパクトなデジタルプロジェクトを推進します。',
    ogTitle: 'Paloma Albieri | 戦略をプロダクトと成果へ',
    ogDescription: '構想から実行まで。明確で高速かつスケーラブルなデジタルプロダクトを一貫して提供します。',
    twitterTitle: 'Paloma Albieri | 戦略をプロダクトと成果へ',
    twitterDescription: '戦略的ディレクションと技術実行で、パフォーマンス・コンバージョン・体験を最大化します。',
    ogLocale: 'ja_JP'
  }
}

const TWEAK_DEFAULTS = {
  layout: 'offset',
  type: 'editorial',
  theme: 'light',
  cursor: true,
  lang: 'pt'
}

const VALID_LANGS = new Set(['pt', 'en', 'jp'])

function App() {
  const [settings, setSettings] = useState(TWEAK_DEFAULTS)
  const [lang, setLang] = useState(() => {
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    return VALID_LANGS.has(urlLang) ? urlLang : (TWEAK_DEFAULTS.lang || 'pt')
  })
  const [tweaksOpen, setTweaksOpen] = useState(false)
  const copy = COPY[lang]

  useReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
    document.documentElement.setAttribute('data-type', settings.type)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : (lang === 'jp' ? 'ja' : 'en')

    const seo = SEO_BY_LANG[lang] || SEO_BY_LANG.pt
    document.title = seo.title

    const setMeta = (selector, content) => {
      const element = document.querySelector(selector)
      if (element && content) element.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', seo.description)
    setMeta('meta[property="og:title"]', seo.ogTitle)
    setMeta('meta[property="og:description"]', seo.ogDescription)
    setMeta('meta[property="og:locale"]', seo.ogLocale)
    setMeta('meta[name="twitter:title"]', seo.twitterTitle)
    setMeta('meta[name="twitter:description"]', seo.twitterDescription)

    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`)
  }, [settings.theme, settings.type, lang])

  // Edit mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true)
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false)
    }
    window.addEventListener('message', handler)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')
    return () => window.removeEventListener('message', handler)
  }, [])

  const updateSettings = (next) => {
    setSettings(next)
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*')
  }

  return (
    <>
      <Cursor enabled={settings.cursor} />
      <header>
        <Topbar lang={lang} setLang={setLang} copy={copy} />
      </header>
      <main>
        <Hero copy={copy} layout={settings.layout} />
        <BigName text={copy.bigName} />
        <Projects copy={copy} />
        <Stacks copy={copy} />
        <Contact copy={copy} />
      </main>
      <Footer copy={copy} />
      <Tweaks open={tweaksOpen} setOpen={setTweaksOpen} settings={settings} setSettings={updateSettings} />
    </>
  )
}

export default App
