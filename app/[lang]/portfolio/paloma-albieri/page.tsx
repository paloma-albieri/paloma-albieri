import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { buildMetadata } from '@/lib/seo/metadata';
import { isLocale, type Locale } from '@/lib/i18n/config';

type CaseItem = {
  title: string;
  text: string;
};

type CaseToolGroup = {
  title: string;
  tools: string[];
};

type ColorToken = {
  name: string;
  value: string;
  className: string;
};

const colorTokens: ColorToken[] = [
  { name: 'Ink', value: 'oklch(.14 .01 270)', className: 'bg-ink-dark' },
  { name: 'Paper', value: 'oklch(.985 .003 60)', className: 'bg-paper-light' },
  { name: 'Rose', value: 'oklch(.93 .055 10)', className: 'bg-paper-rose' },
  { name: 'Shock', value: 'oklch(.68 .24 8)', className: 'bg-shock' }
];

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'pt';
  return buildMetadata(lang, 'portfolio/paloma-albieri');
}

export default function PalomaAlbieriCasePage({ params }: { params: { lang: Locale } }) {
  const t = useTranslations('portfolio.paloma_case');
  const research = t.raw('research') as CaseItem[];
  const process = t.raw('process') as CaseItem[];
  const tools = t.raw('tools') as CaseToolGroup[];
  const proof = t.raw('proof') as string[];
  const resultHighlights = t.raw('result_highlights') as string[];

  return (
    <main className="bg-paper-light pt-24 text-ink-dark">
      <section className="container-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="label-mono mb-8 text-shock">{t('overline')}</p>
            <h1 className="display-h1 max-w-[11ch]">{t('title')}</h1>
          </div>
          <div className="flex flex-col justify-end lg:pb-3">
            <p className="body-lead text-ink-dark">{t('lead')}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {proof.map((item) => (
                <span key={item} className="label-mono border border-ink-dark px-3 py-3 text-[10px]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-dark bg-paper-rose">
        <div className="container-shell grid gap-10 py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <p className="label-mono text-ink-dark">{t('thesis_label')}</p>
          <p className="font-display text-[clamp(34px,5vw,72px)] font-light leading-[0.96] tracking-[-0.03em]">
            {t('thesis')}
          </p>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="label-mono mb-8 text-ink-3">{t('research_label')}</p>
            <h2 className="display-h2 max-w-[9ch]">{t('research_title')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {research.map((item) => (
              <article key={item.title} className="interactive-card border border-ink-dark bg-paper-light p-6">
                <h3 className="label-mono mb-6 text-shock">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-dark">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="container-shell section-pad">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="label-mono mb-8 text-ink-3">{t('design_label')}</p>
              <h2 className="display-h2 max-w-[10ch]">{t('design_title')}</h2>
              <p className="body-lead mt-8 text-ink-2">{t('design_text')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {colorTokens.map((color) => (
                <article key={color.name} className="border border-line bg-paper-2 p-5">
                  <div className={`mb-6 h-28 border border-line ${color.className}`} />
                  <p className="label-mono text-ink">{color.name}</p>
                  <p className="mt-2 font-mono text-[10px] text-ink-3">{color.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="label-mono mb-8 text-ink-3">{t('process_label')}</p>
            <h2 className="max-w-[11ch] font-display text-[clamp(42px,5vw,76px)] font-light leading-[0.96] tracking-[-0.03em]">
              {t('process_title')}
            </h2>
          </div>
          <div className="min-w-0 flex flex-col border-t border-ink-dark">
            {process.map((item, index) => (
              <article key={item.title} className="grid gap-6 border-b border-ink-dark py-8 md:grid-cols-[120px_1fr]">
                <p className="label-mono text-shock">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="display-h3">{item.title}</h3>
                  <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-ink-3">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-rose">
        <div className="container-shell section-pad">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="label-mono mb-8 text-ink-dark">{t('tools_label')}</p>
              <h2 className="display-h2 max-w-[10ch]">{t('tools_title')}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((group) => (
                <article key={group.title} className="interactive-card border border-ink-dark bg-paper-light p-6">
                  <h3 className="label-mono mb-5 text-shock">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <span key={tool} className="label-mono border border-ink-dark px-3 py-2 text-[10px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="overflow-hidden border border-ink-dark bg-paper-light">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <div className="min-w-0 p-6 sm:p-10 lg:pr-14">
              <p className="label-mono mb-10 text-shock">{t('closing_label')}</p>
              <p className="max-w-[13ch] font-display text-[clamp(40px,4.7vw,68px)] font-light leading-[0.98] tracking-[-0.03em]">
                <span className="block text-shock">{t('closing_name')}</span>
                <span>{t('closing_line_1')}</span>
                <span className="mx-1 inline-block bg-ink-dark px-2 text-paper-light">{t('closing_method')}</span>
                <span>{t('closing_line_2')}</span>
                <span className="decoration-shock decoration-[3px] underline underline-offset-8">
                  {t('closing_outcome')}
                </span>
                <span>.</span>
              </p>
              <p className="body-lead mt-8 text-ink-dark">{t('closing_support')}</p>
              <a href={`/${params.lang}#contato`} className="cta-pill cta-filled-shock mt-10">
                <span>{t('cta')}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <aside className="min-w-0 border-t border-ink-dark bg-paper-rose p-6 sm:p-10 lg:border-l lg:border-t-0">
              <p className="label-mono mb-8 text-ink-dark">{t('result_stack_label')}</p>
              <div className="grid gap-3">
              {resultHighlights.map((item, index) => (
                <div
                  key={item}
                  className="interactive-card border border-ink-dark bg-paper-light p-4 sm:p-5"
                >
                  <p className="label-mono mb-4 text-shock">{String(index + 1).padStart(2, '0')}</p>
                  <p className="text-sm leading-relaxed text-ink-dark">{item}</p>
                </div>
              ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
