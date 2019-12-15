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

if(!class_exists('theme_ajax_action')){

  class theme_ajax_action{

    public function __construct(){

      // login action
      add_action('wp_ajax_get_leads_by_dates', array($this, 'get_leads_by_dates_cb'));
      add_action('wp_ajax_nopriv_get_leads_by_dates', array($this, 'get_leads_by_dates_cb'));

      //
      add_action('wp_ajax_update_leads_list', array($this, 'update_leads_list_cb'));
      add_action('wp_ajax_nopriv_update_leads_list', array($this, 'update_leads_list_cb'));


      add_action('wp_ajax_update_leads_order', array($this, 'update_leads_order_cb'));
      add_action('wp_ajax_nopriv_update_leads_order', array($this, 'update_leads_order_cb'));

      add_action('wp_ajax_upload_new_document', array($this, 'upload_new_document_cb'));
      add_action('wp_ajax_nopriv_upload_new_document', array($this, 'upload_new_document_cb'));

      add_action('wp_ajax_delete_file_from_lead', array($this, 'delete_file_from_lead_cb'));
      add_action('wp_ajax_nopriv_delete_file_from_lead', array($this, 'delete_file_from_lead_cb'));

      add_action('wp_ajax_update_lead_meta', array($this, 'update_lead_meta_cb'));
      add_action('wp_ajax_nopriv_update_lead_meta', array($this, 'update_lead_meta_cb'));


      add_action('wp_ajax_update_leads_log', array($this, 'update_leads_log_cb'));
      add_action('wp_ajax_nopriv_update_leads_log', array($this, 'update_leads_log_cb'));


      add_action('wp_ajax_delete_lead', array($this, 'delete_lead_cb'));
      add_action('wp_ajax_nopriv_delete_lead', array($this, 'delete_lead_cb'));
    }

    /**
    * deletes a lead
    */
    public function delete_lead_cb(){
      $verify =  wp_verify_nonce(  $_POST['nonce'], 'update_meta_nonce_id' );

      if(!$verify){
        wp_send_json_error(array('Nonce field check failed'), 418);
      }

      $post_id = (int)$_POST['lead_id'];

      wp_delete_post( $post_id , true );

      wp_send_json(array('redirect' => $_POST['url']));
    }


    /**
    * adds an action log for a lead
    */
    public function update_leads_log_cb(){
      $post_id = (int)$_POST['post_id'];
      $post = get_post($post_id);
      $meta    = get_post_meta($post_id, '_lead_log', true);

      if(!$meta){
        $meta = array();
      }

      $data_to_save = false;

      switch($_POST['event']){
        case "stage_changed":
          $date_passed    = $_POST['date'];
          $date_prev_str  = (isset($meta[count($meta) - 1]))? $meta[count($meta) - 1]['date'] : $post->post_date;

          $date           = new DateTime($date_passed);
          $date_prev      = new DateTime($date_prev_str);
          $diff           = date_diff($date, $date_prev );

          $data_to_save = array(
            'text' => 'Moved from '. $_POST['list_id_prev']. ' to '. $_POST['list_id_new'] . ' by ' . $_POST['user_name'],
            'date_formatted' => $date->format('d M Y') . ' at '. $date->format('H:i'),
            'date'           => $_POST['date'],
            'user_name'      => $_POST['user_name'],
            'user_id'        => $_POST['user_id'],
            'time_passed'    => $diff->format('%dd %hh %is'),
          );

          array_push($meta, $data_to_save);
          break;

        case 'specialist_updated':
          $date_passed    = $_POST['date'];
          $date_prev_str  = (isset($meta[count($meta) - 1]))? $meta[count($meta) - 1]['date'] : $post->post_date;

          $date           = new DateTime($date_passed);
          $date_prev      = new DateTime($date_prev_str);
          $diff           = date_diff($date, $date_prev );

          $data_to_save = array(
            'text' => $_POST['text'],
            'date_formatted' => $date->format('d M Y') . ' at '. $date->format('H:i'),
            'date'           => $_POST['date'],
            'user_name'      => $_POST['user_name'],
            'user_id'        => $_POST['user_id'],
            'time_passed'    => $diff->format('%dd %hh %is'),
          );
          array_push($meta, $data_to_save);
          break;
      }

      if(!$data_to_save){
        wp_send_json_error(array('message' => 'failed to save'), 418);
      }

      if(!update_post_meta($post_id, '_lead_log', $meta)){
        add_post_meta( $post_id, '_lead_log', $meta, true );
      }

      wp_send_json(array('result' => 'success', 'logs' => $meta));
    }

    /**
    * updates a leads meta
    */
    public function update_lead_meta_cb(){

      $verify =  wp_verify_nonce(  $_POST['nonce'], 'update_meta_nonce_id' );

      if(!$verify){
        wp_send_json_error(array('Nonce field check failed'), 418);
      }


      $meta = $_POST['meta'];

      $post_id = (int)$_POST['lead_data']['lead_id'];

      if($post_id < 0){
        $_name = array($meta['patient_data']['name'], $meta['patient_data']['treatment'],$meta['patient_data']['clinic']);

        $name = array();

        foreach ($_name as $key => $n) {
          if(trim($n)){
            array_push($name, $n);
          }
        }

        $name_str = implode(' - ', $name);

        $date = new DateTime();

        $post_data = array(
          'post_title'    =>  $name_str,
          'post_content'  => '',
          'post_status'   => 'publish',
          'post_author'   => 1,
          'post_type'     => velesh_theme_posts::$lead,
          'post_date'     => $date->format('Y-m-d H:i:s'),
        );


        if( $name_str ){
          $post_id = wp_insert_post( $post_data );
          $meta['patient_data']['date_time'] = $date->format('d M Y'). ' at '. $date->format('H:i');
        }else{
          wp_send_json_error(array('no data passed'), 418);
        }
      }

      $sourses = array(
        'Live Chat'  => 'live-chat',
        'Instagram'  => 'instagram',
        'Google PPC' => 'google-ppc',
        'Website'    => 'website',
        'Phone'      => 'phone',
        'Walk In'    => 'walk-in',
        'Other'      => 'other',
      );

      if(isset($meta['treatment_value'])){
        $meta['treatment_value']['value'] =  price_to_number($meta['treatment_value']['value']);
      }

      if(isset($meta['patient_data'])){
        $meta['patient_data']['sourse']   = $sourses[$meta['patient_data']['sourse']];
      }

      foreach ($meta as $meta_key => $data) {
        $key = '_'.$meta_key;


        if(isset($meta['lead_specialists'])){

          foreach ($meta['lead_specialists'] as $user_id => $assigned) {
            $assigned_posts = get_the_author_meta('_leads_assigned',  $user_id);

            if(!$assigned_posts){
              $assigned_posts = [];
            }

            if(!in_array($post_id, $assigned_posts) && 'yes' === $assigned){
              array_push($assigned_posts, $post_id);
            }

            if('no' === $assigned){
              $assigned_key = array_search($post_id, $assigned_posts);
              if($assigned_key){
                array_splice($assigned_posts, $assigned_key, 1);
              }
            }

            if(!update_user_meta( $user_id, '_leads_assigned', $assigned_posts )){
              add_user_meta( $user_id, '_leads_assigned', $assigned_posts );
            }
          }

        }

        if(!update_post_meta($post_id,  $key, $data)){
          $removed = add_post_meta( $post_id,  $key, $data, true );
        }
      }

      $meta['post_id'] = $post_id;
      $meta['POST'] = $_POST;

      wp_send_json($meta);
    }


    public function delete_file_from_lead_cb(){
      $post_id = (int)$_POST['lead_id'];
      $file_id = (int)$_POST['file_id'];
      $lead_files = get_post_meta($post_id, '_lead_files', true);

      foreach ($lead_files as $key => $file) {
        if($file['file_id'] === $_POST['file_data']['file_id']){
          if(file_exists( $file['path'] )){
            unlink($file['path']);
          }
          unset($lead_files[$key]);
        }
      }

      $removed = 'yes';
      if(count($lead_files) > 0){
        if(!update_post_meta($post_id, '_lead_files', $lead_files)){
          $removed = add_post_meta( $post_id, '_lead_files', $lead_files, true );
        }
      }else{
        $removed = delete_post_meta( $post_id, '_lead_files');
      }

      wp_send_json( $removed );
    }


    public function upload_new_document_cb(){
      $upload = exec_upload_file('file');
      $upload['post'] = $_POST;
      $verify =  wp_verify_nonce(  $_POST['file_nonce'], 'upload_file_nonce_id' );
      $upload['verify'] = $verify;

      if(!$verify || $verify > 1 ){
        wp_send_json_error(array('Nonce field check failed'), 418);
      }

     if(isset($upload['error'])){
        wp_send_json_error($upload['error'], 418);
      }else{
        $post_id = (int)$_POST['lead_id'];

        $lead_files = get_post_meta($post_id, '_lead_files', true);

        if(!$lead_files){
          $lead_files = array();
        }

        $date = new DateTime();

        $date_formatted = $date->format('j M Y').' at '.  $date->format('H:i');

        $file_data = array(
          'file_id' => md5($upload['file']['name']).md5( $date_formatted ),
          'name' => $upload['file']['name'],
          'type' => $upload['file']['type'],
          'url'  => $upload['file_loaded']['url'],
          'path' => $upload['file_loaded']['file'],
          'date' => $date_formatted ,
          'date_not_formatted' => $date->format('j M Y H:i'),
          'user' => $_POST['user_name'],
        );

        array_push($lead_files, $file_data );

        if(!update_post_meta($post_id, '_lead_files', $lead_files)){
          add_post_meta( $post_id, '_lead_files', $lead_files, true );
        }

        $upload['meta']      = $lead_files;
        $upload['file_data'] = $file_data;
        wp_send_json($upload);
      }
    }


    public function update_leads_order_cb(){

      $result = array();

      foreach ($_POST['order'] as $key => $data) {
        $update = update_post_meta(  (int)$data['post_id'] , '_lead_order', $data['order'] );

        if(!$update){
         $update = add_post_meta( (int)$data['post_id'] , '_lead_order', $data['order'] );
        }

         $result[] = $update;
      }

      wp_send_json($result);
    }


    public static function update_leads_list_cb(){

      $post_id = (int)$_POST['post_id'];
      $post_id = (int)$_POST['post_id'];

      if( !isset( $_POST['post_id'] ) || !isset( $_POST['list_id']) ){
        wp_send_json(array('success' => false));
      }

      $update = update_post_meta(  $post_id , '_lead_stage', $_POST['list_id'] );

      if(!$update){
       $update = add_post_meta(  $post_id , '_lead_stage',  $_POST['list_id'] );
      }

      wp_send_json(array('success' => $update));
    }


    public static function get_leads_by_dates_cb(){
      define('DOING_AJAX', true);

      $from = new DateTime($_POST['from']);
      $to = new DateTime($_POST['to']);

      $from_formated = $from->format('M d Y');
      $to_formated   = $to->format('M d Y');

      $leads = get_posts_by_dates($from_formated , $to_formated );

      $leads = get_leads_meta($leads);

      $team_perfomance = get_users_leads($from_formated , $to_formated);

    // prepare data for filters

      $filter_data = get_filters_by_leads( $leads );

      wp_send_json(array(
        'leads'         => $leads,
        'filter_data'   => $filter_data,
        'from_formated' => $from_formated,
        'to_formated'   => $to_formated,
        'team_perfomance'   => $team_perfomance,
      ) );
    }
  }
}

new theme_ajax_action();