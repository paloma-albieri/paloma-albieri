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
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-68VJLE4KGY
# Optional: log consented events locally without sending development traffic to GA4.
NEXT_PUBLIC_ANALYTICS_DEBUG=true
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

## Conversion Measurement

GA4 uses the supplied public measurement ID `G-68VJLE4KGY`, overridable with `NEXT_PUBLIC_GA_MEASUREMENT_ID`. The Google script loads only in production and after an explicit analytics choice. Visitors can reject or change their choice at the bottom of the page. Development never sends events to GA4; optional debug logging exposes only event metadata.

Events: `page_view`, `triage_start` (first input change), `triage_submit` (valid submission attempt), `generate_lead` (successful HTTP response), `triage_error` (HTTP/network/timeout), `contact_click` (WhatsApp/email), `calendar_open` (calendar section or Google link). Google iframe interactions and completed bookings are not observable by this integration. `generate_lead` is a form submission, not a qualified lead or confirmed email delivery.

Disable Enhanced Measurement in the GA4 web stream to avoid duplicate page/form/outbound events and automatically collected URLs. This integration sends explicit events with query strings and fragments removed, no form answers or contact data, and advertising signals disabled. Mark `generate_lead` as a key event in GA4; register `triage_depth`, `track`, `channel`, `destination`, and `error_type` as event-scoped custom dimensions when needed. Follow the [Google event guide](https://developers.google.com/analytics/devguides/collection/ga4/events) and [configuration reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).

First-touch `utm_source`, `utm_medium`, `utm_campaign`, external referrer hostname and landing path are retained in session storage to accompany submitted contact requests. Values use a restricted character set and length; never put personal information in campaign links. Raw referrer URLs and arbitrary query parameters are not retained. This operational source attribution is independent of optional Google Analytics consent. Extra fields are registered in `public/__forms.html` and require a Netlify deploy to appear in submissions.

Run `npm run test:tracking` and `npm run typecheck`. After publication, verify consent rejection makes no GA request, consent acceptance loads the tag, and events arrive in GA4 Realtime/DebugView. Confirm a failed form request emits no `generate_lead`, and check source fields on a submitted lead from a campaign URL. No production delivery is claimed from local tests alone.
