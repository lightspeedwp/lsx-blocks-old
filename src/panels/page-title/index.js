/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

import DisableTitle from './components/disable-title';
import TitleAlignment from './components/title-alignment';
import TitleWidth from './components/title-width';
import TitlePosition from './components/title-position';
import TextColour from './components/text-colour';
import BackgroundColour from './components/background-colour';

const lsxPageTitlePanel = () => {
	// Return the output of the Plugin Setting Panel.
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx_page_title_panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			<div className={ 'lsx-panel-row' }
			>
				<div className={ 'lsx-col-3' }
				>
					<DisableTitle />
				</div>
				<div className={ 'lsx-col-3' }
				>
					<TitleAlignment />
				</div>
				<div className={ 'lsx-col-3' }
				>
					<TitleWidth />
				</div>
			</div>
			<div className={ 'lsx-panel-row is-list' }
			>
				<TitlePosition />
			</div>
			<div className={ 'lsx-panel-row background-colour' }
			>
				<TextColour />
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
