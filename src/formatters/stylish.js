import _ from 'lodash';

const hasChildren = (obj) => (obj.children.length !== 0);

const stylishObj = (obj, space) => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (_.isObject(value)) return `\n${' '.repeat(space + 2)}  ${key}: ${stylishObj(value, space + 4)}`;
    return `\n${' '.repeat(space + 2)}  ${key}: ${value}`;
  });
  return `{${result.join('')}\n${' '.repeat(space)}}`;
};

const renderString = (obj, space) => {
  const { key, type } = obj;
  const value = _.isObject(obj.value)
    ? stylishObj(obj.value, space + 2)
    : obj.value;
  const currentValue = _.isObject(obj.currentValue)
    ? stylishObj(obj.currentValue, space + 2)
    : obj.currentValue;
  const beforeValue = _.isObject(obj.beforeValue)
    ? stylishObj(obj.beforeValue, space + 2)
    : obj.beforeValue;
  switch (type) {
    case 'unchanged':
      return `${' '.repeat(space)}  ${key}: ${value}`;
    case 'deleted':
      return `${' '.repeat(space)}- ${key}: ${value}`;
    case 'added':
      return `${' '.repeat(space)}+ ${key}: ${value}`;
    case 'changed':
      return `${' '.repeat(space)}+ ${key}: ${currentValue}\n${' '.repeat(space)}- ${key}: ${beforeValue}`;
    case 'nested':
      return null;
    default:
      return new Error(`Unknown type: ${type}`);
  }
};

const stylish = (obj, space = 0) => {
  const render = obj.map((element) => {
    if (hasChildren(element)) return `\n${' '.repeat(space + 2)}  ${element.key}: ${stylish(element.children, space + 4)}`;
    return `\n${renderString(element, space + 2)}`;
  });
  return `{${render.filter((element) => element !== null).join('')}\n${' '.repeat(space)}}`;
};
export default stylish;
