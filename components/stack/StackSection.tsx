import { useTranslations } from 'next-intl';

const stacks = [
  ['Design', ['Figma', 'Adobe CC']],
  ['Frontend', ['Next.js', 'React', 'TypeScript', 'Tailwind']],
  ['Dados', ['Supabase', 'PostgreSQL']],
  ['Infra', ['Docker', 'Netlify']]
] as const;

export function StackSection() {
  const t = useTranslations('stack');

  return (
    <section className="bg-paper text-ink" id="stacks">
      <div className="container-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <div>
            <p className="label-mono mb-8 text-ink-2">{t('marker')}</p>
            <h2 className="display-h2 max-w-[11ch]">{t('h2')}</h2>
          </div>
          <div className="lg:pt-20">
            <p className="body-lead text-ink-2">{t('sub')}</p>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stacks.map(([title, tools]) => (
            <section key={title} className="border border-line bg-paper-2 p-6">
              <h3 className="label-mono mb-5 text-ink">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="label-mono border border-line px-3 py-2 text-[10px] text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="label-mono mt-10 text-ink-3">{t('footer_note')}</p>
      </div>
    </section>
  );
}
