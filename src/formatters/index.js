import renderPlain from './plain.js';
import renderPretty from './pretty.js';
import renderJson from './json.js';

export default (obj, format = 'pretty') => {
  switch (format) {
    case 'plain':
      return renderPlain(obj);
    case 'json':
      return renderJson(obj);
    case 'pretty':
      return renderPretty(obj);
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};
