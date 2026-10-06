import { ArrowRight, Compass, Database, Globe2, Languages, Layout, MessageCircle, Route, Workflow } from 'lucide-react';
import type { EpisodeCategory } from './types';

const diagramIcons = {
  presence: [Compass, Layout, MessageCircle],
  structure: [Workflow, Route, Database],
  global: [Globe2, Languages, Globe2]
};

export function ArchitectureDiagram({ category, nodes }: { category: EpisodeCategory; nodes: [string, string, string] }) {
  const icons = diagramIcons[category];
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_12px_minmax(0,1fr)_12px_minmax(0,1fr)] items-center gap-1.5">
      {nodes.map((node, index) => {
        const Icon = icons[index];
        return (
          <div key={node} className="contents">
            <div className="flex min-h-20 min-w-0 flex-col items-center justify-center gap-3 rounded-sm border border-line bg-paper-2 px-1.5 py-3 text-center">
              <Icon size={22} strokeWidth={1} className="text-shock" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink">{node}</span>
            </div>
            {index < nodes.length - 1 && <ArrowRight size={12} strokeWidth={1} className="text-ink-3" aria-hidden="true" />}
          </div>
        );
      })}
    </div>
  );
}
