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

/*
 * Default options
 */

const OPTIONS = {
  preserve: true,
  weight: 0
}

/*
 * Main transformer plugin
 */

export default function plugin(processor, options=OPTIONS) {
  options = defop(options, OPTIONS)

  let aSwitch = false
  let bSwitch = false

  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

      if (node.children &&
        node.children[0].value &&
        node.children[0].value === options.after) {
        aSwitch = !aSwitch
      }

      if (node.children &&
        node.children[0].value &&
        node.children[0].value === options.before) {
        bSwitch = !bSwitch
      }

      if (node.type && node.type === 'heading') {
        if ((options.after && aSwitch) || !options.after) {
          if ((options.before && bSwitch) || !options.before) {

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
                else {
                  node.depth = 0
                }
              }
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
                node.depth = MAXWEIGHT
              }
            }
          }
        }
      }
      return node
    })
  }
}
