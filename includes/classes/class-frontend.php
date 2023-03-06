<?php
namespace LSX\Blocks\Classes;

/**
 * @package   LSX\Blocks\Classes
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2023 LightSpeed
 */

/**
 * Setup plugin class.
 *
 * @package LSX\Blocks\Classes
 * @author  LightSpeed
 */
class Frontend {

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ), 5 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ), 5 );
	}

	/**
	 * Enques the frontend scripts
	 */
	public function scripts() {
		if ( function_exists( 'has_blocks' ) && has_blocks() ) {
			wp_enqueue_script( 'lsx_blocks_script', LSX_BLOCKS_URL . 'dist/assets/js/frontend.js', array( 'jquery' ), LSX_BLOCKS_VER, true );

			wp_register_style(
				'lsx-blocks-style-css',
				plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
				array(),
				LSX_BLOCKS_VER
			);
		}
	}

	/**
	 * Enqueue assets for backend editor
	 *
	 * @since 1.0.0
	 */
	public function block_editor_assets() {
		// Load the compiled blocks into the editor.
		wp_enqueue_script(
			'lsx-blocks-block-js',
			LSX_BLOCKS_URL . 'dist/blocks.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'wp-plugins' ),
			LSX_BLOCKS_VER
		);
	}
}
