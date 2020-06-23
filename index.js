import path from 'path';
import buildFormat from './src/formatters/index.js';
import parseToObj from './src/parsers.js';
import { buildTree, readFile } from './src/utils.js';

export default (filepath1, filepath2, format) => {
  const data1 = parseToObj(readFile(filepath1), path.extname(filepath1));
  const data2 = parseToObj(readFile(filepath2), path.extname(filepath2));

  return buildFormat(buildTree(data1, data2), format);
};
