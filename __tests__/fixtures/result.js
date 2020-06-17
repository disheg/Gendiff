const resultDefault = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;


const resultPlainTree = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: 'false'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`;


const resultJSON = '[{"key":"name","value":"Petya","children":[],"type":"unchanged"},{"key":"age","currentValue":32,"beforeValue":30,"children":[],"type":"changed"},{"key":"city","value":"Stockholm","children":[],"type":"unchanged"},{"key":"job","value":"Microsoft","children":[],"type":"added"}]';

export { resultDefault, resultJSON, resultPlainTree };