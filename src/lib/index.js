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
  between: null,
  before: null,
  after: null,
  weight: 0
}

module.exports = function plugin(processor, options=OPTIONS) {
  options = defop(options, OPTIONS)

  let switched = false

  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

      if (!options.between && !options.before && !options.after) {
        return behead(node, options)
      }

      if (options.after) {
        if (switched) {
          return behead(node, options)
        }
        else {
          if (remark.stringify(node) === options.after) {
            switched = true
          }
          return node
        }
      }

      if (options.before) {
        if (switched) {
          return node
        }
        else {
          if (remark.stringify(node) === options.before) {
            switched = true
            return node
          }
          else {
            return behead(node, options)
          }
        }
      }

      if (options.between) {
        if (switched) {

          if (remark.stringify(node) === options.between[1]) {
            switched = false
            return node
          }

          return behead(node, options)
        }

        if (remark.stringify(node) === options.between[0]) {
          switched = true
          return node
        }

        return node
      }

    })
  }
}

export function behead(node, options) {

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
  return node
}
