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