/**
 * Get registerPlugin.
 */
console.log( wp );
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

import DisableTitle from './components/disable-title';
import MyDropdown from './components/drop-down';

const lsxPageTitlePanel = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx-page-title-panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			<div>
				<DisableTitle />  { __( 'Disable', 'lsx-blocks' ) }
			</div>
			<div>
				<MyDropdown />
			</div>
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
