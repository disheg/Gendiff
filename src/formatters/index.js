import renderPlain from './plain.js';
import renderStylish from './stylish.js';

export default (obj, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return renderPlain(obj);
    case 'json':
      return JSON.stringify(obj);
    case 'stylish':
      return renderStylish(obj);
    default:
      throw new Error(`Invalid format: ${formatName}`);
  }
};
