import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => fs.readFileSync(
  path.resolve(process.cwd(), filePath), 'utf-8',
);

const makeObj = (key, currentValue, beforeValue, type, children = []) => {
  key,
  value: {
    beforeValue,
    currentValue,
  },
  type,
  children,
};

const buildTree = (data1, data2) => {
  const keysOne = Object.keys(data1);
  const keysTwo = Object.keys(data2);
  const keys = _.union(keysOne, keysTwo);
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return makeObj(key, data1[key], null, 'deleted');
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return makeObj(key, null, null, 'nested', buildTree(data1[key], data2[key]));
    }
    if (data1[key] === data2[key]) {
      return makeObj(key, data1[key], null, 'unchanged');
    }
    if (!_.has(data1, key)) {
      return makeObj(key, data2[key], null, 'added');
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return makeObj(key, data2[key], data1[key], 'changed');
    }
    return null;
  });
  return result.filter((element) => element !== null);
};

export { buildTree, readFile };
