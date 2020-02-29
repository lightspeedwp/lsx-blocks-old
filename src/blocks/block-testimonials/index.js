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

let testimonialBlock = JSON.stringify(wp.blocks.getCategories());

if ( testimonialBlock.includes('lsx-testimonial-blocks') ) {
	registerBlockType( 'lsx-blocks/lsx-testimonial', {
		title: __( 'LSX Testimonials', 'lsx-blocks' ),
		description: __( 'Add your testimonial and customize options.', 'lsx-blocks' ),
		icon:  'groups',
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
