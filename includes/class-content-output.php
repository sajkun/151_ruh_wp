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

    $reception_id = (int)get_option('theme_page_reception');
    $tco_id = (int)get_option('theme_page_tco');

    $user_id   = get_current_user_id();
    $user_meta = get_userdata($user_id);

    $user_roles = $user_meta->roles;


    $is_admin = in_array('administrator', $user_roles) || in_array('manager', $user_roles);
    $is_staff = in_array(get_theme_roles('staff'), $user_roles);

    $leads_menu_class = ($obj->ID === $leads_id || $obj->ID === $new_lead_id ||  velesh_theme_posts::$lead === $obj->post_type || !$is_admin )? 'active' : '';

    $dashboard_menu_class = ($obj->ID === $dashboard_id)? 'active' : '';


    $show_add = ($obj->ID === (int)get_option('theme_page_leads') || $obj->ID === (int)$reception_id || $obj->ID === (int)$tco_id  || $obj->ID === (int)get_option('theme_page_create_leads') ||  $obj->post_type === velesh_theme_posts::$lead ) || !$is_admin ;

    $args = array(
      'leads_menu_class'     => $leads_menu_class,
      'reception_id'         => $reception_id,
      'tco_id'               => $tco_id,
      'dashboard_menu_class' => $dashboard_menu_class,
      'dashboard_url'        => get_permalink($dashboard_id),
      'lead_url'             => get_permalink($leads_id),
      'new_lead_url'             => get_permalink($new_lead_id),
      'reception_url'        => get_permalink($reception_id),
      'tco_url'              => get_permalink($tco_id),
      'photo_url'            => $photo_url,
      'name'                 => $name,
      'show_add'             => $show_add ,
      'is_admin'             =>  $is_admin,
      'is_staff'             =>  $is_staff,
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

    // define that it is a dashboard for a script

    wp_localize_script($theme_init->main_script_slug, 'is_dashboard', 'yes');

    // Get date range default
    $today          = new DateTime();
    $current_month  = $today->format('m');
    $current_year   = $today->format('Y');
    $today_formated = $today->format('M d Y');

    $days_30_before_today = new DateTime();
    $days_30_before_today = $days_30_before_today->modify('-30 days');
    $days_30_before_today_formatted = $days_30_before_today->format('M d Y');

    // Get leads by dates
    $leads = array();
    $leads = get_posts_by_dates( $days_30_before_today_formatted , $today_formated );
    $leads = get_leads_meta( $leads );

    wp_localize_script( $theme_init->main_script_slug , 'dashboard_leads_data' , $leads );

    $from_prev_period = new DateTime($days_30_before_today_formatted);
    $to_prev_period   = new DateTime($days_30_before_today_formatted);

    $to_prev_period->modify('-1 days');
    $from_prev_period->modify('-31 day');

    $to_prev_period_fromatted = $to_prev_period->format('M d Y');
    $from_prev_period_fromatted = $from_prev_period->format('M d Y');

    $leads_prev = array();
    $leads_prev = get_posts_by_dates( $from_prev_period_fromatted , $to_prev_period_fromatted );
    $leads_prev = get_leads_meta($leads_prev);

    wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_prev', $leads_prev);

    // prepare data for filters
    $filter_data = get_filters_by_leads( $leads );
    $filter_data_csv = get_filters_by_leads( $leads, true );

    wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data', $filter_data);
    wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data_csv', $filter_data_csv);

    $annual_income = get_annually_income();

    // get data for annual statistic
    wp_localize_script($theme_init->main_script_slug, 'income_month_data',  $annual_income );

    // get post for billed values
    $data_4_billed_revenue_period = get_billed_totals($days_30_before_today->format('Y-m-d H:i:s') , $today->format('Y-m-d H:i:s'));

     $data_4_billed_revenue_period_prev = get_billed_totals($from_prev_period->format('Y-m-d H:i:s') , $to_prev_period->format('Y-m-d H:i:s'));


    $_args = array(
      'post_type' => velesh_theme_posts::$lead,
      'include' => $data_4_billed_revenue_period['ids'],
      'posts_per_page' => -1,
    );

    $_args_prev = array(
      'posts_per_page' => -1,
      'post_type' => velesh_theme_posts::$lead,
      'include' => $data_4_billed_revenue_period_prev['ids'],
    );

    $billed_posts = get_posts( $_args );
    $billed_posts = get_leads_meta($billed_posts);
    $billed_posts_prev = get_posts( $_args_prev );
    $billed_posts_prev = get_leads_meta( $billed_posts_prev );

    wp_localize_script($theme_init->main_script_slug, 'billed_posts', $billed_posts);
    wp_localize_script($theme_init->main_script_slug, 'billed_posts_prev', $billed_posts_prev);
    wp_localize_script($theme_init->main_script_slug, '_from', $days_30_before_today->format('Y-m-d H:i:s'));
    wp_localize_script($theme_init->main_script_slug, '_to', $today->format('Y-m-d H:i:s'));

    $filter_items = array(
      'team',
      'clinics',
      'sources',
      'campaigns',
      'treatments',
      'dentists',
    );

    $args = array(
      'filter_items' => $filter_items,
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

      $start = microtime(true);

    // Get date range default

      $today = new DateTime();

      $current_month = $today->format('m');
      $current_year  = $today->format('Y');
      $today_formated = $today->format('M d Y');


      $days_30_before_today = new DateTime();
      $days_30_before_today = $days_30_before_today->modify('-30 days');
      $days_30_before_today_formatted = $days_30_before_today->format('M d Y');

      if(isset($_COOKIE['list_data_settings'])){
        $data = $_COOKIE['list_data_settings'];
        $data = str_replace('\\', '', $data );
        $data = json_decode($data);

        $today = new DateTime($data->_to);
        $today_formated = $today->format('M d Y');
        $days_30_before_today = new DateTime($data->_from);
        $days_30_before_today_formatted = $days_30_before_today->format('M d Y');
      }

    // Get leads by dates

      $leads = get_posts_by_dates( $days_30_before_today_formatted , $today_formated );

      $leads = get_leads_meta($leads);


    // prepare data for filters

      $filter_data = get_filters_by_leads( $leads );

    // get available stages


      $user = get_user_by('id', get_current_user_id());

      $user_name = theme_get_user_name($user);

      $user_id = get_current_user_id();

      $user_meta = get_userdata($user_id);

      $user_roles = $user_meta->roles;

      $stages = get_option('leads_stages');

      $theme_roles = get_theme_roles();

      if( in_array($theme_roles['reception'], $user_roles )){
        foreach ($stages as $id => $_stage) {
          if( $_stage['reception'] == 0 ){
            unset($stages[$id]);
          }
        }

        wp_localize_script($theme_init->main_script_slug, 'theme_user_role', 'reception' );
        $theme_user_role = 'reception';

      }else if( in_array($theme_roles['tco'], $user_roles )){
        foreach ($stages as $id => $_stage) {
          if( $_stage['tco'] == 0 ){
            unset($stages[$id]);
          }
        }
        wp_localize_script($theme_init->main_script_slug, 'theme_user_role', 'tco' );
        $theme_user_role = 'tco';
      }else{

        $reception_id = (int)get_option('theme_page_reception');
        $tco_id = (int)get_option('theme_page_tco');

        if(get_queried_object_id() == $reception_id ) {
          foreach ($stages as $id => $_stage) {
            if( $_stage['reception'] == 0 ){
              unset($stages[$id]);
            }
          }

          wp_localize_script($theme_init->main_script_slug, 'theme_user_role', 'reception' );
          $theme_user_role = 'reception';
        }else if(get_queried_object_id() == $tco_id ){
          foreach ($stages as $id => $_stage) {
            if( $_stage['tco'] == 0 ){
              unset($stages[$id]);
            }
          }
          wp_localize_script($theme_init->main_script_slug, 'theme_user_role', 'tco' );
          $theme_user_role = 'tco';
        }else{
          wp_localize_script($theme_init->main_script_slug, 'theme_user_role', 'all' );
           $theme_user_role = 'all';
        }

        $sms_data = get_option('message_data')?: false;
        wp_localize_script($theme_init->main_script_slug, 'sms_data',  $sms_data);
      }

      if(!$stages){
        echo '<div class="spacer-h-40"></div>';
        echo '<p class="text-center">No stages configured, Leads can not be ordered. Please Configure stages first</p>';
        return;
      }

      $is_manager = in_array('administrator', $user_roles) || in_array('manager', $user_roles) ? 'yes' : 'no';

      $args = array(
        'user_name'       => $user_name,
        'user_id'         => get_current_user_id(),
        'stages'          => $stages,
        'is_manager'      => $is_manager,
        'theme_user_role' => $theme_user_role,
        'daterange'       => array(
          'from' => $days_30_before_today_formatted,
          'to'   => $today_formated
        ),
      );

    print_theme_template_part('leads-list', 'globals', $args);


    wp_localize_script($theme_init->main_script_slug, 'theme_user_id', (string)$user_id );
    wp_localize_script($theme_init->main_script_slug, 'theme_user_name', (string)$user_name );
    wp_localize_script($theme_init->main_script_slug, 'is_lead_list', 'yes');
    wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data', $leads);
    wp_localize_script($theme_init->main_script_slug, 'dashboard_leads_data_filtered', $leads);
    wp_localize_script($theme_init->main_script_slug, 'dashboard_filter_data', $filter_data);
    wp_localize_script($theme_init->main_script_slug, 'failed_lead_name', get_converted_stages());
    wp_localize_script($theme_init->main_script_slug, 'converted_lead_name', get_converted_stages('string'));


    // data for single lead
    $stages_names = array();

    foreach ($stages as $key => $st) {
       $stages_names[] = $st['name'];
    }

    $clinics    = get_option('clinics_list');
    $treatments = get_option('treatments_list');
    $campaigns  = get_option('campaigns_list');
    $clinics    = $clinics ? $clinics: array();
    $treatments = $treatments ? $treatments: array();
    $campaigns  = $campaigns ? $campaigns: array();


    wp_localize_script($theme_init->main_script_slug, 'treatments', $treatments);
    wp_localize_script($theme_init->main_script_slug, 'stages', $stages_names);
    wp_localize_script($theme_init->main_script_slug, 'clinics', $clinics);
    wp_localize_script($theme_init->main_script_slug, 'campaigns', $campaigns);
    wp_localize_script($theme_init->main_script_slug, ' is_manager', $is_manager);



    $specialists_data           = array();
    $specialists_data_reception = array();
    $specialists_data_tco       = array();

    $clinics    = get_option('clinics_list');
    $treatments = get_option('treatments_list');
    $campaigns = get_option('campaigns_list');


    $users = theme_get_all_users(false, true);

    foreach ($users as $user_id => $user) {
      if(!in_array(get_theme_roles('staff'), $user['roles']) && !in_array(get_theme_roles('reception'), $user['roles'] )&& !in_array(get_theme_roles('tco'), $user['roles'] ) ) {continue;}

      $image    = (isset($user['image'])) ? $user['image'] : DUMMY_ADMIN;

      $position =  (isset($user['image'])) ?esc_html( $user['user_position']): false;

      $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];

      $specialists_data[$name] = array(
        'photo'     => $image,
        'position'  => $position,
        'user_id'   => $user_id,
        'name'      => $name,
        'show'      => 'no',
        'show_tco'  => 'no'
      );
    }

    wp_localize_script($theme_init->main_script_slug, 'specialists_data', $specialists_data);

    wp_localize_script($theme_init->main_script_slug, 'specialists', array_keys($specialists_data));


    $converted_stages  = get_converted_stages();
    $failed_stage_name = get_failed_stage_name();

    wp_localize_script($theme_init->main_script_slug, 'converted_stages', $converted_stages);
    wp_localize_script($theme_init->main_script_slug, 'failed_stage_name', $failed_stage_name);

    $available_dentists = array();
    $available_staff = array();
    $staff_roles = array(get_theme_roles('staff'), 'manager', 'administrator');
    $dentists_roles = array(get_theme_roles('dentist'));

    foreach ( $users as $user_id => $user) {

     $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];


      if(count(array_intersect($staff_roles, $user['roles'])) > 0){
          $available_staff[] = $name;
      }

      if(count(array_intersect($dentists_roles, $user['roles'])) > 0){
          $available_dentists[] = $name;
      }
    }

    wp_localize_script($theme_init->main_script_slug, 'available_dentists', $available_dentists);
    wp_localize_script($theme_init->main_script_slug, 'available_staff', $available_staff);

    $user = wp_get_current_user();

    clog('print_lead_list: '.round(microtime(true) - $start, 4).' сек.' , 'blue');
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

    // defines a type of a lead
    $lead_type  = array('class' => 'opened', 'text' => 'Opened Lead');
    $lead_type = (in_array( $lead_stage, $converted_stages ))? array('class' => 'converted', 'text' => 'Converted Lead'): $lead_type;

    $lead_type = in_array($lead_stage, get_failed_stage_name())? array('class' => 'failed', 'text' => 'Failed Lead'): $lead_type;

    // get current user data
    $user      = get_user_by('id', get_current_user_id());
    $user_name =  theme_get_user_name($user);


    // gets lead logs, notes and files
    $lead_notes = array();
    $lead_notes_tco = array();
    $lead_files = array();
    $_lead_notes = get_post_meta($lead->ID, '_lead_notes', true);
    $_lead_notes_tco = get_post_meta($lead->ID, '_lead_notes_tco', true);
    $_lead_files = get_post_meta($lead->ID, '_lead_files', true);
    $lead_logs   = get_post_meta($lead->ID, '_lead_log', true);

    $args = array(
        'role'    => get_theme_roles('dentist'),
        'orderby' => 'user_nicename',
        'order'   => 'ASC'
    );



    if(!$lead_logs){
      $lead_logs = array();
    }

    if($_lead_notes){
      foreach ($_lead_notes as $key => $n) {

        if(!isset($n['show'])){
          $n['show'] = 1;
        }

        $lead_notes[] = $n;
      }
    }

    if($_lead_notes_tco){
      foreach ($_lead_notes_tco as $key => $n) {

        if(!isset($n['show'])){
          $n['show'] = 1;
        }

        $lead_notes_tco[] = $n;
      }
    }

    if($_lead_files){
      foreach ($_lead_files as $key => $n) {
        $lead_files[] = $n;
      }
    }

    // get assigned specialists data

    $specialists_assigned     = get_post_meta($lead->ID, '_lead_specialists', true);
    $specialists_assigned_tco = get_post_meta($lead->ID, '_lead_specialists_tco', true);
    $treatment_data           = get_post_meta($lead->ID, '_treatment_data', true);

    $treatment_data           = $treatment_data?: array();

    $users = theme_get_all_users(false, true);

    $available_dentists = array();
    $available_staff = array();
    $staff_roles = array(get_theme_roles('staff'), 'manager', 'administrator');

    if(get_theme_roles('reception')){
      $staff_roles[] = get_theme_roles('reception');
    }

    if(get_theme_roles('tco')){
      $staff_roles[] = get_theme_roles('tco');
    }

    $dentists_roles = array(get_theme_roles('dentist'));

    foreach ( $users as $user_id => $user) {

     $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];


      if(count(array_intersect($staff_roles, $user['roles'])) > 0){
          $available_staff[] = $name;
      }

      if(count(array_intersect($dentists_roles, $user['roles'])) > 0){
          $available_dentists[] = $name;
      }
    }

    $specialists_data           = array();
    $specialists_data_reception = array();
    $specialists_data_tco       = array();

    $clinics    = get_option('clinics_list');
    $treatments = get_option('treatments_list');
    $campaigns  = get_option('campaigns_list');


    foreach ($users as $user_id => $user) {
      if(!in_array(get_theme_roles('staff'), $user['roles']) && !in_array(get_theme_roles('tco'), $user['roles']) && !in_array(get_theme_roles('reception'), $user['roles'])){continue;}

      $image    = (isset($user['image'])) ? $user['image'] : DUMMY_ADMIN;

      $position =  (isset($user['image'])) ?esc_html( $user['user_position']): false;

      $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];

      $specialists_data[$name] = array(
        'photo'     => $image,
        'position'  => $position,
        'user_id'   => $user_id,
        'name'      => $name,
        'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
        'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
      );

      if(in_array(get_theme_roles('staff'), $user['roles']) || in_array(get_theme_roles('reception'), $user['roles'])){

        $specialists_data_reception[$name] = array(
          'photo'     => $image,
          'position'  => $position,
          'user_id'   => $user_id,
          'name'      => $name,
          'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
          'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
        );
      }
      if(in_array(get_theme_roles('staff'), $user['roles']) || in_array(get_theme_roles('tco'), $user['roles'])){

        $specialists_data_tco[$name] = array(
          'photo'     => $image,
          'position'  => $position,
          'user_id'   => $user_id,
          'name'      => $name,
          'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
          'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
        );
      }
    }

    // get other leads info
    $leads_id          = (int)get_option('theme_page_leads');
    $lead_created_time = new DateTime($lead->post_date);

    $user_id = get_current_user_id();

    // $user_meta=get_userdata($user_id);

    $user_roles =$users[$user_id]['roles'];


    $treatment_coordinator = get_post_meta($lead->ID, '_treatment_coordinator', true);

    if(isset($treatment_coordinator['specialist']) && $treatment_coordinator['specialist']){
      foreach ($treatment_coordinator['specialist'] as $key => $value) {
        if(!$value || empty($value)){
          unset($treatment_coordinator['specialist'][$key]);
        }
      }
      $assigned_dentists = $treatment_coordinator['specialist'];

    }else{
      $assigned_dentists = array();
    }

    $treatment_value = get_post_meta($lead->ID, '_treatment_value', true);

    if(isset($treatment_value['treatment'])){
      foreach ($treatment_value['treatment'] as $key => $value) {
        if(!$value || $value==='--Select--' || empty($value)){
          unset($treatment_value['treatment'][$key]);
         }
      }

      $assigned_treatments = $treatment_value['treatment'];
    }else{
      $assigned_treatments = array();
    }

    $stages = get_option('leads_stages');

    $args = array(
      'treatment_coordinator' => $treatment_coordinator,
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

      'can_delete' => in_array('administrator', $user_roles) || in_array('manager', $user_roles) ,
    );

    $clinics = $clinics ? $clinics: array();
    $treatments = $treatments ? $treatments: array();
    $campaigns = $campaigns ? $campaigns: array();

    $stages_names = array();

    foreach ($stages as $key => $st) {
       $stages_names[] = $st['name'];
    }

    $message_count = get_post_meta($lead->ID, '_message_count', true);
    $message_count = ($message_count) ? $message_count : 0;

    $phone_count_tco       = get_post_meta($lead->ID, '_phone_count_tco', true);
    $message_count_tco     = get_post_meta($lead->ID, '_message_count_tco', true);
    $sms_count_tco         = get_post_meta($lead->ID, '_sms_count_tco', true);

    $phone_count_tco = ($phone_count_tco) ? $phone_count_tco : 0;
    $message_count_tco = ($message_count_tco) ? $message_count_tco : 0;
    $sms_count_tco = ($sms_count_tco) ? $sms_count_tco : 0;

    $is_manager = in_array('administrator', $user_roles) || in_array('manager', $user_roles) ? 'yes' : 'no';
    wp_localize_script($theme_init->main_script_slug, ' is_manager', $is_manager);
    wp_localize_script($theme_init->main_script_slug, 'stages', $stages_names);
    wp_localize_script($theme_init->main_script_slug, 'clinics', $clinics);
    wp_localize_script($theme_init->main_script_slug, 'campaigns', $campaigns);

    $phone_count = get_post_meta($lead->ID, '_phone_count', true);
    $phone_count = ($phone_count) ? $phone_count : 0;


    $meta = get_post_meta($lead->ID, '_patient_data', true);

    $date_start = $lead->post_date;

    if(isset($meta['date_time'])){
      $parts = explode('at',  $meta['date_time'] );
      $date_planned = new DateTime(  implode(' ', $parts));
      $date_start   =  $date_planned->format('Y-m-d H:i:s');
    }


    $user = wp_get_current_user();

    if(in_array(get_theme_roles('dentist'), $user->roles)){
      $last_name  = get_user_meta($user->ID, 'last_name', true);
      $first_name = get_user_meta($user->ID, 'first_name', true);
      $nickname   = get_user_meta($user->ID, 'nickname', true);

      $name        = $last_name  || $first_name ? trim ( $first_name  . ' ' . $last_name ) :    $nickname;

       wp_localize_script($theme_init->main_script_slug, 'is_dentist', 'yes');
       wp_localize_script($theme_init->main_script_slug, 'dentist_name', $name  );
    }else{
       wp_localize_script($theme_init->main_script_slug, 'is_dentist', 'no');

    }

    wp_localize_script($theme_init->main_script_slug, 'phone_count', (string)$phone_count);
    wp_localize_script($theme_init->main_script_slug, 'phone_count_tco', (string)$phone_count_tco);
    wp_localize_script($theme_init->main_script_slug, 'message_count',  (string)$message_count);
    wp_localize_script($theme_init->main_script_slug, 'message_count_tco', (string)$message_count_tco);
    wp_localize_script($theme_init->main_script_slug, 'sms_count_tco',  (string)$sms_count_tco);
    wp_localize_script($theme_init->main_script_slug, 'available_dentists', $available_dentists);
    wp_localize_script($theme_init->main_script_slug, 'assigned_dentists', $assigned_dentists);
    wp_localize_script($theme_init->main_script_slug, 'assigned_treatments', $assigned_treatments);
    wp_localize_script($theme_init->main_script_slug, 'treatments', $treatments);
    wp_localize_script($theme_init->main_script_slug, 'is_single_lead', 'yes');
    wp_localize_script($theme_init->main_script_slug, 'treatment_data', $treatment_data);

    wp_localize_script($theme_init->main_script_slug, 'lead_notes', $lead_notes);
    wp_localize_script($theme_init->main_script_slug, 'lead_notes_tco', $lead_notes_tco);
    wp_localize_script($theme_init->main_script_slug, 'specialists_data', $specialists_data);
    wp_localize_script($theme_init->main_script_slug, 'specialists', array_keys($specialists_data_reception));
    wp_localize_script($theme_init->main_script_slug, 'specialists_tco', array_keys($specialists_data_tco));
    wp_localize_script($theme_init->main_script_slug, 'lead_files', $lead_files);
    wp_localize_script($theme_init->main_script_slug, 'lead_logs',  $lead_logs);
    wp_localize_script($theme_init->main_script_slug, 'date_start',  $date_start);

    $sources = get_option('sources_list');
    if (get_option('add_dentists_to_sources') == 'yes') {
      $sources = array_merge($sources,$available_dentists );
    }

    if(is_array($sources )){

      $sources = array_unique($sources);

      foreach ($sources as $key => $value) {
        if(!$value){
          unset($sources[$key]);
        }
      }
    }

    wp_localize_script($theme_init->main_script_slug, 'theme_leads_sources',  $sources
     );

    $sms_data = get_option('message_data')?: false;

    wp_localize_script($theme_init->main_script_slug, 'sms_data',  $sms_data);

    print_theme_template_part('lead-single2', 'globals', $args);
  }


   /**
   /* prints a content of a form for a creation of a lead
   */
  public static function print_lead_content_blank(){
    global $theme_init;
    $sms_data = get_option('message_data')?: false;

    wp_localize_script($theme_init->main_script_slug, 'sms_data',  $sms_data);

    // get current user data
    $user      = get_user_by('id', get_current_user_id());
    $user_name =  theme_get_user_name($user);

    $lead_created_time = new DateTime();
    $leads_id     = (int)get_option('theme_page_leads');

    // get assigned specialists data

    $user_id = get_current_user_id();

    $user_meta=get_userdata($user_id);

    $user_roles = $user_meta->roles;

    $is_manager = in_array('administrator', $user_roles) || in_array('manager', $user_roles) ? 'yes' : 'no';


    $specialists_data = array();
    $users            = theme_get_all_users(false, true);

    foreach ($users as $user_id => $user) {
      if(!in_array(get_theme_roles('staff'), $user['roles']) && !in_array(get_theme_roles('tco'), $user['roles']) && !in_array(get_theme_roles('reception'), $user['roles'])){continue;}

      $image    = (isset($user['image'])) ? $user['image'] : DUMMY_ADMIN;

      $position =  (isset($user['image'])) ?esc_html( $user['user_position']): false;

      $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];

      $specialists_data[$name] = array(
        'photo'     => $image,
        'position'  => $position,
        'user_id'   => $user_id,
        'name'      => $name,
        'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
        'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
      );

      if(in_array(get_theme_roles('staff'), $user['roles']) || in_array(get_theme_roles('reception'), $user['roles'])){

        $specialists_data_reception[$name] = array(
          'photo'     => $image,
          'position'  => $position,
          'user_id'   => $user_id,
          'name'      => $name,
          'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
          'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
        );
      }
      if(in_array(get_theme_roles('staff'), $user['roles']) || in_array(get_theme_roles('tco'), $user['roles'])){

        $specialists_data_tco[$name] = array(
          'photo'     => $image,
          'position'  => $position,
          'user_id'   => $user_id,
          'name'      => $name,
          'show'      => isset($specialists_assigned[$user_id]) && 'yes' === $specialists_assigned[$user_id]? 'yes' : 'no',
          'show_tco'  => isset($specialists_assigned_tco[$user_id]) && 'yes' === $specialists_assigned_tco[$user_id]? 'yes' : 'no'
        );
      }
    }

    clog(get_theme_roles());


    $staff_roles = array(get_theme_roles('staff'), 'manager', 'administrator');

    if(get_theme_roles('reception')){
      $staff_roles[] = get_theme_roles('reception');
    }

    if(get_theme_roles('tco')){
      $staff_roles[] = get_theme_roles('tco');
    }

    $dentists_roles = array(get_theme_roles('dentist'));


    foreach ( $users as $user_id => $user) {

     $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];


      if(count(array_intersect($staff_roles, $user['roles'])) > 0){
          $available_staff[] = $name;
      }

      if(count(array_intersect($dentists_roles, $user['roles'])) > 0){
          $available_dentists[] = $name;
      }
    }



    $stages = get_option('leads_stages');

    $args = array(
      'treatment_coordinator' => array(),
      'treatment_value'       => array(),
      'patient_data'          => array(),
      'reminder'              => '',
      'lead_stage'            => $stages[0]['name'],
      'lead_type'             => array('class' => 'opened', 'text' => 'New Lead'),
      'lead_id'               => -1,
      'user_name'             => $user_name,
      'user_id'               => get_current_user_id(),
      'return_url'            => get_permalink($leads_id),
      'text_save_btn'         => 'Create Lead',
      'text_save_del'         => 'Cancel',
      'time_lead_created'     => $lead_created_time->format('d M Y') . ' at '. $lead_created_time->format('H:i'),
      'can_delete' => false,
    );

    $clinics = get_option('clinics_list');
    $treatments = get_option('treatments_list');
    $campaigns = get_option('campaigns_list');

    $clinics = $clinics ? $clinics: array();
    $treatments = $treatments ? $treatments: array();
    $campaigns = $campaigns ? $campaigns: array();


    $assigned_treatments = array();
    $assigned_dentists  = array();

    wp_localize_script($theme_init->main_script_slug, 'assigned_treatments', $assigned_treatments);

    wp_localize_script($theme_init->main_script_slug, 'assigned_dentists ', $assigned_dentists );

    wp_localize_script($theme_init->main_script_slug, 'campaigns', $campaigns);
    wp_localize_script($theme_init->main_script_slug, 'is_manager', $is_manager);


    $stages_names = array();

    foreach ($stages as $key => $st) {
       $stages_names[] = $st['name'];
    }


    $user = wp_get_current_user();

    if(in_array('dentist', $user->roles)){
      $last_name  = get_user_meta($user->ID, 'last_name', true);
      $first_name = get_user_meta($user->ID, 'first_name', true);
      $nickname   = get_user_meta($user->ID, 'nickname', true);

      $name        = $last_name  || $first_name ? trim ( $first_name  . ' ' . $last_name ) :    $nickname;

       wp_localize_script($theme_init->main_script_slug, 'is_dentist', 'yes');
       wp_localize_script($theme_init->main_script_slug, 'dentist_name', $name  );
    }else{
       wp_localize_script($theme_init->main_script_slug, 'is_dentist', 'no');

    }

    wp_localize_script($theme_init->main_script_slug, 'stages', $stages_names);
    wp_localize_script($theme_init->main_script_slug, 'clinics', $clinics);

    wp_localize_script($theme_init->main_script_slug, 'treatment_data', array());
    wp_localize_script($theme_init->main_script_slug, 'treatments', $treatments);

    wp_localize_script($theme_init->main_script_slug, 'phone_count', [0]);
    wp_localize_script($theme_init->main_script_slug, 'phone_count_tco', [0]);
    wp_localize_script($theme_init->main_script_slug, 'message_count', [0]);
    wp_localize_script($theme_init->main_script_slug, 'message_count_tco', [0]);
    wp_localize_script($theme_init->main_script_slug, 'sms_count_tco', [0]);

    wp_localize_script($theme_init->main_script_slug, 'is_single_lead', 'yes');
    wp_localize_script($theme_init->main_script_slug, 'lead_notes', array());
    wp_localize_script($theme_init->main_script_slug, 'lead_notes_tco', array());
    wp_localize_script($theme_init->main_script_slug, 'specialists_data', $specialists_data);
    wp_localize_script($theme_init->main_script_slug, 'specialists', array_keys($specialists_data_reception));
    wp_localize_script($theme_init->main_script_slug, 'specialists_tco', array_keys($specialists_data_tco));
    wp_localize_script($theme_init->main_script_slug, 'lead_files', array());
    wp_localize_script($theme_init->main_script_slug, 'lead_logs',  array());
    wp_localize_script($theme_init->main_script_slug, 'available_dentists', $available_dentists);


    $date_start =new DateTime();

    $date_start = $date_start->format('Y-m-d H:i:s');

    wp_localize_script($theme_init->main_script_slug, 'date_start',  $date_start);

    $sources = get_option('sources_list');


    if (get_option('add_dentists_to_sources') == 'yes') {
      $sources = array_merge($sources,$available_dentists );
    }


    $sources = array_unique($sources);

    foreach ($sources as $key => $value) {
      if(!$value){
        unset($sources[$key]);
      }
    }
    wp_localize_script($theme_init->main_script_slug, 'theme_leads_sources',  $sources
     );
    print_theme_template_part('lead-single2', 'globals', $args);
  }


  public static function print_login_form(){

    $args = array();
    print_theme_template_part('login-form', 'globals', $args);
  }


  public static function print_debug_info(){

    if(!THEME_DEBUG){
      return false;
    }

    // print_theme_template_part('debug-window','globals', array());
  }
}