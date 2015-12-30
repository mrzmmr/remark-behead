# remark-behead


===


Behead is a [remark](https://github.com/wooorm/remark) plugin to increase and decrease the weight of headings.  Passing a negative value to the weight option will decrease the heading weight and passing a possative value to the weight option will increase the heading weight.


## Install


```bash
npm i --save remark-behead
```


## Example


```js
var remark = require('remark')
var behead = require('remark-behead')

remark.use(behead).process('## Heading')
//=> '## Heading\n'

remark.use(behead, {weight: -2}).process('## Heading')
//=> '#### Heading\n'

remark.use(behead, {weight: 2}).process('## Heading')
//=> '# Heading\n'

remark.use(behead, {weight: -8}).process('## Heading')
//=> '#### Heading\n'

remark.use(behead, {weight: -8, preserve: false}).process('## Heading')
//=> ' Heading\n'
```


## Options



### License

[ISC](./License.md) [https://opensource.org/licenses/ISC](https://opensource.org/licenses/ISC)
