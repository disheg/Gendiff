import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

beforeAll(() => {
  const getFixturesPath = (filename) => {
    return path.join(__dirname, '..', 'fixtures', filename);
  };
  const readFile = (filename) => {
    return fs.readFileSync(getFixturesPath(filename), 'utf-8');
  };
  const resultDefault = readFile('resultDefault.txt');
  const resultPlainTree = readFile('resultPlainTree.txt');
  const resultJson = readFile('result.json')
});

test('default Format', () => {
  expect(gendiff('__tests__/fixtures/beforeDefault.ini', '__tests__/fixtures/afterDefault.yml')).toEqual(resultDefault);
});

test('plain Format', () => {
  expect(gendiff('__tests__/fixtures/beforePlain.json', '__tests__/fixtures/afterPlain.json', 'plain')).toEqual(resultPlainTree);
});

test('json Format', () => {
  expect(gendiff('__tests__/fixtures/beforeJson.json', '__tests__/fixtures/afterJson.json', 'json')).toEqual(resultJSON);
});
