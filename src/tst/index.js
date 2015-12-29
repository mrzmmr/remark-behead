import * as fs from 'fs'
import * as tap from 'tap'
import * as remark from 'remark'
import {default as behead} from '../lib/index'

const MAXWEIGHT = '#'
const MINWEIGHT = '######'

tap.test('Remark plugin to add or remove heading weight', (plugin) => {
  plugin.test('Add 1 heading level', (assert) => {
    let expected = '## Heading\n'
    let actual = remark
      .use(behead, {weight: 1})
      .process('### Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Add max heading weight', (assert) => {
    let expected = MAXWEIGHT + ' Heading\n'
    let actual = remark
      .use(behead, {weight: 5})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove 1 heading weight', (assert) => {
    let expected = '### Heading\n'
    let actual = remark
      .use(behead, {weight: -1})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove max heading weight', (assert) => {
    let expected = '###### Heading\n'
    let actual = remark
      .use(behead, {weight: -10})
      .process('## Heading')

    assert.comment(actual)
    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove max heading w/o preserve', (assert) => {
    let expected = ' Heading\n'
    let actual = remark
      .use(behead, {weight: -10, preserve: false})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.end()
})
