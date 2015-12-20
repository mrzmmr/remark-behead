var visit = require('unist-util-visit')

module.exports = function (processor, options) {
  var preserve = (options || {}).preserve || 1
  var depth = (options || {}).depth || 0

  return function transformer(ast, file) {
    visit(ast, 'heading', function (node) {
      if (depth < 0) {
        depth = Math.abs(depth)
        if (node.depth + depth <= 4) {
          node.depth += depth
        }
        else {
          if (preserve) {
            node.depth = 4
          }
          else {
            node.depth = 0
          }
        }
      }
      else {
        if (node.depth - depth >= 0) {
          node.depth -= depth
        }
        else {
          node.depth = 1
        }
      }
    })
  }
}
