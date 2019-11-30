<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
//***
/**
  * Page Construct Class
  *
  * Constructs page
  *
  * @package theme/helper
  *
  * @since v1.0
  */
class theme_construct_page{

  /**
  * Adds hooks for wordpress template
  * Used templates: index.php
  *
  * @return void
  */
  public static function init(){
    add_action('do_theme_header', array('theme_content_output', 'print_header'));
    add_action('do_theme_footer', array('theme_content_output', 'print_footer'));
    add_action('do_theme_content', array('theme_content_output', 'print_content_page'));
  }


  /**
  * Detects what page is currently loaded
  *
  * @return bool
  */
  public static function is_page_type( $type ){
    switch ($type){
      case 'blog':
        return is_home();
        break;
      case 'fronted-page':
        return is_front_page();
        break;
      case 'blog-category':
        return is_category();
        break;
      case 'blog-post':
        $obj = get_queried_object();
        return (is_single() && ('post' === $obj->post_type));
        break;
      case 'post-tag':
        return is_tag();
        break;
    }
  }
}