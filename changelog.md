# Change log

## [1.3.3](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.3.3) - 2023-08-09

### Security
- General testing to ensure compatibility with latest WordPress version (6.3).

## [1.3.2](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.3.2) - 20-04-2023

### Added
- Added in the Block transformation for the LSX Container block to a Group Block.

### Security
- General testing to ensure compatibility with latest WordPress version (6.2).

## [1.3.1](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.3.1) - 27-05-2022

### Added
- Re added the LSX Container block to allow for page degrading.

## [1.3.0](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.3.0) - 25-05-2022

### Removed Blocks
- LSX Divider
- LSX Button
- LSX Banner
- LSX Container
- LSX Card Box
- LSX Call to Action
- LSX Author Block

### Security
- General testing to ensure compatibility with latest WordPress version (6.0).

## [1.2.4](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.2.4) - 25-04-2022

### Fixed
- A compatability error with Download Manager.
- Changed the "filetime()" references to the plugin version number.

### Security
- General testing to ensure compatibility with latest WordPress version (5.9.3).

## [1.2.3](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.2.3) - 11-10-2021

### Fixed

- PHP error with the static call to an LSX Sensei function. Causing the cart not to display.
- React Error when rendering the button group controls.

### Security
- General testing to ensure compatibility with latest WordPress version (5.8).

## [1.2.2](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.2.2) - 26-05-2021

### Fixed

- Fixed the Role selection for the LSX Team Block.
- Fixed the empty [category and tag error](https://github.com/lightspeeddevelopment/lsx-blocks/issues/149) with the LSX Post Carousel and LSX Grid Block.

### Security
- General testing to ensure compatibility with latest WordPress version (5.7).

## [1.2.1]

### Updated
- Documentation and support links.

### Removed
- The built in lazy loading support.

### Security
- General testing to ensure compatibility with latest WordPress version (5.6).

## [1.2.0]

### Added

- Added more styling and better layout for the Accordion block.
- Reducing the left and right Padding on LSX Buttons from 40px to 15px.
- A `lsx_blocks_latest_posts_carousel_meta` to allow you to filter the meta.
- Adding compatibility with WordPress 5.5.
- Added color options for the Team block.
- Added Cover Block inner width settings.
- Added a default cover block as a page title, which can be disabled.
- Added full width options to the buttons.
- Added more button block styles options.
- Added options for small and large button.
- Added min height and max width to the group block.
- Added options for categories and tgs for the Carousel and Grid posts blocks.

### Fixed

- Improvements on the container block.
- Improvements on the image block.
- Added more styling and better layout for the Accordion block.
- Allowing the Post Carousel to use a 1 column layout for the post carousel block.
- Changed the LSX Post Carousel "Carousel" to "Items per Slide".
- Fixed the hover issues for buttons.
- The Title and Banner editor block will only be for posts and pages.

### Deprecated

- Removing unused core blocks.

### Changed

- Removing the 'place-holdit' calls for placeholders on the post block and adding a default placeholder.

### Security

- Updating dependencies to prevent vulnerabilities.
- Updating PHPCS options for better code.
- General testing to ensure compatibility with latest WordPress version (5.5.1).
- General testing to ensure compatibility with latest LSX Theme version (2.9).

## [[1.1.2]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.1.2) - 2020-05-21

### Added

- Added spacing options for the columns default block.

### Security

- General testing to ensure compatibility with latest WordPress version (5.4.1).
- General testing to ensure compatibility with latest LSX Theme version (2.8).

## [[1.1.1]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.1.1) - 2020-04-03

### Fixed

- Fixing issue `Warning: Each child in a list should have a unique "key" prop.`.
- Fixing the Post Grid Block issue, where the post were not showing on the backend.
- Fixing the hover effect buttons for the Button Blocks.
- Fixing the group block extension that was breaking.

## [[1.1.0]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.1.0) - 2020-03-30

### Added

- Extended Gutenberg Core blocks with LSX attributes.
- Extended Core Heading block.
- Adding LSX block styles to Quote and Blockquote core blocks.
- Adding Team block that will be enabled if the LSX Team plugin is enabled.
- Adding a Testimonial Block that will be enabled if the LSX Testimonial plugin is enabled.
- Adding support for `post tags` to both the post grid and carousel blocks.
- Adding compatible classes for WordPress 5.4+.

### Fixed

- Fixing the loading error for the Grid Post block.

### Security

- LSX Blocks will be using the production version of React.

## [[1.0.5]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.5) - 2019-12-19

### Security

- General testing to ensure compatibility with latest WordPress version (5.3).
- Checking compatibility with LSX 2.6 release.

## [[1.0.4]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.4) - 2019-11-13

### Added

- Adding the Author profile block.

### Fixed

- Adding in CSS to format the Blog Post Carousel incase the JS fails to load.
- Fixing error "Trying to get property `post_content` of non-object".

## [[1.0.3]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.3) - 2019-10-30

### Fixed

- Making button text bold.
- Fixed the double size attribute causing the missing blog images.

## [[1.0.2]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.2) - 2019-09-27

### Added

- Adding the .gitattributes file to remove unnecessary files from the WordPress version.

### Fixed

- Adding the class `has-block-banner` only to pages or posts.

## [[1.0.0]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.1) - 2019-08-06

### Added

- Adding a class if the page is using the banner block for more customization.

### Changed

- Updating styles for block and post carrousel blocks to match the new LSX Blog customizer improvements.
- Changing enqueuing files priorities.

### Fixed

- Margin and spacing fixes.
- Accordion styles fixes for mobile.

## [[1.0.0]](https://github.com/lightspeeddevelopment/lsx-blocks/releases/tag/1.0.1)

### Added

- Initial Release
