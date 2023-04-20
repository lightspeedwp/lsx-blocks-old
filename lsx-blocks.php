<?php
/**
 * Plugin Name: LSX Blocks
 * Plugin URI: https://lsx.lsdev.biz/blocks/
 * Description: The LSX Blocks plugin gives you a collection of Gutenberg blocks that you can use and customize. All the blocks are built to work with our powerful LSX theme.
 * Author: LightSpeed
 * Author URI: https://www.lsdev.biz/
 * Version: 1.3.3
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package LSX BLOCKS
 */

define( 'LSX_BLOCKS_VER', '1.3.3' );
define( 'LSX_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'LSX_BLOCKS_CORE', __FILE__ );
define( 'LSX_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load internals.
require_once LSX_BLOCKS_PATH . 'classes/class-core.php';
$lsx_blocks = lsx\blocks\classes\Core::get_instance();
