'use strict'

const findAllBetween = require('unist-util-find-all-between')
const findAllBefore = require('unist-util-find-all-before')
const findAllAfter = require('unist-util-find-all-after')
const visit = require('unist-util-visit')
const find = require('unist-util-find')
const is = require('unist-util-is')

module.exports = (options) => (tree) => {
  const settings = Object.assign({ depth: 0 }, options)

  const transform = (node) => {
    if (settings.depth && isNaN(settings.depth)) {
      throw new Error('Expected a `number` to change depth by.')
    } else if (settings.depth && node.type === 'heading') {
      const depth = node.depth + settings.depth
      if (depth > 6) {
        node.depth = 6
      } else if (depth < 0) {
        node.depth = 0
      } else {
        node.depth = depth
      }
    }
    return node
  }

  const getNode = (tree, value) => {
    if (typeof value === 'string') {
      return find(tree, { type: 'heading', children: [{ value: value }]})
    } else if (typeof value === 'number') {
      return tree.children[value]
    } else if (is(tree, value)) {
      return value
    } else {
      throw new Error('Expected a finite index or child node.')
    }
  }

  if (settings.after || settings.after === 0) {
    findAllAfter(tree, getNode(tree, settings.after), n => transform(n))
  } else if (settings.before) {
    findAllBefore(tree, getNode(tree, settings.before), n => transform(n))
  } else if (settings.between) {
    findAllBetween(
      tree,
      tree.children.indexOf(getNode(tree, settings.between[0])) + 1,
      getNode(tree, settings.between[1]),
      n => transform(n)
    )
  } else {
    visit(tree, n => transform(n))
  }
}
