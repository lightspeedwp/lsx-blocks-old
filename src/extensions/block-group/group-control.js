// Import CSS
import './styles/style.scss';

import assign from 'lodash.assign';

const { __ } = wp.i18n;

const { addFilter } = wp.hooks;

//const { registerBlockStyle } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, TextControl } = wp.components;

// Enable spacing control on the following blocks
const enableCustomGroup = [
	'core/group',
];

/**
 * Add the attributes to the group
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function addGroupControlAttributes ( settings, name ) {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomGroup.includes( name ) ) {
		return settings;
	}
	settings.attributes = assign( settings.attributes, {
		groupPaddingTop: {
			type: 'string',
		},
		groupPaddingBottom: {
			type: 'string',
		},
		groupPaddingLeft: {
			type: 'string',
		},
		groupPaddingRight: {
			type: 'string',
		},
		groupMarginTop: {
			type: 'number',
		},
		groupMarginBottom: {
			type: 'number',
		},
		groupMarginLeft: {
			type: 'number',
		},
		groupMarginRight: {
			type: 'number',
		},
	} );

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'lsx-blocks/extend-group-block/group-control-attribute',
	addGroupControlAttributes
);

/**
 * Create the Margin and Padding controls on the inspector controls of block.
 */
const groupSettingsControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableCustomGroup.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { groupPaddingTop, groupPaddingBottom, groupPaddingLeft, groupPaddingRight, groupMarginTop, groupMarginBottom, groupMarginLeft, groupMarginRight } = props.attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Additional LSX Settings' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Group Padding Top' ) }
							value={ groupPaddingTop }
							onChange={ ( value ) => props.setAttributes( { groupPaddingTop: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Padding Bottom' ) }
							value={ groupPaddingBottom }
							onChange={ ( value ) => props.setAttributes( { groupPaddingBottom: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Padding Left' ) }
							value={ groupPaddingLeft }
							onChange={ ( value ) => props.setAttributes( { groupPaddingLeft: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Padding Right' ) }
							value={ groupPaddingRight }
							onChange={ ( value ) => props.setAttributes( { groupPaddingRight: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Margin Top' ) }
							value={ groupMarginTop }
							onChange={ ( value ) => props.setAttributes( { groupMarginTop: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Margin Bottom' ) }
							value={ groupMarginBottom }
							onChange={ ( value ) => props.setAttributes( { groupMarginBottom: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Margin Left' ) }
							value={ groupMarginLeft }
							onChange={ ( value ) => props.setAttributes( { groupMarginLeft: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Group Margin Right' ) }
							value={ groupMarginRight }
							onChange={ ( value ) => props.setAttributes( { groupMarginRight: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'groupSettingsControl' );

addFilter(
	'editor.BlockEdit',
	'lsx-blocks/extend-group-block/group-settings-control',
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
const addExtraPropsGroup = ( saveElementProps, blockType, attributes ) => {

	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomGroup.includes( blockType.name ) ) {
		return saveElementProps;
	}

	if ( blockType.name === 'core/group' ) {

		assign( saveElementProps,
			{ style: {
				'paddingTop': attributes.groupPaddingTop,
				'paddingBottom': attributes.groupPaddingBottom,
				'paddingLeft': attributes.groupPaddingLeft,
				'paddingRight': attributes.groupPaddingRight,
				'marginTop': attributes.groupMarginTop,
				'marginBottom': attributes.groupMarginBottom,
				'marginLeft': attributes.groupMarginLeft,
				'marginRight': attributes.groupMarginRight,
			}}
		);
	}

	return saveElementProps;

};

addFilter(
	'blocks.getSaveContent.extraProps',
	'lsx-blocks/extend-group-block/add-extra-props-group',
	addExtraPropsGroup
);
