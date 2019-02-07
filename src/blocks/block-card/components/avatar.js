/**
 * Avatar Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import icons from './icons';

// Import block components
const {
	MediaUpload,
} = wp.editor;

// Create an SocialIcons wrapper Component
export default class AvatarColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div class="lsx-card-column lsx-card-avatar-wrap">
				<div class="lsx-card-image-wrap">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
