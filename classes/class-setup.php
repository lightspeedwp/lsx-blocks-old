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
class Setup {

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'blocks_loader' ) );
		add_action( 'init', array( $this, 'blocks_init' ) );
	}

	/**
	 * Load the plugin textdomain
	 */
	public function blocks_init() {
		load_plugin_textdomain( 'lsx-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Loads the block code and the files needed for the block carousel.
	 */
	public function blocks_loader() {
		/**
		 * Load the blocks functionality
		 */
		require_once LSX_BLOCKS_PATH . 'dist/init.php';

		/**
		 * Load Gutenberg testimonial Block.
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-testimonials/index.php';

		/**
		 * Load Team Block
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-team/index.php';
	}
}
