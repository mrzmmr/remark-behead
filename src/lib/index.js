/*
 * Imports
 */

import {default as visit} from 'unist-util-visit'

/*
 * Constants
 */

const MINHEAD = 4
const MAXHEAD = 1
const OPTIONS = {
  depth: 0,
  preserve: 1
}

/*
 * Expose
 */

module.exports = plugin

/*
 * Options helper to deal with default options
 */

export function handleOptions(options, callback) {
  return Object.keys(OPTIONS).reduce((prev, curr) => {
    prev[curr] = curr in prev ? prev[curr] : OPTIONS[curr]
    return prev
  }, options)
}

/*
 * Main transformer plugin
 */

export function plugin(processor, options) {
  options = handleOptions(options)

  return (ast, file) => {
    return visit(ast, 'heading', (node) => {

      /*
       * Reduce heading weight
       *
       * Example:
       *   mdast.use(behead, {depth: -2}).process('# Heading')
       *
       * Transforms to '### Heading'
       */

      if (options.depth < 0) {
        node.depth += Math.abs(options.depth)

        if (node.depth > MINHEAD) {

          /*
           * Preserve option prevents heading depth reaching zero
           * ie if preserve is false then a options.depth value >
           * 4 will result in heading depth 0
           *
           * Example:
           *   mdast.use(behead, {depth: -5, preserve: false}).process('## Heading')
           *
           * Transforms to ' Heading\n'
           */

          if (options.preserve) {
            return node.depth = MINHEAD
          }
          return node.depth = 0
        }
        return node.depth
      }

      /*
       * Increase heading weight
       *
       * Example:
       *   mdast.use(behead, {depth: 2}).process('### Heading')
       *
       * Transforms to '# Heading'
       */

      else {
        node.depth -= options.depth

        if (node.depth < MAXHEAD) {
          return node.depth = MAXHEAD
        }
        return node.depth
      }
    })
  }
}
