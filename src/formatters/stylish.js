import _ from 'lodash';

const makeSpace = (depth) => ' '.repeat(depth + 2);
const stringify = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => `\n${makeSpace(depth + 2)}  ${key}: ${stringify(value, depth + 2)}`);
  return `{${result.join('')}\n${makeSpace(depth + 2)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 0) => {
    const output = innerObj.map((element) => {
      switch (element.type) {
        case 'unchanged':
          return `${makeSpace(depth)}  ${element.key}: ${stringify(element.currentValue)}`;
        case 'deleted':
          return `${makeSpace(depth)}- ${element.key}: ${stringify(element.currentValue)}`;
        case 'added':
          return `${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue)}`;
        case 'changed':
          return `${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue)}\n${makeSpace(depth)}- ${element.key}: ${stringify(element.beforeValue)}`;
        case 'nested':
          return `${makeSpace(depth)}  ${element.key}: ${iter(element.children, depth + 1)}`;
        default:
          return new Error(`Unknown type: ${element.type}`);
      }
    });
    return `{\n${output.join('\n')}\n}`;
  };
  return iter(obj);
};
export default renderStylish;
