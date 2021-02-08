import _ from 'lodash';

const indent = (depth, spacesCount = 2) => ' '.repeat(depth * 4 - spacesCount);

const stringify = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${indent(depth - 1)}}`;
};

const renderStylish = (obj) => {
  const iter = (innerObj, depth = 0) => {
    const output = innerObj.flatMap((element) => {
      switch (element.type) {
        case 'root':
          return `{\n${iter(element.children, depth + 1).join('\n')}\n}`;
        case 'unchanged':
          return `${indent(depth)}  ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'deleted':
          return `${indent(depth)}- ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'added':
          return `${indent(depth)}+ ${element.key}: ${stringify(element.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent(depth)}- ${element.key}: ${stringify(element.value1, depth + 1)}`,
            `${indent(depth)}+ ${element.key}: ${stringify(element.value2, depth + 1)}`,
          ];
        case 'nested':
          return `${indent(depth)}  ${element.key}: {\n${iter(element.children, depth + 1).join('\n')}\n  ${indent(depth)}}`;
        default:
          return new Error(`Unknown type: ${element.type}`);
      }
    });
    return output;
  };
  return iter([obj]).join('');
};
export default renderStylish;
