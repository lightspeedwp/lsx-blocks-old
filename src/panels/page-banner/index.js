/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useSelect } = wp.data;

import DisableBanner from './components/disable-banner';
import BannerWidth from './components/banner-width';
import TextColour from './components/text-colour';
import BackgroundColour from './components/background-colour';

const lsxPageBannerPanel = () => {
	// Here we check what the post type is and if your panel should show.
	const postType = useSelect( select => select( 'core/editor' ).getCurrentPostType() );
	if ( 'post' !== postType && 'page' !== postType ) {
		return null;
	}

	// Return the output of the Plugin Setting Panel.
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx_page_banner_panel' }
			title={ __( 'Page Banner', 'lsx-blocks' ) }
			className={ 'lsx-page-banner-panel' }
		>
			<div className={ 'lsx-panel-row' }
			>
				<div className={ 'lsx-col-2' }
				>
					<DisableBanner />
				</div>
				<div className={ 'lsx-col-2' }
				>
					<BannerWidth />
				</div>
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
registerPlugin( 'lsx-page-banner-panel', { render: lsxPageBannerPanel, icon: false } );
