import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturesPath = (filename) => path.join('__tests__', 'fixtures', filename);
const readFile = (filename) => fs.readFileSync(getFixturesPath(filename), 'utf-8');


let resultDefault;
let resultPlainTree;
let resultJson;

beforeAll(() => {
  resultDefault = readFile('resultDefault.txt');
  resultPlainTree = readFile('resultPlainTree.txt');
  resultJson = readFile('result.json');
});

test('default Format', () => {
  expect(gendiff(readFile('beforeDefault.ini'), readFile('afterDefault.yml'))).toEqual(resultDefault);
});

test('plain Format', () => {
  expect(gendiff(readFile('beforePlain.json'), readFile('afterPlain.json'), 'plain')).toEqual(resultPlainTree);
});

test('json Format', () => {
  expect(gendiff(readFile('beforeJson.json'), readFile('afterJson.json'), 'json')).toEqual(resultJson);
});
