<?php
/**
 * Register Custom Block Styles for Pullquote
 *
 * @package LSX BLOCKS
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register Custom Block Styles for Group
	 *
	 * @return void
	 */
	function block_styles_register_pullquote_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/pullquote',
			array(
				'name'      => 'lsx-pullquote-style',
				'label'     => 'LSX Pullquote',
				'isdefault' => true,
			)
		);

		register_block_style(
			'core/quote',
			array(
				'name'      => 'lsx-quote-style',
				'label'     => 'LSX Quote',
				'isdefault' => true,
			)
		);
	}

	add_action( 'init', 'block_styles_register_pullquote_block_styles' );
}
