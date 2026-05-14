import { getTranslations } from 'next-intl/server';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const TAGGBOX_WIDGET_URL = 'https://widget.taggbox.com/325482?website=1';

export async function InstagramFeed() {
  const t = await getTranslations('instagram');

  return (
    <section className="bg-paper-light" id="instagram">
      <div className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <p className="label-mono mb-8 text-ink-3">{t('overline')}</p>
            <h2 className="display-h2 max-w-[10ch] text-ink-dark">{t('title')}</h2>
            <p className="body-lead mt-8 text-ink-dark">{t('lead')}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTAPill href="https://instagram.com/paloma.albieri" external>
                {t('follow')}
              </CTAPill>
              <CTAPill href="https://wa.me/817020122563" variant="filled-shock" external>
                {t('talk')}
              </CTAPill>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="short" className="interactive-card min-h-[560px] overflow-hidden border border-ink-dark bg-paper-light sm:min-h-[640px]">
            <iframe
              src={TAGGBOX_WIDGET_URL}
              title="Instagram Paloma Albieri"
              allow="fullscreen"
              loading="lazy"
              className="h-[560px] w-full border-0 sm:h-[640px]"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
