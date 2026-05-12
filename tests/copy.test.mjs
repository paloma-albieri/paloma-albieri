import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const forbiddenWords = [
  'abrangente',
  'robusto',
  'alavancar',
  'mergulhar',
  'tapeçaria',
  'reino',
  'essência',
  'vibrante',
  'dinâmico',
  'inovador',
  'ponta',
  'facilitar',
  'vitrine',
  'elevar',
  'embarcar',
  'jornada',
  'paixão',
  'empoderar',
  'desencadear',
  'revolucionar',
  'soluções',
  'entrega de valor',
  'mindset',
  'propósito',
  'ecossistema',
  'holistico',
  'centrado no usuário'
];

const pt = readFileSync(new URL('../lib/i18n/dictionaries/pt.json', import.meta.url), 'utf8');
const jp = readFileSync(new URL('../lib/i18n/dictionaries/jp.json', import.meta.url), 'utf8');
const text = `${pt}\n${jp}`;
const ptLower = pt.toLowerCase();

for (const word of forbiddenWords) {
  test(`copy PT nao contem palavra banida: ${word}`, () => {
    assert.equal(ptLower.includes(word), false);
  });
}

test('copy nao tem travessao longo', () => {
  assert.equal(text.includes('—'), false);
});

test('copy publica nao expoe valores de pacote', () => {
  assert.equal(/R\$\s*\d|¥\s*\d|¥\d/.test(text), false);
});

test('copy publica nao menciona Charcutaria', () => {
  assert.equal(/charcutaria/i.test(text), false);
});
