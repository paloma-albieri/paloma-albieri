import { getTranslations } from 'next-intl/server';
import { CTAPill } from '@/components/ui/CTAPill';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const staticPosts = [
  {
    title: 'Antes do post',
    text: 'Presenca digital comeca no caminho: o que a pessoa entende, sente e faz depois de chegar.',
    href: 'https://instagram.com/paloma.albieri'
  },
  {
    title: 'Site nao e enfeite',
    text: 'Um site bom organiza confianca, explica a oferta e tira o contato do improviso.',
    href: 'https://instagram.com/paloma.albieri'
  },
  {
    title: 'Processo tambem vende',
    text: 'Quando atendimento e informacao ficam claros, a marca parece mais segura antes da conversa.',
    href: 'https://instagram.com/paloma.albieri'
  },
  {
    title: 'Brasil e Japao',
    text: 'Duas linguas, dois contextos e uma necessidade comum: clareza para decidir o proximo passo.',
    href: 'https://instagram.com/paloma.albieri'
  }
];

export async function InstagramFeed() {
  const t = await getTranslations('instagram');

  return (
    <section className="editorial-section editorial-section-instagram bg-paper-light" id="instagram">
      <div className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <p className="editorial-kicker label-mono mb-8 text-ink-dark">{t('overline')}</p>
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

          <ScrollReveal delay="short">
            <div className="grid gap-4 sm:grid-cols-2">
              {staticPosts.map((post, index) => (
                <a
                  key={post.title}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collage-post interactive-card flex min-h-[220px] flex-col justify-between border border-line bg-paper-light p-6 text-ink-dark"
                  style={{
                    background:
                      index === 1
                        ? 'var(--paper-warm)'
                        : index === 2
                          ? 'var(--paper-rose)'
                          : 'var(--paper-light)'
                  }}
                >
                  <span className="label-mono text-accent">POST</span>
                  <span className="mt-8 block font-display text-4xl font-semibold leading-none">{post.title}</span>
                  <span className="mt-5 block text-sm leading-relaxed text-secondary">{post.text}</span>
                  <span className="label-mono mt-8 text-ink-dark">{t('post_cta')}</span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
