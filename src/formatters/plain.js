import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || _.isNull(value) || _.isNumber(value)) {
    return value;
  }
  return `'${value}'`;
};

const renderPlain = (obj) => {
  const iter = (inerObj, parent = '') => {
    const result = inerObj.flatMap((element) => {
      const {
        key,
        type,
        value = null,
        value1 = null,
        value2 = null,
        children,
      } = element;
      switch (type) {
        case 'root':
          return iter(children);
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${parent}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'deleted':
          return `Property '${parent}${key}' was removed`;
        case 'added':
          return `Property '${parent}${key}' was added with value: ${stringify(value)}`;
        case 'nested':
          return iter(children, `${parent}${key}.`);
        default:
          return new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter([obj]);
};
export default renderPlain;
