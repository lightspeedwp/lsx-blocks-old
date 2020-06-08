/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const { PanelColorSettings } = wp.blockEditor;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const BackgroundColour = withState( {	color: undefined } )( ( { color, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_title_bg_colour;
	}, [] );

	// If you Custom field is not null then there is something saved in it.
	if ( '' === rawChecked || 'transparent' === rawChecked ) {
		color = undefined;
	} else {
		color = rawChecked;
	}

	return (
		<PanelColorSettings
			title={ __( 'Background Color' ) }
			initialOpen={ true }
			colorSettings={ [ {
				value: color,
				label: __( 'Background Color' ),
				onChange: ( selectedBgColour ) => {
					let saveValue = selectedBgColour;
					if ( undefined === selectedBgColour ) {
						saveValue = 'transparent';
					}
					editPost( { meta: { lsx_title_bg_colour: saveValue } } );
					return ( { selectedBgColour } );
				},
			} ] }
		/>
	);
} );

export default BackgroundColour;
