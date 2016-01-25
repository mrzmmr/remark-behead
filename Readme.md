# .

## behead

[![AppVeyor branch](https://img.shields.io/appveyor/ci/mrzmmr/remark-behead/master.svg?style=flat-square)](https://ci.appveyor.com/project/mrzmmr/remark-behead)
[![Build Status](https://img.shields.io/circleci/project/mrzmmr/remark-behead/master.svg)](https://circleci.com/gh/mrzmmr/remark-behead/tree/master)
[![Coverage Status](https://img.shields.io/coveralls/mrzmmr/remark-behead/master.svg)](https://coveralls.io/github/mrzmmr/remark-behead?branch=master)

Behead is a [remark](https://github.com/wooorm/remark) plugin to 
increase and decrease the weight of markdown headings. Passing a 
negative value to the weight option will decrease the heading weight.
Passing a positive value to the weight option will increase the heading 
weight


### install

```sh
npm install [ --save ] remark-behead
```

##### then

```js
import behead from 'remark-behead'
```

**Meta**

-   **version**: 1.5.1
-   **author**: mrzmmr

## options

**Properties**

-   `preserve` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Defaults to true
-   `before` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Defaults to null
-   `after` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Defaults to null
-   `weight` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defaults to 0

## options.after

Manipulates heading nodes after but not including the given 
string. _**Note:** When using this option, behead will start 
working after the first occurrence of the given string._

**Examples**

```javascript
remark.use(behead, {weight: 1, after: '# After this'})
  .process('# After this\n## Hello\n## World')

  => '# After this\n# Hello\n# World\n'
```

## options.before

Manipulates heading nodes before but not including the given 
string. _**Note:** When using this option, behead will stop 
working at the first occurrence of the given string._

**Examples**

```javascript
remark.use(behead, {weight: 1, before: '# Before this'})
  .process('# Hello\n# World\n# Before this')

  => '## Hello\n## World\n# Before this\n'
```

## options.between

Manipulates hading nodes between but not including the two given 
strings, starting with options.between[0] and ending with
options.between[1].

**Examples**

```javascript
remark(behead, {weight: 1, between: ['# Hello', '# World']})
  .process('# Hello\n# Between\n# World')

  => '# Hello\n## Between\n# World\n'
```
