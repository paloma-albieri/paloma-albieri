# Paloma Albieri Site v2

Next.js 14 site with PT/JP routes, editorial design tokens, a Taggbox Instagram embed, and a Netlify Forms contact flow for diagnostic calls.

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
SITE_URL=https://palomaalbieri.com
```

## Public Routes

- `/pt`
- `/jp`
- `/pt/servicos`
- `/jp/servicos`

The localized `/portfolio` pages present anonymized ecosystem architectures without client names or sensitive data. The `paloma-albieri` sub-route documents the site's own brand; client-specific sub-routes have been removed.

`/pt/pacotes` and `/jp/pacotes` return HTTP 301 redirects to the corresponding `/diagnostico` route. There is no packages page.
