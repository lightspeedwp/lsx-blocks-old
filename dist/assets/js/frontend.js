var LSX_BLOCKS = Object.create( null );
;( function( $, window, document, undefined ) {

    'use strict';

    LSX_BLOCKS.document = $(document);

    //Holds the slider function
    LSX_BLOCKS.sliders = Object.create( null );

    /**
     * Start the JS Class
     */
    LSX_BLOCKS.init = function() {
        LSX_BLOCKS.sliders.element = jQuery('.lsx-block-post-carousel .slick-slider');
        if ( 0 <  LSX_BLOCKS.sliders.element.length ) {
            LSX_BLOCKS.sliders.init();
        }
    };

    /**
     * Initiate the Sliders
     */
    LSX_BLOCKS.sliders.init = function( ) {
        LSX_BLOCKS.sliders.element.each( function() {

            var slidesToShow = 3;
            var slidesToScroll = 3;
            var slickData = $(this).attr('data-slick');
            if ( undefined !== slickData) {

                if ( undefined !== slickData.slidesToShow ) {
                    slidesToShow = slickData.slidesToShow;
                }
                if ( undefined !== slickData.slidesToScroll ) {
                    slidesToScroll = slickData.slidesToScroll;
                }
            }

            $(this).slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
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
                            slidesToShow: 2,
                            slidesToScroll: 2
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
        } );
	};

	//Adding Hover states for Core Button Block Extended
	LSX_BLOCKS.coreButton = function( ) {
		//Hover BG
		$( ".wp-block-button.has-hover-color a" ).each(function() {
			var prevbghover = this.style.backgroundColor;
			$(this).mouseenter(function() {
				var bghover = this.parentNode.getAttribute('bghover');
				$(this).css({"background-color": bghover, "background": bghover });
			});
			$(this).mouseleave(function() {
				$(this).css({ "background-color": prevbghover, "background": prevbghover });
			});

		});

		//Hover BG border
		$( ".wp-block-button.has-hover-color.is-style-outline a" ).each(function() {
			var prevbghover = this.style.backgroundColor;
			$(this).mouseenter(function() {
				var bghover = this.parentNode.getAttribute('bghover');
				$(this).css("border-color", bghover );
			});
			$(this).mouseleave(function() {
				$(this).css("border-color", prevbghover );
			});

		});

		//Hover text color
		$( ".wp-block-button.has-hover-text-color a" ).each(function() {
			var prevtexthover = this.style.color;
			$(this).mouseenter(function() {
				var texthover = this.parentNode.getAttribute('texthover');
				$(this).css("color", texthover );
			});
			$(this).mouseleave(function() {
				$(this).css("color", prevtexthover );
			});

		});

		//Hover shadow color
		$( ".wp-block-button.has-shadow-hover-color a" ).each(function() {
			var prevshadowhover = this.style.boxShadow;
			$(this).mouseenter(function() {
				var shadowhovercolor = this.parentNode.getAttribute('shadowhover');
				var shadowhover = shadowhovercolor + ' 2px 2px 0px 0px';
				$(this).css("box-shadow", shadowhover );
			});
			$(this).mouseleave(function() {
				$(this).css("box-shadow", prevshadowhover );
			});

		});

	};


    /**
     * On document ready.
     *
     * @package    lsx-blocks
     * @subpackage scripts
     */
    LSX_BLOCKS.document.ready( function() {
		LSX_BLOCKS.init();

		LSX_BLOCKS.coreButton();
    } );

} )( jQuery, window, document );
