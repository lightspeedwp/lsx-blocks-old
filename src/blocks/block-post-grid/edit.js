/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const {
	withSelect,
} = wp.data;

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
	PanelColorSettings,
} = wp.editor;

const MAX_POSTS_COLUMNS = 4;

class LatestPostsBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = { categoriesList: [] };
		this.state = { tagsList: [] };

		this.stillMounted = false;
		this.stillMountedTag = false;

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
		this.toggleDisplayPostExcerpt = this.toggleDisplayPostExcerpt.bind( this );
		this.toggleDisplayPostAuthor = this.toggleDisplayPostAuthor.bind( this );
		this.toggleDisplayPostImage = this.toggleDisplayPostImage.bind( this );
		this.toggleDisplayPostLink = this.toggleDisplayPostLink.bind( this );
	}

	componentDidMount() {
		this.stillMounted = true;

		this.fetchRequest = apiFetch({
			path: addQueryArgs( '/wp/v2/categories', { per_page: -1 })
		}).then(
			( categoriesList ) => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList });
				}
			}
		).catch(
			() => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList: [] });
				}
			}
		);

		this.stillMountedTag = true;

		this.fetchRequestTag = apiFetch({
			path: addQueryArgs( '/wp/v2/tags', { per_page: -1 })
		}).then(
			( tagsList ) => {
				if ( this.stillMountedTag ) {
					this.setState({ tagsList });
				}
			}
		).catch(
			() => {
				if ( this.stillMountedTag ) {
					this.setState({ tagsList: [] });
				}
			}
		);
	}

	componentWillUnmount() {
		this.stillMounted = false;
		this.stillMountedTag = false;
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	toggleDisplayPostExcerpt() {
		const { displayPostExcerpt } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostExcerpt: ! displayPostExcerpt } );
	}

	toggleDisplayPostAuthor() {
		const { displayPostAuthor } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostAuthor: ! displayPostAuthor } );
	}

	toggleDisplayPostImage() {
		const { displayPostImage } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostImage: ! displayPostImage } );
	}

	toggleDisplayPostLink() {
		const { displayPostLink } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostLink: ! displayPostLink } );
	}

	customizeReadMoreText() {
		const { readMoreText } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { readMoreText: ! readMoreText } );
	}

	render() {
		const { attributes, setAttributes, latestPosts } = this.props;
		const { displayPostDate, displayPostExcerpt, displayPostAuthor, displayPostImage, displayPostLink, align, postLayout, columns, order, orderBy, categories, tags, selectedTag, postsToShow, width, imageCrop, postsBackgroundColor, readMoreText } = attributes;

		const { categoriesList, tagsList } = this.state;

		// Thumbnail options
		const imageCropOptions = [
			{ value: 'landscape', label: __( 'Landscape' ) },
			{ value: 'square', label: __( 'Square' ) },
		];
		const isLandscape = imageCrop === 'landscape';

		//Create category
		const categoriesListObject = [];
		if (categoriesList && categoriesList.length) {
			for (var item = 0; item < categoriesList.length; item++) {
				categoriesListObject[item] = { value: categoriesList[item].id, label: categoriesList[item].name };
			}
			categoriesListObject.unshift({ value: '', label: __( 'All' ) });
		}

		//Create taglist
		const tagsListObject = [];
		if ( tagsList && tagsList.length ) {
			for (var item = 0; item < tagsList.length; item++) {
				tagsListObject[item] = { value: tagsList[item].id, label: tagsList[item].name };
			}
			tagsListObject.unshift({ value: '', label: __( 'All' ) });
		}

		//Color value changes
		const onChangeBackgroundColor = value => setAttributes( { postsBackgroundColor: value } );

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Post Grid Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ attributes.postsToShow }
						onOrderChange={ ( value ) => setAttributes({ order: value }) }
						onOrderByChange={ ( value ) => setAttributes({ orderBy: value }) }
						onNumberOfItemsChange={ ( value ) => setAttributes({ postsToShow: value }) }
					/>
					{ categoriesListObject &&
						<SelectControl
							label={ __( 'Filter by Categories' ) }
							options={ categoriesListObject }
							value={ categories }
							onChange={ ( value ) => this.props.setAttributes( { categories: value } ) }
						/>
					}
					{ tagsListObject &&
						<SelectControl
							label={ __( 'Filter by Tags' ) }
							options={ tagsListObject }
							value={ selectedTag }
							onChange={ ( value ) => this.props.setAttributes( { selectedTag: value } ) }
						/>
					}
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
					<ToggleControl
						label={ __( 'Display Featured Image' ) }
						checked={ displayPostImage }
						onChange={ this.toggleDisplayPostImage }
					/>
					{ displayPostImage &&
						<SelectControl
							label={ __( 'Featured Image Style' ) }
							options={ imageCropOptions }
							value={ imageCrop }
							onChange={ ( value ) => this.props.setAttributes( { imageCrop: value } ) }
						/>
					}
					<ToggleControl
						label={ __( 'Display Post Author' ) }
						checked={ displayPostAuthor }
						onChange={ this.toggleDisplayPostAuthor }
					/>
					<ToggleControl
						label={ __( 'Display Post Date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					<ToggleControl
						label={ __( 'Display Post Excerpt' ) }
						checked={ displayPostExcerpt }
						onChange={ this.toggleDisplayPostExcerpt }
					/>
					<ToggleControl
						label={ __( 'Display Continue Reading Link' ) }
						checked={ displayPostLink }
						onChange={ this.toggleDisplayPostLink }
					/>
					<PanelColorSettings
						title={ __( 'Grid Background Color' ) }
						initialOpen={ true }
						colorSettings={ [ {
							value: postsBackgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Grid Background Color', 'lsx-blocks' )
						} ] }
					>
					</PanelColorSettings>
					{ displayPostLink &&
					<TextControl
						label={ __( 'Customize Read More Link' ) }
						type="text"
						value={ readMoreText }
						onChange={ ( value ) => this.props.setAttributes( { readMoreText: value } ) }
					/>
					}

				</PanelBody>
			</InspectorControls>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'LSX Blocks Post Grid' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > attributes.postsToShow ?
			latestPosts.slice( 0, attributes.postsToShow ) :
			latestPosts;

		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: attributes.postLayout === 'grid',
			},
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: attributes.postLayout === 'list',
			},
		];

		return (
			<Fragment>
				{ inspectorControls }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
				<div
					className={ classnames(
						this.props.className,
						'lsx-block-post-grid',
						align
					) }
					style={ {
						backgroundColor: postsBackgroundColor,
					} }
				>
					<div
						className={ classnames( {
							'is-grid': postLayout === 'grid',
							'is-list': postLayout === 'list',
							[ `columns-${ columns }` ]: postLayout === 'grid',
							'lsx-post-grid-items' : 'lsx-post-grid-items'
						} ) }
					>
						{ displayPosts && displayPosts.map( ( post, i ) => {
							return (
								<article
									key={ i }
									className={ classnames(
										post.featured_image_src && displayPostImage ? 'has-thumb' : 'no-thumb'
									) }
								>
									{
										displayPostImage && post.featured_image_src !== undefined && post.featured_image_src ? (
											<div className="lsx-block-post-grid-image">
												<a href={ post.link } target="_blank" rel="bookmark">
													<img
														src={ isLandscape ? post.featured_image_src : post.featured_image_src_square }
														alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
													/>
												</a>
											</div>
										) : (
											<div className="lsx-block-post-grid-image">
												<a href={ post.link } target="_blank" rel="bookmark">
													<img
														classnames="attachment-responsive wp-post-image lsx-responsive"
														src="https://place-hold.it/750x350/cccccc/969696.jpeg&amp;text=750x350&amp;bold&amp;fontsize=16"
														alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
													/>
												</a>
											</div>
										)
									}

									<div className="lsx-block-post-grid-text">
										<h2 className="entry-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a></h2>

										<div className="lsx-block-post-grid-byline">
											{ displayPostAuthor && post.author_info.display_name &&
												<div className="lsx-block-post-grid-author"><a className="lsx-text-link" target="_blank" href={ post.author_info.author_link }>{ post.author_info.display_name }</a></div>
											}

											{ displayPostDate && post.date_gmt &&
												<time dateTime={ moment( post.date_gmt ).utc().format() } className={ 'lsx-block-post-grid-date' }>
													{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
												</time>
											}
										</div>

										<div className="lsx-block-post-grid-excerpt">
											{ displayPostExcerpt && post.excerpt &&
												<div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
											}
											{ post.excerpt.rendered === '' && post.content &&
												<div>
													<p dangerouslySetInnerHTML={ { __html: post.content.rendered.length > 10 ? post.content.rendered.substring(0, 150) + '...' : post.content.rendered } } />
												</div>
											}
											{ displayPostLink &&
												<p><a className="lsx-block-post-grid-link lsx-text-link" href={ post.link } target="_blank" rel="bookmark">{ readMoreText }</a></p>
											}
										</div>
									</div>
								</article>
							);
						}) }
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const { postsToShow, order, orderBy, categories, selectedTag } = props.attributes;
	const { getEntityRecords } = select( 'core' );

	const latestPostsQuery = pickBy( {
		categories,
		tags: selectedTag,
		order,
		orderby: orderBy,
		per_page: postsToShow,
		exclude: [ wp.data.select( 'core/editor' ).getCurrentPostId() ],
	}, ( value ) => ! isUndefined( value ) );

	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	};
} )( LatestPostsBlock );
