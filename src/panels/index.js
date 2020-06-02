/**
 * Get registerPlugin.
 */
console.log(wp);
console.log(wp.plugins);

var { registerPlugin } = wp.plugins;
var PluginDocumentSettingPanel = wp.editPost;

var PluginDocumentSettingPanelDemo = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'my-custom-panel' }
			title={ "Custom Panel Title" }
			className={ "my-awesome-class" }
		>
			My Document Setting Panel content
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx_page_title_demo', { render: PluginDocumentSettingPanelDemo } );
