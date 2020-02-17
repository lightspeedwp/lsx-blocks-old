<?php

/**
 * Register Custom Block Styles
 */

if ( function_exists( 'register_block_style' ) ) {
	function block_styles_register_button_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/button',
			array(
				'name'         => 'lsx-button-style',
				'label'        => 'LSX Button Style',
				'isDefault'    => true,
				'style_handle' => 'lsx-blocks-style-css',
			)
		);
	}

	//add_action( 'init', 'block_styles_register_button_block_styles' );
}
