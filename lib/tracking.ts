export const EVENTS = {
  PAGE_VIEW: 'page_view',
  TRIAGE_START: 'triage_start',
  TRIAGE_SUBMIT: 'triage_submit',
  TRIAGE_SUCCESS: 'generate_lead',
  TRIAGE_ERROR: 'triage_error',
  CONTACT_CLICK: 'contact_click',
  CALENDAR_OPEN: 'calendar_open'
} as const;

export type Consent = 'granted' | 'denied';
type FormContext = { language: string; track: string; triage_depth: 'quick' | 'complete' };
export type Attribution = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_host' | 'landing_path', string>>;
const attributionKey = 'paloma-attribution-v1';
const consentKey = 'paloma-analytics-consent-v1';
let attribution: Attribution | undefined;
let active = false;
let measurementId = '';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sanitizeAttribution(value: unknown): Attribution {
  if (!value || typeof value !== 'object') return {};
  const result: Attribution = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'referrer_host', 'landing_path'] as const) {
    const item = (value as Record<string, unknown>)[key];
    if (typeof item !== 'string') continue;
    const valid = key === 'landing_path'
      ? /^\/(?:pt|jp)(?:\/[a-z0-9-]+)*\/?$/.test(item)
      : /^[a-zA-Z0-9._-]{1,100}$/.test(item);
    if (valid) result[key] = item;
  }
  return result;
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  if (attribution) return { ...attribution };
  try {
    const previous = sanitizeAttribution(JSON.parse(window.sessionStorage.getItem(attributionKey) || '{}'));
    if (previous.landing_path) {
      attribution = previous;
      return { ...previous };
    }
  } catch { /* Storage may be unavailable in private browsing. */ }
  const params = new URLSearchParams(window.location.search);
  const current: Record<string, unknown> = { landing_path: window.location.pathname };
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) current[key] = params.get(key);
  try {
    const referrer = new URL(document.referrer);
    if (referrer.hostname !== window.location.hostname) current.referrer_host = referrer.hostname;
  } catch { /* No external referrer. */ }
  attribution = sanitizeAttribution(current);
  try { window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch { /* Keep the in-memory source. */ }
  return { ...attribution };
}

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(consentKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch { return null; }
}

function command(...args: unknown[]) {
  try { window.gtag?.(...args); } catch { /* Measurement must never interrupt contact. */ }
}

export function setConsent(consent: Consent) {
  active = consent === 'granted';
  try { window.localStorage.setItem(consentKey, consent); } catch { /* Apply the choice for this page. */ }
  if (!active) {
    if (measurementId) (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      const domains = window.location.hostname.split('.');
      document.cookie = `${name}=; Max-Age=0; path=/`;
      for (let index = 0; index < domains.length - 1; index++) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domains.slice(index).join('.')}`;
      }
    }
  }
}

export function initializeAnalytics(id: string) {
  if (typeof window === 'undefined' || !active || !/^G-[A-Z0-9]+$/.test(id)) return;
  measurementId = id;
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer?.push(arguments); };
  command('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  command('js', new Date());
  command('config', id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: '',
    page_title: document.title,
    campaign_source: getAttribution().utm_source,
    campaign_medium: getAttribution().utm_medium,
    campaign_name: getAttribution().utm_campaign
  });
}

function send(event: typeof EVENTS[keyof typeof EVENTS], properties: Record<string, string>) {
  if (typeof window === 'undefined' || !active) return;
  const payload = {
    ...properties,
    page_path: window.location.pathname,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: ''
  };
  if (process.env.NODE_ENV !== 'production') {
    if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true') console.debug('[analytics]', event, payload);
    return;
  }
  command('event', event, payload);
}

export function trackPageView(language: string) { send(EVENTS.PAGE_VIEW, { language }); }
function formProperties({ language, track, triage_depth }: FormContext) {
  return { language, track, triage_depth };
}
export function trackTriageStart(context: FormContext) { send(EVENTS.TRIAGE_START, formProperties(context)); }
export function trackTriageSubmit(context: FormContext) { send(EVENTS.TRIAGE_SUBMIT, formProperties(context)); }
export function trackTriageSuccess(context: FormContext) { send(EVENTS.TRIAGE_SUCCESS, formProperties(context)); }
export function trackTriageError(context: FormContext, error: 'http' | 'network' | 'timeout') { send(EVENTS.TRIAGE_ERROR, { ...formProperties(context), error_type: error }); }
export function trackContactClick(channel: 'whatsapp' | 'email', language: string) { send(EVENTS.CONTACT_CLICK, { channel, language }); }
export function trackCalendarOpen(language: string, destination: 'section' | 'google') { send(EVENTS.CALENDAR_OPEN, { language, destination }); }
