<?php
namespace LSX\Blocks\Classes;

use LSX\Blocks\Classes\Block_Setup;

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
	 * @var object LSX\Blocks\Classes\Block_Setup();
	 */
	public $block_setup;

	/**
	 * @var object LSX\Blocks\Classes\Block_Functions();
	 */
	public $block_functions;

	/**
	 * @var object LSX\Blocks\Classes\Frontend();
	 */
	public $frontend;

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
		require_once( LSX_BLOCKS_PATH . 'includes/classes/class-setup.php' );
		$this->setup = new Setup();
		
		require_once( LSX_BLOCKS_PATH . 'includes/classes/class-block-setup.php' );
		$this->block_setup = new Block_Setup();
		$this->block_setup->init();

		require_once( LSX_BLOCKS_PATH . 'includes/classes/class-block-functions.php' );
		$this->block_functions = new Block_Functions();
		$this->block_functions->init();

		require_once( LSX_BLOCKS_PATH . 'includes/classes/class-frontend.php' );
		$this->frontend = new Frontend();
	}
}
