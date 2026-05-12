import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type CTAPillVariant = 'outline-ink' | 'outline-inverse' | 'filled-shock' | 'filled-ink';

type CTAPillProps = {
  href: string;
  children: ReactNode;
  variant?: CTAPillVariant;
  external?: boolean;
  className?: string;
};

const variants: Record<CTAPillVariant, string> = {
  'outline-ink': 'cta-outline-ink',
  'outline-inverse': 'cta-outline-inverse',
  'filled-shock': 'cta-filled-shock',
  'filled-ink': 'cta-filled-ink'
};

export function CTAPill({
  href,
  children,
  variant = 'outline-ink',
  external = false,
  className
}: CTAPillProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx('cta-pill', variants[variant], className)}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
