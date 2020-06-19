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

	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect( select => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).lsx_banner_image;
	}, [] );

	let displayCss = true;
	let uploadCss = false;
	let url = '';

	// If you Custom field is not null then there is something saved in it.
	if ( '' === rawChecked || 'transparent' === rawChecked || undefined === rawChecked ) {
		media = undefined;
	} else {
		let rawCheckedArray = rawChecked.split( '|' );
		media = rawCheckedArray[0];
		url = rawCheckedArray[1];
		displayCss = false;
		uploadCss = true;
	}

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={
					( mediaSelected ) => {
						if ( undefined !== mediaSelected ) {
							let saveValue = mediaSelected.id + '|' + mediaSelected.url;
							editPost( { meta: { lsx_banner_image: saveValue } } );
							console.log(saveValue);
						}
						return ( { mediaSelected } );
					}
				}
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				value={ media }
				render={ ( { open } ) => (
					<Button hidden={ uploadCss } onClick={ open }>
						{ __( 'Select an image', 'lsx-blocks' ) }
					</Button>
				) }
			/>
			<p hidden={ displayCss }>
				<img src={ url } alt={ __( 'Banner Preview', 'lsx-blocks' ) } ></img>
			</p>
		</MediaUploadCheck>
	);
} );

export default LSXImageUploadPanel;
