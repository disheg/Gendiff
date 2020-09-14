#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = gendiff(filepath1, filepath2, program.format);
    console.log(result);
  })
  .description('Compares two configuration files and shows a difference')
  .parse(process.argv);
