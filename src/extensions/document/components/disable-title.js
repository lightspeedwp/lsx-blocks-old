/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;

const { FormToggle } = wp.components;

const { withState } = wp.compose;

const { useSelect, useDispatch } = wp.data;

const DisableTitle = withState({ checked: "no" })(({ checked, setState }) => {
	// Lets get the initial State of the toggle from the custom field / autosaves.
	const rawChecked = useSelect(select => {
		return select("core/editor").getEditedPostAttribute("meta")
			.lsx_disable_title;
	}, []);

	const postType = useSelect(select => {
		return select("core/editor").getCurrentPostType();
	}, []);

	// If its a post, the title is enabled, else its a page, then its disabled.
	if ("post" === postType) {
		checked = false;
	} else {
		checked = true;
	}

	//console.log( lsx_globals );

	// Next lets map our yes / no to a true / false.
	if (0 !== rawChecked && "0" !== rawChecked) {
		if ("yes" !== rawChecked) {
			checked = false;
		} else {
			checked = true;
		}
	}

	const { editPost } = useDispatch("core/editor");
	//console.log(checked);
	return (
		<div className={"lsx-panel-row"}>
			<FormToggle
				id={"lsx-page-title-disable"}
				help={__(
					"Stop the title from showing, you will need to add it manually.",
					"lsx-blocks"
				)}
				value={"yes"}
				checked={checked}
				onChange={() =>
					setState(state => {
						let disabled = "no";
						if (false === state.checked) {
							disabled = "yes";
						}
						editPost({ meta: { lsx_disable_title: disabled } });
						return { checked: !state.checked };
					})
				}
			/>
			<label
				className={"lsx-page-title-label"}
				htmlFor="hide-page-title-toggle"
			>
				{__("Hide page title", "lsx-blocks")}
			</label>
		</div>
	);
});

export default DisableTitle;
