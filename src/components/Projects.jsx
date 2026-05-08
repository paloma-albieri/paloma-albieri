import { useState } from 'react'

function Projects({ copy }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section id="work" className="work-section">
      <div className="section-wrap">
        <div className="section-bar reveal">
          <div className="section-label"><span className="dot" />• {copy.projectsLabel}</div>
          <h2 className="display">
            {copy.projectsTitle}<em>{copy.projectsTitleItalic}</em>{copy.projectsTitleRest}
          </h2>
        </div>

        <div className="chapters">
          {copy.chapters.map((ch, i) => (
            <div 
              key={i} 
              className={`chapter ${expandedId === i ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expandedId === i ? null : i)}
            >
              <div className="ch-head">
                <div className="ch-num">{ch.num}</div>
                <div className="ch-titles">
                  <div className="ch-kicker">{ch.kicker}</div>
                  <h3>{ch.title}<em>{ch.titleItalic}</em></h3>
                </div>
              </div>
              
              {expandedId === i && (
                <>
                  <p className="ch-copy">{ch.copy}</p>
                  
                  <div className="ch-meta">
                    <div className="ch-stacks">
                      <span className="label">{copy.projectStackLabel || 'Stack'}</span>
                      <div className="stack-list">
                        {ch.stacks.map((s, j) => (
                          <div key={j} className="stack-cell">{s}</div>
                        ))}
                      </div>
                    </div>
                    <div className="ch-metrics">
                      <span className="label">{copy.projectResultsLabel || 'Results'}</span>
                      {ch.metrics.map(([val, label], j) => (
                        <div key={j} className="metric">
                          <strong>{val}</strong>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              <div className="ch-bg">{ch.bgWord}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
