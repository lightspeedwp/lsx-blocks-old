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
	} );

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'lsx-blocks/extend-heading-block/heading-control-attribute',
	addHeadingControlAttributes
);


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

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

		const { headingHoverColor, headingTextSize } = props.attributes;

		// add has-hover class to block
		if ( headingHoverColor ) {
			var headingHoverClass = `has-hover-color`;
		}

		// add has-shadow class to block
		props.attributes.className = classnames( props.attributes.className, headingHoverClass );
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
						<RangeControl
							label={ __( 'Heading Font Size' ) }
							value={ headingTextSize }
							onChange={ ( value ) => props.setAttributes( { headingTextSize: value } ) }
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
		let str = '';
		str = attributes;
		console.log(str);
		assign( saveElementProps,
			{ style: {
				'color': attributes.customTextColor,
				'fontSize': attributes.headingTextSize,
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
