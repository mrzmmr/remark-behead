import * as fs from 'fs'
import * as tap from 'tap'
import {default as remark} from 'remark'
import {default as behead} from '../lib/index'

const MAXWEIGHT = '#'
const MINWEIGHT = '######'

tap.test('Add 1 heading weight', (assert) => {
  let expected = '# Heading\n'
  let actual = remark
    .use(behead, {weight: 1})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove 1 heading weight', (assert) => {
  let expected = '## Heading\n'
  let actual = remark
    .use(behead, {weight: -1})
    .process('# Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight', (assert) => {
  let expected = MAXWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: 10})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight', (assert) => {
  let expected = MINWEIGHT + ' Heading\n'
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

tap.test('Add 1 heading weight after', (assert) => {
  let expected = '## Heading\n\n## Heading\n'
  let actual = remark
    .use(behead, {weight: -1, after: '## Heading'})
    .process('## Heading\n# Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove 1 heading weight after', (assert) => {
  let expected = '## Heading\n\n# Heading\n'
  let actual = remark
    .use(behead, {weight: 1, after: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight after', (assert) => {
  let expected = '## Heading\n\n' + MAXWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: 10, after: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight after', (assert) => {
  let expected = '## Heading\n\n' + MINWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: -10, after: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add 1 heading weight before', (assert) => {
  let expected = '### Heading\n\n## Heading\n'
  let actual = remark
    .use(behead, {weight: -1, before: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove 1 heading weight before', (assert) => {
  let expected = '# Heading\n\n## Heading\n'
  let actual = remark
    .use(behead, {weight: 1, before: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight before', (assert) => {
  let expected = MAXWEIGHT + ' Heading\n\n## Heading\n'
  let actual = remark
    .use(behead, {weight: 10, before: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight before', (assert) => {
  let expected = MINWEIGHT + ' Heading\n\n## Heading\n'
  let actual = remark
    .use(behead, {weight: -10, before: '## Heading'})
    .process('## Heading\n## Heading')

  assert.equal(actual, expected)
  assert.end()
})
