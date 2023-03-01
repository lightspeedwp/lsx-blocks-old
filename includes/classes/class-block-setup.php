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
class Block_Setup {

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	public function __construct() {
	}

	public function init() {
		add_action( 'init', array( $this, 'register_block_pattern_category' ) );
		add_filter( 'block_categories_all', array( $this, 'register_block_category' ), 10, 2 );
	}

	/**
	 * Registers the LSX Blocks pattern category
	 *
	 * @return void
	 */
	public function register_block_pattern_category() {
		register_block_pattern_category(
			'lsx-blocks',
			array( 'label' => __( 'LSX Blocks', 'lsx-projects' ) )
		);
	} 

	/**
	 * Registers the LSX Blocks category
	 *
	 * @return array
	 */
	public function register_block_category( $block_categories, $block_editor_context ) {
		$block_categories[] = array(
			'slug'  => 'lsx-blocks',
			'title' => __( 'LSX Blocks', 'lsx-projects' ),			
		);
		return $block_categories;
	} 
}
