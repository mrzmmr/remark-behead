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

<<<<<<< HEAD
  let aSwitch = false
  let bSwitch = false
=======
  let bSwitch = false
  let aSwitch = false
>>>>>>> cb99d83e4c430aaa2628c3317dd845d2fd6061c3


  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

<<<<<<< HEAD
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
=======
      if (node.children && node.children[0].value && node.children[0].value === options.before) {
        bSwitch = !beforeSwitch
      }

      if (node.children && node.children[0].value && node.children[0].value === options.after) {
        aSwitch = !aSwitch
      }

      if (node.type && node.type === 'heading') {
        if ((options.before && bSwitch) || !options.before) {
          if ((options.after && aSwitch) || !options.after) {
>>>>>>> cb99d83e4c430aaa2628c3317dd845d2fd6061c3

            /*
             * Reduce heading weight
             *
             * Example:
             *   mdast.use(behead, {weight: -2}).process(markdown)
             */

            if (options.weight < 0) {
              node.depth += Math.abs(options.weight)

              if (node.depth > MINWEIGHT) {

<<<<<<< HEAD
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
=======
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
                  node.depth = MINWEIGHT
>>>>>>> cb99d83e4c430aaa2628c3317dd845d2fd6061c3
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
