/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useSelect } = wp.data;

//import DisableTitle from './components/disable-text';
import DisableTitle from './components/disable-title';
import TitleAlignment from './components/title-alignment';
import TitleWidth from './components/title-width';
import BackgroundColour from './components/background-colour';

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
			<div className={ 'lsx-panel-row' }
			>
				<DisableTitle /> { __( 'Disable', 'lsx-blocks' ) }
			</div>
			<div className={ 'lsx-panel-row' }
			>
				{ __( 'Alignment', 'lsx-blocks' ) }
				<TitleAlignment />
			</div>
			<div className={ 'lsx-panel-row' }
			>
				{ __( 'Width', 'lsx-blocks' ) }
				<TitleWidth />
			</div>
			<div className={ 'lsx-panel-row background-colour' }
			>
				<BackgroundColour />
			</div>
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
