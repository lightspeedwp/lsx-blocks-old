/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Register our Related Posts variation.
 */
wp.blocks.registerBlockVariation( 'core/navigation-link', {
    name: metadata.name,
    title: metadata.title,
	category: metadata.category,
    description: metadata.description,
    isActive: ( { namespace } ) => {
        return (
            namespace === metadata.name
        );
    },
    attributes: {
		url: '#logoutlink',
		title: __('Log out','lsx-blocks'),
		label: __('Log out','lsx-blocks'),
    },
    scope: [ 'inserter' ],
	allowedControls: [ 'postType' ],
    }
);
