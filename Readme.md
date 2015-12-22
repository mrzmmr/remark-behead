# mdast-behead


Behead is an [mdast](https://github.com/wooorm/mdast) plugin to increase and decrease the weight of [markdown](https://daringfireball.net/projects/markdown/syntax#header) headings.  Passing a negative value to the weight option will decrease the heading weight and passing a possative value to the weight option will increase the heading weight.


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


## Options


```js
{
  weight: [Number],   // Value to increase decrease heading weight by.
  preserve: [Boolean] // Bool to let heading weight hit zero (no longer a heading) or not.
}
```


### License

[ISC](./License.md) [https://opensource.org/licenses/ISC](https://opensource.org/licenses/ISC)
