import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const plain = (obj, parent = '') => {
  const result = obj.map((element) => {
    const {
      key,
      value,
      type,
      children,
    } = element;
    const currentValue = stringify(value.currentValue);
    const beforeValue = stringify(value.beforeValue);

    switch (type) {
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${parent}${key}' was changed from ${beforeValue} to ${currentValue}`;
      case 'deleted':
        return `Property '${parent}${key}' was deleted`;
      case 'added':
        return `Property '${parent}${key}' was added with value: ${currentValue}`;
      case 'nested':
        return plain(children, `${parent}${key}.`);
      default:
        return new Error(`Unknown type: ${type}`);
    }
  });
  return result.filter((element) => element !== null).join('\n');
};
export default plain;
