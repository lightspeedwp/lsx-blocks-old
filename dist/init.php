<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package LSX BLOCKS
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function lsx_blocks_block_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the compiled styles
	wp_register_style(
		'lsx-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		LSX_BLOCKS_VER
	);

	// Load the FontAwesome icon library
	wp_enqueue_style(
		'lsx-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		LSX_BLOCKS_VER
	);
}
add_action( 'init', 'lsx_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function lsx_blocks_editor_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the FontAwesome icon library.
	wp_enqueue_style(
		'lsx-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		LSX_BLOCKS_VER
	);

	// Load the js to remove unused core blocks.
	wp_enqueue_script(
		'theme-editor',
		plugins_url( '/dist/assets/js/editor.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-dom' ),
		LSX_BLOCKS_VER
	);

	// Load the compiled blocks into the editor.
	wp_enqueue_script(
		'lsx-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'wp-plugins' ),
		LSX_BLOCKS_VER
	);

	// Load the compiled styles into the editor.
	wp_enqueue_style(
		'lsx-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		LSX_BLOCKS_VER
	);


	if ( in_array( get_post_type(), array( 'post', 'page' ) ) ) {
		if ( 'post' === get_post_type() ) {
			$title_disabled = false;
		} else {
			$title_disabled = true;
		}
		$title_disabled = apply_filters( 'lsx_' . get_post_type() . '_title_disable', $title_disabled );
	}

	// Pass in REST URL.
	wp_localize_script(
		'lsx-blocks-block-js',
		'lsx_globals',
		array(
			'rest_url' => esc_url( rest_url() ),
			'title_disabled' => $title_disabled,
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'lsx_blocks_editor_assets' );


// Add custom block category.
add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'lsx-blocks',
				'title' => __( 'LSX Blocks', 'lsx-blocks' ),
			),
		)
	);
}, 10, 2 );

if ( in_array( 'lsx-team/lsx-team.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	/**
	 * Add custom block category for Team block that will only show if the plugin is active.
	 */
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'lsx-team-blocks',
					'title' => __( 'LSX Team Blocks', 'lsx-blocks' ),
				),
			)
		);
	}, 10, 2 );
}

if ( in_array( 'lsx-testimonials/lsx-testimonials.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	/**
	 * Add custom block category for Team block that will only show if the plugin is active.
	 */
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'lsx-testimonials-blocks',
					'title' => __( 'LSX Team Blocks', 'lsx-blocks' ),
				),
			)
		);
	}, 10, 2 );
}

/**
 * Creates the Additional Meta the REST API responses.
 *
 * @param [type] $object post.
 * @param [type] $field_name name.
 * @param [type] $request request.
 */
function lsx_post_get_additional_meta( $object, $field_name, $request ) {
	$category_title = get_the_category();
	$tag_title      = get_the_tags();

	return array(
		'category_title' => $category_title,
		'tag_title'      => $tag_title,
	);
}

/**
 * Modify REST API responses to get better social urls for the blocks.
 *
 * @return void
 */
function lsx_post_register_additional_meta() {
	register_rest_field(
		'post',
		'additional_meta',
		array(
			'get_callback'    => 'lsx_post_get_additional_meta',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'lsx_post_register_additional_meta' );
