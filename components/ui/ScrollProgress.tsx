'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[oklch(.14_.01_270_/_0.12)]"
      aria-hidden="true"
    >
      <div className="h-full origin-left bg-shock" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
