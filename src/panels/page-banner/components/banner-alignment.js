/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const {
	AlignmentToolbar,
} = wp.editor;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const BannerAlignment = withState( {	alignment: 'center' } )( ( { option } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_banner_alignment;
	}, [] );

	// If you Custom field is not null then there is something saved in it.
	if ( '' !== rawChecked && undefined !== rawChecked ) {
		option = rawChecked;
	}

	const onChangeAlignment = ( updatedAlignment ) => {
		editPost( { meta: { lsx_banner_alignment: updatedAlignment } } );
	};

	return (
		<AlignmentToolbar
			value={ option }
			onChange={ onChangeAlignment }
		/>
	);
} );

export default BannerAlignment;
