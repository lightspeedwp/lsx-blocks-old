/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

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
    description: metadata.description,
    isActive: ( { namespace, query } ) => {
        return (
            namespace === metadata.name
        );
    },
    attributes: {
		url: '#logoutlinks',
		title: 'Logout',
    },
    scope: [ 'inserter' ],
	allowedControls: [ 'postType' ],
    }
);
