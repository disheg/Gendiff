import _ from 'lodash';
import render from './formatters/index.js';
import parserToObj from './modules/parsers.js';

const makeType = (key, value, type = null) => {
  const result = {
    key,
    value,
    type,
  };
  return result;
};

const makeChangedObj = (objFileOne, objFileTwo) => {
  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);
  const keys = _.union(keysOne, keysTwo);
  const result = keys.reduce((acc, key) => {
    if (!_.has(objFileTwo, key)) {
      acc.push(makeType(key, objFileOne[key], 'deleted'));
    } else if (_.isObject(objFileOne[key]) && _.isObject(objFileTwo[key])) {
      acc.push(makeType(key, makeChangedObj(objFileOne[key], objFileTwo[key]), 'nested'));
    } else if (objFileOne[key] === objFileTwo[key]) {
      acc.push(makeType(key, objFileOne[key], 'unchanged'));
    } else if (!_.has(objFileOne, key)) {
      acc.push(makeType(key, objFileTwo[key], 'added'));
    } else {
      acc.push({
        key,
        currentValue: objFileTwo[key],
        beforeValue: objFileOne[key],
        type: 'changed',
      });
    }
    return acc;
  }, []);
  return result;
};

export default (file1, file2, format) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

  return render(makeChangedObj(objFileOne, objFileTwo), format);
};
