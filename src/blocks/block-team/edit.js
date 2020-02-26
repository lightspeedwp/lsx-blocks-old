/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import classnames from 'classnames';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

class TeamBlock extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, posts, className, isSelected, setAttributes } = this.props;
		const { order, orderBy } = attributes;

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
	}
}

export default withSelect( (select, props ) => {
	const { postsToShow, order, orderBy } = props.attributes;
	const latestPostsQuery = pickBy( {
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	return {
		posts: select( 'core' ).getEntityRecords( 'postType', 'team', latestPostsQuery )
	};
} )( TeamBlock ) // end withAPIData
