# remark-behead

[![Build Status](https://img.shields.io/travis/mrzmmr/remark-behead?style=flat-square)](https://travis-ci.org/mrzmmr/remark-behead)
[![Coverage Status](https://img.shields.io/coveralls/github/mrzmmr/remark-behead?style=flat-square)](https://coveralls.io/github/mrzmmr/remark-behead)
[![Standard Readme Compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/remark-behead?style=flat-square)](https://libraries.io/npm/remark-behead)

> Increase or decrease heading depth

remark-behead is a [remark](https://github.com/remarkjs/remark) plugin to
increase or decrease heading depths, where the depth is changed either
relatively or by means of minimum.

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
import behead from 'remark-behead';
import {remark} from 'remark';

remark()
	.use(behead, {depth: 1, after: 0})
	.process(['# foo', '# bar', '# baz'].join('\n'))
	.then((vfile) => vfile.toString())
	.then((markdown) => console.log(markdown))
	.catch((err) => console.error(err));
/*
 * # foo
 *
 * ## bar
 *
 * ## baz
 */

remark()
	.use(behead, {minDepth: 2})
	.process(['# foo', '## bar', '### baz'].join('\n'))
	.then((vfile) => vfile.toString())
	.then((markdown) => console.log(markdown))
	.catch((err) => console.error(err));
/*
 * ## foo
 *
 * ### bar
 *
 * #### baz
 */
```

### Options

Specify the _depth change_ by providing one of the following options:

- `depth` [ [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) ]
- `minDepth` [ 2 | 3 | 4 | 5 | 6 ]

Specify the _scope_ by providing one of the following options:

- `after` [ NodeSpecifier ]
- `before` [ NodeSpecifier ]
- `between` [array](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/array) **[** [ NodeSpecifier ] **,** [ NodeSpecifier ] **]**

`NodeSpecifier` [ [string](https://developer.mozilla.org/en-us/docs/web/javascript/reference/global_objects/string) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) ] - When string, look for a heading with given value. When number, look for node at given index. When object, look for a node with given keys / values.

### options.depth

Passing a negative value will decrease the heading depth by the given amount.
Passing a positive value will increase the heading depth by the given amount.

### options.minDepth

The heading depth will be increased accordingly to match the given minimal depth. If there are no headings with a smaller depth than the minimum depth, nothing is changed.

### options.after

Manipulates heading nodes after but not including the given node specifier.

**example**

```js
remark()
	.use(behead, {after: 'foo', depth: 1})
	.processSync('# foo\n# bar\n# baz');

/* # foo\n\n## bar\n\n## baz\n */
```

### options.before

Manipulates heading nodes before but not including the given node specifier.

**example**

```js
remark()
	.use(behead, {before: 'baz', depth: 1})
	.processSync('# foo\n\n# bar\n# baz\n');

/* ## foo\n\n## bar\n\n# baz\n */
```

### options.between

Manipulates heading nodes between but not including the two given node specifiers,
starting with options.between[0] and ending with options.between[1].

**example**

```js
remark()
	.use(behead, {between: [0, 'baz'], depth: 1})
	.processSync('# foo\n# bar\n# baz');

/* # foo\n\n## bar\n\n# baz\n' */
```

## Tests

```sh
npm install
npm test
```

## Contribute

PRs accepted and greatly appreciated.

## License

MIT © mrzmmr
