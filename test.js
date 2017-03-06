'use strict'

const behead = require('./_index')
const remark = require('remark')
const tap = require('tap')

tap.test('remark-behead', (t) => {
  let actual

  t.throws(() => {
    remark().use(behead, { depth: 'foo' }).processSync('# foo').toString()
    remark().use(behead, { between: {} }).processSync('# foo').toString()
    remark().use(behead, { before: {} }).processSync('# foo').toString()
    remark().use(behead, { after: {} }).processSync('# foo').toString()
    remark().use(behead, { before: 0 }).processSync('# foo').toString()
    remark().use(behead, { after: 2 }).processSync('# foo').toString()
    remark()
      .use(behead, { between: [ -1, 0 ] })
      .processSync('# foo')
      .toString()
  },
    'Expect a `number` for depth; Expect a finite index or child `node`'
  )

  t.doesNotThrow(() => {
    remark().use(behead, { after: {} }).process('# foo', (err, res) => {
      t.equal(err.message, 'Expected node')
    })

    t.equal(
      actual = remark().use(behead, { after: 0, depth: 1 }).processSync(
        [
          '# foo',
          '# bar'
        ].join('\n')
      )
      .toString(),
      '# foo\n\n## bar\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, { before: 1, depth: 1 }).processSync(
        [
          '# foo',
          '# bar'
        ].join('\n')
      )
      .toString(),
      '## foo\n\n# bar\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, {}).processSync('# foo').toString(),
      '# foo\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, { depth: 1 }).processSync('# foo').toString(),
      '## foo\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, { depth: -1 }).processSync('## foo').toString(),
      '# foo\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, { depth: 100 }).processSync('## foo').toString(),
      '###### foo\n',
      actual
    )

    t.equal(
      actual = remark().use(behead, { depth: -100 }).processSync('## foo').toString(),
      ' foo\n',
      actual
    )

    t.equal(
      actual = remark()
        .use(behead, { after: 'foo', depth: 1 })
        .processSync('# foo\n# bar')
        .toString(),
      '# foo\n\n## bar\n',
      actual
    )

    t.equal(
      actual = remark()
        .use(behead, { before: 'bar', depth: 1 })
        .processSync('# foo\n# bar')
        .toString(),
      '## foo\n\n# bar\n',
      actual
    )

    t.equal(
      actual = remark()
        .use(behead, { between: [ 'foo', 'baz' ], depth: 1 })
        .processSync([
          '# foo',
          '# bar',
          '# baz'
        ].join('\n'))
        .toString(),
      '# foo\n\n## bar\n\n# baz\n',
      actual
    )
  },
    'Should not throw'
  )
  t.end()
})
