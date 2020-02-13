
const { __ } = wp.i18n;

const { addFilter } = wp.hooks;
addFilter(
	"blocks.registerBlockType",
	"lsx-blocks/extend-button-block",
	extendButtonBlock
);

function extendButtonBlock( settings, name ) {
	if ("core/button" === name ) {
		settings.title = __("Button Extended", "lsx-blocks" );
	}
	return settings;
}
