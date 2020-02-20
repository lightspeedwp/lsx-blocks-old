// Import CSS
import './styles/style.scss';

import classnames from 'classnames';
import assign from 'lodash.assign';

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, RangeControl, ToggleControl, TextControl } = wp.components;

// Enable spacing control on the following blocks
const enableCustomHeading = [
	'core/heading',
];

/**
 * Add the hover attribute to the heading
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addHeadingControlAttributes ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomHeading.includes( name ) ) {
		return settings;
	}
	settings.attributes = assign( settings.attributes, {
		headingTextSize: {
			type: 'number',
		},
		headingMarginTop: {
			type: 'number',
		},
		headingMarginBottom: {
			type: 'number',
		},
	} );

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'lsx-blocks/extend-heading-block/heading-control-attribute',
	addHeadingControlAttributes
);

/**
 * Create HOC to add Hover control to inspector controls of block.
 */
const headingSettingsControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableCustomHeading.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { headingTextSize, headingMarginTop, headingMarginBottom } = props.attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Additional LSX Settings' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Heading Font Size' ) }
							value={ headingTextSize }
							onChange={ ( value ) => props.setAttributes( { headingTextSize: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Heading Margin Top' ) }
							value={ headingMarginTop }
							onChange={ ( value ) => props.setAttributes( { headingMarginTop: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Heading Margin Bottom' ) }
							value={ headingMarginBottom }
							onChange={ ( value ) => props.setAttributes( { headingMarginBottom: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'headingSettingsControl' );

addFilter(
	'editor.BlockEdit',
	'lsx-blocks/extend-heading-block/heading-settings-control',
	headingSettingsControl
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
const addExtraPropsHeading = ( saveElementProps, blockType, attributes ) => {

	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomHeading.includes( blockType.name ) ) {
		return saveElementProps;
	}

	if ( blockType.name === 'core/heading' ) {

		assign( saveElementProps,
			{ style: {
				'color': attributes.customTextColor,
				'fontSize': attributes.headingTextSize,
				'marginTop': attributes.headingMarginTop,
				'marginBottom': attributes.headingMarginBottom,
			}}
		);
	}

	return saveElementProps;

};

addFilter(
	'blocks.getSaveContent.extraProps',
	'lsx-blocks/extend-heading-block/add-extra-props-heading',
	addExtraPropsHeading
);
