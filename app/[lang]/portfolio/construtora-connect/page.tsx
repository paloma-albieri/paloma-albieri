import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function ConstrutoraConnectArchivePage() {
  const t = useTranslations('portfolio');

  return (
    <main className="bg-paper-light pt-24">
      <section className="container-shell section-pad">
        <p className="label-mono mb-8 text-ink-3">{t('overline')}</p>
        <h1 className="display-h2 text-ink-dark">{t('connect_title')}</h1>
        <p className="body-lead mt-8 text-ink-dark">{t('connect_copy')}</p>
      </section>
    </main>
  );
}
