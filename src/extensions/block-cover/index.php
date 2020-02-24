<?php
/**
 * Register Custom Block Styles for Cover
 *
 * @package LSX BLOCKS
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register Custom Block Styles for Cover
	 *
	 * @return void
	 */
	function block_styles_register_cover_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/cover',
			array(
				'name'      => 'lsx-cover-style',
				'label'     => __( 'LSX Banner' ),
				'isDefault' => true,
			)
		);
	}

	add_action( 'init', 'block_styles_register_cover_block_styles' );
}
