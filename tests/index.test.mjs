import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known valid VIN', () => {
  assert.ok(api.validateVin('1M8GDM9AXKP042788'));
  assert.equal(api.vinCheckDigit('1M8GDM9A0KP042788'), 'X');
});
test('known Honda', () => {
  assert.ok(api.validateVin('1HGCM82633A004352'));
});
test('mismatch only false', () => {
  assert.equal(api.validateVin('1HGCM82643A004352'), false);
});
test('excluded letters', () => {
  assert.throws(() => api.validateVin('1HGCM82633A00435I'));
});
test('canonical length and case', () => {
  assert.throws(() => api.validateVin('1hgcm82633a004352'));
  assert.throws(() => api.validateVin('1HGCM82633A004352\n'));
});
test('ninth placeholder ignored', () => {
  const original = '1HGCM82633A004352';
  for (let i = 0; i < 10; i++)
    assert.equal(api.vinCheckDigit(original.slice(0, 8) + i + original.slice(9)), '3');
});
