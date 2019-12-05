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