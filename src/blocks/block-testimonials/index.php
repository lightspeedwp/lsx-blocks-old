<?php
/**
 * Server-side rendering for the testimonial block
 *
 * @since   2.0.0
 * @package LSX BLOCKS
 */

/**
 * Register the dynamic Testimonial block.
 *
 * @since   2.0.0
 *
 * @return void
 */
function register_dynamic_testimonial_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback.
	register_block_type( 'lsx-blocks/lsx-testimonial', array(
		'style'           => 'lsx-blocks-style-css',
		'attributes'      => array(
			'className'           => array(
				'type' => 'string',
			),
			'postsToShow'         => array(
				'type'    => 'number',
				'default' => 12,
			),
			'displayPostExcerpt'  => array(
				'type'    => 'string',
				'default' => 'excerpt',
			),
			'displayPostImage'    => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostLink'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTestimonialRole'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTestimonialJobTitle' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayCarousel'     => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'postLayout'          => array(
				'type'    => 'string',
				'default' => 'grid',
			),
			'columns'             => array(
				'type'    => 'number',
				'default' => 3,
			),
			'align'               => array(
				'type'    => 'string',
				'default' => 'wide',
			),
			'order'               => array(
				'type'    => 'string',
				'default' => 'asc',
			),
			'orderBy'             => array(
				'type'    => 'string',
				'default' => 'date',
			),
			'testimonialtag'            => array(
				'type'    => 'string',
				'default' => '',
			),
			'includeId'           => array(
				'type'    => 'string',
				'default' => '',
			),
			'imageShape'          => array(
				'type'    => 'string',
				'default' => 'circle',
			),
			'readMoreText'        => array(
				'type'    => 'string',
				'default' => 'Continue Reading',
			),
		),
		'render_callback' => 'render_dynamic_testimonial_block',
	) );

}
add_action( 'init', 'register_dynamic_testimonial_block' );

/**
 * Return the team thumbnail.
 */
function testimonial_get_thumbnail( $post, $thumbnail_class = 'img-responsive' ) {
	add_filter( 'lsx_placeholder_url', 'testimonial_placeholder', 10, 1 );
	add_filter( 'lsx_to_placeholder_url', 'testimonial_placeholder', 10, 1 );

	$thumbnail  = '';

	if ( ! empty( get_the_post_thumbnail( $post->ID ) ) ) {
		$thumbnail = get_the_post_thumbnail(
			$post->ID, 'medium', array(
				'class' => $thumbnail_class,
			)
		);
	} elseif ( ! empty( get_post_meta( $post->ID, 'lsx_testimonial_email_gravatar', true ) ) ) {
		$thumbnail = get_avatar(
			get_post_meta( $post->ID, 'lsx_testimonial_email_gravatar', true ), 'thumbnail', false, array(
				'class' => $thumbnail_class,
			)
		);
	} else {
		$thumbnail = '';
	}

	if ( empty( $thumbnail ) ) {
		$thumbnail = '<img class="' . $thumbnail_class . '" src="https://www.gravatar.com/avatar/none?d=mm&s=300" width="300" alt="placeholder" />';
	}

	remove_filter( 'lsx_placeholder_url', 'testimonial_placeholder', 10, 1 );
	remove_filter( 'lsx_to_placeholder_url', 'testimonial_placeholder', 10, 1 );

	return $thumbnail;
}

/**
 * Replaces the widget with Mystery Man
 */
function testimonial_placeholder( $image ) {
	$image = array(
		LSX_BLOCKS_PATH . 'assets/img/mystery-man-square.png',
		512,
		512,
		true,
	);

	return $image;
}

/**
 * Server-side rendering for the testimonial block.
 *
 * @param [type] $attributes the attributes.
 * @return output.
 */
