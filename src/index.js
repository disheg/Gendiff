import _ from 'lodash';
import stylish from './modules/stylish.js';
import parserToObj from './modules/parsers.js';

const makeChangedObj = (objFileOne, objFileTwo) => {
  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);
  const keys = _.union(keysOne, keysTwo);

  const result = keys.map((key) => {
    let type;
    let value = objFileOne[key];
    if (!_.has(objFileTwo, key)) {
      type = 'deleted';
    } else if (_.isObject(objFileOne[key]) && _.isObject(objFileTwo[key])) {
      return { key, value: makeChangedObj(objFileOne[key], objFileTwo[key]) };
    } else if (objFileOne[key] === objFileTwo[key]) {
      type = 'unchanged';
    } else if (!_.has(objFileOne, key)) {
      type = 'added';
      value = objFileTwo[key];
    } else if (_.has(objFileOne, key) && _.has(objFileTwo, key)) {
      return {
        key,
        currentValue: objFileTwo[key],
        beforeValue: objFileOne[key],
        type: 'changed',
      };
    }
    return {
      key,
      value,
      type,
    }
  });
  return result;
};

export default (file1, file2) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

  return stylish(makeChangedObj(objFileOne, objFileTwo));
};
