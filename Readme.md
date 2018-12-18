# remark-behead

[![Build Status](https://travis-ci.org/mrzmmr/remark-behead.svg?branch=master)](https://travis-ci.org/mrzmmr/remark-behead)
[![Coverage Status](https://coveralls.io/repos/github/mrzmmr/remark-behead/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/remark-behead?branch=master)


> Increase or decrease heading depth

Remark-behead is a [remark](https://github.com/wooorm/remark) plugin to 
increase or decrease heading depths. Passing a negative value to the depth option will decrease the heading depth. Passing a positive value to the depth option will increase the heading depth.


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm install --save remark-behead
```

## Usage

```js
const behead = require('remark-behead')
const remark = require('remark')

remark()
  .use(behead, { after: 0, depth: 1 })
  .process([
    '# foo',
    '# bar',
    '# baz'
  ].join('\n'))
  .then(vfile => vfile.toString())
  .then(markdown => console.log(markdown))
  .catch(err => console.error(err))
/*
 * result :
 *
 * # foo
 *
 * ## bar
 *
 * ## baz
 *
 */

```

### Options

-	`after` [ [string](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/string) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Node](https://github.com/syntax-tree/unist#node) ]

-   `before` [ [string](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/string) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Node](https://github.com/syntax-tree/unist#node) ]


-	`between` [array](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/array) **[** [ [string](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/string) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Node](https://github.com/syntax-tree/unist#node) ] **,** [ [string](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/string) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Node](https://github.com/syntax-tree/unist#node) ] **]**



### options.after

Manipulates heading nodes after but not including the given 
string. Behead will start working after the first occurrence of the given string.

**example**

```js
remark()
  .use(behead, { after: 'foo', depth: 1 })
  .processSync('# foo\n# bar\n# baz')

  /* # foo\n\n## bar\n\n## baz\n */
```

### options.before

Manipulates heading nodes before but not including the given 
string. Behead will stop 
working at the first occurrence of the given string.

**example**

```js
remark()
  .use(behead, { before: 'baz', depth: 1 })
  .processSync('# foo\n\n# bar\n# baz\n')

  /* ## foo\n\n## bar\n\n# baz\n */
```

### options.between

Manipulates hading nodes between but not including the two given 
strings, starting with options.between[0] and ending with
options.between[1].

**example**

```js
remark()
  .use(behead, { between: [ 0, 'baz' ], depth: 1 })
  .processSync('# foo\n# bar\n# baz')

  /* # foo\n\n## bar\n\n# baz\n' */
```

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![David](https://img.shields.io/david/mrzmmr/remark-behead.svg)](https://david-dm.org/)
[![David](https://img.shields.io/david/dev/mrzmmr/remark-behead.svg)](https://david-dm.org/)


## Tests

```sh
npm install
npm test
```

## Contribute

PRs accepted and greatly appreciated.



## License

MIT © mrzmmr
