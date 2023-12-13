<?php
/**
 * Plugin Name:          My Extension Name
 * Description:          A block to demonstrate extending the Product Editor
 * Version:              0.1.0
 * Requires at least:    6.2
 * WC requires at least: 7.8
 * Requires PHP:         7.4
 * Author:               The WordPress Contributors
 * License:              GPL-3.0+
 * License URI:          https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:          my-extension-name
 *
 * @package              extension
 */

use Automattic\WooCommerce\Admin\BlockTemplates\BlockTemplateInterface;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\ProductFormTemplateInterface;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function my_extension_name_my_extension_name_block_init() {
	if ( isset( $_GET['page'] ) && $_GET['page'] === 'wc-admin' ) {
		register_block_type( __DIR__ . '/build/min-quantity' );
		register_block_type( __DIR__ . '/build/max-quantity' );
	}
}
add_action( 'init', 'my_extension_name_my_extension_name_block_init' );

function my_extension_name_my_extension_name_add_block_to_product_editor( BlockTemplateInterface $template ) {
	if ( $template instanceof ProductFormTemplateInterface && 'simple-product' === $template->get_id() ) {
		$basic_details = $template->get_section_by_id( 'basic-details' );

		if ( $basic_details ) {
			$basic_details->add_block(
				[
					'id' 	     => 'extension-my-extension-name',
					'order'	     => 40,
					'blockName'  => 'extension/my-extension-name',
					'attributes' => [
						'message' => 'My Extension Name',
					]
				]
			);
			$basic_details->add_block(
				[
					'id' 	     => 'extension-max-quantity',
					'order'	     => 50,
					'blockName'  => 'extension/max-quantity',
				]
			);
		}
	}
}
add_filter( 'woocommerce_block_template_register', 'my_extension_name_my_extension_name_add_block_to_product_editor', 100 );
