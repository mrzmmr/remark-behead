# mdast-behead


===


Behead is an mdast plugin to increase and decrease the weight of headings.
Passing a negative value to the weight option will decrease the heading
weight and passing a possative value to the weight option will increase the
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

mdast.use(behead, {weight: -2}).process('## Heading')
//=> '#### Heading\n'

mdast.use(behead, {weight: 2}).process('## Heading')
//=> '# Heading\n'

mdast.use(behead, {weight: -8}).process('## Heading')
//=> '#### Heading\n'

mdast.use(behead, {weight: -8, preserve: false}).process('## Heading')
//=> ' Heading\n'
```


### Options


* **weight** [Number] - Value to increase / decrease heading weight by.
* **preserve** [Boolean] - Bool to let heading weight hit zero or not. (No
* longer a heading)
