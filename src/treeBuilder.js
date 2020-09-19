import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keysOne = Object.keys(data1);
  const keysTwo = Object.keys(data2);
  //const keys = _.union(keysOne, keysTwo);
  const keys = [...(new Set([...keysOne, ...keysTwo]))];
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        beforeValue: null,
        currentValue: data1[key],
        type: 'deleted',
        children: [],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        beforeValue: null,
        currentValue: null,
        type: 'nested',
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        beforeValue: null,
        currentValue: data1[key],
        type: 'unchanged',
        children: [],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        beforeValue: null,
        currentValue: data2[key],
        type: 'added',
        children: [],
      };
    }
    return {
      key,
      beforeValue: data1[key],
      currentValue: data2[key],
      type: 'changed',
      children: [],
    };
  });
  return result;
};

export default buildTree;
