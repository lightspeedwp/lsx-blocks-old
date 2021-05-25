/**
 * External dependencies
 */

import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import moment from "moment";
import classnames from "classnames";

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

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
	withAPIData
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	PanelColorSettings
} = wp.blockEditor;

const MAX_POSTS_COLUMNS_CAROUSEL = 4;

class LatestPostsBlockCarousel extends Component {
	constructor() {
		super(...arguments);

		this.state = { categoriesList: [] };
		this.state = { tagsList: [] };

		this.stillMounted = false;
		this.stillMountedTag = false;

		this.toggledisplayPostDateCarousel = this.toggledisplayPostDateCarousel.bind(
			this
		);
		this.toggleDisplayPostCategoriesCarousel = this.toggleDisplayPostCategoriesCarousel.bind(
			this
		);
		this.toggledisplayPostExcerptCarousel = this.toggledisplayPostExcerptCarousel.bind(
			this
		);
		this.toggledisplayPostAuthorCarousel = this.toggledisplayPostAuthorCarousel.bind(
			this
		);
		this.toggledisplayPostImageCarousel = this.toggledisplayPostImageCarousel.bind(
			this
		);
		this.toggleDisplayPostShadowCarousel = this.toggleDisplayPostShadowCarousel.bind(
			this
		);
		this.toggledisplayPostLinkCarousel = this.toggledisplayPostLinkCarousel.bind(
			this
		);
		this.toggleDisplayPostTagsCarousel = this.toggleDisplayPostTagsCarousel.bind(
			this
		);
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch({
			path: addQueryArgs("/wp/v2/categories", { per_page: -1 })
		})
			.then(categoriesList => {
				if (this.stillMounted) {
					this.setState({ categoriesList });
				}
			})
			.catch(() => {
				if (this.stillMounted) {
					this.setState({ categoriesList: [] });
				}
			});

		this.stillMountedTag = true;

		this.fetchRequestTag = apiFetch({
			path: addQueryArgs("/wp/v2/tags", { per_page: -1 })
		})
			.then(tagsList => {
				if (this.stillMountedTag) {
					this.setState({ tagsList });
				}
			})
			.catch(() => {
				if (this.stillMountedTag) {
					this.setState({ tagsList: [] });
				}
			});
	}

	componentWillUnmount() {
		this.stillMounted = false;
		this.stillMountedTag = false;
	}

