'use client';

import { Compass, Film, Globe2, Workflow } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import type { EpisodeCategory } from './types';

export type EpisodeFilterValue = EpisodeCategory | 'all';
const filters = [
  { value: 'all', icon: Film },
  { value: 'presence', icon: Compass },
  { value: 'structure', icon: Workflow },
  { value: 'global', icon: Globe2 }
] as const;

export function EpisodeFilter({ value, onChange, ready }: {
  value: EpisodeFilterValue;
  onChange: (value: EpisodeFilterValue) => void;
  ready: boolean;
}) {
  const t = useTranslations('portfolio');
  return (
    <fieldset className="min-w-0" disabled={!ready}>
      <legend className="sr-only">{t('filter_label')}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const selected = filter.value === value;
          return (
            <button key={filter.value} type="button" aria-pressed={selected} onClick={() => onChange(filter.value)}
              className={clsx('flex min-h-16 min-w-0 items-center gap-3 rounded-sm border px-4 py-3 text-left font-mono text-[10px] uppercase leading-relaxed tracking-widest transition-colors hover:border-shock/60 hover:text-ink',
                selected ? 'border-shock bg-paper-2 text-ink' : 'border-line bg-transparent text-ink-3')}>
              <Icon size={18} strokeWidth={1} className={clsx('shrink-0', selected && 'text-shock')} aria-hidden="true" />
              <span className="min-w-0">{t(`filters.${filter.value}`)}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
