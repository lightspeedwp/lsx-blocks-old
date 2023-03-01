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
	}

	/**
	 * Enques the frontend scripts
	 */
	public function scripts() {
		if ( function_exists( 'has_blocks' ) && has_blocks() ) {
			wp_enqueue_script( 'lsx_blocks_script', LSX_BLOCKS_URL . '/dist/assets/js/frontend.js', array( 'jquery' ), LSX_BLOCKS_VER, true );

			wp_enqueue_style(
				'lsx-blocks-deprecated-css', // Handle.
				LSX_BLOCKS_URL . '/dist/deprecated.css',
				array() // Dependency to include the CSS after it.
			);
		}
	}
}
