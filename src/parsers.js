import yaml from 'js-yaml';
import ini from 'ini';

const parseToObj = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    case '.ini':
      return ini.parse(file);
    default:
      return new Error(`Invalid format: ${format}`);
  }
};

export default parseToObj;
