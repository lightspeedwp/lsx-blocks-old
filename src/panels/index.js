/**
 * Get registerPlugin.
 */

const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
console.log( wp.editPost );

const lsxPageTitlePanel = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx-page-title-panel' }
			title={ "Page Title" }
			className={ "lsx-page-title-panel" }
		>
			My Document Setting Panel content
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel } );
