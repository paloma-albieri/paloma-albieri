import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getInstagramPosts } from '@/lib/instagram/getInstagramPosts';
import { CTAPill } from '@/components/ui/CTAPill';

function formatDate(value: string) {
  if (!value) return '';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(value));
}

function excerpt(caption: string) {
  const clean = caption.replace(/\s+/g, ' ').trim();
  if (clean.length <= 118) return clean;
  return `${clean.slice(0, 115).trim()}...`;
}

export async function InstagramFeed() {
  const t = await getTranslations('instagram');
  const posts = await getInstagramPosts();

  return (
    <section className="bg-paper-light" id="instagram">
      <div className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
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
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[360px] flex-col border border-ink-dark bg-paper-light"
                >
                  <div className="aspect-square overflow-hidden border-b border-ink-dark bg-paper-rose">
                    <Image
                      src={post.thumbnailUrl || post.mediaUrl}
                      alt=""
                      width={640}
                      height={640}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="label-mono text-[10px] text-ink-3">{post.mediaType}</span>
                      <span className="label-mono text-[10px] text-ink-3">
                        {formatDate(post.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-dark">{excerpt(post.caption)}</p>
                    <span className="label-mono mt-auto text-[10px] text-shock">{t('post_cta')} ↗</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] items-center border border-ink-dark bg-paper-light p-8">
              <p className="body-lead text-ink-dark">{t('empty')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
