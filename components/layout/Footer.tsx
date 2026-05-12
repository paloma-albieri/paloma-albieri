import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-ink-dark bg-paper-light py-12">
      <div className="container-shell flex flex-col gap-3 text-sm text-ink-dark md:flex-row md:items-center md:justify-between">
        <p className="label-mono text-[11px]">{t('copyright')}</p>
        <p>{t('links_label')}</p>
      </div>
    </footer>
  );
}
