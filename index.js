import path from 'path';
import fs from 'fs';
import buildFormat from './src/formatters/index.js';
import parseToObj from './src/parsers.js';
import buildTree from './src/treeBuilder.js';

const readFile = (filePath) => fs.readFileSync(
  path.resolve(process.cwd(), filePath), 'utf-8',
);

export default (filepath1, filepath2, format) => {
  const data1 = parseToObj(readFile(filepath1), path.extname(filepath1).slice(1));
  const data2 = parseToObj(readFile(filepath2), path.extname(filepath2).slice(1));

  return buildFormat(buildTree(data1, data2), format);
};
