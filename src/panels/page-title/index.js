/**
 * Get registerPlugin.
 */
console.log( wp );
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

const { withState } = wp.compose;

const {
	FormToggle,
	Radio,
	RadioGroup,
} = wp.components;

const {
	useState,
} = wp.element;

const DisableTitle = withState( { checked: false } )( ( { checked, setState } ) => (
	<FormToggle
		id={ 'lsx-page-title-disable' }
		label={ __( 'Disable', 'lsx-blocks' ) }
		checked={ checked }
		onChange={ () => setState( state => ( { checked: ! state.checked } ) ) }
	/>
) );

const TitleAlignment = () => {
	const [ checked, setChecked ] = useState( '25' );
	return (
		<RadioGroup accessibilityLabel="Width" onChange={ setChecked } checked={ checked }>
			<Radio value="25">25%</Radio>
			<Radio value="50">50%</Radio>
			<Radio value="75">75%</Radio>
			<Radio value="100">100%</Radio>
		</RadioGroup>
	);
};

const lsxPageTitlePanel = () => {
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx-page-title-panel' }
			title={ __( 'Page Title', 'lsx-blocks' ) }
			className={ 'lsx-page-title-panel' }
		>
			<DisableTitle />
			<TitleAlignment />
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-page-title-panel', { render: lsxPageTitlePanel, icon: false } );
