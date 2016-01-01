/*
 * Imports
 */

import {default as remark} from 'remark'
import {default as defop} from 'defop'

/*
 * Constants
 */

const MINWEIGHT = 6
const MAXWEIGHT = 1

/*
 * Option defaults
 */

const OPTIONS = {
  preserve: true,
  after: '',
  weight: 0
}

export default function plugin(processor, options=OPTIONS) {
  options = defop(options, OPTIONS)

  let aswitch = false

  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

      if (options.after.length === 0) {
        return behead(node, options, (error, node) => {
          return node
        })
      }
      else {

        if (aswitch) {
          return behead(node, options, (error, node) => {
            return node
          })
        }
        else if (remark.stringify(node) === options.after) {
          aswitch = true
        }
        return node
      }
    })
  }
}

export function behead(node, options, callback) {

  if (node.type && node.type === 'heading') {

    if (options.weight < 0) {
      node.depth += Math.abs(options.weight)

      if (node.depth > MINWEIGHT) {

        if (options.preserve) {
          node.depth = MINWEIGHT
        }
        else {
          node.depth = 0
        }
      }
    }
    else {
      node.depth -= options.weight

      if (node.depth < MAXWEIGHT) {
        node.depth = MAXWEIGHT
      }
    }
  }
  return callback(null, node)
}

/**
 * ##### description
 *
 * Behead is a [remark](https://github.com/wooorm/remark) plugin to increase and decrease the weight of headings.  Passing a negative value to the weight option will decrease the heading weight and passing a possative value to the weight option will increase the heading weight.
 */

/**
 * ##### install
 *
 * ```bash
 * npm i --save remark-behead
 * ```
 */

/**
 * ##### example
 *
 * ```js
 * remark.use(behead).process('## Heading')
 * //=> '## Heading\n'
 *
 * remark.use(behead, {weight: 1}).process('### Heading')
 * //=> '## Heading\n'
 *
 * remark.use(behead, {weight: -1}).process('### Heading')
 * //=> '#### Heading\n'
 *
 * remark.use(behead, {weight: 10}).process('### Heading')
 * //=> '# Heading\n'
 *
 * remark.use(behead, {weight: -10}).process('### Heading')
 * //=> '###### Heading\n'
 *
 * remark.use(behead, {weight: -10, preserve: false}).process('### Heading')
 * //=> ' Heading\n'
 * ```
 */

/**
 * ##### default options
 *
 * ```js
 * const OPTIONS = {
 *   preseerve: true,
 *   after: '',
 *   weight: 0
 * }
 * ```
 */

