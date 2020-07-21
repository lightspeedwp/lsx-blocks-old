<?php
/**
 * Banners Frontend Class
 *
 * @package lsx-business-directory
 */

namespace lsx\blocks\classes\lib;

/**
 * Undocumented class
 */
class Hero_Banner {

	/**
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object \lsx\blocks\classes\lib\Hero_Banners()
	 */
	protected static $instance = null;

	/**
	 * This holds the current screen being displayed (single, archive or taxonomy ).
	 *
	 * @var string
	 */
	public $screen = '';

	/**
	 * Contructor
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'wp_head' ) );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\blocks\classes\lib\Hero_Banners()    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Outputs the single
	 *
	 * @return void
	 */
	public function wp_head() {
		$this->set_screen();
		if ( '' !== $this->screen && function_exists( 'has_blocks' ) && has_blocks() ) {
			remove_action( 'lsx_content_wrap_before', 'lsx_global_header' );
			add_filter( 'lsx_banner_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_global_header_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'lsx_page_banner_disable', array( $this, 'disable_banner' ), 100, 1 );
			add_filter( 'body_class', array( $this, 'banner_class' ), 10, 1 );
			add_action( 'lsx_content_top', array( $this, 'maybe_display_banner' ) );
			// These can be removed if an action is run later in the `wp_head`.
			add_filter( 'lsx_hero_banner_title', array( $this, 'default_banner_title' ), 10, 1 );
		}
	}

	/**
	 * Detects what screen it is and saves it.
	 *
	 * @return void
	 */
	public function set_screen() {
		$post_types = array();
		$taxonomies = array( 'industry', 'location' );
		if ( is_singular( $post_types ) && function_exists( 'has_blocks' ) && has_blocks() && ! is_front_page() && ! is_home() ) {
			$disable_banner = get_post_meta( get_the_ID(), 'lsx_disable_banner', true );
			if ( 'yes' == $disable_banner ) {
				$this->screen = 'single';
			}
		} /* elseif ( is_post_type_archive( $post_types ) ) {
			$this->screen = 'archive';
		} elseif ( is_tax( $taxonomies ) ) {
			$this->screen = 'taxonomy';
		} elseif ( is_search() ) {
			$engine       = get_query_var( 'engine' );
			$this->screen = 'search';
		}*/ else {
			$this->screen = '';
		}

		$this->screen = apply_filters( 'lsx_hero_banner_override', $this->screen );
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

	/**
	 * Adds a body class if the banner is disabled.
	 *
	 * @param array $classes The current <body> tag classes.
	 * @return array
	 */
	public function banner_class( $classes = array() ) {
		switch ( $this->screen ) {
			case 'single':
				$disable = get_post_meta( get_the_ID(), 'lsx_hero_banner_disable', true );
				break;
			case 'archive':
				$disable = 'on';
				break;
			case 'taxonomy':
				$disable = get_term_meta( get_queried_object_id(), 'lsx_hero_banner_disable', true );
				break;
			case 'search':
				$disable = 'on';
				break;
			default:
				$disable = '';
				break;
		}
		if ( 'on' === $disable ) {
			$classes[] = 'banner-disabled';
		} else {
			$classes[] = 'lsx-hero-banner-init';
		}
		return $classes;
	}

	/**
	 * Checks to see if it one of the listings pages and calls the banner ouput.
	 *
	 * @return void
	 */
	public function maybe_display_banner() {
		switch ( $this->screen ) {
			case 'single':
				$this->single_banner();
				break;
			case 'archive':
				$this->archive_banner();
				break;
			case 'taxonomy':
				$this->term_banner();
				break;
			case 'search':
				$this->search_banner();
				break;
			default:
				break;
		}
		remove_action( 'lsx_content_top', array( $this, 'maybe_display_banner' ) );
	}

	/**
	 * Outputs the single listing banner
	 *
	 * @return void
	 */
	public function single_banner() {
		$disable = get_post_meta( get_the_ID(), 'lsx_hero_banner_disable', true );
		if ( ! is_singular() ) {
			return;
		}
		if ( true !== $disable && 'on' !== $disable ) {
			$this->do_banner();
		}
	}

	/**
	 * Outputs the post type archive listing banner.
	 *
	 * @return void
	 */
	public function archive_banner() {
		$disable = get_option( 'archive_banner_disable' );
		if ( true !== $disable && 'on' !== $disable ) {
			$args = array(
				'image'    => apply_filters( 'lsx_hero_banner_image', get_option( 'archive_banner' ) ),
				'colour'   => apply_filters( 'lsx_hero_banner_colour', get_option( 'archive_banner_colour' ) ),
				'title'    => apply_filters( 'lsx_hero_banner_title', get_option( 'archive_banner_title' ) ),
				'subtitle' => apply_filters( 'lsx_hero_banner_subtitle', get_option( 'archive_banner_subtitle' ) ),
			);
			$this->do_banner( $args );
		}
	}

	/**
	 * Outputs the taxonomies term banner
	 *
	 * @return void
	 */
	public function term_banner() {
		$disable = get_term_meta( get_queried_object_id(), 'lsx_hero_banner_disable', true );
		if ( true !== $disable && 'on' !== $disable ) {
			$args = array(
				'image'    => apply_filters( 'lsx_hero_banner_image', get_term_meta( get_queried_object_id(), 'lsx_hero_banner', true ) ),
				'colour'   => apply_filters( 'lsx_hero_banner_colour', get_term_meta( get_queried_object_id(), 'lsx_hero_banner_colour', true ) ),
				'title'    => apply_filters( 'lsx_hero_banner_title', get_term_meta( get_queried_object_id(), 'lsx_hero_banner_title', true ) ),
				'subtitle' => apply_filters( 'lsx_hero_banner_subtitle', get_term_meta( get_queried_object_id(), 'lsx_hero_banner_subtitle', true ) ),
			);
			$this->do_banner( $args );
		}
	}

	/**
	 * Outputs the search page banner.
	 *
	 * @return void
	 */
	public function search_banner() {
		$disable = get_option( 'engine_banner_disable' );
		if ( true !== $disable && 'on' !== $disable ) {
			$args = array(
				'image'    => apply_filters( 'lsx_hero_banner_image', get_option( 'engine_banner' ) ),
				'colour'   => apply_filters( 'lsx_hero_banner_colour', get_option( 'engine_banner_colour' ) ),
				'title'    => apply_filters( 'lsx_hero_banner_title', get_option( 'engine_banner_title' ) ),
				'subtitle' => apply_filters( 'lsx_hero_banner_subtitle', get_option( 'engine_banner_subtitle' ) ),
			);
			$this->do_banner( $args );
		}
	}

	/**
	 * Outputs the banners based on the arguments.
	 *
	 * @param array $args The parameters for the banner
	 * @return void
	 */
	public function do_banner( $args = array() ) {
		$defaults = array(
			'image'    => apply_filters( 'lsx_hero_banner_default_image_attr', $this->get_image_attr() ),
			'colour'   => apply_filters( 'lsx_hero_banner_default_colour', '#2b3640' ),
			'title'    => apply_filters( 'lsx_hero_banner_default_title', '' ),
			'subtitle' => apply_filters( 'lsx_hero_banner_default_subtitle', '' ),
			'width'    => apply_filters( 'lsx_hero_banner_default_width_attr', $this->get_width() ),
		);
		$args     = wp_parse_args( $args, $defaults );
		// Generate the background atts.
		$background_image_attr = '';
		$css_classes           = '';

		if ( '' !== $args['image'] && false !== $args['image'] ) {
			$background_image_attr = 'background-image:url(' . $args['image'] . ');';
			$css_classes           = 'has-background-img';
		}
		$background_image_attr = apply_filters( 'lsx_hero_banner_style_attr', $background_image_attr );
		$background_width_attr = apply_filters( 'lsx_hero_banner_width_attr', $args['width'] );
		?>
		<div class="lsx-hero-banner-block wp-block-cover <?php $this->the_bg_colour_class(); ?> <?php echo esc_attr( $background_width_attr ); ?> has-background-dim <?php echo esc_attr( $css_classes ); ?>" style="<?php echo esc_attr( $background_image_attr ); ?><?php $this->the_bg_colour_attr(); ?>">
			<div class="wp-block-cover__inner-container">
				<?php $this->banner_content(); ?>
				<?php if ( '' !== $args['subtitle'] && false !== $args['subtitle'] ) { ?>
					<p class="has-text-align-center"><?php echo esc_html( $args['subtitle'] ); ?></p>
				<?php } ?>
			</div>
		</div>
		<?php
		remove_action(  );
	}

	/**
	 * Adds default title to the banner if there is none.
	 *
	 * @param string $title
	 * @return void
	 */
	public function default_banner_title( $title ) {
		if ( '' === $title || false === $title ) {
			switch ( $this->screen ) {
				case 'single':
					$title = get_the_title();
					break;
				case 'archive':
				case 'taxonomy':
					$title = get_the_archive_title();
					break;
				case 'search':
					$title = __( 'Search Results for: ', 'lsx-business-directory' ) . get_query_var( 's' );
					break;
				default:
					break;
			}
		}
		return $title;
	}

	/**
	 * Outputs the banner content.
	 *
	 * @return void
	 */
	public function banner_content() {
		$content = '';
		ob_start();
		do_action( 'lsx_hero_banner', 'lsx-blocks' );
		$content = ob_get_clean();
		echo wp_kses_post( $content );
	}

	/**
	 * Changes the single business listing title to an H2.
	 *
	 * @param string $title The listing title wrapped in an <h1>.
	 * @return string
	 */
	public function change_single_business_listing_tag( $title ) {
		$title = '<h2 class="entry-title">' . get_the_title() . '</h2>';
		return $title;
	}

	/**
	 * Gets the title css classes.
	 *
	 * @return string
	 */
	public function get_css() {
		$classes = '';
		$colour  = get_post_meta( get_the_ID(), 'lsx_banner_bg_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$classes .= ' has-text-color';
		}

		return $classes;
	}

	/**
	 * Gets the width you want for the parent group block .
	 */
	public function get_width() {
		$classes = '';
		$width   = get_post_meta( get_the_ID(), 'lsx_banner_width', true );
		if ( '' === $width || false === $width ) {
			$width = 'full';
		}
		$classes = 'align' . $width;
		return $classes;
	}

	/**
	 * Gets the width you want for the parent group block .
	 *
	 * @return string
	 */
	public function the_bg_colour_class() {
		$classes = '';
		$colour  = get_post_meta( get_the_ID(), 'lsx_banner_bg_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$classes = ' has-background';
		}
		echo esc_attr( $classes );
	}

	/**
	 * Gets the width you want for the parent group block .
	 *
	 * @return string
	 */
	public function the_bg_colour_attr() {
		$attr   = '';
		$colour = get_post_meta( get_the_ID(), 'lsx_banner_bg_colour', true );
		if ( '' === $colour || false === $colour ) {
			$colour = '#2b3640';
		}
		$attr = ' background-color:' . $colour . ';';
		echo esc_attr( $attr );
	}

	/**
	 * Gets the colour for the title text.
	 *
	 * @return string
	 */
	public function get_colour_attr() {
		$attr   = '';
		$colour = get_post_meta( get_the_ID(), 'lsx_banner_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$attr = ' color:' . $colour . ';';
		}
		return $attr;
	}

	/**
	 * Gets the image for the title text.
	 *
	 * @return string
	 */
	public function get_image_attr() {
		$attr  = '';
		$image = get_post_meta( get_the_ID(), 'lsx_banner_image', true );

		if ( '' !== $image && false !== $image ) {
			$image = explode( '|', $image );
			$attr  = $image[1];
		}
		return $attr;
	}
}
