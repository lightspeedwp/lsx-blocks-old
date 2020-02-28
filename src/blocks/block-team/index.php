<?php
/**
 * Server-side rendering for the team block
 *
 * @since   1.1.0
 * @package LSX BLOCKS
 */

/**
 * Register the dynamic Team block.
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
	register_block_type( 'lsx-blocks/lsx-team', array(
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
			'displayTeamRole'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTeamJobTitle' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTeamSocial'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayEmail'        => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayCarousel'     => array(
				'type'    => 'boolean',
				'default' => true,
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
			'teamrole'            => array(
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
		'render_callback' => 'render_dynamic_team_block',
	) );

}
add_action( 'init', 'register_dynamic_block' );

/**
 * Server-side rendering for the team block.
 *
 * @param [type] $attributes the attributes.
 * @return output.
 */
function render_dynamic_team_block( $attributes ) {

	$team_id_array = explode( ', ', $attributes['includeId'] );
	if ( empty( $attributes['teamrole'] ) ) {
		$attributes['teamrole'] = 'all';
	}

	if ( ! empty( $attributes['includeId'] ) ) {
		$team = new WP_Query( [
			'showposts'   => $attributes['postsToShow'],
			'post_status' => 'publish',
			'post_type'   => 'team',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'post__in'    => $team_id_array,
			'tax_query'   => array(
				array(
					'taxonomy' => 'team_role',
					'field'    => 'id',
					'terms'    => $attributes['teamrole'],
				),
			),
		] );
	} else {
		$team = new WP_Query( [
			'showposts'   => $attributes['postsToShow'],
			'post_status' => 'publish',
			'post_type'   => 'team',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'tax_query'   => array(
				array(
					'taxonomy' => 'team_role',
					'field'    => 'id',
					'terms'    => $attributes['teamrole'],
				),
			),
		] );
	}

	if ( empty( $team ) ) {
		return '<p>No Team Members found</p>';
	}

	if ( $team->have_posts() ) {

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
		$show_roles     = $attributes['displayTeamRole'];
		$show_job_title = $attributes['displayTeamJobTitle'];
		$show_desc      = $attributes['displayPostExcerpt'];
		$show_image     = $attributes['displayPostImage'];
		$show_social    = $attributes['displayTeamSocial'];

		$output = '';

		if ( $carousel && ( 'grid' === $post_layout ) ) {
			$output .= "<div class='lsx-team-block' id='lsx-team-slider' data-slick='{\"slidesToShow\": $columns, \"slidesToScroll\": $columns }'>";
		} else {
			$output .= "<div class='lsx-team-block'><div class='row'>";
		}

		while ( $team->have_posts() ) {
			$team->the_post();

			// Count.
			$count++;
			$count_global++;

			$member_name        = apply_filters( 'the_title', $post->post_title );
			$member_roles       = '';
			$member_description = '';
			$member_avatar      = '';
			$member_socials     = '';
			$member_job_title   = '';
			$member_email       = '';
			$bottom_link        = '';
			$facebook           = get_post_meta( $post->ID, 'lsx_facebook', true );
			$twitter            = get_post_meta( $post->ID, 'lsx_twitter', true );
			$linkedin           = get_post_meta( $post->ID, 'lsx_linkedin', true );

			// Link to single.
			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$bottom_link = '<a href="' . get_permalink( $post->ID ) . '" class="lsx-team-show-more">More about ' . strtok( $member_name, ' ' ) . '<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';
			}

			if ( true === $show_email || 'true' === $show_email ) {
				$email = get_post_meta( $post->ID, 'lsx_email_contact', true );

				$member_email = '<a href="mailto:' . sanitize_email( $email ) . '" class="lsx-team-email">' . sanitize_email( $email ) . '</a>';
			}

			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$member_name = '<h5 class="lsx-team-name"><a href="' . get_permalink() . '">' . $member_name . '</a></h5>';
			} else {
				$member_name = '<h5 class="lsx-team-name">' . $member_name . '</h5>';
			}

			// Member roles.
			if ( true === $show_roles || 'true' === $show_roles ) {
				$roles = '';
				$terms = get_the_terms( $post->ID, 'team_role' );

				if ( $terms && ! is_wp_error( $terms ) ) {
					$roles = array();

					foreach ( $terms as $term ) {
						$roles[] = $term->name;
					}

					$roles = join( ', ', $roles );
				}

				$member_roles = '' !== $roles ? "<small class='lsx-team-roles'>$roles</small>" : '';
			}

			// Member job title.
			if ( true === $show_job_title || 'true' === $show_job_title ) {
				$job_title        = get_post_meta( $post->ID, 'lsx_job_title', true );
				$member_job_title = ! empty( $job_title ) ? "<small class='lsx-team-job-title'>$job_title</small>" : '';
			}

			// Member description.
			if ( 'none' !== $show_desc ) {
				if ( 'full' === $show_desc ) {
					$member_description = apply_filters( 'the_content', get_the_content() );
					$member_description = str_replace( ']]>', ']]&gt;', $member_description );
				} elseif ( 'excerpt' === $show_desc ) {
					$member_description = apply_filters( 'the_excerpt', get_the_excerpt() );
				}
				$member_description = ! empty( $member_description ) ? "<div class='lsx-team-description'>$member_description</div>" : '';
			}

			// Member avatar.
			if ( true === $show_image || 'true' === $show_image ) {
				$member_avatar = get_the_post_thumbnail( $post->ID, 'thumbnail' );

				if ( ( true === $show_link || 'true' === $show_link ) ) {
					$member_avatar = "<figure class='lsx-team-avatar $image_shape'><a href='" . get_permalink() . "'>$member_avatar</a></figure>";
				} else {
					$member_avatar = "<figure class='lsx-team-avatar'>$member_avatar</figure>";
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

				$member_socials = ! empty( $member_socials ) ? "<ul class='lsx-team-socials list-inline'>$member_socials</ul>" : '';
			}

			if ( ! $carousel ) {
				$output .= "<div class='col-xs-12 col-md-$column_size'>";
			}

			$output .= "
				<article class='lsx-team-slot'>
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

				if ( $count == $columns && $team->post_count > $count_global ) {
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
