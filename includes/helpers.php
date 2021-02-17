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
  function clog($content, $color = false){
    // if(!$content) return;

    global $clog_data;
    $clog_data = (!$clog_data)? array() : $clog_data;

    $color = (is_object($content) || is_array($content))? false : $color;

    $clog_data[] = array(
       'content' => $content,
       'color'   => $color,
       'type'    => 'regular'
    );
  }
}

if(!function_exists('exec_clog')){
  function exec_clog(){
    global $clog_data;

    if(!$clog_data) return;

    foreach ($clog_data as $key => $data) {
      switch ($data['color']){
         case 'red':
            $script_open =  '<script> console.log("\x1b[0m\x1b[31m %s \x1b[0m",';
          break;
         case 'green':
            $script_open =  '<script> console.log("\x1b[0m\x1b[32m %s \x1b[0m",';
          break;
         case 'blue':
            $script_open =  '<script> console.log("\x1b[0m\x1b[34m %s \x1b[0m",';
          break;
         case 'purple':
            $script_open =  '<script> console.log("\x1b[0m\x1b[35m %s \x1b[0m",';
          break;
         case 'cyan':
            $script_open =  '<script> console.log("\x1b[0m\x1b[36m %s \x1b[0m",';
          break;
         case 'grey':
            $script_open =  '<script> console.log("\x1b[0m\x1b[37m %s \x1b[0m",';
          break;
        default:
            $script_open = '<script> console.log(';
          break;
      }

      switch ($data['type']) {
        case 'end':
          echo '<script> console.groupEnd()</script>';
          break;
        case 'start':
          printf( '<script> console.groupCollapsed("%s")</script>', $data['content']);
          break;
        case 'start:expanded':
          printf( '<script> console.group("%s")</script>', $data['content']);
          break;

        default:
          echo $script_open;
          echo json_encode($data['content']);
          echo ')</script>';
          break;
      }
    }
}

if(!function_exists('get_theme_roles')){
  function get_theme_roles($role = false){
    $roles = get_option('theme_roles');
    $roles = !$roles? array() : $roles;

    if($role && isset($roles[$role])){
      return $roles[$role] !== 'none'? $roles[$role] : false;
    }else{
      return $roles;
    }
  }
}

if(!function_exists('glog')){
  /**
 * prints an inline script with output in console
 *
 * @param mixed $content - obj|array|string
 */
  function glog($content = 'group log', $expand = false){
      global $clog_data;
      $clog_data = (!$clog_data)? array() : $clog_data;
      if ($content) {

            $clog_data[] = array(
               'content' => $content,
               'color'   => false,
               'type'    => (!$expand)?'start' : 'start:expanded'
            );

      }
      else{
        $clog_data[] = array(
           'content' => $content,
           'color'   => false,
           'type'    => 'end'
        );

      }
    }
  }
}

