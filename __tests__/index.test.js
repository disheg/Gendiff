import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const result1 = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
const result1rec = `{
    common: {
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
            kor: {
              ser: ses
            }
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
const result2 = `{
    name: Petya
  + age: 32
  - age: 30
    city: Stockholm
  + job: Microsoft
}`;
test('from JSON', () => {
  expect(gendiff('__tests__/fixtures/before1.json', '__tests__/fixtures/after1.json', 'json')).toEqual(result1rec);
  expect(gendiff('__tests__/fixtures/before2.json', '__tests__/fixtures/after2.json')).toEqual(result2);
});
test('from YML', () => {
  expect(gendiff('__tests__/fixtures/before1.yml', '__tests__/fixtures/after1.yml')).toEqual(result1);
  expect(gendiff('__tests__/fixtures/before2.yml', '__tests__/fixtures/after2.yml')).toEqual(result2);
});
test('from INI', () => {
  expect(gendiff('__tests__/fixtures/before1.ini', '__tests__/fixtures/after1.ini')).toEqual(result1);
});


const result1Plain = `
Property 'timeout' was changed from '50' to '20'
Property 'proxy' was deleted
Property 'follow' was deleted
Property 'verbose' was added with value: 'true'`;
const result1PlainRec = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: 'false'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`;
test('from JSON', () => {
  expect(gendiff('__tests__/fixtures/before1.json', '__tests__/fixtures/after1.json', 'plain')).toEqual(result1PlainRec);
  expect(gendiff('__tests__/fixtures/before1.ini', '__tests__/fixtures/after1.ini', 'plain')).toEqual(result1Plain);
});
test('from YML', () => {
  expect(gendiff('__tests__/fixtures/before1.yml', '__tests__/fixtures/after1.yml', 'plain')).toEqual(result1Plain);
});
test('from INI', () => {
  expect(gendiff('__tests__/fixtures/before1.ini', '__tests__/fixtures/after1.ini', 'plain')).toEqual(result1Plain);
});
