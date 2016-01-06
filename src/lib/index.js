/**
 * Behead is a [remark](https://github.com/wooorm/remark) plugin to 
 * increase and decrease the weight of markdown headings. Passing a 
 * negative value to the weight option will decrease the heading weight.
 * Passing a positive value to the weight option will increase the heading 
 * weightld
 *
 * [![Build Status](https://travis-ci.org/mrzmmr/remark-behead.svg?branch=master)](https://travis-ci.org/mrzmmr/remark-behead).
 *
 * ## install
 *
 * ```
 * npm install --save remark-behead
 * ```
 *
 * @module behead
 * @version 1.4.11
 * @author mrzmmr
 * </br></br>
 */

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

/**
 * @property {Boolean} preserve - Defaults to true
 * @property {String} before    - Defaults to null
 * @property {String} after     - Defaults to null
 * @property {Number} weight    - Defaults to 0
 * </br></br>
 */
let options = {
  preserve: true,
  between: null,
  before: null,
  after: null,
  weight: 0
}

module.exports = function plugin(processor, opts=options) {
  opts = defop(opts, options)

  let switched = false

  return (ast, file) => {
    return ast.children = ast.children.map((node) => {

      if (!opts.between && !opts.before && !opts.after) {
        return behead(node, opts)
      }

      /**
       * Manipulates heading nodes after but not including the given 
       * string. _**Note:** When using this option, behead will start 
       * working after the first occurrence of the given string._
       *
       * @name options.after
       *
       * @example
       * remark.use(behead, {weight: 1, after: '# After this'})
       *   .process('# After this\n## Hello\n## World')
       *
       *   => '# After this\n# Hello\n# World\n'
       */
      if (opts.after) {
        if (switched) {
          return behead(node, opts)
        }
        else {
          if (remark.stringify(node) === opts.after) {
            switched = true
          }
          return node
        }
      }

      /**
       * Manipulates heading nodes before but not including the given 
       * string. _**Note:** When using this option, behead will stop 
       * working at the first occurrence of the given string._
       *
       * @name options.before
       *
       * @example
       * remark.use(behead, {weight: 1, before: '# Before this'})
       *   .process('# Hello\n# World\n# Before this')
       *
       *   => '## Hello\n## World\n# Before this\n'
       */
      if (opts.before) {
        if (switched) {
          return node
        }
        else {
          if (remark.stringify(node) === opts.before) {
            switched = true
            return node
          }
          else {
            return behead(node, opts)
          }
        }
      }

      /**
       * Manipulates hading nodes between but not including the two given 
       * strings, starting with options.between[0] and ending with
       * options.between[1].
       *
       * @name options.between
       *
       * @example
       * remark(behead, {weight: 1, between: ['# Hello', '# World']})
       *   .process('# Hello\n# Between\n# World')
       *
       *   => '# Hello\n## Between\n# World\n'
       */
      if (opts.between) {
        if (switched) {

          if (remark.stringify(node) === opts.between[1]) {
            switched = false
            return node
          }

          return behead(node, opts)
        }

        if (remark.stringify(node) === opts.between[0]) {
          switched = true
          return node
        }

        return node
      }
    })

  }
}

export function behead(node, opts) {

  if (node.type && node.type === 'heading') {

    if (opts.weight < 0) {
      node.depth += Math.abs(opts.weight)

      if (node.depth > MINWEIGHT) {

        if (opts.preserve) {
          node.depth = MINWEIGHT
        }
        else {
          node.depth = 0
        }
      }
    }
    else {
      node.depth -= opts.weight

      if (node.depth < MAXWEIGHT) {
        node.depth = MAXWEIGHT
      }
    }

  }
  return node
}
