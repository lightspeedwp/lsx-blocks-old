// Import CSS
import './styles/style.scss';
//import './styles/editor.scss';

import classnames from 'classnames';
import assign from 'lodash.assign';

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody } = wp.components;

unregisterBlockStyle( 'core/button' , [
	{ name: 'fill', label: __( 'Fill' ) },
	{ name: 'outline', label: __( 'Outline' ) },
]);

// registerBlockStyle( 'core/button' , {
//     name: 'extended-button-lsx',
// 	label: __( 'LSX Button' ),
// 	isDefault: true
// });


// Enable spacing control on the following blocks
const enableCustomButton = [
	'core/button',
];


/**
 * Changes name the to Button Block
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function extendButtonBlock( settings, name ) {
	if ("core/button" === name ) {
		settings.title = __("Button Extended", "lsx-blocks" );
	}
	return settings;
}
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-button-block",
	extendButtonBlock
);

/** HOVER AND BACKGROUND COLOR */

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
	"blocks.registerBlockType",
	"lsx-blocks/extend-button-block",
	addHoverControlAttribute
);

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

		const applyTheme = () => {
			document.documentElement.style.setProperty('--color-primary', buttonShadowColor);
		};

		// add has-hover class to block
		if ( buttonHoverColor ) {
			var buttonHoverClass = `has-hover-color`;
			console.log(buttonHoverColor);
		}
		if ( buttonShadowColor ) {
			var buttonShadowClass = `has-shadow-color`;
		}
		// add has-shadow class to block
		props.attributes.className = classnames(
			buttonHoverClass,
			buttonShadowClass
		)

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Change Hover Control' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Button Hover Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonHoverColor,
								label: __( 'Button Hover Color' ),
								onChange : ( selectedHoverOption ) =>
									props.setAttributes( {
										buttonHoverColor: selectedHoverOption,
									} )
							} ] }
						>
						</PanelColorSettings>
						<PanelColorSettings
							title={ __( 'Button Shadow Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonShadowColor,
								label: __( 'Button Shadow Color' ),
								onChange : ( selectedShadowOption ) =>
									props.setAttributes( {
										buttonShadowColor: selectedShadowOption,
									},
									applyTheme(nextTheme),
								),
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
	"editor.BlockEdit",
	"lsx-blocks/extend-button-block",
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

	assign( saveElementProps, {
		bghover: attributes.buttonHoverColor,
	} );

	return saveElementProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"lsx-blocks/extend-button-block",
	addHoverExtraProps
);
