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
    // add_action('do_theme_footer', array('theme_content_output', 'print_footer'));
    // add_action('do_theme_content', array('theme_content_output', 'print_content_page'));

    if(self:: is_page_type( 'dashboard' )){
      add_action('do_theme_content', array('theme_content_output', 'print_dashboard'));
    }
    if(self:: is_page_type( 'leads-list' )){
      add_action('do_theme_content', array('theme_content_output', 'print_leads_list'));
    }
  }


  /**
  * Detects what page is currently loaded
  *
  * @return bool
  */
  public static function is_page_type( $type ){
    $obj          = get_queried_object();
    $leads_id     = (int)get_option('theme_page_leads');
    $new_lead_id  = (int)get_option('theme_page_create_leads');
    $dashboard_id = (int)get_option('theme_page_dashboard');

    switch ($type){
      case 'blog':
        return is_home();
        break;
      case 'fronted-page':
        return is_front_page();
        break;
      case 'dashboard':
        return  $obj->ID ===   $dashboard_id;
        break;
      case 'leads-list':
        return  $obj->ID ===   $leads_id;
        break;
    }
  }
}