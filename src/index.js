import _ from 'lodash';
import stylish from './modules/stylish.js';
import parserToObj from './modules/parsers.js';

const makeType = (key, obj, type) => {
  const result = {
    key,
    value: obj[key],
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
      acc.push(makeType(key, objFileOne, 'deleted'));
    } else if (_.isObject(objFileOne[key]) && _.isObject(objFileTwo[key])) {
      acc.push({ key, value: makeChangedObj(objFileOne[key], objFileTwo[key]) });
    } else if (objFileOne[key] === objFileTwo[key]) {
      acc.push(makeType(key, objFileOne, 'unchanged'));
    } else if (!_.has(objFileOne, key)) {
      acc.push(makeType(key, objFileTwo, 'added'));
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

export default (file1, file2) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

  return stylish(makeChangedObj(objFileOne, objFileTwo));
};
