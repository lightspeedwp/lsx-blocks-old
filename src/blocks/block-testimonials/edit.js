/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import classnames from 'classnames';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;

const { addQueryArgs } = wp.url;
const { apiFetch } = wp;
const { compose } = wp.compose;

const {
	PanelBody,
	QueryControls,
	RangeControl,
	RadioControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} = wp.components;

const {
	InspectorControls
} = wp.blockEditor;

class TestimonialBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = { testimonialtagList: [] };
		this.stillMounted = false;
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch({
			path: addQueryArgs( '/wp/v2/testimonialtag', { per_page: -1 })
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
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {
		const { attributes, posts, className, setAttributes, numberOfItems } = this.props;
		const { order, orderBy, testimonialtag, postsToShow, postLayout, columns, displayCarousel, imageShape, displayPostImage, displayPostExcerpt, displayPostLink, displayTestimonialJobTitle, includeId } = attributes;

		const { categoriesList } = this.state;
		//console.log(categoriesList);
		if ( ! posts ) {
			return (
				<p className={className} >
					<Spinner />
					{ __( 'Loading Testimonials', 'lsx-blocks' ) }

				</p>
			);
		}
		if ( 0 === posts.length ) {
			return <p>{ __( 'No Testimonials', 'lsx-blocks' ) }</p>;
		}

		// Layouts options
		const postLayoutOptions = [
			{ value: 'grid', label: __( 'Grid' ) },
			{ value: 'list', label: __( 'List' ) },
		];

		//Image Shape options
		const imageShapeOptions = [
			{ value: 'circle', label: __( 'Circle' ) },
			{ value: 'square', label: __( 'Square' ) },
		];

		//Image Shape options
		const displayPostExcerptOptions = [
			{ value: 'excerpt', label: __( 'Excerpt' ) },
			{ value: 'full', label: __( 'Full Content' ) },
			{ value: 'none', label: __( 'No Content' ) },
		];

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Layout Settings' ) }>
					<RadioControl
						selected={ postLayout }
						options={ postLayoutOptions }
						onChange={ ( value ) => setAttributes( { postLayout: value } ) }
					/>
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ 6 }
							step={ 1 }
						/>
					}
					{ postLayout === 'grid' &&
						<ToggleControl
							label={ __( 'Enable Carousel' ) }
							checked={ displayCarousel }
							onChange={ () => this.props.setAttributes( { displayCarousel: ! displayCarousel } ) }
						/>
					}
					<SelectControl
						label={ __( 'Image Shape' ) }
						value={ imageShape }
						options={ imageShapeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { imageShape: value } ) } }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Display Settings' ) }>
					<ToggleControl
						label={ __( 'Display Featured Image' ) }
						checked={ displayPostImage }
						onChange={ () => this.props.setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
					<SelectControl
						label={ __( 'Display Excerpt' ) }
						value={ displayPostExcerpt }
						options={ displayPostExcerptOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { displayPostExcerpt: value } ) } }
					/>
					<ToggleControl
						label={ __( 'Link to single testimonial' ) }
						checked={ displayPostLink }
						onChange={ () => this.props.setAttributes( { displayPostLink: ! displayPostLink } ) }
					/>
					<ToggleControl
						label={ __( 'Show Role and Company' ) }
						checked={ displayTestimonialJobTitle }
						onChange={ () => this.props.setAttributes( { displayTestimonialJobTitle: ! displayTestimonialJobTitle } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'General Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy, postsToShow, numberOfItems, testimonialtag } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ testimonialtag }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes({ testimonialtag: '' !== value ? value : undefined }) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<TextControl
						label={ __( 'Specify testimonials by ID' ) }
						help={__('Comma separated list, overrides limit setting')}
						type="text"
						value={ includeId }
						onChange={ ( value ) => this.props.setAttributes( { includeId: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<Fragment>
				{ inspectorControls }
				<div className={ classnames(
					className,
					postLayout === 'grid' ? 'is-grid' : 'is-list',
					[ `columns-${ columns }` ],
				)}>
					{ posts.map( ( post, i ) => {
						//console.log(post);
						//console.log(post.testimonialtag);
						return (
							<article key={ i }
								className={ classnames(
									post.featured_media && displayPostImage ? 'has-thumb' : 'no-thumb',
									'lsx-testimonials-slot'
								) }
							>
								{
									displayPostImage && post.featured_media !== undefined && post.featured_media ? (
										<div className="lsx-block-post-grid-image">
											<a href={ post.link } target="_blank" rel="bookmark">
												<img
													className={ imageShape }
													src={ post.images.medium ? post.images.medium : 'https://www.gravatar.com/avatar/none?d=mm&s=300' }
													alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
												/>
											</a>
										</div>
									) : (
										null
									)
								}

								<div className="lsx-block-post-grid-text lsx-testimonial-description">
									<h5 className="lsx-testimonials-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a></h5>
									{ displayTestimonialJobTitle === true && post.additional_meta.job_title &&
										<small className="lsx-testimonial-job-title"><i className="fa fa-briefcase" aria-hidden="true"></i> {post.additional_meta.job_title}</small>
									}
									<div className="lsx-block-post-grid-excerpt">
										{ displayPostExcerpt === 'excerpt' && post.excerpt &&
											<blockquote dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
										}
										{ displayPostExcerpt === 'excerpt' && post.excerpt.rendered === '' && post.content &&
											<blockquote>
												<p dangerouslySetInnerHTML={ { __html: post.content.rendered.length > 10 ? post.content.rendered.substring(0, 150) + '...' : post.content.rendered } } />
											</blockquote>

										}
										{ displayPostExcerpt === 'full' && post.content &&
											<blockquote dangerouslySetInnerHTML={ { __html: post.content.rendered } } />
										}
									</div>
									{ displayPostLink === true &&
										<a href={ post.link } className="lsx-testimonial-show-more" tabIndex="0">More about { decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }<i className="fa fa-long-arrow-left" aria-hidden="true"></i></a>
									}
								</div>
							</article>
						);
					}) }
				</div>
			</Fragment>
		);
	}
}

export default compose([
	withSelect( (select, props ) => {
		const { postsToShow, order, orderBy, includeId, testimonialtag } = props.attributes;
		const latestPostsQuery = pickBy( {
			testimonialtag,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			include: includeId,
		} );

		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'testimonial', latestPostsQuery )
		};
	})
])( TestimonialBlock );
