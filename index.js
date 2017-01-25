const findAllBefore = require('unist-util-find-all-before')
const findAllAfter = require('unist-util-find-all-after')
const intersectionby = require('lodash.intersectionby')
const isstring = require('lodash.isstring')
const find = require('unist-util-find')
const is = require('unist-util-is')
const fs = require('fs')

const string = fs.readFileSync('./test.md', 'utf-8')
const remark = require('remark')()

///////////////////////////////////////////////////////////////////////////////

const tree = remark.parse(string)

const changeHeading = (node, value) => {
  if (is('heading', node)) {
    node.depth += value
    return node
  }
}

const replaceNodes = (tree, nodes) => {
  nodes.forEach((node) => {
    tree.children.splice(tree.children.indexOf(node), 1, node)
  })
  return tree
}

const findAllBetween = (tree, topNode, bottomNode, option) => {
  const bottomNodes = findAllBefore(tree, bottomNode, option)
  const topNodes = findAllAfter(tree, topNode, option)

  return intersectionby(topNodes, bottomNodes, (node1, node2) => {
    return is(node1, node2)
  })
}

const whichCommand = (tree, options) => {
  const between = options.user.between
  const before = options.user.before
  const after = options.user.after

  if (command === 'before') {
    if (!before || !isstring(before)) {
      throw new Error('Expected type:String passed to options.before')
    }
    return findAllBefore(tree, before, 'heading')
  }
  else if (command === 'after') {
    if (!after || !isstring(after !== 'string')) {
      throw new Error('Expected type:String passed to options.after')
    }

    return findAllAfter(tree, after 'heading')
  }
  else if (command === 'between') {
    if (!between || !Array.isArray(between) || between.length < 2) {
      throw new Error(
        'Expected type:Array with length 2 passed to options.between'
      )
    }

    return findAllBetween(tree, between[0], between[1], 'heading')
  }
}

const behead = (tree, options) => {
  const properties = {
    type: 'heading',
    children: [{
      value: string
    }]
  }

  const baseNode = find(tree, properties)
  const headings = whichCommand(tree, baseNode, null, options.command)

  if (options.user.include) {
    headings.push(baseNode)
  }

  return replaceNodes(tree, headings.map((node) => {
    return changeHeading(node, options.user.value)
  }))
}

const options = {
  command: 'between',
  user: {
    include: true,
    value: 3
  }
}

const newTree = behead(tree, 'Usage', options)

console.log(remark.stringify(newTree))
