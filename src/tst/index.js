import * as fs from 'fs'
import * as tap from 'tap'
import * as remark from 'remark'
import {default as behead} from '../lib/index'

const MAXWEIGHT = '#'
const MINWEIGHT = '######'

tap.test('Add 1 heading level', (assert) => {
  let expected = '## Heading\n'
  let actual = remark
    .use(behead, {weight: 1})
    .process('### Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight', (assert) => {
  let expected = MAXWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: 5})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove 1 heading weight', (assert) => {
  let expected = '### Heading\n'
  let actual = remark
    .use(behead, {weight: -1})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight', (assert) => {
  let expected = '###### Heading\n'
  let actual = remark
    .use(behead, {weight: -10})
    .process('## Heading')

  assert.comment(actual)
  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading w/o preserve', (assert) => {
  let expected = ' Heading\n'
  let actual = remark
    .use(behead, {weight: -10, preserve: false})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add 1 heading level', (assert) => {
  let expected = '# Heading\n## Heading\n'
  let actual = remark
    .use(behead, {weight: 1, after: '# Heading\n'})
    .process('# Heading\n# Heading')

  assert.equal(actual, expected)
  assert.end()
})
