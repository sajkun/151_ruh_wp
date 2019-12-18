<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
* Theme helper functions
*
* @package theme/helpers
*/

if(!function_exists('clog')){
  /**
 * prints an inline script with output in console
 *
 * @param mixed $content - obj|array|string
 */
  function clog($content){
    echo '<script> console.log(';
    echo json_encode($content);
    echo ')</script>';
  }
}

if(!function_exists('dlog')){

  /**
 * prints an inline script with output in console
 *
 * @param mixed $content - obj|array|string
 */
  function dlog($content, $start=false, $end=false){
    if(THEME_DEBUG === true && (!defined('DOING_AJAX'))){

      if ($start) {
        printf( '<script> console.groupCollapsed("%s")</script>', $content);
      }
      else{
        echo '<script> console.log(';
        echo json_encode($content);
        echo ')</script>';
      }

      if ($end) {
        echo '<script> console.groupEnd()</script>';
      }
    }
  }
}


if(!function_exists('my_upload_dir')){

  /**
  * modifies upload url and path
  *
  * @param $upload - array
  */
  function my_upload_dir($upload) {

    $upload['subdir'] = '/documents' . $upload['subdir'];

    $upload['path']   = $upload['basedir'] . $upload['subdir'];

    $upload['url']    = $upload['baseurl'] . $upload['subdir'];

    return $upload;
  }
}


if(!function_exists('add_svg_sprite')){
  function add_svg_sprite($slug = '', $url = THEME_URL.'/assets/sprite_svg/symbol_sprite.html'){
    $name_symbol = 'inlineSVGrev_'.$slug;
    $name_data = 'inlineSVGdata_'.$slug;
    echo "<script> ( function( window, document ) {var file = '".$url."', revision = 1; if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ){return true; }; var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null, request, data, insertIT = function() {document.body.insertAdjacentHTML( 'afterbegin', data ); }, insert = function() {if( document.body ) insertIT(); else document.addEventListener( 'DOMContentLoaded', insertIT )}; if( isLocalStorage && localStorage.getItem( '".$name_symbol."' ) == revision ) {data = localStorage.getItem( '".$name_data."' ); if( data ) {insert(); return true; } }; try {request = new XMLHttpRequest(); request.open( 'GET', file, true ); request.onload = function(){if( request.status >= 200 && request.status < 400 ) {data = request.responseText; insert(); if( isLocalStorage ) {localStorage.setItem( '".$name_data."',  data ); localStorage.setItem( '".$name_symbol."', revision ); } } }; request.send(); }catch( e ){}; }( window, document ) ); </script>";
  }
}


if(!function_exists('print_inline_style')){
  /**
  *  prints an inline javascript.
  *  script adds styles to local storage
  *
  * @param $url - url of script
  * @param $script name - name of a script
  */
  function print_inline_style($url, $script_name){
    $script_name = str_replace('-', '_', $script_name);
    $script = sprintf(' (function(){function add_inline_%1$s() {var style = document.createElement(\'style\'); style.rel = \'stylesheet\'; document.head.appendChild(style); style.textContent = localStorage.%1$s; };
      var image_url = "%3$s"; var exp  = new RegExp("..\/images", "gi"); try {if (localStorage.%1$s) {add_inline_%1$s(); } else {var request = new XMLHttpRequest(); request.open(\'GET\', \'%2$s\', true); request.onload = function() {if (request.status >= 200 && request.status < 400) {var text =  request.responseText; text = text.replace(exp, image_url); localStorage.%1$s = text; add_inline_%1$s(); } }; request.send(); } } catch(ex) {} }());', $script_name, $url, THEME_URL.'/images/');

    printf('<script>%s</script>',$script);
  }
}


if(!function_exists('print_theme_template_part')){
  /**
  *  prints an inline javascript.
  *  script adds styles to local storage
  *
  * @param $url - url of script
  * @param $script name - name of a script
  */
  function print_theme_template_part($template_name,  $template_path, $args = array()){

    if(!empty($template_name) && ($template_path) ){
      extract($args);
      include(THEME_PATH.'/theme_templates/'. $template_path . '/'.'template-'. $template_name .'.php');
    }
  }
}



if(!function_exists('theme_minify_js')){

  /**
  * JavaScript Minifier
  *
  * @param string of javascript
  *
  * @return $string
  */
  function theme_minify_js($input) {
      if(trim($input) === "") return $input;
      return preg_replace(
          array(
              // Remove comment(s)
              '#\s*("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')\s*|\s*\/\*(?!\!|@cc_on)(?>[\s\S]*?\*\/)\s*|\s*(?<![\:\=])\/\/.*(?=[\n\r]|$)|^\s*|\s*$#',
              // Remove white-space(s) outside the string and regex
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/)|\/(?!\/)[^\n\r]*?\/(?=[\s.,;]|[gimuy]|$))|\s*([!%&*\(\)\-=+\[\]\{\}|;:,.<>?\/])\s*#s',
              // Remove the last semicolon
              '#;+\}#',
              // Minify object attribute(s) except JSON attribute(s). From `{'foo':'bar'}` to `{foo:'bar'}`
              '#([\{,])([\'])(\d+|[a-z_][a-z0-9_]*)\2(?=\:)#i',
              // --ibid. From `foo['bar']` to `foo.bar`
              '#([a-z0-9_\)\]])\[([\'"])([a-z_][a-z0-9_]*)\2\]#i'
          ),
          array(
              '$1',
              '$1$2',
              '}',
              '$1$3',
              '$1.$3'
          ),
      $input);
  }
}


