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

const TitlePosition = withState( {	option: 'in-banner' } )( ( { option, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_title_position;
	}, [] );
	console.log( 'alignment 3 ' + rawChecked );

	// If you Custom field is not null then there is something saved in it.
	if ( '' !== rawChecked && undefined !== rawChecked ) {
		option = rawChecked;
	} else {
		option = 'in-banner';
	}
	return (
		<RadioControl
			selected={ option }
			options={ [
				{ value: __( 'in-banner', 'lsx-blocks' ), label: __( 'In Hero Banner', 'lsx-blocks' ) },
				{ value: __( 'below-banner', 'lsx-blocks' ), label: __( 'Below Hero Banner', 'lsx-blocks' ) },
			] }
			onChange={ ( selected ) => setState( () => {
				editPost( { meta: { lsx_title_position: selected } } );
				return ( { selected } );
			} ) }
		/>
	);
} );

export default TitlePosition;