// Import CSS
import "./styles/style.scss";

import classnames from "classnames";
import assign from "lodash.assign";

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, SelectControl } = wp.components;

// Enable spacing control on the following blocks
const enableCustomButton = ["core/button"];

/**
 * Add the hover attribute to the button
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addHoverControlAttribute(settings, name) {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomButton.includes(name)) {
		return settings;
	}
	settings.attributes = assign(settings.attributes, {
		buttonHoverColor: {
			type: "string"
		},
		buttonShadowColor: {
			type: "string",
			default: ""
		},
		buttonHoverShadowColor: {
			type: "string",
			default: ""
		},
		buttonHoverTextColor: {
			type: "string"
		},
		borderRadius: {
			default: 3
		},
		buttonFullWidth: {
			type: "boolean",
			default: false
		},
		buttonDepth: {
			type: "boolean",
			default: false
		},
		buttonSize: {
			type: "string",
			default: ""
		},
		buttonModal: {
			type: "boolean",
			default: false
		},
		buttonDataTarget: {
			type: "string"
		},
		buttonDataToggle: {
			type: "string"
		}
	});

	return settings;
}
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-button-block/hover-control-attribute",
	addHoverControlAttribute
);

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

/**
 * Create HOC to add Hover control to inspector controls of block.
 */
const withHoverControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		// Do nothing if it's another block than our defined ones.
		if (!enableCustomButton.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {
			buttonHoverColor,
			buttonShadowColor,
			buttonHoverShadowColor,
			buttonHoverTextColor,
			buttonFullWidth,
			buttonDepth,
			buttonSize,
			buttonModal,
			buttonDataTarget,
			buttonDataToggle
		} = props.attributes;

		// Button size values
		const buttonSizeOptions = [
			{ value: "lsx-button-size-small", label: __("Small") },
			{ value: "", label: __("Medium") },
			{ value: "lsx-button-size-large", label: __("Large") }
		];

		if (buttonFullWidth === true) {
			var buttonFullWidthClass = "button-full-width-true";
		} else {
			var buttonFullWidthClass = "button-full-width-false";
		}
		if (buttonDepth === true) {
			var buttonDepthClass = "button-3d-true";
		} else {
			var buttonDepthClass = "button-3d-false";
		}
		if (buttonSize) {
			var buttonSizeClass = buttonSize;
		}
		// add has-hover class to block
		if (buttonHoverColor) {
			var buttonHoverClass = `has-hover-color-` + buttonHoverColor;
		}
		if (buttonShadowColor) {
			var buttonShadowClass = `has-shadow-color`;
		}
		if (buttonHoverShadowColor) {
			var buttonHoverShadowClass =
				`has-shadow-hover-color-` + buttonHoverShadowColor;
		}
		if (buttonHoverTextColor) {
			var buttonHoverTextClass = `has-hover-text-color-` + buttonHoverTextColor;
		}

		// add has-shadow class to block
		props.attributes.className = classnames(
			props.attributes.className,
			buttonFullWidthClass,
			buttonDepthClass,
			buttonHoverClass,
			buttonSizeClass,
			buttonShadowClass,
			buttonHoverShadowClass,
			buttonHoverTextClass
		);
		//console.log(props.attributes.className);

		var checkWidth = "button-full-width-true";
		var checkDepth = "button-3d-true";
		var myPatternWidth = new RegExp("(\\w*" + checkWidth + "\\w*)", "gi");
		var myPatternDepth = new RegExp("(\\w*" + checkDepth + "\\w*)", "gi");

		var matches = props.attributes.className.match(myPatternWidth);
		var matchesDepth = props.attributes.className.match(myPatternDepth);

		props.attributes.className = props.attributes.className.split(" ");
		props.attributes.className = props.attributes.className.filter(onlyUnique);
		props.attributes.className = props.attributes.className.join(" ");

		if (matches != undefined) {
			//console.log(matches[0]);
			if (buttonFullWidth === true) {
				props.attributes.className = props.attributes.className.replace(
					"button-full-width-false",
					""
				);
				//console.log(props.attributes.className);
			} else {
				props.attributes.className = props.attributes.className.replace(
					"button-full-width-true",
					""
				);
				//console.log(props.attributes.className);
			}
		}
		if (matchesDepth != undefined) {
			if (buttonDepth === true) {
				props.attributes.className = props.attributes.className.replace(
					"button-3d-false",
					""
				);
			} else {
				props.attributes.className = props.attributes.className.replace(
					"button-3d-true",
					""
				);
			}
		}

		if (buttonSize !== "lsx-button-size-small") {
			props.attributes.className = props.attributes.className.replace(
				"lsx-button-size-small",
				""
			);
		}
		if (buttonSize !== "lsx-button-size-large") {
			props.attributes.className = props.attributes.className.replace(
				"lsx-button-size-large",
				""
			);
		}

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Additional LSX Settings")} initialOpen={true}>
						<ToggleControl
							label={__("Display fullwidth")}
							checked={buttonFullWidth}
							onChange={() =>
								props.setAttributes({ buttonFullWidth: !buttonFullWidth })
							}
						/>
						<ToggleControl
							label={__("3D Button")}
							checked={buttonDepth}
							onChange={() =>
								props.setAttributes({ buttonDepth: !buttonDepth })
							}
						/>
						<SelectControl
							label={__("Button Size")}
							value={buttonSize}
							options={buttonSizeOptions.map(({ value, label }) => ({
								value: value,
								label: label
							}))}
							onChange={value => {
								props.setAttributes({ buttonSize: value });
							}}
						/>
						<PanelColorSettings
							title={__("Button Hover Color")}
							initialOpen={true}
							colorSettings={[
								{
									value: buttonHoverColor,
									label: __("Button Hover Color"),
									onChange: selectedHoverOption =>
										props.setAttributes({
											buttonHoverColor: selectedHoverOption
										})
								}
							]}
						/>
						<PanelColorSettings
							title={__("Button Text Hover Color")}
							initialOpen={true}
							colorSettings={[
								{
									value: buttonHoverTextColor,
									label: __("Button Text Hover Color"),
									onChange: selectedTextHoverOption =>
										props.setAttributes({
											buttonHoverTextColor: selectedTextHoverOption
										})
								}
							]}
						/>
						<PanelColorSettings
							title={__("Button Shadow Color")}
							initialOpen={true}
							colorSettings={[
								{
									value: buttonShadowColor,
									label: __("Button Shadow Color"),
									onChange: selectedShadowOption =>
										props.setAttributes({
											buttonShadowColor: selectedShadowOption
										})
								}
							]}
						/>
						<PanelColorSettings
							title={__("Button hover Shadow Color")}
							initialOpen={true}
							colorSettings={[
								{
									value: buttonHoverShadowColor,
									label: __("Button Hover Shadow Color"),
									onChange: selectedHoverShadowOption =>
										props.setAttributes({
											buttonHoverShadowColor: selectedHoverShadowOption
										})
								}
							]}
						/>
						<ToggleControl
							label={__("Is this a button that opens a Modal?")}
							checked={buttonModal}
							onChange={() =>
								props.setAttributes({ buttonModal: !buttonModal })
							}
						/>
						{buttonModal && (
							<TextControl
								label={__("Add data-target attribute")}
								type="text"
								value={buttonDataTarget}
								onChange={value =>
									props.setAttributes({ buttonDataTarget: value })
								}
							/>
						)}
						{buttonModal && (
							<TextControl
								label={__("Add data-toggle attribute")}
								type="text"
								value={buttonDataToggle}
								onChange={value =>
									props.setAttributes({ buttonDataToggle: value })
								}
							/>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withHoverControl");

addFilter(
	"editor.BlockEdit",
	"lsx-blocks/extend-button-block/with-hover-control",
	withHoverControl
);

/**
 * Add hover style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addHoverExtraProps = (saveElementProps, blockType, attributes) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableCustomButton.includes(blockType.name)) {
		return saveElementProps;
	}

	if (undefined !== saveElementProps.children) {
		if (undefined !== saveElementProps.children.props) {
			assign(saveElementProps.children.props, {
				bghover: attributes.buttonHoverColor,
				texthover: attributes.buttonHoverTextColor,
				shadowhover: attributes.buttonHoverShadowColor
			});
		} else {
			assign(saveElementProps.children, {
				props: {
					bghover: attributes.buttonHoverColor,
					texthover: attributes.buttonHoverTextColor,
					shadowhover: attributes.buttonHoverShadowColor
				}
			});
		}
	} else if (undefined !== saveElementProps.props) {
		assign(saveElementProps.props, {
			bghover: attributes.buttonHoverColor,
			texthover: attributes.buttonHoverTextColor,
			shadowhover: attributes.buttonHoverShadowColor
		});
	} else {
		assign(saveElementProps, {
			props: {
				bghover: attributes.buttonHoverColor,
				texthover: attributes.buttonHoverTextColor,
				shadowhover: attributes.buttonHoverShadowColor
			}
		});
	}
	return saveElementProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"lsx-blocks/extend-button-block/add-extra-hover-props",
	addHoverExtraProps
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
const addExtraClassesButton = (element, block, attributes) => {
	let boxShadowStyle = "none";
	if (attributes.buttonDepth === true) {
		boxShadowStyle = "2px 2px 0 0 #27639d";
	}
	if (attributes.buttonShadowColor) {
		boxShadowStyle = "2px 2px 0 0 " + attributes.buttonShadowColor;
	}

	if (block.name === "core/button" && null !== element ) {
		let str = undefined;
		let style = "";
		var obj2 = { boxShadow: boxShadowStyle };
		var savedElement = undefined;

		if (undefined !== element.props.children) {
			str = element.props.children.props.style;
			savedElement = element.props.children;
		} else if (undefined !== element.props.style) {
			str = element.props.style;
			savedElement = element;
		}

		if (undefined !== str && undefined !== savedElement) {
			style = { ...str, ...obj2 };

			let dataToggle = attributes.buttonDataToggle;
			let dataTarget = attributes.buttonDataTarget;

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(savedElement, {
					style,
					"data-target": dataTarget,
					"data-toggle": dataToggle
				})
			);
		}
	}

	return element;
};

addFilter(
	"blocks.getSaveElement",
	"lsx-blocks/extend-button-block-add-extra-classes",
	addExtraClassesButton
);
