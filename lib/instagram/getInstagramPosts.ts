export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
};

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

type GraphResponse = {
  data?: GraphMedia[];
  error?: {
    message?: string;
  };
};

function getLimit() {
  const parsed = Number(process.env.INSTAGRAM_FEED_LIMIT ?? 6);
  if (!Number.isFinite(parsed)) return 6;
  return Math.min(Math.max(parsed, 1), 9);
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.META_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return [];
  }

  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp'
  ].join(',');

  const url = new URL(`https://graph.facebook.com/v24.0/${userId}/media`);
  url.searchParams.set('fields', fields);
  url.searchParams.set('limit', String(getLimit()));
  url.searchParams.set('access_token', token);

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return [];
    }

    const body = (await response.json()) as GraphResponse;
    if (!body.data || body.error) {
      return [];
    }

    return body.data
      .filter((item) => item.id && item.permalink && (item.media_url || item.thumbnail_url))
      .map((item) => ({
        id: item.id,
        caption: item.caption ?? '',
        mediaType: item.media_type ?? 'IMAGE',
        mediaUrl: item.media_url ?? item.thumbnail_url ?? '',
        thumbnailUrl: item.thumbnail_url,
        permalink: item.permalink ?? 'https://instagram.com/paloma.albieri',
        timestamp: item.timestamp ?? ''
      }));
  } catch {
    return [];
  }
}
