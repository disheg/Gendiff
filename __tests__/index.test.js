import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const dirname = path.resolve();

let resultDefault;
let resultPlainTree;
let resultJson;

beforeAll(() => {
  const getFixturesPath = (filename) => path.join(dirname, '..', 'fixtures', filename);
  const readFile = (filename) => fs.readFileSync(getFixturesPath(filename), 'utf-8');
  resultDefault = readFile('resultDefault.txt');
  resultPlainTree = readFile('resultPlainTree.txt');
  resultJson = readFile('result.json');
});

test('default Format', () => {
  expect(gendiff('__tests__/fixtures/beforeDefault.ini', '__tests__/fixtures/afterDefault.yml')).toEqual(resultDefault);
});

test('plain Format', () => {
  expect(gendiff('__tests__/fixtures/beforePlain.json', '__tests__/fixtures/afterPlain.json', 'plain')).toEqual(resultPlainTree);
});

test('json Format', () => {
  expect(gendiff('__tests__/fixtures/beforeJson.json', '__tests__/fixtures/afterJson.json', 'json')).toEqual(resultJson);
});
