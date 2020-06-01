import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';

const readFile = (filePath) => fs.readFileSync(
  path.resolve(process.cwd(), filePath), 'utf-8',
);

const parserToObj = (file) => {
  switch (path.extname(file)) {
    case '.json':
      return JSON.parse(readFile(file));
    case '.yml':
      return yaml.safeLoad(readFile(file));
    case '.ini':
      return ini.parse(readFile(file));
    default:
      return null;
  }
};

export default parserToObj;
