import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keysOne = Object.keys(data1);
  const keysTwo = Object.keys(data2);
  const keys = _.union(keysOne, keysTwo);
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'deleted',
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        value: data1[key],
        type: 'unchanged',
      };
    }
    return {
      key,
      beforeValue: data1[key],
      currentValue: data2[key],
      type: 'changed',
    };
  });
  return result;
};

export default buildTree;
