'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 'none' | 'short' | 'medium' | 'long';
};

export function ScrollReveal({ children, className, delay = 'none' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx('reveal-on-scroll', `reveal-delay-${delay}`, isVisible && 'is-visible', className)}
    >
      {children}
    </div>
  );
}
