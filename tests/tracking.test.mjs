import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('../lib/tracking.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

function setup({ storageBlocked = false, savedAttribution = null } = {}) {
  const values = new Map();
  if (savedAttribution) values.set('paloma-attribution-v1', JSON.stringify(savedAttribution));
  const storage = {
    getItem(key) { if (storageBlocked) throw new Error('Blocked'); return values.get(key) ?? null; },
    setItem(key, value) { if (storageBlocked) throw new Error('Blocked'); values.set(key, value); }
  };
  const window = {
    location: new URL('https://palomaalbieri.com/pt/triagem?utm_source=instagram&utm_medium=social&utm_campaign=outubro&email=private@example.com#formulario'),
    localStorage: storage, sessionStorage: storage
  };
  const document = { title: 'Triagem', referrer: 'https://example.org/private?email=private@example.com', cookie: '_ga=old' };
  const exports = {};
  vm.runInNewContext(source, { exports, window, document, URL, URLSearchParams, process: { env: { NODE_ENV: 'production' } }, console });
  return { api: exports, window, document };
}

test('no analytics command before consent, and rejection disables existing collection', () => {
  const { api, window } = setup();
  api.initializeAnalytics('G-68VJLE4KGY');
  api.trackPageView('pt');
  assert.equal(window.dataLayer, undefined);
  api.setConsent('granted');
  api.initializeAnalytics('G-68VJLE4KGY');
  api.trackPageView('pt');
  const count = window.dataLayer.length;
  api.setConsent('denied');
  api.trackTriageSuccess({ language: 'pt', track: 'home', triage_depth: 'quick' });
  assert.equal(window.dataLayer.length, count);
  assert.equal(window['ga-disable-G-68VJLE4KGY'], true);
  api.setConsent('granted');
  api.initializeAnalytics('G-68VJLE4KGY');
  assert.equal(window['ga-disable-G-68VJLE4KGY'], false);
});

test('first-touch source survives navigation without storing raw query or referrer', () => {
  const { api, window } = setup();
  const first = api.getAttribution();
  assert.equal(first.utm_source, 'instagram');
  assert.equal(first.referrer_host, 'example.org');
  assert.equal(first.landing_path, '/pt/triagem');
  window.location = new URL('https://palomaalbieri.com/pt/servicos?utm_source=internal');
  assert.equal(api.getAttribution().utm_source, 'instagram');
  assert.equal(JSON.stringify(first).includes('private'), false);
});

test('stored attribution rejects unknown keys and unsafe values', () => {
  const { api } = setup({ savedAttribution: { landing_path: '/pt', utm_source: 'private@example.com', email: 'secret', utm_campaign: '<script>' } });
  assert.deepEqual(JSON.parse(JSON.stringify(api.getAttribution())), { landing_path: '/pt' });
});

test('form events contain no query, fragment, referrer URL or response text', () => {
  const { api, window } = setup();
  api.setConsent('granted');
  api.initializeAnalytics('G-68VJLE4KGY');
  api.trackTriageError({ language: 'pt', track: 'estrutura', triage_depth: 'quick', email: 'private@example.com', message: 'Private response' }, 'timeout');
  const event = Array.from(window.dataLayer.at(-1));
  assert.equal(event[0], 'event');
  assert.equal(event[1], 'triage_error');
  assert.equal(event[2].error_type, 'timeout');
  assert.equal(event[2].page_location, 'https://palomaalbieri.com/pt/triagem');
  assert.equal(JSON.stringify(window.dataLayer).includes('private@example.com'), false);
  assert.equal(JSON.stringify(window.dataLayer).includes('Private response'), false);
});

test('blocked storage and failed analytics transport do not interrupt contact', () => {
  const { api, window } = setup({ storageBlocked: true });
  assert.doesNotThrow(() => api.getAttribution());
  assert.equal(api.getConsent(), null);
  api.setConsent('granted');
  window.gtag = () => { throw new Error('Transport failed'); };
  assert.doesNotThrow(() => api.trackTriageSubmit({ language: 'jp', track: 'home', triage_depth: 'complete' }));
});
