import yaml from 'js-yaml';
import ini from 'ini';

const parseToObj = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      return new Error(`Invalid format: ${format}`);
  }
};

export default parseToObj;
