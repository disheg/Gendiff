import fs from 'fs';
import path from 'path';

const gendiff = (file1, file2) => {
  const result = [];
  const currentDirectory = process.cwd();
  const objFileOne = JSON.parse(
    fs.readFileSync(
      path.resolve(currentDirectory, file1)
    )
  );
  const objFileTwo = JSON.parse(
    fs.readFileSync(
      path.resolve(currentDirectory, file2)
    )
  );
  const keysOne = Object.keys(objFileOne);
  const keysTwo = Object.keys(objFileTwo);

  keysOne.map((element) => {
    if (keysTwo.includes(element)) {
      if (objFileOne[element] === objFileTwo[element]) {
        result.push([`  ${element}: ${objFileOne[element]}`]);
      }
      if (objFileOne[element] !== objFileTwo[element]) {
        result.push([`+ ${element}: ${objFileTwo[element]}`]);
        result.push([`- ${element}: ${objFileOne[element]}`]);
      }
    } else {
      result.push([`- ${element}: ${objFileOne[element]}`]);
    }
  });
  keysTwo.map((element) => {
    if (!keysOne.includes(element)) {
      result.push([`+ ${element}: ${objFileTwo[element]}`]);
    }
  })
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default gendiff;
