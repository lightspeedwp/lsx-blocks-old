/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { withState } = wp.compose;
const {
	FormToggle,
} = wp.components;

const DisableTitle = withState( { checked: false } )( ( { checked, setState } ) => (
	<FormToggle
		id={ 'lsx-page-title-disable' }
		label={ __( 'Disable', 'lsx-blocks' ) }
		checked={ checked }
		onChange={ () => setState( state => ( { checked: ! state.checked } ) ) }
	/>
) );

export default DisableTitle;
