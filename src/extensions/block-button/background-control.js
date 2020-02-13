import assign from 'lodash.assign';
const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, SelectControl } = wp.components;

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

/** SPACING */

// Enable spacing control on the following blocks
const enableSpacingControlOnButton = [
	'core/button',
];

// Available spacing control options
const spacingControlOptions = [
	{
		label: __( 'None' ),
		value: '',
	},
	{
		label: __( 'Small' ),
		value: 'small',
	},
	{
		label: __( 'Medium' ),
		value: 'medium',
	},
	{
		label: __( 'Large' ),
		value: 'large',
	},
];

/**
 * Add the spacing attribute to the button
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addSpacingControlAttribute ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnButton.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		spacing: {
			type: 'string',
			default: spacingControlOptions[ 0 ].value,
		},
	} );

	return settings;
}
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-button-block",
	addSpacingControlAttribute
);

/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableSpacingControlOnButton.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { spacing } = props.attributes;

		// add has-spacing-xy class to block
		if ( spacing ) {
			props.attributes.className = `has-spacing-${ spacing }`;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'My Spacing Control' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Spacing' ) }
							value={ spacing }
							options={ spacingControlOptions }
							onChange={ ( selectedSpacingOption ) => {
								props.setAttributes( {
									spacing: selectedSpacingOption,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSpacingControl' );

addFilter(
	"editor.BlockEdit",
	"lsx-blocks/extend-button-block",
	withSpacingControl
);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnButton.includes( blockType.name ) ) {
		return saveElementProps;
	}

	const margins = {
		small: '5px',
		medium: '15px',
		large: '30px',
	};

	if ( attributes.spacing in margins ) {
		// Use Lodash's assign to gracefully handle if attributes are undefined
		assign( saveElementProps, { style: { 'margin-bottom': margins[ attributes.spacing ] } } );
	}

	return saveElementProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"lsx-blocks/extend-button-block",
	addSpacingExtraProps
);


/** HOVER COLOR */

/**
 * Add the hover attribute to the button
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addHoverControlAttribute ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnButton.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		buttonHoverColor: {
			type: 'string',
			default: '#27639D',
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
		if ( ! enableSpacingControlOnButton.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { buttonHoverColor } = props.attributes;

		// add has-hover class to block
		if ( buttonHoverColor ) {
			props.attributes.className = `has-hover-color`;
		}

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
								onChange : ( selectedSpacingOption ) =>
									props.setAttributes( {
										buttonHoverColor: selectedSpacingOption,
									} )
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
	if ( ! enableSpacingControlOnButton.includes( blockType.name ) ) {
		return saveElementProps;
	}

	assign( saveElementProps, {
		style: { 'margin-bottom': '50px' },
		bghover: attributes.buttonHoverColor,
	} );

	return saveElementProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"lsx-blocks/extend-button-block",
	addHoverExtraProps
);
