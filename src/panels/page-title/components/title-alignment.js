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

const TitleAlignment = withState( {	option: 'center' } )( ( { option, setState } ) => {
	return (
		<RadioControl
			selected={ option }
			options={ [
				{ label: __( 'Left', 'lsx-blocks' ), value: 'left' },
				{ label: __( 'Center', 'lsx-blocks' ), value: 'center' },
				{ label: __( 'Right', 'lsx-blocks' ), value: 'right' },
			] }
			onChange={ ( option ) => { setState( { option } ) } }
		/>
	);
} );

export default TitleAlignment;
