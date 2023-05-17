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
class Frontend {

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ), 5 );
		add_filter( 'render_block', array( $this, 'check_for_login_options' ), 10, 3 );
	}

	/**
	 * Enqueue assets for backend editor
	 *
	 * @since 1.0.0
	 */
	public function block_editor_assets() {
		// Load the compiled blocks into the editor.
		wp_enqueue_script(
			'lsx-blocks-block-js',
			LSX_BLOCKS_URL . 'dist/blocks.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'wp-plugins' ),
			LSX_BLOCKS_VER
		);
	}

	/**
	 * A function to detect variation, and alter the query args.
	 * 
	 * Following the https://developer.wordpress.org/news/2022/12/building-a-book-review-grid-with-a-query-loop-block-variation/
	 *
	 * @param string|null   $pre_render   The pre-rendered content. Default null.
	 * @param array         $parsed_block The block being rendered.
	 * @param WP_Block|null $parent_block If this is a nested block, a reference to the parent block.
	 */
	public function check_for_login_options( $block_content, $parsed_block, $block_obj ) {
		// Determine if this is the custom block variation.
		if ( ! isset( $parsed_block['blockName'] ) || ! isset( $parsed_block['attrs'] )  ) {
			return $block_content;
		}
		$allowed_blocks = array(
			'lsx/lsx-mega-menu',
			'core/navigation-link',
			'core/navigation-submenu'
		);
		if ( ! in_array( $parsed_block['blockName'], $allowed_blocks, true ) ) {
			return $block_content; 
		}
		if ( ! isset( $parsed_block['attrs']['className'] ) ) {
			return $block_content;
		}
		if ( '' === $parsed_block['attrs']['className'] || false === $parsed_block['attrs']['className'] ) {
			return $block_content;
		}

		//finally see if we have one of our classe in the string.
		if ( is_user_logged_in() && false !== stripos( 'hide-logged-in', $parsed_block['attrs']['className'] ) ) {
			$block_content = '';
		}

		if ( ! is_user_logged_in() && false !== stripos( 'hide-logged-out', $parsed_block['attrs']['className'] ) ) {
			$block_content = '';
		}
		return $block_content;
	}
}
