// Import CSS
import './styles/style.scss';

import assign from 'lodash.assign';

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;

// Enable spacing control on the following blocks
const enableCustomCover = [
	'core/cover',
];

/**
 * Add the attributes to the cover
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addCoverControlAttributes ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomCover.includes( name ) ) {
		return settings;
	}
	settings.attributes = assign( settings.attributes, {
		align: {
			default: 'full',
		},
		dimRatio: {
			default: 0,
		},
		coverPaddingTop: {
			type: 'number',
		},
		coverPaddingBottom: {
			type: 'number',
		},
		coverPaddingLeft: {
			type: 'number',
		},
		coverPaddingRight: {
			type: 'number',
		},
		coverMarginTop: {
			type: 'number',
		},
		coverMarginBottom: {
			type: 'number',
		},
		coverMarginLeft: {
			type: 'number',
		},
		coverMarginRight: {
			type: 'number',
		},
	} );

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'lsx-blocks/extend-cover-block/cover-control-attribute',
	addCoverControlAttributes
);

/**
 * Create the Margin and Padding controls on the inspector controls of block.
 */
const coverSettingsControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableCustomCover.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { coverPaddingTop, coverPaddingBottom, coverPaddingLeft, coverPaddingRight, coverMarginTop, coverMarginBottom, coverMarginLeft, coverMarginRight } = props.attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Additional LSX Settings' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Cover Padding Top (px)' ) }
							value={ coverPaddingTop }
							onChange={ ( value ) => props.setAttributes( { coverPaddingTop: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Padding Bottom (px)' ) }
							value={ coverPaddingBottom }
							onChange={ ( value ) => props.setAttributes( { coverPaddingBottom: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Padding Left (px)' ) }
							value={ coverPaddingLeft }
							onChange={ ( value ) => props.setAttributes( { coverPaddingLeft: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Padding Right (px)' ) }
							value={ coverPaddingRight }
							onChange={ ( value ) => props.setAttributes( { coverPaddingRight: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Margin Top (px)' ) }
							value={ coverMarginTop }
							onChange={ ( value ) => props.setAttributes( { coverMarginTop: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Margin Bottom (px)' ) }
							value={ coverMarginBottom }
							onChange={ ( value ) => props.setAttributes( { coverMarginBottom: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Margin Left (px)' ) }
							value={ coverMarginLeft }
							onChange={ ( value ) => props.setAttributes( { coverMarginLeft: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Cover Margin Right (px)' ) }
							value={ coverMarginRight }
							onChange={ ( value ) => props.setAttributes( { coverMarginRight: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'coverSettingsControl' );

addFilter(
	'editor.BlockEdit',
	'lsx-blocks/extend-cover-block/cover-settings-control',
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
const addExtraPropsCover = ( saveElementProps, blockType, attributes ) => {

	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomCover.includes( blockType.name ) ) {
		return saveElementProps;
	}

	if ( blockType.name === 'core/cover' ) {

		let paddingTop = attributes.coverPaddingTop + 'px';
		let paddingBottom = attributes.coverPaddingBottom + 'px';
		let paddingLeft = attributes.coverPaddingLeft + 'px';
		let paddingRight = attributes.coverPaddingRight + 'px';
		let marginTop = attributes.coverMarginTop + 'px';
		let marginBottom = attributes.coverMarginBottom + 'px';
		let marginLeft = attributes.coverMarginLeft + 'px';
		let marginRight = attributes.coverMarginRight + 'px';

		let str = '';
		let style = '';
		var obj2 = '';
		if ( undefined !== attributes.coverPaddingTop ) {
			var obj2 = { ...obj2, 'paddingTop': paddingTop };
		}
		if ( undefined !== attributes.coverPaddingBottom ) {
			var obj2 = { ...obj2, 'paddingBottom': paddingBottom };
		}
		if ( undefined !== attributes.coverPaddingLeft ) {
			var obj2 = { ...obj2, 'paddingLeft': paddingLeft };
		}
		if ( undefined !== attributes.coverPaddingRight ) {
			var obj2 = { ...obj2, 'paddingRight': paddingRight };
		}
		if ( undefined !== attributes.coverMarginTop ) {
			var obj2 = { ...obj2, 'marginTop': marginTop };
		}
		if ( undefined !== attributes.coverMarginBottom ) {
			var obj2 = { ...obj2, 'marginBottom': marginBottom };
		}
		if ( undefined !== attributes.coverMarginLeft ) {
			var obj2 = { ...obj2, 'marginLeft': marginLeft };
		}
		if ( undefined !== attributes.coverMarginRight ) {
			var obj2 = { ...obj2, 'marginRight': marginRight };
		}

		str = saveElementProps.style;

		style = { ...str, ...obj2 };


		// console.log(saveElementProps);
		// console.log(attributes);

		assign( saveElementProps,
			{ style },
		);
	}

	return saveElementProps;

};

addFilter(
	'blocks.getSaveContent.extraProps',
	'lsx-blocks/extend-cover-block/add-extra-props-cover',
	addExtraPropsCover
);
