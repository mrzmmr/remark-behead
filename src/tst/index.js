import * as fs from 'fs'
import * as tap from 'tap'
import * as mdast from 'mdast'
import {default as behead} from '../lib/index'

tap.test('Mdast plugin to add or remove heading levels', (plugin) => {
  plugin.test('Add 1 heading level', (assert) => {
    let expected = '## Heading\n'
    let actual = mdast
      .use(behead, {weight: 1})
      .process('### Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Add max heading level', (assert) => {
    let expected = '# Heading\n'
    let actual = mdast
      .use(behead, {weight: 5})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove 1 heading level', (assert) => {
    let expected = '### Heading\n'
    let actual = mdast
      .use(behead, {weight: -1})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove max heading level', (assert) => {
    let expected = '#### Heading\n'
    let actual = mdast
      .use(behead, {weight: -5})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.test('Remove max heading w/o preserve', (assert) => {
    let expected = ' Heading\n'
    let actual = mdast
      .use(behead, {weight: -5, preserve: false})
      .process('## Heading')

    assert.equal(actual, expected)
    assert.end()
  })

  plugin.end()
})
