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
	}

	/**
	 * Loads the actions and filters.
	 */
	public function init() {
		add_action( 'plugins_loaded', array( $this, 'blocks_loader' ) );
	}

	/**
	 * Load the plugin textdomain
	 */
	public function blocks_init() {
		load_plugin_textdomain( 'lsx-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}
}
