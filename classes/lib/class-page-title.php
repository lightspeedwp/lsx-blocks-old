<?php
namespace lsx\blocks\classes\lib;
/**
 * @package   lsx\blocks\classes\lib
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2019 LightSpeed
 */

/**
 * Setup plugin class.
 *
 * @package lsx\blocks\classes\lib
 * @author  LightSpeed
 */
class Page_Title {

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
		add_action( 'init', array( $this, 'init' ), 999 );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\blocks\classes\Frontend();    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	/**
	 * Init
	 */
	public function init() {
		if ( defined( 'LSX_VERSION' ) ) {
			$version_compare = version_compare( '2.8.0', LSX_VERSION );
			if ( $version_compare < 1 ) {
				return;
			}
			// Remove the legacy page title and entry meta.
			remove_action( 'lsx_entry_top', 'lsx_post_header' );
			remove_action( 'lsx_entry_top', 'lsx_add_entry_meta', 999 );

			add_action( 'lsx_entry_top', array( $this, 'lsx_block_header' ) );
		}
	}

	/**
	 * Outputs the page header in a WordPress Block format.
	 */
	public function lsx_block_header() {
		$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
		if ( 'yes' === $disable_title ) {
			return;
		}
		?>
			<div class="entry-header">
				<?php do_action( 'lsx_block_header_top' ); ?>

				<?php $this->lsx_block_title(); ?>

				<?php do_action( 'lsx_block_header_bottom' ); ?>
			</div>
		<?php
	}

	/**
	 * Outputs the page title in a WordPress Block format.
	 */
	public function lsx_block_title() {
		$title = apply_filters( 'lsx_block_title', get_the_title() );
		$title = '<h1>' . $title . '</h1>';
		echo wp_kses_post( $title );
	}
}
