/**
 * Block dependencies
 */

import './style.scss';
import edit from './edit';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

let testimonialsBlock = JSON.stringify(wp.blocks.getCategories());
//console.log(testimonialsBlock);

if ( testimonialsBlock.includes('lsx-testimonials-blocks') ) {
	registerBlockType( 'lsx-blocks/lsx-testimonial', {
		title: __( 'LSX Testimonials', 'lsx-blocks' ),
		description: __( 'Add your testimonials and customize options.', 'lsx-blocks' ),
		icon:  'format-quote',
		category: 'lsx-blocks',
		keywords: [
			__( 'testimonial', 'lsx-blocks' ),
			__( 'lsx', 'lsx-blocks' ),
		],
		supports: {
			align: true,
			html: false,
		},
		edit,
		save() {
			// Rendering in PHP
			return null;
		},
	} );
}
