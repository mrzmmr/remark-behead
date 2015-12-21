# mdast-behead


===


Behead is an mdast plugin to increase and decrease the weight of headings.
Passing a negative value to the depth option will decrease the heading
weight and passing a possative value to the depth option will increase the
heading weight.


## Install


```bash
npm i --save mdast-behead
```


## Example


```js
var mdast = require('mdast')
var behead = require('mdast-behead')

mdast.use(behead).process('## Heading')
//=> '## Heading\n'

mdast.use(behead, {depth: -2}).process('## Heading')
//=> '#### Heading\n'

mdast.use(behead, {depth: 2}).process('## Heading')
//=> '# Heading\n'

mdast.use(behead, {depth: -8}).process('## Heading')
//=> '#### Heading\n'

mdast.use(behead, {depth: -8, preserve: false}).process('## Heading')
//=> ' Heading\n'
```


### Options


* **depth** [Number]
* **preserve** [Boolean]
