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


      $days_30_before_today = new DateTime();
      $days_30_before_today = $days_30_before_today->modify('-30 days');
      $days_30_before_today_formatted = $days_30_before_today->format('M d Y');

    // Get leads by dates

      $leads = get_posts_by_dates( $days_30_before_today_formatted , $today_formated );

      $leads = get_leads_meta($leads);

      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data', $leads);


      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_filtered', $leads);

      // leads for previous preriod

      $from_prev_period = new DateTime();
      $to_prev_period   = new DateTime();
      $from_prev_period->modify('-1 day');
      $to_prev_period->modify('-31 days');
      $from_prev_period_fromatted = $from_prev_period->format('M d Y');
      $to_prev_period_fromatted = $to_prev_period->format('M d Y');

      $leads_prev = get_posts_by_dates( $from_prev_period_fromatted , $to_prev_period_fromatted );

      $leads_prev = get_leads_meta($leads_prev);

      wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_prev', $leads_prev);

    // prepare data for filters

      $filter_data = get_filters_by_leads( $leads );

      wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data', $filter_data);


    // team perfomance

      $user_data = get_users_leads( $days_30_before_today_formatted , $today_formated);

      wp_localize_script($theme_init->main_script_slug, 'team_perfomance', $user_data);

      $args = array(
        'daterange' => array(
          'from' => $days_30_before_today_formatted,
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

      $leads = get_posts_by_dates( $month_first_day , $today_formated );

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

      $user = get_user_by('id', get_current_user_id());
      $user_name =  theme_get_user_name($user);

      $args = array(
        'user_name' => $user_name,
        'user_id' => get_current_user_id(),
        'stages' => $stages,
        'daterange' => array(
          'from' => $month_first_day,
          'to'   => $today_formated
        ),
      );

    print_theme_template_part('leads-list', 'globals', $args);
  }


   /**
   /* prints a content of a lead of a lead
   */
  public static function print_lead_content(){
    global $theme_init;
    $lead                = get_queried_object();

    // gets data about stage of a lead
    $lead_stage          = get_post_meta($lead->ID, '_lead_stage', true);
    $converted_stages    = get_converted_stages();

    // foreach ($stages as $key => $st) {
    //   $lead_stage_num = $st['name'] === $lead_stage ? (int)$st['number'] : $lead_stage_num;
    // }

    // defines a type of a lead
    $lead_type  = array('class' => 'opened', 'text' => 'Opened Lead');
    $lead_type = (in_array( $lead_stage, $converted_stages ))? array('class' => 'converted', 'text' => 'Converted Lead'): $lead_type;
    $lead_type = ($lead_stage === get_failed_stage_name())? array('class' => 'failed', 'text' => 'Failed Lead'): $lead_type;

    // get current user data
    $user = get_user_by('id', get_current_user_id());
    $user_name =  theme_get_user_name($user);


    // gets lead logs, notes and files
    $lead_notes = array();
    $lead_files = array();
    $_lead_notes = get_post_meta($lead->ID, '_lead_notes', true);
    $_lead_files = get_post_meta($lead->ID, '_lead_files', true);
    $lead_logs   = get_post_meta($lead->ID, '_lead_log', true);


    if(!$lead_logs){
      $lead_logs = array();
    }

    if($_lead_notes){
      foreach ($_lead_notes as $key => $n) {
        $lead_notes[] = $n;
      }
    }

    if($_lead_files){
      foreach ($_lead_files as $key => $n) {
        $lead_files[] = $n;
      }
    }

    // get assigned specialists data

    $specialists_assigned = get_post_meta($lead->ID, '_lead_specialists', true);
    $users = get_users();
    $specialists_data = array();

    $clinics = get_option('clinics_list');
    $treatments = get_option('treatments_list');


    foreach ($users as $key => $user) {
      $photo_id = get_the_author_meta('user_photo_id', $user->ID);
      $image    =  wp_get_attachment_url( $photo_id );
      $image    = ($image) ? $image : DUMMY_ADMIN;
      $position = esc_html( get_the_author_meta( 'user_position', $user->ID ) );
      $name     = theme_get_user_name($user);
      $specialists_data[$name] = array(
        'photo'     => $image,
        'position'  => $position,
        'user_id'   => $user->ID,
        'name'      => $name,
        'show'      => (isset($specialists_assigned[$user->ID]) && 'yes' === $specialists_assigned[$user->ID])? 'yes' : 'no'
      );
    }
    // get other leads info
    $leads_id          = (int)get_option('theme_page_leads');
    $lead_created_time = new DateTime($lead->post_date);


    $args = array(
      'treatment_coordinator' => get_post_meta($lead->ID, '_treatment_coordinator', true),
      'treatment_value'       => get_post_meta($lead->ID, '_treatment_value', true),
      'patient_data'          => get_post_meta($lead->ID, '_patient_data', true),
      'reminder'              => get_post_meta($lead->ID, '_reminder', true),
      'lead_stage'            => $lead_stage,
      'lead_type'             => $lead_type,
      'lead_id'               => $lead->ID,
      'user_name'             => $user_name,
      'user_id'               => get_current_user_id(),
      'url'                   => get_permalink($lead),
      'return_url'            => get_permalink($leads_id),
      'text_save_btn'         => 'Save changes',
      'text_save_del'         => 'Delete',
      'time_lead_created'     => $lead_created_time->format('d M Y') . ' at '. $lead_created_time->format('H:i'),
    );

    $clinics = $clinics ? $clinics: array();
    $treatments = $treatments ? $treatments: array();

    wp_localize_script($theme_init->main_script_slug, 'clinics', $clinics);
    wp_localize_script($theme_init->main_script_slug, 'treatments', $treatments);

    wp_localize_script($theme_init->main_script_slug, 'is_single_lead', 'yes');
    wp_localize_script($theme_init->main_script_slug, 'lead_notes', $lead_notes);
    wp_localize_script($theme_init->main_script_slug, 'specialists_data', $specialists_data);
    wp_localize_script($theme_init->main_script_slug, 'specialists', array_keys($specialists_data));
    wp_localize_script($theme_init->main_script_slug, 'lead_files', $lead_files);
    wp_localize_script($theme_init->main_script_slug, 'lead_logs',  $lead_logs);

    print_theme_template_part('lead-single', 'globals', $args);
  }


   /**
   /* prints a content of a form for a creation of a lead
   */
  public static function print_lead_content_blank(){
    global $theme_init;

    $lead_created_time = new DateTime();
    $leads_id     = (int)get_option('theme_page_leads');

    // get assigned specialists data

    $users = get_users();
    $specialists_data = array();

    foreach ($users as $key => $user) {
      $photo_id = get_the_author_meta('user_photo_id', $user->ID);
      $image    =  wp_get_attachment_url( $photo_id );
      $image    = ($image) ? $image : DUMMY_ADMIN;
      $position = esc_html( get_the_author_meta( 'user_position', $user->ID ) );
      $name     = theme_get_user_name($user);

      $specialists_data[$name] = array(
        'photo'     => $image,
        'position'  => $position,
        'name'      => $name,
        'show'     => 'no',
      );
    }

      $args = array(
        'treatment_coordinator' => array(),
        'treatment_value'       => array(),
        'patient_data'          => array(),
        'reminder'              => '',
        'lead_stage'            => $lead_stage,
        'lead_type'             => array('class' => 'opened', 'text' => 'New Lead'),
        'lead_id'               => -1,
        'user_name'             => $user_name,
        'user_id'               => get_current_user_id(),
        'return_url'            => get_permalink($leads_id),
        'text_save_btn'         => 'Create Lead',
        'text_save_del'         => 'Cancel',
        'time_lead_created'     => $lead_created_time->format('d M Y') . ' at '. $lead_created_time->format('H:i'),
      );

      $clinics = get_option('clinics_list');
      $treatments = get_option('treatments_list');

      $clinics = $clinics ? $clinics: array();
      $treatments = $treatments ? $treatments: array();

      wp_localize_script($theme_init->main_script_slug, 'clinics', $clinics);
      wp_localize_script($theme_init->main_script_slug, 'treatments', $treatments);

      wp_localize_script($theme_init->main_script_slug, 'is_single_lead', 'yes');
      wp_localize_script($theme_init->main_script_slug, 'lead_notes', array());
      wp_localize_script($theme_init->main_script_slug, 'specialists_data', $specialists_data);
      wp_localize_script($theme_init->main_script_slug, 'specialists', array_keys($specialists_data));
      wp_localize_script($theme_init->main_script_slug, 'lead_files', array());
      wp_localize_script($theme_init->main_script_slug, 'lead_logs',  array());

      print_theme_template_part('lead-single', 'globals', $args);
   }


   public static function print_login_form(){

      $args = array();
      print_theme_template_part('login-form', 'globals', $args);
   }
}