import _ from 'lodash';

const buildChildrenTree = (data1, data2) => {
  const keysOne = Object.keys(data1);
  const keysTwo = Object.keys(data2);
  const keys = _.union(keysOne, keysTwo);
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildChildrenTree(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });

  return _.sortBy(result, 'key');
};

const buildTree = (data1, data2) => ({
  type: 'root',
  children: _.sortBy(buildChildrenTree(data1, data2), 'key'),
});

export default buildTree;
