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

let teamBlock = JSON.stringify(wp.blocks.getCategories());

if ( teamBlock.includes('lsx-team-blocks') ) {
	registerBlockType( 'lsx-blocks/lsx-team', {
		title: __( 'LSX Team', 'lsx-blocks' ),
		description: __( 'Add your team and customize options.', 'lsx-blocks' ),
		icon:  'groups',
		category: 'lsx-blocks',
		keywords: [
			__( 'team', 'lsx-blocks' ),
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
