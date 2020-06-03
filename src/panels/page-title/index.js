/**
 * Get registerPlugin.
 */
console.log( wp );
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

import DisableTitle from './components/disable-title';

const lsxPageTitlePanel = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx-page-title-panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			<DisableTitle />
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
