/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginPostStatusInfo } = wp.editPost;
const { useSelect, select } = wp.data;

import includes from "lodash/includes";
import DisableTitle from "./components/disable-title";

const lsxPageTitlePanel = () => {
	const postType = select("core/editor").getCurrentPostType();

	if (!includes(["post", "page"], postType)) {
		return null;
	}

	// Return the output of the Plugin Setting Panel.
	return (
		<PluginPostStatusInfo>
			<DisableTitle />
		</PluginPostStatusInfo>
	);
};

/**
 * register the plugin.
 */
registerPlugin("lsx-page-title-panel", {
	render: lsxPageTitlePanel,
	icon: false
});
