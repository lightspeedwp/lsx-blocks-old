/* eslint-disable wrap-iife */
const LSX_BLOCKS = Object.create( null );
( function( $, window, document, undefined ) {
	'use strict';

	LSX_BLOCKS.document = $( document );

	//Holds the slider function
	LSX_BLOCKS.sliders = Object.create( null );

	/**
     * Start the JS Class
     */
	LSX_BLOCKS.init = function() {
		if ( $.isFunction( $.fn.slick ) ) {
			LSX_BLOCKS.sliders.element = jQuery( '.lsx-block-post-carousel .slick-slider' );
			if ( 0 < LSX_BLOCKS.sliders.element.length ) {
				LSX_BLOCKS.sliders.init();
			}
		}
	};

	/**
     * Initiate the Sliders
     */
	LSX_BLOCKS.sliders.init = function( ) {
		LSX_BLOCKS.sliders.element.each( function() {
			let slidesToShow = 3;
			let slidesToScroll = 3;
			let mediumSlidesToShow = 2;
			let mediumSlidesToScroll = 2;
			let slickData = $( this ).attr( 'data-slick' );

			if ( undefined !== slickData ) {
				slickData = JSON.parse( slickData );
				if ( undefined !== slickData.slidesToShow ) {
					slidesToShow = slickData.slidesToShow;
					if ( 1 === slidesToShow ) {
						mediumSlidesToShow = slidesToShow;
					}
				}
				if ( undefined !== slickData.slidesToScroll ) {
					slidesToScroll = slickData.slidesToScroll;
					if ( 1 === slidesToScroll ) {
						mediumSlidesToScroll = slidesToScroll;
					}
				}
			}

			$( this ).slick( {
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
							dots: true,
						},
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: mediumSlidesToShow,
							slidesToScroll: mediumSlidesToScroll,
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				],
			} );
		} );
	};

	//Adding Hover states for Core Button Block Extended
	LSX_BLOCKS.coreButton = function( ) {
		$( '.wp-block-button a' ).each( function() {
			//if btn is gradient
			$( '[class$="gradient-background"]' ).addClass( ( 'btn-has-gradient' ) );

			//if btn is outline
			if ( $( this ).parent().hasClass( 'is-style-outline' ) ) {
				$( this ).addClass( ( 'btn-has-outline' ) );
			}
			//if btn is outline
			if ( $( this ).parent().hasClass( 'has-shadow-hover-color' ) ) {
				$( this ).addClass( ( 'btn-has-shadow-hover' ) );
			}

			//Get colors
			const prevbghover = this.style.backgroundColor;
			const prevtexthover = this.style.color;
			const prevshadowhover = this.style.boxShadow;
			let bghover = undefined;
			let texthover = undefined;
			let shadowhover = undefined;
			let shadowhovercolor = undefined;

			// Get the button hover colour.
			if ( $( this ).parent().hasClass( 'has-hover-color' ) ) {
				if ( this.parentNode.hasAttribute( 'bghover' ) ) {
					bghover = this.parentNode.getAttribute( 'bghover' );
				} else if ( this.hasAttribute( 'bghover' ) ) {
					bghover = this.getAttribute( 'bghover' );
				}
			}

			// Get the button hover text colour.
			if ( $( this ).parent().hasClass( 'has-hover-text-color' ) ) {
				if ( this.parentNode.hasAttribute( 'texthover' ) ) {
					texthover = this.parentNode.getAttribute( 'texthover' );
				} else if ( this.hasAttribute( 'texthover' ) ) {
					texthover = this.getAttribute( 'texthover' );
				}
			}

			// Get the button shadow hover text colour.
			if ( $( this ).parent().hasClass( 'has-shadow-hover-color' ) ) {
				if ( this.parentNode.hasAttribute( 'shadowhover' ) ) {
					shadowhovercolor = this.parentNode.getAttribute( 'shadowhover' );
				} else if ( this.hasAttribute( 'shadowhover' ) ) {
					shadowhovercolor = this.getAttribute( 'shadowhover' );
				}
				shadowhover = shadowhovercolor + ' 2px 2px 0px 0px';
			}

			$( this ).mouseenter( function() {
				$( this ).css( {
					backgroundColor: bghover,
					color: texthover,
				} );
				if ( $( this ).hasClass( 'btn-has-outline' ) ) {
					$( this ).css( {
						borderColor: bghover,
					} );
				}
				if ( $( this ).hasClass( 'btn-has-gradient' ) ) {
					$( this ).css( {
						background: bghover,
					} );
				}
				if ( $( this ).hasClass( 'btn-has-shadow-hover' ) ) {
					$( this ).css( {
						'box-shadow': shadowhover,
					} );
				}
			} );
			$( this ).mouseleave( function() {
				$( this ).css( {
					backgroundColor: prevbghover,
					color: prevtexthover,
				} );
				if ( $( this ).hasClass( 'btn-has-outline' ) ) {
					$( this ).css( {
						borderColor: prevbghover,
					} );
				}
				if ( $( this ).hasClass( 'btn-has-gradient' ) ) {
					$( this ).css( {
						background: prevbghover,
					} );
				}
				if ( $( this ).hasClass( 'btn-has-shadow-hover' ) ) {
					$( this ).css( {
						'box-shadow': prevshadowhover,
					} );
				}
			} );
		} );
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
