import fs from 'fs';
import path from 'path';
import format from './utils';

const parseFileToJson = (filePath) => JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), filePath),
  ),
);

const gendiff = (file1, file2) => {
  const objFileOne = parseFileToJson(file1);
  const objFileTwo = parseFileToJson(file2);

  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);

  const resultFileOne = keysOne.reduce((acc, element) => {
    if (keysTwo.includes(element)) {
      if (objFileOne[element] === objFileTwo[element]) {
        return [...acc, `  ${element}: ${objFileOne[element]}`];
      }
      if (objFileOne[element] !== objFileTwo[element]) {
        return [...acc, `+ ${element}: ${objFileTwo[element]}`, `- ${element}: ${objFileOne[element]}`];
      }
    } else {
      return [...acc, `- ${element}: ${objFileOne[element]}`];
    }
    return acc;
  }, []);

  const resultFileTwo = keysTwo.reduce((acc, element) => {
    if (!keysOne.includes(element)) {
      return [...acc, `+ ${element}: ${objFileTwo[element]}`];
    }
    return acc;
  }, []);

  const result = [...resultFileOne, ...resultFileTwo];
  return format(result);
};

export default gendiff;
