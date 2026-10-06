'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight, ChevronUp, Clock3, Film } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import type { PortfolioEpisode } from './types';

const factKeys = ['bottleneck', 'architecture', 'market', 'outcome'] as const;
const actKeys = ['conflict', 'investigation', 'engineering', 'impact'] as const;

export function EpisodeCard({ episode, index }: { episode: PortfolioEpisode; index: number }) {
  const t = useTranslations('portfolio');
  const reduced = useReducedMotion();
  return (
    <m.article className="portfolio-reveal min-w-0 rounded-sm border border-line bg-paper-2 p-5 text-ink sm:p-6"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.06, ease: 'easeOut' }}
      aria-labelledby={`episode-${episode.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-wider">
        <p className="border-b-2 border-shock pb-2 text-shock">{t('doc_badge', { number: episode.number })}</p>
        <p className="inline-flex items-center gap-2 text-ink-3"><Clock3 size={14} strokeWidth={1} aria-hidden="true" />{t('reading_time', { minutes: episode.minutes })}</p>
      </div>
      <figure className="relative mt-6 overflow-hidden rounded-sm border border-line bg-paper p-4 sm:p-5">
        <div className="episode-poster-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative min-w-0">
          <div className="mb-6 flex items-center justify-between gap-3">
            <Film size={20} strokeWidth={1} className="shrink-0 text-ink-3" aria-hidden="true" />
            <figcaption className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink-3">{t('diagram_label')}</figcaption>
          </div>
          <ArchitectureDiagram category={episode.category} nodes={episode.diagram} />
        </div>
      </figure>
      <h2 id={`episode-${episode.id}`} className="mt-7 font-serif text-3xl font-semibold leading-tight">{episode.title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-ink-3">{episode.tagline}</p>
      <dl className="mt-7 grid grid-cols-2 gap-x-5">
        {factKeys.map((key) => (
          <div key={key} className="min-w-0 border-t border-line py-4">
            <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-3">{t(`facts.${key}`)}</dt>
            <dd className="mt-2 text-sm leading-relaxed">{episode.facts[key]}</dd>
          </div>
        ))}
      </dl>
      <details className="group/details mt-4 border-t border-line">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm text-shock transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shock [&::-webkit-details-marker]:hidden">
          <span>{t('read_backstage')}</span>
          <ArrowUpRight size={18} strokeWidth={1} className="shrink-0 group-open/details:hidden" aria-hidden="true" />
          <ChevronUp size={18} strokeWidth={1} className="hidden shrink-0 group-open/details:block" aria-hidden="true" />
        </summary>
        <div className="grid gap-7 border-t border-line pb-3 pt-6">
          {actKeys.map((key, actIndex) => (
            <section key={key} aria-labelledby={`episode-${episode.id}-${key}`}>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-shock">{t('act_badge', { number: String(actIndex + 1).padStart(2, '0') })}</p>
              <h3 id={`episode-${episode.id}-${key}`} className="font-serif text-2xl font-semibold">{t(`acts.${key}`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">{episode.acts[key]}</p>
              {key === 'engineering' && <div className="mt-5"><ArchitectureDiagram category={episode.category} nodes={episode.diagram} /></div>}
            </section>
          ))}
        </div>
      </details>
    </m.article>
  );
}
