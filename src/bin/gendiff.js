#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';

program
  .version('0.0.1')
  .usage('[options] <filepath1> <filepath2>')
  .command('gendiff <filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2));
  })
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
