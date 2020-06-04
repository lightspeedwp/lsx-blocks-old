/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const {
	RadioControl,
} = wp.components;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const TitleAlignment = withState( {	option: 'center' } )( ( { option, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_title_alignment;
	}, [] );
	// If you Custom field is not null then there is something saved in it.
	if ( '' !== rawChecked && undefined !== rawChecked ) {
		option = rawChecked;
	}
	return (
		<RadioControl
			selected={ option }
			options={ [
				{ label: __( 'Left', 'lsx-blocks' ), value: 'left' },
				{ label: __( 'Center', 'lsx-blocks' ), value: 'center' },
				{ label: __( 'Right', 'lsx-blocks' ), value: 'right' },
			] }
			onChange={ ( option ) => setState( selected => {
				editPost( { meta: { lsx_title_alignment: option } } );
				return ( { option } );
			} ) }
		/>
	);
} );

export default TitleAlignment;
