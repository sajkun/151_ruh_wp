<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * The main output class
 *
 * @package theme/output
 *
 * @since v1.0
 */
class theme_content_output{

  /**
  * prints header
  *
  * @hookedto
  */
  public static function print_header(){

    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $custom_logo_url = wp_get_attachment_image_url( $custom_logo_id , 'full' );

    $custom_logo_url = ($custom_logo_url)? $custom_logo_url : THEME_URL.'/images/logo.svg';

    $logo = (!is_front_page())? sprintf('<a href="%s" class="logo"><img src="%s" alt="eGamer"></a>', home_url() , $custom_logo_url) : sprintf('<span class="logo"><img src="%s" alt="eGamer"></span>', $custom_logo_url) ;

    $main_menu = wp_nav_menu( array(
      'theme_location'  => 'main_menu',
      'menu'            => '',
      'container'       => '',
      'container_class' => '',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => false,
      'fallback_cb'     => '',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
      'depth'           => 1,
    ) );

    $social_menu = wp_nav_menu( array(
      'theme_location'  => 'social_menu',
      'menu'            => '',
      'container'       => '',
      'container_class' => '',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => false,
      'fallback_cb'     => '',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
      'depth'           => 1,
    ) );

    $args = array(
      'logo'        => $logo,
      'main_menu'   => $main_menu,
      'social_menu' => $social_menu,
    );
    print_theme_template_part('header', 'globals', $args);
  }


  /**
  * Prints page content
  *
  * @hookedto do_theme_header 10
  *
  * @see  [theme_folder]/includes/class-page-constructor.php line 22
  */
  public static function print_page_content(){}


  /**
  * Prints page footer
  *
  * @hookedto do_theme_footer 10
  *
* @see  [theme_folder]/includes/class-page-constructor.php line 23
  */
  public static function print_footer(){

    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $custom_logo_url = wp_get_attachment_image_url( $custom_logo_id , 'full' );

    $custom_logo_url = ($custom_logo_url)? $custom_logo_url : THEME_URL.'/images/logo.svg';

    $logo = (!is_front_page())? sprintf('<a href="%s" class="logo"><img src="%s" alt="eGamer"></a>', home_url() , $custom_logo_url) : sprintf('<span class="logo"><img src="%s" alt="eGamer"></span>', $custom_logo_url) ;

    $main_menu = wp_nav_menu( array(
      'theme_location'  => 'main_menu',
      'menu'            => '',
      'container'       => '',
      'container_class' => '',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => false,
      'fallback_cb'     => '',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
      'depth'           => 1,
    ) );

    $social_menu = wp_nav_menu( array(
      'theme_location'  => 'social_menu',
      'menu'            => '',
      'container'       => '',
      'container_class' => '',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => false,
      'fallback_cb'     => '',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
      'depth'           => 1,
    ) );

    $terms_menu = wp_nav_menu( array(
      'theme_location'  => 'terms_menu',
      'menu'            => '',
      'container'       => '',
      'container_class' => '',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => false,
      'fallback_cb'     => '',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
      'depth'           => 1,
    ) );

    $copyrights = get_option('theme_footer_copyrights');

    $args = array(
      'logo'        => $logo,
      'main_menu'   => $main_menu,
      'social_menu' => $social_menu,
      'terms_menu'  => $terms_menu,
      'copyrights'  => $copyrights,
    );

    print_theme_template_part('footer', 'globals', $args);
  }



  /**
  * Prints contentof a page
  *
  * @hookedto do_theme_content 10
  *
  * @see  [theme_folder]/includes/class-page-constructor.php line 24
  */
  public static function print_content_page(){
    if ( have_posts() ) :
      while ( have_posts() ) : the_post();
        the_content();
      endwhile;
    endif;
  }
}