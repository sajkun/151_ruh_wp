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


    if(is_user_logged_in()){
      $user_id   = get_current_user_id();
      $user_meta = get_userdata($user_id);
      $user_roles = $user_meta->roles;
      $is_admin = in_array('administrator', $user_roles) || in_array('manager', $user_roles);

      add_action('do_theme_header', array('theme_content_output', 'print_header'));

      if(!$is_admin){
        if(self:: is_page_type( 'dashboard' )){
          add_action('do_theme_content', array('theme_content_output', 'print_leads_list'));
        }

        else if(self:: is_page_type( 'leads-list' )){
          add_action('do_theme_content', array('theme_content_output', 'print_leads_list'));
        }

        else if(self:: is_page_type( 'lead' )){
          add_action('do_theme_content', array('theme_content_output', 'print_lead_content'));
        }
        else if(self:: is_page_type( 'lead-blank' )){
          add_action('do_theme_content', array('theme_content_output', 'print_lead_content_blank'));
        }
      }else{
        if(self:: is_page_type( 'dashboard' )){
          add_action('do_theme_content', array('theme_content_output', 'print_dashboard'));
        }

        else if(self:: is_page_type( 'leads-list' )){
          add_action('do_theme_content', array('theme_content_output', 'print_leads_list'));
        }

        else if(self:: is_page_type( 'lead' )){
          add_action('do_theme_content', array('theme_content_output', 'print_lead_content'));
        }
        else if(self:: is_page_type( 'lead-blank' )){
          add_action('do_theme_content', array('theme_content_output', 'print_lead_content_blank'));
        }
      }
    }else{
      add_action('do_theme_header', array('theme_content_output', 'print_login_form'));
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
      case 'lead':
        return velesh_theme_posts::$lead === $obj->post_type;
        break;

      case 'lead-blank':
        return $new_lead_id === $obj->ID;
        break;
    }
  }
}