
( function( wp ) {
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editPost.PluginSidebar;
    var el = wp.element.createElement;
    var Text = wp.components.TextControl;
    var withSelect = wp.data.withSelect;
 
    var mapSelectToProps = function( select ) {
        return {
            metaFieldValue: select( 'core/editor' )
                .getEditedPostAttribute( 'meta' )
                [ 'sidebar_plugin_meta_block_field' ]
        }
    }
 
    var MetaBlockField = function( props ) {
        return el( Text, {
            label: 'Meta Block Field',
            value: props.metaFieldValue,
            onChange: function( content ) {
                console.log( 'content has changed to ', content );
            },
        } );
    }
 
    var MetaBlockFieldWithData = withSelect( mapSelectToProps )( MetaBlockField );
 
    registerPlugin( 'my-plugin-sidebar', {
        render: function() {
            return el( PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'admin-post',
                    title: 'My plugin sidebar',
                },
                el( 'div',
                    { className: 'plugin-sidebar-content' },
                    el( MetaBlockFieldWithData )
                )
            );
        }
    } );
} )( window.wp );