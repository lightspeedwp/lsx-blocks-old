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

		$( ".wp-block-button a" ).each( function() {
			//if btn is gradient
			$('[class$="gradient-background"]').addClass(( 'btn-has-gradient' ));

			//if btn is outline
			if ($(this).parent().hasClass('is-style-outline')) {
				$(this).addClass(( 'btn-has-outline' ));
			}
			//if btn is outline
			if ($(this).parent().hasClass('has-shadow-hover-color')) {
				$(this).addClass(( 'btn-has-shadow-hover' ));
			}

			//Get colors
			var prevbghover = this.style.backgroundColor;
			var prevtexthover = this.style.color;
			var prevshadowhover = this.style.boxShadow;

			if ($(this).parent().hasClass('has-hover-color')) {
				var bghover = this.parentNode.getAttribute('bghover');
			}
			if ($(this).parent().hasClass('has-hover-text-color')) {
				var texthover = this.parentNode.getAttribute('texthover');
			}
			if ($(this).parent().hasClass('has-shadow-hover-color')) {
				var shadowhovercolor = this.parentNode.getAttribute('shadowhover');
				var shadowhover = shadowhovercolor + ' 2px 2px 0px 0px';
			}

			$(this).mouseenter(function() {
				$(this).css({
					'backgroundColor' : bghover,
					'color' : texthover,
				});
				if ($(this).hasClass('btn-has-outline')) {
					$(this).css({
						'borderColor' : bghover,
					});
				}
				if ($(this).hasClass('btn-has-gradient')) {
					$(this).css({
						'background' : bghover,
					});
				}
				if ($(this).hasClass('btn-has-shadow-hover')) {
					$(this).css({
						'box-shadow' : shadowhover,
					});
				}
			});
			$(this).mouseleave(function() {
				$(this).css({
					'backgroundColor' : prevbghover,
					'color' : prevtexthover,
				});
				if ($(this).hasClass('btn-has-outline')) {
					$(this).css({
						'borderColor' : prevbghover,
					});
				}
				if ($(this).hasClass('btn-has-gradient')) {
					$(this).css({
						'background' : prevbghover,
					});
				}
				if ($(this).hasClass('btn-has-shadow-hover')) {
					$(this).css({
						'box-shadow' : prevshadowhover,
					});
				}
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
