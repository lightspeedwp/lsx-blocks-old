/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const {
	FormToggle,
} = wp.components;

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const DisableBanner = withState( { checked: false } )( ( { checked, setState } ) => {
	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_disable_banner;
	}, [] );

	// Next lets map our yes / no to a true / false.
	if ( 'yes' !== rawChecked ) {
		checked = false;
	} else {
		checked = true;
	}

	const { editPost } = useDispatch( 'core/editor' );

	return (
		<FormToggle
			id={ 'lsx-page-banner-disable' }
			help={ __( 'Stop the banner from showing, you will need to add it manually.', 'lsx-blocks' ) }
			value={ 'yes' }
			checked={ checked }
			onChange={ () => setState( state => {
				let disabled = 'no';
				if ( false === state.checked ) {
					disabled = 'yes';
				}
				editPost( { meta: { lsx_disable_banner: disabled } } );
				return ( { checked: ! state.checked } );
			} ) }
		/>
	);
} );

export default DisableBanner;