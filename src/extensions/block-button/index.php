<?php
/**
 * Register Custom Block Styles for Button
 *
 * @package LSX BLOCKS
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register Custom Block Styles for Button
	 *
	 * @return void
	 */
	function block_styles_register_button_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/button',
			array(
				'name'      => 'lsx-button-style-rounded',
				'label'     => __( 'Rounded' ),
				'isDefault' => false,
			)
		);
		register_block_style(
			'core/button',
			array(
				'name'      => 'lsx-button-style-square',
				'label'     => __( 'Square' ),
				'isDefault' => false,
			)
		);
	}

	add_action( 'init', 'block_styles_register_button_block_styles' );
}
