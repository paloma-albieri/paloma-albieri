function Stacks({ copy }) {
  const stacks = [
    { cat: 'Design', tools: ['Figma', 'Adobe Creative Suite'] },
    { cat: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { cat: 'Backend', tools: ['Node.js', 'TypeScript', 'PostgreSQL', 'Supabase'] },
    { cat: 'DevOps', tools: ['Vercel', 'Docker', 'GitHub Actions', 'AWS'] },
  ]

  return (
    <section id="stacks" className="stacks-section">
      <div className="section-wrap">
        <div className="section-bar reveal">
          <div className="section-label"><span className="dot" />• {copy.stacksLabel}</div>
          <h2 className="display">
            {copy.stacksTitle[0]}<em>{copy.stacksTitle[1]}</em>{copy.stacksTitle[2]}
          </h2>
          <p className="stacks-desc">{copy.stacksBody}</p>
        </div>

        <div className="stacks-grid reveal">
          {stacks.map((section, i) => (
            <div key={i} className="stack-section">
              <h3>{section.cat}</h3>
              <div className="stack-tools">
                {section.tools.map((tool, j) => (
                  <span key={j} className="tag">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stacks
