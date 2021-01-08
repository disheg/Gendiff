import _ from 'lodash';

const makeSpace = (depth, isClosedBrackets = false) => {
  const startDepth = '  ';
  return isClosedBrackets ? ' '.repeat(4 * depth) : startDepth + ' '.repeat(4 * depth);
};
const stringify = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => `\n${makeSpace(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{${result.join('')}\n  ${makeSpace(depth - 1)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 0) => {
    const output = innerObj.flatMap((element) => {
      switch (element.type) {
        case 'unchanged':
          return `${makeSpace(depth)}  ${element.key}: ${stringify(element.currentValue, depth + 1)}`;
        case 'deleted':
          return `${makeSpace(depth)}- ${element.key}: ${stringify(element.currentValue, depth + 1)}`;
        case 'added':
          return `${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue, depth + 1)}`;
        case 'changed':
        return [
          `${makeSpace(depth)}+ ${element.key}: ${stringify(element.currentValue, depth + 1)}`,
          `${makeSpace(depth)}- ${element.key}: ${stringify(element.beforeValue, depth + 1)}`
          ];
        case 'nested':
          return `${makeSpace(depth)}  ${element.key}: ${iter(element.children, depth + 1)}`;
        default:
          return new Error(`Unknown type: ${element.type}`);
      }
    });
    return `{\n${output.join('\n')}\n${makeSpace(depth, true)}}`;
  };
  return iter(obj);
};
export default renderStylish;
