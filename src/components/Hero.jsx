import { useState, useEffect, useRef } from 'react'
import heroVideo from '../../assets/3D.mp4'

function Hero({ copy, layout }) {
  const [flipped, setFlipped] = useState(false)
  const [hot, setHot] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hot) { 
      v.play().catch(() => {})
    } else { 
      v.pause()
      v.currentTime = 0.8
    }
  }, [hot])

  const lineBreaks = copy.heroTitle

  return (
    <section className="hero" id="top">
      <div className={`hero-grid layout-${layout}`}>
        {layout !== 'centered' && (
          <div className="hero-left reveal">
            <div className="eyebrow"><span className="tick" />{copy.eyebrow}</div>
            <h1 className="display">
              {lineBreaks.map((l, i) => (
                <div key={i}>
                  {l.includes(copy.heroItalic)
                    ? <>{l.split(copy.heroItalic)[0]}<em>{copy.heroItalic}</em>{l.split(copy.heroItalic)[1]}</>
                    : l}
                </div>
              ))}
            </h1>
            <p className="hero-tagline">{copy.taglineLeft}</p>
            <div className="meta-list">
              {copy.meta.map(([k, v], i) => (
                <div className="row" key={i}><span>{k}</span><strong>{v}</strong></div>
              ))}
            </div>
          </div>
        )}

        <div className="stage-wrap reveal">
          <div className={`stage-card ${flipped ? 'flipped' : ''}`}>
            <div className="stage-face stage-front">
              <div
                className={`video-frame ${hot ? 'hot' : ''}`}
                onMouseEnter={() => setHot(true)}
                onMouseLeave={() => setHot(false)}
                onClick={() => setFlipped(true)}
              >
                <video 
                  ref={videoRef} 
                  src={heroVideo}
                  muted 
                  playsInline 
                  loop 
                  preload="none"
                  poster="/favicon.svg"
                  aria-label="Vídeo de apresentação da Paloma Albieri" 
                />
                <span className="corner tl" /><span className="corner tr" />
                <span className="corner bl" /><span className="corner br" />
                <div className="hover-hint">{copy.hoverHint}</div>
                <div className="timecode"><span className="rec" />{copy.timecode}</div>
                <div className="cta">{copy.ctaVideo}</div>
              </div>
            </div>
            <div className="stage-face stage-back" id="about">
              <div className="about-card">
                <button 
                  className="close-btn" 
                  onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
                >×</button>
                <div>
                  <div className="about-label">{copy.aboutLabel}</div>
                  <h3>{copy.aboutTitle}</h3>
                  <p>{copy.aboutBody}</p>
                </div>
                <div className="socials">
                  {copy.socials.map((social, i) => {
                    const label = typeof social === 'string' ? social : social.label
                    const href = typeof social === 'string' ? '#' : social.link

                    return (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                        {label} ↗
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {layout !== 'centered' && layout !== 'offset' && (
          <div className="hero-right reveal">
            <div className="eyebrow" style={{ justifyContent: 'flex-end' }}>{copy.role}<span className="tick" /></div>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 3.4vw, 52px)' }}>
              <em style={{ color: 'var(--shock)', fontStyle: 'italic' }}>&quot;</em>
              <br />Strategy<br />meets<br />execution.
            </h2>
            <p className="hero-tagline">{copy.taglineRight}</p>
            <div className="meta-list" style={{ alignSelf: 'flex-end' }}>
              <div className="row"><strong>— 2026</strong><span>Now booking</span></div>
              <div className="row"><strong>3</strong><span>Continents</span></div>
              <div className="row"><strong>12+</strong><span>Products shipped</span></div>
            </div>
          </div>
        )}

        {layout === 'centered' && (
          <div style={{ textAlign: 'center' }} className="reveal">
            <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="tick" />{copy.eyebrow}<span className="tick" /></div>
            <h2 className="display" style={{ marginTop: 24 }}>
              {lineBreaks.map((l, i) => (
                <div key={i}>
                  {l.includes(copy.heroItalic)
                    ? <>{l.split(copy.heroItalic)[0]}<em>{copy.heroItalic}</em>{l.split(copy.heroItalic)[1]}</>
                    : l}
                </div>
              ))}
            </h2>
            <p className="hero-tagline" style={{ margin: '24px auto' }}>{copy.taglineLeft}</p>
          </div>
        )}
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {[...copy.ticker, ...copy.ticker].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </section>
  )
}

export default Hero
