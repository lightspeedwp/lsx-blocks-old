/**
 * External dependencies
 */
import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import map from "lodash/map";
import classnames from "classnames";

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
	ToggleControl
} = wp.components;

const { InspectorControls, PanelColorSettings } = wp.blockEditor;

class TeamBlock extends Component {
	constructor() {
		super(...arguments);
		this.state = { teamroleList: [] };
		this.stillMounted = false;
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch({
			path: addQueryArgs("/wp/v2/team_role", { per_page: -1 })
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
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {
		const {
			attributes,
			posts,
			className,
			setAttributes,
			numberOfItems
		} = this.props;
		const {
			order,
			orderBy,
			teamrole,
			postsToShow,
			postLayout,
			columns,
			displayCarousel,
			imageShape,
			itemFontColor,
			itemBackgroundColor,
			displayPostImage,
			displayPostExcerpt,
			displayPostLink,
			displayTeamSocial,
			displayTeamJobTitle,
			displayTeamRole,
			includeId
		} = attributes;

		const { categoriesList } = this.state;

		let theRoles = "";

		//console.log(categoriesList);
		if (!posts) {
			return (
				<p className={className}>
					<Spinner />
					{__("Loading Team Members", "lsx-blocks")}
				</p>
			);
		}
		if (0 === posts.length) {
			return <p>{__("No Team Members found", "lsx-blocks")}</p>;
		}

		// Layouts options
		const postLayoutOptions = [
			{ value: "grid", label: __("Grid") },
			{ value: "list", label: __("List") }
		];

		//Image Shape options
		const imageShapeOptions = [
			{ value: "circle", label: __("Circle") },
			{ value: "square", label: __("Square") }
		];

		//Image Shape options
		const displayPostExcerptOptions = [
			{ value: "excerpt", label: __("Excerpt") },
			{ value: "full", label: __("Full Content") },
			{ value: "none", label: __("No Content") }
		];

		const onChangeItemFontColor = value =>
			setAttributes({ itemFontColor: value });
		const onChangeItemBackgroundColor = value =>
			setAttributes({ itemBackgroundColor: value });

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={__("Layout Settings")}>
					<RadioControl
						selected={postLayout}
						options={postLayoutOptions}
						onChange={value => setAttributes({ postLayout: value })}
					/>
					{postLayout === "grid" && (
						<RangeControl
							label={__("Columns")}
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={2}
							max={4}
							step={1}
						/>
					)}
					{postLayout === "grid" && (
						<ToggleControl
							label={__("Enable Carousel")}
							checked={displayCarousel}
							onChange={() =>
								this.props.setAttributes({ displayCarousel: !displayCarousel })
							}
						/>
					)}
					<SelectControl
						label={__("Image Shape")}
						value={imageShape}
						options={imageShapeOptions.map(({ value, label }) => ({
							value: value,
							label: label
						}))}
						onChange={value => {
							this.props.setAttributes({ imageShape: value });
						}}
					/>
					<PanelColorSettings
						colorSettings={[
							{
								value: itemBackgroundColor,
								onChange: onChangeItemBackgroundColor,
								label: __("Items Background Colour")
							}
						]}
					/>
					<PanelColorSettings
						colorSettings={[
							{
								value: itemFontColor,
								onChange: onChangeItemFontColor,
								label: __("Items Font Color")
							}
						]}
					/>
				</PanelBody>
				<PanelBody title={__("Display Settings")}>
					<SelectControl
						label={__("Display Excerpt")}
						value={displayPostExcerpt}
						options={displayPostExcerptOptions.map(({ value, label }) => ({
							value: value,
							label: label
						}))}
						onChange={value => {
							this.props.setAttributes({ displayPostExcerpt: value });
						}}
					/>
					<ToggleControl
						label={__("Display Featured Image")}
						checked={displayPostImage}
						onChange={() =>
							this.props.setAttributes({ displayPostImage: !displayPostImage })
						}
					/>
					<ToggleControl
						label={__("Link to single team member")}
						checked={displayPostLink}
						onChange={() =>
							this.props.setAttributes({ displayPostLink: !displayPostLink })
						}
					/>
					<ToggleControl
						label={__("Show Social Icons")}
						checked={displayTeamSocial}
						onChange={() =>
							this.props.setAttributes({
								displayTeamSocial: !displayTeamSocial
							})
						}
					/>
					<ToggleControl
						label={__("Show Job Title")}
						checked={displayTeamJobTitle}
						onChange={() =>
							this.props.setAttributes({
								displayTeamJobTitle: !displayTeamJobTitle
							})
						}
					/>
					<ToggleControl
						label={__("Show Role")}
						checked={displayTeamRole}
						onChange={() =>
							this.props.setAttributes({ displayTeamRole: !displayTeamRole })
						}
					/>
				</PanelBody>
				<PanelBody className="team-panel" title={__("General Settings")}>
					<QueryControls
						{...{ order, orderBy, postsToShow, numberOfItems, teamrole }}
						numberOfItems={postsToShow}
						categoriesList={categoriesList}
						selectedCategoryId={teamrole}
						onOrderChange={value => setAttributes({ order: value })}
						onOrderByChange={value => setAttributes({ orderBy: value })}
						onCategoryChange={value =>
							setAttributes({ teamrole: "" !== value ? value : undefined })
						}
						onNumberOfItemsChange={value =>
							setAttributes({ postsToShow: value })
						}
					/>
					<TextControl
						label={__("Specify team members by ID")}
						help={__("Comma separated list, overrides limit setting")}
						type="text"
						value={includeId}
						onChange={value => this.props.setAttributes({ includeId: value })}
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<Fragment>
				{inspectorControls}
				<div
					className={classnames(
						className,
						postLayout === "grid" ? "is-grid" : "is-list",
						[`columns-${columns}`]
					)}
				>
					{posts.map((post, i) => {
						//console.log(post.additional_meta.role);
						return (
							<article
								key={i}
								className={classnames(
									post.featured_media && displayPostImage
										? "has-thumb"
										: "no-thumb",
									"lsx-team-slot"
								)}
								style={{
									background: itemBackgroundColor
								}}
							>
								{displayPostImage &&
								undefined !== post.featured_media &&
								post.featured_media ? (
									<div className="lsx-block-post-grid-image">
										<a href={post.link} target="_blank" rel="bookmark">
											<img
												className={imageShape}
												src={post.images.medium}
												alt={
													decodeEntities(post.title.rendered.trim()) ||
													__("(Untitled)")
												}
											/>
										</a>
									</div>
								) : (
									<div className="lsx-block-post-grid-image">
										<a href={post.link} target="_blank" rel="bookmark">
											<img
												className={imageShape}
												src={
													document.location.origin +
													"/wp-content/plugins/lsx-blocks/dist/assets/images/mystery-man-square.png"
												}
												alt={
													decodeEntities(post.title.rendered.trim()) ||
													__("(Untitled)")
												}
											/>
										</a>
									</div>
								)}

								<div className="lsx-block-post-grid-text lsx-team-description">
									<h5 className="lsx-team-name">
										<a href={post.link} target="_blank" rel="bookmark">
											{decodeEntities(post.title.rendered.trim()) ||
												__("(Untitled)")}
										</a>
									</h5>
									{/* { role &&
										<small className="lsx-team-job-title">{role}</small>
									} */}
									{displayTeamJobTitle === true &&
										undefined !== post.additional_meta &&
										undefined !== post.additional_meta.job_title && (
											<small className="lsx-team-job-title">
												{post.additional_meta.job_title}
											</small>
										)}
									{displayTeamRole &&
										undefined !== post.additional_meta &&
										undefined !== post.additional_meta.role &&
										1 >= post.additional_meta.role.length &&
										((theRoles = post.additional_meta.role), //console.log(theRoles),
										undefined !== theRoles && (
											<small className="lsx-team-team-role">
												{theRoles.map((role, i) => {
													return <span key={i}>{role.name}</span>;
												})}
											</small>
										))}
									<div
										className="lsx-block-post-grid-excerpt"
										style={{
											color: itemFontColor
										}}
									>
										{displayPostExcerpt === "excerpt" && post.excerpt && (
											<div
												dangerouslySetInnerHTML={{
													__html: post.excerpt.rendered
												}}
											/>
										)}
										{displayPostExcerpt === "excerpt" &&
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
										{displayPostExcerpt === "full" && post.content && (
											<div
												dangerouslySetInnerHTML={{
													__html: post.content.rendered
												}}
											/>
										)}
									</div>
									{displayTeamSocial &&
										undefined !== post.additional_meta &&
										(post.additional_meta.facebook ||
											post.additional_meta.twitter ||
											post.additional_meta.linkedin) && (
											<ul className="team-social">
												{post.additional_meta.facebook && (
													<li className="fb">
														<a href={post.additional_meta.facebook}>
															<i
																className="fa fa-facebook"
																aria-hidden="true"
															/>
														</a>
													</li>
												)}
												{post.additional_meta.twitter && (
													<li className="tw">
														<a href={post.additional_meta.twitter}>
															<i className="fa fa-twitter" aria-hidden="true" />
														</a>
													</li>
												)}
												{post.additional_meta.linkedin && (
													<li className="ln">
														<a href={post.additional_meta.linkedin}>
															<i
																className="fa fa-linkedin"
																aria-hidden="true"
															/>
														</a>
													</li>
												)}
											</ul>
										)}
									{displayPostLink === true && (
										<a
											href={post.link}
											className="lsx-team-show-more"
											tabIndex="0"
										>
											More about{" "}
											{decodeEntities(post.title.rendered.trim()) ||
												__("(Untitled)")}
											<i
												className="fa fa-long-arrow-right"
												aria-hidden="true"
											/>
										</a>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</Fragment>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const {
			postsToShow,
			order,
			orderBy,
			includeId,
			teamrole
		} = props.attributes;
		const latestPostsQuery = pickBy({
			team_role: teamrole,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			include: includeId
		});

		return {
			posts: select("core").getEntityRecords(
				"postType",
				"team",
				latestPostsQuery
			)
		};
	})
])(TeamBlock);
