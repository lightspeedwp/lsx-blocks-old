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
		if ( 'yes' === $disable_title || ( ! is_singular( array( 'post', 'page' ) ) ) ) {
			return;
		}
		?>
			<?php do_action( 'lsx_block_header_top' ); ?>

			<div class="wp-block-group <?php $this->the_title_width(); ?> has-dark-green-background-color has-background">
				<div class="wp-block-group__inner-container">
					<?php $this->lsx_block_title(); ?>
				</div>
			</div>

			<?php do_action( 'lsx_block_header_bottom' ); ?>
		<?php
	}

	/**
	 * Outputs the page title in a WordPress Block format.
	 */
	public function lsx_block_title() {
		$title = apply_filters( 'lsx_block_title', get_the_title() );
		$title = '<h1 class="' . $this->get_title_css() . '" >' . $title . '</h1>';
		echo wp_kses_post( $title );
	}

	/**
	 * Gets the title css classes.
	 *
	 * @return string
	 */
	public function get_title_css() {
		//$classes = 'has-dark-yellow-color has-text-color';
		$classes = '';

		$alignment = get_post_meta( get_the_ID(), 'lsx_title_alignment', true );
		if ( '' === $alignment || false === $alignment ) {
			$alignment = 'center';
		}
		$classes .= ' has-text-align-' . $alignment;

		/*switch ( $alignment ) {
			case 'left':
			break;

			case 'center':
			default:
				$classes .= ' has-text-align-center';
			break;
		}*/

		return $classes;
	}

	/**
	 * Gets the width you want for the parent group block .
	 *
	 * @return string
	 */
	public function the_title_width() {
		$classes = '';

		$width = get_post_meta( get_the_ID(), 'lsx_title_width', true );
		if ( '' === $width || false === $width ) {
			$width = 'alignfull';
		}
		$classes .= ' ' . $width;
		echo esc_attr( $classes );
	}
}
