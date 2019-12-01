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
}

new theme_filter_class();