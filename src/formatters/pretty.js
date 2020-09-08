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

const stringify = (value) => (_.isObject(value) ? stylishObj(value, 2) : value);

const renderString = (obj, depth) => {
  const { type } = obj;
  switch (type) {
    case 'unchanged':
      return `${makeSpace(depth)}  ${obj.key}: ${stringify(obj.currentValue)}`;
    case 'deleted':
      return `${makeSpace(depth)}- ${obj.key}: ${stringify(obj.currentValue)}`;
    case 'added':
      return `${makeSpace(depth)}+ ${obj.key}: ${stringify(obj.currentValue)}`;
    case 'changed':
      if (obj.beforeValue) {
        return `${makeSpace(depth)}+ ${obj.key}: ${stringify(obj.currentValue)}\n${makeSpace(depth)}- ${obj.key}: ${stringify(obj.beforeValue)}`;
      }
      return `${makeSpace(depth)}+ ${obj.key}: ${stringify(obj.currentValue)}`;
    case 'nested':
      return null;
    default:
      return new Error(`Unknown type: ${type}`);
  }
};

const renderPretty = (obj) => {
  const iter = (innerObj, depth = 1) => {
    const render = innerObj.map((element) => {
      if (hasChildren(element)) return `\n${makeSpace(depth * 2)}  ${element.key}: ${iter(element.children, depth + 1)}`;
      return `\n${renderString(element, depth * 2)}`;
    });
    return `{${render.filter((element) => element !== null).join('')}\n}`;
  };
  return iter(obj);
};
export default renderPretty;
