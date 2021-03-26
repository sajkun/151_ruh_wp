<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
/**
* Class that used to add different filters to theme
*
* @package theme/helpers
*/

class theme_filter_class{

  public function __construct(){
    /* Adds mark to page on pages' list in admin section*/
    add_filter('display_post_states', array($this, 'show_contact_page_state'), 10, 2);
    add_filter('allowed_http_origins', array($this, 'add_allowed_origins'));
  }

  public function show_contact_page_state( $states, $post ) {
    if ( 'page' == get_post_type( $post->ID )){
      switch ($post->ID) {
        case get_option('theme_page_dashboard'):
            $states[] = __('Dashboard Page','theme-translation');
          break;
        case get_option('theme_page_leads'):
            $states[] = __('Leads Page','theme-translation');
          break;
        case get_option('theme_page_create_leads'):
            $states[] = __('Blank Lead Page','theme-translation');
          break;
      }
    }
    return $states;
  }


  public static function add_allowed_origins($origins) {
      $origins[] = 'http://localhost/ruhd/';
      $origins[] = 'https://ruhdental.com/';
      return $origins;
  }
}

new theme_filter_class();
