import _ from 'lodash';
import stylish from './modules/stylish.js';
import parserToObj from './modules/parsers.js';

const makeChangedObj = (objFileOne, objFileTwo) => {
  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);
  const keys = _.union(keysOne, keysTwo);

  const result = keys.map((key) => {
    if (!_.has(objFileTwo, key)) {
      return { key, value: objFileOne[key], type: 'deleted' };
    }
    if (_.isObject(objFileOne[key]) && _.isObject(objFileTwo[key])) {
      return { key, value: makeChangedObj(objFileOne[key], objFileTwo[key]) };
    }
    if (objFileOne[key] === objFileTwo[key]) {
      return { key, value: objFileOne[key], type: 'unchanged' };
    }
    if (!_.has(objFileOne, key)) {
      return { key, value: objFileTwo[key], type: 'added' };
    }
    return {
      key,
      currentValue: objFileTwo[key],
      beforeValue: objFileOne[key],
      type: 'changed',
    };
  });
  return result;
};

export default (file1, file2) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

  return stylish(makeChangedObj(objFileOne, objFileTwo));
};
