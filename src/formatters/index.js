import plain from './plain.js';
import stylish from './stylish.js';

export default (obj, format) => {
  if (format === 'plain') {
    return plain(obj);
  }

  return stylish(obj);
};
