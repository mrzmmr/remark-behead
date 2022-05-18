import tap from 'tap';
import {remark} from 'remark';
import behead from './index.js';

tap.test('remark-behead', (t) => {
	let actual;

	t.throws(() => {
		remark().use(behead, {depth: 'foo'}).processSync('# foo').toString();
	}, 'Expect a `number` for `depth` option');

	t.throws(() => {
		remark().use(behead, {minDepth: 'foo'}).processSync('# foo').toString();
	}, 'Expect a `number` between 2 and 6 for `minDepth` option');
	t.throws(() => {
		remark().use(behead, {minDepth: 0}).processSync('# foo').toString();
	}, 'Expect a `number` between 2 and 6 for `minDepth` option');

	t.throws(() => {
		remark()
			.use(behead, {depth: 1, minDepth: 2})
			.processSync('# foo')
			.toString();
	}, 'Expect only one of the `depth` and `minDepth` options');

	t.throws(() => {
		remark()
			.use(behead, {after: 1, before: 0, between: [0, 1]})
			.processSync('# foo')
			.toString();
	}, 'Expect only one of the `after`, `before` and `between` options');
	t.throws(() => {
		remark().use(behead, {after: 1, before: 0}).processSync('# foo').toString();
	}, 'Expect only one of the `after`, `before` and `between` options');

	t.throws(() => {
		remark().use(behead, {before: {}}).processSync('# foo').toString();
	}, 'Expect a finite index or child `node`');
	t.throws(() => {
		remark().use(behead, {after: {}}).processSync('# foo').toString();
	}, 'Expect a finite index or child `node`');
	t.throws(() => {
		remark().use(behead, {before: -1}).processSync('# foo').toString();
	}, 'Expect a finite index or child `node`');
	t.throws(() => {
		remark().use(behead, {after: 2}).processSync('# foo').toString();
	}, 'Expect a finite index or child `node`');
	t.throws(() => {
		remark()
			.use(behead, {between: [-1, 0]})
			.processSync('# foo')
			.toString();
	}, 'Expect a finite index or child `node`');

	t.throws(() => {
		remark().use(behead, {between: {}}).processSync('# foo').toString();
	}, 'Expected an `array` with two elements for `between` option');
	t.throws(() => {
		remark()
			.use(behead, {between: [0]})
			.processSync('# foo')
			.toString();
	}, 'Expected an `array` with two elements for `between` option');

	t.doesNotThrow(() => {
		t.ok(remark().use(behead).freeze());
		t.equal(
			(actual = remark()
				.use(behead, {
					after: {type: 'heading', children: [{value: 'foo'}]},
					depth: 1,
				})
				.processSync(['# foo', '# bar'].join('\n'))
				.toString()),
			'# foo\n\n## bar\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {after: 0, depth: 1})
				.processSync(['# foo', '# bar'].join('\n'))
				.toString()),
			'# foo\n\n## bar\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {before: 1, depth: 1})
				.processSync(['# foo', '# bar'].join('\n'))
				.toString()),
			'## foo\n\n# bar\n',
			actual
		);

		t.equal(
			(actual = remark().use(behead, {}).processSync('# foo').toString()),
			'# foo\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {depth: 1})
				.processSync('# foo')
				.toString()),
			'## foo\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {depth: -1})
				.processSync('## foo')
				.toString()),
			'# foo\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {depth: 100})
				.processSync('## foo')
				.toString()),
			'###### foo\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {depth: -100})
				.processSync('## foo')
				.toString()),
			'# foo\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {after: 'foo', depth: 1})
				.processSync('# foo\n# bar')
				.toString()),
			'# foo\n\n## bar\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {before: 'bar', depth: 1})
				.processSync('# foo\n# bar')
				.toString()),
			'## foo\n\n# bar\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {between: ['foo', 'baz'], depth: 1})
				.processSync(['# foo', '# bar', '# baz'].join('\n'))
				.toString()),
			'# foo\n\n## bar\n\n# baz\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {minDepth: 2})
				.processSync(['# foo', '## bar', '### baz'].join('\n'))
				.toString()),
			'## foo\n\n### bar\n\n#### baz\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {minDepth: 2})
				.processSync(['## foo', '## bar', '### baz'].join('\n'))
				.toString()),
			'## foo\n\n## bar\n\n### baz\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {minDepth: 3})
				.processSync(['# foo', '## bar', '#### baz'].join('\n'))
				.toString()),
			'### foo\n\n#### bar\n\n###### baz\n',
			actual
		);

		t.equal(
			(actual = remark()
				.use(behead, {between: ['foo', 'baz'], minDepth: 2})
				.processSync(['# foo', '# bar', '# baz'].join('\n'))
				.toString()),
			'# foo\n\n## bar\n\n# baz\n',
			actual
		);
	}, 'Should not throw');
	t.end();
});