// deprecated, left for backward compatibility
function dlog(){}


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


      $p = explode('/', $file_loaded['file']);
      $file_name = end($p);
      $file_name_parts = explode('.', $file_name);
      $file_resolution = end($file_name_parts);
      $file_resolution_check = strtolower($file_resolution);

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


      return array(
        'file' => $file,
        'file_loaded' => $file_loaded,
      ) ;
    } catch(Exception $ex){
      $upload_exeptions['error'][] = $ex->getMessage();
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
        $stage = get_post_meta($lead->ID, '_lead_stage', true);

        if(in_array($stage , get_converted_stages()) ){
          if(isset($meta['value'])){
            $summ += price_to_number($meta['value']);
          }
        }
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
    $start = microtime(true);
    $theme_roles = get_theme_roles();
    $stages_all  = get_option('leads_stages');

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

    $user = wp_get_current_user();

    clog($theme_roles);

    $dentist_role =  $theme_roles['dentist'];


    if(in_array( $dentist_role , $user->roles)){
      $last_name  = get_user_meta($user->ID, 'last_name', true);
      $first_name = get_user_meta($user->ID, 'first_name', true);
      $nickname   = get_user_meta($user->ID, 'nickname', true);

      $name        = $last_name  || $first_name ? trim ( $first_name  . ' ' . $last_name ) :    $nickname;

      $args['meta_query'] = array(array(
        'key'         => '_treatment_data',
        'value'       =>  $name,
        'compare_key' => 'LIKE',
        'compare'     => 'LIKE',
      ));
    } else if (in_array( $theme_roles['reception'] , $user->roles)){
      $stages = array();
      foreach ($stages_all as $id => $stage) {
        if($stage['reception'] == 1){
          $stages[]  = $stage['name'];
        }
      }

      $args['meta_query'] =array(
        'relation' => "OR",
        array(
        'key'         => '_lead_stage',
        'value'       =>  $stages,
        'compare'     => 'IN',
       ),
        array(
        'key'         => '_lead_stage',
        'compare' => 'NOT EXISTS'
      ));

    } else if (in_array( $theme_roles['tco'] , $user->roles)){
      $stages = array();
      foreach ($stages_all as $id => $stage) {
        if($stage['tco'] == 1){
          $stages[]  = $stage['name'];
        }
      }

      $args['meta_query'] =array(
        'relation' => "OR",
        array(
        'key'         => '_lead_stage',
        'value'       =>  $stages,
        'compare'     => 'IN',
       ),
        array(
        'key'         => '_lead_stage',
        'compare' => 'NOT EXISTS'
      ));
    }

    if(!in_array( $dentist_role , $user->roles)){
      $reception_id = (int)get_option('theme_page_reception');
      $tco_id = (int)get_option('theme_page_tco') ;
      if(get_queried_object_id() == $reception_id ) {
        $stages = array();
        foreach ($stages_all as $id => $stage) {
          if($stage['reception'] == 1){
            $stages[]  = $stage['name'];
          }
        }

        $args['meta_query'] =array(
          'relation' => "OR",
          array(
          'key'         => '_lead_stage',
          'value'       =>  $stages,
          'compare'     => 'IN',
         ),
          array(
          'key'         => '_lead_stage',
          'compare' => 'NOT EXISTS'
        ));
      }else if(get_queried_object_id() == $tco_id ){
        $stages = array();
        foreach ($stages_all as $id => $stage) {
          if($stage['tco'] == 1){
            $stages[]  = $stage['name'];
          }
        }

        $args['meta_query'] =array(
          'relation' => "OR",
          array(
          'key'         => '_lead_stage',
          'value'       =>  $stages,
          'compare'     => 'IN',
         ),
          array(
          'key'         => '_lead_stage',
          'compare' => 'NOT EXISTS'
        ));
      }
    }

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

    $posts = array();

    $dentist_role = get_theme_roles('dentists');

    if(in_array( 'administrator' , $user->roles) || in_array( 'manager' , $user->roles) ){
      unset($args['meta_query']);
      // $args['author']  = $user->ID;
    }

    $t     = get_posts($args);

    clog('get_posts_by_dates: '.round(microtime(true) - $start, 4).' сек.' , 'blue');

    return $t;
  }
}

