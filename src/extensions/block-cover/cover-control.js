// Import CSS
import "./styles/style.scss";

import assign from "lodash.assign";

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, TextControl } = wp.components;

// Enable spacing control on the following blocks
const enableCustomCover = ["core/cover"];

/**
 * Add the attributes to the cover
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addCoverControlAttributes(settings, name) {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomCover.includes(name)) {
		return settings;
	}
	settings.attributes = assign(settings.attributes, {
		align: {
			default: "full"
		},
		dimRatio: {
			default: 0
		},
		containerMaxWidth: {
			type: "text"
		},
		coverPaddingTop: {
			type: "text"
		},
		coverPaddingBottom: {
			type: "text"
		},
		coverPaddingLeft: {
			type: "text"
		},
		coverPaddingRight: {
			type: "text"
		},
		coverMarginTop: {
			type: "text"
		},
		coverMarginBottom: {
			type: "text"
		},
		coverMarginLeft: {
			type: "text"
		},
		coverMarginRight: {
			type: "text"
		}
	});

	return settings;
}
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-cover-block/cover-control-attribute",
	addCoverControlAttributes
);

/**
 * Create the Margin and Padding controls on the inspector controls of block.
 */
const coverSettingsControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		// Do nothing if it's another block than our defined ones.
		if (!enableCustomCover.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {
			containerMaxWidth,
			coverPaddingTop,
			coverPaddingBottom,
			coverPaddingLeft,
			coverPaddingRight,
			coverMarginTop,
			coverMarginBottom,
			coverMarginLeft,
			coverMarginRight
		} = props.attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Additional LSX Settings")} initialOpen={true}>
						<TextControl
							label={__("Container Max width (px)")}
							type="text"
							value={containerMaxWidth}
							onChange={value =>
								props.setAttributes({ containerMaxWidth: value })
							}
						/>
						<TextControl
							label={__("Cover Padding Top (px)")}
							type="text"
							value={coverPaddingTop}
							onChange={value =>
								props.setAttributes({ coverPaddingTop: value })
							}
						/>
						<TextControl
							label={__("Cover Padding Bottom (px)")}
							type="text"
							value={coverPaddingBottom}
							onChange={value =>
								props.setAttributes({ coverPaddingBottom: value })
							}
						/>
						<TextControl
							label={__("Cover Padding Left (px)")}
							type="text"
							value={coverPaddingLeft}
							onChange={value =>
								props.setAttributes({ coverPaddingLeft: value })
							}
						/>
						<TextControl
							label={__("Cover Padding Right:  (px)")}
							type="text"
							value={coverPaddingRight}
							onChange={value =>
								props.setAttributes({ coverPaddingRight: value })
							}
						/>
						<TextControl
							label={__("Cover Margin Top:  (px)")}
							type="text"
							value={coverMarginTop}
							onChange={value => props.setAttributes({ coverMarginTop: value })}
						/>
						<TextControl
							label={__("Cover Margin Bottom:  (px)")}
							type="text"
							value={coverMarginBottom}
							onChange={value =>
								props.setAttributes({ coverMarginBottom: value })
							}
						/>
						<TextControl
							label={__("Cover Margin Left:  (px)")}
							type="text"
							value={coverMarginLeft}
							onChange={value =>
								props.setAttributes({ coverMarginLeft: value })
							}
						/>
						<TextControl
							label={__("Cover Margin Right:  (px)")}
							type="text"
							value={coverMarginRight}
							onChange={value =>
								props.setAttributes({ coverMarginRight: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "coverSettingsControl");

addFilter(
	"editor.BlockEdit",
	"lsx-blocks/extend-cover-block/cover-settings-control",
	coverSettingsControl
);

/**
 * Add all styles attributes to the element block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addExtraPropsCover = (saveElementProps, blockType, attributes) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomCover.includes(blockType.name)) {
		return saveElementProps;
	}

	if (blockType.name === "core/cover") {
		let paddingTop = attributes.coverPaddingTop + "px";
		let paddingBottom = attributes.coverPaddingBottom + "px";
		let paddingLeft = attributes.coverPaddingLeft + "px";
		let paddingRight = attributes.coverPaddingRight + "px";
		let marginTop = attributes.coverMarginTop + "px";
		let marginBottom = attributes.coverMarginBottom + "px";
		let marginLeft = attributes.coverMarginLeft + "px";
		let marginRight = attributes.coverMarginRight + "px";

		let str = "";
		let style = "";
		var obj2 = "";

		if (undefined !== attributes.coverPaddingTop) {
			var obj2 = { ...obj2, paddingTop: paddingTop };
		}
		if (undefined !== attributes.coverPaddingBottom) {
			var obj2 = { ...obj2, paddingBottom: paddingBottom };
		}
		if (undefined !== attributes.coverPaddingLeft) {
			var obj2 = { ...obj2, paddingLeft: paddingLeft };
		}
		if (undefined !== attributes.coverPaddingRight) {
			var obj2 = { ...obj2, paddingRight: paddingRight };
		}
		if (undefined !== attributes.coverMarginTop) {
			var obj2 = { ...obj2, marginTop: marginTop };
		}
		if (undefined !== attributes.coverMarginBottom) {
			var obj2 = { ...obj2, marginBottom: marginBottom };
		}
		if (undefined !== attributes.coverMarginLeft) {
			var obj2 = { ...obj2, marginLeft: marginLeft };
		}
		if (undefined !== attributes.coverMarginRight) {
			var obj2 = { ...obj2, marginRight: marginRight };
		}

		str = saveElementProps.style;

		style = { ...str, ...obj2 };

		// console.log(saveElementProps);
		// console.log(attributes);

		assign(saveElementProps, { style });
	}

	return saveElementProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"lsx-blocks/extend-cover-block/add-extra-props-cover",
	addExtraPropsCover
);

/**
 * Add box shadow styles to button.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addChildrenStyles = (element, block, attributes) => {
	let maxWidth = "";
	if (attributes.containerMaxWidth) {
		maxWidth = attributes.containerMaxWidth + "px";
	}

	if (
		block.name === "core/cover" &&
		undefined !== attributes.containerMaxWidth &&
		null !== element
	) {
		//console.log(attributes.containerMaxWidth);
		let style = "";
		var obj2 = { maxWidth: maxWidth };
		var savedElement = undefined;

		if (undefined !== element.props.children) {
			savedElement = element.props.children[2];
		}

		//console.log(savedElement);
		if (undefined !== savedElement) {
			style = { ...obj2 };

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(savedElement, {
					style
				})
			);
		}
	}

	return element;
};

addFilter(
	"blocks.getSaveElement",
	"lsx-blocks/extend-cover-block-add-child-styles",
	addChildrenStyles
);
