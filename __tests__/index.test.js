import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const getFixturesPath = (filename) => path.join('__tests__', 'fixtures', filename);

let prettyResult;
let plainResult;
let jsonResult;

beforeAll(() => {
  prettyResult = fs.readFileSync(getFixturesPath('result_pretty.txt'), 'utf8');
  plainResult = fs.readFileSync(getFixturesPath('result_plain.txt'), 'utf8');
  jsonResult = fs.readFileSync(getFixturesPath('result_json.json'), 'utf8').trim();
});

test('default Format', () => {
  expect(gendiff(getFixturesPath('beforeDefault.ini'), getFixturesPath('afterDefault.yml'))).toEqual(prettyResult);
});

test('plain Format', () => {
  expect(gendiff(getFixturesPath('beforePlain.json'), getFixturesPath('afterPlain.json'), 'plain')).toEqual(plainResult);
});

test('json Format', () => {
  expect(gendiff(getFixturesPath('beforeJson.json'), getFixturesPath('afterJson.json'), 'json')).toEqual(jsonResult);
});