if(!function_exists('minify_css')){

  /**
  * CSS Minifier
  *
  * @param string of javascript
  *
  * @return $string
  */
  function minify_css($input) {
      if(trim($input) === "") return $input;
      return preg_replace(
          array(
              // Remove comment(s)
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
              // Remove unused white-space(s)
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
              // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
              '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
              // Replace `:0 0 0 0` with `:0`
              '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
              // Replace `background-position:0` with `background-position:0 0`
              '#(background-position):0(?=[;\}])#si',
              // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
              '#(?<=[\s:,\-])0+\.(\d+)#s',
              // Minify string value
              '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
              '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
              // Minify HEX color code
              '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
              // Replace `(border|outline):none` with `(border|outline):0`
              '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
              // Remove empty selector(s)
              '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
          ),
          array(
              '$1',
              '$1$2$3$4$5$6$7',
              '$1',
              ':0',
              '$1:0 0',
              '.$1',
              '$1$3',
              '$1$2$4$5',
              '$1$2$3',
              '$1:0',
              '$1$2'
          ),
      $input);
  }
}


if(!function_exists('include_php_from_dir')){

  /**
  * Includes all php files from specified directory
  *
  * @param $path - string
  */
  function include_php_from_dir($path){
    if(is_dir($path)){
      foreach (glob($path.'/*') as $child_name){
        if(is_dir($child_name)){
          include_php_from_dir($child_name);
        }else{
         if(file_exists( $child_name )){
           $ext = pathinfo($child_name, PATHINFO_EXTENSION);
           if($ext === 'php'){
             include_once($child_name);
           }
         }
        }
      }
    }else{
      $ext = pathinfo($path, PATHINFO_EXTENSION);
      if($ext === 'php'){
        include_once($path);
      }
    }
  }
}



