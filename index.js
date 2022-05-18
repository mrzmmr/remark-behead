/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').Content} Content
 *
 * @typedef {string|number|Object.<string, unknown>} NodeSpecifier
 *
 * @typedef Options
 *   Configuration.
 * @property {number} [depth]
 *   Number by which the depth of heading is increased or decreased.
 * @property {2|3|4|5|6} [minDepth]
 *   Minimal depth for headings.
 * @property {NodeSpecifier} [after]
 *   Manipulates heading nodes after but not including the given node specifier.
 * @property {NodeSpecifier} [before]
 *   Manipulates heading nodes before but not including the given node specifier.
 * @property {[NodeSpecifier, NodeSpecifier]} [between]
 *   Manipulates hading nodes between but not including the two given node specifiers.
 */

import findAllBetween from 'unist-util-find-all-between';
import {findAllBefore} from 'unist-util-find-all-before';
import {findAllAfter} from 'unist-util-find-all-after';
import {visit} from 'unist-util-visit';
import find from 'unist-util-find';

/**
 * Plugin to increase or decrease heading depth.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkBehead(options = {}) {
	if (options.depth !== undefined && options.minDepth !== undefined) {
		throw new Error(
			'Only one of the `depth` and `minDepth` options is expected.'
		);
	}

	['after', 'before', 'between'].reduce((sum, option) => {
		const opt = /** @type {keyof Options} */ (option);
		if (options[opt] !== undefined) {
			if (sum > 0) {
				throw new Error(
					'Only one of the `after`, `before` and `between` options is expected.'
				);
			}
			return ++sum;
		}
		return sum;
	}, 0);

	return (tree) => {
		let depthChange = 0;

		if (options.depth !== undefined) {
			if (isNaN(options.depth)) {
				throw new Error('Expected a `number` for `depth` option.');
			}
			depthChange = options.depth;
		}

		if (options.minDepth !== undefined) {
			if (
				isNaN(options.minDepth) ||
				options.minDepth < 2 ||
				options.minDepth > 6
			) {
				throw new Error(
					'Expected a `number` between 2 and 6 for `minDepth` option.'
				);
			}
			/** @type {1|2|3|4|5|6|undefined} */
			let min;
			visit(tree, 'heading', (node) => {
				if (!min || node.depth < min) {
					min = node.depth;
				}
			});
			if (min && min < options.minDepth) {
				depthChange = options.minDepth - min;
			}
		}

		if (options.after !== undefined) {
			findAllAfter(tree, getNode(tree, options.after), (node) => {
				transform(/** @type {Content} */ (node), depthChange);
			});
		} else if (options.before !== undefined) {
			findAllBefore(tree, getNode(tree, options.before), (node) => {
				transform(/** @type {Content} */ (node), depthChange);
			});
		} else if (options.between !== undefined) {
			if (!Array.isArray(options.between) || options.between.length !== 2) {
				throw new Error(
					'Expected an `array` with two elements for `between` option.'
				);
			}
			findAllBetween(
				tree,
				getNode(tree, options.between[0]),
				getNode(tree, options.between[1]),
				/** @returns {node is Content} */
				(node) => {
					transform(/** @type {Content} */ (node), depthChange);
					return true;
				}
			);
		} else {
			visit(tree, (node) => {
				transform(node, depthChange);
			});
		}
		return tree;
	};
}

/**
 * @param {Root} tree
 * @param {NodeSpecifier} value
 * @returns {Content}
 */
function getNode(tree, value) {
	if (typeof value === 'number') {
		const node = tree.children[value];
		if (node === undefined) {
			throw new Error(`No node exists at index '${value}'.`);
		}
		return node;
	}
	const conditions =
		typeof value === 'string' ? {type: 'heading', children: [{value}]} : value;
	const node = find(tree, conditions);
	if (node === undefined) {
		throw new Error(
			`Could not find node with conditions '${JSON.stringify(conditions)}'.`
		);
	}
	return node;
}

/**
 * @param {Root|Content} node
 * @param {number} depthChange
 * @returns {void}
 */
function transform(node, depthChange) {
	if (node.type === 'heading') {
		const depth = node.depth + depthChange;
		if (depth > 6) {
			node.depth = 6;
		} else if (depth <= 0) {
			node.depth = 1;
		} else {
			node.depth = /** @type {1|2|3|4|5|6} */ (depth);
		}
	}
}
