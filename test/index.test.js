import test from 'node:test';
import assert from 'node:assert/strict';

import maskPayNowName, { maskPayNowName as namedExport } from '../src/index.js';

test('exports maskPayNowName as both the default and named export', () => {
  assert.equal(maskPayNowName, namedExport);
});

test('masks each word according to its length', () => {
  const cases = [
    ['A', 'A'],
    ['Li', 'LX'],
    ['Tan', 'TaX'],
    ['John', 'JoXX'],
    ['Alice', 'AliXX'],
    ['Daniel', 'DanXXX'],
    ['Michael', 'MichXXX'],
    ['Samantha', 'SamaXXXX'],
    ['Alexandra', 'AlexaXXXX']
  ];

  for (const [input, expected] of cases) {
    assert.equal(maskPayNowName(input), expected, input);
  }
});

test('normalizes surrounding and repeated whitespace', () => {
  assert.equal(maskPayNowName('  John   Tan  '), 'JoXX TaX');
  assert.equal(maskPayNowName('John\nTan'), 'JoXX TaX');
});

test('handles s/o and d/o legal conjunctions case-insensitively', () => {
  assert.equal(maskPayNowName('Ravi s/o Kumar'), 'RaXX s/X KumXX');
  assert.equal(maskPayNowName('Ravi D/O Kumar'), 'RaXX D/X KumXX');
});

test('returns an empty string for empty or non-string values', () => {
  for (const input of ['', null, undefined, 123, false, {}, []]) {
    assert.equal(maskPayNowName(input), '');
  }
});
