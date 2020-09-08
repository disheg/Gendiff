import _ from 'lodash';

const makeNode = (key, currentValue, beforeValue, type, children = []) => ({
  key,
  beforeValue,
  currentValue,
  type,
  children,
});

const buildTree = (data1, data2) => {
  const keysOne = Object.keys(data1);
  const keysTwo = Object.keys(data2);
  const keys = _.union(keysOne, keysTwo);
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return makeNode(key, data1[key], null, 'deleted');
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return makeNode(key, null, null, 'nested', buildTree(data1[key], data2[key]));
    }
    if (data1[key] === data2[key]) {
      return makeNode(key, data1[key], null, 'unchanged');
    }
    if (!_.has(data1, key)) {
      return makeNode(key, data2[key], null, 'added');
    }
    return makeNode(key, data2[key], data1[key], 'changed');
  });
  return result.filter((element) => element !== null);
};

export default buildTree;
