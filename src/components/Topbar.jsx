function Topbar({ lang, setLang, copy }) {
  return (
    <div className="topbar">
      <a href="#top" className="logo">
        <span className="star" />
        <span>Paloma<em style={{ fontStyle: 'italic', color: 'var(--shock)' }}> Albieri</em></span>
      </a>
      <div className="nav">
        {copy.nav.map((n, i) => (
          <a key={i} href={['#work','#stacks','#about','#contact'][i]}>{n}</a>
        ))}
      </div>
      <div className="top-right">
        <span className="status-pill"><span className="led" />{copy.status}</span>
        <div className="lang-toggle">
          <button className={lang==='pt'?'active':''} onClick={() => setLang('pt')}>PT</button>
          <button className={lang==='en'?'active':''} onClick={() => setLang('en')}>EN</button>
          <button className={lang==='jp'?'active':''} onClick={() => setLang('jp')}>JP</button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
