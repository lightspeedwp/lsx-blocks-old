const { TitlePanel } = wp.editPost;

const PluginDocumentSettingPanelDemo = () => {
	return (
		<TitlePanel
			name={ 'my-custom-panel' }
			title={ "Custom Panel Title" }
			className={ "my-awesome-class" }
		>
			My Document Setting Panel content
		</TitlePanel>
	);
};

export default PluginDocumentSettingPanelDemo;
