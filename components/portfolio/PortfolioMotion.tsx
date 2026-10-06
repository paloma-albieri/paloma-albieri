'use client';

import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'framer-motion';

export function PortfolioMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <noscript><style>{'.portfolio-reveal { opacity: 1 !important; transform: none !important; }'}</style></noscript>
      </MotionConfig>
    </LazyMotion>
  );
}

export function PortfolioMotion({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <m.div className={`portfolio-reveal ${className}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}>
      {children}
    </m.div>
  );
}
