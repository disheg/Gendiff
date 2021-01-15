import _ from 'lodash';

const indent = (depth, spacesCount = 4) => depth === 0 ? '' : ' '.repeat(depth * spacesCount - 2);

const stringify = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{${result.join('\n')}\n  ${indent(depth - 1)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 0) => {
    const output = innerObj.flatMap((element) => {
      switch (element.type) {
        case 'unchanged':
          return `${indent(depth)}  ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'deleted':
          return `${indent(depth)}- ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'added':
          return `${indent(depth)}+ ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent(depth)}+ ${element.key}: ${stringify(element.currentValue, depth + 1)}`,
            `${indent(depth)}- ${element.key}: ${stringify(element.beforeValue, depth + 1)}`,
          ];
        case 'nested':
          return `${indent(depth)}  ${element.key}: ${iter(element.children, depth + 1)}`;
        default:
          return new Error(`Unknown type: ${element.type}`);
      }
    });
    return `{\n${output.join('\n')}\n${indent(depth)}}`;
  };
  return iter(obj);
};
export default renderStylish;