if(!function_exists('get_leads_meta')){

  function get_leads_meta($leads){
    $start = microtime(true);

    $sources = array(
      'live-chat'  => 'Live Chat',
      'instagram'  => 'Instagram',
      'slaine-instagram'  => 'Slaine Instagram',
      'riz-instagram'  => 'Riz Instagram',
      'andy-instagram'  => 'Andy Instagram',
      'pete-instagram'  => 'Pete Instagram',
      'sonnie-instagram'  => 'Sonnie Instagram',
      'google-ppc' => 'Google PPC',
      'website'    => 'Website',
      'phone'      => 'Phone',
      'walk-in'    => 'Walk In',
      'other'      => 'Other',
      );

    $stages              = get_option('leads_stages');
    $stage_for_failed    = (int)get_option('stage_for_failed');
    $stage_for_converted = (int)get_option('stage_for_converted');

    $converted_stages  = get_converted_stages();
    $failed_stage_name = get_failed_stage_name();

    global $wpdb;

    $lead_ids = array_map('get_leads_ids', $leads);

    $lead_ids = join("','",$lead_ids);

    $start2 = microtime(true);
    $querystr = "
      SELECT *
      FROM   $wpdb->postmeta
      WHERE  $wpdb->postmeta.post_id IN  ('$lead_ids')
    ";

    $request = $wpdb->get_results($querystr, OBJECT);
    clog('request : '.round(microtime(true) - $start2, 4).' сек.' , 'blue');

    $meta_parsed = array();

    $start3 = microtime(true);
    foreach ($request as $key => $item) {
      if(!isset($meta_parsed[$item->post_id])){
        $meta_parsed[$item->post_id] = array();
      }
      $meta_parsed[$item->post_id][$item->meta_key] = maybe_unserialize($item->meta_value);
    }

    clog('parse_meta : '.round(microtime(true) - $start3, 4).' сек.' , 'blue');

    // get_all_users

    $querystr = "
      SELECT *
      FROM   $wpdb->usermeta
      WHERE  $wpdb->usermeta.meta_key = 'user_position' OR $wpdb->usermeta.meta_key = 'user_photo_id' OR $wpdb->usermeta.meta_key = 'first_name' OR $wpdb->usermeta.meta_key = 'last_name' OR $wpdb->usermeta.meta_key = 'nickname'
    ";

    $request = $wpdb->get_results($querystr, OBJECT);


    $cached_user = theme_get_all_users();

    foreach ($leads as $lead_id => $post) {
      // get all metadata;


      $post_meta = isset($meta_parsed[$post->ID])? $meta_parsed[$post->ID]: array();

      $coordinator_data =   isset($post_meta['_treatment_coordinator'])? ($post_meta['_treatment_coordinator']): false;

        $tco_data = isset($post_meta['_tco_data'])? $post_meta['_tco_data'] :array(
                'digital' => false,
                'tco' => false,
                'dentist' => false,
                'attended' => false,
                'fta_cancelled' => false,
                'tax' => false,
              );
        foreach ($tco_data  as $key => $value) {
          $tco_data[$key] = $tco_data[$key] === 'false' || !$value ? 0 : $tco_data[$key];
          $tco_data[$key] = $tco_data[$key] === 'true' ? 1 : $tco_data[$key];
        }

       $meta = array(
        'lead_notes'            =>  isset($post_meta['_lead_notes'])? ($post_meta['_lead_notes']): false,
        'tco_data' =>     $tco_data ,
        'lead_notes_tco'        =>  isset($post_meta['_lead_notes_tco'])? ($post_meta['_lead_notes_tco']): false,
        'treatment_data'        =>  isset($post_meta['_treatment_data'])? ($post_meta['_treatment_data']): array(),
        'treatment_coordinator' => $coordinator_data,
        'treatment_value'       =>  isset($post_meta['_treatment_value'])? ($post_meta['_treatment_value']): false,
        'patient_data'          =>  isset($post_meta['_patient_data'])? ($post_meta['_patient_data']): false,
        'reminder'              =>  isset($post_meta['_reminder'])? ($post_meta['_reminder']): false,
        'lead_stage'            =>  isset($post_meta['_lead_stage'])? ($post_meta['_lead_stage']): false,
        'start_date'            =>  isset($post_meta['_start_date'])? ($post_meta['_start_date']): false,
        'end_date'              =>  isset($post_meta['_end_date'])? ($post_meta['_end_date']): false,
        'specialists_assigned'     => isset($post_meta['_lead_specialists'])? ($post_meta['_lead_specialists']): false,
        'specialists_assigned_tco' => isset($post_meta['_lead_specialists_tco'])? ($post_meta['_lead_specialists_tco']): false,

        'text_messages' => isset($post_meta['_text_messages'])? ($post_meta['_text_messages']): false,
        'lead_files' => isset($post_meta['_lead_files'])? $post_meta['_lead_files']: array(),
       );


      // $lead_specialists      = get_post_meta($post->ID, '_lead_specialists', true);
      $lead_specialists      = isset($post_meta['_lead_specialists'])? ($post_meta['_lead_specialists']): false;

      // $lead_specialists_tco  = get_post_meta($post->ID, '_lead_specialists_tco', true);
      $lead_specialists_tco  = isset($post_meta['_lead_specialists_tco'])? ($post_meta['_lead_specialists_tco']): false;

      // $treatment_data = get_post_meta($post->ID, '_treatment_data', true);
      $treatment_data        = isset($post_meta['_treatment_data'])? ($post_meta['_treatment_data']): false;

      // $time_converted        = get_post_meta($post->ID, '_time_converted', true);
      $time_converted        = isset($post_meta['_time_converted'])? ($post_meta['_time_converted']): false;

      // $order                 = get_post_meta($post->ID, '_lead_order', true);
      $order                 = isset($post_meta['_lead_order'])? ($post_meta['_lead_order']): false;

      // $phone_count           = get_post_meta($post->ID, '_phone_count', true);
      $phone_count           = isset($post_meta['_phone_count'])? ($post_meta['_phone_count']): false;
      $phone_count_tco       = isset($post_meta['_phone_count_tco'])? ($post_meta['_phone_count_tco']): false;

      // $message_count         = get_post_meta($post->ID, '_message_count', true);
      $message_count         = isset($post_meta['_message_count'])? ($post_meta['_message_count']): false;
      $message_count_tco     = isset($post_meta['_message_count_tco'])? ($post_meta['_message_count_tco']): false;

      $sms_count_tco         = isset($post_meta['_sms_count_tco'])? ($post_meta['_sms_count_tco']): false;

      // $end_date              =  get_post_meta($post->ID, '_end_date' , true);
      $end_date              = isset($post_meta['_end_date'])? ($post_meta['_end_date']): false;

      // $stage = get_post_meta($post->ID, '_lead_stage', true);
      $stage                 = isset($post_meta['_lead_stage'])? ($post_meta['_lead_stage']): false;




      if(!$meta['patient_data']){
        $meta['patient_data'] = array();
      }

      if(!isset($meta['patient_data']['source'])){
        $meta['patient_data']['source'] = '';
      }

      //prepare data for filtering
      $filter_data = array(
        'clinics'       => (isset($meta['patient_data']['clinic']))? $meta['patient_data']['clinic'] : '',
        'treatments'    => (isset($meta['patient_data']['treatment']))? array($meta['patient_data']['treatment']) : array(),
        'campaigns'     => (isset($meta['patient_data']['campaign']))? $meta['patient_data']['campaign'] : '',
        'sources'       => (isset($meta['patient_data']['source']))? $meta['patient_data']['source'] : '',
        'team'          => array(),
        'dentists'      => array(),
      );


      if($treatment_data){
        foreach ($treatment_data as $key => $val) {
          $filter_data['treatments'][] = $val['treatment'];
        }
      }

      //get array of specialists assigned

      $specialists       = array();

      if(!$lead_specialists){
        $lead_specialists = array();
      }
      if(!$lead_specialists_tco){
        $lead_specialists_tco = array();
      }


      foreach ($lead_specialists as $user_id => $assigned) {
        if('yes' === $assigned){



        if(!isset($cached_user[ $user_id ] )) {continue;}

          $user           = $cached_user[ $user_id ];

          $name           = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];
          $user_position  =  isset($user['user_position'])? $user['user_position'] : false;
          $image          =  isset($user['image']) ?$user['image'] : DUMMY_ADMIN;


          array_push($filter_data['team'] , $name );

          array_push($specialists , array(
            'image'    => $image,
            'user_id'  => $user_id,
            'name'     => trim($name),
            'position' => $user_position,
          ));
        }
      }

      foreach ($lead_specialists_tco as $user_id => $assigned) {
        if('yes' === $assigned){


           if(!isset($cached_user[ $user_id ])){continue;}
           $user = $cached_user[ $user_id ];

            $name           = ($user['last_name']) || ($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];
            $user_position  =  $user['user_position'];
            $image          =  isset($user['image']) ?$user['image'] : DUMMY_ADMIN;

          array_push($filter_data['team'] , $name );

          array_push($specialists , array(
            'image'    => $image,
            'user_id'  => $user_id,
            'name'     => trim($name),
            'position' => $user_position,
          ));
        }
      }

      if($coordinator_data && isset($coordinator_data ['specialist']) && is_array($coordinator_data ['specialist'])){

        foreach ($coordinator_data['specialist'] as $name) {
          $name = trim($name);
          if(!$name && !empty($name) && strlen($name) < 2) continue;
          array_push($filter_data['dentists'] , trim($name));
        }
      }


      if($treatment_data){
        foreach ($treatment_data as $key => $t) {
          array_push($filter_data['dentists'] , trim($t['dentist']));
        }
      }

      $filter_data['team'] = array_values(array_unique($filter_data['team'] ));

      // clog(get_post_meta($post->ID));

      $leads[$lead_id]->converted_time = $time_converted;


      $meta['lead_specialists'] =  $specialists;

      // add meta field to lead
      $leads[$lead_id]->meta = $meta;

      // add filter, stage, order field to lead

      $stages_formatted = [];

      if($stages){
        $exists = false;

        foreach ($stages as $st) {
          $exists = $st['name'] === $stage ? true :  $exists;
        }

        $leads[$lead_id]->lead_stage = $filter_data['lead_stage'] =  $lead_stage  = ($exists)? $stage : $stages[0]['name'];

      }else{
        $leads[$lead_id]->lead_stage = $lead_stage  = '';
        $filter_data['lead_stage'] = '';
      }

      $filter_data2 = array_map(function($el){
        if(!$el){
          return array();
        }
        return is_array($el)? $el : array($el);
      },$filter_data);

      $leads[$lead_id]->filter_data = $filter_data;
      $leads[$lead_id]->filter_data2 = $filter_data2;
      // detect if lead is failed or converted

      $leads[$lead_id]->is_converted = (in_array($leads[$lead_id]->lead_stage, $converted_stages) )? 'yes': 'no';

      $leads[$lead_id]->is_failed = isset($lead_stage) && in_array($lead_stage,$failed_stage_name)? 'yes': 'no';

      $leads[$lead_id]->permalink = esc_url(get_permalink($post));

      if($order){
        $leads[$lead_id]->order = $order;
      }


      $phone_count = ($phone_count) ? $phone_count : 0;
      $phone_count_tco = ($phone_count_tco) ? $phone_count_tco : 0;

      $message_count = ($message_count) ? $message_count : 0;
      $message_count_tco = ($message_count_tco) ? $message_count_tco : 0;
      $sms_count_tco = ($sms_count_tco) ? $sms_count_tco : 0;

      $leads[$lead_id]->message_count     = (int)$message_count;
      $leads[$lead_id]->phone_count       = (int)$phone_count;
      $leads[$lead_id]->phone_count_tco   = (int)$phone_count_tco;
      $leads[$lead_id]->message_count_tco = (int)$message_count_tco;
      $leads[$lead_id]->sms_count_tco     = (int)$sms_count_tco    ;

      $leads[$lead_id]->payment_end_date =  $end_date;
      $leads[$lead_id]->show_message_alert_him = 0;
      $leads[$lead_id]->show_message_alert = 0;

    }
// Saima Nasim

    clog('get_leads_meta: '.round(microtime(true) - $start, 4).' сек.' , 'blue');
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

     if(!$user){
       return '';
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
  function get_filters_by_leads($leads = false, $add_stages = false){

    $start = microtime(true);

    $data = array(
      'clinics'    => array('All Clinics'),
      'treatments' => array('All Treatments'),
      'campaigns'  => array('All Campaigns'),
      'sources'    => array('All Sources'),
      'team'       => array('All Team'),
      'dentists'   => array('All Dentists'),
    );

    if($add_stages){
       $stages_formatted = array('All Stages' => true);
       $all_stages =  get_option('leads_stages');

       foreach ($all_stages as $key => $st) {
          $stages_formatted[$st['name']] = false;
       }
    }

    if(!$leads) return $data;

    foreach ($leads as $key => $lead) {
      $meta      = $lead->meta;
      $clinic    = isset($meta['patient_data']['clinic'])? $meta['patient_data']['clinic'] : '' ;
      $treatment = isset($meta['patient_data']['treatment'])?  $meta['patient_data']['treatment'] : '';
      $source    = $meta['patient_data']['source'];
      $campaign  = isset($meta['patient_data']['campaign'])? $meta['patient_data']['campaign'] : '' ;
      $team      = $meta['lead_specialists'];

      if(!in_array( $clinic ,$data['clinics']) && !empty(trim( $clinic))){
        array_push($data['clinics'], $clinic);
      }

      if(!in_array( $treatment , $data['treatments']) && !empty(trim( $treatment))){
        array_push($data['treatments'], $treatment);
      }

      if($meta['treatment_data']){
        foreach ($meta['treatment_data'] as $key => $val) {
          array_push($data['treatments'], $val['treatment']);
        }
      }

     $data['treatments'] =  array_unique( $data['treatments'] );

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


      if($add_stages && array_key_exists($lead->lead_stage, $stages_formatted )){
          $stages_formatted[$lead->lead_stage] = true;
      }


      // add lead stage filter for scv data

      $coordinator_data = $meta['treatment_coordinator'];


      if($coordinator_data && isset($coordinator_data ['specialist']) && is_array($coordinator_data ['specialist'])){

        foreach ($coordinator_data['specialist'] as $name) {
          if(!$name || strlen($name) < 3) continue;
          array_push($data['dentists'] , trim($name));
        }
      }

      $treatment_data = get_post_meta($lead->ID, '_treatment_data', true);

      if( $treatment_data){
        foreach ($treatment_data as $key => $t) {
          array_push($data['dentists'] , trim($t['dentist']));
        }
      }
    }

     $data['dentists'] = array_values( array_unique($data['dentists']));

    if ($add_stages) {
      foreach ($stages_formatted as $key => $show) {
        if(!$show){
          unset($stages_formatted[$key]);
        }
      }
      $data['lead_stage'] = array_keys($stages_formatted);
    }

    clog('get_filters_by_leads: '.round(microtime(true) - $start, 4).' сек.' , 'blue');

    $user = wp_get_current_user();

    // if(in_array('dentist', $user->roles)){

    //   $last_name = get_user_meta($user->ID, 'last_name', true);
    //   $first_name = get_user_meta($user->ID, 'first_name', true);
    //   $nickname = get_user_meta($user->ID, 'nickname', true);

    //   $name        = $last_name  || $first_name ? trim ( $first_name  . ' ' . $last_name ) :    $nickname;

    //   $data['dentists'] = array($name);
    // }

    return $data;
  }
}


if(!function_exists('get_converted_stages')){
  /**
  * Gets names of stages set for converted leads
  *
  * @return array
  */
  function get_converted_stages($return = 'array'){
    $stages              = get_option('leads_stages');
    $stage_for_converted = (int)get_option('stage_for_converted');

    $converted_stages = array($stages[ $stage_for_converted ]['name']);

    switch ($return ) {
      case 'string':
        return $converted_stages[0];
        break;

      default:
        return $converted_stages;
        break;
    }

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
    $stage_for_failed    = get_option('stage_for_failed');

    if(!$stage_for_failed) {
      return array();
    }

    if(!is_array($stage_for_failed)){
      return array($stages[$stage_for_failed]['name']);
    }

    $failed_stages = array();

    foreach ($stage_for_failed as $id) {
      $failed_stages[] = $stages[$id]['name'];
    }
    return $failed_stages;
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

  // function get_users_leads($from = false, $to=false){
  //   dlog('Get Users leads', true, false);
  //   $data = array();
  //   $posistions = array('all');

  //   $converted_stages = get_converted_stages();



  //   foreach (get_users() as $key => $user) {
  //     $name = theme_get_user_name($user);
  //     $user_position = strtolower(get_the_author_meta('user_position', $user->ID));
  //     $assigned_posts = get_the_author_meta('_leads_assigned', $user->ID);

  //     $photo_id = get_the_author_meta('user_photo_id', $user->ID);
  //     $image =  wp_get_attachment_url( $photo_id );
  //     $image = ($image) ? $image : DUMMY_ADMIN;

  //     if( !$assigned_posts ){
  //       $data[$name] = array(
  //         'user_position' => $user_position,
  //         'leads'         => array(),
  //         'total_leads'   => 0,
  //         'converted'     => 0,
  //         'image'     => $image ,
  //       );
  //       continue;
  //     }
  //     // default args fo wp query
  //     $args = array(
  //       'post_type'      => velesh_theme_posts::$lead,
  //       'post__in'       => $assigned_posts,
  //       'posts_per_page' => -1,
  //       'limit'          => -1,
  //       'date_query' => array(

  //         array(
  //           'column' => 'post_date_gmt',
  //           'after'     => '',
  //           'before'    => '',
  //           'inclusive' => true,
  //         ),
  //       ),
  //     );

  //     // check if data is set

  //     if(!$from){
  //       unset($args['date_query']['after']);
  //     }else{
  //       $date = new DateTime($from);
  //       $args['date_query'][0]['after'] = $date->format('Y-m-d');
  //     }

  //     if(!$to){
  //       unset($args['date_query']['before']);
  //     }else{
  //       $date = new DateTime($to);
  //       $args['date_query'][0]['before'] = $date->format('Y-m-d');
  //     }

  //     if(!$from && !$to){
  //        unset($args['date_query']);
  //     }

  //     $args_converted = $args;

  //     $posts = get_posts($args);

  //     // _lead_stage

  //     $args_converted['meta_query'] = array('relation' => 'OR');

  //     foreach (get_converted_stages() as $key => $_stage) {
  //       $args_converted['meta_query'][] = array('key' =>'_lead_stage', 'value'=>$_stage);
  //     }

  //     if(!in_array($user_position, $posistions)){
  //       array_push($posistions, $user_position );
  //     }


  //     $leads_converted = get_posts($args_converted);

  //     $data[$name] = array(
  //       'user_position' => $user_position,
  //       'leads'         => get_leads_meta($posts),
  //       'total_leads'   => count($posts),
  //       'converted'     => count($leads_converted),
  //       'image'         => $image ,
  //     );
  //   }

  //   dlog('-------------', false, true);

  //   return array(
  //     'team' => $data,
  //     'positions' => $posistions,
  //   );
  // }

  function get_users_leads($from = false, $to=false){
    dlog('Get Users leads', true, false);
    $data = array();
    $posistions = array('all');

    $converted_stages = get_converted_stages();

    $users = theme_get_all_users(true);

    // foreach (get_users() as $key => $user) {
    foreach ( $users  as $key => $user) {
     $name         = isset($user['last_name']) || isset($user['first_name'] )? trim ( $user['first_name'] . ' ' . $user['last_name']) :   $user['nickname'];
      $user_position = strtolower($user['user_position']);

      $assigned_posts = isset($user['_leads_assigned'])? $user['_leads_assigned'] : false;
      $image = isset($user['image']) ? $user['image'] : DUMMY_ADMIN;

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

if(!function_exists('get_billed_totals')){

  function get_billed_totals($sheck_date_start = false, $check_date_end = false,  $start_period_day = 1, $end_period_day = 31){

    if(!$sheck_date_start || !$check_date_end){
      return array(
        'mounthly_total' => 0,
        'ids' => array(),
      );
    }

    global $wpdb;


    $querystr = "
      SELECT $wpdb->postmeta.post_id
      FROM  $wpdb->postmeta
      WHERE $wpdb->postmeta.meta_key = '_end_date'
      AND (str_to_date($wpdb->postmeta.meta_value, '%Y-%m-%d %H:%i:%s') >= str_to_date('$check_date_end ', '%Y-%m-%d %H:%i:%s')
        OR str_to_date($wpdb->postmeta.meta_value, '%Y-%m-%d %H:%i:%s') >= str_to_date('$sheck_date_start ', '%Y-%m-%d %H:%i:%s')
      )
    ";

    $request = $wpdb->get_results($querystr, OBJECT);
    $ids_end = array_column($request, 'post_id');
    $querystr = "
      SELECT $wpdb->postmeta.post_id
      FROM  $wpdb->postmeta
      WHERE $wpdb->postmeta.meta_key = '_start_date'
      AND (str_to_date($wpdb->postmeta.meta_value, '%Y-%m-%d %H:%i:%s') <= str_to_date('$check_date_end ', '%Y-%m-%d %H:%i:%s')
        OR str_to_date($wpdb->postmeta.meta_value, '%Y-%m-%d %H:%i:%s') <= str_to_date('$sheck_date_start ', '%Y-%m-%d %H:%i:%s')
      )
    ";

    $request = $wpdb->get_results($querystr, OBJECT);
    $ids_start = array_column($request, 'post_id');

    $ids = array_intersect ($ids_end, $ids_start);

    $_ids = array();

    foreach($ids as $i){
      $_ids[] = (int)$i;
    }

    $mounthly_total = 0;
    return array(
      'mounthly_total' =>$mounthly_total,
      'ids' => $_ids,
    );
  }
}



function get_leads_ids($lead){
  return $lead->ID;
}


function theme_get_all_users($get_assigned = false, $get_roles = false){

  global $wpdb;

  $querystr = "
    SELECT *
    FROM   $wpdb->usermeta
    WHERE  $wpdb->usermeta.meta_key = 'user_position' OR $wpdb->usermeta.meta_key = 'user_photo_id' OR $wpdb->usermeta.meta_key = 'first_name' OR $wpdb->usermeta.meta_key = 'last_name' OR $wpdb->usermeta.meta_key = 'nickname'
  ";

  if($get_assigned ){
     $querystr .= " OR $wpdb->usermeta.meta_key = '_leads_assigned' ";
  }
  if($get_roles ){
     $querystr .= " OR $wpdb->usermeta.meta_key = 'wp_capabilities' ";
  }

  $request = $wpdb->get_results($querystr, OBJECT);

  $cached_user = array();

  foreach ($request as $key => $data) {

    $user_id = (int)$data->user_id;

    if(!isset($cached_user[ $user_id ])){
      $cached_user[ $user_id ] = array();
    }

    switch ($data->meta_key) {
      case "user_photo_id":
          $user_photo_id                             =  (int)$data->meta_value;
          $image                                     =  wp_get_attachment_url( $user_photo_id );
          $cached_user[ $user_id ]['image']          = ($image) ? $image : DUMMY_ADMIN;
        break;
      case "_leads_assigned":
        $cached_user[ $user_id ][$data->meta_key] = maybe_unserialize($data->meta_value);
        break;
      case "wp_capabilities":
        $cached_user[ $user_id ]['roles']         = array_keys(maybe_unserialize($data->meta_value));
         break;

      default:
        $cached_user[ $user_id ][$data->meta_key] = ($data->meta_value);
        break;
    }
  }

  $saved_users = $cached_user;

  return $cached_user;
}