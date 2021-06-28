<?php
/**
 * Holds the Page Title Panel Settings.
 *
 * @package   lsx\blocks\classes\lib
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2019 LightSpeed
 */

namespace lsx\blocks\classes\lib;

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
	 * Holds the current screen
	 *
	 * @since 1.0.0
	 *
	 * @var      string
	 */
	public $screen = '';

	/**
	 * Holds body CSS classes.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	public $body_css = '';

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'wp_head', array( $this, 'wp_head' ), 999 );
		//add_filter( 'lsx_layout_customizer_controls', array( $this, 'customizer_controls' ), 10, 1 );
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
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Detects what screen it is and saves it.
	 *
	 * @return void
	 */
	public function customizer_controls( $lsx_controls ) {

		$post_type = array(
			'post',
			'page',
		);
		foreach ( $post_type as $post_type ) {
			$lsx_controls['settings'][ 'lsx_' . $post_type . '_title_disable' ] = array(
				'default'           => false,
				'sanitize_callback' => 'lsx_sanitize_checkbox',
				'transport'         => 'postMessage',
				'type'              => 'option',
			);

			$lsx_controls['fields'][ 'lsx_' . $post_type . '_title_disable' ] = array(
				'label'   => esc_html__( sprintf( 'Disable %s titles by default', $post_type ), 'lsx' ),
				'section' => 'lsx-layout',
				'type'    => 'checkbox',
			);
		}
		return $lsx_controls;
	}

	/**
	 * Detects what screen it is and saves it.
	 *
	 * @return void
	 */
	public function set_screen() {
		if ( is_singular( array( 'post', 'page' ) ) && function_exists( 'has_blocks' ) && has_blocks() && ! is_front_page() && ! is_home() ) {
			$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
			// If the post meta is empty, then default to what is set via the customizer.
			if ( 0 === $disable_title || '0' === $disable_title ) {
				if ( 'post' === get_post_type() ) {
					$disable_title = false;
				} else {
					$disable_title = true;
				}
				$disable_title = apply_filters( 'lsx_' . get_post_type() . '_title_disable', $disable_title );
			}

			if ( '' === $disable_title || false === $disable_title || 'no' === $disable_title ) {
				$this->screen = 'single';
				$this->body_css = 'lsx-page-title lsx-hero-banner-init';
			} else {
				$this->body_css = 'banner-disabled';
			}

			// Add the filter necessary for the singles.
			if ( function_exists( 'lsx_wc_disable_lsx_banner' ) ) {
				add_filter( 'lsx_hero_banner_override', 'lsx_wc_disable_lsx_banner' );
			}
			if ( function_exists( 'lsx_wc_disable_lsx_banner_plugin' ) ) {
				add_filter( 'lsx_hero_banner_override', 'lsx_wc_disable_lsx_banner_plugin' );
			}
			if ( function_exists( 'disable_wc_banner' ) ) {
				add_filter( 'lsx_hero_banner_override', array( $this, 'disable_wc_banner' ) );
			}

			if ( class_exists( 'LSX_Sensei' ) ) {
				$lsx_sensei = \LSX_Sensei::get_instance();
				add_filter( 'lsx_hero_banner_override', array( $lsx_sensei, 'lsx_sensei_disable_lsx_banner' ) );
			}
		} elseif ( is_singular( array( 'team', 'testimonial' ) ) ) {
			$this->screen = '';
			remove_action( 'lsx_content_wrap_before', 'lsx_global_header' );
			add_filter( 'lsx_banner_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_global_header_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_page_banner_disable', array( $this, 'disable_banner' ), 100, 1 );

		/*} elseif ( is_tax( $taxonomies ) ) {
			$this->screen = 'taxonomy';
		} elseif ( is_search() ) {
			$engine       = get_query_var( 'engine' );
			$this->screen = 'search';*/
		} else {
			$this->screen = '';
		}

		$override = apply_filters( 'lsx_hero_banner_override', false );
		if ( false !== $override ) {
			$this->screen = '';
		}
	}

	/**
	 * Outputs the single
	 *
	 * @return void
	 */
	public function wp_head() {
		$this->set_screen();
		add_action( 'body_class', array( $this, 'body_class' ) );

		if ( '' !== $this->screen ) {
			remove_action( 'lsx_content_wrap_before', 'lsx_global_header' );
			add_filter( 'lsx_banner_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_global_header_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_page_banner_disable', array( $this, 'disable_banner' ), 100, 1 );

			remove_action( 'lsx_entry_top', 'lsx_post_header' );
			remove_action( 'lsx_entry_top', 'lsx_add_entry_meta', 999 );
			add_action( 'lsx_entry_top', array( $this, 'lsx_block_header' ) );
		}
	}

	/**
	 * Adds our page title class to the body
	 *
	 * @param  array $classes
	 * @return array
	 */
	public function body_class( $classes ) {
		if ( '' !== $this->screen ) {
			$classes[] = $this->body_css;
		}
		return $classes;
	}

	/**
	 * Outputs the page header in a WordPress Block format.
	 */
	public function lsx_block_header() {
		?>
			<?php do_action( 'lsx_block_header_top' ); ?>

			<div class="lsx-hero-banner-block wp-block-cover has-background alignfull">
				<div class="wp-block-cover__inner-container">
					<div class="lsx-title-block wp-block-group">
						<div class="wp-block-group__inner-container">
							<?php $this->lsx_block_title(); ?>
						</div>
					</div>
					<?php
					if ( is_singular( 'post' ) ) {
						?>
							<div class="entry-meta">
								<?php lsx_post_meta_single_top(); ?>
							</div><!-- .entry-meta -->
						<?php
					}
					?>
				</div>
			</div>

			<?php do_action( 'lsx_block_header_bottom' ); ?>
		<?php
		remove_action( 'lsx_entry_top', array( $this, 'lsx_block_header' ) );
	}

	/**
	 * Outputs the page title in a WordPress Block format.
	 */
	public function lsx_block_title() {
		$title = apply_filters( 'lsx_block_title', get_the_title() );
		$title = '<h1 class="has-text-align-center">' . $title . '</h1>';
		echo wp_kses_post( $title );
	}

	/**
	 * Disable the LSX banners
	 *
	 * @param  boolean $disable
	 * @return boolean
	 */
	public function disable_banner( $disable ) {
		$disable = true;
		return $disable;
	}

	public function disable_wc_banner( $disable ) {
		// Cart and Checkout won't have banners of any kind.
		if ( function_exists( 'is_woocommerce' ) && ( is_checkout() || is_cart() ) ) {
			$disable = true;
		}

		// Product pages have their own banner function 'lsx_page_banner()'.
		if ( function_exists( 'is_woocommerce' ) && ( is_product() ) ) {
			$disable = true;
		}

		// Cart and Checkout won't have banners of any kind.
		if ( function_exists( 'tribe_is_event' ) && tribe_is_event() ) {
			$disable = true;
		}

		if ( function_exists( 'lsx_is_rest_api_request' ) && lsx_is_rest_api_request() ) {
			$disable = true;
		}

		// LSX Team Doesnt use a banner.
		if ( function_exists( 'is_woocommerce' ) && ( is_product() ) ) {
			$disable = true;
		}

		return $disable;
	}
}
