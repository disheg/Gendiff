import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const getFixturesPath = (filename) => path.join('__tests__', '__fixtures__', filename);

let stylishResult;
let plainResult;
let jsonResult;

beforeAll(() => {
  stylishResult = fs.readFileSync(getFixturesPath('result_stylish.txt'), 'utf8');
  plainResult = fs.readFileSync(getFixturesPath('result_plain.txt'), 'utf8');
  jsonResult = fs.readFileSync(getFixturesPath('result_json.json'), 'utf8').trim();
});

test('default Format', () => {
  expect(gendiff(getFixturesPath('file1.json'), getFixturesPath('file2.yml'))).toEqual(stylishResult);
});

test('plain Format', () => {
  expect(gendiff(getFixturesPath('file1.yml'), getFixturesPath('file2.json'), 'plain')).toEqual(plainResult);
});

test('json Format', () => {
  expect(gendiff(getFixturesPath('file1.json'), getFixturesPath('file2.yml'), 'json')).toEqual(jsonResult);
});
