import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const readFile = (filePath) => fs.readFileSync(
  path.resolve(process.cwd(), filePath),
);

const parserToObj = (file) => {
  switch (path.extname(file)) {
    case '.json':
      return JSON.parse(readFile(file));
    case '.yml':
      return yaml.safeLoad(readFile(file));
    default:
      return null;
  }
};

export default parserToObj;
