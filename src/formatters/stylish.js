import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth = 0) => {
  if (!_.isObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${indent(depth - 1)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 1) => {
    switch (innerObj.type) {
      case 'root':
        return `{\n${innerObj.children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n}`;
      case 'unchanged':
        return `${indent(depth)}  ${innerObj.key}: ${stringify(innerObj.value, depth + 1)}`;
      case 'deleted':
        return `${indent(depth)}- ${innerObj.key}: ${stringify(innerObj.value, depth + 1)}`;
      case 'added':
        return `${indent(depth)}+ ${innerObj.key}: ${stringify(innerObj.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent(depth)}- ${innerObj.key}: ${stringify(innerObj.value1, depth + 1)}`,
          `${indent(depth)}+ ${innerObj.key}: ${stringify(innerObj.value2, depth + 1)}`,
        ];
      case 'nested':
        return `${indent(depth)}  ${innerObj.key}: {\n${innerObj.children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n  ${indent(depth)}}`;
      default:
        return new Error(`Unknown type: ${innerObj.type}`);
    }
  };
  return iter(obj);
};
export default renderStylish;
