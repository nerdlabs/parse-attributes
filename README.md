# parse-attributes [![Build Status][0]][1] [![Coverage Status][2]][3]

Parse attributes from xmlish strings like a boss


## Install

```shell
npm install --save parse-attributes
```

## Docs
[Test-documentation][4] generated with [mocha's][5] "doc" reporter.

## Usage

```js
var parseAttributes = require('parse-attributes');
console.log(parseAttributes('foo="bar" bar=baz boo=\'quux\' boolean'));
```
Outputs:
```js
{
    "foo": "bar",
    "bar": "baz"
    "boo": "quux"
    "boolean": true
}
```

## Things that break
The parser currently is not able to differentiate between escaped quotes and
the ending quote.
As soon as the same type of quote as the opening quote is found, the parser
stops and takes takes everything in-between as value. This breaks valid JSON in attribute values.


[0]: https://img.shields.io/travis/nerdlabs/parse-attributes.svg
[1]: https://travis-ci.org/nerdlabs/parse-attributes
[2]: https://img.shields.io/coveralls/nerdlabs/parse-attributes.svg
[3]: https://coveralls.io/r/nerdlabs/parse-attributes?branch=master
[4]: http://nerdlabs.github.io/parse-attributes/docs/
[5]: http://mochajs.org/
