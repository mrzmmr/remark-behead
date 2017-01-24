# remark-behead

[![Build Status](https://img.shields.io/circleci/project/mrzmmr/remark-behead/master.svg?style=flat-square)](https://circleci.com/gh/mrzmmr/remark-behead/tree/master)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/remark-behead.svg)](https://codecov.io/gh/mrzmmr/remark-behead)
[![David](https://img.shields.io/david/mrzmmr/remark-behead.svg)](https://david-dm.org/)
[![David](https://img.shields.io/david/dev/mrzmmr/remark-behead.svg)](https://david-dm.org/)
[![npm](https://img.shields.io/npm/v/remark-behead.svg)](https://www.npmjs.com/package/array-2-object.svg)


> Increase or decrease heading weights

Remark-behead is a [remark](https://github.com/wooorm/remark) plugin to 
increase and decrease the weight of markdown headings. Passing a 
negative value to the weight option will decrease the heading weight.
Passing a positive value to the weight option will increase the heading 
weight.


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
```

### Options

**Properties**

-   `preserve` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Defaults to true
-   `before` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Defaults to null
-   `after` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Defaults to null
-   `weight` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defaults to 0

### Options.after

Manipulates heading nodes after but not including the given 
string. _**Note:** When using this option, behead will start 
working after the first occurrence of the given string._

**Example**

```javascript
remark.use(behead, {weight: 1, after: '# After this'})
  .process('# After this\n## Hello\n## World')

  => '# After this\n# Hello\n# World\n'
```

### Options.before

Manipulates heading nodes before but not including the given 
string. _**Note:** When using this option, behead will stop 
working at the first occurrence of the given string._

**Example**

```javascript
remark.use(behead, {weight: 1, before: '# Before this'})
  .process('# Hello\n# World\n# Before this')

  => '## Hello\n## World\n# Before this\n'
```

### Options.between

Manipulates hading nodes between but not including the two given 
strings, starting with options.between[0] and ending with
options.between[1].

**Example**

```javascript
remark(behead, {weight: 1, between: ['# Hello', '# World']})
  .process('# Hello\n# Between\n# World')

  => '# Hello\n## Between\n# World\n'
```

## Tests

```sh
npm install
npm test
```

## Contribute

PRs accepted and greatly appreciated.


## Dependencies

- [lodash.defaultsdeep](https://github.com/lodash/lodash): The lodash method `_.defaultsDeep` exported as a module.
- [remark](https://github.com/wooorm/remark/tree/master/packages): Markdown processor powered by plugins

## Dev Dependencies

- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-preset-env](https://github.com/babel/babel-preset-env): A Babel preset for each environment.
- [codecov](https://github.com/codecov/codecov-node): Uploading report to Codecov: https://codecov.io
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-standard](https://github.com/feross/eslint-config-standard): JavaScript Standard Style - ESLint Shareable Config
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise): Enforce best practices for JavaScript promises
- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard): ESlint Plugin for the Standard Linter
- [nyc](https://github.com/istanbuljs/nyc): the Istanbul command line interface
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)
- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers


## License

MIT © mrzmmr
