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

test('gendiff JSON', () => {
  expect(gendiff('__tests__/fixtures/before1.json', '__tests__/fixtures/after1.json')).toEqual(result1rec);
  expect(gendiff('__tests__/fixtures/before2.json', '__tests__/fixtures/after2.json')).toEqual(result2);
});

test('gendiff YML', () => {
  expect(gendiff('__tests__/fixtures/before1.yml', '__tests__/fixtures/after1.yml')).toEqual(result1);
  expect(gendiff('__tests__/fixtures/before2.yml', '__tests__/fixtures/after2.yml')).toEqual(result2);
});

test('gendiff INI', () => {
  expect(gendiff('__tests__/fixtures/before1.ini', '__tests__/fixtures/after1.ini')).toEqual(result1);
});
