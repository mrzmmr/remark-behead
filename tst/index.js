var fs = require('fs')
var tap = require('tap')
var mdast = require('mdast')
var behead = require('../index')

tap.test('Increase heading level', function (assert) {
  var actual = mdast
    .use(behead, {depth: 1})
    .process('## This is a heading')

  var expected = '# This is a heading\n'

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Decrease heading level', function (assert) {
  var actual = mdast
    .use(behead, {depth: -1})
    .process('## This is a heading')

  var expected = '### This is a heading\n'

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Increase heading level: Max', function (assert) {
  var actual = mdast
    .use(behead, {depth: 5})
    .process('## This is a heading')

  var expected = '# This is a heading\n'

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Decrease heading level: Max', function (assert) {
  var actual = mdast
    .use(behead, {depth: -5})
    .process('## This is a heading')

  var expected = '#### This is a heading\n'

  assert.equal(actual, expected)
  assert.end()
})
  
tap.test('Decrease heading level: No preserve', function (assert) {
  var actual = mdast
    .use(behead, {depth: -5, preserve: false})
    .process('### This is a heading')

  var expected = ' This is a heading\n'

  assert.equal(actual, expected)
  assert.end()
})
