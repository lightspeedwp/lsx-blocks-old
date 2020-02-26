/**
 * External dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;
const { Spinner } = wp.components;

export default withSelect( select => {
	return {
		posts: select( 'core' ).getEntityRecords( 'postType', 'team', { per_page: 6, order: 'asc' } )
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
		<div className={ className }>
			{ posts.map( ( post, i ) => {

				console.log(post);
				return (
					<article key={ i }
						className={ classnames(
							post.featured_media ? 'has-thumb' : 'no-thumb'
						) }
					>
						{
							post.featured_media !== undefined && post.featured_media ? (
								<div className="lsx-block-post-grid-image">
									<a href={ post.link } target="_blank" rel="bookmark">
										<img
											src={ post.images.medium }
											alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
										/>
									</a>
								</div>
							) : (
								null
							)
						}

						<div className="lsx-block-post-grid-text">
							<h2 className="entry-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a></h2>
							<small className="lsx-team-job-title">{ post.teamrole[0] }</small>
							<div className="lsx-block-post-grid-excerpt">
								{ post.excerpt &&
									<div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
								}
							</div>
						</div>
					</article>
				);
			}) }
		</div>
	);
} ) // end withAPIData
