// Definition for 'unist-util-find' until it is included in the module itself, see
// https://github.com/blahah/unist-util-find/pull/8
declare module 'unist-util-find' {
	import type {Root, Content} from 'mdast';

	declare type TestObj = {[key: string]: unknown};
	declare type TestFn<V extends Content> = (node: V) => boolean;

	declare function find<V extends Content>(
		tree: Root,
		test: string | TestObj | TestFn<V>
	): V | undefined;

	export default find;
}
