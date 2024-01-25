/**
 * External dependencies
 */
import { registerProductEditorBlockType } from '@woocommerce/product-editor';

/**
 * Internal dependencies
 */
import { Edit } from './edit';
import metadata from './block.json';

registerProductEditorBlockType( {
  metadata: metadata as never,
  settings: {
    edit: Edit,
  }
});
