# remark-behead

## 

###### description

Behead is a [remark](https://github.com/wooorm/remark) plugin to increase and decrease the weight of headings.  Passing a negative value to the weight option will decrease the heading weight and passing a possative value to the weight option will increase the heading weight.

## 

###### install

```bash
npm i --save remark-behead
```

## 

###### example

```js
remark.use(behead).process('## Heading')
//=> '## Heading\n'

remark.use(behead, {weight: 1}).process('### Heading')
//=> '## Heading\n'

remark.use(behead, {weight: -1}).process('### Heading')
//=> '#### Heading\n'

remark.use(behead, {weight: 10}).process('### Heading')
//=> '# Heading\n'

remark.use(behead, {weight: -10}).process('### Heading')
//=> '###### Heading\n'

remark.use(behead, {weight: -10, preserve: false}).process('### Heading')
//=> ' Heading\n'
```

## 

###### default options

```js
const OPTIONS = {
  preseerve: true,
  after: '',
  weight: 0
}
```
