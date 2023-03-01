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
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object LSX\Blocks\Classes\Core()
	 */
	protected static $instance = null;

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
	 * @var array holds the LSX options
	 */
	public $options = array();

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		$this->load_options();
		$this->load_classes();
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object LSX\Blocks\Classes\Core()    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;

	}

	/**
	 * Loads the LSX Options.
	 *
	 * @return void
	 */
	public function load_options() {
		if ( function_exists( 'tour_operator' ) ) {
			$this->options = get_option( '_lsx-to_settings', false );
		} else {
			$this->options = get_option( '_lsx_settings', false );
			if ( false === $this->options ) {
				$this->options = get_option( '_lsx_lsx-settings', false );
			}
		}
	}

	/**
	 * Loads the variable classes and the static classes.
	 */
	private function load_classes() {
		require_once( LSX_BLOCKS_PATH . 'classes/class-setup.php' );
		$this->setup = Setup::get_instance();

		require_once( LSX_BLOCKS_PATH . 'classes/class-admin.php' );
		$this->admin = Admin::get_instance();

		require_once( LSX_BLOCKS_PATH . 'classes/class-frontend.php' );
		$this->frontend = Frontend::get_instance();

		require_once( LSX_BLOCKS_PATH . 'classes/lib/class-page-title.php' );
		$this->lib['page_title'] = lib\Page_Title::get_instance();
	}
}
