<?php
/**
 * Server-side rendering for the testimonial block
 *
 * @since   1.1.0
 * @package LSX BLOCKS
 */

/**
 * Register the dynamic Testimonial block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_dynamic_block() {

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
			'displayTestimonialSocial'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayEmail'        => array(
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
				'default' => 'center',
			),
			'width'               => array(
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
add_action( 'init', 'register_dynamic_block' );

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
			'showposts'   => $attributes['postsToShow'],
			'post_status' => 'publish',
			'post_type'   => 'testimonial',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'post__in'    => $testimonial_id_array,
		);
	} else {
		$args = array(
			'showposts'   => $attributes['postsToShow'],
			'post_status' => 'publish',
			'post_type'   => 'testimonial',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
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
	if ( $testimonial->have_posts() ) {

		global $post;

		$count        = 0;
		$count_global = 0;

		$columns = $attributes['columns'];

		$column_size = intval( 12 / $columns );

		$carousel    = $attributes['displayCarousel'];
		$post_layout = $attributes['postLayout'];
		$image_shape = $attributes['imageShape'];

		$show_link      = $attributes['displayPostLink'];
		$show_email     = $attributes['displayEmail'];
		$show_roles     = $attributes['displayTestimonialRole'];
		$show_job_title = $attributes['displayTestimonialJobTitle'];
		$show_desc      = $attributes['displayPostExcerpt'];
		$show_image     = $attributes['displayPostImage'];
		$show_social    = $attributes['displayTestimonialSocial'];

		$output = '';

		if ( $carousel && ( 'grid' === $post_layout ) ) {
			$output .= "<div class='lsx-testimonial-block' id='lsx-testimonial-slider' data-slick='{\"slidesToShow\": $columns, \"slidesToScroll\": $columns }'>";
		} else {
			$output .= "<div class='lsx-testimonial-block'><div class='row'>";
		}

		while ( $testimonial->have_posts() ) {
			$testimonial->the_post();

			// Count.
			$count++;
			$count_global++;

			// Link.
			$link_open  = '';
			$link_close = '';

			// Link to single.
			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$bottom_link = '<a href="' . get_permalink( $post->ID ) . '" class="lsx-testimonial-show-more">More about ' . strtok( $member_name, ' ' ) . '<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';
			}

			if ( true === $show_email || 'true' === $show_email ) {
				$email = get_post_meta( $post->ID, 'lsx_email_contact', true );

				$member_email = '<a href="mailto:' . sanitize_email( $email ) . '" class="lsx-testimonial-email">' . sanitize_email( $email ) . '</a>';
			}

			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$member_name = '<h5 class="lsx-testimonial-name"><a href="' . get_permalink() . '">' . $member_name . '</a></h5>';
			} else {
				$member_name = '<h5 class="lsx-testimonial-name">' . $member_name . '</h5>';
			}

			// Member roles.
			if ( true === $show_roles || 'true' === $show_roles ) {
				$roles = '';
				$terms = get_the_terms( $post->ID, 'testimonial_tag' );

				if ( $terms && ! is_wp_error( $terms ) ) {
					$roles = array();

					foreach ( $terms as $term ) {
						$roles[] = $term->name;
					}

					$roles = join( ', ', $roles );
				}

				$member_roles = '' !== $roles ? "<small class='lsx-testimonial-roles'>$roles</small>" : '';
			}

			// Member job title.
			if ( true === $show_job_title || 'true' === $show_job_title ) {
				$job_title        = get_post_meta( $post->ID, 'lsx_job_title', true );
				$member_job_title = ! empty( $job_title ) ? "<small class='lsx-testimonial-job-title'>$job_title</small>" : '';
			}

			// Member description.
			if ( 'none' !== $show_desc ) {
				if ( 'full' === $show_desc ) {
					$member_description = apply_filters( 'the_content', get_the_content() );
					$member_description = str_replace( ']]>', ']]&gt;', $member_description );
				} elseif ( 'excerpt' === $show_desc ) {
					$member_description = apply_filters( 'the_excerpt', get_the_excerpt() );
				}
				$member_description = ! empty( $member_description ) ? "<div class='lsx-testimonial-description'>$member_description</div>" : '';
			}

			// Member avatar.
			if ( true === $show_image || 'true' === $show_image ) {
				$member_avatar = get_the_post_thumbnail( $post->ID, 'thumbnail' );

				if ( ( true === $show_link || 'true' === $show_link ) ) {
					$member_avatar = "<figure class='lsx-testimonial-avatar $image_shape'><a href='" . get_permalink() . "'>$member_avatar</a></figure>";
				} else {
					$member_avatar = "<figure class='lsx-testimonial-avatar'>$member_avatar</figure>";
				}
			}

			// Member socials.
			if ( true === $show_social || 'true' === $show_social ) {
				$links = array(
					'facebook' => $facebook,
					'twitter'  => $twitter,
					'linkedin' => $linkedin,
				);

				foreach ( $links as $sm => $sm_link ) {
					if ( ! empty( $sm_link ) ) {
						$member_socials .= "<li><a href='$sm_link' target='_blank'><i class='fa fa-$sm' aria-hidden='true'></i></a></li>";
					}
				}

				$member_socials = ! empty( $member_socials ) ? "<ul class='lsx-testimonial-socials list-inline'>$member_socials</ul>" : '';
			}

			if ( ! $carousel ) {
				$output .= "<div class='col-xs-12 col-md-$column_size'>";
			}

			$output .= "
				<article class='lsx-testimonial-slot'>
					$member_avatar
					$member_name
					$member_job_title
					$member_roles
					$member_description
					$member_socials
					$member_email
					$bottom_link
				</article>
			";

			if ( ! $carousel ) {
				$output .= '</div>';

				if ( $count == $columns && $testimonial->post_count > $count_global ) {
					$output .= '</div>';
					$output .= '<div class="row">';
					$count   = 0;
				}
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
