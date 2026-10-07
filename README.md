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
NEXT_PUBLIC_GOOGLE_APPOINTMENT_EMBED_URL=https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ICB0wPPZoVRXsZY2JZ-GCL1OJHPVqNNnpIsFl8eouvwJ-AthjvK7DnA2ZUawFzjePFIOuocb9?gv=true
```

## Public Routes

- `/pt`
- `/jp`
- `/pt/servicos`
- `/jp/servicos`

The localized `/portfolio` pages present anonymized ecosystem architectures without client names or sensitive data. The `paloma-albieri` sub-route documents the site's own brand; client-specific sub-routes have been removed.

`/pt/pacotes` and `/jp/pacotes` return HTTP 301 redirects to the corresponding `/diagnostico` route. There is no packages page.

## Triage and Scheduling

Quick triage requires name, email, the current need and permission to use the information. Complete mode adds the existing project questions. Switching modes preserves entered values; quick submissions omit the additional fields. Historical fields remain registered in `public/__forms.html`.

The calendar embed and contact links share `lib/site/appointments.ts`. Booking through Google Calendar is an alternative to sending the site form. Booking details, availability, duration and notifications are managed in Google Calendar.

The form posts URL-encoded data to `/__forms.html` and times out after 20 seconds. A failed submission preserves the answers and provides an email alternative. Next.js development alone does not process Netlify Forms.

Before releasing changes, verify on a Netlify deploy that the form is detected, submit a clearly identified test with an authorized real email address, confirm the record in Forms (including Spam), and confirm the configured recipient receives the notification. Check Google Calendar booking and confirmation separately. An HTTP success response alone does not prove email delivery.
