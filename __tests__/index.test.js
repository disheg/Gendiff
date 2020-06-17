import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import { resultDefault, resultPlainTree, resultJSON } from './fixtures/result.js';

test('default Format', () => {
  expect(gendiff('__tests__/fixtures/beforeDefault.ini', '__tests__/fixtures/afterDefault.yml')).toEqual(resultDefault);
});

test('plain Format', () => {
  expect(gendiff('__tests__/fixtures/beforePlain.json', '__tests__/fixtures/afterPlain.json', 'plain')).toEqual(resultPlainTree);
});

test('json Format', () => {
  expect(gendiff('__tests__/fixtures/beforeJson.json', '__tests__/fixtures/afterJson.json', 'json')).toEqual(resultJSON);
});
