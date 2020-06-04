/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { withState } = wp.compose;
const {
	FormToggle,
} = wp.components;

const {
	useCallback,
} = wp.element;
const {
	useSelect,
	useDispatch,
} = wp.data;

const DisableTitle = withState( { checked: false } )( ( { checked, setState } ) => {
	// Here we grab the custom field value from the db or the posted meta.
	const isDisabled = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_disable_title;
	}, [] );

	return (
		<FormToggle
			id={ 'lsx-page-title-disable' }
			label={ __( 'Disable', 'lsx-blocks' ) }
			value={ isDisabled }
			checked={ checked }
			onChange={ () => setState( state => ( { checked: ! state.checked } ) ) }
		/>
	);
} );

export default DisableTitle;
