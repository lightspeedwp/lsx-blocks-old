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
const enableCustomGroup = ["core/group"];

/**
 * Add the attributes to the group
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addGroupControlAttributes(settings, name) {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomGroup.includes(name)) {
		return settings;
	}
	settings.attributes = assign(settings.attributes, {
		groupMaxWidth: {
			type: "text"
		},
		groupMinHeight: {
			type: "text"
		},
		groupPaddingTop: {
			type: "text"
		},
		groupPaddingBottom: {
			type: "text"
		},
		groupPaddingLeft: {
			type: "text"
		},
		groupPaddingRight: {
			type: "text"
		},
		groupMarginTop: {
			type: "text"
		},
		groupMarginBottom: {
			type: "text"
		},
		groupMarginLeft: {
			type: "text"
		},
		groupMarginRight: {
			type: "text"
		}
	});

	return settings;
}
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-group-block/group-control-attribute",
	addGroupControlAttributes
);

/**
 * Create the Margin and Padding controls on the inspector controls of block.
 */
const groupSettingsControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		// Do nothing if it's another block than our defined ones.
		if (!enableCustomGroup.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {
			groupMaxWidth,
			groupMinHeight,
			groupPaddingTop,
			groupPaddingBottom,
			groupPaddingLeft,
			groupPaddingRight,
			groupMarginTop,
			groupMarginBottom,
			groupMarginLeft,
			groupMarginRight
		} = props.attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />

				<InspectorControls>
					<PanelBody title={__("Additional LSX Settings")} initialOpen={true}>
						<TextControl
							label={__("Max width (px)")}
							type="text"
							value={groupMaxWidth}
							onChange={value => props.setAttributes({ groupMaxWidth: value })}
						/>
						<TextControl
							label={__("Min height (px)")}
							type="text"
							value={groupMinHeight}
							onChange={value => props.setAttributes({ groupMinHeight: value })}
						/>
						<TextControl
							label={__("Group Padding Top (px)")}
							type="text"
							value={groupPaddingTop}
							onChange={value =>
								props.setAttributes({ groupPaddingTop: value })
							}
						/>
						<TextControl
							label={__("Group Padding Bottom (px)")}
							type="text"
							value={groupPaddingBottom}
							onChange={value =>
								props.setAttributes({ groupPaddingBottom: value })
							}
						/>
						<TextControl
							label={__("Group Padding Left (px)")}
							type="text"
							value={groupPaddingLeft}
							onChange={value =>
								props.setAttributes({ groupPaddingLeft: value })
							}
						/>
						<TextControl
							label={__("Group Padding Right (px)")}
							type="text"
							value={groupPaddingRight}
							onChange={value =>
								props.setAttributes({ groupPaddingRight: value })
							}
						/>
						<TextControl
							label={__("Group Margin Top (px)")}
							type="text"
							value={groupMarginTop}
							onChange={value => props.setAttributes({ groupMarginTop: value })}
						/>
						<TextControl
							label={__("Group Margin Bottom (px)")}
							type="text"
							value={groupMarginBottom}
							onChange={value =>
								props.setAttributes({ groupMarginBottom: value })
							}
						/>
						<TextControl
							label={__("Group Margin Left (px)")}
							type="text"
							value={groupMarginLeft}
							onChange={value =>
								props.setAttributes({ groupMarginLeft: value })
							}
						/>
						<TextControl
							label={__("Group Margin Right (px)")}
							type="text"
							value={groupMarginRight}
							onChange={value =>
								props.setAttributes({ groupMarginRight: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "groupSettingsControl");

addFilter(
	"editor.BlockEdit",
	"lsx-blocks/extend-group-block/group-settings-control",
	groupSettingsControl
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
const addExtraPropsGroup = (saveElementProps, blockType, attributes) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomGroup.includes(blockType.name)) {
		return saveElementProps;
	}
	// console.log(attributes.groupPaddingTop);
	// console.log(attributes.groupPaddingBottom);
	if (blockType.name === "core/group") {
		let paddingTop = attributes.groupPaddingTop + "px";
		let paddingBottom = attributes.groupPaddingBottom + "px";
		let paddingLeft = attributes.groupPaddingLeft + "px";
		let paddingRight = attributes.groupPaddingRight + "px";
		let marginTop = attributes.groupMarginTop + "px";
		let marginBottom = attributes.groupMarginBottom + "px";
		let marginLeft = attributes.groupMarginLeft + "px";
		let marginRight = attributes.groupMarginRight + "px";

		let str = "";
		let style = "";
		var obj2 = "";

		if (undefined !== attributes.groupPaddingTop) {
			var obj2 = { ...obj2, paddingTop: paddingTop };
		}
		if (undefined !== attributes.groupPaddingBottom) {
			var obj2 = { ...obj2, paddingBottom: paddingBottom };
		}
		if (undefined !== attributes.groupPaddingLeft) {
			var obj2 = { ...obj2, paddingLeft: paddingLeft };
		}
		if (undefined !== attributes.groupPaddingRight) {
			var obj2 = { ...obj2, paddingRight: paddingRight };
		}
		if (undefined !== attributes.groupMarginTop) {
			var obj2 = { ...obj2, marginTop: marginTop };
		}
		if (undefined !== attributes.groupMarginBottom) {
			var obj2 = { ...obj2, marginBottom: marginBottom };
		}
		if (undefined !== attributes.groupMarginLeft) {
			var obj2 = { ...obj2, marginLeft: marginLeft };
		}
		if (undefined !== attributes.groupMarginRight) {
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
	"lsx-blocks/extend-group-block/add-extra-props-group",
	addExtraPropsGroup
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
	let minHeight = "";
	if (attributes.groupMaxWidth) {
		maxWidth = attributes.groupMaxWidth + "px";
	}

	if (attributes.groupMinHeight) {
		minHeight = attributes.groupMinHeight + "px";
	}

	if (block.name === "core/group" && null !== element && undefined !== attributes.groupMaxWidth) {
		//console.log(attributes.groupMaxWidth);
		let style = "";
		var obj2 = { marginLeft: "auto", marginRight: "auto" };
		var savedElement = undefined;

		if (undefined !== attributes.groupMaxWidth) {
			var obj2 = { ...obj2, maxWidth: maxWidth };
		}
		if (undefined !== attributes.groupMinHeight) {
			var obj2 = { ...obj2, minHeight: minHeight };
		}
		//console.log(element.props.children.props.className);
		if (undefined !== element.props.children) {
			savedElement = element.props.children;
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
	"lsx-blocks/extend-group-block-add-child-styles",
	addChildrenStyles
);
