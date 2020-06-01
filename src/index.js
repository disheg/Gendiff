import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './utils';

const parseFileToJson = (filePath) => JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), filePath),
  ),
);

export default (file1, file2) => {
  const objFileOne = parseFileToJson(file1);
  const objFileTwo = parseFileToJson(file2);

  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);
  const keys = _.uniq([...keysOne, ...keysTwo]);

  const result = keys.reduce((acc, element) => {
    if (keysOne.includes(element) && keysTwo.includes(element)) {
      if (objFileOne[element] === objFileTwo[element]) {
        return [...acc, `  ${element}: ${objFileOne[element]}`];
      }
      return [...acc, `+ ${element}: ${objFileTwo[element]}`, `- ${element}: ${objFileOne[element]}`];
    }
    if (!keysOne.includes(element) && keysTwo.includes(element)) {
      return [...acc, `+ ${element}: ${objFileTwo[element]}`];
    }
    return [...acc, `- ${element}: ${objFileOne[element]}`];
  }, []);

  return format(result);
};
