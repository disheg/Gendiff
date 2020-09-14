import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const renderPlain = (obj) => {
  const iter = (inerObj, parent = '') => {
    const result = inerObj.flatMap((element) => {
      const {
        key,
        beforeValue,
        currentValue,
        type,
        children,
      } = element;
      switch (type) {
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${parent}${key}' was changed from ${stringify(beforeValue)} to ${stringify(currentValue)}`;
        case 'deleted':
          return `Property '${parent}${key}' was deleted`;
        case 'added':
          return `Property '${parent}${key}' was added with value: ${stringify(currentValue)}`;
        case 'nested':
          return iter(children, `${parent}${key}.`);
        default:
          return new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(obj);
};
export default renderPlain;
