/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const {
	ColorPicker,
} = wp.components;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const BackgroundColour = withState( {	color: '#000' } )( ( { color, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	/*const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_title_bg_colour;
	}, [] );
	// If you Custom field is not null then there is something saved in it.
	if ( '' !== rawChecked && undefined !== rawChecked ) {
		color = rawChecked;
	}*/
	console.log( color );
	return (
		<ColorPicker
			color={ color }
			onClick={ ( value ) => setState( () => {
				console.log( value );
				editPost( { meta: { lsx_title_bg_colour: value.hex } } );
				return ( { value } );
			} ) }
		/>
	);
} );

export default BackgroundColour;
