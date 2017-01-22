import fs from 'fs'
import tape from 'tape'
import behead from '../index'
import {default as remark} from 'remark'

const MAXWEIGHT = '#'
const MINWEIGHT = '######'

tape('Add heading weight', (test) => {
  const expected = '# Heading\n'
  const actual = remark
    .use(behead, {weight: 1})
    .process('## Heading')

  test.equal(actual, expected)
  test.end()
})

tape('Remove heading weight', (test) => {
  const expected = '## Heading\n'
  const actual = remark
    .use(behead, {weight: -1})
    .process('# Heading')

  test.equal(actual, expected)
  test.end()
})

tape('Add max heading weight', (test) => {
  const expected = MAXWEIGHT + ' Heading\n'
  const actual = remark
    .use(behead, {weight: 10})
    .process('## Heading')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight', (test) => {
  const expected = MINWEIGHT + ' Heading\n'
  const actual = remark
    .use(behead, {weight: -10})
    .process('## Heading')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading w/o preserve', (test) => {
  const expected = ' Heading\n'
  const actual = remark
    .use(behead, {weight: -10, preserve: false})
    .process('## Heading')

  test.equal(actual, expected)
  test.end()
})

tape('Add heading weight after', (test) => {
  const expected = '## Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: -1, after: '## Heading 1'})
    .process('## Heading 1\n# Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove heading weight after', (test) => {
  const expected = '## Heading 1\n\n# Heading 2\n'
  const actual = remark
    .use(behead, {weight: 1, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Add max heading weight after', (test) => {
  const expected = '## Heading 1\n\n' + MAXWEIGHT + ' Heading 2\n'
  const actual = remark
    .use(behead, {weight: 10, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight after', (test) => {
  const expected = '## Heading 1\n\n' + MINWEIGHT + ' Heading 2\n'
  const actual = remark
    .use(behead, {weight: -10, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight w/o preserve after', (test) => {
  const expected = '## Heading 1\n\n Heading 2\n'
  const actual = remark
    .use(behead, {weight: -10, after: '## Heading 1', preserve: false})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})


tape('Add heading weight before', (test) => {
  const expected = '### Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: -1, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove heading weight before', (test) => {
  const expected = '# Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: 1, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Add max heading weight before', (test) => {
  const expected = MAXWEIGHT + ' Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: 10, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight before', (test) => {
  const expected = MINWEIGHT + ' Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: -10, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight w/o preserve before', (test) => {
  const expected = ' Heading 1\n\n## Heading 2\n'
  const actual = remark
    .use(behead, {weight: -10, before: '## Heading 2', preserve: false})
    .process('## Heading 1\n## Heading 2')

  test.equal(actual, expected)
  test.end()
})

tape('Add heading weight between', (test) => {
  const expected = '## Heading 1\n\n### Heading 2\n\n## Heading 3\n'
  const actual = remark
    .use(behead, {weight: -1, between: ['## Heading 1', '## Heading 3']})
    .process('## Heading 1\n## Heading 2\n## Heading 3')

  test.equal(actual, expected)
  test.end()
})

tape('Remove heading weight between', (test) => {
  const expected = '## Heading 1\n\n# Heading 2\n\n## Heading 3\n'
  const actual = remark
    .use(behead, {weight: 1, between: ['## Heading 1', '## Heading 3']})
    .process('## Heading 1\n## Heading 2\n## Heading 3')

  test.equal(actual, expected)
  test.end()
})

tape('Add max heading weight between', (test) => {
  const expected = '## Heading 1\n\n' + MAXWEIGHT + ' Heading 2\n\n## Heading 3\n'
  const actual = remark
    .use(behead, {weight: 10, between: ['## Heading 1', '## Heading 3']})
    .process('## Heading 1\n## Heading 2\n## Heading 3')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight between', (test) => {
  const expected = '## Heading 1\n\n' + MINWEIGHT + ' Heading 2\n\n## Heading 3\n'
  const actual = remark
    .use(behead, {weight: -10, between: ['## Heading 1', '## Heading 3']})
    .process('## Heading 1\n## Heading 2\n## Heading 3')

  test.equal(actual, expected)
  test.end()
})

tape('Remove max heading weight w/o preserve between', (test) => {
  const expected = '## Heading 1\n\n Heading 2\n\n## Heading 3\n'
  const actual = remark
    .use(behead, {weight: -10, between: ['## Heading 1', '## Heading 3'], preserve: false})
    .process('## Heading 1\n## Heading 2\n## Heading 3')

  test.equal(actual, expected)
  test.end()
})