if(!function_exists('exec_upload_file')){
  /**
  * Process an uploading of a file
  *
  * @param $nonce_post - string, name of posted nonce field
  * @param $nonce - string name of a nonce field to check fo wp_verify_nonce()
  * @param $file_name - string name of posted  file field input
  *
  * @return Array || false
  */
  function exec_upload_file($file_name , $nonce_post ='', $nonce =''  ){

    dlog('exec_upload ' .  $file_name , true, false, 'exec_upload');

    if ( ! function_exists( 'wp_handle_upload' ) )
      include_once( ABSPATH . 'wp-admin/includes/file.php' );

    // global $upload_exeptions;

    $upload_exeptions = array(
      'error' => array(),
      'success' => array(),
      'info' => array(),
    );

    try {
      $file      = & $_FILES[$file_name];
      $dir       = wp_upload_dir();
      $overrides = [ 'test_form' => false ];

      dlog('file: ');
      dlog($file);


     /**
     * check for errors on uploading file
     *
     */
     switch($file['error']){
        case 8:
          throw new Exception('UPLOAD_ERR_EXTENSION');
         break;
        case 7:
          throw new Exception('Failed to load file, error 7, UPLOAD_ERR_CANT_WRITE');
          break;
        case 6:
          throw new Exception('Destination folder was not found, error 6, UPLOAD_ERR_NO_TMP_DIR ');
          break;
        case 4:
          return;
          throw new Exception('No file was loaded, error 4, UPLOAD_ERR_NO_FILE');
          break;
        case 3:
          throw new Exception('Files was recived partially, error 3, "UPLOAD_ERR_PARTIAL"');
          break;
        case 2:
          throw new Exception('Files size exceedes form limit, error 2, "UPLOAD_ERR_FORM_SIZE"' );
          break;
        case 1:
          throw new Exception('Files size exceedes max file size, error 1, "UPLOAD_ERR_INI_SIZE"');
          break;
     }

     // if((int)$file['size'] > $limit){
     //    throw new Exception('Files size exceedes max file size, error 1, "UPLOAD_ERR_INI_SIZE"');
     //  }

      $allowed  = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];

      if(!in_array($file['type'],  $allowed )){
        throw new Exception('Wrong file extension. Tried to upload <b>' . $file['type'] . '</b> file. Only jpg, jpeg, png, pdf are allowed');
      }

      add_filter('upload_dir', 'my_upload_dir');

      $file_loaded = wp_handle_upload( $file, $overrides );

      if( isset($file_loaded['error'])){
         throw new Exception('Failed to load. '. $file_loaded['error']);
      }

      dlog( "wp load processed");
      dlog( $file_loaded );


      $p = explode('/', $file_loaded['file']);
      $file_name = end($p);
      $file_name_parts = explode('.', $file_name);
      $file_resolution = end($file_name_parts);
      $file_resolution_check = strtolower($file_resolution);


      dlog('file type: ' . $file_resolution);

      if($file['type'] === 'image/png' || $file['type'] === 'image/jpg' || $file['type'] === 'image/jpeg'  ){
        $search     = '.'.$file_resolution;
        $replace    = '_thumb.'.$file_resolution;
        $thumb_name = str_replace($search, $replace, $file_name);
        $upload_file_path = str_replace($file_name, $thumb_name, $file_loaded['file']);

        // create_thmb( $file_loaded ['file'], $upload_file_path );
        $file_loaded['thumb_upload_url'] = str_replace($dir['basedir'], '', $upload_file_path);
      } else {
        $file_loaded['thumb_upload_url'] = THEME_URL. '/images/'. $file_resolution .'-icon.png';
      }

      remove_filter('upload_dir', 'my_upload_dir');

      $upload_exeptions['success'][] = 'Upload of the file ' . $file['name'] . ' was completed successfully';

      dlog('exec_upload finished successfully', false, true);

      return array(
        'file' => $file,
        'file_loaded' => $file_loaded,
      ) ;
    } catch(Exception $ex){
      dlog($ex->getMessage());
      $upload_exeptions['error'][] = $ex->getMessage();
      dlog('exec_upload finished with error', false, true);
    }

    return $upload_exeptions;

  }
}


if(!function_exists('get_annually_income')){
  function get_annually_income(){
    $date = new DateTime();
    $year_current = (int)$date->format('Y');
    $date->setDate($year_current, 1, 1);
    $date->setTime(0, 0 ,0);
    $months = array();

    for($i = 0; $i < 12; $i++){
      $index = $date->format('M');
      $months[ $index] = array('from'=>$date->format('Y-m-d H:i:s'), 'to'=>$date->format('Y-m-t H:i:s'));
      $new_date = $date->modify('+1 month');
    }


    foreach ($months as $month => $period) {
      $summ = 0;

      $leads = get_posts_by_dates($period['from'], $period['to']);

      if(count($leads) == 0){
        $months[$month]['sum']  = 0;
        continue;
      }

      foreach ($leads as $lead) {
        $meta = get_post_meta($lead->ID, '_treatment_value', true);
        $summ += price_to_number($meta['value']);
      }

       $months[$month]['sum']  = $summ;
    }


    return $months;
  }
}


