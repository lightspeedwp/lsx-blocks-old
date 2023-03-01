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
 * Class Core
 * @package LSX\Blocks\Classes
 */
class Core {

	/**
	 * @var object LSX\Blocks\Classes\Setup();
	 */
	public $setup;

	/**
	 * @var object LSX\Blocks\Classes\Admin();
	 */
	public $admin;

	/**
	 * @var object LSX\Blocks\Classes\Frontend();
	 */
	public $frontend;

	/**
	 * @var array hold the array of library classes.
	 */
	public $lib = array();

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 */
	public function __construct() {
	}

	public function init() {
		$this->load_classes();
	}

	/**
	 * Loads the variable classes and the static classes.
	 */
	private function load_classes() {
		require_once( LSX_BLOCKS_PATH . 'classes/class-setup.php' );
		$this->setup = new Setup();

		require_once( LSX_BLOCKS_PATH . 'classes/class-admin.php' );
		$this->admin = new Admin();

		require_once( LSX_BLOCKS_PATH . 'classes/class-frontend.php' );
		$this->frontend = new Frontend();
	}
}
