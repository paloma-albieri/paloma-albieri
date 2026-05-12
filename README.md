# Paloma Albieri Site v2

Next.js 14 site with PT/JP routes, editorial design tokens, an Instagram feed powered by the official Meta API, and a contact form for diagnostic calls.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run test:copy
npm run build
```

## Environment

```bash
META_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
INSTAGRAM_FEED_LIMIT=6
GMAIL_USER=contato@palomaalbieri.com
GMAIL_APP_PASSWORD=
CONTACT_TO_EMAIL=contato@palomaalbieri.com
SITE_URL=https://palomaalbieri.com
```

## Public Routes

- `/pt`
- `/jp`
- `/pt/pacotes`
- `/jp/pacotes`

Portfolio archive routes exist with `noindex,nofollow` and are excluded from the sitemap.