if(!function_exists('get_posts_by_dates')){
  /**
  * Gets WP posts between dates
  *
  * @param From - srting, date string, start date
  * @param to - srting, date string, end date
  *
  * @return array
  */

  function get_posts_by_dates($from = false, $to = false, $post_type = false){
    dlog('Get Posts by Date', true, false);
    $post_type = (! $post_type )? velesh_theme_posts::$lead :  $post_type ;

    $args = array(
      'post_type' => $post_type,
      'posts_per_page' => -1,
      'limit' => -1,
      'date_query' => array(
        array(
          'column' => 'post_date_gmt',
          'after'     => '',
          'before'    => '',
          'inclusive' => true,
        ),
      ),
    );

    if(!$from){
      unset($args['date_query']['after']);
    }else{
      $date = new DateTime($from);
      $args['date_query'][0]['after'] = $date->format('Y-m-d');
      dlog('from: '.  $args['date_query'][0]['after']);
    }

    if(!$to){
      unset($args['date_query']['before']);
    }else{
      $date = new DateTime($to);
      $args['date_query'][0]['before'] = $date->format('Y-m-d');
      dlog('to: '.  $args['date_query'][0]['before']);
    }


    if(!$from && !$to){
       unset($args['date_query']);
    }

    dlog($args);

    $posts = get_posts($args);
    dlog($posts);
    dlog('-------------', false, true);

    return $posts;
  }
}

if(!function_exists('get_leads_meta')){

  function get_leads_meta($leads){
    dlog('Get Leads Meta', true, false);


    $sources = array(
        'live-chat'  => 'Live Chat',
        'instagram'  => 'Instagram',
        'google-ppc' => 'Google PPC',
        'website'    => 'Website',
        'phone'      => 'Phone',
        'walk-in'    => 'Walk In',
        'other'      => 'Other',
      );


    $stages              = get_option('leads_stages');
    $stage_for_failed    = (int)get_option('stage_for_failed');
    $stage_for_converted = (int)get_option('stage_for_converted');


    foreach ($leads as $lead_id => $post) {
      // get all metadata;
      $meta = array(
        'lead_notes'            => get_post_meta($post->ID, '_lead_notes', true),
        'lead_files'            => get_post_meta($post->ID, '_lead_files', true),
        'treatment_coordinator' => get_post_meta($post->ID, '_treatment_coordinator', true),
        'treatment_value'       => get_post_meta($post->ID, '_treatment_value', true),
        'patient_data'          => get_post_meta($post->ID, '_patient_data', true),
        'reminder'              => get_post_meta($post->ID, '_reminder', true),
        'lead_stage'            => get_post_meta($post->ID, '_lead_stage', true),
      );

      if(!$meta['patient_data']){
        $meta['patient_data'] = array();
      }

      if(!$meta['patient_data']['source']){
        $meta['patient_data']['source'] = '';
      }

      //prepare data for filtering
      $filter_data = array(
        'clinics'    => ($meta['patient_data']['clinic'])? $meta['patient_data']['clinic'] : '',
        'treatments'    => ($meta['patient_data']['treatment'])? $meta['patient_data']['treatment'] : '',
        'campaigns'    => ($meta['patient_data']['campaign'])? $meta['patient_data']['campaign'] : '',
        'sources'    => ($meta['patient_data']['source'])? $meta['patient_data']['source'] : '',
        'team'       => array(),
      );

      //get array of specialists assigned

      $lead_specialists  = get_post_meta($post->ID, '_lead_specialists', true);
      $specialists       = array();

      if(!$lead_specialists){
        $lead_specialists = array();
      }

      foreach ($lead_specialists as $user_id => $assigned) {
        if('yes' === $assigned){
          $user = get_user_by('id', $user_id);
          $name =  theme_get_user_name($user);
          $user_position = get_the_author_meta('user_position', $user->ID);

          $user_photo_id = get_the_author_meta('user_photo_id', $user->ID);
          $image =  wp_get_attachment_url( $user_photo_id );
          $image = ($image) ? $image : DUMMY_ADMIN;

          array_push($filter_data['team'] , trim($name));

          array_push($specialists , array(
            'image'    => $image,
            'user_id'  => $user_id,
            'name'     => trim($name),
            'position' => $user_position,
          ));
        }
      }

      $leads[$lead_id]->converted_time = get_post_meta($post->ID, '_time_converted', true);


      $meta['lead_specialists'] =  $specialists;

      // add meta field to lead
      $leads[$lead_id]->meta = $meta;

      // add filter, stage, order field to lead
      $leads[$lead_id]->filter_data = $filter_data;

      $stages_formatted = [];

      if($stages){
        $exists = false;
        $stage = get_post_meta($post->ID, '_lead_stage', true);

        foreach ($stages as $st) {
          $exists = $st['name'] === $stage ? true :  $exists;
        }

        $leads[$lead_id]->lead_stage  = ($exists)? $stage : $stages[0]['name'];


      }else{
        $leads[$lead_id]->lead_stage   = '';
      }

      // detect if lead is failed or converted

      $leads[$lead_id]->is_converted = (in_array($leads[$lead_id]->lead_stage, get_converted_stages()) )? 'yes': 'no';

      $leads[$lead_id]->is_failed = ($lead_stage === get_failed_stage_name())? 'yes': 'no';
      $leads[$lead_id]->permalink = esc_url(get_permalink($post));

      $order = get_post_meta($post->ID, '_lead_order', true);

      if($order){
        $leads[$lead_id]->order = $order;
      }
    }

    dlog($leads);
    dlog('-------------', false, true);
    return $leads;
  }
}


