/**
 * External dependencies
 */
const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { Spinner } = wp.components;

export default withSelect( select => {
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
					<li  key="inspector">
						<a className={ className } href={ post.link }>
							{ post.title.rendered }
						</a>
					</li>
				);
			}) }
		</ul>
	);
} ) // end withAPIData
