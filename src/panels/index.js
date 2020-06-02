/**
 * Get registerPlugin.
 */

const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

const lsxPageTitlePanel = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx-page-title-panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			My Document Setting Panel content
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
