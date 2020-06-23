import _ from 'lodash';

const makeSpace = (depth) => ' '.repeat(depth);

const hasChildren = (obj) => (obj.children.length !== 0);

const stylishObj = (obj, depth) => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (_.isObject(value)) return `\n${makeSpace(depth + 2)}  ${key}: ${stylishObj(value, depth + 4)}`;
    return `\n${makeSpace(depth + 2)}  ${key}: ${value}`;
  });
  return `{${result.join('')}\n${makeSpace(depth)}}`;
};

const stringify = (obj, depth, sign = ' ') => {
  const { key } = obj;
  const currentValue = _.isObject(obj.value.currentValue)
    ? stylishObj(obj.value.currentValue, depth + 2)
    : obj.value.currentValue;
  const beforeValue = _.isObject(obj.value.beforeValue)
    ? stylishObj(obj.value.beforeValue, depth + 2)
    : obj.value.beforeValue;
  if (beforeValue !== null) {
    return `${makeSpace(depth)}+ ${key}: ${currentValue}\n${makeSpace(depth)}- ${key}: ${beforeValue}`;
  }
  return `${makeSpace(depth)}${sign} ${key}: ${currentValue}`;
};

const renderString = (obj, depth) => {
  const { type } = obj;
  switch (type) {
    case 'unchanged':
      return stringify(obj, depth);
    case 'deleted':
      return stringify(obj, depth, '-');
    case 'added':
      return stringify(obj, depth, '+');
    case 'changed':
      return stringify(obj, depth);
    case 'nested':
      return null;
    default:
      return new Error(`Unknown type: ${type}`);
  }
};

const stylish = (obj, depth = 0) => {
  const render = obj.map((element) => {
    if (hasChildren(element)) return `\n${makeSpace(depth + 2)}  ${element.key}: ${stylish(element.children, depth + 4)}`;
    return `\n${renderString(element, depth + 2)}`;
  });
  return `{${render.filter((element) => element !== null).join('')}\n${makeSpace(depth)}}`;
};
export default stylish;
