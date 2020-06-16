import _ from 'lodash';

const renderToType = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const plain = (obj, parent = '') => {
  const result = obj.map((element) => {
    const { key, type, children } = element;
    const value = renderToType(element.value);
    const beforeValue = renderToType(element.beforeValue);
    const currentValue = renderToType(element.currentValue);
    switch (type) {
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${parent}${key}' was changed from ${beforeValue} to ${currentValue}`;
      case 'deleted':
        return `Property '${parent}${key}' was deleted`;
      case 'added':
        return `Property '${parent}${key}' was added with value: ${value}`;
      case 'nested':
        return plain(children, `${parent}${key}.`);
      default:
        return new Error(`Unknown type: ${type}`);
    }
  });
  return result.filter((element) => element !== null).join('\n');
};
export default plain;
