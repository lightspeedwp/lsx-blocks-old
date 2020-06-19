/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const { Button } = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const {
	withState,
} = wp.compose;

const {
	useSelect,
	useDispatch,
} = wp.data;

const LSXImageUploadPanel = withState( { media: undefined } )( ( { media, setState } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	console.log('MEDIA');
	console.log(media);

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_banner_image;
	}, [] );

	// If you Custom field is not null then there is something saved in it.
	if ( '' === rawChecked || 'transparent' === rawChecked ) {
		media = undefined;
	} else {
		media = rawChecked;
	}

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={
					( mediaSelected ) => {
						if ( undefined !== mediaSelected ) {
							editPost( { meta: { lsx_banner_image: [ mediaSelected.id, mediaSelected.url ] } } );
						}
						return ( { mediaSelected } );
					}
				}
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				value={ media }
				render={ ( { open } ) => (
					<Button onClick={ open }>
						{ __( 'Select and Image', 'lsx-blocks' ) }
					</Button>
				) }
			/>
		</MediaUploadCheck>
	);
} );

export default LSXImageUploadPanel;
