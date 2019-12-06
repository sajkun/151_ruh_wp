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
    $obj     = get_queried_object();
    $user_id = get_current_user_id();
    $user = get_user_by('id', $user_id);

    $last_name     = get_the_author_meta('last_name',  $user_id );
    $first_name    = get_the_author_meta('first_name', $user_id );
    $name = $first_name  . ' '. $last_name ;
    $name = trim($name)? $name : $user->data->display_name;

    $photo_id = get_the_author_meta('user_photo_id',   $user_id );
    $photo_url =  wp_get_attachment_url( $photo_id );
    $photo_url = ($photo_url) ? $photo_url : '';

    $dashboard_id  = (int)get_option('theme_page_dashboard');
    $leads_id      = (int)get_option('theme_page_leads');
    $new_lead_id = (int)get_option('theme_page_create_leads');


    $leads_menu_class = ($obj->ID === $leads_id || $obj->ID === $new_lead_id ||  velesh_theme_posts::$lead === $obj->post_type )? 'active' : '';

    $dashboard_menu_class = ($obj->ID === $dashboard_id)? 'active' : '';

    $args = array(
      'leads_menu_class'     => $leads_menu_class,
      'dashboard_menu_class' => $dashboard_menu_class,
      'dashboard_url'        => get_permalink($dashboard_id),
      'lead_url'             => get_permalink($leads_id),
      'new_lead_url'         => get_permalink($new_lead_id),
      'photo_url'            => $photo_url,
      'name'                 => $name,
    );

    print_theme_template_part('header', 'globals', $args);
  }


  /**
  * prints content of a dashboard
  *
  * @hookedto
  */
  public static function print_dashboard(){

    global $theme_init;

    // Get date range default

      $today = new DateTime();

      wp_localize_script($theme_init->main_script_slug, 'is_dashboard', 'yes');

      $current_month = $today->format('m');
      $current_year  = $today->format('Y');

      $today_formated = $today->format('M d Y');

      $today->setDate($current_year, $current_month, 1);

      $months_first_day = $today->format('M d Y');

    // Get leads by dates

      $leads = get_posts_by_dates( $months_first_day , $today_formated );

      $leads = get_leads_meta($leads);


      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data', $leads);

      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_filtered', $leads);

    // prepare data for filters

      $filter_data = get_filters_by_leads( $leads );

      wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data', $filter_data);

    // gistogram ????

    // convertions????

    // team perfomance

      $user_data = get_users_leads( $months_first_day , $today_formated);

      wp_localize_script($theme_init->main_script_slug, 'team_perfomance', $user_data);

      $args = array(
        'daterange' => array(
          'from' => $mont_first_day,
          'to'   => $today_formated
        ),
      );

    print_theme_template_part('dashboard', 'globals', $args);
  }


  /**
  * prints content of a dashboard
  *
  * @hookedto
  */
  public static function print_leads_list(){
    global $theme_init;

    // Get date range default

      $today = new DateTime();

      wp_localize_script($theme_init->main_script_slug, 'is_lead_list', 'yes');

      $current_month = $today->format('m');
      $current_year  = $today->format('Y');

      $today_formated = $today->format('M d Y');

      $today->setDate($current_year, $current_month, 1);

      $month_first_day = $today->format('M d Y');

    // Get leads by dates

      $leads = get_posts_by_dates( $months_first_day , $today_formated );

      $leads = get_leads_meta($leads);


      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data', $leads);

      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_filtered', $leads);

    // prepare data for filters

      $filter_data = get_filters_by_leads( $leads );

      wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data', $filter_data);

    // get available stages

      $stages = get_option('leads_stages');

      if(!$stages){
        echo '<div class="spacer-h-40"></div>';
        echo '<p class="text-center">No stages configured, Leads can not be ordered. Please Configure stages first</p>';
        return;
      }

      $args = array(
        'stages' => $stages,
        'daterange' => array(
          'from' => $month_first_day,
          'to'   => $today_formated
        ),
      );

    print_theme_template_part('leads-list', 'globals', $args);
  }

}