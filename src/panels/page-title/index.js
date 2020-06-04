/**
 * Get registerPlugin.
 */
console.log( wp );
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useSelect } = wp.data;

//import DisableTitle from './components/disable-text';
import DisableTitle from './components/disable-title';
//import MyDropdown from './components/drop-down';

const lsxPageTitlePanel = () => {
	// Here we check what the post type is and if your panel should show.
	const postType = useSelect( select => select( 'core/editor' ).getCurrentPostType() );
	if ( 'post' !== postType && 'page' !== postType ) {
		return null;
	}

	// Return the output of the Plugin Setting Panel.
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx_page_title_panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			<div>
				<DisableTitle />
			</div>
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
