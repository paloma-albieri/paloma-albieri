'use client';

import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { EpisodeCard } from './EpisodeCard';
import { EpisodeFilter, type EpisodeFilterValue } from './EpisodeFilter';
import type { PortfolioEpisode } from './types';

export function EpisodesExplorer({ episodes }: { episodes: PortfolioEpisode[] }) {
  const t = useTranslations('portfolio');
  const [category, setCategory] = useState<EpisodeFilterValue>('all');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const visible = category === 'all' ? episodes : episodes.filter((episode) => episode.category === category);

  return (
    <section className="container-shell py-10 md:py-12" aria-labelledby="episodes-title">
      <h2 id="episodes-title" className="sr-only">{t('episodes_title')}</h2>
      <EpisodeFilter value={category} onChange={setCategory} ready={ready} />
      <div className="my-7 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="font-mono text-[10px] uppercase tracking-widest text-ink-3">{t('episode_count', { count: visible.length })}</p>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-3"><span className="h-1.5 w-1.5 rounded-full bg-shock" aria-hidden="true" />{t('confidential_label')}</span>
      </div>
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((episode, index) => <EpisodeCard key={episode.id} episode={episode} index={index} />)}
      </div>
      {visible.length === 0 && (
        <div className="border-y border-line py-10">
          <p className="font-serif text-2xl">{t('empty')}</p>
          <button type="button" onClick={() => setCategory('all')} className="mt-5 inline-flex items-center gap-3 text-sm text-shock">
            <RotateCcw size={16} aria-hidden="true" />{t('filters.all')}
          </button>
        </div>
      )}
      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-3">{t('reference_note')}</p>
    </section>
  );
}
