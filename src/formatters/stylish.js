import _ from 'lodash';

const makeSpace = (depth) => ' '.repeat(depth);
const stringify = (obj, depth = 2) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (_.isObject(value)) return `\n${makeSpace(depth + 2)}  ${key}: ${stringify(value, depth + 4)}`;
    return `\n${makeSpace(depth + 2)}  ${key}: ${value}`;
  });
  return `{${result.join('')}\n${makeSpace(depth)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 2) => {
    const output = innerObj.map((element) => {
      if (element.type === 'nested') return `\n${makeSpace(depth)}  ${element.key}: ${iter(element.children, depth)}`;
      switch (element.type) {
        case 'unchanged':
          return `\n${makeSpace(depth)}  ${element.key}: ${stringify(element.currentValue)}`;
        case 'deleted':
          return `\n${makeSpace(depth)}- ${element.key}: ${stringify(element.currentValue)}`;
        case 'added':
          return `\n${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue)}`;
        case 'changed':
          if (element.beforeValue) {
            return `\n${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue)}\n${makeSpace(depth)}- ${element.key}: ${stringify(element.beforeValue)}`;
          }
          return `\n${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue)}`;
        case 'nested':
          return null;
        default:
          return new Error(`Unknown type: ${element.type}`);
      }
    });
    return `{${output.join('')}\n}`;
  };
  return iter(obj);
};
export default renderStylish;
