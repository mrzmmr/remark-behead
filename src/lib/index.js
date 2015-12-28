/*
 * Imports
 */

import {default as visit} from 'unist-util-visit'
import {default as defop} from 'defop'

/*
 * Constants
 */

const MINWEIGHT = 6
const MAXWEIGHT = 1
const OPTIONS = {
  weight: 0,
  preserve: 1
}

/*
 * Main transformer plugin
 */

export default function plugin(processor, options=OPTIONS) {
  options = defop(options, OPTIONS)

  return (ast, file) => {
    return visit(ast, 'heading', (node) => {

      /*
       * Reduce heading weight
       *
       * Example:
       *   mdast.use(behead, {weight: -2}).process(markdown)
       */

      if (options.weight < 0) {
        node.depth += Math.abs(options.weight)

        if (node.depth > MINWEIGHT) {

          /*
           * Preserve option prevents heading weight reaching zero
           * ie if preserve is false then a options.weight value >
           * 4 will result in heading weight 0
           *
           * Example:
           *   mdast.use(behead, {weight: -5, preserve: false}).process('## Heading')
           *
           * Transforms to ' Heading\n'
           */

          if (options.preserve) {
            return node.depth = MINWEIGHT
          }
          return node.depth = 0
        }
        return node.depth
      }

      /*
       * Increase heading weight
       *
       * Example:
       *   mdast.use(behead, {weight: 2}).process('### Heading')
       *
       * Transforms to '# Heading'
       */

      else {
        node.depth -= options.weight

        if (node.depth < MAXWEIGHT) {
          return node.depth = MAXWEIGHT
        }
        return node.depth
      }
    })
  }
}
