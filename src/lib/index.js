import {default as visit} from 'unist-util-visit'

export default (processor, options) => {
  let preserve = (options || {}).preserve || 1
  let depth = (options || {}).depth || 0

  let transformer = (ast, file) => {
    visit(ast, 'heading', (node) => {
      if (depth < 0) {
        node.depth += Math.abs(depth)
        if (node.depth + depth > 4) {
          return node.depth = 4
        }
        return node.depth += depth
      }
      else {
        if (node.depth - depth < 1) {
          return node.depth = 1
        }
        return node.depth -= depth
      }
    })
  }

  return transformer
}
