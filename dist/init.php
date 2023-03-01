<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package LSX BLOCKS
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function lsx_blocks_block_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the compiled styles
	wp_register_style(
		'lsx-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		LSX_BLOCKS_VER
	);
}
add_action( 'init', 'lsx_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function lsx_blocks_editor_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the js to remove unused core blocks.
	wp_enqueue_script(
		'theme-editor',
		plugins_url( '/dist/assets/js/editor.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-dom' ),
		LSX_BLOCKS_VER
	);

	// Load the compiled blocks into the editor.
	wp_enqueue_script(
		'lsx-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'wp-plugins' ),
		LSX_BLOCKS_VER
	);

	// Load the compiled styles into the editor.
	wp_enqueue_style(
		'lsx-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		LSX_BLOCKS_VER
	);


	if ( in_array( get_post_type(), array( 'post', 'page' ) ) ) {
		if ( 'post' === get_post_type() ) {
			$title_disabled = false;
		} else {
			$title_disabled = true;
		}
		$title_disabled = apply_filters( 'lsx_' . get_post_type() . '_title_disable', $title_disabled );
	}

	// Pass in REST URL.
	wp_localize_script(
		'lsx-blocks-block-js',
		'lsx_globals',
		array(
			'rest_url' => esc_url( rest_url() ),
			'title_disabled' => $title_disabled,
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'lsx_blocks_editor_assets' );
