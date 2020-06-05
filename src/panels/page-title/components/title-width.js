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

const TitleWidth = withState( {	option: 'content' } )( ( { option, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_title_width;
	}, [] );

	// If you Custom field is not null then there is something saved in it.
	if ( '' !== rawChecked && undefined !== rawChecked ) {
		option = rawChecked;
	}
	return (
		<RadioControl
			selected={ option }
			options={ [
				{ label: __( 'Content', 'lsx-blocks' ), value: 'content' },
				{ label: __( 'Wide', 'lsx-blocks' ), value: 'wide' },
				{ label: __( 'Full', 'lsx-blocks' ), value: 'full' },
			] }
			onChange={ ( selected ) => setState( () => {
				editPost( { meta: { lsx_title_width: selected } } );
				return ( { selected } );
			} ) }
		/>
	);
} );

export default TitleWidth;
