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
			'teamrole'            => array(
				'type'    => 'string',
				'default' => '',
			),
			'includeId'           => array(
				'type'    => 'string',
				'default' => '',
			),
			'itemBackgroundColor' => array(
				'type'    => 'string',
				'default' => '#ffffff',
			),
			'itemFontColor' => array(
				'type'    => 'string',
				'default' => '#4a4a4a',
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
 * Return the team thumbnail.
 */
function team_get_thumbnail( $post, $thumbnail_class = 'img-responsive' ) {
	add_filter( 'lsx_placeholder_url', 'team_placeholder', 10, 1 );
	add_filter( 'lsx_to_placeholder_url', 'team_placeholder', 10, 1 );

	$thumbnail  = '';

	if ( ! empty( get_the_post_thumbnail( $post->ID ) ) ) {
		$thumbnail = get_the_post_thumbnail(
			$post->ID, 'medium', array(
				'class' => $thumbnail_class,
			)
		);
	} else {
		$thumbnail = '';
	}

	if ( empty( $thumbnail ) ) {
		$thumbnail = '<img class="' . $thumbnail_class . '" src="https://www.gravatar.com/avatar/none?d=mm&s=300" width="300" alt="placeholder" />';
	}

	remove_filter( 'lsx_placeholder_url', 'team_placeholder', 10, 1 );
	remove_filter( 'lsx_to_placeholder_url', 'team_placeholder', 10, 1 );

	return $thumbnail;
}

/**
 * Replaces the widget with Mystery Man
 */
function team_placeholder( $image ) {
	$image = array(
		get_site_url() . '/wp-content/plugins/lsx-blocks/dist/assets/images/mystery-man-square.png',
		512,
		512,
		true,
	);

	return $image;
}

/**
 * Server-side rendering for the team block.
 *
 * @param [type] $attributes the attributes.
 * @return output.
 */
function render_dynamic_team_block( $attributes ) {

	$team_id_array = explode( ', ', $attributes['includeId'] );

	if ( ! empty( $attributes['includeId'] ) ) {

		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status'    => 'publish',
			'post_type'      => 'team',
			'order'          => $attributes['order'],
			'orderby'        => $attributes['orderBy'],
			'post__in'       => $team_id_array,
		);
	} else {
		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status'    => 'publish',
			'post_type'      => 'team',
			'order'          => $attributes['order'],
			'orderby'        => $attributes['orderBy'],
		);
	}

	if ( ! empty( $attributes['teamrole'] ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'team_role',
				'field'    => 'id',
				'terms'    => $attributes['teamrole'],
			),
		);
	}

	$team = new \WP_Query( $args );

	if ( empty( $team ) ) {
		return '<p>No Team Members found</p>';
	}
	if ( $team->have_posts() ) {

		global $post;

		$count        = 0;
		$count_global = 0;

		$columns = $attributes['columns'];

		$column_size = intval( 12 / $columns );

		$block_width = $attributes['align'];

		$carousel      = $attributes['displayCarousel'];
		$post_layout   = $attributes['postLayout'];
		$image_shape   = $attributes['imageShape'];
		$itemBgColor   = $attributes['itemBackgroundColor'];
		$itemFontColor = $attributes['itemFontColor'];


		$show_link      = $attributes['displayPostLink'];
		$show_roles     = $attributes['displayTeamRole'];
		$show_job_title = $attributes['displayTeamJobTitle'];
		$show_desc      = $attributes['displayPostExcerpt'];
		$show_image     = $attributes['displayPostImage'];
		$show_social    = $attributes['displayTeamSocial'];

		$output = '';

		if ( $carousel && ( 'grid' === $post_layout ) ) {
			$output .= "<div class='lsx-team-block " . $block_width . "' id='lsx-team-slider' data-slick='{\"slidesToShow\": $columns, \"slidesToScroll\": $columns }'>";
		} else {
			$output .= "<div class='lsx-team-block block-template-" . $post_layout . ' ' . $block_width . "'><div class='row'>";
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
			$bottom_link        = '';
			$facebook           = get_post_meta( $post->ID, 'lsx_facebook', true );
			$twitter            = get_post_meta( $post->ID, 'lsx_twitter', true );
			$linkedin           = get_post_meta( $post->ID, 'lsx_linkedin', true );

			// Link to single.
			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$bottom_link = '<a href="' . get_permalink( $post->ID ) . '" class="lsx-team-show-more">More about ' . strtok( $member_name, ' ' ) . '<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';
			}

			if ( ( true === $show_link || 'true' === $show_link ) ) {
				$member_name = '<h5 class="lsx-team-name"><a href="' . get_permalink() . '">' . $member_name . '</a></h5>';
			} else {
				$member_name = '<h5 class="lsx-team-name">' . $member_name . '</h5>';
			}
			// Member job title.
			if ( true === $show_job_title || 'true' === $show_job_title ) {
				$job_title        = get_post_meta( $post->ID, 'lsx_job_title', true );
				$job_title_key = '';

				$member_job_title = ! empty( $job_title ) ? $job_title_key . "<small class='lsx-team-job-title'>$job_title</small>" : '';
			}

			// Member roles.
			if ( true === $show_roles || 'true' === $show_roles ) {
				$roles = '';
				$terms = get_the_terms( $post->ID, 'team_role' );

				if ( $terms && ! is_wp_error( $terms ) ) {
					$roles = array();

					foreach ( $terms as $term ) {
						//print( '<pre>' . print_r( $term, true ) . '</pre>' );
						$roles[] = '<a href="/team-role/' . $term->slug . '/">' . $term->name . '</a>';
					}

					$roles = join( ', ', $roles );
				}

				$member_roles = '' !== $roles ? "<small class='lsx-team-roles'>$roles</small>" : '';
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
				$member_description = ! empty( $member_description ) ? "<div class='lsx-team-description' style='color:" . $itemFontColor . "'>$member_description</div>" : '';
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
			if ( 'true' === $show_image || true === $show_image ) {
				$team_thumb = team_get_thumbnail( $post, 'thumbnail', 'img-responsive' );
				$member_avatar = '<figure class="lsx-team-avatar ' . $image_shape . '">' . $team_thumb . '</figure>';
			} else {
				$image = '';
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
				if ( 'list' === $post_layout ) {
					$column_size = 12;
				}
				$output .= "<div class='col-xs-12 col-md-$column_size'>";
			}

			if ( 'list' === $post_layout ) {
				$output .= "
				<article class='lsx-team-slot' style='background-color:" . $itemBgColor . "'>
					<div class='entry-profile-wrapper'>
						$member_avatar
						$member_socials
					</div>
					<div class='entry-layout-wrapper'>
						<div class='entry-layout-content'>
							$member_name
							$member_job_title
							$member_roles
							$member_description
							$bottom_link
						</div>
					</div>
				</article>
			";
			} else {
				$output .= "
				<article class='lsx-team-slot' style='background-color:" . $itemBgColor . "'>
					$member_avatar
					$member_name
					$member_job_title
					$member_roles
					$member_description
					$member_socials
					$bottom_link
				</article>
			";
			}

			if ( ! $carousel ) {
				$output .= '</div>';

				// if ( $count == $columns && $team->post_count > $count_global ) {
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
