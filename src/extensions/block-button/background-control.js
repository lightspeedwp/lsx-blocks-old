// Import CSS
import './styles/style.scss';
//import './styles/editor.scss';

import classnames from 'classnames';
import assign from 'lodash.assign';

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody } = wp.components;

// Enable spacing control on the following blocks
const enableCustomButton = [
	'core/button',
];

/**
 * Add the hover attribute to the button
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addHoverControlAttribute ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomButton.includes( name ) ) {
		return settings;
	}
	settings.attributes = assign( settings.attributes, {
		buttonHoverColor: {
			type: 'string',
		},
		buttonShadowColor: {
			type: 'string',
		},
	} );

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'lsx-blocks/extend-button-block/hover-control-attribute',
	addHoverControlAttribute
);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * Create HOC to add Hover control to inspector controls of block.
 */
const withHoverControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableCustomButton.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { buttonHoverColor, buttonShadowColor } = props.attributes;

		// add has-hover class to block
		if ( buttonHoverColor ) {
			var buttonHoverClass = `has-hover-color`;
		}
		if ( buttonShadowColor ) {
			var buttonShadowClass = `has-shadow-color`;
		}

		// add has-shadow class to block
		props.attributes.className = classnames( props.attributes.className, buttonHoverClass, buttonShadowClass );
		props.attributes.className = props.attributes.className.split( ' ' );
		props.attributes.className = props.attributes.className.filter( onlyUnique );
		props.attributes.className = props.attributes.className.join( ' ' );

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Additional LSX Settings' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Button Hover Color' ) }
							initialOpen={ true }
							colorSettings={ [ {
								value: buttonHoverColor,
								label: __( 'Button Hover Color' ),
								onChange: ( selectedHoverOption ) =>
									props.setAttributes( {
										buttonHoverColor: selectedHoverOption,
									} ),
							} ] }
						>
						</PanelColorSettings>
						<PanelColorSettings
							title={ __( 'Button Shadow Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonShadowColor,
								label: __( 'Button Shadow Color' ),
								onChange: ( selectedShadowOption ) =>
									props.setAttributes( {
										buttonShadowColor: selectedShadowOption,
									} ),
							} ] }
						>
						</PanelColorSettings>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withHoverControl' );

addFilter(
	'editor.BlockEdit',
	'lsx-blocks/extend-button-block/with-hover-control',
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
const addHoverExtraProps = ( saveElementProps, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomButton.includes( blockType.name ) ) {
		return saveElementProps;
	}

	assign( saveElementProps, { bghover: attributes.buttonHoverColor } );

	return saveElementProps;
};

addFilter(
	'blocks.getSaveContent.extraProps',
	'lsx-blocks/extend-button-block/add-extra-hover-props',
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
const addExtraClassesButton = ( element, block, attributes ) => {

	let boxShadowStyle = '#27639e';
	if ( attributes.buttonShadowColor ) {
		boxShadowStyle = '2px 2px 0 0 ' + attributes.buttonShadowColor;
	}
	if ( block.name === 'core/button' ) {
		return wp.element.cloneElement(
			element,
			{},
			wp.element.cloneElement(
				element.props.children,
				{
					style: {
						boxShadow: boxShadowStyle,
					},
				},
			),
		);
	}
	return element;
};

addFilter(
	'blocks.getSaveElement',
	'lsx-blocks/extend-button-block-add-extra-classes',
	addExtraClassesButton
);