	toggledisplayPostDateCarousel() {
		const { displayPostDateCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostDateCarousel: !displayPostDateCarousel });
	}

	toggleDisplayPostCategoriesCarousel() {
		const { displayPostCategoriesCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({
			displayPostCategoriesCarousel: !displayPostCategoriesCarousel
		});
	}

	toggledisplayPostExcerptCarousel() {
		const { displayPostExcerptCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostExcerptCarousel: !displayPostExcerptCarousel });
	}

	toggledisplayPostAuthorCarousel() {
		const { displayPostAuthorCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostAuthorCarousel: !displayPostAuthorCarousel });
	}

	toggledisplayPostImageCarousel() {
		const { displayPostImageCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostImageCarousel: !displayPostImageCarousel });
	}

	toggledisplayPostLinkCarousel() {
		const { displayPostLinkCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostLinkCarousel: !displayPostLinkCarousel });
	}

	toggleDisplayPostShadowCarousel() {
		const { displayPostShadowCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostShadowCarousel: !displayPostShadowCarousel });
	}

	toggleDisplayPostTagsCarousel() {
		const { displayPostTagsCarousel } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostTagsCarousel: !displayPostTagsCarousel });
	}

	customizeReadMoreText() {
		const { readMoreText } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ readMoreText: !readMoreText });
	}

	render() {
		const { attributes, setAttributes, latestPosts } = this.props;
		const {
			customTaxonomy,
			customTermID,
			displayPostDateCarousel,
			displayPostCategoriesCarousel,
			displayPostExcerptCarousel,
			displayPostAuthorCarousel,
			displayPostImageCarousel,
			displayPostLinkCarousel,
			displayPostShadowCarousel,
			displayPostTagsCarousel,
			alignCarousel,
			columnsCarousel,
			orderCarousel,
			orderByCarousel,
			categories,
			selectedTag,
			postsToShowCarousel,
			width,
			imageCrop,
			postsBackgroundColorCarousel,
			readMoreText
		} = attributes;

		const { categoriesList, tagsList } = this.state;

		let theCategories = "";
		let theTags = "";

		//Create category
		const categoriesListObject = [];
		if (categoriesList && categoriesList.length) {
			for (var item = 0; item < categoriesList.length; item++) {
				categoriesListObject[item] = {
					value: categoriesList[item].id,
					label: categoriesList[item].name
				};
			}
			categoriesListObject.unshift({ value: "", label: __("All") });
		}

		//Create taglist
		const tagsListObject = [];
		if (tagsList && tagsList.length) {
			for (var item = 0; item < tagsList.length; item++) {
				tagsListObject[item] = {
					value: tagsList[item].id,
					label: tagsList[item].name
				};
			}
			tagsListObject.unshift({ value: "", label: __("All") });
		}

		//Color value changes
		const onChangeBackgroundColorCarousel = value =>
			setAttributes({ postsBackgroundColorCarousel: value });

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={__("Post Carousel Settings")}>
					<QueryControls
						{...{ orderCarousel, orderByCarousel }}
						numberOfItems={postsToShowCarousel}
						onOrderChange={value => setAttributes({ orderCarousel: value })}
						onOrderByChange={value => setAttributes({ orderByCarousel: value })}
						onNumberOfItemsChange={value =>
							setAttributes({ postsToShowCarousel: value })
						}
					/>
					{categoriesListObject && (
						<SelectControl
							label={__("Filter by Categories")}
							options={categoriesListObject}
							value={categories}
							onChange={value =>
								this.props.setAttributes({ categories: value })
							}
						/>
					)}
					{tagsListObject && (
						<SelectControl
							label={__("Filter by Tags")}
							options={tagsListObject}
							value={selectedTag}
							onChange={value =>
								this.props.setAttributes({ selectedTag: value })
							}
						/>
					)}
					<RangeControl
						label={__("Items per Slide")}
						value={columnsCarousel}
						onChange={value => setAttributes({ columnsCarousel: value })}
						min={1}
						max={
							!hasPosts
								? MAX_POSTS_COLUMNS_CAROUSEL
								: Math.min(MAX_POSTS_COLUMNS_CAROUSEL, latestPosts.length)
						}
					/>
					<ToggleControl
						label={__("Display Featured Image")}
						checked={displayPostImageCarousel}
						onChange={this.toggledisplayPostImageCarousel}
					/>
					<ToggleControl
						label={__("Display Post Author")}
						checked={displayPostAuthorCarousel}
						onChange={this.toggledisplayPostAuthorCarousel}
					/>
					<ToggleControl
						label={__("Display Post Date")}
						checked={displayPostDateCarousel}
						onChange={this.toggledisplayPostDateCarousel}
					/>
					<ToggleControl
						label={__("Display Post Categories")}
						checked={displayPostCategoriesCarousel}
						onChange={this.toggleDisplayPostCategoriesCarousel}
					/>
					<ToggleControl
						label={__("Display Post Excerpt")}
						checked={displayPostExcerptCarousel}
						onChange={this.toggledisplayPostExcerptCarousel}
					/>
					<ToggleControl
						label={__("Display Post Tags")}
						checked={displayPostTagsCarousel}
						onChange={this.toggleDisplayPostTagsCarousel}
					/>
					<PanelColorSettings
						title={__("Grid Background Colour")}
						initialOpen={true}
						colorSettings={[
							{
								value: postsBackgroundColorCarousel,
								onChange: onChangeBackgroundColorCarousel,
								label: __("Grid Background Colour", "lsx-blocks")
							}
						]}
					/>
					<ToggleControl
						label={__("Remove Posts Shadow")}
						checked={displayPostShadowCarousel}
						onChange={this.toggleDisplayPostShadowCarousel}
					/>
					<ToggleControl
						label={__("Display Continue Reading Link")}
						checked={displayPostLinkCarousel}
						onChange={this.toggledisplayPostLinkCarousel}
					/>
					{displayPostLinkCarousel && (
						<TextControl
							label={__("Customize Read More Link")}
							type="text"
							value={readMoreText}
							onChange={value =>
								this.props.setAttributes({ readMoreText: value })
							}
						/>
					)}
				</PanelBody>
				{/* <PanelBody title={ __( 'Custom Taxonomy' ) }>
                    <TextControl
                        label={ __( 'Taxonomy Slug' ) }
                        type="text"
                        value={ customTaxonomy }
                        onChange={ ( value ) => this.props.setAttributes( { customTaxonomy: value } ) }
                        help={ __( 'Enter the slug of your custom taxonomy (e.g post_tag)' ) }
                    />
                    { customTaxonomy &&
                    <TextControl
                        label={ __( 'Term' ) }
                        type="text"
                        value={ customTermID }
                        onChange={ ( value ) => this.props.setAttributes( { customTermID: value } ) }
                        help={ __( 'Enter the term slug or term_id, you can enter several items separated by a comma.' ) }
                    />
                    }
                </PanelBody> */}
			</InspectorControls>
		);

		const hasPosts = Array.isArray(latestPosts) && latestPosts.length;
		if (!hasPosts) {
			return (
				<Fragment>
					{inspectorControls}
					<Placeholder icon="admin-post" label={__("LSX Blocks Post Carousel")}>
						{!Array.isArray(latestPosts) ? <Spinner /> : __("No posts found.")}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPostsCarousel =
			latestPosts.length > postsToShowCarousel
				? latestPosts.slice(0, postsToShowCarousel)
				: latestPosts;

		const articleCounter = 0;

		return (
			<Fragment>
				{inspectorControls}
				<BlockControls>
					<BlockAlignmentToolbar
						value={alignCarousel}
						onChange={value => {
							setAttributes({ align: value });
						}}
						controls={["center", "wide"]}
					/>
				</BlockControls>
				<div
					className={classnames(
						this.props.className,
						"lsx-block-post-carousel",
						[`columns-${columnsCarousel}`]
					)}
				>
					<div
						className={classnames(
							"lsx-post-carousel-items slick-slider slick-initialized slick-dotted"
						)}
					>
						<button
							type="button"
							className="slick-prev slick-arrow slick-disabled"
							style={{ display: "block" }}
						>
							{__("(Previous)")}
						</button>

						<div className="slick-list">
							{displayPostsCarousel.map((post, i) => (
								<article
									key={i}
									className={classnames(
										displayPostShadowCarousel ? "disable-shadow" : "",
										post.featured_image_src && displayPostImageCarousel
											? "has-thumb"
											: "no-thumb"
									)}
									style={{
										backgroundColor: postsBackgroundColorCarousel
									}}
								>
									{displayPostImageCarousel &&
									post.featured_image_src !== undefined &&
									post.featured_image_src ? (
										<div className="lsx-block-post-grid-image">
											<a href={post.link} target="_blank" rel="bookmark">
												<img
													src={post.featured_image_src}
													alt={
														decodeEntities(post.title.rendered.trim()) ||
														__("(Untitled)")
													}
												/>
											</a>
										</div>
									) : (
										displayPostImageCarousel && (
											<div className="lsx-block-post-grid-image">
												<a href={post.link} target="_blank" rel="bookmark">
													<img
														classnames="attachment-responsive wp-post-image lsx-responsive"
														src="/wp-content/plugins/lsx-blocks/dist/assets/images/placeholder-350x230.jpg"
														alt={
															decodeEntities(post.title.rendered.trim()) ||
															__("(Untitled)")
														}
													/>
												</a>
											</div>
										)
									)}

									<div className="lsx-block-post-grid-text">
										<h2 className="entry-title">
											<a href={post.link} target="_blank" rel="bookmark">
												{decodeEntities(post.title.rendered.trim()) ||
													__("(Untitled)")}
											</a>
										</h2>

										<div className="lsx-block-post-grid-byline">
											{displayPostAuthorCarousel &&
												post.author_info.display_name && (
													<div className="lsx-block-post-grid-author">
														<a
															className="lsx-text-link"
															target="_blank"
															href={post.author_info.author_link}
														>
															{post.author_info.display_name}
														</a>
													</div>
												)}

											{displayPostDateCarousel && post.date_gmt && (
												<time
													dateTime={moment(post.date_gmt)
														.utc()
														.format()}
													className={"lsx-block-post-grid-date"}
												>
													{moment(post.date_gmt)
														.local()
														.format("MMMM DD, Y")}
												</time>
											)}
											{displayPostCategoriesCarousel &&
												undefined !== post.additional_meta &&
												undefined !== post.additional_meta.category_title &&
												false !== post.additional_meta.category_title &&
												((theCategories = post.additional_meta.category_title),
												(
													//console.log(theCategories),
													<div id="post-meta-categories">
														<div className="post-tags">
															<span className="cat-title">
																{__("Categories: ")}{" "}
															</span>
															{theCategories.map((cat, i) => {
																return <span key={i}>{cat.cat_name}</span>;
															})}
														</div>
													</div>
												))}
										</div>

										<div className="lsx-block-post-grid-excerpt">
											{displayPostExcerptCarousel && post.excerpt && (
												<div
													dangerouslySetInnerHTML={{
														__html: post.excerpt.rendered
													}}
												/>
											)}
											{displayPostExcerptCarousel &&
												post.excerpt.rendered === "" &&
												post.content && (
													<div>
														<p
															dangerouslySetInnerHTML={{
																__html:
																	post.content.rendered.length > 10
																		? post.content.rendered.substring(0, 150) +
																		  "..."
																		: post.content.rendered
															}}
														/>
													</div>
												)}
											{displayPostLinkCarousel && (
												<p>
													<a
														className="lsx-block-post-grid-link lsx-text-link"
														href={post.link}
														target="_blank"
														rel="bookmark"
													>
														{readMoreText}
													</a>
												</p>
											)}
											{displayPostTagsCarousel &&
												undefined !== post.additional_meta &&
												undefined !== post.additional_meta.tag_title &&
												false !== post.additional_meta.tag_title &&
												((theTags = post.additional_meta.tag_title),
												(
													//console.log(theTags),
													<div id="post-tags">
														<div className="post-tags">
															<span className="tags-title">
																{__("Tags: ")}{" "}
															</span>
															{theTags.map((term, i) => {
																return <span key={i}>{term.name}</span>;
															})}
														</div>
													</div>
												))}
										</div>
									</div>
								</article>
							))}
						</div>

						<button
							type="button"
							className="slick-next slick-arrow slick-disabled"
							style={{ display: "block" }}
						>
							{__("(Next)")}
						</button>

						<ul className="slick-dots">
							<li className="slick-active">
								<button type="button">1</button>
							</li>
							<li>
								<button type="button">2</button>
							</li>
							<li>
								<button type="button">3</button>
							</li>
							<li>
								<button type="button">4</button>
							</li>
						</ul>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withSelect((select, props) => {
	const {
		postsToShowCarousel,
		orderCarousel,
		orderByCarousel,
		categories,
		selectedTag
	} = props.attributes;

	const { getEntityRecords } = select("core");

	let args = {
		order: orderCarousel,
		orderby: orderByCarousel,
		per_page: postsToShowCarousel,
		exclude: [wp.data.select("core/editor").getCurrentPostId()]
	};

	if ( '' !== selectedTag && false !== selectedTag ) {
		args.tags = selectedTag;
	}

	if ( '' !== categories && false !== categories ) {
		args.categories = categories;
	}

	const latestPostsQueryCarousel = pickBy(
		args,
		value => !isUndefined(value)
	);
	return {
		latestPosts: getEntityRecords("postType", "post", latestPostsQueryCarousel)
	};
})(LatestPostsBlockCarousel);
