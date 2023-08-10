=== LSX Blocks ===
Contributors: feedmymedia, lightspeedwp, eleshar, krugazul, jacquesvdh, ignusvermaak, justinabes
Donate link: https://lsdev.biz/lsx/donate/
Tags: lsx, blocks, gutenberg, block editor, page builder, wordpress blocks
Requires at least: 5.0
Tested up to: 6.3
Requires PHP: 8.0
Stable tag: 1.3.3
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.en.html

This plugin extends the LSX Theme to support the latest block editor features.

== Description ==

We have built these content blocks so you can simply drag and drop them into your editor, configure to your wishes and you are done!

LSX Blocks is a collection of page building blocks for the new block editor. Building pages with the block editor and LSX Blocks gives you more control to quickly create and launch any kind of site you want!

Installing this plugin provides you with site-building blocks to help you customize page layouts, increase engagement, and get results for your business.

= LSX Blocks =

* Post Grid - [Block Demo](https://lsdev.biz/lsx/blocks/post-grid-block/)
* Post Carousel Block - [Block Demo](https://lsdev.biz/lsx/blocks/post-carousel-block/)
* Accordion Block - [Block Demo](https://lsdev.biz/lsx/blocks/accordion-block/)
* Testimonials Block - [Block Demo](https://lsdev.biz/lsx/blocks/testimonial-block/)
* Team Block - [Block Demo](https://lsdev.biz/lsx/blocks/team-block/)

= WordPress Core Blocks extended via LSX Blocks =

* Buttons Block
* Columns Block
* Headings Profile Block
* Cover Block
* Group Block
* Image block
* Pullquote block

= Yoast SEO Compatibility =
If you’re using the Yoast SEO plugin the LSX Blocks plugin adds LSX compatibility for the Yoast FAQ and How To blocks.

= Support =

Contact the [LightSpeed](https://lsdev.biz/) for assistance via the [LSX support form](https://www.lsdev.biz/lsx/support/).

If you are experiencing issues with the LSX Blocks Plugin, please log any bug issues you are having on the [Github Issues](https://github.com/lightspeeddevelopment/lsx-blocks/issues/) page.

= Contributing to the LSX Blocks plugin =

If you're a developer who's spotted a bug issue and have a fix, or simply have functionality you think would extend our core plugin, we are always happy to accept your contribution! Visit the [LSX Blocks Plugin on Github](https://github.com/lightspeeddevelopment/lsx-blocks/) and submit a Pull Request with your updates.

= Documentation =

Looking for more information on setting up your individual blocks? Check out our [Block Documentation](https://lsdev.biz/lsx/documentation/blocks/) for a full breakdown on using the blocks.

= Support =

If you are experiencing issues with the LSX Tour Operator Plugin, please log any bug issues you are having on the [Tour Operator Github Issues](https://github.com/lightspeeddevelopment/lsx-blocks/issues/) page.

= Contributing =

If you're a developer who's spotted a bug issue and have a fix, or simply have functionality you think would extend our plugin, we are always happy to accept your contribution! Visit the [Tour Operator Plugin on Github](https://github.com/lightspeeddevelopment/lsx-blocks/) and submit a Pull Request with your updates.

== Installation ==

= Installation from WordPress admin dashboard: =

* Log into your WordPress admin panel and go to *Plugins > Add new*.
* Enter *LSX Blocks* into the search field.
* Click *Install Now* when you find the plugin
* Click *Activate* once the installation is complete

= Download from WordPress.org:=

*Go to the [plugin page](https://wordpress.org/plugins/lsx-blocks/) or use this [direct download link](https://downloads.wordpress.org/plugin/lsx-blocks.zip).
*Click the *Download* button to download the zip file.
*Log into your WordPress admin dashboard and go to *Plugins > Add new*.
*Then click *Upload* plugin.
*Choose the zip file and click *Install now*.
*After installation is successful click *Activate* plugin.

== Frequently Asked Questions ==
= Do I have to use the LSX theme with this plugin?
Yes, this plugin is designed specifically for LSX theme, and has not been tested with other themes.

= Is this plugin free? =
We believe in open source – that’s why the LSX Blocks plugin is free, and that won’t change. This plugin is actively maintained and updated.

= I’ve installed this plugin, what is the next step? =
Login to your WordPress dashboard, and create a new post or page.  Click the plus sign to add a block, and search for lsx to find the LSX Blocks that you can use now.

= Do I need to use Separator blocks to build my pages with LSX Blocks?
This is not necessary as the Group and Cover blocks have controls for internal padding and margins.

= How can I control the width of a block? =
If a block (like the post grid or carousel) is in a container, it will take the width of the container itself.  If these blocks are outside of a container, they will take the width that is assigned to that block.  Blocks that don't have width options (like the shortcode block) will take the width of the container block.  If these blocks are outside of a container, they will take the width that is assigned to that block.

= Why are my custom font sizes not working as expected for headings and paragraph blocks? =
If you use the group block with a heading and a paragraph inside, and select the block style 'lsx subheading' the font sizes of this style will override the set custom sizes.

= I’m struggling to get the layout I desire, what am I doing wrong? =
Avoid nesting too many groups or cover blocks if possible.

== Screenshots ==

1. Team block
2. Testimonials block
3. Accordion block
4. Blog post carousel block
5. Blog post grid block

== Changelog ==

Full changelog found on [Github](https://github.com/lightspeeddevelopment/lsx-blocks/blob/master/changelog.md)

[1.2.0]
*Added*
Added more styling and better layout for the Accordion block.
Reducing the left and right Padding on LSX Buttons from 40px to 15px.
A lsx_blocks_latest_posts_carousel_meta to allow you to filter the meta.
Adding compatibility with WordPress 5.5.
Added color options for the Team block.
Added Cover Block inner width settings.
Added a default cover block as a page title, which can be disabled.
Added full width options to the buttons.
Added more button block styles options.
Added options for small and large button.
Added min height and max width to the group block.
Added options for categories and tgs for the Carousel and Grid posts blocks.
*Fixed*
Improvements on the container block.
Improvements on the image block.
Added more styling and better layout for the Accordion block.
Allowing the Post Carousel to use a 1 column layout for the post carousel block.
Changed the LSX Post Carousel "Carousel" to "Items per Slide".
Fixed the hover issues for buttons.
The Title and Banner editor block will only be for posts and pages.
*Deprecated*
Removing unused core blocks.
*Changed*
Removing the 'place-holdit' calls for placeholders on the post block and adding a default placeholder.
*Security*
Updating dependencies to prevent vulnerabilities.
Updating PHPCS options for better code.
General testing to ensure compatibility with latest WordPress version (5.5.1).
General testing to ensure compatibility with latest LSX Theme version (2.9).
