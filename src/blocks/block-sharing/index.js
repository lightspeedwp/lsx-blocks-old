/**
 * BLOCK: LSX Blocks Sharing
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import ShareLinks from './components/sharing';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

// Register the block
registerBlockType( 'lsx-blocks/lsx-sharing', {
	title: __( 'LSX Sharing', 'lsx-blocks' ),
	description: __( 'Add sharing buttons to your posts and pages.', 'lsx-blocks' ),
	icon: 'admin-links',
	category: 'lsx-blocks',
	keywords: [
		__( 'sharing', 'lsx-blocks' ),
		__( 'social', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],

	// Render the block components
	edit: props => {

		// Setup the props
		const {
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = props;

		const {
			twitter,
			facebook,
			google,
			linkedin,
			pinterest,
			email,
			reddit,
			shareAlignment,
			shareButtonStyle,
			shareButtonShape,
			shareButtonColor,
		} = props.attributes;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ shareAlignment }
					onChange={ ( value ) => {
						setAttributes( { shareAlignment: value } );
					} }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...props }
			/>,
			// Show the button markup in the editor
			<ShareLinks { ...props }>
				<ul className="lsx-share-list">
				{ twitter &&
					<li>
						<a className='lsx-share-twitter'>
							<i className="fab fa-twitter"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on Twitter', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ facebook &&
					<li>
						<a className='lsx-share-facebook'>
							<i className="fab fa-facebook-f"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on Facebook', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ google &&
					<li>
						<a className='lsx-share-google'>
							<i className="fab fa-google"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on Google', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ pinterest &&
					<li>
						<a className='lsx-share-pinterest'>
							<i className="fab fa-pinterest-p"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on Pinterest', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ linkedin &&
					<li>
						<a className='lsx-share-linkedin'>
							<i className="fab fa-linkedin"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on LinkedIn', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ reddit &&
					<li>
						<a className='lsx-share-reddit'>
							<i className="fab fa-reddit-alien"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share on reddit', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ email &&
					<li>
						<a className='lsx-share-email'>
							<i className="fas fa-envelope"></i>
							<span className={ 'lsx-social-text' }>
								{ __( 'Share via Email', 'lsx-blocks' ) }
							</span>
						</a>
					</li>
				}
				</ul>
			</ShareLinks>
		];
	},

	// Render via PHP
	save() {
		return null;
	},
} );
