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
			type: "number"
		},
		groupPaddingBottom: {
			type: "number"
		},
		groupPaddingLeft: {
			type: "number"
		},
		groupPaddingRight: {
			type: "number"
		},
		groupMarginTop: {
			type: "number"
		},
		groupMarginBottom: {
			type: "number"
		},
		groupMarginLeft: {
			type: "number"
		},
		groupMarginRight: {
			type: "number"
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
						<RangeControl
							label={__("Group Padding Top (px)")}
							value={groupPaddingTop}
							onChange={value =>
								props.setAttributes({ groupPaddingTop: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Padding Bottom (px)")}
							value={groupPaddingBottom}
							onChange={value =>
								props.setAttributes({ groupPaddingBottom: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Padding Left (px)")}
							value={groupPaddingLeft}
							onChange={value =>
								props.setAttributes({ groupPaddingLeft: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Padding Right (px)")}
							value={groupPaddingRight}
							onChange={value =>
								props.setAttributes({ groupPaddingRight: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Margin Top (px)")}
							value={groupMarginTop}
							onChange={value => props.setAttributes({ groupMarginTop: value })}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Margin Bottom (px)")}
							value={groupMarginBottom}
							onChange={value =>
								props.setAttributes({ groupMarginBottom: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Margin Left (px)")}
							value={groupMarginLeft}
							onChange={value =>
								props.setAttributes({ groupMarginLeft: value })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Group Margin Right (px)")}
							value={groupMarginRight}
							onChange={value =>
								props.setAttributes({ groupMarginRight: value })
							}
							min={0}
							max={100}
							step={1}
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

	if (blockType.name === "core/group") {
		assign(saveElementProps, {
			style: {
				paddingTop: attributes.groupPaddingTop,
				paddingBottom: attributes.groupPaddingBottom,
				paddingLeft: attributes.groupPaddingLeft,
				paddingRight: attributes.groupPaddingRight,
				marginTop: attributes.groupMarginTop,
				marginBottom: attributes.groupMarginBottom,
				marginLeft: attributes.groupMarginLeft,
				marginRight: attributes.groupMarginRight
			}
		});
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

	if (block.name === "core/group" && undefined !== attributes.groupMaxWidth) {
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

		console.log(savedElement);
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