if(!function_exists('theme_get_user_name')){
  /**
  * Gets user name in format last name + 1st name or user nicename
  *
  * @param $user - mixed WP_User or integer
  *
  * @return string
  */
   function theme_get_user_name($user){
     if(is_integer($user)){
      $user = get_user_by('ID', $user);
     }

     if(is_string($user)){
       $user = get_user_by('slug', $user);
     }

     $last_name     = get_the_author_meta('last_name', $user->ID);
     $first_name    = get_the_author_meta('first_name', $user->ID);
     $name = $first_name  . ' '. $last_name ;
     $name = trim($name)? $name : $user->data->display_name;

     return trim($name);
   }

}


if(!function_exists('get_filters_by_leads')){
  /**
  * Gets WP posts between dates
  *
  * @param leads - array of formatted leads
  *
  * @return array
  */
  function get_filters_by_leads($leads = false){

    dlog('Get filter data by leads', true, false);

    $data = array(
      'clinics'    => array('All Clinics'),
      'treatments' => array('All Treatments'),
      'campaigns'  => array('All Campaigns'),
      'sources'    => array('All Sources'),
      'team'       => array('All Team'),
    );

    if(!$leads) return $data;

    foreach ($leads as $key => $lead) {
      $meta      = $lead->meta;

      $clinic    = $meta['patient_data']['clinic'];
      $treatment = $meta['patient_data']['treatment'];
      $source    = $meta['patient_data']['source'];
      $campaign  = $meta['patient_data']['campaign'];
      $team      = $meta['lead_specialists'];

      if(!in_array( $clinic ,$data['clinics']) && !empty(trim( $clinic))){
        array_push($data['clinics'], $clinic);
      }
      if(!in_array( $treatment , $data['treatments']) && !empty(trim( $treatment))){
        array_push($data['treatments'], $treatment);
      }

      if(!in_array($source ,$data['sources']) &&  $source != '-1' && !empty(trim( $source))){
        array_push($data['sources'], $source);
      }

      if(!in_array($campaign , $data['campaigns']) &&  $campaign != '-1' && !empty(trim( $campaign))){
        array_push($data['campaigns'], $campaign);
      }

      foreach ($team as $member_id => $member) {
        if(!in_array( $member['name'] ,$data['team'])  && !empty(trim( $member['name'] ))){
          array_push($data['team'], $member['name']);
        }

      }
    }

    dlog($data);
    dlog('-------------', false, true);

    return $data;
  }
}


if(!function_exists('get_failed_stage_name')){
  /**
  * Gets names of stages set for converted leads
  *
  * @return array
  */
  function get_converted_stages(){
    $stages              = get_option('leads_stages');
    $stage_for_failed    = (int)get_option('stage_for_failed');
    $stage_for_converted = (int)get_option('stage_for_converted');

    $converted_stages = array();

    foreach ($stages as $key => $st) {
      if((int)$st['number'] >= $stage_for_converted &&  (int)$st['number'] != $stage_for_failed ){
        $converted_stages[] = $st['name'];
      }
    }

    return $converted_stages;
  }
}


