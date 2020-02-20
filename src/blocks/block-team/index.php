<?php

/**
 * Register the dynamic block.
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

	// Hook server side rendering into render callback
	register_block_type( 'lsx-blocks/lsx-team', [
		'render_callback' => 'render_dynamic_block',
	] );

}
add_action( 'init', 'register_dynamic_block' );

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function render_dynamic_block( $atts ) {
	$atts = array(
		'columns' => 4,
		'orderby' => 'name',
		'order' => 'ASC',
		'role' => 'test-role',
		'limit' => '99',
		'include' => '',
		'display' => 'excerpt',
		'size' => 'lsx-team-archive',
		'show_link' => false,
		'show_email' => false,
		'show_image' => true,
		'show_roles' => false,
		'show_job_title' => true,
		'show_desc' => true,
		'show_social' => true,
		'carousel' => true,
		'featured' => false,
	);

	$output = '';

	$args = array(
		'post_type' => 'team',
		'posts_per_page' => '99',
		'orderby' => 'name',
		'order' => 'ASC',
		'meta_key' => 'lsx_featured',
		'meta_value' => 1,
		'tax_query' => array(
			array(
				'taxonomy' => 'team_role',
				'field' => 'id',
				'terms' => '184',
			),
		),
	);

	$team = new \WP_Query( $args );

	if ( $team->have_posts() ) {
		global $post;

		$count = 0;
		$count_global = 0;

		$column_size = intval( 12 / $columns );

		$carousel = true === $carousel || 'true' === $carousel ? true : false;

		if ( $carousel ) {
			$output .= "<div class='lsx-team-shortcode' id='lsx-team-slider' data-slick='{\"slidesToShow\": $columns, \"slidesToScroll\": $columns }'>";
		} else {
			$output .= "<div class='lsx-team-shortcode'><div class='row'>";
		}

		while ( $team->have_posts() ) {
			$team->the_post();

			// Count
			$count++;
			$count_global++;

			$member_name = apply_filters( 'the_title', $post->post_title );
			$member_roles = '';
			$member_description = '';
			$member_avatar = '';
			$member_socials = '';
			$member_job_title = '';
			$member_email = '';
			$bottom_link = '';
			$facebook = get_post_meta( $post->ID, 'lsx_facebook', true );
			$twitter = get_post_meta( $post->ID, 'lsx_twitter', true );
			$linkedin = get_post_meta( $post->ID, 'lsx_linkedin', true );

			// Link to single
			if ( ( true === $show_link || 'true' === $show_link ) && ( empty( $this->options['display'] ) || empty( $this->options['display']['team_disable_single'] ) ) ) {
				$bottom_link = '<a href="' . get_permalink( $post->ID ) . '" class="lsx-team-show-more">More about ' . strtok( $member_name, ' ' ) . '<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';
			}

			if ( true === $show_email || 'true' === $show_email ) {
				$email = get_post_meta( $post->ID, 'lsx_email_contact', true );

				$member_email = '<a href="mailto:' . sanitize_email( $email ) . '" class="lsx-team-email">' . sanitize_email( $email ) . '</a>';
			}

			if ( ( true === $show_link || 'true' === $show_link ) && ( empty( $this->options['display'] ) || empty( $this->options['display']['team_disable_single'] ) ) ) {
				$member_name = '<h5 class="lsx-team-name"><a href="' . get_permalink() . '">' . $member_name . '</a></h5>';
			} else {
				$member_name = '<h5 class="lsx-team-name">' . $member_name . '</h5>';
			}

			// Member roles
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

			// Member job title

			/*if ( 50 > strlen( trim( $show_job_title ) ) ) {
				return false;
			}

			if ( ! preg_match( '/^\d{5}(\-?\d{4})?$/', $show_job_title ) ) {
				return false;
			}*/

			if ( true === $show_job_title || 'true' === $show_job_title ) {
				$job_title = get_post_meta( $post->ID, 'lsx_job_title', true );
				$member_job_title = ! empty( $job_title ) ? "<small class='lsx-team-job-title'>$job_title</small>" : '';
			}

			// Member description
			if ( true === $show_desc || 'true' === $show_desc ) {
				if ( 'full' === $display ) {
					$member_description = apply_filters( 'the_content', get_the_content( esc_html__( 'Read More', 'lsx-team' ) ) );
					$member_description = str_replace( ']]>', ']]&gt;', $member_description );
				} elseif ( 'excerpt' === $display ) {
					$member_description = apply_filters( 'the_excerpt', get_the_excerpt() );
				}

				$member_description = ! empty( $member_description ) ? "<div class='lsx-team-description'>$member_description</div>" : '';
			}

			// Member avatar
			if ( true === $show_image || 'true' === $show_image ) {
				$member_avatar = $this->get_thumbnail( $post->ID, $size );

				if ( ( true === $show_link || 'true' === $show_link ) && ( empty( $this->options['display'] ) || empty( $this->options['display']['team_disable_single'] ) ) ) {
					$member_avatar = "<figure class='lsx-team-avatar'><a href='" . get_permalink() . "'>$member_avatar</a></figure>";
				} else {
					$member_avatar = "<figure class='lsx-team-avatar'>$member_avatar</figure>";
				}
			}

			// Member socials
			if ( true === $show_social || 'true' === $show_social ) {
				$links = array(
					'facebook' => $facebook,
					'twitter' => $twitter,
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
				<div class='lsx-team-slot'>
					$member_avatar
					$member_name
					$member_job_title
					$member_roles
					$member_description
					$member_socials
					$member_email
					$bottom_link
				</div>
			";

			if ( ! $carousel ) {
				$output .= '</div>';

				if ( $count == $columns && $team->post_count > $count_global ) {
					$output .= '</div>';
					$output .= '<div class="row">';
					$count = 0;
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
