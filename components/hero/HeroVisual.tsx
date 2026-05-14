'use client';

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
      className="hero-visual-frame relative aspect-[4/5] min-h-[360px] overflow-hidden border border-ink-dark bg-paper-rose sm:aspect-[16/10] lg:aspect-[9/12] lg:min-h-0"
    >
      <video
        className="h-full w-full object-cover"
        src="/assets/3D.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Vídeo visual de apresentação da Paloma Albieri"
      />
      <div className="pointer-events-none absolute inset-0 border-[12px] border-paper-light/20" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-shock">
        <span className="label-mono text-[10px]">{meta}</span>
        <span className="pulse-dot h-2 w-2 rounded-full bg-shock" aria-hidden="true" />
      </div>
    </div>
  );
}
