/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
  PanelColorSettings,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;

// Import Inspector components
const {
	Toolbar,
	PanelBody,
	PanelRow,
	FormToggle,
	RangeControl,
	SelectControl,
	ToggleControl,
	Button,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerMaxWidth, containerBackgroundColor, containerDimRatio, bgPosition, bgFit, bgPositionMobile, bgFitMobile, containerImgURL, containerImgID, containerImgIDMobile, containerImgAltMobile, containerImgAlt, media, contMobURL, contMobHasImg } = this.props.attributes;
		const { setAttributes, isSelected } = this.props;

		const onSelectImageMobile = media => {
			setAttributes( {
				containerImgIDMobile: media.id,
				contMobURL: media.url,
				containerImgAltMobile: media.alt,
				contMobHasImg : true,
			} );
		};

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			} );
		};

		const onRemoveImageMobile = () => {
			setAttributes( {
				containerImgIDMobile: null,
				contMobURL: null,
				containerImgAltMobile: null,
				contMobHasImg : false,
			} );
		};

		const bgPositionOptions = [
			{ value: 'lsx-container-left-top', label: __( 'Left Top' ) },
			{ value: 'lsx-container-left-center', label: __( 'Left Center' ) },
			{ value: 'lsx-container-left-bottom', label: __( 'Left Bottom' ) },
			{ value: 'lsx-container-center-top', label: __( 'Center Top' ) },
			{ value: 'lsx-container-center-center', label: __( 'Center Center' ) },
			{ value: 'lsx-container-center-bottom', label: __( 'Center Bottom' ) },
            { value: 'lsx-container-right-top', label: __( 'Right Top' ) },
            { value: 'lsx-container-right-center', label: __( 'Right Center' ) },
            { value: 'lsx-container-right-bottom', label: __( 'Right Bottom' ) },
            { value: 'lsx-container-parallax', label: __( 'Parallax' ) },
            { value: 'lsx-container-initial', label: __( 'Clear' ) },
		];

		const bgPositionOptionsMobile = [
			{ value: 'center', label: __( 'Center' ) },
			{ value: 'left top', label: __( 'Left Top' ) },
			{ value: 'left bottom', label: __( 'Left Center' ) },
			{ value: 'center top', label: __( 'Left Bottom' ) },
			{ value: 'center top', label: __( 'Center Top' ) },
			{ value: 'center bottom', label: __( 'Center Bottom' ) },
            { value: 'right top', label: __( 'Right Top' ) },
            { value: 'right center', label: __( 'Right Center' ) },
            { value: 'right bottom', label: __( 'Right Bottom' ) },
		];

		const bgFitOptions = [
			{ value: 'lsx-container-fit', label: __( 'Original Size' ) },
			{ value: '', label: __( 'Fit to Container' ) },
		];

		const bgFitOptionsMobile = [
			{ value: 'contain', label: __( 'Contain' ) },
			{ value: 'cover', label: __( 'Cover' ) },
		];

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { containerBackgroundColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Container Options' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Padding Top (%)' ) }
						value={ containerPaddingTop }
						onChange={ ( value ) => this.props.setAttributes( { containerPaddingTop: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Bottom (%)' ) }
						value={ containerPaddingBottom }
						onChange={ ( value ) => this.props.setAttributes( { containerPaddingBottom: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Left (%)' ) }
						value={ containerPaddingLeft }
						onChange={ ( value ) => this.props.setAttributes( { containerPaddingLeft: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Right (%)' ) }
						value={ containerPaddingRight }
						onChange={ ( value ) => this.props.setAttributes( { containerPaddingRight: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Margin Top (%)' ) }
						value={ containerMarginTop }
						onChange={ ( value ) => this.props.setAttributes( { containerMarginTop: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>

					<RangeControl
						label={ __( 'Margin Bottom (%)' ) }
						value={ containerMarginBottom }
						onChange={ ( value ) => this.props.setAttributes( { containerMarginBottom: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Inside Container Max Width (px)' ) }
						value={ containerMaxWidth }
						onChange={ ( value ) => this.props.setAttributes( { containerMaxWidth: value } ) }
						min={ 500 }
						max={ 1600 }
						step={ 1 }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Options' ) } initialOpen={ true }>
					<p>{ __( 'Select a background image for desktop:' ) }</p>
					{ ! containerImgID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ containerImgID }
							render={ ( { open } ) => (
								<Button
									className="lsx-container-inspector-media"
									label={ __( 'Edit image' ) }
									icon="format-image"
									onClick={ open }
								>
									{ __( 'Select Image' ) }
								</Button>
							) }
						>
						</MediaUpload>
					</MediaUploadCheck>
					) : (
					<p className="image-wrapper">
						<img
							src={ containerImgURL }
							alt={ containerImgAlt }
						/>
						{ isSelected ? (
							<Button
								className="lsx-container-inspector-media"
								label={ __( 'Remove Image' ) }
								icon="dismiss"
								onClick={ onRemoveImage }
							>
								{ __( 'Remove Image' ) }
							</Button>

						) : null }
					</p>
					)}
					{ containerImgURL && !! containerImgURL.length && (
						<RangeControl
							label={ __( 'Image Opacity' ) }
							value={ containerDimRatio }
							onChange={ ( value ) => this.props.setAttributes( { containerDimRatio: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
					) }
					{ containerImgURL && !! containerImgURL.length && (
						<SelectControl
							label={ __( 'Background Position' ) }
							options={ bgPositionOptions }
							value={ bgPosition }
							onChange={ ( value ) => setAttributes( { bgPosition: value } ) }
						/>
					) }
					{ containerImgURL && !! containerImgURL.length && (
						<SelectControl
							label={ __( 'Background Fit' ) }
							options={ bgFitOptions }
							value={ bgFit }
							onChange={ ( value ) => setAttributes( { bgFit: value } ) }
						/>
					) }
					<PanelColorSettings
						title={ __( 'Background Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: containerBackgroundColor,
							label: __( 'Background Color' ),
							onChange: onChangeBackgroundColor,
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>
				{ containerImgID &&
					<PanelBody title={ __( 'Mobile Background Options' ) } initialOpen={ true }>
						<p>{ __( 'Select a background image for mobile:' ) }</p>
						{ ! containerImgIDMobile ? (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectImageMobile }
								type="image"
								value={ containerImgIDMobile }
								render={ ( { open } ) => (
									<Button
										className="lsx-container-inspector-media"
										label={ __( 'Edit Mobile image' ) }
										icon="format-image"
										onClick={ open }
									>
										{ __( 'Select Mobile Image' ) }
									</Button>
								) }
							>
							</MediaUpload>
						</MediaUploadCheck>
						) : (
						<p className="image-wrapper-mob">
							<img
								src={ contMobURL }
								alt={ containerImgAltMobile }
							/>
							{ isSelected ? (
								<Button
									className="lsx-container-inspector-media"
									label={ __( 'Remove Mobile Image' ) }
									icon="dismiss"
									onClick={ onRemoveImageMobile }
								>
									{ __( 'Remove Mobile Image' ) }
								</Button>

							) : null }
						</p>
						)}
						{ contMobURL && !! contMobURL.length && (
							<SelectControl
								label={ __( 'Mobile Background Position' ) }
								options={ bgPositionOptionsMobile }
								value={ bgPositionMobile }
								onChange={ ( value ) => setAttributes( { bgPositionMobile: value } ) }
							/>
						) }
						{ contMobURL && !! contMobURL.length && (
							<SelectControl
								label={ __( 'Mobile Background Size' ) }
								options={ bgFitOptionsMobile }
								value={ bgFitMobile }
								onChange={ ( value ) => setAttributes( { bgFitMobile: value } ) }
							/>
						) }
					</PanelBody>
				}

			</InspectorControls>
		);
	}
}
