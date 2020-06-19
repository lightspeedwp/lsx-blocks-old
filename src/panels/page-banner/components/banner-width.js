/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const {
	BlockAlignmentToolbar,
} = wp.blockEditor;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const BannerWidth = withState( {	alignment: undefined } )( ( { option, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_banner_width;
	}, [] );

	// If you Custom field is not null then there is something saved in it.
	if ( '' === rawChecked || 'content' === rawChecked ) {
		option = undefined;
	} else {
		option = rawChecked;
	}

	const onChangeAlignment = ( updatedAlignment ) => {
		let saveValue = updatedAlignment;
		if ( undefined === updatedAlignment ) {
			saveValue = 'content';
		}
		editPost( { meta: { lsx_banner_width: saveValue } } );
	};

	const WIDE_CONTROLS = [ 'wide', 'full' ];

	return (
		<BlockAlignmentToolbar
			value={ option }
			onChange={ onChangeAlignment }
			controls={ WIDE_CONTROLS }
			wideControlsEnabled={ true }
		/>
	);
} );

export default BannerWidth;
