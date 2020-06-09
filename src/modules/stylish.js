import _ from 'lodash';

export default (obj) => {
  const signs = {
    unchanged: '  ',
    deleted: '- ',
    added: '+ ',
    changed: '+ ',
  };

  const stylishObj = (unchangedObj, count) => { // Stilish unchanged object
    const entries = Object.entries(unchangedObj);
    const str = entries.reduce((acc, [key, value]) => {
      let currentValue = value;
      if (_.isObject(value)) currentValue = `{\n${stylishObj(value, count + 2)}\n${' '.repeat(count + 4)}}`;
      acc.push(`${' '.repeat(count + 2)}  ${key}: ${currentValue}`);
      return acc;
    }, []);
    return str.join('\n');
  };

  const format = (arr, count = 2) => {
    const result = arr.reduce((acc, element) => {
      const sign = signs[element.type];
      if (element.type === 'changed') {
        let { currentValue, beforeValue } = element;
        currentValue = _.isObject(element.currentValue) ?
          `{\n${stylishObj(element.currentValue, count + 2)}\n${' '.repeat(count + 2)}}`
          : currentValue;
        beforeValue = _.isObject(element.beforeValue) ?
          `{\n${stylishObj(element.beforeValue, count + 2)}\n${' '.repeat(count + 2)}}`
          : beforeValue;
        acc.push(`${' '.repeat(count)}${sign}${element.key}: ${currentValue}\n${' '.repeat(count)}- ${element.key}: ${beforeValue}`);
      } else if (element.type) {
        let { value } = element;
        if (_.isObject(element.value)) {
          value = `{\n${stylishObj(element.value, count + 2)}\n${' '.repeat(count + 2)}}`;
        }
        acc.push(`${' '.repeat(count)}${sign}${element.key}: ${value}`);
      } else {
        acc.push(`${' '.repeat(count)}  ${element.key}: {\n${format(element.value, count + 4)}\n${' '.repeat(count + 2)}}`);
      }
      return acc;
    }, []);
    return `${result.join('\n')}`;
  };
  return `{\n${format(obj)}\n}`;
};
