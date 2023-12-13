/**
 * External dependencies
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit } from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata as BlockConfiguration, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
});