function render_dynamic_testimonial_block( $attributes ) {

	$testimonial_id_array = explode( ', ', $attributes['includeId'] );

	if ( ! empty( $attributes['includeId'] ) ) {

		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status'    => 'publish',
			'post_type'      => 'testimonial',
			'order'          => $attributes['order'],
			'orderby'        => $attributes['orderBy'],
			'post__in'       => $testimonial_id_array,
		);
	} else {
		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status'    => 'publish',
			'post_type'      => 'testimonial',
			'order'          => $attributes['order'],
			'orderby'        => $attributes['orderBy'],
		);
	}

	if ( ! empty( $attributes['testimonialtag'] ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'testimonial_tag',
				'field'    => 'id',
				'terms'    => $attributes['testimonialtag'],
			),
		);
	}

	$testimonial = new \WP_Query( $args );

	if ( empty( $testimonial ) ) {
		return '<p>No Testimonials found</p>';
	}
	//print( '<pre>' . print_r( $testimonial, true ) . '</pre>' );
	if ( $testimonial->have_posts() ) {

		global $post;

		$count        = 0;
		$count_global = 0;

		$columns = $attributes['columns'];

		$column_size = intval( 12 / $columns );

		$block_width = $attributes['align'];

		$carousel    = $attributes['displayCarousel'];
		$post_layout = $attributes['postLayout'];
		$image_shape = $attributes['imageShape'];

		$show_link      = $attributes['displayPostLink'];
		$show_roles     = $attributes['displayTestimonialRole'];
		$show_job_title = $attributes['displayTestimonialJobTitle'];
		$show_desc      = $attributes['displayPostExcerpt'];
		$show_image     = $attributes['displayPostImage'];

		$output = '';

		if ( $carousel && ( 'grid' === $post_layout ) ) {
			$output .= "<div class='lsx-testimonial-block " . $block_width . ' ' . $post_layout . "-view' id='lsx-testimonials-slider' data-slick='{\"slidesToShow\": $columns, \"slidesToScroll\": $columns }'>";
		} else {
			$output .= "<div class='lsx-testimonial-block " . $post_layout . "-view'><div class='row'>";
		}

		while ( $testimonial->have_posts() ) {
			$testimonial->the_post();

			// Count.
			$count++;
			$count_global++;

			$member_name = wp_kses_post( $post->post_title );

			// Link.
			$link_open  = '';
			$link_close = '';
			$bottom_link = '';
			$member_description = '';
			$member_job_title = '';
			$member_roles = '';

			// Link to single.
			if ( ( true === $show_link || 'true' === $show_link ) ) {

				if ( get_post_meta( $post->ID, 'lsx_testimonial_url', true ) ) {
					$link_open  = "<a href='" . get_post_meta( $post->ID, 'lsx_testimonial_url', true ) . "' target='_blank'>";
					$link_close = '</a>';
				}

				$bottom_link = '<a href="' . get_permalink( $post->ID ) . '" class="lsx-testimonial-show-more">More about ' . strtok( $member_name, ' ' ) . ' <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';
			}

			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$member_name = '<h5 class="lsx-testimonials-title"><a href="' . get_permalink() . '">' . $member_name . '</a></h5>';
			} else {
				$member_name = '<h5 class="lsx-testimonials-title">' . $member_name . '</h5>';
			}

			// Member roles.
			// if ( true === $show_roles || 'true' === $show_roles ) {
			// 	$roles = '';
			// 	$terms = get_the_terms( $post->ID, 'testimonial_tag' );

			// 	if ( $terms && ! is_wp_error( $terms ) ) {
			// 		$roles = array();

			// 		foreach ( $terms as $term ) {
			// 			$roles[] = $term->name;
			// 		}

			// 		$roles = join( ', ', $roles );
			// 	}

			// 	$member_roles = '' !== $roles ? "<small class='lsx-testimonial-tag'>$roles</small>" : '';
			// }

			// Member job title.
			if ( true === $show_job_title || 'true' === $show_job_title ) {
				$job_title = get_post_meta( $post->ID, 'lsx_testimonial_byline', true );

				$small = "<small class='lsx-testimonials-meta-wrap'><i class='fa fa-briefcase'></i> <span class='lsx-testimonials-meta'>" . esc_html__( 'Role & Company', 'lsx-testimonials' ) . ':</span> ' . $link_open . $job_title . $link_close . '</small>';

				$member_job_title = ! empty( $job_title ) ? "<small class='lsx-testimonial-job-title'>$small</small>" : '';
			}

			// Member description.
			if ( 'none' !== $show_desc ) {
				if ( 'full' === $show_desc ) {
					$member_description = apply_filters( 'the_content', get_the_content() );
					$member_description = str_replace( ']]>', ']]&gt;', $member_description );
				} elseif ( 'excerpt' === $show_desc ) {
					if ( ! has_excerpt() ) {

						$content = wp_trim_words( get_the_content(), 30 );
						$content = '<p>' . $content . '</p>';
						$member_description = wp_kses_post( $content );
					} else {
						$member_description = apply_filters( 'the_excerpt', get_the_excerpt() );
					}
				}
				$member_description = ! empty( $member_description ) ? "<blockquote class='lsx-testimonials-content'>$member_description $bottom_link</blockquote>" : '';
			}

			// Image.
			if ( 'true' === $show_image || true === $show_image ) {
				$testimonial_thumb = testimonial_get_thumbnail( $post, 'thumbnail', 'img-responsive' );
				$image = '<figure class="lsx-testimonials-avatar ' . $image_shape . '">' . $testimonial_thumb . '</figure>';
			} else {
				$image = '';
			}

			if ( ! $carousel ) {
				if ( 'list' === $post_layout ) {
					$column_size = 12;
				}
				$output .= "<div class='col-xs-12 col-md-$column_size'>";
			}

			$output .= "
				<article class='lsx-testimonials-slot'>
					$image
					$member_name
					$member_roles
					$member_job_title
					$member_description
				</article>
			";

			if ( ! $carousel ) {
				$output .= '</div>';

				// if ( $count == $columns && $testimonial->post_count > $count_global ) {
				// 	$output .= '</div>';
				// 	$output .= '<div class="row">';
				// 	$count   = 0;
				// }
			}

			wp_reset_postdata();

		}
		if ( ! $carousel ) {
			$output .= '</div>';
		}

		$output .= '</div>';

		return $output;
	}

}
