#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';

program
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const result = gendiff(file1, file2, program.format);
    console.log(result);
  })
  .description('Compares two configuration files and shows a difference')
  .parse(process.argv);