if(!function_exists('get_failed_stage_name')){
  /**
  * Gets name of stage set for failed leads
  *
  * @return string
  */
  function get_failed_stage_name(){
    $stages              = get_option('leads_stages');
    $stage_for_failed    = (int)get_option('stage_for_failed');

    foreach ($stages as $key => $st) {
      if((int)$st['number'] === $stage_for_failed){
        return $st['name'];
      }
    }

    return false;
  }
}

if(!function_exists('get_users_leads')){

  /**
  * gets data about leads ans sorts it by use
  * data get by daterange
  *
  *
  * @return array;
  */
  function get_users_leads($from = false, $to=false){
    dlog('Get Users leads', true, false);
    $data = array();
    $posistions = array('all');

    $converted_stages = get_converted_stages();

    foreach (get_users() as $key => $user) {
      $name = theme_get_user_name($user);
      $user_position = strtolower(get_the_author_meta('user_position', $user->ID));
      $assigned_posts = get_the_author_meta('_leads_assigned', $user->ID);

      $photo_id = get_the_author_meta('user_photo_id', $user->ID);
      $image =  wp_get_attachment_url( $photo_id );
      $image = ($image) ? $image : DUMMY_ADMIN;

      if( !$assigned_posts ){
        $data[$name] = array(
          'user_position' => $user_position,
          'leads'         => array(),
          'total_leads'   => 0,
          'converted'     => 0,
          'image'     => $image ,
        );
        continue;
      }
      // default args fo wp query
      $args = array(
        'post_type'      => velesh_theme_posts::$lead,
        'post__in'       => $assigned_posts,
        'posts_per_page' => -1,
        'limit'          => -1,
        'date_query' => array(

          array(
            'column' => 'post_date_gmt',
            'after'     => '',
            'before'    => '',
            'inclusive' => true,
          ),
        ),
      );

      // check if data is set

      if(!$from){
        unset($args['date_query']['after']);
      }else{
        $date = new DateTime($from);
        $args['date_query'][0]['after'] = $date->format('Y-m-d');
      }

      if(!$to){
        unset($args['date_query']['before']);
      }else{
        $date = new DateTime($to);
        $args['date_query'][0]['before'] = $date->format('Y-m-d');
      }

      if(!$from && !$to){
         unset($args['date_query']);
      }

      $args_converted = $args;

      $posts = get_posts($args);

      // _lead_stage

      $args_converted['meta_query'] = array('relation' => 'OR');

      foreach (get_converted_stages() as $key => $_stage) {
        $args_converted['meta_query'][] = array('key' =>'_lead_stage', 'value'=>$_stage);
      }

      if(!in_array($user_position, $posistions)){
        array_push($posistions, $user_position );
      }


      $leads_converted = get_posts($args_converted);

      $data[$name] = array(
        'user_position' => $user_position,
        'leads'         => get_leads_meta($posts),
        'total_leads'   => count($posts),
        'converted'     => count($leads_converted),
        'image'         => $image ,
      );
    }

    dlog('-------------', false, true);

    return array(
      'team' => $data,
      'positions' => $posistions,
    );
  }
}


if(!function_exists('format_price')){
  /**
  * formats a string to number
  * users for price steing
  *
  * @param $val - string
  *
  * @return integer
  */
  function format_price($val){
    $pierces = explode('.', $val);
    $val = preg_replace('/\\D/', '', $pierces[0]);
    $val = '£'.number_format($val, 2, '.', ',');
    return $val;
  }
}


if(!function_exists('price_to_number')){
  /**
  * formats a number to a price string
  *
  * @param $val - integer
  *
  * @return string
  */
  function price_to_number($price){
    $pierces = explode('.', $price);
    $val = preg_replace('/\\D/', '', $pierces[0]);
    return (float) $val;
  }
}


if(!function_exists('my_upload_dir')){

  /**
  * modifies upload url and path
  *
  * @param $upload - array
  */
  function my_upload_dir($upload) {

    $upload['subdir'] = '/documents' . $upload['subdir'];

    $upload['path']   = $upload['basedir'] . $upload['subdir'];

    $upload['url']    = $upload['baseurl'] . $upload['subdir'];

    return $upload;
  }
}



