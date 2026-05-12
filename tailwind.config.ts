import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        'paper-light': 'var(--paper-light)',
        'paper-rose': 'var(--paper-rose)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-dark': 'var(--ink-dark)',
        line: 'var(--line)',
        shock: 'var(--shock)',
        'shock-glow': 'var(--shock-glow)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      borderRadius: {
        pill: 'var(--radius-pill)',
        card: 'var(--radius-card)'
      },
      maxWidth: {
        content: 'var(--max)'
      }
    }
  },
  plugins: []
};

export default config;
