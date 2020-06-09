import _ from 'lodash';
import stylish from './modules/stylish.js';
import parserToObj from './modules/parsers.js';

const makeChangedObj = (objFileOne, objFileTwo) => {
  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);
  const keys = _.union(keysOne, keysTwo);
  const makeType = (key, objOne, objTwo) => {
    if (!_.has(objTwo, key)) {
      return { key, value: objOne[key], type: 'deleted' };
    }
    if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      return { key, value: makeChangedObj(objOne[key], objTwo[key]) };
    }
    if (objOne[key] === objTwo[key]) {
      return { key, value: objOne[key], type: 'unchanged' };
    }
    if (!_.has(objOne, key)) {
      return { key, value: objTwo[key], type: 'added' };
    }
    return {
      key,
      currentValue: objTwo[key],
      beforeValue: objOne[key],
      type: 'changed',
    };
  };
  const result = keys.map((key) => makeType(key, objFileOne, objFileTwo));
  return result;
};

export default (file1, file2) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

  return stylish(makeChangedObj(objFileOne, objFileTwo));
};
