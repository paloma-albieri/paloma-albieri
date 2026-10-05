'use client';

import { ArrowUpRight, Layers3, ScanLine, Sparkles } from 'lucide-react';
import { useRef } from 'react';

type HeroVisualProps = {
  meta: string;
};

export function HeroVisual({ meta }: HeroVisualProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;

    const bounds = frame.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    frame.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
    frame.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
    frame.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    frame.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  }

  function resetTilt() {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty('--tilt-x', '0deg');
    frame.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="hero-visual-frame magazine-collage relative aspect-[4/5] min-h-[420px] overflow-hidden border border-ink-dark bg-paper-light sm:aspect-[16/10] lg:aspect-[9/12] lg:min-h-0"
    >
      <div className="paper-grain" aria-hidden="true" />
      <div className="cutout cutout-hero-title">
        <span className="label-mono">01 / FIELD NOTES</span>
        <strong>Digital em partes.</strong>
      </div>
      <div className="cutout cutout-shock">
        <Sparkles size={22} strokeWidth={1.7} />
        <span>clareza</span>
      </div>
      <div className="cutout cutout-blue">
        <Layers3 size={26} strokeWidth={1.6} />
        <span>estrutura</span>
      </div>
      <div className="cutout cutout-outline">
        <ScanLine size={28} strokeWidth={1.4} />
        <span>triagem</span>
      </div>
      <div className="magazine-strip" aria-hidden="true">
        <span>presenca</span>
        <span>processo</span>
        <span>site</span>
        <span>sistema</span>
      </div>
      <div className="magazine-arrow" aria-hidden="true">
        <ArrowUpRight size={54} strokeWidth={1.1} />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 bg-ink-dark px-3 py-2 text-paper-light">
        <span className="label-mono text-[10px]">{meta}</span>
        <span className="pulse-dot h-2 w-2 rounded-full bg-shock" aria-hidden="true" />
      </div>
    </div>
  );
}
