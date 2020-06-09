import _ from 'lodash';

export default (obj) => {
  const renderPlain = (arr, parent = '') => {
    const result = arr.map((element) => {
      let { currentValue, beforeValue } = element;
      let { value } = element;
      switch (element.type) {
        case 'changed':
          currentValue = _.isObject(currentValue) ? '[complex value]' : `'${currentValue}'`;
          beforeValue = _.isObject(beforeValue) ? '[complex value]' : `'${beforeValue}'`;
          return `Property '${parent}${element.key}' was changed from ${beforeValue} to ${currentValue}`;
        case 'deleted':
          return `Property '${parent}${element.key}' was deleted`;
        case 'added':
          value = _.isObject(value) ? '[complex value]' : `'${value}'`;
          return `Property '${parent}${element.key}' was added with value: ${value}`;
        case 'unchanged':
          return null;
        case 'nested':
          return `${renderPlain(element.value, `${parent}${element.key}.`).filter((node) => node !== null).join('\n')}`;
        default:
          return new Error('Error');
      }
    });
    return result;
  };
  return renderPlain(obj).join('\n');
};
