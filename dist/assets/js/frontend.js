/* eslint-disable wrap-iife */
const LSX_BLOCKS = Object.create(null);
(function($, window, document, undefined) {
	"use strict";

	LSX_BLOCKS.document = $(document);
	LSX_BLOCKS.window = $(window);

	//Holds the slider function
	LSX_BLOCKS.sliders = Object.create(null);

	/**
	 * Start the JS Class
	 */
	LSX_BLOCKS.init = function() {
		if ($.isFunction($.fn.slick)) {
			LSX_BLOCKS.sliders.element = jQuery(
				".lsx-block-post-carousel .slick-slider"
			);
			if (0 < LSX_BLOCKS.sliders.element.length) {
				LSX_BLOCKS.sliders.init();
			}
		}
	};

	/**
	 * Initiate the Sliders
	 */
	LSX_BLOCKS.sliders.init = function() {
		LSX_BLOCKS.sliders.element.each(function() {
			let slidesToShow = 3;
			let slidesToScroll = 3;
			let mediumSlidesToShow = 2;
			let mediumSlidesToScroll = 2;
			let slickData = $(this).attr("data-slick");

			if (undefined !== slickData) {
				slickData = JSON.parse(slickData);
				if (undefined !== slickData.slidesToShow) {
					slidesToShow = slickData.slidesToShow;
					if (1 === slidesToShow) {
						mediumSlidesToShow = slidesToShow;
					}
				}
				if (undefined !== slickData.slidesToScroll) {
					slidesToScroll = slickData.slidesToScroll;
					if (1 === slidesToScroll) {
						mediumSlidesToScroll = slidesToScroll;
					}
				}
			}

			$(this).slick({
				dots: true,
				infinite: false,
				speed: 300,
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToScroll,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: slidesToShow,
							slidesToScroll: slidesToScroll,
							infinite: true,
							dots: true
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: mediumSlidesToShow,
							slidesToScroll: mediumSlidesToScroll
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		});
	};

	//Adding Hover states for Core Button Block Extended
	LSX_BLOCKS.coreButtonHover = function() {
		$(".wp-block-button").each(function() {
			const prevbghover = $(this)
				.children()
				.css("backgroundColor");
			const prevbggradienthover = $(this)
				.children()
				.css("background");
			const prevtexthover = $(this)
				.children()
				.css("color");
			const prevshadowhover = $(this)
				.children()
				.css("boxShadow");

			if ($(this).is('[class*="has-hover-color-"]')) {
				var thisclass = $(this).attr("class");
				var hoverColorClass = thisclass
					.split("has-hover-color-#")
					.pop()
					.substring(0, 6);
				$(this).mouseover(function() {
					$(this)
						.children()
						.css("background-color", "#" + hoverColorClass);
					$(this)
						.children()
						.css("background", "#" + hoverColorClass);
				});
				$(this).mouseout(function() {
					$(this)
						.children()
						.css("background-color", prevbghover);
					$(this)
						.children()
						.css("background", prevbggradienthover);
				});
			}
			if ($(this).is('[class*="has-hover-text-color-"]')) {
				var thisclass = $(this).attr("class");
				var textColorClass = thisclass
					.split("has-hover-text-color-#")
					.pop()
					.substring(0, 6);
				$(this).mouseover(function() {
					$(this)
						.children()
						.css("color", "#" + textColorClass);
				});
				$(this).mouseout(function() {
					$(this)
						.children()
						.css("color", prevtexthover);
				});
			}
			if ($(this).is('[class*="has-shadow-hover-color-"]')) {
				var thisclass = $(this).attr("class");
				var shadowColorClass = thisclass
					.split("has-shadow-hover-color-#")
					.pop()
					.substring(0, 6);
				$(this).mouseover(function() {
					$(this)
						.children()
						.css("box-shadow", "#" + shadowColorClass + " 2px 2px 0px 0px");
				});
				$(this).mouseout(function() {
					$(this)
						.children()
						.css("box-shadow", prevshadowhover);
				});
			}
		});
	};

	//Adding Hover states for Core Button Block Extended
	LSX_BLOCKS.coreButton = function() {
		$(".wp-block-button a").each(function() {
			//if btn is gradient
			$('[class$="gradient-background"]').addClass("btn-has-gradient");

			//if btn is outline
			if (
				$(this)
					.parent()
					.hasClass("is-style-outline")
			) {
				$(this).addClass("btn-has-outline");
			}
			//if btn is outline
			if (
				$(this)
					.parent()
					.hasClass("has-shadow-hover-color")
			) {
				$(this).addClass("btn-has-shadow-hover");
			}
		});
	};

	/**
	 * On document ready.
	 *
	 * @package    lsx-blocks
	 * @subpackage scripts
	 */
	LSX_BLOCKS.document.ready(function() {
		LSX_BLOCKS.init();

		LSX_BLOCKS.coreButton();
		LSX_BLOCKS.coreButtonHover();
	});
})(jQuery, window, document);
