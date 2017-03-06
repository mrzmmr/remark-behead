'use strict'

var findAllBetween = require('unist-util-find-all-between')
var findAllBefore = require('unist-util-find-all-before')
var findAllAfter = require('unist-util-find-all-after')
var visit = require('unist-util-visit')
var find = require('unist-util-find')

module.exports = function (options) {
  var settings = options || {}

  function transform (node) {
    if (settings.depth && isNaN(settings.depth)) {
      throw new Error('Expected a `number` to change depth by.')
    } else if (settings.depth && node.type === 'heading') {
      var depth = node.depth + settings.depth
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

  function getNode (tree, value) {
    if (typeof value === 'string') {
      return find(tree, { type: 'heading', children: [{ value: value }]})
    } else if (typeof value === 'number') {
      return tree.children[value]
    } else {
      return find(tree, value)
    }
  }

  function transformer (tree) {
    if (settings.after || settings.after === 0) {
      findAllAfter(
        tree,
        getNode(tree, settings.after),
        function (n) { return transform(n) }
      )
    } else if (settings.before) {
      findAllBefore(
        tree,
        getNode(tree, settings.before),
        function (n) { return transform(n) }
      )
    } else if (settings.between) {
      findAllBetween(
        tree,
        tree.children.indexOf(getNode(tree, settings.between[0])) + 1,
        getNode(tree, settings.between[1]),
        function (n) { return transform(n)}
      )
    } else {
      visit(tree, function (n) { return transform(n) })
    }
  }

  return transformer
}
