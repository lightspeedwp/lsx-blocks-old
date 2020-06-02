/**
 * Get registerPlugin.
 */
const { registerPlugin } = wp.plugins;

import PluginDocumentSettingPanelDemo from './page-title';

const CombinedSlotFillsDemo = () => {
	return (
		<PluginDocumentSettingPanelDemo />
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'slotfill-and-filter-demos', { render: CombinedSlotFillsDemo } );
