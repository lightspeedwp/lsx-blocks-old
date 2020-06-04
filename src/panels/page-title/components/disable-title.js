/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { withState } = wp.compose;
const {
	FormToggle,
} = wp.components;

const DisableTitle = withState( { checked: false } )( ( { checked, setState } ) => {

	return (
		<FormToggle
			id={ 'lsx-page-title-disable' }
			label={ __( 'Disable', 'lsx-blocks' ) }
			value={ 'yes' }
			checked={ checked }
			onClick={ () => setState( state => ( { checked: ! state.checked } ) ) }
		/>
	);
} );

export default DisableTitle;
