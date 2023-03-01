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
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'plugins_loaded', array( $this, 'blocks_loader' ) );
		add_action( 'after_setup_theme', array( $this, 'blocks_image_sizes' ) );
		add_action( 'init', array( $this, 'blocks_init' ) );
		remove_theme_support( 'core-block-patterns' );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \LSX\Blocks\Classes\Setup();    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
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
		 * Load Post Grid PHP
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-post-grid/index.php';

		/**
		 * Load Post Carousel PHP
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-post-carousel/index.php';

		/**
		 * Load Gutenberg testimonial Block.
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-testimonials/index.php';

		/**
		 * Load Gutenberg Group Block Styles
		 */
		require_once LSX_BLOCKS_PATH . 'src/extensions/block-group/index.php';
		require_once LSX_BLOCKS_PATH . 'src/extensions/block-heading/index.php';

		/**
		 * Load Gutenberg Cover Block Styles
		 */
		require_once LSX_BLOCKS_PATH . 'src/extensions/block-cover/index.php';

		/**
		 * Load Gutenberg Button Block Styles
		 */
		require_once LSX_BLOCKS_PATH . 'src/extensions/block-button/index.php';

		/**
		 * Load Team Block
		 */
		require_once LSX_BLOCKS_PATH . 'src/blocks/block-team/index.php';
	}

	/**
	 * Add image sizes
	 */
	public function blocks_image_sizes() {
		// Post Grid Block.
		add_image_size( 'lsx-block-post-grid-landscape', 600, 400, true );
		add_image_size( 'lsx-block-post-grid-square', 600, 600, true );
	}
}
