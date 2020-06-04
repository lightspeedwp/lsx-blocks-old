/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const {
	TextControl,
} = wp.components;
const { useCallback } = wp.element;
const { useDispatch, useSelect } = wp.data;

const DisableTitle = () => {
	const isbn = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_disable_title;
	}, [] );

	const { editPost } = useDispatch( 'core/editor' );
	const onChangeIsbn = useCallback( ( value ) => {
		editPost( { meta: { lsx_disable_title: value } } );
	}, [ ] );

	return (
		<TextControl
			id={ 'lsx-page-title-disable' }
			name={ 'lsx_disable_title' }
			label={ __( 'Disable', 'lsx-blocks' ) }
			value={ isbn || '' }
			onChange={ onChangeIsbn }
		/>
	);
};

export default DisableTitle;
