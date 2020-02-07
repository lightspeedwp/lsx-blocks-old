/**
 * Block dependencies
 */

import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;

registerBlockType( 'lsx-blocks/lsx-team', {
	title: __( 'LSX Team', 'lsx-blocks' ),
	description: __( 'Add a teams block.', 'lsx-blocks' ),
	icon:  'groups',
	category: 'lsx-blocks',
	keywords: [
		__( 'team', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	edit: withSelect( select => {
			return {
				posts: select( 'core' ).getEntityRecords( 'postType', 'team', { per_page: 6 } )
			};
		} )( ( { posts, className, isSelected, setAttributes } ) => {
			if ( ! posts ) {
				return (
					<p className={className} >
						<Spinner />
						{ __( 'Loading Posts', 'lsx-blocks' ) }

					</p>
				);
			}
			if ( 0 === posts.length ) {
				return <p>{ __( 'No Posts', 'lsx-blocks' ) }</p>;
			}
			return (
				<ul className={ className }>
					{ posts.map( post => {
						return (
							<li>
								<a className={ className } href={ post.link }>
									{ post.title.rendered }
								</a>
							</li>
						);
					}) }
				</ul>
			);
		} ) // end withAPIData
	, // end edit
	save() {
		// Rendering in PHP
		return null;
	},
} );
