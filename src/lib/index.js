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
  before: null,
  after: null,
  weight: 0
}

module.exports = function plugin(processor, options=OPTIONS) {
  options = defop(options, OPTIONS)

  let beforeSwitch = false
  let afterSwitch = false

  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

      if (!options.before && !options.after) {
        return behead(node, options, (error, node) => {
          return node
        })
      }

      else if (options.after) {
        if (afterSwitch) {
          return behead(node, options, (error, node) => {
            return node
          })
        }
        else {
          if (remark.stringify(node) === options.after) {
            afterSwitch = true
          }
          return node
        }
      }

      if (options.before) {
        if (beforeSwitch === true) {
          return node
        }
        else {
          if (remark.stringify(node) === options.before) {
            beforeSwitch = true
            return node
          }
          else {
            return behead(node, options, (error, node) => {
              return node
            })
          }
        }
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
