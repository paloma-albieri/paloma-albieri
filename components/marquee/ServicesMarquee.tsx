import { useTranslations } from 'next-intl';

export function ServicesMarquee() {
  const t = useTranslations('services_marquee');
  const items = t.raw('items') as string[];
  const track = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-ink-dark bg-paper-light py-5" aria-label={items.join(', ')}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div
        className="flex w-max animate-[marquee-left_40s_linear_infinite] gap-10 whitespace-nowrap font-display text-[clamp(44px,8vw,88px)] font-light leading-none tracking-[-0.03em] hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            {item}
            <span className="text-shock">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
