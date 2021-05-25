/**
 * External dependencies
 */

import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import map from "lodash/map";
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
	BlockControls,
	BlockAlignmentToolbar,
	PanelColorSettings
} = wp.blockEditor;

const MAX_POSTS_COLUMNS = 4;

class LatestPostsBlock extends Component {
	constructor() {
		super(...arguments);
		this.state = { categoriesList: [] };
		this.state = { tagsList: [] };

		this.stillMounted = false;
		this.stillMountedTag = false;

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind(this);
		this.toggleDisplayPostCategories = this.toggleDisplayPostCategories.bind(
			this
		);
		this.toggleDisplayPostExcerpt = this.toggleDisplayPostExcerpt.bind(this);
		this.toggleDisplayPostTags = this.toggleDisplayPostTags.bind(this);
		this.toggleDisplayPostAuthor = this.toggleDisplayPostAuthor.bind(this);
		this.toggleDisplayPostImage = this.toggleDisplayPostImage.bind(this);
		this.toggleDisplayPostShadow = this.toggleDisplayPostShadow.bind(this);
		this.toggleDisplayPostLink = this.toggleDisplayPostLink.bind(this);
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

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostDate: !displayPostDate });
	}

	toggleDisplayPostCategories() {
		const { displayPostCategories } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostCategories: !displayPostCategories });
	}

	toggleDisplayPostExcerpt() {
		const { displayPostExcerpt } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostExcerpt: !displayPostExcerpt });
	}

	toggleDisplayPostTags() {
		const { displayPostTags } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostTags: !displayPostTags });
	}

	toggleDisplayPostAuthor() {
		const { displayPostAuthor } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostAuthor: !displayPostAuthor });
	}

	toggleDisplayPostImage() {
		const { displayPostImage } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostImage: !displayPostImage });
	}

	toggleDisplayPostShadow() {
		const { displayPostShadow } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostShadow: !displayPostShadow });
	}

	toggleDisplayPostLink() {
		const { displayPostLink } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ displayPostLink: !displayPostLink });
	}

	customizeReadMoreText() {
		const { readMoreText } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes({ readMoreText: !readMoreText });
	}

	render() {
		const { attributes, setAttributes, latestPosts } = this.props;
		const {
			displayPostDate,
			displayPostCategories,
			displayPostExcerpt,
			displayPostTags,
			displayPostAuthor,
			displayPostImage,
			displayPostShadow,
			displayPostLink,
			align,
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			tags,
			selectedTag,
			postsToShow,
			width,
			imageCrop,
			postsBackgroundColor,
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

		//console.log(categoriesListObject);

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
		const onChangeBackgroundColor = value =>
			setAttributes({ postsBackgroundColor: value });

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={__("Post Grid Settings")}>
					<QueryControls
						{...{ order, orderBy }}
						numberOfItems={attributes.postsToShow}
						onOrderChange={value => setAttributes({ order: value })}
						onOrderByChange={value => setAttributes({ orderBy: value })}
						onNumberOfItemsChange={value =>
							setAttributes({ postsToShow: value })
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
					{postLayout === "grid" && (
						<RangeControl
							label={__("Columns")}
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={2}
							max={
								!hasPosts
									? MAX_POSTS_COLUMNS
									: Math.min(MAX_POSTS_COLUMNS, latestPosts.length)
							}
						/>
					)}
					<ToggleControl
						label={__("Display Featured Image")}
						checked={displayPostImage}
						onChange={this.toggleDisplayPostImage}
					/>
					<ToggleControl
						label={__("Display Post Author")}
						checked={displayPostAuthor}
						onChange={this.toggleDisplayPostAuthor}
					/>
					<ToggleControl
						label={__("Display Post Date")}
						checked={displayPostDate}
						onChange={this.toggleDisplayPostDate}
					/>
					<ToggleControl
						label={__("Display Post Categories")}
						checked={displayPostCategories}
						onChange={this.toggleDisplayPostCategories}
					/>
					<ToggleControl
						label={__("Display Post Excerpt")}
						checked={displayPostExcerpt}
						onChange={this.toggleDisplayPostExcerpt}
					/>
					<ToggleControl
						label={__("Display Post Tags")}
						checked={displayPostTags}
						onChange={this.toggleDisplayPostTags}
					/>
					<PanelColorSettings
						title={__("Grid Background Colour")}
						initialOpen={true}
						colorSettings={[
							{
								value: postsBackgroundColor,
								onChange: onChangeBackgroundColor,
								label: __("Grid Background Colour", "lsx-blocks")
							}
						]}
					/>
					<ToggleControl
						label={__("Remove Posts Shadow")}
						checked={displayPostShadow}
						onChange={this.toggleDisplayPostShadow}
					/>
					<ToggleControl
						label={__("Display Continue Reading Link")}
						checked={displayPostLink}
						onChange={this.toggleDisplayPostLink}
					/>
					{displayPostLink && (
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
			</InspectorControls>
		);

		const hasPosts = Array.isArray(latestPosts) && latestPosts.length;
		if (!hasPosts) {
			return (
				<Fragment>
					{inspectorControls}
					<Placeholder icon="admin-post" label={__("LSX Blocks Post Grid")}>
						{!Array.isArray(latestPosts) ? <Spinner /> : __("No posts found.")}
					</Placeholder>
				</Fragment>
			);
		}
		//console.log(latestPosts);
		// Removing posts from display should be instant.
		const displayPosts =
			latestPosts.length > attributes.postsToShow
				? latestPosts.slice(0, attributes.postsToShow)
				: latestPosts;

		const layoutControls = [
			{
				icon: "grid-view",
				title: __("Grid View"),
				onClick: () => setAttributes({ postLayout: "grid" }),
				isActive: attributes.postLayout === "grid"
			},
			{
				icon: "list-view",
				title: __("List View"),
				onClick: () => setAttributes({ postLayout: "list" }),
				isActive: attributes.postLayout === "list"
			}
		];

		return (
			<Fragment>
				{inspectorControls}
				<BlockControls>
					<BlockAlignmentToolbar
						value={align}
						onChange={value => {
							setAttributes({ align: value });
						}}
						controls={["center", "wide", "full"]}
					/>
					<Toolbar controls={layoutControls} />
				</BlockControls>
				<div
					className={classnames(
						this.props.className,
						"lsx-block-post-grid",
						align
					)}
				>
					<div
						className={classnames({
							"is-grid": postLayout === "grid",
							"is-list": postLayout === "list",
							[`columns-${columns}`]: postLayout === "grid",
							"lsx-post-grid-items": "lsx-post-grid-items"
						})}
					>
						{displayPosts &&
							displayPosts.map((post, i) => {
								//console.log(post);
								return (
									<article
										key={i}
										className={classnames(
											displayPostShadow ? "disable-shadow" : "",
											post.featured_image_src && displayPostImage
												? "has-thumb"
												: "no-thumb",
											!post.featured_image_src && displayPostImage
												? "placeholder-thumb"
												: ""
										)}
										style={{
											backgroundColor: postsBackgroundColor
										}}
									>
										{displayPostImage &&
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
											displayPostImage && (
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
												{displayPostAuthor && post.author_info.display_name && (
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

												{displayPostDate && post.date_gmt && (
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
												{displayPostCategories &&
													undefined !== post.additional_meta &&
													undefined !== post.additional_meta.category_title &&
													false !== post.additional_meta.category_title &&
													((theCategories =
														post.additional_meta.category_title),
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
												{displayPostExcerpt && post.excerpt && (
													<div
														dangerouslySetInnerHTML={{
															__html: post.excerpt.rendered
														}}
													/>
												)}
												{displayPostExcerpt &&
													post.excerpt.rendered === "" &&
													post.content && (
														<div>
															<p
																dangerouslySetInnerHTML={{
																	__html:
																		post.content.rendered.length > 10
																			? post.content.rendered.substring(
																					0,
																					150
																			  ) + "..."
																			: post.content.rendered
																}}
															/>
														</div>
													)}
												{displayPostLink && (
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
											</div>

											{displayPostTags &&
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
									</article>
								);
							})}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withSelect((select, props) => {
	const {
		postsToShow,
		order,
		orderBy,
		categories,
		selectedTag
	} = props.attributes;
	const { getEntityRecords } = select("core");

	let args = {
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
		exclude: [wp.data.select("core/editor").getCurrentPostId()]
	};

	if ( '' !== selectedTag && false !== selectedTag ) {
		args.tags = selectedTag;
	}

	if ( '' !== categories && false !== categories ) {
		args.categories = categories;
	}

	const latestPostsQuery = pickBy(
		args,
		value => !isUndefined(value)
	);

	return {
		latestPosts: getEntityRecords("postType", "post", latestPostsQuery)
	};
})(LatestPostsBlock);
