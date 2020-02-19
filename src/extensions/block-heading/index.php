<?php
/**
 * Register Custom Block Styles for Heading
 *
 * @package LSX BLOCKS
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register Custom Block Styles for Group
	 *
	 * @return void
	 */
	function block_styles_register_heading_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/heading',
			array(
				'name'         => 'lsx-heading-style',
				'label'        => 'LSX Title',
				'isDefault'    => false,
				'style_handle' => 'lsx-heading-blocks-style-css',
			)
		);
	}

	add_action( 'init', 'block_styles_register_heading_block_styles' );
}
