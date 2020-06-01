import _ from 'lodash';
import format from './utils';
import parserToObj from './modules/parsers.js';

export default (file1, file2) => {
  const objFileOne = parserToObj(file1);
  const objFileTwo = parserToObj(file2);

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
